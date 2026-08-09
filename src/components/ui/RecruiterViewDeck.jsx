import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles, Download, Copy, Check, ExternalLink, Mail, Phone,
  Github, Linkedin, ShieldCheck, Zap, Award, CheckCircle2,
  ArrowRight, X, BarChart3, PieChart, UserCheck, Code2
} from 'lucide-react';
import { useRecruiter } from '../../contexts/RecruiterContext';

const RecruiterViewDeck = ({ data }) => {
  const { isRecruiterMode, toggleRecruiterMode } = useRecruiter();
  const [copiedPitch, setCopiedPitch] = useState(false);

  if (!isRecruiterMode) return null;

  const handleCopyPitch = () => {
    const pitchText = `🎯 CANDIDATE SUMMARY FOR HIRING MANAGER
──────────────────────────────────────
Name: Altaf Khan
Target Roles: Data Analyst | Data Scientist | ML Specialist
Degree: B.Tech Computer Science & Engineering (Class of 2026)
University: Gurugram University
Core Skills: Python, SQL, Pandas, NumPy, Scikit-learn, Power BI, Data Cleaning, EDA, ML Feasibility
Key Highlights:
• 4+ Public Projects (Novaflix, NovaRecon, RealityML, Nova-AI)
• Certified by NPTEL & Cisco Networking Academy
• Available Immediately for Full-Time & Internship opportunities

Links & Contact:
• Portfolio: https://ialtaf14.vercel.app
• GitHub: https://github.com/ialtaf14
• LinkedIn: https://www.linkedin.com/in/ialtaf14/
• Email: altafkhan122105@gmail.com
──────────────────────────────────────`;

    navigator.clipboard.writeText(pitchText);
    setCopiedPitch(true);
    setTimeout(() => setCopiedPitch(false), 3000);
  };

  const topProjects = [
    {
      title: 'RealityML',
      category: 'Machine Learning Suite',
      desc: 'Automated ML model evaluation & dataset feasibility suite with real-time accuracy scoring.',
      stack: ['Python', 'Scikit-Learn', 'Pandas', 'Streamlit'],
      github: 'https://github.com/ialtaf14/RealityML',
    },
    {
      title: 'Nova AI',
      category: 'Generative AI Tool',
      desc: 'Multi-modal AI assistant powered by Gemini API for text, vision, and contextual reasoning.',
      stack: ['Python', 'Gemini API', 'React', 'Tailwind'],
      github: 'https://github.com/ialtaf14/Nova-AI',
    },
    {
      title: 'Data Analytics Pipeline',
      category: 'Data Science & EDA',
      desc: 'End-to-end data extraction, cleaning, SQL analysis, and interactive visualization dashboard.',
      stack: ['SQL', 'Python', 'Power BI', 'EDA'],
      github: 'https://github.com/ialtaf14',
    }
  ];

  const skillMetrics = [
    { skill: 'SQL & Database Querying', pct: 92, color: 'bg-emerald-500' },
    { skill: 'Python Data Analysis & EDA', pct: 90, color: 'bg-blue-500' },
    { skill: 'ML Modeling & Scikit-Learn', pct: 85, color: 'bg-amber-500' },
    { skill: 'Power BI & Visual Dashboards', pct: 84, color: 'bg-purple-500' },
    { skill: 'Data Cleaning & Wrangling', pct: 94, color: 'bg-teal-500' }
  ];

  const roleAlignment = [
    { role: 'Data Analyst', match: 100, color: 'bg-emerald-500' },
    { role: 'Data Scientist (Junior)', match: 90, color: 'bg-blue-500' },
    { role: 'ML Engineer (Junior)', match: 85, color: 'bg-amber-500' }
  ];

  return (
    <div className="w-full max-w-[1400px] mx-auto space-y-6 my-6 px-2 sm:px-4">
      
      {/* Recruiter Floating Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-amber-500/10 to-orange-500/15 border-2 border-amber-500/40 dark:border-amber-500/30 backdrop-blur-md shadow-xl text-neutral-900 dark:text-neutral-100"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500 text-neutral-950 font-bold shadow-md shadow-amber-500/30 flex-shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold tracking-tight text-amber-900 dark:text-amber-300">
                  RECRUITER 30-SECOND EXECUTIVE DECK
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500 text-white">
                  VERIFIED CANDIDATE
                </span>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-300 mt-0.5">
                Full candidate breakdown with side analytics pivot charts & 1-click HR sharing.
              </p>
            </div>
          </div>

          <div className="flex items-center flex-wrap gap-2">
            <a
              href="/cv/Altaf_Khan_CV.pdf"
              download
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors shadow-md"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Resume PDF</span>
            </a>

            <button
              onClick={handleCopyPitch}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all shadow-md ${
                copiedPitch
                  ? 'bg-emerald-600 text-white'
                  : 'bg-amber-500 text-neutral-950 hover:bg-amber-400'
              }`}
            >
              {copiedPitch ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedPitch ? 'Copied Pitch!' : 'Copy Pitch for HR'}</span>
            </button>

            <button
              onClick={toggleRecruiterMode}
              title="Exit Recruiter View"
              className="p-2 rounded-xl bg-neutral-200/80 dark:bg-neutral-800/80 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-300 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Main 3-Column Layout with Side Pivot Charts */}
      <div className="grid lg:grid-cols-12 gap-6 items-start">
        
        {/* 👈 LEFT SIDE PIVOT PANEL (Skill Proficiency & Fast Metrics) */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-3 space-y-4"
        >
          {/* Skill Pivot Breakdown Bar Chart */}
          <div className="p-4 rounded-2xl bg-white/90 dark:bg-neutral-900/90 border border-neutral-200 dark:border-neutral-800 shadow-md space-y-3">
            <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-2">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-emerald-500" />
                <span className="text-xs font-mono font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-wider">
                  Skill Mastery Pivot
                </span>
              </div>
              <span className="text-[10px] font-mono text-neutral-400">Score</span>
            </div>

            <div className="space-y-2.5 pt-1">
              {skillMetrics.map((item) => (
                <div key={item.skill} className="space-y-1">
                  <div className="flex justify-between text-[11px] font-mono">
                    <span className="text-neutral-700 dark:text-neutral-300 truncate max-w-[170px]">{item.skill}</span>
                    <span className="font-bold text-neutral-900 dark:text-white">{item.pct}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.pct}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className={`h-full rounded-full ${item.color}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Verification Pivot Summary Card */}
          <div className="p-4 rounded-2xl bg-white/90 dark:bg-neutral-900/90 border border-neutral-200 dark:border-neutral-800 shadow-md space-y-2.5">
            <div className="flex items-center gap-2 border-b border-neutral-100 dark:border-neutral-800 pb-2">
              <UserCheck className="w-4 h-4 text-blue-500" />
              <span className="text-xs font-mono font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-wider">
                Quick Candidate Fast-Facts
              </span>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className="flex items-center justify-between p-2 rounded-xl bg-neutral-50 dark:bg-neutral-800/60">
                <span className="text-neutral-500">Graduation</span>
                <span className="font-bold text-neutral-900 dark:text-white">2026 (B.Tech)</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-neutral-50 dark:bg-neutral-800/60">
                <span className="text-neutral-500">Activity</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">184+ Commits</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-neutral-50 dark:bg-neutral-800/60">
                <span className="text-neutral-500">Repos</span>
                <span className="font-bold text-blue-600 dark:text-blue-400">15+ Public</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-neutral-50 dark:bg-neutral-800/60">
                <span className="text-neutral-500">Location</span>
                <span className="font-bold text-neutral-900 dark:text-white">India (Remote/Hybrid)</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 🏢 CENTER COLUMN (Executive Cards & Priority Projects) */}
        <div className="lg:col-span-6 space-y-4">
          
          {/* Main 3-Card Summary Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3">
            
            {/* Profile Summary */}
            <div className="p-4 rounded-2xl bg-white/90 dark:bg-neutral-900/90 border border-neutral-200 dark:border-neutral-800 shadow-md space-y-2">
              <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-2">
                <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                  Profile
                </span>
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-neutral-900 dark:text-white">
                  Altaf Khan
                </h4>
                <div className="space-y-1 text-[11px] text-neutral-600 dark:text-neutral-300 font-mono">
                  <div><span className="text-neutral-400">Target:</span> Data Analyst / Scientist</div>
                  <div><span className="text-neutral-400">Degree:</span> B.Tech CSE (2026)</div>
                  <div><span className="text-neutral-400">Univ:</span> GGSIPU / MECW</div>
                  <div className="text-emerald-600 dark:text-emerald-400 font-semibold pt-0.5">● Immediate Availability</div>
                </div>
              </div>
            </div>

            {/* Core Tech Stack */}
            <div className="p-4 rounded-2xl bg-white/90 dark:bg-neutral-900/90 border border-neutral-200 dark:border-neutral-800 shadow-md space-y-2">
              <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-2">
                <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                  Core Stack
                </span>
                <Zap className="w-4 h-4 text-amber-500" />
              </div>
              <div className="flex flex-wrap gap-1 pt-0.5">
                {['Python', 'SQL', 'Pandas', 'NumPy', 'Scikit-Learn', 'Power BI', 'EDA', 'Data Cleaning', 'Git'].map((s) => (
                  <span
                    key={s}
                    className="px-2 py-0.5 rounded text-[10px] font-mono bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200/60 dark:border-neutral-700/60"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Direct Reach */}
            <div className="p-4 rounded-2xl bg-white/90 dark:bg-neutral-900/90 border border-neutral-200 dark:border-neutral-800 shadow-md space-y-2 md:col-span-2 xl:col-span-1">
              <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-2">
                <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                  Direct Reach
                </span>
                <Phone className="w-4 h-4 text-emerald-500" />
              </div>
              <div className="space-y-1.5 text-[11px] font-mono">
                <a href="mailto:altafkhan122105@gmail.com" className="flex items-center justify-between p-1.5 rounded-lg bg-neutral-50 dark:bg-neutral-800/60 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
                  <span className="truncate max-w-[150px]">altafkhan122105@gmail.com</span>
                  <Mail className="w-3 h-3 text-blue-500 flex-shrink-0" />
                </a>
                <a href="https://wa.me/918053821088" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-1.5 rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-semibold hover:bg-emerald-500/20 transition-colors">
                  <span>+91 80538 21088</span>
                  <Phone className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                </a>
              </div>
            </div>

          </div>

          {/* Recruiter Priority Projects Row */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-mono font-bold text-neutral-500 uppercase tracking-wider flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-500" />
                <span>Priority Review Projects</span>
              </h4>
              <a href="#github-projects" className="text-[11px] font-mono text-blue-500 hover:underline">
                View All →
              </a>
            </div>

            <div className="grid md:grid-cols-3 gap-3">
              {topProjects.map((p) => (
                <div
                  key={p.title}
                  className="p-3 rounded-2xl bg-white dark:bg-neutral-900 border border-amber-500/30 hover:border-amber-500/60 shadow-sm space-y-1.5 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-700 dark:text-amber-300">
                      {p.category}
                    </span>
                    <a href={p.github} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-neutral-900 dark:hover:text-white">
                      <Github className="w-3.5 h-3.5" />
                    </a>
                  </div>
                  <h5 className="text-xs font-bold text-neutral-900 dark:text-white leading-tight">
                    {p.title}
                  </h5>
                  <p className="text-[11px] text-neutral-500 leading-snug line-clamp-2">
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* 👉 RIGHT SIDE PIVOT PANEL (Target Role Match & Recruiter Checklist) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-3 space-y-4"
        >
          {/* Target Role Match Pivot Card */}
          <div className="p-4 rounded-2xl bg-white/90 dark:bg-neutral-900/90 border border-neutral-200 dark:border-neutral-800 shadow-md space-y-3">
            <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-2">
              <div className="flex items-center gap-2">
                <PieChart className="w-4 h-4 text-purple-500" />
                <span className="text-xs font-mono font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-wider">
                  Role Fit Pivot
                </span>
              </div>
              <span className="text-[10px] font-mono text-neutral-400">Match</span>
            </div>

            <div className="space-y-2.5 pt-1">
              {roleAlignment.map((r) => (
                <div key={r.role} className="space-y-1">
                  <div className="flex justify-between text-[11px] font-mono">
                    <span className="text-neutral-700 dark:text-neutral-300">{r.role}</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">{r.match}% Fit</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${r.match}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
                      className={`h-full rounded-full ${r.color}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Verification Checklist Card */}
          <div className="p-4 rounded-2xl bg-white/90 dark:bg-neutral-900/90 border border-neutral-200 dark:border-neutral-800 shadow-md space-y-2.5">
            <div className="flex items-center gap-2 border-b border-neutral-100 dark:border-neutral-800 pb-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span className="text-xs font-mono font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-wider">
                Recruiter Audit Check
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                <span>B.Tech Degree in Progress (2026)</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                <span>Python & SQL Code Verified</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                <span>Live Interactive Web Apps</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                <span>Downloadable Resume PDF</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                <span>Immediate Joining Available</span>
              </div>
            </div>
          </div>
        </motion.div>

      </div>

    </div>
  );
};

export default RecruiterViewDeck;
