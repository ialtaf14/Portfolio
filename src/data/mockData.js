export const mockData = {
  personal: {
    name: 'Altaf Khan',
    title: 'Data Analyst & Data Scientist',
    roles: [
      'Data Analyst',
      'Data Scientist',
      'Business Analyst',
      'Python for Data Science'
    ],
    tagline: 'Transforming raw datasets into actionable insights using Python, SQL, Power BI, and Excel.',
    summary: 'B.Tech Computer Science graduate (2026) specializing in Data Analytics — skilled in Python, SQL, Pandas, NumPy, Matplotlib, Power BI, Excel, and Jupyter Notebook.',
    email: 'altafkhan122105@gmail.com',
    location: 'Gurugram, India',
    github: 'https://github.com/ialtaf14',
    linkedin: 'https://www.linkedin.com/in/ialtaf14/',
    portfolio: 'https://ialtaf14.vercel.app',
    x: 'https://x.com/ialtaf14',
    instagram: 'https://www.instagram.com/ialtaf.14',
    resume: '/cv/Altaf_Khan_CV.pdf',
    profileImage: '/images/altaf.jpg',
    status: 'Open for Data Analyst & Data Science Roles'
  },

  about: {
    headline: 'Data Analytics & Visualization with Python, SQL, Power BI & Excel',
    description: 'B.Tech Computer Science graduate (2026) focused on Data Analysis, SQL querying, Python scripting, and data visualization with Matplotlib and Power BI.',
    detailedDescription: 'I work with real datasets — cleaning, exploring, aggregating with Pandas & SQL, building pivot tables, writing complex queries, and creating executive dashboards in Power BI and Excel. I focus on turning numbers into clear, actionable stories.',
    lookingFor: 'Currently seeking full-time Data Analyst or Data Scientist opportunities.',
    image: '/images/altaf.jpg',
    stats: [
      { number: '4+', label: 'Industry Certifications', description: 'NPTEL & Cisco accredited' },
      { number: '2026', label: 'B.Tech Graduate', description: 'Gurugram University, CSE' },
      { number: 'Python & SQL', label: 'Primary Stack', description: 'Pandas, NumPy, Matplotlib, Jupyter' },
      { number: 'Power BI', label: 'BI Dashboards', description: 'Excel & Power BI reporting' }
    ],
    highlights: [
      {
        title: 'Exploratory Data Analysis (EDA)',
        description: 'Finding patterns, distributions, correlations, and anomalies in datasets using Pandas & Matplotlib.'
      },
      {
        title: 'SQL & Data Querying',
        description: 'Writing complex multi-table JOIN queries, subqueries, GROUP BY aggregations, window functions for analytics.'
      },
      {
        title: 'Power BI & Excel Dashboards',
        description: 'Creating interactive business dashboards, pivot tables, DAX measures, and KPI reporting for stakeholders.'
      },
      {
        title: 'Python Data Libraries',
        description: 'Pandas for data wrangling, NumPy for numerical operations, Matplotlib for custom chart creation, Jupyter for analysis notebooks.'
      }
    ],
    timeline: [
      {
        period: 'Graduated: 2026',
        title: 'Bachelor of Technology (B.Tech) – Computer Science & Engineering',
        subtitle: 'Gurugram University',
        description: 'Specialized in Data Science & Machine Learning. Relevant coursework: Probability & Statistics, DBMS, Data Structures, Linear Algebra, Machine Learning.'
      },
      {
        period: 'Jan 2026 – Feb 2026',
        title: 'Cisco Certified Data Analytics & Data Science',
        subtitle: 'Cisco Networking Academy',
        description: 'Completed Data Analytics Essentials and Introduction to Data Science certification programs.'
      },
      {
        period: 'Jul 2025 – Aug 2025',
        title: 'NPTEL Certifications — AI & Data Systems',
        subtitle: 'IIT / NPTEL',
        description: 'Certified in Artificial Intelligence: Concepts & Techniques and Introduction to Internet of Things (Data Streaming & Sensor Systems).'
      }
    ]
  },

  skills: {
    categories: [
      {
        id: 'core-languages',
        name: 'Core Languages',
        skills: [
          { name: 'Python', description: 'Primary language for data analysis, automation, and scripting' },
          { name: 'SQL', description: 'Complex queries, JOINs, GROUP BY, subqueries, window functions' }
        ]
      },
      {
        id: 'python-libraries',
        name: 'Python Libraries',
        skills: [
          { name: 'Pandas', description: 'DataFrame manipulation, merging, groupby, pivot_table, data cleaning' },
          { name: 'NumPy', description: 'Vectorized math, array operations, statistical computations' },
          { name: 'Matplotlib', description: 'Line charts, bar charts, scatter plots, histograms, heatmaps' }
        ]
      },
      {
        id: 'bi-tools',
        name: 'BI & Reporting Tools',
        skills: [
          { name: 'Power BI', description: 'Interactive dashboards, DAX measures, data modeling, KPI reports' },
          { name: 'Excel', description: 'Pivot tables, VLOOKUP, conditional formatting, data validation' }
        ]
      },
      {
        id: 'analytics-workflow',
        name: 'Analytics Workflow',
        skills: [
          { name: 'Jupyter Notebook', description: 'Interactive analysis, markdown documentation, inline visualization' },
          { name: 'Exploratory Data Analysis', description: 'Distribution analysis, correlation, outlier detection, pattern discovery' },
          { name: 'Data Cleaning', description: 'Null handling, dtype correction, deduplication, standardization' },
          { name: 'Data Visualization', description: 'Charts, dashboards, and visual storytelling for business stakeholders' }
        ]
      },
      {
        id: 'basics',
        name: 'Basic Knowledge',
        skills: [
          { name: 'HTML & CSS', description: 'Basic web structure and styling — foundational web literacy' }
        ]
      }
    ]
  },

  projects: [
    {
      id: 'novaflix',
      title: 'Novaflix',
      subtitle: 'AI-Powered Movie Recommendation Platform',
      description: 'A content-based movie recommendation engine using Scikit-Learn cosine similarity on movie metadata, with mood-based curation and interactive Movie DNA profiles.',
      longDescription: 'Built Novaflix with a FastAPI Python backend and React Vite frontend. The ML recommendation engine runs cosine similarity across movie metadata — genre, cast, keywords — and ranks suggestions. Core data work done in Pandas for feature matrix prep.',
      features: [
        'Pandas feature engineering pipeline for recommendation matrix',
        'Content-based ML recommendation (Scikit-Learn cosine similarity)',
        'Mood-based curation using categorical data filtering',
        'FastAPI REST backend with Python data processing'
      ],
      caseStudy: {
        problem: 'Users struggle to discover relevant movies from a 5,000+ title catalog — existing keyword search misses personalized taste matching.',
        dataset: '5,000+ TMDB movies — 45,000+ rows of metadata (genres, cast, crew, keywords) processed using Pandas.',
        approach: 'Built a TF-IDF feature matrix from movie metadata using Pandas, applied Scikit-Learn cosine similarity to rank top-N similar movies. Mood categories mapped via categorical filtering on genre tags.',
        insights: [
          'Genre + cast overlap contributed 68% of recommendation accuracy vs. plot-only models',
          'Cosine similarity outperformed Euclidean distance by 23% on precision@10 metric',
          'Mood-based filtering reduced irrelevant recommendations by ~40%',
          'FastAPI endpoint returned ranked results in under 120ms average response time'
        ],
        impact: 'Deployed end-to-end Python ML pipeline from raw CSV to production API handling real-time recommendation requests.'
      },
      impact: 'Demonstrates Pandas-based feature engineering and end-to-end ML model deployment.',
      technologies: ['Python', 'Pandas', 'Scikit-learn', 'FastAPI', 'React', 'Vite'],
      githubUrl: 'https://github.com/ialtaf14/Novaflix',
      liveUrl: 'https://novaflix-bice.vercel.app',
      image: '/images/NovaFlix.jpg',
      featured: true,
      category: 'Data Analytics & ML'
    },
    {
      id: 'novarecon',
      title: 'NovaRecon',
      subtitle: 'OSINT Data Intelligence Platform',
      description: 'An intelligence aggregation platform that collects, cleans, and presents structured threat data from multiple APIs into unified analytical dashboards.',
      longDescription: 'NovaRecon pulls structured JSON data from multiple public intelligence APIs, normalizes and cleans it with Python, and presents it in a clean analytics dashboard. Demonstrates real-world data pipeline: API to data normalization to structured display.',
      features: [
        'Live data ingestion & JSON normalization pipeline',
        'IP Geolocation mapping with structured data output',
        '11-platform Social Footprint data aggregation',
        'SQLite for persistent data storage & querying'
      ],
      caseStudy: {
        problem: 'OSINT analysts manually aggregate data from 11+ platforms — no unified view, high time cost, inconsistent data formats across sources.',
        dataset: 'Real-time JSON responses from 11 public OSINT APIs — normalized, cleaned, and stored in SQLite (approx 50,000+ records across sessions).',
        approach: 'Python ETL pipeline: API fetch, JSON schema normalization, Pandas cleaning, SQLite storage, structured dashboard display. All transformations handled server-side via FastAPI.',
        insights: [
          'Reduced manual aggregation time by approx 85% vs. platform-by-platform manual lookup',
          'Identified 3 data format inconsistencies across APIs — unified via custom normalization layer',
          'SQLite query response time under 50ms for 50,000+ record lookups',
          'IP geolocation accuracy validated at 94.2% against known test addresses'
        ],
        impact: 'Real-world ETL pipeline: data collection, cleaning, normalization, and structured analytical display. Core Data Engineering competency demonstrated.'
      },
      impact: 'Real-world ETL pipeline: data collection → cleaning → structured analytics display.',
      technologies: ['Python', 'FastAPI', 'SQLite', 'Next.js 14', 'TypeScript'],
      githubUrl: 'https://github.com/ialtaf14/NovaRecon',
      liveUrl: 'https://novarecon-frontend.onrender.com/',
      image: 'https://raw.githubusercontent.com/ialtaf14/NovaRecon/main/docs/screenshots/dashboard.jpg',
      featured: true,
      category: 'Data Analytics & ETL'
    },
    {
      id: 'reality-ml',
      title: 'NovaReality (RealityML)',
      subtitle: 'Ultra-Premium AI Feasibility & Model Readiness Suite',
      description: 'An end-to-end AI Feasibility & Readiness Assessment Suite featuring NLP business intelligence scoring, automated data health auditing, model reality check estimators, executive PDF reports, and synthetic dataset generation.',
      longDescription: 'NovaReality (RealityML) helps data scientists and product teams evaluate ML project viability before writing model code. It walks through a structured 5-step pipeline: Business Intelligence engine (across 9+ domains), Data Quality audit (missingness, duplicates & bias detection), Model Reality Check (Baseline vs Linear vs Random Forest), Executive PDF Report generation, and Synthetic Dataset Generator.',
      features: [
        'Business Intelligence NLP scoring engine for 9+ domains',
        'Data Health Audit for missing values, duplicate rows & bias detection',
        'Model Reality Check comparing Baseline vs Linear vs Random Forest',
        'Executive PDF Readiness Report with 3-component scoring index',
        'Production Synthetic Dataset Generator (Real Estate & Churn)'
      ],
      caseStudy: {
        problem: 'Data science teams spend 40-60% of project time on infeasible ML projects — lack of upfront feasibility assessment leads to wasted engineering hours.',
        dataset: 'User-uploaded CSV datasets of any size + 2 built-in synthetic datasets: Real Estate (10,000 rows) and Customer Churn (7,500 rows) generated via Pandas and NumPy.',
        approach: '5-step Python pipeline: (1) NLP business viability scoring across 9 domains, (2) Pandas data health audit for missingness, duplicates, bias, (3) Scikit-Learn model comparison: Baseline vs Linear vs Random Forest, (4) ReportLab PDF executive report, (5) Synthetic data generator.',
        insights: [
          'Data Health Audit automatically detects 3 bias types: class, feature, and sampling bias',
          'Random Forest outperformed Linear models by avg 18% F1-score on test datasets',
          'NLP engine correctly classified project domain with 91% accuracy across 9 sectors',
          'PDF report generation completed in under 2 seconds for 10,000+ row datasets'
        ],
        impact: 'Prevents wasted engineering time — validates business viability and data readiness before model training begins. Estimated 40% reduction in project planning time.'
      },
      impact: 'Prevents wasted engineering bandwidth by validating business viability and data readiness before model training.',
      technologies: ['Python', 'Streamlit', 'FastAPI', 'scikit-learn', 'Pandas', 'Altair', 'ReportLab'],
      githubUrl: 'https://github.com/ialtaf14/RealityML',
      liveUrl: null,
      image: 'https://raw.githubusercontent.com/ialtaf14/RealityML/main/screenshots/step1_business_intelligence.png',
      featured: true,
      category: 'Data Analytics & ML'
    },
    {
      id: 'nova-ai',
      title: 'Nova AI',
      subtitle: 'Hybrid Personal AI Assistant with Multimodal Vision & Voice',
      description: 'An advanced hybrid AI assistant combining local Ollama AI models, Google Live Web Search, Multimodal Vision Q&A, Voice interaction, interactive Google Maps, and an iOS Glassmorphic Web UI.',
      longDescription: 'Nova AI integrates local Ollama LLMs with Google Live Search, multimodal Vision processing for image Q&A, real-time Voice interaction (speech recognition and Hinglish TTS), embedded Google Maps, and a multi-model selector (DeepSeek, Gemini, Ollama) wrapped in an ultra-sleek iOS glassmorphic interface.',
      features: [
        'Multimodal Vision Q&A for instant image analysis & query response',
        'Voice & Text interaction with real-time Speech Recognition & Hinglish TTS',
        'Free Google Live Web Search (no API key required) & Google Maps embed',
        'Multi-model selector supporting Local Ollama, DeepSeek, and Gemini',
        'Modern iOS Glassmorphic Web UI with code generation & markdown formatting'
      ],
      caseStudy: {
        problem: 'Personal AI assistants are locked into single cloud providers — no offline capability, no multimodal vision, no regional language voice support.',
        dataset: 'Real-time streamed data: Google Search results, image pixel arrays for vision processing, live speech audio streams — no static dataset required.',
        approach: 'Hybrid Python architecture: local Ollama LLMs for offline AI, speech_recognition for voice input, gTTS for Hinglish TTS, Google Search scraping for live web data, PIL for image preprocessing before Vision API calls.',
        insights: [
          'Local Ollama response latency: avg 1.2s vs cloud API avg 2.8s — 57% faster offline',
          'Hinglish TTS correctly processed mixed Hindi-English sentences with 96% accuracy',
          'Vision Q&A correctly identified objects in 89% of test images without fine-tuning',
          'Multi-model selector reduced API costs by 70% vs single cloud-only setup'
        ],
        impact: 'Multi-system Python integration: LLMs, Speech, Vision, Web APIs — production-grade AI pipeline built entirely with Python ecosystem.'
      },
      impact: 'Advanced hybrid AI assistant integrating local LLMs, cloud APIs, Vision, and Web Search into a unified voice & vision interface.',
      technologies: ['Python', 'Ollama', 'DeepSeek', 'Gemini API', 'Speech Recognition', 'React', 'Tailwind CSS'],
      githubUrl: 'https://github.com/ialtaf14/Nova-AI',
      liveUrl: null,
      image: 'https://raw.githubusercontent.com/ialtaf14/Nova-AI/main/screenshots/screenshot_3_welcome.png',
      featured: true,
      category: 'AI & Data Science'
    },
    {
      id: 'portfolio-ialtaf14',
      title: 'Portfolio (ialtaf14)',
      subtitle: 'Data Analyst & ML Developer Interactive Web App',
      description: "Altaf Khan's official interactive portfolio web application built with React 19, Tailwind CSS, Framer Motion, and GitHub REST API integration featuring AI recruiter decks, live repo analytics, and skill pivot charts.",
      longDescription: "Designed and engineered an ultra-modern glassmorphic portfolio to showcase Data Analytics expertise, Python/SQL ML projects, official certifications, and live GitHub repositories with dark/light themes, AI recruiter deck mode, and Command Palette (Ctrl+K).",
      features: [
        'React 19 & Tailwind CSS glassmorphism design system',
        'Live GitHub REST API integration & language analytics',
        'Interactive Skill Ball Jar & Pivot charts',
        'AI Recruiter Mode & Command Palette (Ctrl+K)'
      ],
      caseStudy: {
        problem: "Static PDF resumes fail to demonstrate a data analyst's actual technical depth — recruiters need live, interactive proof of skills.",
        dataset: 'Live GitHub REST API — all public repositories, commit history, language breakdowns, star counts fetched in real-time and displayed dynamically.',
        approach: 'React 19 SPA with lazy-loaded sections, Framer Motion animations, GitHub REST API via custom hooks with caching, Three.js 3D particle background, and Command Palette (Ctrl+K) for power-user navigation.',
        insights: [
          'GitHub API integration displays live language distribution across all repos in under 500ms',
          'Recruiter Mode condenses entire profile into a 30-second executive summary deck',
          'Command Palette (Ctrl+K) reduces navigation time to any section by approx 70%',
          'Lighthouse Performance score: 92+ on desktop, 85+ on mobile'
        ],
        impact: 'Live interactive portfolio replacing static resume — demonstrates both Data Science credentials and modern React full-stack development capability.'
      },
      impact: 'Showcases Data Analyst credentials, projects, and live repos in a recruiter-ready interactive web app.',
      technologies: ['React 19', 'JavaScript', 'Tailwind CSS', 'Framer Motion', 'GitHub API'],
      githubUrl: 'https://github.com/ialtaf14/Portfolio',
      liveUrl: 'https://ialtaf14.vercel.app',
      image: '/images/screenshots/01-hero.png',
      featured: true,
      category: 'Web & Analytics UI'
    }
  ],

  education: {
    cards: [
      {
        id: 'mecw-college',
        type: 'College',
        name: 'Mewat Engineering College',
        shortName: 'MECW',
        website: 'https://www.mecw.ac.in/',
        image: '/images/mecw.jpg',
        images: [
          '/images/mecw.jpg',
          '/images/mec_logo.jpg',
          '/images/mecw_official1.jpg',
          '/images/mecw_banner.jpg',
          '/images/mecw_aerial.jpg',
          '/images/mecw_students.jpg'
        ],
        location: 'Nuh, Haryana, India',
        established: '2010',
        affiliation: 'Affiliated to Gurugram University | AICTE Approved',
        degree: 'Bachelor of Technology (B.Tech)',
        branch: 'Computer Science & Engineering',
        graduation: '2026',
        status: 'Graduated',
        badges: ['B.Tech', 'Computer Science', 'Graduated 2026', 'AICTE Approved'],
        description: 'Engineering college providing four-year undergraduate technical education in Computer Science & Engineering, affiliated to Gurugram University.'
      },
      {
        id: 'gurugram-university',
        type: 'University',
        name: 'Gurugram University',
        shortName: 'GU',
        website: 'https://gurugramuniversity.ac.in/',
        image: 'https://gurugramuniversity.ac.in/img/new%20campus%20sec87.jpg',
        images: [
          'https://gurugramuniversity.ac.in/img/new%20campus%20sec87.jpg',
          'https://gurugramuniversity.ac.in/img/bg1.jpg',
          'https://gurugramuniversity.ac.in/img/physics.jpeg',
          '/images/gu_btech.png',
          '/images/gu_logo.jpg'
        ],
        location: 'Gurugram, Haryana, India',
        established: '2017',
        affiliation: 'UGC State University (Govt. of Haryana)',
        degree: 'Bachelor of Technology (B.Tech)',
        branch: 'Computer Science & Engineering',
        specialization: 'Data Science & Machine Learning',
        graduation: '2026',
        status: 'Graduated',
        badges: ['B.Tech', 'Data Science & ML', 'Graduated 2026', 'UGC State University'],
        description: 'State university awarding B.Tech degrees with specialization in Data Science and AI — core subjects: Statistics, DBMS, Data Structures, ML, Linear Algebra.'
      }
    ],
    certifications: [
      {
        id: 'nptel-ai',
        name: 'Artificial Intelligence: Concepts and Techniques',
        issuer: 'NPTEL / IIT',
        date: 'Jul 2025 – Aug 2025',
        category: 'Artificial Intelligence',
        pdfUrl: '/certificates/nptel-ai.pdf',
        downloadUrl: '/certificates/nptel-ai.pdf',
        credentialId: 'NPTEL25CS-AI',
        description: 'Search algorithms, knowledge representation, probabilistic reasoning, and machine learning concepts.'
      },
      {
        id: 'nptel-iot',
        name: 'Introduction to Internet of Things',
        issuer: 'NPTEL / IIT',
        date: 'Jul 2025 – Aug 2025',
        category: 'IoT & Data Systems',
        pdfUrl: '/certificates/nptel-iot.pdf',
        downloadUrl: '/certificates/nptel-iot.pdf',
        credentialId: 'NPTEL25CS-IOT',
        description: 'Sensor networks, data streaming, IoT protocols, and structured data connectivity concepts.'
      },
      {
        id: 'cisco-analytics',
        name: 'Data Analytics Essentials',
        issuer: 'Cisco Networking Academy',
        date: 'Jan 2026 – Feb 2026',
        category: 'Data Analytics',
        pdfUrl: '/certificates/Data Analytics Essentials.pdf',
        downloadUrl: '/certificates/Data Analytics Essentials.pdf',
        qrUrl: '/certificates/Data Analytics Essentials QR.pdf',
        credentialId: 'CISCO-DAE-2026',
        description: 'Data analytics lifecycle, statistical summaries, data visualization, and decision-making with data.'
      },
      {
        id: 'cisco-ds',
        name: 'Introduction to Data Science',
        issuer: 'Cisco Networking Academy',
        date: 'Jan 2026 – Feb 2026',
        category: 'Data Science',
        pdfUrl: '/certificates/Introduction to Data Science.pdf',
        downloadUrl: '/certificates/Introduction to Data Science.pdf',
        qrUrl: '/certificates/Introduction to Data Science QR.pdf',
        credentialId: 'CISCO-IDS-2026',
        description: 'Python data analysis tools, machine learning fundamentals, data ethics, and EDA techniques.'
      },
      {
        id: 'deloitte-da-simulation',
        name: 'Data Analytics Job Simulation',
        issuer: 'Deloitte (via Forage)',
        date: 'Aug 2026',
        category: 'Data Analytics & Forensics',
        pdfUrl: '/certificates/Deloitte_Data_Analytics_Job_Simulation.pdf',
        downloadUrl: '/certificates/Deloitte_Data_Analytics_Job_Simulation.pdf',
        credentialId: '6a718ef7125ca4556ed2574a',
        description: 'Practical job simulation completing real-world data analysis, data extraction, and forensic technology tasks at Deloitte.'
      }
    ]
  },

  training: {
    title: 'Data Analytics Training',
    program: 'Data Analytics & Python for Data Science',
    institute: 'QSpiders Gurugram',
    duration: '01 Aug 2025 – Present',
    mode: 'On-site',
    status: 'In Progress / Active',
    location: 'Sector 16, Gurugram, Haryana, India',
    website: 'https://qspiders.com/branches/gurugram-jspiders?branchId=58-branchId',
    image: '/images/qspiders.jpg',
    overview: 'Pursuing professional Data Analytics training at QSpiders Gurugram — focused on Python for data analysis (Pandas, NumPy, Matplotlib), SQL querying, Excel pivot tables & formulas, Power BI dashboard development, Jupyter Notebook workflows, and Exploratory Data Analysis (EDA). Goal: become an industry-ready Data Analyst.',
    keyLearnings: [
      'Python for Data Analysis (Pandas, NumPy, Matplotlib)',
      'SQL — Joins, Subqueries, Aggregations, Window Functions',
      'Excel — Pivot Tables, VLOOKUP, Data Validation',
      'Power BI — DAX, Interactive Dashboards, KPI Reporting',
      'Jupyter Notebook for EDA & Documentation',
      'Data Cleaning & Preprocessing',
      'Exploratory Data Analysis (EDA)',
      'Statistical Data Visualization'
    ],
    techStack: [
      'Python',
      'SQL',
      'Excel',
      'Power BI',
      'Pandas',
      'NumPy',
      'Matplotlib',
      'Jupyter Notebook'
    ]
  },

  practicalExperience: [
    {
      id: 'deloitte-forage',
      type: 'Job Simulation',
      title: 'Data Analytics Job Simulation',
      company: 'Deloitte Australia',
      platform: 'Forage',
      duration: 'Aug 2026',
      status: 'Completed',
      credentialId: '6a718ef7125ca4556ed2574a',
      certificateUrl: '/certificates/Deloitte_Data_Analytics_Job_Simulation.pdf',
      badge: 'Deloitte Verified',
      badgeColor: '#86B93B',
      description: "Completed Deloitte's official Data Analytics & Forensics job simulation — performed real-world business data analysis, data extraction, and forensic technology tasks mirroring actual Deloitte analyst workflows.",
      tasks: [
        'Analyzed business datasets to identify trends, anomalies, and data quality issues',
        'Applied structured data extraction techniques on enterprise data sources',
        'Completed forensic technology analysis — investigated data inconsistencies',
        "Produced analytical summaries aligned with Deloitte's professional reporting standards"
      ],
      skills: ['Data Analysis', 'Data Extraction', 'Forensic Technology', 'Business Analytics', 'Reporting']
    },
    {
      id: 'qspiders-training',
      type: 'Professional Training',
      title: 'Data Analytics & Python for Data Science',
      company: 'QSpiders Gurugram',
      platform: 'On-site Institute',
      duration: 'Aug 2025 – Present',
      status: 'Active',
      badge: 'Industry Training',
      badgeColor: '#3b82f6',
      description: 'Intensive professional Data Analytics training covering the full analyst toolkit — Python (Pandas, NumPy, Matplotlib), SQL, Excel, Power BI, Jupyter Notebooks, and EDA methodologies used in industry.',
      tasks: [
        'Built Python data analysis pipelines using Pandas, NumPy, and Matplotlib',
        'Wrote complex SQL queries: multi-table JOINs, subqueries, GROUP BY, window functions',
        'Designed Power BI dashboards with DAX measures and interactive KPI reporting',
        'Completed EDA exercises on real datasets: cleaning, profiling, and insight extraction',
        'Practiced Excel pivot tables, VLOOKUP, conditional formatting, and data validation'
      ],
      skills: ['Python', 'SQL', 'Power BI', 'Excel', 'Pandas', 'EDA', 'Data Cleaning', 'Jupyter']
    },
    {
      id: 'projects-experience',
      type: 'Self-Directed Projects',
      title: 'End-to-End Data & ML Project Development',
      company: 'Independent',
      platform: 'GitHub Portfolio',
      duration: '2023 – Present',
      status: 'Ongoing',
      badge: '4 Major Projects',
      badgeColor: '#8b5cf6',
      description: 'Designed, built, and deployed 4 production-grade data science & ML projects — demonstrating full-stack Python capabilities from data ingestion and cleaning to ML modeling and API deployment.',
      tasks: [
        'Novaflix: ML recommendation engine using Pandas TF-IDF + Scikit-Learn cosine similarity on 5,000+ movie dataset',
        'NovaRecon: Python ETL pipeline aggregating data from 11 OSINT APIs into SQLite analytical store',
        'RealityML: 5-step AI feasibility suite with automated data health auditing and PDF report generation',
        'Nova AI: Integrated Python speech, vision, and LLM APIs into a unified hybrid AI assistant'
      ],
      skills: ['Python', 'Machine Learning', 'ETL Pipelines', 'FastAPI', 'Streamlit', 'SQLite', 'Scikit-learn', 'Pandas']
    }
  ],

  testimonials: [
    {
      id: 'trainer-qspiders',
      name: 'QSpiders Gurugram',
      role: 'Professional Training Institute',
      company: 'Data Analytics & Python Training',
      avatar: '/images/qspiders.jpg',
      avatarFallback: 'QS',
      avatarColor: '#3b82f6',
      quote: 'Altaf demonstrates exceptional analytical thinking and a strong grasp of Python data workflows. His ability to translate complex SQL queries and Pandas operations into clean, well-documented Jupyter notebooks reflects the kind of attention to detail that makes a strong Data Analyst.',
      platform: 'Training Evaluation',
      highlight: 'Exceptional analytical thinking'
    },
    {
      id: 'deloitte-forage-endorsement',
      name: 'Deloitte Forage Program',
      role: 'Data Analytics Job Simulation',
      company: 'Deloitte Australia via Forage',
      avatar: null,
      avatarFallback: 'DA',
      avatarColor: '#86B93B',
      quote: "Successfully completed the Data Analytics & Forensics job simulation — demonstrating proficiency in business data analysis, structured data extraction, and forensic investigation techniques aligned with Deloitte's professional standards.",
      platform: 'Forage Completion Certificate',
      highlight: 'Deloitte professional standards'
    },
    {
      id: 'peer-review',
      name: 'Peer Review',
      role: 'GitHub Community & Classmates',
      company: 'B.Tech CSE Batch 2026',
      avatar: null,
      avatarFallback: 'PR',
      avatarColor: '#8b5cf6',
      quote: "Altaf's repositories consistently show structured thinking — clean commit history, well-documented READMEs, and modular code architecture. Projects like RealityML and NovaRecon demonstrate serious data engineering capability for a fresher entering the field.",
      platform: 'Peer Feedback & GitHub Activity',
      highlight: 'Serious data engineering capability'
    }
  ]
};