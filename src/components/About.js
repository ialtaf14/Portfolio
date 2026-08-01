import React from 'react';
import { motion } from 'framer-motion';
import { User, Brain, Target, CheckCircle2, GraduationCap } from 'lucide-react';

const About = ({ data }) => {
  const stats = data.stats || [
    { number: '4+', label: 'Verified Certifications', description: 'NPTEL & Cisco' },
    { number: 'Python & SQL', label: 'Core Technical Stack', description: 'Pandas, Scikit-learn, PostgreSQL' },
    { number: 'End-to-End', label: 'Data Science Lifecycle', description: 'EDA to Model Deployment' },
    { number: '100%', label: 'Truthful Engineering', description: 'Authentic project repository' }
  ];

  const highlights = data.highlights || [
    {
      title: 'Exploratory Data Analysis (EDA)',
      description: 'Inspecting data distributions, identifying outliers, handling missing values, and generating statistical correlation matrices.'
    },
    {
      title: 'Machine Learning Pipelines',
      description: 'Formulating supervised classification and regression models, evaluating performance with cross-validation and confusion matrices.'
    },
    {
      title: 'REST API & Microservices',
      description: 'Packaging predictive algorithms and NLP tools into lightweight FastAPI and Streamlit web applications.'
    },
    {
      title: 'Relational Database Queries',
      description: 'Structuring clean relational tables, performing multi-table SQL joins, window functions, and aggregation analytics.'
    }
  ];

  const timeline = data.timeline || [
    {
      period: 'Graduated: 2026',
      title: 'Bachelor of Technology (B.Tech) – Computer Science & Engineering',
      subtitle: 'Gurugram University',
      description: 'Specializing in Data Science & Machine Learning. Focused on statistics, linear algebra, algorithms, and database systems.'
    },
    {
      period: 'Jan 2026 – Feb 2026',
      title: 'Cisco Certified Data Analytics & Data Science',
      subtitle: 'Cisco Networking Academy',
      description: 'Completed Data Analytics Essentials and Introduction to Data Science programs.'
    },
    {
      period: 'Jul 2025 – Aug 2025',
      title: 'NPTEL AI & IoT Certifications',
      subtitle: 'IIT / NPTEL',
      description: 'Earned certificates in Artificial Intelligence Concepts and Internet of Things.'
    }
  ];

  return (
    <section id="about" className="py-24 relative bg-neutral-50/50 dark:bg-neutral-950/50 border-t border-neutral-200/60 dark:border-neutral-800/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs font-mono text-neutral-600 dark:text-neutral-400">
            <User className="w-3.5 h-3.5 text-blue-500" />
            <span>ABOUT ME</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            Data Analysis, Problem Solving & Continuous Learning
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
            {data.description}
          </p>
        </div>

        {/* 4 Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-6 rounded-2xl glass-card glass-card-hover border border-neutral-200 dark:border-neutral-800 space-y-2"
            >
              <div className="text-2xl font-bold font-mono text-neutral-900 dark:text-white">
                {stat.number}
              </div>
              <div className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                {stat.label}
              </div>
              <div className="text-[11px] text-neutral-500">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Detailed Narrative & Career Objective */}
        <div className="grid lg:grid-cols-12 gap-8 items-start mb-16">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="p-8 rounded-2xl glass-card border border-neutral-200 dark:border-neutral-800 space-y-4">
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-500" />
                Technical Approach & Project Focus
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                {data.detailedDescription}
              </p>
              <div className="pt-2 flex flex-wrap gap-2">
                {['Pandas & NumPy', 'Scikit-learn', 'Power BI', 'SQL Queries', 'Matplotlib', 'Jupyter Notebook'].map((tag, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Career Objective Box */}
            <div className="p-6 rounded-2xl bg-neutral-900 dark:bg-neutral-900 text-white border border-neutral-800 space-y-3 shadow-lg">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                <Target className="w-4 h-4" />
                <span>CAREER OBJECTIVE</span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                {data.lookingFor}
              </p>
            </div>
          </div>

          {/* Core Highlights Grid */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-500 mb-2">Core Competencies</h3>
            {highlights.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-4 rounded-xl glass-card border border-neutral-200 dark:border-neutral-800 space-y-1"
              >
                <div className="flex items-center gap-2 text-xs font-bold text-neutral-900 dark:text-white">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>{item.title}</span>
                </div>
                <p className="text-[11px] text-neutral-600 dark:text-neutral-400 pl-6 leading-normal">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

        </div>

        {/* Timeline of Journey */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-4">
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-blue-500" />
              Academic & Certification Journey
            </h3>
            <span className="text-xs font-mono text-neutral-500">Gurugram University · Graduated 2026</span>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {timeline.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 rounded-2xl glass-card border border-neutral-200 dark:border-neutral-800 space-y-3 relative overflow-hidden"
              >
                <div className="text-[11px] font-mono px-2.5 py-1 rounded-md inline-block bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-medium">
                  {step.period}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-neutral-900 dark:text-white">
                    {step.title}
                  </h4>
                  <div className="text-xs text-blue-600 dark:text-blue-400 font-medium mt-0.5">
                    {step.subtitle}
                  </div>
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;