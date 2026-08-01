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
    phone: '+91 8053821088',
    location: 'Gurugram, India',
    github: 'https://github.com/ialtaf14',
    linkedin: 'https://www.linkedin.com/in/altaf-khan-7a544b256/',
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
      id: 'reality-ml',
      title: 'RealityML – AI Feasibility Suite',
      subtitle: 'ML Problem Viability & Data Risk Assessor',
      description: 'A Python-based project that evaluates whether a business problem is suitable for machine learning by analyzing available data and potential risks.',
      longDescription: 'RealityML provides automated machine learning feasibility assessment, synthetic dataset generation, and data quality analysis to identify sample bias and data leakage before building models.',
      features: [
        'Machine Learning feasibility assessment',
        'Synthetic dataset generation',
        'Data quality analysis',
        'Bias and leakage detection',
        'Interactive Streamlit dashboard'
      ],
      impact: 'Helps evaluate data readiness before spending time building machine learning models.',
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
      subtitle: 'AI Assistant Application',
      description: 'An AI-powered assistant built using the Google Gemini API to answer user queries through a clean Python backend.',
      longDescription: 'Nova AI integrates the Google Gemini API with a Python backend, supporting multi-turn conversations, prompt management, and API error handling.',
      features: [
        'Multi-turn conversations',
        'Prompt management',
        'Error handling',
        'REST API integration',
        'Modular backend architecture'
      ],
      impact: 'Demonstrates API integration, prompt handling, and Python web backend structure.',
      technologies: ['Python', 'Gemini API', 'FastAPI', 'JSON'],
      githubUrl: 'https://github.com/ialtaf14/Nova-AI',
      liveUrl: null,
      image: '/images/Nova-AI.jpg',
      featured: true,
      category: 'AI & Python Projects'
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
  }
};