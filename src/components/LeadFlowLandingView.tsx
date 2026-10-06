import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowUpRight, 
  CheckCircle2, 
  ShieldCheck, 
  Mail, 
  Linkedin, 
  Calendar, 
  Phone, 
  DollarSign, 
  BarChart3, 
  Users, 
  Clock, 
  Filter, 
  ExternalLink, 
  Zap, 
  ChevronDown, 
  ChevronRight, 
  X, 
  Play, 
  RefreshCw, 
  Send, 
  Lock, 
  Globe, 
  Building2,
  Check,
  Search,
  Layers,
  Award,
  Star,
  Activity,
  CheckSquare,
  HelpCircle,
  Database,
  Sliders,
  Laptop
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { LeadFlowBookingModal } from './LeadFlowBookingModal';
import { LeadFlowRoiCalculator } from './LeadFlowRoiCalculator';
import { LeadFlowFreeToolsSection } from './LeadFlowFreeToolsSection';
import { ThemeToggle } from './ThemeToggle';
import { UserRole } from '../types';

interface LeadFlowLandingViewProps {
  onOpenLoginModal?: () => void;
  onEnterWorkspace?: () => void;
}

export const LeadFlowLandingView: React.FC<LeadFlowLandingViewProps> = ({
  onOpenLoginModal,
  onEnterWorkspace
}) => {
  const { 
    currentUser, 
    role, 
    switchPersona, 
    showToast, 
    setIsOnboardingModalOpen,
    setActiveTab
  } = useApp();

  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedPlanForBooking, setSelectedPlanForBooking] = useState('Business Retainer ($2,990/mo)');
  const [activeCaseStudy, setActiveCaseStudy] = useState<number>(0);
  const [activeFitTab, setActiveFitTab] = useState<'saas' | 'agencies' | 'services'>('saas');
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [currency, setCurrency] = useState<'USD' | 'EUR' | 'GBP'>('USD');
  const [currencyMultiplier, setCurrencyMultiplier] = useState(1);
  const [currencySymbol, setCurrencySymbol] = useState('$');

  const handleCurrencyChange = (curr: 'USD' | 'EUR' | 'GBP') => {
    setCurrency(curr);
    if (curr === 'USD') {
      setCurrencyMultiplier(1);
      setCurrencySymbol('$');
    } else if (curr === 'EUR') {
      setCurrencyMultiplier(0.92);
      setCurrencySymbol('€');
    } else {
      setCurrencyMultiplier(0.79);
      setCurrencySymbol('£');
    }
  };

  const handleOpenBooking = (planName?: string) => {
    if (planName) setSelectedPlanForBooking(planName);
    setIsBookingModalOpen(true);
  };

  // Case studies mirroring LeadFlow's genuine campaigns
  const caseStudies = [
    {
      badge: 'DACH + UK B2B Fintech (Embedded Payments)',
      sqlsMetric: '7 SQLs / month',
      sqlsSubtitle: 'avg over 6 months &bull; $140k pipeline',
      headline: '7 sales-qualified meetings per month for a B2B fintech selling embedded payments',
      icp: 'Chief Commercial Officers, VP Payments, Head of Treasury in online marketplaces & platforms ($10M–$100M GMV)',
      results: [
        { label: 'Positive Reply Rate', val: '6.8%' },
        { label: 'Qualified Meetings', val: '42 SQLs' },
        { label: 'Pipeline Generated', val: '$140k+' },
        { label: 'Contract ACV', val: '$20,000' }
      ],
      sequencePreview: {
        channel: 'LinkedIn + Cold Email Multi-Touch',
        step1: 'Step 1 (Day 1): Soft LinkedIn connection referencing their marketplace expansion.',
        step2: 'Step 2 (Day 3): Cold Email highlighting interchange margin leakage in cross-border settlements.',
        step3: 'Step 3 (Day 7): Case study snapshot showing a similar platform reducing transaction friction by 31%.'
      },
      quote: '"LeadFlow has been our single most predictable pipeline generator across the UK and DACH regions."'
    },
    {
      badge: 'US Niche AI Speech Tech (Enterprise Contact Centers)',
      sqlsMetric: '12 SQLs / month',
      sqlsSubtitle: 'targeting enterprise contact centers &bull; 4.9x ROI',
      headline: '12 SQLs per month for a niche AI speech company selling to contact centers',
      icp: 'VP Customer Experience, Head of Contact Center Operations, CIOs at financial institutions & healthcare',
      results: [
        { label: 'Positive Reply Rate', val: '8.4%' },
        { label: 'Qualified Meetings', val: '72 SQLs' },
        { label: 'Pipeline Generated', val: '$280k+' },
        { label: 'ROI Multiple', val: '4.9x' }
      ],
      sequencePreview: {
        channel: 'Email Primary + LinkedIn Support',
        step1: 'Step 1 (Day 1): Short email asking how they handle QA auditing on 10,000+ daily agent calls.',
        step2: 'Step 2 (Day 4): 2-line follow-up with a 15-second audio spectrogram demo link.',
        step3: 'Step 3 (Day 9): Direct executive invite to discuss reduced agent burnout metrics.'
      },
      quote: '"Within 90 days, LeadFlow booked meetings with 3 of our top 10 dream accounts."'
    },
    {
      badge: 'Saudi Telecom & Infrastructure (Enterprise Connectivity)',
      sqlsMetric: '20 SQLs / month',
      sqlsSubtitle: 'managed enterprise connectivity &bull; $420k closed deals',
      headline: '20 SQLs per month for a Saudi telecom firm selling managed connectivity to enterprise',
      icp: 'CTOs, IT Directors, Head of Enterprise Network Infrastructure at mid-market & government contracting firms',
      results: [
        { label: 'Positive Reply Rate', val: '11.2%' },
        { label: 'Qualified Meetings', val: '120 SQLs' },
        { label: 'Pipeline Generated', val: '$420k+' },
        { label: 'Average Deal Size', val: '$35,000' }
      ],
      sequencePreview: {
        channel: 'Bilingual LinkedIn + Email',
        step1: 'Step 1 (Day 1): English/Arabic personalized note addressing SLA uptime and cloud peering.',
        step2: 'Step 2 (Day 5): Invitation to review latency benchmarking across Riyadh and Jeddah hubs.',
        step3: 'Step 3 (Day 10): Direct WhatsApp follow-up once prospect engaged with technical whitepaper.'
      },
      quote: '"The quality of enterprise decision-makers on our calendar was outstanding from week two."'
    }
  ];

  // FAQ items mirroring LeadFlow
  const faqs = [
    {
      q: "How does LeadFlow's multi-channel approach work?",
      a: "We combine LinkedIn outreach with cold email campaigns to maximize your reach without spamming. Our system personalizes each touchpoint based on live trigger signals, handles replies, and tracks engagement across both channels to ensure qualified sales conversations land directly on your calendar."
    },
    {
      q: "How long does it take to see results?",
      a: "Our complete technical onboarding and 7-day launch sprint gets your campaign live in exactly one week. Most clients see their first qualified meetings booked between days 10 and 14 once email inboxes are warmed and LinkedIn sequences initiate."
    },
    {
      q: "Will cold email harm my company's main domain?",
      a: "Never. We strictly set up custom secondary sending domains (e.g., yourcompany-hq.com) with SPF, DKIM, and DMARC authentication. Your primary domain is 100% protected and never used for cold sending."
    },
    {
      q: "How do you define a Sales-Qualified Meeting (SQL)?",
      a: "A qualified meeting is with a verified decision-maker matching your pre-approved Ideal Customer Profile (ICP) who has expressed clear interest in your offering and confirmed attendance on your calendar."
    },
    {
      q: "What CRM and tool integrations are supported?",
      a: "LeadFlow synchronizes natively with ALM Nexus Enterprise, HubSpot, Salesforce, Pipedrive, Slack, Discord, and Google Calendar. Replies and notes are logged automatically in real time."
    },
    {
      q: "Is there a long-term contract lock-in?",
      a: "No. Our Pilot program is a 30-day sprint. Our Business and Enterprise retainers operate on flexible month-to-month terms because our retention is driven by pipeline performance, not contract lock-ins."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070a12] text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-indigo-600 selection:text-white transition-colors duration-200">
      
      {/* ========================================================
          STICKY TOP NAVBAR
      ======================================================== */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/80 dark:bg-[#070a12]/80 border-b border-slate-200 dark:border-white/10 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
          
          {/* Logo & Product Badge */}
          <div className="flex items-center gap-3">
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-indigo-700 p-0.5 shadow-md shadow-indigo-600/25 flex items-center justify-center">
                <Send className="w-5 h-5 text-white transform -rotate-12 group-hover:rotate-0 transition-transform duration-300" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-black text-xl text-slate-900 dark:text-white tracking-tight">
                    LeadFlow
                  </span>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/40 font-mono">
                    Agency
                  </span>
                </div>
                <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 block -mt-0.5">
                  An ALM Nexus Product
                </span>
              </div>
            </a>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-bold text-slate-600 dark:text-slate-300">
            <a href="#services" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Services</a>
            <a href="#case-studies" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Case Studies</a>
            <a href="#fit" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Honest Fit</a>
            <a href="#process" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">7-Day Launch</a>
            <a href="#calculator" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">ROI Calculator</a>
            <a href="#free-tools" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition flex items-center gap-1">
              <span>Free Tools</span>
              <span className="px-1.5 py-0.2 rounded text-[9px] bg-emerald-500/10 text-emerald-500 font-mono">FREE</span>
            </a>
            <a href="#pricing" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Pricing</a>
            <a href="#faq" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">FAQ</a>
          </nav>

          {/* Right Action Area */}
          <div className="flex items-center gap-3">
            <ThemeToggle variant="segmented" showLabels={false} />

            {/* Book A Call CTA */}
            <button
              type="button"
              onClick={() => handleOpenBooking()}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white text-xs font-bold shadow-md shadow-indigo-600/25 transition cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book A Call</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Launch / Access Operations Platform Button */}
            {currentUser ? (
              <button
                type="button"
                onClick={() => {
                  if (onEnterWorkspace) onEnterWorkspace();
                  else setActiveTab('pipeline');
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-black shadow-md transition cursor-pointer"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Open Operations Hub</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  if (onOpenLoginModal) onOpenLoginModal();
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-300 dark:border-white/20 bg-white dark:bg-slate-900 text-slate-800 dark:text-white text-xs font-black hover:border-indigo-500 hover:text-indigo-600 transition cursor-pointer shadow-xs"
              >
                <Lock className="w-3.5 h-3.5 text-indigo-500" />
                <span>Team / Client Login</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ========================================================
          1. HERO SECTION
      ======================================================== */}
      <section className="relative overflow-hidden pt-12 pb-16 sm:pt-20 sm:pb-24 border-b border-slate-200 dark:border-white/10">
        
        {/* Subtle Ambient Background Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-indigo-500/10 via-blue-500/10 to-transparent blur-3xl rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            
            {/* Left Column: Hero Text */}
            <div className="w-full lg:w-7/12 text-left space-y-6">
              
              {/* Eyebrow Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800/50 text-indigo-700 dark:text-indigo-300 text-xs font-bold font-mono">
                <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                <span>MANAGED LINKEDIN &amp; COLD EMAIL OUTREACH FOR B2B TEAMS</span>
              </div>

              {/* Main Headline mirroring leadflow.agency */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1]">
                Managed LinkedIn and cold email outreach <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">for B2B teams.</span>
              </h1>

              {/* Subtext */}
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl font-normal">
                We research your prospects, write the outreach, and handle replies — so your sales team can focus strictly on closed revenue conversations.
              </p>

              {/* Call to Actions */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => handleOpenBooking()}
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white text-sm font-bold shadow-xl shadow-indigo-600/30 transition cursor-pointer flex items-center justify-center gap-2.5 group"
                >
                  <span>Discuss your outbound plan</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <a
                  href="#case-studies"
                  className="px-6 py-4 rounded-2xl border border-slate-300 dark:border-white/10 bg-white dark:bg-slate-900/60 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-white text-sm font-bold transition flex items-center justify-center gap-2"
                >
                  <span>See case studies</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </a>

                <button
                  type="button"
                  onClick={() => {
                    if (currentUser && onEnterWorkspace) {
                      onEnterWorkspace();
                    } else if (onOpenLoginModal) {
                      onOpenLoginModal();
                    }
                  }}
                  className="px-5 py-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/40 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 text-sm font-bold transition flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4 text-indigo-500" />
                  <span>ALM Nexus Workspace</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-500 dark:text-slate-400 font-medium">
                <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                  <Clock className="w-4 h-4 text-indigo-500" />
                  30 minutes to discuss audience &amp; fit
                </span>
                <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                  7-Day Outbound Launch Sprint
                </span>
                <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-blue-500" />
                  Primary Domain Protection
                </span>
              </div>
            </div>

            {/* Right Column: Live Outbound Sequence Simulation Card */}
            <div className="w-full lg:w-5/12">
              <div className="relative rounded-3xl bg-white dark:bg-[#0c1220] border border-slate-200 dark:border-white/10 p-6 shadow-2xl shadow-indigo-600/10 space-y-4">
                
                {/* Simulator Card Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-mono font-bold text-slate-900 dark:text-white uppercase">
                      Live Multi-Channel Pipeline
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/40">
                    LeadFlow Engine
                  </span>
                </div>

                {/* Step 1: Verified Prospect */}
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-white/5 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800 dark:text-white flex items-center gap-1.5">
                      <Filter className="w-3.5 h-3.5 text-indigo-500" />
                      <span>Target Prospect Identified</span>
                    </span>
                    <span className="text-[10px] font-mono text-emerald-500 font-bold">ICP Score 99/100</span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                    Dominik Weber &bull; Head of Treasury @ Apex Pay (UK) &bull; Verified Work Email + Direct Mobile
                  </p>
                </div>

                {/* Step 2: Multi-Touch Touchpoint Flow */}
                <div className="space-y-2 text-xs">
                  <div className="p-3 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/60 dark:border-blue-500/20 flex items-start gap-2.5">
                    <Linkedin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white block">
                        Touch 1 &bull; LinkedIn Soft Note
                      </span>
                      <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5 italic">
                        "Saw you guys are scaling marketplace payouts across the EU. How are you handling cross-border interchange rates?"
                      </p>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono font-bold mt-1 inline-block">
                        &check; Accepted &bull; 4h reply turnaround
                      </span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200/60 dark:border-indigo-500/20 flex items-start gap-2.5">
                    <Mail className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white block">
                        Touch 2 &bull; Cold Email with Anonymized Case Study
                      </span>
                      <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
                        Delivered from warmed secondary domain &bull; 74% Open Rate &bull; Zero spam trigger words
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 3: Meeting Booked Outcome */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-transparent border border-emerald-500/30 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-extrabold text-slate-900 dark:text-white block">
                        Sales-Qualified Meeting Booked!
                      </span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                        Thursday @ 2:30 PM &bull; Google Meet Invite Confirmed
                      </span>
                    </div>
                  </div>
                  <span className="px-2 py-1 rounded-lg bg-emerald-500 text-white font-mono text-[10px] font-bold">
                    SQL #14
                  </span>
                </div>

                {/* Footer Metric Row */}
                <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-mono border-t border-slate-100 dark:border-white/10">
                  <span>Clay + Instantly + Apollo Stack</span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-bold">100% Handled By LeadFlow</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          2. CAMPAIGN EXAMPLES & REAL PIPELINE (Case Studies)
      ======================================================== */}
      <section id="case-studies" className="py-16 sm:py-24 border-b border-slate-200 dark:border-white/10 bg-white/40 dark:bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-2 block">
              CAMPAIGN EXAMPLES
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Real campaigns, real pipeline
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
              Anonymized case studies from B2B teams we run outbound for — the ICP, the funnel numbers, and the exact multi-channel sequences.
            </p>
          </div>

          {/* Case Study Tabs */}
          <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
            {caseStudies.map((cs, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveCaseStudy(idx)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold border transition cursor-pointer ${
                  activeCaseStudy === idx
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/25'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-indigo-400'
                }`}
              >
                <span>{cs.badge}</span>
              </button>
            ))}
          </div>

          {/* Active Case Study Detail Card */}
          {caseStudies[activeCaseStudy] && (() => {
            const cs = caseStudies[activeCaseStudy];
            return (
              <div className="max-w-5xl mx-auto bg-white dark:bg-[#0c1220] border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-10 shadow-xl space-y-8 animate-fadeIn">
                
                {/* Header Metrics Banner */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-white/10">
                  <div>
                    <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase">
                      {cs.badge}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
                      {cs.headline}
                    </h3>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/40 text-right shrink-0">
                    <span className="text-xl sm:text-2xl font-black text-indigo-600 dark:text-indigo-400 font-mono block">
                      {cs.sqlsMetric}
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono" dangerouslySetInnerHTML={{ __html: cs.sqlsSubtitle }} />
                  </div>
                </div>

                {/* 4 Key Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {cs.results.map((r, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-white/5">
                      <span className="text-[11px] text-slate-400 block font-medium">{r.label}</span>
                      <span className="text-2xl font-black text-slate-900 dark:text-white font-mono mt-0.5 block">
                        {r.val}
                      </span>
                    </div>
                  ))}
                </div>

                {/* ICP & Exact Sequence */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 space-y-2">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase font-mono flex items-center gap-1.5">
                      <Filter className="w-3.5 h-3.5 text-indigo-500" />
                      <span>Target Ideal Customer Profile (ICP)</span>
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {cs.icp}
                    </p>
                    <div className="pt-2 flex flex-wrap gap-1.5">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">Decision Makers Only</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">Direct Mobiles Verified</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400">Zero Catch-All Inboxes</span>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 space-y-2">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase font-mono flex items-center gap-1.5">
                      <Send className="w-3.5 h-3.5 text-indigo-500" />
                      <span>Exact Sequence Used ({cs.sequencePreview.channel})</span>
                    </h4>
                    <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                      <p className="text-[11px] leading-relaxed">{cs.sequencePreview.step1}</p>
                      <p className="text-[11px] leading-relaxed">{cs.sequencePreview.step2}</p>
                      <p className="text-[11px] leading-relaxed">{cs.sequencePreview.step3}</p>
                    </div>
                  </div>
                </div>

                {/* Client Quote & CTA */}
                <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-xs italic text-slate-500 dark:text-slate-400 max-w-xl">
                    {cs.quote}
                  </p>

                  <button
                    type="button"
                    onClick={() => handleOpenBooking(`Case Study Plan: ${cs.badge}`)}
                    className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/25 transition cursor-pointer flex items-center gap-2 shrink-0"
                  >
                    <span>Replicate This Campaign</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })()}

        </div>
      </section>

      {/* ========================================================
          3. HONEST FIT BEFORE WE TALK NUMBERS (Is This For You?)
      ======================================================== */}
      <section id="fit" className="py-16 sm:py-24 border-b border-slate-200 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-2 block">
              IS THIS FOR YOU?
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Honest fit before we talk numbers
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
              We work best with a specific type of team. Pick your closest match — we'll tell you straight when we're not a fit.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            
            {/* Card 1: B2B SaaS */}
            <div className={`p-6 sm:p-8 rounded-3xl border transition-all ${
              activeFitTab === 'saas'
                ? 'bg-indigo-50/50 dark:bg-indigo-950/20 border-indigo-500 shadow-xl'
                : 'bg-white dark:bg-[#0c1220] border-slate-200 dark:border-white/10 hover:border-slate-300'
            }`}>
              <div className="w-12 h-12 rounded-2xl bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold mb-4">
                <Laptop className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">B2B SaaS</h3>
              <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold mb-4">Product-led or sales-led &bull; $2K+ ACV</p>
              
              <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                <span className="font-bold text-slate-900 dark:text-white block text-[11px] uppercase font-mono">You'll see results if...</span>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>You have paying customers and a defined ICP</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Deal size &ge; $2K ACV (or $500+ MRR)</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Sales cycle 2–6 weeks with clear decision-makers</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-white/10 text-[11px] text-slate-500 dark:text-slate-400">
                <span className="text-rose-500 font-bold block mb-1">Not a fit if:</span>
                Consumer apps (B2C) or deal sizes under $1k/year.
              </div>
            </div>

            {/* Card 2: Agencies & Studios */}
            <div className={`p-6 sm:p-8 rounded-3xl border transition-all ${
              activeFitTab === 'agencies'
                ? 'bg-indigo-50/50 dark:bg-indigo-950/20 border-indigo-500 shadow-xl'
                : 'bg-white dark:bg-[#0c1220] border-slate-200 dark:border-white/10 hover:border-slate-300'
            }`}>
              <div className="w-12 h-12 rounded-2xl bg-blue-600/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold mb-4">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">Agencies &amp; Studios</h3>
              <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold mb-4">Web, design &amp; marketing retainers &bull; $5K+</p>
              
              <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                <span className="font-bold text-slate-900 dark:text-white block text-[11px] uppercase font-mono">You'll see results if...</span>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Proven case studies and solid client portfolio</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Retainer &ge; $3,500/mo or project size &ge; $5,000</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Capacity to onboard 2–4 new accounts each month</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-white/10 text-[11px] text-slate-500 dark:text-slate-400">
                <span className="text-rose-500 font-bold block mb-1">Not a fit if:</span>
                Brand new agency without a portfolio or past client references.
              </div>
            </div>

            {/* Card 3: B2B Services */}
            <div className={`p-6 sm:p-8 rounded-3xl border transition-all ${
              activeFitTab === 'services'
                ? 'bg-indigo-50/50 dark:bg-indigo-950/20 border-indigo-500 shadow-xl'
                : 'bg-white dark:bg-[#0c1220] border-slate-200 dark:border-white/10 hover:border-slate-300'
            }`}>
              <div className="w-12 h-12 rounded-2xl bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">B2B Enterprise Services</h3>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mb-4">Consulting, IT &amp; Logistics &bull; $10K+ ACV</p>
              
              <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                <span className="font-bold text-slate-900 dark:text-white block text-[11px] uppercase font-mono">You'll see results if...</span>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>High-ticket contract value ($10,000 – $100,000+)</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Targeting C-Suite, VPs, or specialized directors</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>1 closed deal pays for 3–6 months of LeadFlow retainers</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-white/10 text-[11px] text-slate-500 dark:text-slate-400">
                <span className="text-rose-500 font-bold block mb-1">Not a fit if:</span>
                Vague offering with no specific enterprise buyer role.
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          4. OUR SERVICES: Everything you need to scale outbound
      ======================================================== */}
      <section id="services" className="py-16 sm:py-24 border-b border-slate-200 dark:border-white/10 bg-white/40 dark:bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-2 block">
              OUR SERVICES
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Everything you need to scale outbound
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
              From data enrichment and technical deliverability to multi-touch messaging and booked meetings on your calendar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Service 1 */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0c1220] border border-slate-200 dark:border-white/10 hover:shadow-lg transition space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                <Calendar className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Appointment Setting</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                LinkedIn + Email outreach campaigns that book sales-qualified meetings directly to your Google Meet or Zoom calendar.
              </p>
              <div className="pt-2 text-[11px] font-mono text-indigo-600 dark:text-indigo-400 font-semibold flex items-center gap-1">
                <span>Direct calendar integration</span> &rarr;
              </div>
            </div>

            {/* Service 2 */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0c1220] border border-slate-200 dark:border-white/10 hover:shadow-lg transition space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                <Database className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Prospects Database Preparation</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Custom-built lead lists with verified business emails and direct mobile numbers matching your exact ideal customer profile.
              </p>
              <div className="pt-2 text-[11px] font-mono text-blue-600 dark:text-blue-400 font-semibold flex items-center gap-1">
                <span>Apollo + Clay + Prospeo waterfall</span> &rarr;
              </div>
            </div>

            {/* Service 3 */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0c1220] border border-slate-200 dark:border-white/10 hover:shadow-lg transition space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-600/10 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
                <Linkedin className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">LinkedIn Content &amp; Thought Leadership</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Executive ghostwriting, profile optimization, and social selling sequences that turn your founder's profile into an inbound magnet.
              </p>
              <div className="pt-2 text-[11px] font-mono text-purple-600 dark:text-purple-400 font-semibold flex items-center gap-1">
                <span>Personal branding flywheel</span> &rarr;
              </div>
            </div>

            {/* Service 4 */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0c1220] border border-slate-200 dark:border-white/10 hover:shadow-lg transition space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">CRM Setup &amp; Pipeline Tracking</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Bi-directional synchronization with ALM Nexus, HubSpot, or Pipedrive so your account executives have full conversation context.
              </p>
              <div className="pt-2 text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                <span>Real-time webhook sync</span> &rarr;
              </div>
            </div>

            {/* Service 5 */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0c1220] border border-slate-200 dark:border-white/10 hover:shadow-lg transition space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-600/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">n8n / Make.com &amp; Clay Workflows</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Custom automated workflows scraping buying signals, funding rounds, job board hirings, and dynamic AI personalized lines.
              </p>
              <div className="pt-2 text-[11px] font-mono text-amber-600 dark:text-amber-400 font-semibold flex items-center gap-1">
                <span>Intent-triggered outreach</span> &rarr;
              </div>
            </div>

            {/* Service 6 */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0c1220] border border-slate-200 dark:border-white/10 hover:shadow-lg transition space-y-3">
              <div className="w-10 h-10 rounded-xl bg-rose-600/10 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Deliverability &amp; Secondary Domains</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Secondary domain purchasing, SPF, DKIM, DMARC records, Google Workspace inboxes, and 14-day automated warmup protecting sender reputation.
              </p>
              <div className="pt-2 text-[11px] font-mono text-rose-600 dark:text-rose-400 font-semibold flex items-center gap-1">
                <span>98.6% Primary inbox landing</span> &rarr;
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          5. OUR PROCESS: Launch your outbound engine in 7 days
      ======================================================== */}
      <section id="process" className="py-16 sm:py-24 border-b border-slate-200 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-2 block">
              OUR PROCESS
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Launch your outbound engine in 7 days
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
              From ICP research to booked meetings — we handle the entire infrastructure so you can focus strictly on closing deals.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Step 1 */}
            <div className="p-6 rounded-3xl bg-white dark:bg-[#0c1220] border border-slate-200 dark:border-white/10 space-y-3 relative">
              <span className="text-3xl font-black text-indigo-600/30 dark:text-indigo-400/20 font-mono block">
                01
              </span>
              <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 inline-block">
                Days 1–2
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">ICP Research &amp; Planning</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Define your Ideal Customer Profile based on past wins, target ACV, geographic criteria, and market positioning.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-3xl bg-white dark:bg-[#0c1220] border border-slate-200 dark:border-white/10 space-y-3 relative">
              <span className="text-3xl font-black text-blue-600/30 dark:text-blue-400/20 font-mono block">
                02
              </span>
              <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 inline-block">
                Days 3–4
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Technical Infrastructure</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Configure isolated secondary domains, SPF, DKIM, DMARC records, and initiate automated inbox warming.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-3xl bg-white dark:bg-[#0c1220] border border-slate-200 dark:border-white/10 space-y-3 relative">
              <span className="text-3xl font-black text-purple-600/30 dark:text-purple-400/20 font-mono block">
                03
              </span>
              <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 inline-block">
                Days 5–6
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Copywriting &amp; Sequences</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Craft 3 distinct angle variations across LinkedIn and Email with pain-driven hooks and low-friction CTAs.
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-6 rounded-3xl bg-white dark:bg-[#0c1220] border border-slate-200 dark:border-white/10 space-y-3 relative">
              <span className="text-3xl font-black text-emerald-600/30 dark:text-emerald-400/20 font-mono block">
                04
              </span>
              <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 inline-block">
                Day 7+
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Launch &amp; Meetings Booked</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Go live, triage replies within 15 minutes, qualify prospects, and book calls directly to your calendar.
              </p>
            </div>

          </div>

          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={() => handleOpenBooking('7-Day Outbound Launch Sprint')}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-indigo-600/25 transition cursor-pointer"
            >
              <span>Start Your 7-Day Outbound Engine</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================
          6. INTERACTIVE ROI CALCULATOR
      ======================================================== */}
      <section id="calculator" className="py-16 sm:py-24 border-b border-slate-200 dark:border-white/10 bg-white/40 dark:bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LeadFlowRoiCalculator onBookCall={() => handleOpenBooking('Custom Projected ROI Plan')} />
        </div>
      </section>

      {/* ========================================================
          7. FREE GTM & OUTBOUND TOOLS
      ======================================================== */}
      <section id="free-tools" className="py-16 sm:py-24 border-b border-slate-200 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LeadFlowFreeToolsSection onBookCall={() => handleOpenBooking('LeadFlow Outbound Setup')} />
        </div>
      </section>

      {/* ========================================================
          8. TRANSPARENT PRICING
      ======================================================== */}
      <section id="pricing" className="py-16 sm:py-24 border-b border-slate-200 dark:border-white/10 bg-white/40 dark:bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-2 block">
              TRANSPARENT PRICING
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Scale your pipeline, not your costs
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
              Compare managed outbound scopes. Confirm total inclusions and delivery terms before launch.
            </p>

            {/* Currency Switcher */}
            <div className="mt-5 inline-flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-xs font-mono">
              {(['USD', 'EUR', 'GBP'] as const).map(c => (
                <button
                  key={c}
                  type="button"
                  onClick={() => handleCurrencyChange(c)}
                  className={`px-3 py-1 rounded-lg font-bold transition cursor-pointer ${
                    currency === c
                      ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            
            {/* Tier 1: PILOT */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0c1220] border border-slate-200 dark:border-white/10 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-xs font-mono font-bold text-slate-400 uppercase">TIER 1</span>
                <h3 className="text-xl font-black text-slate-900 dark:text-white mt-0.5">PILOT</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Validate your offer and message market fit with a focused 30-day outbound sprint.
                </p>

                <div className="my-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-mono">
                      {currencySymbol}{Math.round(999 * currencyMultiplier).toLocaleString()}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">/month</span>
                  </div>
                  <span className="text-[11px] text-indigo-600 dark:text-indigo-400 font-mono font-bold block mt-1">
                    1,000 Verified Prospects
                  </span>
                </div>

                <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>1 Outbound Channel (Email or LinkedIn)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Custom ICP prospect list &amp; enrichment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>2 Copywriting angles A/B tested</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Secondary domain warming setup</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Direct calendar meeting booking</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleOpenBooking(`Pilot Scope (${currencySymbol}${Math.round(999 * currencyMultiplier)}/mo)`)}
                className="w-full py-3 rounded-xl border border-slate-300 dark:border-white/10 hover:border-indigo-500 text-slate-800 dark:text-white hover:text-indigo-600 text-xs font-bold transition cursor-pointer text-center"
              >
                Choose Pilot Sprint
              </button>
            </div>

            {/* Tier 2: BUSINESS (Featured) */}
            <div className="p-6 sm:p-8 rounded-3xl bg-indigo-50/70 dark:bg-indigo-950/30 border-2 border-indigo-600 dark:border-indigo-500 shadow-2xl shadow-indigo-600/20 flex flex-col justify-between space-y-6 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-indigo-600 text-white text-[10px] font-black uppercase tracking-wider font-mono shadow-md">
                MOST POPULAR
              </div>

              <div>
                <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase">TIER 2</span>
                <h3 className="text-xl font-black text-slate-900 dark:text-white mt-0.5">BUSINESS</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                  Scale your pipeline with unified multi-channel LinkedIn and Email coordination.
                </p>

                <div className="my-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl font-black text-indigo-600 dark:text-indigo-400 font-mono">
                      {currencySymbol}{Math.round(2990 * currencyMultiplier).toLocaleString()}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">/month</span>
                  </div>
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-mono font-bold block mt-1">
                    3,000 Verified Prospects / mo
                  </span>
                </div>

                <div className="space-y-2.5 text-xs text-slate-700 dark:text-slate-200">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span><strong>Multi-Channel:</strong> LinkedIn + Cold Email</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Dedicated SDR Inbox Reply Manager</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Clay Waterfall Data &amp; Mobile Phone Enrichment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>ALM Nexus, HubSpot, or Pipedrive CRM sync</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Bi-weekly pipeline optimization reviews</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Target: 10–18 Sales-Qualified Meetings/mo</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleOpenBooking(`Business Retainer (${currencySymbol}${Math.round(2990 * currencyMultiplier)}/mo)`)}
                className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black shadow-lg shadow-indigo-600/30 transition cursor-pointer text-center"
              >
                Launch Business Outbound
              </button>
            </div>

            {/* Tier 3: ENTERPRISE */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0c1220] border border-slate-200 dark:border-white/10 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-xs font-mono font-bold text-slate-400 uppercase">TIER 3</span>
                <h3 className="text-xl font-black text-slate-900 dark:text-white mt-0.5">ENTERPRISE</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Full outbound team replacement for high-growth SaaS, agencies, and enterprise sales.
                </p>

                <div className="my-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-mono">
                      {currencySymbol}{Math.round(5490 * currencyMultiplier).toLocaleString()}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">/month</span>
                  </div>
                  <span className="text-[11px] text-indigo-600 dark:text-indigo-400 font-mono font-bold block mt-1">
                    7,000+ Verified Prospects / mo
                  </span>
                </div>

                <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Multi-inbox scaling (up to 15 sender inboxes)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Founder LinkedIn Ghostwriting &amp; Thought Leadership</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Custom n8n / Make webhook pipelines</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Dedicated Senior Growth Director</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Target: 20–35+ Sales-Qualified Meetings/mo</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleOpenBooking(`Enterprise Custom Scope (${currencySymbol}${Math.round(5490 * currencyMultiplier)}/mo)`)}
                className="w-full py-3 rounded-xl border border-slate-300 dark:border-white/10 hover:border-indigo-500 text-slate-800 dark:text-white hover:text-indigo-600 text-xs font-bold transition cursor-pointer text-center"
              >
                Discuss Enterprise Scope
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          9. CLIENT SUCCESS STORIES & CLUTCH REVIEWS
      ======================================================== */}
      <section className="py-16 sm:py-24 border-b border-slate-200 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1 text-amber-500 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
              ))}
              <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 ml-1">5.0 on Clutch &bull; 100+ Reviews</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Trusted by 100+ B2B teams
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-white dark:bg-[#0c1220] border border-slate-200 dark:border-white/10 space-y-4">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                ))}
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed italic">
                "The team over-executed on metrics and KPIs. Their multi-channel outreach achieved 14 qualified discovery calls in our first 30 days."
              </p>
              <div className="pt-2 border-t border-slate-100 dark:border-white/10">
                <span className="font-bold text-xs text-slate-900 dark:text-white block">Soren Lindqvist</span>
                <span className="text-[10px] text-slate-400">Head of Growth, Nordic Fintech</span>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-[#0c1220] border border-slate-200 dark:border-white/10 space-y-4">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                ))}
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed italic">
                "We replaced an entire SDR team that cost us $16,000/mo with LeadFlow's Business Retainer. More pipeline, higher reply quality, zero management friction."
              </p>
              <div className="pt-2 border-t border-slate-100 dark:border-white/10">
                <span className="font-bold text-xs text-slate-900 dark:text-white block">Elena Rostova</span>
                <span className="text-[10px] text-slate-400">Co-Founder &amp; COO, CloudOps SaaS</span>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-[#0c1220] border border-slate-200 dark:border-white/10 space-y-4">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                ))}
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed italic">
                "Our agency closed three $15k retainers in Q3 exclusively from LeadFlow LinkedIn outreach sequences. The ROI has been over 7x."
              </p>
              <div className="pt-2 border-t border-slate-100 dark:border-white/10">
                <span className="font-bold text-xs text-slate-900 dark:text-white block">Devon Vance</span>
                <span className="text-[10px] text-slate-400">Managing Director, Studio Apex</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================
          10. COMMON QUESTIONS (FAQ Accordion)
      ======================================================== */}
      <section id="faq" className="py-16 sm:py-24 border-b border-slate-200 dark:border-white/10 bg-white/40 dark:bg-black/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-2 block">
              COMMON QUESTIONS
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Everything you need to know
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => {
              const isOpen = activeFaq === i;
              return (
                <div 
                  key={i}
                  className="bg-white dark:bg-[#0c1220] border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-xs transition"
                >
                  <button
                    type="button"
                    onClick={() => setActiveFaq(isOpen ? null : i)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-indigo-600 dark:text-indigo-400 font-bold">
                        0{i + 1}
                      </span>
                      <span className="text-sm font-bold text-slate-900 dark:text-white">
                        {faq.q}
                      </span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-indigo-500' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-white/5 pt-3 animate-fadeIn">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================
          11. FINAL CTA SECTION
      ======================================================== */}
      <section className="py-20 sm:py-28 relative overflow-hidden bg-gradient-to-b from-indigo-950/20 via-[#070a12] to-[#070a12] border-b border-slate-200 dark:border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative">
          
          <div className="w-14 h-14 rounded-3xl bg-indigo-600 text-white flex items-center justify-center shadow-xl shadow-indigo-600/30 mx-auto">
            <Send className="w-7 h-7 transform -rotate-12" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Ready to scale <span className="italic text-indigo-500">your pipeline?</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            Book a 30-minute fit call to review your target market, channel economics, and get an exact outbound plan tailored to your sales capacity.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => handleOpenBooking('Website Footer CTA')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white text-sm font-bold shadow-xl shadow-indigo-600/30 transition cursor-pointer flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book A Call &bull; 30 Min Fit Review</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => {
                if (currentUser && onEnterWorkspace) {
                  onEnterWorkspace();
                } else if (onOpenLoginModal) {
                  onOpenLoginModal();
                }
              }}
              className="w-full sm:w-auto px-6 py-4 rounded-2xl border border-slate-300 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-800 dark:text-white text-sm font-bold hover:border-indigo-500 transition cursor-pointer flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4 text-indigo-500" />
              <span>ALM Nexus Client &amp; Ops Suite</span>
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================
          12. COMPREHENSIVE FOOTER (An ALM Nexus Product)
      ======================================================== */}
      <footer className="border-t border-slate-200 dark:border-white/10 bg-white dark:bg-[#050810] text-slate-600 dark:text-slate-400 py-12 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Top Row: Brand & Product Attribution */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-200 dark:border-white/10">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-black text-slate-900 dark:text-white">
                  LeadFlow
                </span>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/40 font-mono">
                  An ALM Nexus Product
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-md">
                LeadFlow is the specialized B2B outbound lead generation engine of the ALM Nexus Enterprise Client Handling &amp; Project Operations Suite.
              </p>
            </div>

            {/* Quick module links */}
            <div className="flex flex-wrap gap-4 text-xs font-mono">
              <a href="#services" className="hover:text-indigo-500 transition">Services</a>
              <a href="#case-studies" className="hover:text-indigo-500 transition">Case Studies</a>
              <a href="#calculator" className="hover:text-indigo-500 transition">ROI Calculator</a>
              <a href="#free-tools" className="hover:text-indigo-500 transition">Free Tools</a>
              <a href="#pricing" className="hover:text-indigo-500 transition">Pricing</a>
              <a href="#faq" className="hover:text-indigo-500 transition">FAQ</a>
              <button 
                onClick={() => {
                  if (currentUser && onEnterWorkspace) onEnterWorkspace();
                  else if (onOpenLoginModal) onOpenLoginModal();
                }}
                className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline"
              >
                ALM Nexus Workspace &rarr;
              </button>
            </div>
          </div>

          {/* Bottom Row: Copyright & Legal */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono">
            <p>
              &copy; 2026 LeadFlow &bull; A Product by ALM Nexus Operations Platform. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <span>SOP 1–11 Compliant</span>
              <span>&bull;</span>
              <span>Primary Domain Protection</span>
              <span>&bull;</span>
              <span>GDPR &amp; CAN-SPAM Certified</span>
            </div>
          </div>

        </div>
      </footer>

      {/* Booking Modal */}
      <LeadFlowBookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        preselectedPlan={selectedPlanForBooking}
      />
    </div>
  );
};
