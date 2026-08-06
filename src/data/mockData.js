export const mockData = {
  personal: {
    name: 'Altaf Khan',
    title: 'Data Analyst & Data Scientist',
    roles: [
      'Data Analyst',
      'Business Analyst',
      'Python Developer',
      'Data Scientist'
    ],
    tagline: 'Analyzing datasets, building predictive models with Python and SQL, and creating clear data visualizations.',
    summary: 'Computer Science Engineering graduate (2026) skilled in Python, SQL, exploratory data analysis (EDA), data cleaning, and machine learning fundamentals.',
    email: 'altafkhan122105@gmail.com',
    location: 'Gurugram, India',
    github: 'https://github.com/ialtaf14',
    linkedin: 'https://www.linkedin.com/in/altaf-khan-7a544b256/',
    portfolio: 'https://ialtaf14.vercel.app',
    x: 'https://x.com/ialtaf14',
    instagram: 'https://www.instagram.com/ialtaf.14',
    resume: '/cv/Altaf_Khan_CV.pdf',
    profileImage: '/images/altaf.jpg',
    status: 'Open for Full-Time Data Analyst, Business Analyst & Scientist Roles'
  },

  about: {
    headline: 'Data Analysis, Machine Learning, and Problem Solving with Python & SQL',
    description: 'I am a Computer Science Engineering graduate (2026) focused on Data Analysis, SQL querying, Python scripting, and practical Machine Learning.',
    detailedDescription: 'My project work covers data cleaning, exploratory visual analysis, feature engineering, model evaluation, and reporting. I focus on writing clear code and delivering practical data-driven insights.',
    lookingFor: 'Currently seeking full-time Data Analyst, Business Analyst, Data Scientist, or Python Developer opportunities.',
    image: '/images/altaf.jpg',
    stats: [
      { number: '4+', label: 'Industry Certifications', description: 'NPTEL & Cisco accredited' },
      { number: '2026', label: 'B.Tech Graduate', description: 'Gurugram University' },
      { number: 'Python & SQL', label: 'Primary Tech Stack', description: 'Pandas, NumPy, Scikit-learn, Matplotlib' },
      { number: 'Data & ML', label: 'Academic Focus', description: 'Computer Science & Engineering' }
    ],
    highlights: [
      {
        title: 'Exploratory Data Analysis (EDA)',
        description: 'Finding patterns, distributions, correlations, and anomalies in datasets.'
      },
      {
        title: 'Machine Learning Fundamentals',
        description: 'Building classification and regression models, evaluating performance with Scikit-learn cross-validation.'
      },
      {
        title: 'Data Visualization & Dashboards',
        description: 'Creating charts with Matplotlib and interactive business dashboards using Power BI and Excel.'
      },
      {
        title: 'SQL & Database Queries',
        description: 'Writing SQL queries, multi-table joins, aggregations, and data filtering for analytics.'
      }
    ],
    timeline: [
      {
        period: 'Graduated: 2026',
        title: 'Bachelor of Technology (B.Tech) – Computer Science & Engineering',
        subtitle: 'Gurugram University',
        description: 'Specialized in Data Science & Machine Learning. Relevant coursework: Data Structures, Linear Algebra, Probability & Statistics, Machine Learning, DBMS.'
      },
      {
        period: 'Jan 2026 – Feb 2026',
        title: 'Cisco Certified Data Analytics & Data Science',
        subtitle: 'Cisco Networking Academy',
        description: 'Completed Data Analytics Essentials and Introduction to Data Science certification programs.'
      },
      {
        period: 'Jul 2025 – Aug 2025',
        title: 'NPTEL Certifications in AI & IoT',
        subtitle: 'IIT / NPTEL',
        description: 'Certified in Artificial Intelligence: Concepts & Techniques and Introduction to Internet of Things.'
      }
    ]
  },

  skills: {
    categories: [
      {
        id: 'programming',
        name: 'Programming',
        skills: [
          { name: 'Python', description: 'Primary language for data manipulation, analysis, modeling & scripting' },
          { name: 'SQL', description: 'Querying, joins, aggregations, subqueries & relational database concepts' }
        ]
      },
      {
        id: 'data-analysis',
        name: 'Data Analysis',
        skills: [
          { name: 'Pandas', description: 'Dataframe manipulation, grouping, merging, reshaping & cleaning' },
          { name: 'NumPy', description: 'Vectorized mathematical computations & array operations' },
          { name: 'Excel', description: 'Pivot tables, VLOOKUP, data validation & summary reporting' },
          { name: 'Power BI', description: 'Interactive business dashboards, DAX measures & data modeling' }
        ]
      },
      {
        id: 'machine-learning',
        name: 'Machine Learning',
        skills: [
          { name: 'Scikit-learn', description: 'Classification and regression model implementation' },
          { name: 'Data Cleaning', description: 'Imputation, encoding, outlier handling & feature scaling' },
          { name: 'Exploratory Data Analysis', description: 'Distribution analysis, correlation & pattern discovery' },
          { name: 'Feature Engineering', description: 'Feature selection, transformation & extraction' },
          { name: 'Model Evaluation', description: 'Accuracy, precision, recall, F1-score & confusion matrices' }
        ]
      },
      {
        id: 'visualization',
        name: 'Visualization',
        skills: [
          { name: 'Matplotlib', description: 'Plots, multi-panel figures, subplots & custom chart styling' }
        ]
      },
      {
        id: 'tools',
        name: 'Tools',
        skills: [
          { name: 'Git', description: 'Version control, branching, merging & code management' },
          { name: 'GitHub', description: 'Repository hosting, code sharing & project documentation' },
          { name: 'Jupyter Notebook', description: 'Interactive data analysis & inline visualization' },
          { name: 'VS Code', description: 'Code editing, extensions & integrated terminal' }
        ]
      }
    ]
  },

  projects: [
    {
      id: 'novaflix',
      title: 'Novaflix',
      subtitle: 'AI-Powered Movie Recommendation Platform',
      description: 'A content-based movie recommendation platform with mood curation, real-time messaging between movie fans, streaming availability badges, and interactive Movie DNA profiles.',
      longDescription: 'Built Novaflix as a full-stack web app using React and Vite on the frontend with a FastAPI Python backend. The recommendation engine uses Scikit-Learn cosine similarity on movie metadata. Features include real-time messaging between cinephiles, mood-based curation, and a unique Movie DNA profile for each user.',
      features: [
        'Content-based ML recommendation engine (Scikit-Learn cosine similarity)',
        'Real-time cinephile messaging system',
        'Streaming availability badges per movie',
        'Interactive Movie DNA user profiles',
        'React + Vite frontend with FastAPI Python backend'
      ],
      impact: 'Demonstrates end-to-end ML deployment with a React frontend, REST API backend, and real-time features.',
      technologies: ['React', 'Vite', 'FastAPI', 'Python', 'Scikit-learn', 'JavaScript'],
      githubUrl: 'https://github.com/ialtaf14/Novaflix',
      liveUrl: 'https://novaflix-bice.vercel.app',
      image: '/images/Nova-AI.jpg',
      featured: true,
      category: 'Full-Stack & ML'
    },
    {
      id: 'novarecon',
      title: 'NovaRecon',
      subtitle: 'OSINT & Cyber Threat Intelligence Platform',
      description: 'A next-gen open-source intelligence platform featuring live IP geolocation, social footprint scanning across 11 platforms, domain WHOIS/DNS lookup, breach exposure detection, and threat telemetry.',
      longDescription: 'NovaRecon is a full-stack security intelligence tool built with Next.js 14, FastAPI, Tailwind CSS, and SQLite. It aggregates threat data from multiple public APIs into a unified dashboard with clean glassmorphism UI. Core features include live IP geolocation mapping, domain/WHOIS analysis, breach history, and social media footprint scanning.',
      features: [
        'Live IP Geolocation with map visualization',
        '11-platform Social Footprint Scanner',
        'Domain WHOIS & DNS analysis',
        'Breach exposure history lookup',
        'Threat Telemetry dashboard (Next.js 14 + FastAPI)'
      ],
      impact: 'Shows TypeScript, Next.js, FastAPI, and security API integration skills in a production-grade tool.',
      technologies: ['Next.js 14', 'TypeScript', 'FastAPI', 'Python', 'Tailwind CSS', 'SQLite'],
      githubUrl: 'https://github.com/ialtaf14/NovaRecon',
      liveUrl: 'https://novarecon-frontend.onrender.com/',
      image: '/images/RealityML.jpg',
      featured: true,
      category: 'Security & Full-Stack'
    },
    {
      id: 'reality-ml',
      title: 'RealityML',
      subtitle: 'AI Feasibility Suite & ML Validator',
      description: 'A Python tool that evaluates whether a business problem is actually suitable for machine learning — checking data quality, sample bias, and leakage risks before any model is built.',
      longDescription: 'RealityML was built to solve a real problem: teams wasting weeks training models on fundamentally flawed data. It runs automated feasibility checks, generates synthetic datasets for testing, and produces a readable risk report. Includes a Streamlit dashboard for non-technical stakeholders.',
      features: [
        'Automated ML feasibility assessment engine',
        'Synthetic dataset generator (100+ feature support)',
        'Data quality analysis with bias & leakage detection',
        'Streamlit dashboard for results visualization',
        'CLI and API modes for integration'
      ],
      impact: 'Prevents wasted compute and time by validating data viability before model training begins.',
      technologies: ['Python', 'Pandas', 'Scikit-learn', 'FastAPI', 'Streamlit'],
      githubUrl: 'https://github.com/ialtaf14/RealityML',
      liveUrl: null,
      image: '/images/RealityML.jpg',
      featured: true,
      category: 'Machine Learning & Analytics'
    },
    {
      id: 'nova-ai',
      title: 'Nova AI',
      subtitle: 'Smart AI Learning Assistant',
      description: 'An AI assistant built on the Google Gemini API, designed specifically to help students and developers learn AI, ML, Python, and data science through clear, practical guidance.',
      longDescription: 'Nova AI wraps the Google Gemini API in a well-structured Python backend with multi-turn conversation memory, prompt management, and clean error handling. Built to focus on the domains I know — AI, ML, Data Science, Python, and Software Engineering — rather than being a generic chatbot.',
      features: [
        'Google Gemini API integration with multi-turn memory',
        'Domain-focused: AI, ML, Python, Data Science',
        'Modular FastAPI backend architecture',
        'Prompt management and response formatting',
        'Clean JSON API for frontend integration'
      ],
      impact: 'Practical demonstration of LLM API integration, Python backend design, and prompt engineering.',
      technologies: ['Python', 'Gemini API', 'FastAPI', 'JSON'],
      githubUrl: 'https://github.com/ialtaf14/Nova-AI',
      liveUrl: null,
      image: '/images/Nova-AI.jpg',
      featured: true,
      category: 'AI & Python'
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
          '/images/mecw_campus1.jpg'
        ],
        location: 'Nuh, Haryana, India',
        established: '2010',
        affiliation: 'Affiliated to Gurugram University | AICTE Approved',
        degree: 'Bachelor of Technology (B.Tech)',
        branch: 'Computer Science & Engineering',
        graduation: '2026',
        status: 'Graduated',
        badges: ['B.Tech', 'Computer Science', 'Graduated 2026', 'AICTE Approved'],
        description: 'Engineering college established by Haryana Waqf Board, providing four-year undergraduate technical education in Computer Science & Engineering.'
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
        badges: ['B.Tech', 'Computer Science', 'Graduated 2026', 'UGC State University'],
        description: 'State university incorporated under Haryana Act 17 of 2017, awarding undergraduate engineering degrees with modern curricula in Data Science and AI.'
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
        description: 'Study of search algorithms, knowledge representation, probabilistic reasoning, and machine learning concepts.'
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
        description: 'Sensor networks, data streaming, IoT protocols, and connectivity concepts.'
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
        description: 'Data analytics lifecycle, data collection, statistical summaries, data visualization, and decision-making concepts.'
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
        description: 'Foundational data science techniques, Python data analysis tools, machine learning basics, and data ethics.'
      }
    ]
  },

  training: {
    title: 'Professional Training',
    program: 'Data Analytics & Python Training',
    institute: 'QSpiders Gurugram',
    duration: '01 Aug 2025 – Present',
    mode: 'On-site',
    status: 'In Progress / Active',
    location: 'Sector 16, Gurugram, Haryana, India',
    website: 'https://qspiders.com/branches/gurugram-jspiders?branchId=58-branchId',
    image: '/images/qspiders.jpg',
    overview: 'Currently pursuing professional training in Data Analytics and Python at QSpiders Gurugram. The program focuses on building practical skills in Python, SQL, Excel, Power BI, Pandas, NumPy, Data Cleaning, Exploratory Data Analysis (EDA), Data Visualization, and Machine Learning fundamentals through structured learning, coding exercises, and project-based practice. The objective is to strengthen analytical thinking and become industry-ready for Data Analyst and Business Analyst roles.',
    keyLearnings: [
      'Python Programming',
      'SQL & Database Management',
      'Advanced Excel',
      'Power BI Dashboard Development',
      'Pandas & NumPy',
      'Data Cleaning & Preprocessing',
      'Exploratory Data Analysis (EDA)',
      'Data Visualization',
      'Machine Learning Fundamentals',
      'Industry-Oriented Project Development'
    ],
    techStack: [
      'Python',
      'SQL',
      'Excel',
      'Power BI',
      'Pandas',
      'NumPy',
      'Scikit-learn',
      'Git'
    ]
  },

  pivotAnalytics: {
    title: 'Interactive Data Analytics & Pivot Table Engine',
    subtitle: 'Real-world Pandas & SQL Pivot Aggregations for Executive Insights',
    summary: 'Multi-dimensional data aggregation demonstrating pivot tables, revenue summaries, customer retention metrics, and SQL query optimizations.',
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
  }
};