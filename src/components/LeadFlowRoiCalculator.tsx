import React, { useState } from 'react';
import { 
  Calculator, 
  TrendingUp, 
  DollarSign, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  Zap,
  Building,
  Users
} from 'lucide-react';

interface LeadFlowRoiCalculatorProps {
  onBookCall?: () => void;
}

export const LeadFlowRoiCalculator: React.FC<LeadFlowRoiCalculatorProps> = ({ onBookCall }) => {
  const [dealSize, setDealSize] = useState<number>(6500); // Average deal size
  const [prospectsPerMonth, setProspectsPerMonth] = useState<number>(2500);
  const [closeRatePercent, setCloseRatePercent] = useState<number>(20);
  const [selectedIndustry, setSelectedIndustry] = useState<'saas' | 'agency' | 'enterprise'>('saas');

  // LeadFlow standard conversion metrics grounded in real campaigns:
  // Typical positive reply rate: 4.8% - 7.5%
  // Typical meeting booking rate from positive replies: 35% - 50%
  // Qualified meetings per 1000 prospects: 6 to 9 SQLs
  const meetingRatePer1000 = selectedIndustry === 'saas' ? 7.2 : selectedIndustry === 'agency' ? 8.5 : 5.8;
  const projectedMeetings = Math.round((prospectsPerMonth / 1000) * meetingRatePer1000);
  const projectedDeals = Math.max(1, Math.round(projectedMeetings * (closeRatePercent / 100)));
  const monthlyPipeline = projectedMeetings * dealSize;
  const projectedRevenue = projectedDeals * dealSize;
  
  // LeadFlow standard retainer cost benchmark ($2,990 for 2,500 prospects)
  const estimatedCost = prospectsPerMonth <= 1000 ? 999 : prospectsPerMonth <= 3000 ? 2990 : 5490;
  const netProfit = projectedRevenue - estimatedCost;
  const roiMultiple = Number((projectedRevenue / estimatedCost).toFixed(1));

  // In-house SDR comparison:
  // US/EU SDR base salary $6,000 + Benefits $1,200 + Tech stack (Apollo, SalesNav, Clay, Instantly) $1,300 = ~$8,500/mo
  const inHouseSdrCost = 8500;
  const monthlySavingsVsSdr = Math.max(0, inHouseSdrCost - estimatedCost);

  return (
    <div className="w-full bg-white dark:bg-[#0c1220] border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl shadow-slate-900/5">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
        
        {/* Left: Interactive Controls */}
        <div className="w-full lg:w-1/2 space-y-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/50 text-xs font-bold font-mono mb-2">
              <Calculator className="w-3.5 h-3.5" />
              <span>OUTBOUND ROI SIMULATOR</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Calculate Your Revenue Velocity
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Adjust parameters based on your business model to see projected qualified meetings and net revenue multiple.
            </p>
          </div>

          {/* Industry Preset */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
              Business Model &amp; ICP Target
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'saas', label: 'B2B SaaS', desc: '$2k-$10k ACV' },
                { id: 'agency', label: 'Agency / Studio', desc: '$4k-$20k Retainer' },
                { id: 'enterprise', label: 'B2B Enterprise', desc: '$15k-$50k+ Contract' }
              ].map(ind => (
                <button
                  key={ind.id}
                  type="button"
                  onClick={() => setSelectedIndustry(ind.id as any)}
                  className={`p-3 rounded-2xl border text-left transition cursor-pointer ${
                    selectedIndustry === ind.id
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/20'
                      : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-indigo-400'
                  }`}
                >
                  <span className="block text-xs font-bold">{ind.label}</span>
                  <span className={`text-[10px] block mt-0.5 ${selectedIndustry === ind.id ? 'text-indigo-100' : 'text-slate-400'}`}>
                    {ind.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Slider 1: Average Deal Size */}
          <div>
            <div className="flex justify-between items-center mb-2 text-xs font-bold">
              <span className="text-slate-700 dark:text-slate-300">Average Deal Size (ACV):</span>
              <span className="font-mono text-base text-indigo-600 dark:text-indigo-400">
                ${dealSize.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min={1500}
              max={30000}
              step={500}
              value={dealSize}
              onChange={e => setDealSize(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
              <span>$1.5k</span>
              <span>$15k</span>
              <span>$30k+</span>
            </div>
          </div>

          {/* Slider 2: Monthly Prospects Outreached */}
          <div>
            <div className="flex justify-between items-center mb-2 text-xs font-bold">
              <span className="text-slate-700 dark:text-slate-300">Monthly Prospect Volume:</span>
              <span className="font-mono text-base text-indigo-600 dark:text-indigo-400">
                {prospectsPerMonth.toLocaleString()} verified contacts
              </span>
            </div>
            <input
              type="range"
              min={1000}
              max={5000}
              step={500}
              value={prospectsPerMonth}
              onChange={e => setProspectsPerMonth(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
              <span>1,000 (Pilot)</span>
              <span>3,000 (Business)</span>
              <span>5,000 (Enterprise)</span>
            </div>
          </div>

          {/* Slider 3: Close Rate */}
          <div>
            <div className="flex justify-between items-center mb-2 text-xs font-bold">
              <span className="text-slate-700 dark:text-slate-300">Your Sales Closing Rate:</span>
              <span className="font-mono text-base text-indigo-600 dark:text-indigo-400">
                {closeRatePercent}%
              </span>
            </div>
            <input
              type="range"
              min={10}
              max={40}
              step={5}
              value={closeRatePercent}
              onChange={e => setCloseRatePercent(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
              <span>10% (Conservative)</span>
              <span>20% (Average)</span>
              <span>40% (Top Tier)</span>
            </div>
          </div>
        </div>

        {/* Right: Projected Metrics Display Card */}
        <div className="w-full lg:w-1/2 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-indigo-900/20 via-slate-900/40 to-slate-900/80 border border-indigo-500/20 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <span className="text-xs uppercase font-mono font-bold tracking-wider text-indigo-400">
                Projected 30-Day Output
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold font-mono border border-emerald-500/20">
                {roiMultiple}x Est. ROI
              </span>
            </div>

            {/* Key Stat Highlights */}
            <div className="grid grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                <span className="text-xs text-slate-400 block font-medium">Qualified SQLs</span>
                <span className="text-2xl sm:text-3xl font-black text-white font-mono mt-1 block">
                  {projectedMeetings}
                </span>
                <span className="text-[10px] text-indigo-300 font-mono">meetings on your calendar</span>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                <span className="text-xs text-slate-400 block font-medium">Pipeline Generated</span>
                <span className="text-2xl sm:text-3xl font-black text-indigo-400 font-mono mt-1 block">
                  ${(monthlyPipeline / 1000).toFixed(0)}k
                </span>
                <span className="text-[10px] text-slate-400 font-mono">in deal opportunity</span>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                <span className="text-xs text-slate-400 block font-medium">Deals Closed</span>
                <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono mt-1 block">
                  {projectedDeals}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">at {closeRatePercent}% closing</span>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                <span className="text-xs text-slate-400 block font-medium">Projected Revenue</span>
                <span className="text-2xl sm:text-3xl font-black text-emerald-300 font-mono mt-1 block">
                  ${(projectedRevenue / 1000).toFixed(0)}k
                </span>
                <span className="text-[10px] text-emerald-400 font-mono">+${(netProfit / 1000).toFixed(0)}k net profit</span>
              </div>
            </div>

            {/* In-House SDR Comparison Banner */}
            <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-xs space-y-1.5 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-slate-300 font-bold">LeadFlow vs. Hiring In-House SDR:</span>
                <span className="text-emerald-400 font-mono font-bold">${monthlySavingsVsSdr.toLocaleString()}/mo Saved</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Hiring 1 full-time SDR typically costs <strong>$8,500/mo</strong> (base salary + recruitment fees + software licenses for SalesNav, Apollo, Clay, warmup) with 3 months ramp time. LeadFlow delivers a complete multi-channel team in <strong>7 days</strong> for <strong>${estimatedCost.toLocaleString()}/mo</strong>.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onBookCall}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-indigo-600/30 transition cursor-pointer flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Lock In This Outbound Pipeline &bull; Book Strategy Call</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
