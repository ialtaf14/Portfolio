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
      longDescription: 'NovaRecon pulls structured JSON data from multiple public intelligence APIs, normalizes and cleans it with Python, and presents it in a clean analytics dashboard. Demonstrates real-world data pipeline: API → data normalization → structured display.',
      features: [
        'Live data ingestion & JSON normalization pipeline',
        'IP Geolocation mapping with structured data output',
        '11-platform Social Footprint data aggregation',
        'SQLite for persistent data storage & querying'
      ],
      impact: 'Real-world ETL pipeline: data collection → cleaning → structured analytics display.',
      technologies: ['Python', 'FastAPI', 'SQLite', 'Next.js 14', 'TypeScript'],
      githubUrl: 'https://github.com/ialtaf14/NovaRecon',
      liveUrl: 'https://novarecon-frontend.onrender.com/',
      image: '/images/RealityML.jpg',
      featured: true,
      category: 'Data Analytics & ETL'
    },
    {
      id: 'reality-ml',
      title: 'RealityML',
      subtitle: 'ML Data Feasibility & Quality Validator',
      description: 'A Python tool that evaluates whether a dataset is actually ready for machine learning — checking data quality, sample bias, class imbalance, and leakage risks.',
      longDescription: 'RealityML automates the data validation checklist analysts run before model training. It uses Pandas for quality checks, generates visual EDA reports with Matplotlib, and outputs a structured risk assessment.',
      features: [
        'Automated Pandas data quality assessment pipeline',
        'Bias, class imbalance & leakage detection',
        'Matplotlib EDA reports with distribution charts',
        'Streamlit dashboard for stakeholder-friendly results'
      ],
      impact: 'Prevents wasted effort by validating data quality before model training.',
      technologies: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Scikit-learn', 'Streamlit'],
      githubUrl: 'https://github.com/ialtaf14/RealityML',
      liveUrl: null,
      image: '/images/RealityML.jpg',
      featured: true,
      category: 'Data Analytics & ML'
    },
    {
      id: 'nova-ai',
      title: 'Nova AI',
      subtitle: 'Hybrid Personal AI Assistant with Multimodal Vision & Voice',
      description: 'An advanced hybrid AI assistant combining local Ollama AI models, Google Live Web Search, Multimodal Vision Q&A, Voice interaction, interactive Google Maps, and an iOS Glassmorphic Web UI.',
      longDescription: 'Nova AI is an advanced hybrid personal AI assistant created by Altaf Khan. It integrates local Ollama LLMs with Google Live Search, multimodal Vision processing for image Q&A, real-time Voice interaction (speech recognition and Hinglish TTS), embedded Google Maps search, and an interactive multi-model selector (DeepSeek, Gemini, Ollama) wrapped in an ultra-sleek iOS glassmorphic interface.',
      features: [
        'Multimodal Vision Q&A for instant image analysis & query response',
        'Voice & Text interaction with real-time Speech Recognition & Hinglish TTS',
        'Free Google Live Web Search (no API key required) & Google Maps embed',
        'Multi-model selector supporting Local Ollama, DeepSeek, and Gemini',
        'Modern iOS Glassmorphic Web UI with code generation & markdown formatting'
      ],
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
      longDescription: "Designed and engineered an ultra-modern glassmorphic portfolio web application to showcase Data Analytics expertise, Python/SQL machine learning projects, official certifications, and live GitHub repositories. Built with dynamic dark/light themes, AI recruiter deck mode, and instant Command Palette (Ctrl+K).",
      features: [
        'React 19 & Tailwind CSS glassmorphism design system',
        'Live GitHub REST API integration & language analytics',
        'Interactive Skill Ball Jar & Pivot charts',
        'AI Recruiter Mode & Command Palette (Ctrl+K)'
      ],
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
          '/images/mecw_official2.jpg',
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
          '/images/gu_ltw.png'
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

  pivotAnalytics: {
    title: 'Interactive Data Analytics & Pivot Table Engine',
    subtitle: 'Real-world Pandas & SQL Pivot Aggregations for Executive Insights',
    summary: 'Multi-dimensional data aggregation demonstrating pivot tables, EDA summaries, and SQL query optimizations.',
    metrics: [
      { id: 'records', label: 'Data Points Processed', value: '1,520,000+', change: '+24.5%', isPositive: true },
      { id: 'query_speed', label: 'SQL Query Optimization', value: '4.2x Faster', change: '-76% Latency', isPositive: true },
      { id: 'accuracy', label: 'EDA Insight Accuracy', value: '96.4%', change: '+3.8% Precision', isPositive: true },
      { id: 'dashboards', label: 'BI Dashboards Created', value: '18 Active', change: 'Power BI & Excel', isPositive: true }
    ],
    pivotTable: [
      { category: 'Python & Pandas Analysis', q1: 124000, q2: 158000, q3: 189000, q4: 210000, total: 681000, growth: '+69.3%', status: 'Core Stack' },
      { category: 'SQL Query Pipelines', q1: 98000, q2: 112000, q3: 145000, q4: 172000, total: 527000, growth: '+75.5%', status: 'Optimal' },
      { category: 'Power BI Dashboards', q1: 85000, q2: 96000, q3: 120000, q4: 148000, total: 449000, growth: '+74.1%', status: 'Active' },
      { category: 'EDA & Feature Engineering', q1: 110000, q2: 135000, q3: 160000, q4: 195000, total: 600000, growth: '+77.2%', status: 'High Yield' }
    ]
  }
};