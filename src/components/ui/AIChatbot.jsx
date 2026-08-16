import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles, RotateCcw, ChevronDown } from 'lucide-react';

// ─── Portfolio knowledge base ──────────────────────────────────────────────────
const KB = {
  name: 'Altaf Khan',
  fullName: 'Altaf Khan',
  title: 'Data Analyst & Aspiring Data Scientist',
  phone: '+91 8053821088',
  email: 'altafkhan122105@gmail.com',
  location: 'Gurugram, Haryana, India',
  github: 'https://github.com/ialtaf14',
  linkedin: 'https://www.linkedin.com/in/ialtaf14/',
  portfolio: 'https://ialtaf14.vercel.app',
  photo: '/images/header-profile-final.jpg',
  education: 'B.Tech in Computer Science & Engineering from Gurugram University (Mewat Engineering College), graduated in 2026, with a specialization in Data Science & Machine Learning (CGPA: 7.59).',
  college: 'Mewat Engineering College (MECW), Nuh, Haryana — affiliated to Gurugram University, AICTE Approved.',
  university: 'Gurugram University, Gurugram, Haryana — UGC State University (Govt. of Haryana), established 2017.',
  degree: 'Bachelor of Technology (B.Tech)',
  branch: 'Computer Science & Engineering (CSE)',
  specialization: 'Data Science & Machine Learning',
  passoutYear: '2026',
  cgpa: '7.59 / 10',
  skills: 'Python, SQL, Pandas, NumPy, MS Excel (Advanced), Power BI, Scikit-learn, Matplotlib, Data Cleaning, EDA, Feature Engineering, Model Evaluation, FastAPI, Flask, Streamlit, Ollama, Gemini API, OpenRouter, Git, GitHub, Jupyter Notebook, VS Code, Vercel, Render.',
  training: 'Data Analytics Trainee at QSpiders Gurugram (Aug. 2025 – Aug. 2026). Hands-on in SQL, Advanced Excel, Power BI, and Exploratory Data Analysis on 5+ real-world datasets using Pandas, NumPy & Matplotlib.',
  projects: [
    {
      name: 'NovaFlix – Movie & Anime Recommendation Engine',
      category: 'Machine Learning & Full-Stack Recommendation',
      desc: 'A content-based recommendation engine covering 7,200+ movies and 300+ anime titles using TF-IDF vectorization and cosine similarity across genres, cast, and crew. Delivers personalized recommendations in under 3 seconds via a FastAPI backend paired with a React/Vite frontend integrating live TMDB API metadata, mood-based filtering, and watchlist tracking.',
      tech: 'Python, Pandas, Scikit-learn, SQL, FastAPI, React, Vite, TMDB API, Vercel, Render',
      github: 'https://github.com/ialtaf14/NovaFlix',
      live: 'https://novaflix-client.vercel.app/',
    },
    {
      name: 'NovaReality (RealityML) – AI Feasibility & Readiness Suite',
      category: 'AI Feasibility & Quality Assessment',
      desc: 'An end-to-end AI Feasibility & Readiness Assessment Suite that helps data science and product teams evaluate ML project viability before writing model code. Features: 5-step pipeline including NLP Business Intelligence scoring for 9+ domains, Data Health & Quality Audit (missingness, duplicates, bias), Model Reality Check comparing Baseline vs Linear vs Random Forest, Executive PDF Readiness Reports with a 3-component formula, and a Synthetic Dataset Generator (Real Estate & Churn).',
      tech: 'Python, Streamlit, FastAPI, scikit-learn, Pandas, Altair, ReportLab',
      github: 'https://github.com/ialtaf14/RealityML',
      live: null,
    },
    {
      name: 'Nova AI – Hybrid Personal AI Assistant',
      category: 'Generative AI & Multimodal System',
      desc: 'A hybrid personal AI assistant routing queries between local LLMs (Ollama / DeepSeek) and cloud APIs (Gemini, OpenRouter). Features: Real-time web retrieval (RAG) without API keys, Multimodal Vision image Q&A, Voice interaction with Hinglish TTS, interactive Google Maps embed, and an iOS Glassmorphic Web UI.',
      tech: 'Python, Flask, Ollama, DeepSeek, Gemini API, OpenRouter, Speech Recognition, React, Tailwind CSS',
      github: 'https://github.com/ialtaf14/Nova-AI',
      live: null,
    },
    {
      name: 'NovaRecon – Automated OSINT Threat Intelligence Aggregator',
      category: 'ETL Pipeline & Cybersecurity Analytics',
      desc: 'An automated Open-Source Intelligence (OSINT) reconnaissance ETL pipeline. Ingests and normalizes live data from multiple public intelligence APIs, performs IP Geolocation mapping, ASN lookup, threat alerts, and 11-platform social footprint scanning, storing structured records in SQLite with a Next.js 14 dashboard.',
      tech: 'Python, FastAPI, SQLite, Next.js 14, TypeScript, Render',
      github: 'https://github.com/ialtaf14/NovaRecon',
      live: 'https://novarecon-frontend.onrender.com/',
    },
    {
      name: 'Portfolio – Official Interactive Data Analyst Web App',
      category: 'Frontend & System Design',
      desc: 'Altaf Khan\'s official interactive Data Analyst portfolio featuring UI/UX Pro Max Glassmorphism design system, Framer Motion animations, Recruiter Executive Summary Deck, live GitHub API analytics, skill pivot physics chart, Command Palette (Ctrl+K), and AI Chatbot.',
      tech: 'React 19, Tailwind CSS, Framer Motion, craco, Lucide Icons, Vercel',
      github: 'https://github.com/ialtaf14/Portfolio',
      live: 'https://ialtaf14.vercel.app',
    }
  ],
  certifications: [
    'Cisco Networking Academy: Data Analytics Essentials (Jan. – Feb. 2026)',
    'Cisco Networking Academy: Introduction to Data Science (Jan. – Feb. 2026)',
    'NPTEL (IITM): Artificial Intelligence – Concepts & Techniques (Jul. – Aug. 2025)',
    'NPTEL (IITM): Introduction to Internet of Things (Jul. – Aug. 2025)',
  ],
  status: 'Actively seeking entry-level Data Analyst, Business Analyst, Data Scientist, or Python Developer roles.',
  age: '23 years old (born 6th July 2003)',
  dob: '6th July 2003',
  nationality: 'Indian',
  gender: 'Male',
  languages: 'Hindi and English (fluent in professional & casual communication)',
  whatsapp: '+91 8053821088',
  hobbies: 'Watching cinema (movies & web series), listening to music, exploring datasets for analysis, and tracking AI & machine learning trends.',
  salary: 'Around ₹20,000 – ₹25,000 per month (open to discussion based on role, company, and learning curve).',
  workMode: 'Open to both remote and on-site positions across India.',
  experience: 'Fresher with hands-on project experience + 1-Year Data Analytics Training at QSpiders Gurugram (Aug 2025 – Aug 2026).',
};

