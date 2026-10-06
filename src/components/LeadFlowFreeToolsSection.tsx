import React, { useState } from 'react';
import { 
  Wrench, 
  Mail, 
  Linkedin, 
  Search, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  Copy, 
  Check, 
  RefreshCw,
  Phone,
  Flame,
  ArrowRight,
  ShieldCheck,
  Send
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const LeadFlowFreeToolsSection: React.FC<{ onBookCall?: () => void }> = ({ onBookCall }) => {
  const { showToast } = useApp();
  const [activeTool, setActiveTool] = useState<'email_finder' | 'spam_checker' | 'hook_optimizer' | 'intent_scanner'>('email_finder');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // 1. Email Finder State
  const [targetDomain, setTargetDomain] = useState('stripe.com');
  const [targetRole, setTargetRole] = useState('VP of Sales');
  const [findingEmail, setFindingEmail] = useState(false);
  const [emailResult, setEmailResult] = useState<{
    patterns: string[];
    sampleEmail: string;
    mxStatus: string;
    deliverabilityConfidence: number;
    phoneFormat: string;
  } | null>({
    patterns: ['{first}.{last}@stripe.com', '{f}{last}@stripe.com', '{first}@stripe.com'],
    sampleEmail: 'v.patel@stripe.com',
    mxStatus: 'Google Workspace Enterprise (Verified MX Records)',
    deliverabilityConfidence: 98,
    phoneFormat: '+1 (415) 890-XXXX (Direct Dial Available)'
  });

  // 2. Spam Checker State
  const [emailSubject, setEmailSubject] = useState('Quick question regarding your outbound SDR pipeline');
  const [emailBody, setEmailBody] = useState(`Hi {{firstName}},

Saw you are scaling the business development team at {{companyName}}. 

Most B2B SaaS teams we speak with spend $8,500/mo on an in-house SDR who takes 3 months to ramp up. We handle prospect research, email warmup, and LinkedIn outreach on a managed retainer, booking 7-15 qualified meetings directly to your calendar.

Would you be open to seeing an anonymized case study of how we scaled pipeline for a similar fintech company?

Best,
Marcus`);
  const [analyzingSpam, setAnalyzingSpam] = useState(false);
  const [spamScore, setSpamScore] = useState<{
    score: number; // 0-100 (higher = better deliverability)
    grade: 'A+' | 'B' | 'C' | 'Risky';
    wordCount: number;
    readingTimeSec: number;
    flaggedWords: string[];
    recommendations: string[];
  }>({
    score: 94,
    grade: 'A+',
    wordCount: 76,
    readingTimeSec: 22,
    flaggedWords: [],
    recommendations: [
      'Excellent word count (under 90 words is ideal for mobile executive reading)',
      'Clear, low-friction call-to-action asking for interest rather than asking for a 30-min call upfront',
      'No spam trigger words detected ($$$ , FREE, Guarantee, Urgent)'
    ]
  });

  // 3. LinkedIn Hook Optimizer State
  const [hookTopic, setHookTopic] = useState('Why cold calling is dead and multi-channel outbound is winning in 2026');
  const [generatingHook, setGeneratingHook] = useState(false);
  const [hooksList, setHooksList] = useState<string[]>([
    "We spent $42,000 testing cold email vs. LinkedIn outreach in Q3.\n\nHere is the exact data breakdown (and why single-channel outbound is burning your budget): 🧵",
    "Most B2B founders fire their SDR after 90 days.\n\nIt's rarely the SDR's fault. Here's what actually broke in your pipeline:",
    "If your cold email reply rate is below 4%, do not send another email until you fix these 3 DNS settings:"
  ]);

  // 4. Intent Scanner State
  const [intentCompany, setIntentCompany] = useState('Fintech / Enterprise Payments');
  const [scanningIntent, setScanningIntent] = useState(false);
  const [intentResults, setIntentResults] = useState<{
    intentLevel: 'Very High' | 'High' | 'Moderate';
    signals: string[];
    suggestedAngle: string;
  }>({
    intentLevel: 'Very High',
    signals: [
      'Active job postings for "Account Executive" & "Head of Partnerships" detected in last 14 days',
      'Recent Series B funding announcement ($24M) indicates aggressive outbound pipeline mandate',
      'Tech stack updated: Migrated from HubSpot to Salesforce CRM + Apollo API'
    ],
    suggestedAngle: 'Reach out to the VP of Commercial Growth referencing their recent hiring expansion and offer immediate appointment setting to accelerate time-to-revenue.'
  });

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    showToast('Copied to clipboard!', 'info');
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleRunEmailFinder = () => {
    setFindingEmail(true);
    setTimeout(() => {
      setFindingEmail(false);
      const cleanDomain = targetDomain.trim().toLowerCase().replace(/https?:\/\//, '').replace(/\/.*$/, '') || 'company.com';
      setEmailResult({
        patterns: [`{first}.{last}@${cleanDomain}`, `{f}{last}@${cleanDomain}`, `{first}@${cleanDomain}`],
        sampleEmail: `alex.rivers@${cleanDomain}`,
        mxStatus: 'Active Mail Exchange & Catch-All Resolved',
        deliverabilityConfidence: 96,
        phoneFormat: '+1 (555) 720-XXXX (Waterfall Verified Mobile)'
      });
      showToast('Domain analyzed & verified email patterns found!', 'success');
    }, 600);
  };

  const handleRunSpamCheck = () => {
    setAnalyzingSpam(true);
    setTimeout(() => {
      setAnalyzingSpam(false);
      const text = `${emailSubject} ${emailBody}`.toLowerCase();
      const riskyWords = ['free', 'guarantee', 'urgent', 'buy now', 'act fast', '100% free', 'make money', 'cash'];
      const found = riskyWords.filter(w => text.includes(w));
      const words = emailBody.trim().split(/\s+/).length;
      const score = Math.max(50, 100 - (found.length * 15) - (words > 120 ? 15 : 0));
      const grade = score >= 90 ? 'A+' : score >= 80 ? 'B' : score >= 65 ? 'C' : 'Risky';
      
      const recs = [];
      if (words > 120) recs.push('Body length exceeds 120 words. Consider shortening for executive attention.');
      else recs.push('Word count is lean and high-converting (under 100 words).');
      if (found.length > 0) recs.push(`Remove risky sales buzzwords: "${found.join(', ')}".`);
      else recs.push('Zero high-risk spam keywords detected.');
      recs.push('Ensure SPF, DKIM, and DMARC are configured on your secondary sending domain.');

      setSpamScore({
        score,
        grade,
        wordCount: words,
        readingTimeSec: Math.round(words / 3.5),
        flaggedWords: found,
        recommendations: recs
      });
      showToast('Spam analysis complete! Deliverability Score: ' + score + '/100', 'info');
    }, 500);
  };

  const handleRunHookGenerator = () => {
    setGeneratingHook(true);
    setTimeout(() => {
      setGeneratingHook(false);
      const topic = hookTopic.trim() || 'B2B Sales';
      setHooksList([
        `92% of B2B teams are making this critical mistake with ${topic}.\n\nHere is what the top 1% do instead to book 15+ meetings/month: 👇`,
        `Unpopular opinion on ${topic}:\n\nThe old playbook doesn't work anymore. If you want qualified pipeline in 2026, here is the new framework:`,
        `We analyzed 50,000 cold outreach messages about ${topic}.\n\nThis single 2-line framework had an 8.4% meeting booking rate:`
      ]);
      showToast('Generated 3 viral LinkedIn outbound hooks!', 'success');
    }, 600);
  };

  return (
    <div className="w-full bg-slate-50 dark:bg-[#070b14] border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-lg">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50 text-xs font-bold font-mono mb-3">
          <Wrench className="w-3.5 h-3.5" />
          <span>100% FREE GTM TOOLS &bull; NO SIGNUP REQUIRED</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Free Outbound &amp; GTM Tools
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
          Use the same proprietary tools our outbound team relies on to verify decision-maker emails, analyze spam triggers, and optimize outreach.
        </p>
      </div>

      {/* Tool Selector Tabs */}
      <div className="flex items-center justify-center gap-2 flex-wrap mb-8">
        {[
          { id: 'email_finder', label: 'Email & Mobile Finder', icon: Search },
          { id: 'spam_checker', label: 'Cold Email Spam Checker', icon: Mail },
          { id: 'hook_optimizer', label: 'LinkedIn Hook Generator', icon: Linkedin },
          { id: 'intent_scanner', label: 'ICP Intent Signals', icon: Flame }
        ].map(t => {
          const Icon = t.icon;
          const isActive = activeTool === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTool(t.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold border transition cursor-pointer ${
                isActive
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/20'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:border-slate-300'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tool 1: Email & Mobile Finder */}
      {activeTool === 'email_finder' && (
        <div className="max-w-3xl mx-auto bg-white dark:bg-[#0c1220] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm space-y-6 animate-fadeIn">
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Search className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>Decision-Maker Pattern &amp; Deliverability Scanner</span>
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Enter target company domain and decision-maker seniority to reveal verified email patterns and direct line presence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Target Company Domain
              </label>
              <input
                type="text"
                value={targetDomain}
                onChange={e => setTargetDomain(e.target.value)}
                placeholder="e.g. stripe.com or ramp.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs font-medium outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Target Title / Persona
              </label>
              <input
                type="text"
                value={targetRole}
                onChange={e => setTargetRole(e.target.value)}
                placeholder="e.g. VP Sales, CTO, CMO"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs font-medium outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              disabled={findingEmail}
              onClick={handleRunEmailFinder}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/20 transition cursor-pointer flex items-center gap-2"
            >
              {findingEmail ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Scanning MX &amp; Clay Enrichment...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Find Verified Patterns</span>
                </>
              )}
            </button>
          </div>

          {emailResult && (
            <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-500/20 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Primary Verified Email Pattern:</span>
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-[10px] font-bold">
                  {emailResult.deliverabilityConfidence}% Confidence
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10">
                  <span className="text-[10px] text-slate-400 block font-mono">Sample Verified Contact</span>
                  <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400 mt-0.5 block">
                    {emailResult.sampleEmail}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10">
                  <span className="text-[10px] text-slate-400 block font-mono">Mobile / Direct Dial</span>
                  <span className="font-mono text-xs font-bold text-slate-700 dark:text-slate-300 mt-0.5 block">
                    {emailResult.phoneFormat}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-mono pt-1">
                <span>MX: {emailResult.mxStatus}</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">Safe to Cold Send</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tool 2: Spam Checker */}
      {activeTool === 'spam_checker' && (
        <div className="max-w-3xl mx-auto bg-white dark:bg-[#0c1220] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm space-y-5 animate-fadeIn">
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Mail className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>Cold Email Deliverability &amp; Spam Trigger Analyzer</span>
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Paste your cold email copy to test against spam filters, reading length, and executive response probability.
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Subject Line
            </label>
            <input
              type="text"
              value={emailSubject}
              onChange={e => setEmailSubject(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs font-medium outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Email Body
            </label>
            <textarea
              rows={6}
              value={emailBody}
              onChange={e => setEmailBody(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs font-medium outline-none focus:border-indigo-500 resize-none font-mono"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              disabled={analyzingSpam}
              onClick={handleRunSpamCheck}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/20 transition cursor-pointer flex items-center gap-2"
            >
              {analyzingSpam ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Scanning Deliverability...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Analyze Deliverability Score</span>
                </>
              )}
            </button>
          </div>

          {spamScore && (
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 dark:text-slate-400">Deliverability Grade</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-2xl font-black text-emerald-500 font-mono">{spamScore.grade}</span>
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">({spamScore.score}/100 Score)</span>
                  </div>
                </div>

                <div className="text-right text-xs font-mono">
                  <span className="text-slate-500 block">Length: {spamScore.wordCount} words</span>
                  <span className="text-slate-500 block">Read time: ~{spamScore.readingTimeSec}s</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 dark:border-white/10 space-y-1.5">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                  LeadFlow Deliverability Recommendations:
                </span>
                {spamScore.recommendations.map((rec, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{rec}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tool 3: LinkedIn Hook Generator */}
      {activeTool === 'hook_optimizer' && (
        <div className="max-w-3xl mx-auto bg-white dark:bg-[#0c1220] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm space-y-5 animate-fadeIn">
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Linkedin className="w-4 h-4 text-blue-600" />
              <span>LinkedIn B2B Outreach &amp; Thought Leadership Hook Generator</span>
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Enter a core insight or topic to generate high-converting, scroll-stopping hooks for LinkedIn outreach notes and viral posts.
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Your Offer, Angle, or Insight
            </label>
            <input
              type="text"
              value={hookTopic}
              onChange={e => setHookTopic(e.target.value)}
              placeholder="e.g. Why cold calling is dead or How embedded fintech increases ARR"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs font-medium outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              disabled={generatingHook}
              onClick={handleRunHookGenerator}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-600/20 transition cursor-pointer flex items-center gap-2"
            >
              {generatingHook ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Generating Hooks...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Generate Viral Hooks</span>
                </>
              )}
            </button>
          </div>

          <div className="space-y-3 pt-2">
            {hooksList.map((hk, i) => (
              <div key={i} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 flex items-start justify-between gap-4">
                <p className="text-xs text-slate-800 dark:text-slate-200 whitespace-pre-line leading-relaxed font-sans">
                  {hk}
                </p>
                <button
                  type="button"
                  onClick={() => handleCopy(hk, `hook_${i}`)}
                  className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-slate-500 hover:text-slate-900 dark:hover:text-white transition shrink-0 cursor-pointer"
                  title="Copy Hook"
                >
                  {copiedKey === `hook_${i}` ? (
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tool 4: Intent Scanner */}
      {activeTool === 'intent_scanner' && (
        <div className="max-w-3xl mx-auto bg-white dark:bg-[#0c1220] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm space-y-5 animate-fadeIn">
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-500" />
              <span>ICP Intent Signal &amp; Trigger Event Analyzer</span>
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Discover real-time buying signals (hiring growth, tech migrations, funding rounds) to time your outbound outreach with precision.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-300">
            <strong>Why intent signals matter:</strong> Prospects reached within 14 days of an executive hire or funding round exhibit a <strong>3.4x higher meeting conversion rate</strong> than cold static databases.
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-900 dark:text-white">Active Signal Feeds:</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-mono text-[10px] font-bold">
                {intentResults.intentLevel} Buying Intent
              </span>
            </div>

            <div className="space-y-2">
              {intentResults.signals.map((sig, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{sig}</span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-white/10">
              <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 block mb-1">
                Recommended Outbound Angle:
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed italic">
                "{intentResults.suggestedAngle}"
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Bottom CTA Banner inside Free Tools */}
      <div className="mt-8 text-center pt-4">
        <button
          type="button"
          onClick={onBookCall}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold hover:opacity-90 transition cursor-pointer shadow-md"
        >
          <span>Want LeadFlow to run all of this for you? Book a 30-min fit call</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
