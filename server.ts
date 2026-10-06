import express, { Request, Response } from 'express';
import http from 'http';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Resolve __dirname and __filename across both ESM (tsx) and CJS (dist bundle)
const getFilename = () => {
  try {
    return fileURLToPath(import.meta.url);
  } catch {
    return typeof __filename !== 'undefined' ? __filename : '';
  }
};
const appFilename = getFilename();
const appDirname = appFilename ? path.dirname(appFilename) : process.cwd();

// Database & Persistence initialization
import { initPostgresPool, readDB, writeDB, INITIAL_DB } from './server/db';

// Middlewares
import { authenticateToken } from './server/middlewares/auth';

// Modular Route Handlers
import authRoutes from './server/routes/authRoutes';
import tenantRouter from './server/routes/tenantRoutes';
import { projectRouter, portalRouter, leadScoreRouter } from './server/routes/projectRoutes';
import chatRouter from './server/routes/chatRoutes';
import { fileRouter, gdprRouter } from './server/routes/fileRoutes';
import { aiRouter, inboxRouter } from './server/routes/aiRoutes';
import { scraperRouter, ingestRouter } from './server/routes/scraperRoutes';
import { dripRouter, nudgeRouter } from './server/routes/dripRoutes';
import { invoiceRouter, commissionRouter, analyticsRouter } from './server/routes/invoiceRoutes';
import { webhookRouter, integrationRouter } from './server/routes/webhookRoutes';
import {
  databaseRouter,
  apiTokensRouter,
  auditLogsRouter,
  agencyRouter,
  generalRouter
} from './server/routes/databaseRoutes';

dotenv.config();

// Global crash resilience for production deployments
process.on('unhandledRejection', (reason, promise) => {
  console.warn('[Server] Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('[Server] Uncaught Exception:', error);
});

const app = express();

// Detect AI Studio container preview environment vs external hosting platforms (Railway, Render, Cloud Run, etc.)
const isAiStudioSandbox = Boolean(process.env.APPLET_ID || process.env.DEFAULT_APP_PORT);

// In AI Studio preview environment, Node dev server must listen on port 3000 (reverse proxied by container nginx on 8080).
// In external platforms like Railway, Render, or Docker, read PORT from process.env.PORT (e.g., 8080 or dynamic port).
const PORT: number = isAiStudioSandbox
  ? Number(process.env.DEFAULT_APP_PORT || 3000)
  : (process.env.PORT ? parseInt(process.env.PORT, 10) : 3000);

// Global Middlewares
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));
app.use(authenticateToken);

// Health check endpoint for Railway, Render, Kubernetes, and load balancers
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
    port: PORT,
    platform: process.env.RAILWAY_ENVIRONMENT ? 'railway' : (isAiStudioSandbox ? 'ai-studio' : 'standalone')
  });
});

// ==========================================
// MOUNT MODULAR API ROUTERS
// ==========================================

// Authentication & Users
app.use('/api/auth', authRoutes);
app.use('/api/tenants', tenantRouter);

// Projects, SOP Transfer Gate, Collaborators, & Leads Scoring
app.use('/api/projects', projectRouter);
app.use('/api/portal', portalRouter);
app.use('/api/leads', leadScoreRouter);

// Team Chat & Messages
app.use('/api/chat', chatRouter);

// File Vault & GDPR Compliance
app.use('/api/files', fileRouter);
app.use('/api/gdpr', gdprRouter);

// AI Assistant & Unified Communications Inbox
app.use('/api/ai', aiRouter);
app.use('/api/inbox', inboxRouter);

// Agent-Reach Scraper & External Inbound Ingest (n8n, Python)
app.use('/api/scraper', scraperRouter);
app.use('/api/v1/leads', ingestRouter);

// Smart Drip Campaigns & Automated Nudges
app.use('/api/drip', dripRouter);
app.use('/api/nudges', nudgeRouter);

// Invoices, Commission Ledger & Executive Analytics
app.use('/api/invoices', invoiceRouter);
app.use('/api/commissions', commissionRouter);
app.use('/api/analytics', analyticsRouter);

// Webhooks & Gateway Connectors
app.use('/api/webhooks', webhookRouter);
app.use('/api/integrations', integrationRouter);

// Database Operations, API Tokens, Audit Logs, Agency Mode, Health & Test Runner
app.use('/api/database', databaseRouter);
app.use('/api/api-tokens', apiTokensRouter);
app.use('/api/audit-logs', auditLogsRouter);
app.use('/api/agency', agencyRouter);
app.use('/api', generalRouter);

// Export shared database functions for any legacy external bindings
export { readDB, writeDB, INITIAL_DB };

// ==========================================
// VITE DEV SERVER & PRODUCTION STATIC SERVING
// ==========================================
async function startServer() {
  // Initialize PostgreSQL pool if DATABASE_URL configured
  try {
    await initPostgresPool();
  } catch (err: any) {
    console.warn(`[Database Engine] Initial pool setup warning: ${err.message}. Continuing with local fallback.`);
  }

  const server = http.createServer(app);
  const isHmrDisabled = process.env.DISABLE_HMR === 'true';

  // Resolve production static dist path with comprehensive fallbacks
  const candidatePaths = [
    path.join(process.cwd(), 'dist'),
    path.resolve(appDirname, 'dist'),
    path.resolve(appDirname, '../dist'),
    appDirname,
    process.cwd()
  ];
  const distPath = candidatePaths.find(p => fs.existsSync(path.join(p, 'index.html'))) || candidatePaths[0];
  const distHtmlExists = fs.existsSync(path.join(distPath, 'index.html'));
  const isCompiledBundle = Boolean(appFilename && (appFilename.endsWith('.cjs') || appDirname.includes('dist')));

  // Production detection:
  // 1. Explicit NODE_ENV === 'production'
  // 2. Railway environment variables (RAILWAY_ENVIRONMENT, RAILWAY_SERVICE_ID, etc.)
  // 3. Render / Heroku environments
  // 4. Running compiled bundle (dist/server.cjs) and dist/index.html is found
  // 5. Outside AI Studio sandbox and dist/index.html is found
  const isProd = process.env.NODE_ENV === 'production' ||
                 Boolean(process.env.RAILWAY_ENVIRONMENT || process.env.RAILWAY_SERVICE_ID || process.env.RAILWAY_STATIC_URL || process.env.RENDER) ||
                 (isCompiledBundle && distHtmlExists) ||
                 (!isAiStudioSandbox && distHtmlExists);

  if (!isProd) {
    // Dynamic import of Vite ensures production builds never crash on missing Vite dependencies
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: isHmrDisabled ? false : { server }
      },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    console.log(`[AgencyOps] Serving production static assets from: ${distPath}`);
    app.use(express.static(distPath, { index: false }));

    // Fallback handler for unmatched API routes in production
    app.all('/api/*', (req: Request, res: Response) => {
      res.status(404).json({
        success: false,
        error: `API route not found: ${req.method} ${req.path}`
      });
    });

    // SPA client-side routing fallback
    app.get('*', (req: Request, res: Response) => {
      const indexPath = path.join(distPath, 'index.html');
      if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        res.status(500).send('Production build not found. Please ensure `npm run build` completed.');
      }
    });
  }

  server.listen(PORT, '0.0.0.0', () => {
    console.log(`[AgencyOps] Server listening on port ${PORT} at http://0.0.0.0:${PORT} (${isProd ? 'Production' : 'Development'})`);
  });
}

startServer();