// ─── Intent → response engine ──────────────────────────────────────────────────
const match = (q, ...keywords) => keywords.some(k => q.includes(k));

function getReply(raw) {
  const q = raw.toLowerCase().trim();

  // Help / menu
  if (match(q, 'help', 'kya kar', 'what can you', 'menu', 'option', 'commands', 'kya puch')) {
    return `Here is what you can ask me about Altaf:\n\n• 🎬 **Projects:** NovaFlix, NovaReality, Nova AI, NovaRecon, Portfolio\n• 🛠️ **Skills:** Python, SQL, Pandas, Power BI, Excel, Scikit-learn\n• 📊 **Experience & Training:** QSpiders Gurugram Data Analytics\n• 🎓 **Education & CGPA:** College, University, Passout 2026, CGPA 7.59\n• 🏆 **Certifications:** Cisco & NPTEL credentials\n• 💼 **Hiring & Job Status:** Availability, Salary, Work mode\n• 📞 **Contact:** Phone, WhatsApp, Email, LinkedIn, GitHub\n• 📄 **Resume:** Download latest CV PDF\n• 📸 **Photo:** Show profile picture\n\nAsk any question naturally in English or Hindi!`;
  }

  // Photo / profile picture / image
  if (match(q, 'photo', 'picture', 'pic', 'image', 'tasveer', 'selfie', 'face', 'look', 'profile photo', 'profile pic', 'dikhao')) {
    return `Here is Altaf's profile photo 👇\n[PHOTO:${KB.photo}]\n\nYou can also see his full interactive profile in the **Hero section** at the top!`;
  }

  // Greetings
  if (match(q, 'hello', 'hi', 'hey', 'helo', 'hii', 'namaste', 'salam', 'sup', 'good morning', 'good evening', 'kaisa', 'kaise')) {
    return `Hi there! 👋 I'm **Altaf's AI Assistant**.\n\nI can answer anything about his **skills, projects (NovaFlix, NovaReality, Nova AI, NovaRecon), education (CGPA: 7.59), QSpiders training, certifications, and availability for hire**.\n\nWhat would you like to know?`;
  }

  // Name / full name
  if (match(q, 'name', 'who is', 'who are', 'kaun hai', 'naam kya', 'full name')) {
    return `His full name is **${KB.fullName}**.\n\nHe is a **${KB.title}** — a 2026 B.Tech CSE graduate specializing in Data Science & Machine Learning, actively seeking full-time roles.`;
  }

  // Age / DOB
  if (match(q, 'age', 'old', 'born', 'dob', 'birthday', 'date of birth', 'kitne saal', 'umar', 'janam', 'birth')) {
    return `🎂 Altaf is **${KB.age}**.\n• Date of Birth: **${KB.dob}**\n• Nationality: **${KB.nationality}**`;
  }

  // Gender
  if (match(q, 'gender', 'male', 'female', 'ladka', 'ladki', 'boy', 'girl')) {
    return `Altaf is **Male**.`;
  }

  // Nationality / Country
  if (match(q, 'nationality', 'country', 'citizen', 'indian', 'india', 'desh')) {
    return `🇮🇳 Altaf is **Indian**, currently residing in **${KB.location}**.`;
  }

  // Languages spoken
  if (match(q, 'language', 'speak', 'bol', 'spoken', 'communication', 'boli', 'english', 'hindi')) {
    return `🗣️ Altaf speaks **${KB.languages}** fluently and is comfortable in both professional and casual environments.`;
  }

  // CGPA / Marks / Percentage
  if (match(q, 'cgpa', 'marks', 'percentage', 'grade', 'score', 'percent', 'gpa', 'kitna cgpa', 'kitne number')) {
    return `🎯 Altaf's B.Tech CSE **CGPA is ${KB.cgpa}** from **Mewat Engineering College** (affiliated to **Gurugram University**).\n\nHe graduated in **${KB.passoutYear}** with strong performance in Computer Science, Statistics, and Machine Learning.`;
  }

  // Passout year / graduation year / batch
  if (match(q, 'passout', 'pass out', 'batch', 'graduated', 'graduation year', 'passing year', 'year of passing', 'konse year', 'kab pass')) {
    return `🎓 Altaf's **passout year is ${KB.passoutYear}**.\n\nHe completed his **B.Tech in Computer Science & Engineering** (Specialization: Data Science & Machine Learning) from **Gurugram University** in **May 2026**.`;
  }

  // Degree / qualification
  if (match(q, 'degree', 'qualification', 'b.tech', 'btech', 'bachelor', 'engineering')) {
    return `🎓 Altaf holds a **${KB.degree}** in **${KB.branch}** (Specialization: ${KB.specialization}) with a **CGPA of ${KB.cgpa}** — graduated **${KB.passoutYear}**.`;
  }

  // Branch / Stream / Specialization
  if (match(q, 'branch', 'cse', 'computer science', 'field', 'stream', 'subject', 'major', 'specializ')) {
    return `💻 Altaf's branch is **${KB.branch}** with specialization in **${KB.specialization}**.\n\nKey coursework: Data Structures, DBMS, Linear Algebra, Probability & Statistics, Machine Learning, and Data Mining.`;
  }

  // College name
  if (match(q, 'college', 'mecw', 'mewat', 'institute', 'school', 'institution', 'college kahan')) {
    return `🏫 Altaf studied at **Mewat Engineering College (MECW)**, Nuh, Haryana.\n• Affiliation: **Gurugram University**\n• Approval: **AICTE Approved**\n• Degree: B.Tech CSE (2022–2026)\n• Official website: https://www.mecw.ac.in/`;
  }

  // University name
  if (match(q, 'university', 'gurugram university', 'varsity', 'affiliat')) {
    return `🏛️ Altaf's university is **Gurugram University**, Gurugram, Haryana.\n• Type: UGC State Govt. University (Govt. of Haryana)\n• Established: 2017\n• Official website: https://gurugramuniversity.ac.in/`;
  }

  // QSpiders Training / Experience
  if (match(q, 'qspiders', 'training', 'internship', 'trainee', 'qspider', 'experience', 'work experience', 'kahan kaam kiya')) {
    return `📊 **Professional Training Experience:**\n\n🏢 **Company:** QSpiders Gurugram\n💼 **Role:** Data Analytics Trainee\n📅 **Duration:** Aug. 2025 – Aug. 2026 (1 Year)\n📍 **Location:** Sector 16, Gurugram, Haryana\n\n**What Altaf did & learned:**\n• Hands-on SQL (complex queries, joins, aggregations, subqueries, window functions)\n• Advanced Excel (pivot tables, VLOOKUP, data validation, summary models)\n• Power BI (interactive business dashboards, DAX measures, KPI tracking)\n• Exploratory Data Analysis (EDA) on **5+ real-world datasets** using Pandas, NumPy & Matplotlib.`;
  }

  // ─── SPECIFIC PROJECT QUESTIONS ───

  // 1. NovaFlix
  if (match(q, 'novaflix', 'nova flix', 'movie', 'anime', 'recommendation', 'movie project', 'netflix')) {
    return `🎬 **NovaFlix – Movie & Anime Recommendation Engine**\n\n**What is it? (Kya hai):**\nNovaFlix is an intelligent content-based recommendation platform covering **7,200+ movies** and **300+ anime titles**.\n\n**How it works & Features (Kaam kya karta hai):**\n• **Recommendation Algorithm:** Uses TF-IDF Vectorization and Cosine Similarity to compute similarity scores across genres, cast, crew, and plot keywords.\n• **Sub-3s Response:** Delivers personalized recommendations in under 3 seconds.\n• **Live TMDB Integration:** Fetches real-time movie posters, backdrops, ratings, and trailers directly via TMDB API.\n• **Mood-Based Filtering:** Allows users to find movies based on their current mood, genres, and watchlists.\n• **Architecture:** FastAPI backend (deployed on Render) + React/Vite frontend (deployed on Vercel).\n\n🔗 **Live App:** https://novaflix-client.vercel.app/\n💻 **GitHub:** https://github.com/ialtaf14/NovaFlix`;
  }

  // 2. NovaReality / RealityML
  if (match(q, 'novareality', 'realityml', 'reality ml', 'reality', 'feasibility', 'risk assessment', 'synthetic data')) {
    return `🧠 **NovaReality (RealityML) – AI Feasibility & Readiness Suite**\n\n**What is it? (Kya hai):**\nAn end-to-end AI Feasibility & Readiness Assessment Suite that helps data scientists and product managers determine if an ML project is viable *before* writing model training code.\n\n**How it works & 5-Step Pipeline (Kaam kya karta hai):**\n1. **Business Intelligence Engine:** NLP-based feasibility scoring for business problems across 9+ industry domains (Healthcare, Banking, HR, Logistics, SaaS, Retail, etc.).\n2. **Data Health & Risk Audit:** Automated scanning for missing values, duplicates, sample bias, and data leakage risks.\n3. **Model Reality Check:** Compares Baseline Dummy vs Logistic/Linear Regression vs Random Forest to confirm if ML genuinely outperforms simple rules.\n4. **Executive PDF Report:** Generates a downloadable executive readiness scorecard using a 3-component formula (*35% Business + 35% Data Quality + 30% Model Signal*).\n5. **Synthetic Dataset Generator:** Generates logically consistent datasets (Real Estate Pricing & Customer Churn) from 100 to 5,000 rows.\n\n🛠️ **Tech:** Python, Streamlit, FastAPI, scikit-learn, Pandas, Altair, ReportLab\n💻 **GitHub:** https://github.com/ialtaf14/RealityML`;
  }

  // 3. Nova AI
  if (match(q, 'nova ai', 'nova-ai', 'assistant', 'ollama', 'gemini', 'voice', 'vision', 'rag', 'deepseek')) {
    return `🤖 **Nova AI – Hybrid Personal AI Assistant**\n\n**What is it? (Kya hai):**\nAn advanced hybrid personal AI assistant combining local offline LLMs and cloud APIs in an iOS Glassmorphic web interface.\n\n**How it works & Features (Kaam kya karta hai):**\n• **Hybrid Intelligent Routing:** Routes user queries intelligently between local offline LLMs (Ollama / DeepSeek) and cloud APIs (Gemini, OpenRouter).\n• **Real-Time Live Web Search (RAG):** Grounds answers in live web search context without requiring paid search API keys.\n• **Multimodal Vision Q&A:** Allows uploading and analyzing images, charts, and documents.\n• **Voice & Speech:** Real-time speech recognition and Hinglish natural Text-to-Speech (TTS).\n• **Google Maps Embed:** Interactive location finding inside chat.\n\n🛠️ **Tech:** Python, Flask, Ollama, DeepSeek, Gemini API, OpenRouter, Speech Recognition, React, Tailwind CSS\n💻 **GitHub:** https://github.com/ialtaf14/Nova-AI`;
  }

  // 4. NovaRecon
  if (match(q, 'novarecon', 'nova recon', 'osint', 'cyber', 'threat', 'recon', 'etl pipeline')) {
    return `🛡️ **NovaRecon – Automated OSINT Threat Intelligence Aggregator**\n\n**What is it? (Kya hai):**\nAn automated Open-Source Intelligence (OSINT) and threat reconnaissance ETL pipeline.\n\n**How it works & Features (Kaam kya karta hai):**\n• Ingests live data from multiple public intelligence APIs, normalizes and cleans it in Python/FastAPI.\n• Performs IP Geolocation mapping, ASN routing lookup, and 11-platform social media footprint scanning.\n• Stores records in SQLite and renders analytics in a Next.js 14 & TypeScript dashboard.\n\n🔗 **Live App:** https://novarecon-frontend.onrender.com/\n💻 **GitHub:** https://github.com/ialtaf14/NovaRecon`;
  }

  // All Projects General List
  if (match(q, 'project', 'projects', 'build', 'made', 'created', 'banaya', 'kitne project', 'sare project', 'all project', 'portfolio projects')) {
    return `🚀 **Altaf's Major Projects:**\n\n1. 🎬 **NovaFlix** — Movie & Anime Recommendation Engine (7,200+ movies, TF-IDF, Cosine Similarity, FastAPI, React/Vite) [Live Demo available]\n2. 🧠 **NovaReality (RealityML)** — AI Feasibility & Readiness Suite (NLP scoring, data health audit, baseline vs ML check, executive PDF)\n3. 🤖 **Nova AI** — Hybrid Personal AI Assistant (Ollama, DeepSeek, Gemini API, Voice TTS, Vision, RAG search)\n4. 🛡️ **NovaRecon** — Automated OSINT Intelligence Aggregator (FastAPI, SQLite, Next.js 14, IP & social footprint)\n5. 🌐 **Data Analytics Portfolio** — React 19, Tailwind CSS, Framer Motion, Glassmorphism UI\n\nAsk me about any specific project (e.g. *"Tell me about NovaFlix"* or *"NovaReality kya hai"*)!`;
  }

  // ─── SKILLS BREAKDOWN ───

  // Skills (general)
  if (match(q, 'skill', 'technology', 'tech', 'stack', 'tool', 'kya aata', 'what do you know', 'expertise', 'capabilities')) {
    return `🛠️ **Altaf's Technical Skill Set:**\n\n• **Languages:** Python (Pandas, NumPy, Matplotlib, Scikit-learn), SQL\n• **BI & Analytics:** Power BI (DAX, Dashboards), MS Excel (Advanced, Pivot Tables, VLOOKUP)\n• **Frameworks & APIs:** FastAPI, Flask, Streamlit, Ollama, Gemini API, OpenRouter\n• **Tools & Platforms:** Git, GitHub, Jupyter Notebook, VS Code, Vercel, Render\n• **Core Capabilities:** Exploratory Data Analysis (EDA), Data Cleaning, Feature Engineering, Model Evaluation (F1, Precision, Recall), Database Design & Querying.`;
  }

  // Python
  if (match(q, 'python')) {
    return `🐍 **Python** is Altaf's primary language.\n\nUsed for:\n• Data analysis, cleaning & ETL (Pandas, NumPy)\n• Exploratory Data Analysis & visual reporting (Matplotlib)\n• Machine Learning models (Scikit-learn)\n• Web APIs & Microservices (FastAPI, Flask, Streamlit)\n• AI & LLM integration (Ollama, Gemini API)`;
  }

  // SQL / Database
  if (match(q, 'sql', 'database', 'query', 'queries', 'dbms', 'joins', 'aggregat', 'postgresql', 'mysql', 'sqlite')) {
    return `🗃️ Altaf has strong **SQL** proficiency:\n\n• Complex multi-table JOIN queries (INNER, LEFT, RIGHT, FULL)\n• Subqueries and nested query logic\n• GROUP BY, HAVING, and aggregation functions\n• Window functions and analytical partitioning\n• Relational database modeling and data normalization`;
  }

  // Pandas / NumPy
  if (match(q, 'pandas', 'numpy', 'dataframe', 'data frame', 'array', 'vector')) {
    return `🐼 **Pandas & NumPy:**\n\n• **Pandas:** DataFrame wrangling, grouping, reshaping, cleaning missing values, handling CSV/Excel files\n• **NumPy:** Vectorized mathematical operations, array transformations, statistical calculations`;
  }

  // Power BI / Excel / Dashboards
  if (match(q, 'power bi', 'powerbi', 'excel', 'dashboard', 'pivot', 'business intelligence', 'bi tool')) {
    return `📊 **Business Intelligence & Reporting:**\n\n• **Power BI:** Interactive executive dashboards, DAX measures, relational data modeling, KPI tracking\n• **Advanced Excel:** Pivot tables, VLOOKUP/XLOOKUP, conditional formatting, data validation models\n• Trained at **QSpiders Gurugram** on corporate reporting standards`;
  }

  // Scikit-learn / ML Models
  if (match(q, 'scikit', 'sklearn', 'classifier', 'regression', 'classification', 'machine learning', 'ml model')) {
    return `🤖 **Machine Learning (Scikit-learn):**\n\n• Supervised Learning: Classification & Regression algorithms (Linear, Logistic, Random Forest, Decision Trees)\n• Model Evaluation: Confusion Matrix, Accuracy, Precision, Recall, F1-Score, ROC-AUC\n• Hyperparameter tuning & Cross-Validation\n• Used extensively in **NovaReality** and **NovaFlix**`;
  }

  // EDA / Data Cleaning
  if (match(q, 'eda', 'data clean', 'cleaning', 'missing', 'imputation', 'null', 'outlier', 'preprocessing', 'exploratory')) {
    return `🔍 **EDA & Data Cleaning:**\n\n• Outlier detection (IQR, Z-Score) and treatment\n• Missing value analysis & imputation strategies\n• Correlation matrices, skewness, and distribution plots\n• Categorical encoding (One-Hot, Label Encoding) & feature scaling\n• Applied across **5+ datasets** during QSpiders training`;
  }

  // ─── CONTACT, HIRING & AVAILABILITY ───

  // Phone / mobile
  if (match(q, 'phone', 'mobile', 'number', 'call', 'contact number', 'mob', 'phon', 'no.')) {
    return `📞 Altaf's phone number is **${KB.phone}**.\n\nYou can click the phone number in the Contact section to dial directly.`;
  }

  // WhatsApp
  if (match(q, 'whatsapp', 'whats app', 'wa', 'chat')) {
    return `💬 Altaf is available on **WhatsApp** at **${KB.whatsapp}**.\n\nFeel free to send a message directly!`;
  }

  // Email
  if (match(q, 'email', 'mail', 'gmail', 'ईमेल')) {
    return `📧 Altaf's email address is **${KB.email}**.\n\nYou can also use the contact form on this portfolio to send a message.`;
  }

  // Location / address
  if (match(q, 'location', 'city', 'address', 'where', 'place', 'kahan', 'live', 'located', 'state', 'gurgaon', 'gurugram', 'haryana')) {
    return `📍 Altaf is based in **${KB.location}**.\n\nOpen to relocation and remote opportunities across India.`;
  }

  // Contact (all channels)
  if (match(q, 'contact', 'reach', 'touch', 'connect', 'sampark', 'kaise contact')) {
    return `📬 **All Contact Details:**\n\n📞 Phone: **${KB.phone}**\n💬 WhatsApp: **${KB.whatsapp}**\n📧 Email: **${KB.email}**\n📍 Location: ${KB.location}\n🔗 LinkedIn: ${KB.linkedin}\n💻 GitHub: ${KB.github}`;
  }

  // GitHub
  if (match(q, 'github', 'git hub', 'repository', 'repo')) {
    return `💻 Altaf's GitHub profile:\n**${KB.github}**\n\nFeatured repos: **NovaFlix, NovaReality, Nova-AI, NovaRecon, and Portfolio**.`;
  }

  // LinkedIn
  if (match(q, 'linkedin', 'linked in', 'profile')) {
    return `🔗 Connect with Altaf on LinkedIn:\n**${KB.linkedin}**`;
  }

  // Resume / CV
  if (match(q, 'resume', 'cv', 'download', 'pdf', 'biodata', 'curriculum')) {
    return `📄 You can download Altaf's updated **CV / Resume PDF** ([Altaf_Khan_CV.pdf](/cv/Altaf_Khan_CV.pdf)) using the **"Download Resume"** button in the Hero section or Header navigation!`;
  }

  // Certifications
  if (match(q, 'certificate', 'certification', 'course', 'nptel', 'cisco', 'certified', 'credential')) {
    return `🏆 **Altaf's Verified Certifications (4):**\n\n${KB.certifications.map((c, i) => `${i + 1}. ${c}`).join('\n')}\n\nOfficial PDF certificates are viewable and downloadable in the **Certifications section** of this portfolio.`;
  }

  // Job / Hire / Availability
  if (match(q, 'hire', 'available', 'availability', 'looking', 'full-time', 'fulltime', 'role', 'position', 'naukri', 'kaam', 'job', 'opportunity', 'recruit', 'onboard', 'kab join', 'join')) {
    return `🟢 **${KB.status}**\n\n• **Joining:** Immediate Joiner\n• **Preferred Roles:** Data Analyst, Business Analyst, Data Scientist, Python Developer\n• **Salary Expectation:** ~₹20,000 – ₹25,000/month (negotiable)\n• **Work Mode:** Remote or On-site across India\n• **Contact:** ${KB.phone} | ${KB.email}`;
  }

  // Salary / CTC
  if (match(q, 'salary', 'ctc', 'pay', 'package', 'compensation', 'expect', 'stipend', 'kitna', 'paisa')) {
    return `💰 Altaf's salary expectation is **approximately ₹20,000 – ₹25,000/month**.\n\nHe is open to discussion based on role responsibilities, company growth, and learning opportunities.`;
  }

  // Work mode / remote / onsite
  if (match(q, 'remote', 'onsite', 'work from home', 'wfh', 'hybrid', 'office', 'work mode', 'flexible')) {
    return `🌐 Altaf is **open to both remote and on-site roles** across India — fully flexible.`;
  }

  // Hobbies / Interests
  if (match(q, 'hobby', 'hobbies', 'interest', 'free time', 'passion', 'like to do', 'leisure', 'fun', 'pastime')) {
    return `🎯 Altaf's hobbies & interests:\n\n🎬 **Cinema & Web Series** — exploring storytelling and direction\n🎵 **Music** — keeps him focused while coding\n📊 **Exploring Datasets** — finding patterns in real-world data\n🤖 **AI Trends** — experimenting with local LLMs and generative AI`;
  }

  // About / summary / introduction
  if (match(q, 'about', 'tell me', 'introduce', 'summary', 'bio', 'background', 'batao', 'describe', 'kya karta')) {
    return `👨‍💻 **About Altaf Khan:**\n\n[PHOTO:${KB.photo}]\n\n• **Role:** ${KB.title}\n• **Education:** B.Tech CSE (Passout 2026, CGPA: ${KB.cgpa})\n• **College & Univ:** Mewat Engineering College / Gurugram University\n• **Training:** Data Analytics Trainee at QSpiders Gurugram (1 Year)\n• **Core Skills:** Python, SQL, Pandas, Power BI, Scikit-learn, Excel\n• **Projects:** NovaFlix, NovaReality, Nova AI, NovaRecon\n• **Status:** Available for immediate hire!\n\n📞 ${KB.phone} | 📧 ${KB.email}`;
  }

  // Thanks / goodbye
  if (match(q, 'thank', 'thanks', 'bye', 'goodbye', 'shukriya', 'dhanyawad', 'ok thanks', 'got it', 'theek')) {
    return `You're welcome! 😊 Feel free to ask anytime or reach out to Altaf directly:\n\n📞 **${KB.phone}**\n📧 **${KB.email}**\n🔗 **${KB.linkedin}**`;
  }

  // Default fallback with helpful question suggestions
  return `I didn't quite catch that — but here's what I can answer:\n\n• 🎬 *"Tell me about NovaFlix"* or *"NovaFlix kya hai"* \n• 🧠 *"Tell me about NovaReality"* or *"Nova AI"* \n• 🎓 *"What is his CGPA and College?"*\n• 📊 *"Tell me about his QSpiders training"*\n• 🛠️ *"What are his Python & SQL skills?"*\n• 💼 *"Is he available for hire?"* | 💰 *"Salary expectation?"*\n• 📄 *"Download his CV"* | 📞 *"Phone number"*\n\nTry asking one of these!`;
}

