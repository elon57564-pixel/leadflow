import { Router, Request, Response } from 'express';
import { readDB, writeDB } from '../db';
import { logger } from '../logger';
import { queueEngine } from './queueEngine';

export interface EmailDispatchOptions {
  tenantId: string;
  to: string;
  clientName?: string;
  subject: string;
  template: 'proposal' | 'advance_reminder' | 'staging_ready' | 'invoice_receipt' | 'general';
  variables?: Record<string, any>;
}

export function renderEmailTemplate(template: string, vars: Record<string, any> = {}): string {
  const cName = vars.clientName || 'Valued Client';
  const cCompany = vars.clientCompany || 'your business';
  const amount = vars.amount ? `$${vars.amount.toLocaleString()}` : '$250';

  if (template === 'proposal') {
    return `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
      <h2 style="color: #4f46e5; margin-top: 0;">Web Development Proposal & Scoping</h2>
      <p>Dear ${cName},</p>
      <p>Thank you for consulting with ClientOps regarding ${cCompany}'s web development project.</p>
      <p><strong>Proposed Scope:</strong> ${vars.websiteType || 'Custom Website Development'}</p>
      <p><strong>Investment:</strong> ${amount} USD</p>
      <p><strong>Milestones (SOP Rule 5):</strong></p>
      <ul>
        <li>50% upfront deposit to initiate sprint dates</li>
        <li>50% balance payment upon final staging approval before domain transfer</li>
      </ul>
      <p>Best regards,<br>Sales & Coordination Team</p>
    </div>`;
  }

  if (template === 'advance_reminder') {
    return `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #f59e0b; border-radius: 12px; background-color: #fffbeb;">
      <h2 style="color: #d97706; margin-top: 0;">Reminder: 50% Kick-Off Milestone Pending</h2>
      <p>Hello ${cName},</p>
      <p>Just a quick update regarding ${cCompany}'s website setup. Your dedicated staging slot is ready for activation upon clearance of the 50% advance deposit (${amount} USD).</p>
      <p>Best regards,<br>Client Operations</p>
    </div>`;
  }

  return `<div style="font-family: Arial, sans-serif; padding: 20px; color: #1e293b;">
    <p>Dear ${cName},</p>
    <p>${vars.body || 'Thank you for connecting with ClientOps.'}</p>
  </div>`;
}

export const emailRouter = Router();

// POST /api/email/send - Queue transactional email dispatch
emailRouter.post('/send', (req: Request, res: Response) => {
  const body: EmailDispatchOptions = req.body;
  if (!body.to || !body.subject) {
    return res.status(400).json({ success: false, error: 'Recipient email (to) and subject are required.' });
  }

  const tenantId = (req as any).tenant_id || 'tenant-alm-nexus';
  const htmlContent = renderEmailTemplate(body.template || 'general', {
    clientName: body.clientName,
    ...body.variables
  });

  const job = queueEngine.addJob('email_send', {
    to: body.to,
    subject: body.subject,
    template: body.template,
    html: htmlContent
  }, tenantId);

  res.json({
    success: true,
    message: `Email job queued successfully for ${body.to}`,
    data: {
      jobId: job.id,
      recipient: body.to,
      subject: body.subject,
      status: 'queued'
    }
  });
});

// GET /api/email/track/:id - Open pixel tracking simulation
emailRouter.get('/track/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  logger.info(`Email tracking pixel opened for message ${id}`, { context: 'EmailEngine' });

  const transparentPixel = Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64');
  res.writeHead(200, {
    'Content-Type': 'image/gif',
    'Content-Length': transparentPixel.length,
    'Cache-Control': 'no-store, no-cache, must-revalidate, private'
  });
  res.end(transparentPixel);
});
