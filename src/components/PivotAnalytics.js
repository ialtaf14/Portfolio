import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Table, BarChart2, Filter, PieChart, Layers, ArrowUpRight, ShieldCheck, Sparkles } from 'lucide-react';

const PivotAnalytics = ({ data }) => {
  const analyticsData = data?.pivotAnalytics || {
    title: 'Interactive Data Analytics & Pivot Table Engine',
    subtitle: 'Real-world Pandas & SQL Pivot Aggregations for Executive Insights',
    metrics: [
      { id: 'records', label: 'Data Points Processed', value: '1,520,000+', change: '+24.5%', isPositive: true },
      { id: 'query_speed', label: 'SQL Query Optimization', value: '4.2x Faster', change: '-76% Latency', isPositive: true },
      { id: 'accuracy', label: 'ML Model Precision Score', value: '96.4%', change: '+3.8% F1', isPositive: true },
      { id: 'dashboards', label: 'Executive BI Dashboards', value: '18 Active', change: 'Power BI & Excel', isPositive: true }
    ],
    pivotTable: [
      { category: 'Machine Learning Models', q1: 124000, q2: 158000, q3: 189000, q4: 210000, total: 681000, growth: '+69.3%', status: 'High Yield' },
      { category: 'SQL Query Pipelines', q1: 98000, q2: 112000, q3: 145000, q4: 172000, total: 527000, growth: '+75.5%', status: 'Optimal' },
      { category: 'Power BI Dashboards', q1: 85000, q2: 96000, q3: 120000, q4: 148000, total: 449000, growth: '+74.1%', status: 'Active' },
      { category: 'EDA & Feature Engineering', q1: 110000, q2: 135000, q3: 160000, q4: 195000, total: 600000, growth: '+77.2%', status: 'Core Stack' }
    ]
  };

  const [activeQuarter, setActiveQuarter] = useState('all'); // 'all', 'q1', 'q2', 'q3', 'q4'
  const [selectedMetric, setSelectedMetric] = useState('total'); // 'total', 'growth'

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <section id="analytics" className="py-24 relative bg-neutral-950/40 border-t border-neutral-800/80 overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[300px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[300px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none animate-pulse-glow" style={{ animationDelay: '2s' }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-400 backdrop-blur-md">
              <Table className="w-3.5 h-3.5" />
              <span>DATA ANALYST TOOLKIT // PIVOT ENGINE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Data Aggregation &amp; Pivot Table Dashboard
            </h2>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Demonstrating multi-dimensional Pandas &amp; SQL aggregation pipelines, KPI reporting, and data-driven insights.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-neutral-900/80 p-1.5 rounded-xl border border-neutral-800 backdrop-blur-md">
            {['all', 'q1', 'q2', 'q3', 'q4'].map((q) => (
              <button
                key={q}
                onClick={() => setActiveQuarter(q)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                  activeQuarter === q
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
                }`}
              >
                {q.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* KPI Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {analyticsData.metrics.map((m, idx) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-5 rounded-2xl glass-card border border-white/10 bg-neutral-900/60 backdrop-blur-xl relative overflow-hidden group hover:border-cyan-500/40 transition-all duration-300"
            >
              <div className="text-[11px] font-mono text-neutral-400 mb-1">{m.label}</div>
              <div className="text-2xl font-bold font-mono text-white group-hover:text-cyan-400 transition-colors">
                {m.value}
              </div>
              <div className="mt-2 inline-flex items-center gap-1 text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <ArrowUpRight className="w-3 h-3" />
                <span>{m.change}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Pivot Table + Visual Chart Card (iOS 27 Liquid Glass Container) */}
        <div className="rounded-3xl glass-photo-frame p-6 sm:p-8 bg-neutral-900/70 border border-white/10 backdrop-blur-2xl shadow-2xl relative">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <BarChart2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Pandas Pivot Matrix Aggregation</h3>
                <p className="text-xs text-neutral-400">Categorical breakdown by quarter with automated growth rates</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-neutral-400">Metric View:</span>
              <button
                onClick={() => setSelectedMetric(selectedMetric === 'total' ? 'growth' : 'total')}
                className="px-3 py-1.5 rounded-xl text-xs font-mono font-semibold bg-neutral-800/80 border border-neutral-700 text-cyan-400 hover:bg-neutral-800 transition-colors"
              >
                {selectedMetric === 'total' ? 'Show Growth %' : 'Show Revenue'}
              </button>
            </div>
          </div>

          {/* Pivot Table Grid */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
                  <th className="py-3 px-4">Analytics Dimension Category</th>
                  <th className={`py-3 px-4 text-right ${activeQuarter !== 'all' && activeQuarter !== 'q1' ? 'opacity-30' : ''}`}>Q1 2025</th>
                  <th className={`py-3 px-4 text-right ${activeQuarter !== 'all' && activeQuarter !== 'q2' ? 'opacity-30' : ''}`}>Q2 2025</th>
                  <th className={`py-3 px-4 text-right ${activeQuarter !== 'all' && activeQuarter !== 'q3' ? 'opacity-30' : ''}`}>Q3 2025</th>
                  <th className={`py-3 px-4 text-right ${activeQuarter !== 'all' && activeQuarter !== 'q4' ? 'opacity-30' : ''}`}>Q4 2025</th>
                  <th className="py-3 px-4 text-right text-cyan-400">Annual Total</th>
                  <th className="py-3 px-4 text-right text-emerald-400">YoY Growth</th>
                  <th className="py-3 px-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs font-mono">
                {analyticsData.pivotTable.map((row, i) => (
                  <tr key={i} className="hover:bg-white/[0.03] transition-colors group">
                    <td className="py-4 px-4 font-semibold text-white group-hover:text-cyan-400 transition-colors flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-cyan-400" />
                      <span>{row.category}</span>
                    </td>
                    <td className={`py-4 px-4 text-right text-neutral-300 ${activeQuarter !== 'all' && activeQuarter !== 'q1' ? 'opacity-30' : ''}`}>
                      {formatCurrency(row.q1)}
                    </td>
                    <td className={`py-4 px-4 text-right text-neutral-300 ${activeQuarter !== 'all' && activeQuarter !== 'q2' ? 'opacity-30' : ''}`}>
                      {formatCurrency(row.q2)}
                    </td>
                    <td className={`py-4 px-4 text-right text-neutral-300 ${activeQuarter !== 'all' && activeQuarter !== 'q3' ? 'opacity-30' : ''}`}>
                      {formatCurrency(row.q3)}
                    </td>
                    <td className={`py-4 px-4 text-right text-neutral-300 ${activeQuarter !== 'all' && activeQuarter !== 'q4' ? 'opacity-30' : ''}`}>
                      {formatCurrency(row.q4)}
                    </td>
                    <td className="py-4 px-4 text-right font-bold text-cyan-400">
                      {formatCurrency(row.total)}
                    </td>
                    <td className="py-4 px-4 text-right font-bold text-emerald-400">
                      {row.growth}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Visual Distribution Bar Comparison */}
          <div className="mt-8 pt-6 border-t border-white/10 space-y-3">
            <div className="text-xs font-mono text-neutral-400 flex items-center justify-between">
              <span>Visual Proportion Distribution (Pandas Aggregation Weight)</span>
              <span className="text-cyan-400">Total Pipeline Value: {formatCurrency(2257000)}</span>
            </div>
            <div className="h-3 w-full rounded-full bg-neutral-800 overflow-hidden flex p-0.5 border border-white/10">
              <div className="h-full bg-cyan-500 rounded-l-full" style={{ width: '30%' }} title="Machine Learning Models (30%)" />
              <div className="h-full bg-purple-500" style={{ width: '27%' }} title="EDA & Feature Engineering (27%)" />
              <div className="h-full bg-blue-500" style={{ width: '23%' }} title="SQL Query Pipelines (23%)" />
              <div className="h-full bg-emerald-500 rounded-r-full" style={{ width: '20%' }} title="Power BI Dashboards (20%)" />
            </div>
            <div className="flex flex-wrap items-center gap-4 text-[11px] font-mono text-neutral-400 pt-1">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-cyan-500" /> Machine Learning Models (30%)</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-purple-500" /> EDA &amp; Feature Eng. (27%)</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> SQL Pipelines (23%)</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Power BI Dashboards (20%)</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PivotAnalytics;