// ─── Suggested quick questions ─────────────────────────────────────────────────
const SUGGESTIONS = [
  'Tell me about NovaFlix 🎬',
  'Tell me about NovaReality 🧠',
  'Tell me about Nova AI 🤖',
  'What is his CGPA & College? 🎓',
  'What are his core skills? 🛠️',
  'QSpiders Training details 📊',
  'Is he available for hire? 💼',
  'Download his CV 📄',
];

// ─── Message bubble ─────────────────────────────────────────────────────────────
const Bubble = ({ msg }) => {
  const isAI = msg.role === 'ai';

  // Render text with **bold** support and [PHOTO:url] inline image support
  const formatText = (text) => {
    return text.split('\n').map((line, li) => {
      // Detect [PHOTO:url] marker and render as inline profile image
      const photoMatch = line.match(/^\[PHOTO:(.+?)\]$/);
      if (photoMatch) {
        return (
          <span key={li}>
            <img
              src={photoMatch[1]}
              alt="Altaf Khan profile"
              className="w-36 h-36 rounded-2xl object-cover object-top shadow-lg border-2 border-violet-400/40 mt-2 mb-1 block"
            />
          </span>
        );
      }
      return (
        <span key={li}>
          {line.split(/\*\*(.+?)\*\*/g).map((seg, si) =>
            si % 2 === 1 ? <strong key={si} className="font-semibold">{seg}</strong> : seg
          )}
          {li < text.split('\n').length - 1 && <br />}
        </span>
      );
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 340, damping: 26 }}
      className={`flex gap-2 ${isAI ? 'justify-start' : 'justify-end'}`}
    >
      {isAI && (
        <div className="flex-shrink-0 w-6 h-6 mt-0.5 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center shadow-sm">
          <Sparkles className="w-3 h-3 text-white" />
        </div>
      )}
      <div
        className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed ${
          isAI
            ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 rounded-tl-sm'
            : 'bg-gradient-to-br from-violet-600 to-blue-600 text-white rounded-tr-sm shadow-sm'
        }`}
      >
        {formatText(msg.text)}
      </div>
    </motion.div>
  );
};

// ─── Typing indicator ──────────────────────────────────────────────────────────
const TypingDots = () => (
  <div className="flex justify-start gap-2">
    <div className="w-6 h-6 mt-0.5 flex-shrink-0 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center">
      <Sparkles className="w-3 h-3 text-white" />
    </div>
    <div className="px-3.5 py-3 bg-neutral-100 dark:bg-neutral-800 rounded-2xl rounded-tl-sm flex items-center gap-1">
      {[0, 0.15, 0.3].map((d, i) => (
        <motion.span
          key={i}
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: d }}
          className="w-1.5 h-1.5 rounded-full bg-neutral-400 dark:bg-neutral-500 block"
        />
      ))}
    </div>
  </div>
);

// ─── Main Widget ───────────────────────────────────────────────────────────────
const AIChatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', text: `Hi! 👋 I'm **Altaf's AI assistant**.\n\nAsk me anything about his skills, projects, contact info, or availability!`, id: 0 },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [pulse, setPulse] = useState(true);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const idRef = useRef(1);

  // Stop pulse after first open & broadcast state
  useEffect(() => {
    if (open) setPulse(false);
    window.dispatchEvent(new CustomEvent('ai-chat-state', { detail: { open } }));
  }, [open]);

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  // Focus input on open
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 200);
  }, [open]);

  // Listen for external trigger from Floating Contact Button 2.5s hover
  useEffect(() => {
    const handleOpenAI = () => setOpen(true);
    window.addEventListener('open-ai-chat', handleOpenAI);
    return () => window.removeEventListener('open-ai-chat', handleOpenAI);
  }, []);

  const sendMessage = useCallback((text) => {
    const trimmed = text.trim();
    if (!trimmed || typing) return;

    const userMsg = { role: 'user', text: trimmed, id: idRef.current++ };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setTyping(true);

    // Simulate a short "thinking" delay
    const delay = 500 + Math.random() * 400;
    setTimeout(() => {
      const reply = getReply(trimmed);
      setMessages(prev => [...prev, { role: 'ai', text: reply, id: idRef.current++ }]);
      setTyping(false);
    }, delay);
  }, [typing]);

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleReset = () => {
    setMessages([{ role: 'ai', text: `Conversation cleared! 🔄 Ask me anything about Altaf.`, id: idRef.current++ }]);
  };

  return (
    <>

      {/* ── Floating Button ── */}
      <div className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 ${open ? 'hidden sm:flex' : 'flex'} flex-col items-end gap-3 pointer-events-auto`}>
        {/* Tooltip hint */}
        <AnimatePresence>
          {!open && pulse && (
            <motion.div
              initial={{ opacity: 0, x: 10, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.9 }}
              transition={{ delay: 1.5 }}
              className="hidden sm:block bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-[11px] font-medium px-3 py-1.5 rounded-full shadow-lg whitespace-nowrap pointer-events-none"
            >
              Ask AI about Altaf ✨
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setOpen(prev => !prev)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          aria-label="Open AI Assistant"
          className="relative w-12 h-12 sm:w-13 sm:h-13 rounded-full flex items-center justify-center shadow-xl shadow-violet-500/25 transition-all text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
          style={{
            background: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 50%, #2563eb 100%)',
          }}
        >
          {/* Animated orbiting rings around AI icon */}
          <div className="absolute inset-0 rounded-full border border-white/30 animate-ping opacity-25 pointer-events-none" />
          
          <AnimatePresence mode="wait">
            {open ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="ai-icon"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative flex items-center justify-center"
              >
                <svg viewBox="0 0 32 32" width="24" height="24" fill="none">
                  <motion.ellipse cx="16" cy="16" rx="13" ry="5" stroke="white" strokeWidth="1.3" opacity="0.6"
                    animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                    style={{ transformOrigin: '16px 16px' }} />
                  <motion.ellipse cx="16" cy="16" rx="9" ry="4" stroke="white" strokeWidth="1.1" opacity="0.75"
                    transform="rotate(60 16 16)"
                    animate={{ rotate: [60, 420] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
                    style={{ transformOrigin: '16px 16px' }} />
                  <circle cx="16" cy="16" r="4" fill="white" />
                  <motion.circle cx="29" cy="16" r="1.6" fill="white"
                    animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                    style={{ transformOrigin: '16px 16px' }} />
                </svg>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* ── Mobile Backdrop (Phone screens only) ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[99998] sm:hidden"
          />
        )}
      </AnimatePresence>

      {/* ── Chat Panel ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="chatpanel"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            className="fixed inset-x-2 sm:inset-x-auto sm:right-6 bottom-2 sm:bottom-24 z-[99999] sm:w-96 max-w-full sm:max-w-md mx-auto sm:mx-0 flex flex-col rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950"
            style={{
              height: 'min(540px, calc(100dvh - 20px))',
              maxHeight: 'calc(100dvh - 20px)',
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3 sm:py-3.5 flex-shrink-0"
              style={{
                background: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 50%, #2563eb 100%)',
              }}
            >
              <div className="flex items-center gap-2.5">
                {/* AI Logo in header */}
                <div className="w-8 h-8 rounded-full bg-white/15 border border-white/25 flex items-center justify-center">
                  <svg viewBox="0 0 32 32" width="20" height="20" fill="none">
                    <motion.ellipse cx="16" cy="16" rx="12" ry="4.5" stroke="white" strokeWidth="1.2" opacity="0.4"
                      animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                      style={{ transformOrigin: '16px 16px' }} />
                    <motion.ellipse cx="16" cy="16" rx="8" ry="3.5" stroke="white" strokeWidth="1" opacity="0.5"
                      transform="rotate(55 16 16)"
                      animate={{ rotate: [55, 415] }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      style={{ transformOrigin: '16px 16px' }} />
                    <circle cx="16" cy="16" r="3.5" fill="white" opacity="0.95" />
                    <motion.circle cx="28" cy="16" r="1.4" fill="white" opacity="0.85"
                      animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                      style={{ transformOrigin: '16px 16px' }} />
                    <motion.circle cx="16" cy="4" r="1.1" fill="white" opacity="0.7"
                      animate={{ rotate: [55, 415] }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      style={{ transformOrigin: '16px 16px' }} />
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-bold text-white leading-none">Altaf's AI</div>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                    <span className="text-[10px] text-white/70 font-mono">Portfolio Assistant</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={handleReset}
                  title="Clear chat"
                  className="p-1.5 rounded-lg hover:bg-white/15 text-white/70 hover:text-white transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setOpen(false)}
                  title="Close"
                  className="p-1.5 rounded-lg hover:bg-white/15 text-white/70 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-white dark:bg-neutral-950 overscroll-contain" style={{ minHeight: 0 }}>
              {messages.map(msg => <Bubble key={msg.id} msg={msg} />)}
              {typing && <TypingDots />}
              <div ref={bottomRef} />
            </div>

            {/* Suggestions row */}
            <div className="px-3 py-2 flex gap-1.5 overflow-x-auto flex-shrink-0 bg-white dark:bg-neutral-950 border-t border-neutral-100 dark:border-neutral-800/80 no-scrollbar">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  className="flex-shrink-0 px-2.5 py-1 rounded-full text-[10px] font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-violet-100 dark:hover:bg-violet-900/30 hover:text-violet-700 dark:hover:text-violet-300 border border-neutral-200 dark:border-neutral-700 transition-colors whitespace-nowrap"
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 px-3 py-3 bg-white dark:bg-neutral-950 border-t border-neutral-100 dark:border-neutral-800 flex-shrink-0"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onFocus={() => {
                  setTimeout(() => {
                    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
                  }, 300);
                }}
                placeholder="Ask anything about Altaf…"
                className="flex-1 px-3.5 py-2.5 rounded-xl text-base sm:text-xs bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
              />
              <motion.button
                type="submit"
                disabled={!input.trim() || typing}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-9 h-9 sm:w-8 sm:h-8 flex-shrink-0 rounded-xl flex items-center justify-center text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                style={{
                  background: 'linear-gradient(135deg, #7c3aed, #2563eb)',
                }}
              >
                <Send className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatbot;
