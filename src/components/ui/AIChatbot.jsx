import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles, RotateCcw } from 'lucide-react';

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
  photo: '/images/altaf.jpg',
  education: 'B.Tech in Computer Science & Engineering from Gurugram University (Mewat Engineering College), graduated in 2026, with a specialization in Data Science & Machine Learning (CGPA: 7.59 / 10).',
  college: 'Mewat Engineering College (MECW), Nuh, Haryana — affiliated to Gurugram University, AICTE Approved.',
  university: 'Gurugram University, Gurugram, Haryana — UGC State University (Govt. of Haryana), established 2017.',
  degree: 'Bachelor of Technology (B.Tech)',
  branch: 'Computer Science & Engineering (CSE)',
  specialization: 'Data Science & Machine Learning',
  passoutYear: '2026',
  cgpa: '7.59 / 10',
  skills: 'Python, SQL, Pandas, NumPy, MS Excel (Advanced), Power BI, Scikit-learn, Matplotlib, Data Cleaning, EDA, Feature Engineering, Model Evaluation, FastAPI, Flask, Streamlit, Ollama, Gemini API, OpenRouter, Git, GitHub, Jupyter Notebook, VS Code, Vercel, Render.',
  training: 'Data Analytics Trainee at QSpiders Gurugram (Aug. 2025 – Aug. 2026 / Present). Hands-on in SQL, Advanced Excel, Power BI, and Exploratory Data Analysis on 5+ real-world datasets using Pandas, NumPy & Matplotlib.',
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
      name: 'Portfolio – Interactive 3D Web Application',
      category: 'Frontend & 3D WebGL Architecture',
      desc: 'Altaf Khan\'s official 3D Data Analyst portfolio featuring Three.js 3D WebGL scenes (3D Hero Hologram Core, 3D Skills Galaxy, 3D Wireframe Globe), Multi-layer 3D tilt cards with specular reflection, Recruiter Executive Summary Deck, live GitHub API analytics, Command Palette (Ctrl+K), and AI Chatbot.',
      tech: 'React 19, Three.js, Tailwind CSS, Framer Motion, craco, Lucide Icons, Vercel',
      github: 'https://github.com/ialtaf14/Portfolio',
      live: 'https://ialtaf14.vercel.app',
    }
  ],
  certifications: [
    'Cisco Networking Academy: Data Analytics Essentials (Jan. – Feb. 2026)',
    'Cisco Networking Academy: Introduction to Data Science (Jan. – Feb. 2026)',
    'NPTEL (IIT Madras): Artificial Intelligence – Concepts & Techniques (Jul. – Aug. 2025)',
    'NPTEL (IIT Kharagpur): Introduction to Internet of Things (Jul. – Aug. 2025)',
  ],
  status: 'Actively seeking entry-level Data Analyst, Business Analyst, Data Scientist, or Python Developer roles.',
  age: '23 years old (born 6th July 2003)',
  dob: '6th July 2003',
  nationality: 'Indian',
  gender: 'Male',
  languages: 'Hindi and English (fluent in professional & casual communication)',
  whatsapp: '+91 8053821088',
  hobbies: 'Watching cinema (movies & web series), listening to music, exploring datasets for analysis, and tracking AI & machine learning trends.',
  salary: 'Around ₹20,000 – ₹25,000 per month (open to discussion based on role, company growth, and learning curve).',
  workMode: 'Open to both remote and on-site positions across India (fully flexible).',
  experience: 'Fresher (Graduated 2026) with verified hands-on project experience + 1-Year Professional Data Analytics Training at QSpiders Gurugram.',
};

// ─── Precision matching helper functions ────────────────────────────────────────
const cleanQuery = (str) => {
  return str
    .toLowerCase()
    .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1F018}-\u{1F270}\u{2388}\u{2B05}\u{2B06}\u{2B07}\u{2B1B}\u{2B1C}\u{2B50}\u{2B55}\u{200D}\u{FE0F}]/gu, '')
    .replace(/[?!.,;:_'"(){}[\]\/\\]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

// Substring match
const contains = (q, ...phrases) => phrases.some(p => q.includes(p.toLowerCase()));

// Word boundary regex match (avoids "his" matching "hi", "machine" matching "hi", etc.)
const hasWord = (q, ...words) => {
  return words.some(w => {
    const escaped = w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(^|\\s|[^a-zA-Z0-9])${escaped}($|\\s|[^a-zA-Z0-9])`, 'i');
    return regex.test(q);
  });
};

function getReply(raw) {
  const q = cleanQuery(raw);

  // 1. SPECIFIC PROJECT LOOKUPS (High Priority)
  // ─── NovaFlix ───
  if (contains(q, 'novaflix', 'nova flix', 'movie project', 'anime project', 'recommendation engine', 'recommendation system', 'netflix clone') || (contains(q, 'movie') && contains(q, 'anime'))) {
    return `🎬 **NovaFlix – Movie & Anime Recommendation Engine**\n\n**What is it? (Kya hai):**\nNovaFlix is an intelligent content-based recommendation platform covering **7,200+ movies** and **300+ anime titles**.\n\n**How it works & Key Features:**\n• **Recommendation Algorithm:** Uses TF-IDF Vectorization and Cosine Similarity to compute similarity scores across genres, cast, crew, and plot keywords.\n• **Sub-3s Response:** Delivers personalized recommendations in under 3 seconds.\n• **Live TMDB Integration:** Fetches real-time movie posters, backdrops, ratings, and trailers directly via TMDB API.\n• **Mood-Based Filtering:** Allows users to find movies based on their current mood, genres, and watchlists.\n• **Architecture:** FastAPI backend (deployed on Render) + React/Vite frontend (deployed on Vercel).\n\n🔗 **Live App:** https://novaflix-client.vercel.app/\n💻 **GitHub:** https://github.com/ialtaf14/NovaFlix`;
  }

  // ─── NovaReality / RealityML ───
  if (contains(q, 'novareality', 'nova reality', 'realityml', 'reality ml', 'ai feasibility', 'readiness suite', 'synthetic dataset', 'model reality')) {
    return `🧠 **NovaReality (RealityML) – AI Feasibility & Readiness Suite**\n\n**What is it? (Kya hai):**\nAn end-to-end AI Feasibility & Readiness Assessment Suite that helps data scientists and product managers determine if an ML project is viable *before* writing model training code.\n\n**How it works & 5-Step Pipeline:**\n1. **Business Intelligence Engine:** NLP-based feasibility scoring for business problems across 9+ industry domains (Healthcare, Banking, HR, Logistics, SaaS, Retail, etc.).\n2. **Data Health & Risk Audit:** Automated scanning for missing values, duplicates, sample bias, and data leakage risks.\n3. **Model Reality Check:** Compares Baseline Dummy vs Logistic/Linear Regression vs Random Forest to confirm if ML genuinely outperforms simple rules.\n4. **Executive PDF Report:** Generates a downloadable executive readiness scorecard using a 3-component formula (*35% Business + 35% Data Quality + 30% Model Signal*).\n5. **Synthetic Dataset Generator:** Generates logically consistent datasets (Real Estate Pricing & Customer Churn) from 100 to 5,000 rows.\n\n🛠️ **Tech:** Python, Streamlit, FastAPI, scikit-learn, Pandas, Altair, ReportLab\n💻 **GitHub:** https://github.com/ialtaf14/RealityML`;
  }

  // ─── Nova AI ───
  if (contains(q, 'nova ai', 'nova-ai', 'personal assistant', 'hybrid ai', 'multimodal assistant', 'voice assistant', 'rag assistant') || (hasWord(q, 'nova') && hasWord(q, 'ai'))) {
    return `🤖 **Nova AI – Hybrid Personal AI Assistant**\n\n**What is it? (Kya hai):**\nAn advanced hybrid personal AI assistant combining local offline LLMs and cloud APIs in an iOS Glassmorphic web interface.\n\n**How it works & Features:**\n• **Hybrid Intelligent Routing:** Routes user queries intelligently between local offline LLMs (Ollama / DeepSeek) and cloud APIs (Gemini, OpenRouter).\n• **Real-Time Live Web Search (RAG):** Grounds answers in live web search context without requiring paid search API keys.\n• **Multimodal Vision Q&A:** Allows uploading and analyzing images, charts, and documents.\n• **Voice & Speech:** Real-time speech recognition and Hinglish natural Text-to-Speech (TTS).\n• **Google Maps Embed:** Interactive location finding inside chat.\n\n🛠️ **Tech:** Python, Flask, Ollama, DeepSeek, Gemini API, OpenRouter, Speech Recognition, React, Tailwind CSS\n💻 **GitHub:** https://github.com/ialtaf14/Nova-AI`;
  }

  // ─── NovaRecon ───
  if (contains(q, 'novarecon', 'nova recon', 'osint', 'threat intelligence', 'cybersecurity project', 'reconnaissance')) {
    return `🛡️ **NovaRecon – Automated OSINT Threat Intelligence Aggregator**\n\n**What is it? (Kya hai):**\nAn automated Open-Source Intelligence (OSINT) reconnaissance ETL pipeline.\n\n**How it works & Features:**\n• Ingests and normalizes live data from multiple public intelligence APIs.\n• Performs IP Geolocation mapping, ASN lookup, threat alert parsing, and 11-platform social footprint scanning.\n• Stores structured records in SQLite with a Next.js 14 & TypeScript dashboard.\n\n🔗 **Live App:** https://novarecon-frontend.onrender.com/\n💻 **GitHub:** https://github.com/ialtaf14/NovaRecon`;
  }

  // ─── All Projects List ───
  if (contains(q, 'project', 'projects', 'build', 'portfolio project', 'what did he make', 'kya banaya', 'kitne project', 'all projects', 'major project')) {
    return `🚀 **Altaf's Major Technical Projects:**\n\n1. 🎬 **NovaFlix** — Movie & Anime Recommendation Engine (7,200+ movies, TF-IDF, Cosine Similarity, FastAPI, React/Vite) [Live Demo available]\n2. 🧠 **NovaReality (RealityML)** — AI Feasibility & Readiness Suite (NLP scoring, data health audit, baseline vs ML check, executive PDF report)\n3. 🤖 **Nova AI** — Hybrid Personal AI Assistant (Ollama, DeepSeek, Gemini API, Voice TTS, Vision, RAG search)\n4. 🛡️ **NovaRecon** — Automated OSINT Intelligence Aggregator (FastAPI, SQLite, Next.js 14, IP & social footprint)\n5. 🌐 **3D Portfolio** — Interactive 3D WebGL App (Three.js 3D scenes, 3D Skills Galaxy, 3D Tilt Cards)\n\nAsk me about any specific project (e.g. *"Tell me about NovaFlix"* or *"NovaReality kya hai"*)!`;
  }

  // 2. EDUCATION & ACADEMIC BACKGROUND (CGPA, College, University, Passout Year)
  if (contains(q, 'cgpa', 'marks', 'percentage', 'grade', 'gpa', 'score', 'percent', 'kitna cgpa', 'kitne marks') || 
      contains(q, 'college', 'university', 'campus', 'institution', 'school', 'mewat', 'mecw', 'gurugram university', 'kahan padha', 'which college', 'education', 'academic', 'qualification', 'degree', 'btech', 'b tech', 'passout', 'passing year', 'graduat', 'batch')) {
    return `🎓 **Altaf's Verified Academic Background:**\n\n• **Degree:** ${KB.degree} in **${KB.branch}**\n• **Specialization:** **${KB.specialization}**\n• **CGPA:** **${KB.cgpa}**\n• **Graduation / Passout Year:** **${KB.passoutYear}** (Graduated CSE)\n• **College:** **Mewat Engineering College (MECW)**, Nuh, Haryana (AICTE Approved)\n• **University:** **Gurugram University**, Gurugram, Haryana (UGC State Govt. University)\n\nRelevant Coursework: Probability & Statistics, Database Management Systems (DBMS), Data Structures, Linear Algebra, Machine Learning, and Data Mining.`;
  }

  // 3. CORE TECHNICAL SKILLS & STACK
  if (contains(q, 'core skill', 'skills', 'skill', 'technical capability', 'tech stack', 'technolog', 'tool', 'expertise', 'capabilities', 'what does he know', 'kya skills', 'kya aata hai', 'languages') || (hasWord(q, 'core') && hasWord(q, 'skills'))) {
    return `🛠️ **Altaf's Core Technical Skills & Ecosystem:**\n\n• **Core Languages:** Python (Advanced Scripting, Automation), SQL (Complex Queries, Joins, Aggregations)\n• **Data Wrangling & Analysis:** Pandas, NumPy, Matplotlib, Data Cleaning, EDA, Outlier Detection, Feature Engineering\n• **Business Intelligence & Dashboards:** Power BI (DAX Measures, KPI Reporting), MS Excel (Advanced Pivots, VLOOKUP/XLOOKUP, Modeling)\n• **Machine Learning & AI:** Scikit-learn (Classification, Regression, Random Forest), Model Evaluation (F1, Precision, Recall, ROC-AUC), Ollama, Gemini API\n• **Web & API Frameworks:** FastAPI, Flask, Streamlit\n• **Developer Tools:** Git, GitHub, Jupyter Notebook, VS Code, Vercel, Render`;
  }

  // ─── Specific Tool Deep-Dives ───
  if (hasWord(q, 'python')) {
    return `🐍 **Python for Data Science & ML:**\n\nAltaf uses Python as his primary programming language for:\n• Data wrangling & transformation (Pandas, NumPy)\n• Exploratory Data Analysis & visual reporting (Matplotlib)\n• Predictive Machine Learning models (Scikit-learn)\n• Microservices & REST APIs (FastAPI, Flask, Streamlit)\n• LLM orchestration (Ollama, Gemini API, OpenRouter)`;
  }

  if (hasWord(q, 'sql') || contains(q, 'database', 'dbms', 'queries', 'postgres', 'mysql', 'sqlite', 'joins')) {
    return `🗃️ **SQL & Relational Databases:**\n\nAltaf writes production-ready SQL queries for analytics:\n• Complex multi-table JOINs (INNER, LEFT, RIGHT, FULL)\n• Subqueries, CTEs, and Nested logic\n• GROUP BY, HAVING, and Aggregation analytics\n• Window functions (ROW_NUMBER, RANK, DENSE_RANK, Partitioning)\n• Relational Schema Design & Normalization`;
  }

  if (contains(q, 'power bi', 'powerbi', 'excel', 'dashboard', 'dax', 'pivot', 'vlookup', 'bi tool')) {
    return `📊 **Power BI & Advanced Excel:**\n\n• **Power BI:** Building interactive executive dashboards, DAX formulas, relationship modeling, and automated KPI tracking.\n• **Advanced Excel:** Pivot tables, multi-condition formulas (VLOOKUP, XLOOKUP, INDEX/MATCH), data validation, and financial/operational summaries.\n• Trained at **QSpiders Gurugram** on corporate business intelligence standards.`;
  }

  if (contains(q, 'machine learning', 'scikit', 'sklearn', 'model', 'classification', 'regression', 'random forest')) {
    return `🤖 **Machine Learning (Scikit-learn):**\n\n• Supervised algorithms: Linear & Logistic Regression, Decision Trees, Random Forest Classifiers\n• Evaluation metrics: Accuracy, Precision, Recall, F1-Score, Confusion Matrix, ROC-AUC\n• End-to-end ML lifecycle from data preprocessing to deployment (used in **NovaReality** and **NovaFlix**).`;
  }

  // 4. PROFESSIONAL TRAINING (QSpiders Gurugram)
  if (contains(q, 'qspiders', 'qspider', 'training', 'internship', 'trainee', 'professional training', 'training details', 'course', 'kahan training')) {
    return `📊 **Professional Training Experience:**\n\n🏢 **Company / Institute:** QSpiders Gurugram\n💼 **Role:** Data Analytics Trainee\n📅 **Duration:** Aug. 2025 – Aug. 2026 (1 Year)\n📍 **Location:** Sector 16, Gurugram, Haryana\n\n**Hands-on Curriculum & Real-World Projects:**\n• **Advanced SQL:** Complex queries, CTEs, joins, aggregations, and window functions.\n• **Excel for Business:** Advanced pivot tables, VLOOKUP/XLOOKUP, and dashboard modeling.\n• **Power BI:** End-to-end interactive dashboard development and DAX measures.\n• **Python EDA:** Exploratory analysis and statistical reporting on **5+ real-world industry datasets** using Pandas, NumPy & Matplotlib.`;
  }

  // 5. JOB AVAILABILITY, HIRING, NOTICE PERIOD & SALARY
  if (contains(q, 'hire', 'available', 'availability', 'job', 'join', 'opportunity', 'role', 'position', 'recruit', 'immediate', 'notice period', 'fresher', 'experience', 'relocat', 'kaam', 'naukri', 'joining') || hasWord(q, 'hire', 'job', 'join')) {
    return `🟢 **Job Availability & Hiring Status:**\n\n• **Status:** Actively seeking full-time opportunities (Immediate Joiner)\n• **Target Roles:** Data Analyst, Business Analyst, Data Scientist, Python Developer\n• **Experience Level:** Fresher (B.Tech CSE 2026) with 1-Year Data Analytics Training at QSpiders + Verified End-to-End Projects\n• **Work Mode:** Remote, Hybrid, or On-site across India (fully flexible)\n• **Expected CTC / Salary:** ~₹20,000 – ₹25,000 / month (open to discussion based on role & company learning curve)\n• **Contact Directly:** 📞 ${KB.phone} | 📧 ${KB.email}`;
  }

  if (contains(q, 'salary', 'ctc', 'package', 'compensation', 'pay', 'stipend', 'kitna paisa', 'expectation')) {
    return `💰 **Salary Expectation:**\n\nAltaf's expected salary is **approximately ₹20,000 – ₹25,000 per month** (negotiable based on company profile, mentorship opportunities, and job responsibilities).`;
  }

  if (contains(q, 'why hire', 'why should we hire', 'strength', 'why altaf', 'kyu hire', 'special')) {
    return `💡 **Why Hire Altaf Khan?**\n\n1. **Full Data Lifecycle Expertise:** From raw data cleaning in Pandas & complex SQL joins to predictive ML models and Power BI executive dashboards.\n2. **1-Year QSpiders Professional Training:** Rigorously trained in corporate analytics standards with 5+ real-world datasets.\n3. **Production-Ready Engineering:** Built live apps like **NovaFlix** (sub-3s recommendation engine) and **NovaReality** (AI feasibility suite).\n4. **Truthful & Authentic Work:** All projects, code repositories, and NPTEL/Cisco certifications are 100% verified and open source.\n5. **Immediate Joiner:** Graduated B.Tech CSE (2026) ready to join without any notice period!`;
  }

  // 6. CERTIFICATIONS
  if (contains(q, 'certificate', 'certification', 'credentials', 'cisco', 'nptel', 'iit', 'certified')) {
    return `🏆 **Verified Industry Certifications (4):**\n\n1. 🏅 **Cisco Networking Academy:** Data Analytics Essentials (Jan. – Feb. 2026)\n2. 🏅 **Cisco Networking Academy:** Introduction to Data Science (Jan. – Feb. 2026)\n3. 🏅 **NPTEL (IIT Madras):** Artificial Intelligence – Concepts & Techniques (Jul. – Aug. 2025)\n4. 🏅 **NPTEL (IIT Kharagpur):** Introduction to Internet of Things (Jul. – Aug. 2025)\n\nAll verified PDF certificates and credentials can be viewed and downloaded in the **Certifications section** of this portfolio!`;
  }

  // 7. RESUME & CV DOWNLOAD
  if (contains(q, 'resume', 'cv', 'download cv', 'download resume', 'pdf', 'biodata', 'curriculum vitae')) {
    return `📄 **Download Altaf's Resume:**\n\nYou can download Altaf's updated **CV / Resume PDF** ([Altaf_Khan_CV.pdf](/cv/Altaf_Khan_CV.pdf)) using the **"Download Resume"** button in the Hero section or Header navigation bar!`;
  }

  // 8. CONTACT DETAILS & SOCIALS
  if (contains(q, 'contact', 'reach', 'touch', 'connect', 'phone', 'mobile', 'call', 'number', 'whatsapp', 'wa', 'email', 'mail', 'gmail', 'linkedin', 'github', 'sampark', 'kaise contact')) {
    return `📬 **Altaf's Direct Contact Details:**\n\n• 📞 **Phone:** **${KB.phone}**\n• 💬 **WhatsApp:** **${KB.whatsapp}**\n• 📧 **Email:** **${KB.email}**\n• 📍 **Location:** ${KB.location}\n• 🔗 **LinkedIn:** ${KB.linkedin}\n• 💻 **GitHub:** ${KB.github}\n\nFeel free to call, send an email, or message on WhatsApp anytime!`;
  }

  // 9. PHOTO / PROFILE PICTURE
  if (contains(q, 'photo', 'picture', 'pic', 'image', 'tasveer', 'selfie', 'face', 'profile photo', 'profile pic', 'dikhao')) {
    return `Here is Altaf's profile photo 👇\n[PHOTO:${KB.photo}]\n\nYou can also see his full 3D interactive avatar in the **Hero section** at the top!`;
  }

  // 10. PERSONAL INFO (Age, Location, Languages, Hobbies)
  if (contains(q, 'age', 'old', 'dob', 'birthday', 'date of birth', 'kitne saal', 'umar', 'birth')) {
    return `🎂 Altaf is **${KB.age}** (Date of Birth: **${KB.dob}**).`;
  }

  if (contains(q, 'location', 'city', 'address', 'where does he live', 'kahan rehta', 'gurgaon', 'gurugram', 'haryana', 'state')) {
    return `📍 Altaf is currently living in **${KB.location}** (open to remote & relocation across India).`;
  }

  if (contains(q, 'language', 'speak', 'bolta', 'spoken', 'communication', 'hindi', 'english')) {
    return `🗣️ Altaf speaks **${KB.languages}** fluently and is comfortable in corporate and technical discussions.`;
  }

  if (contains(q, 'hobby', 'hobbies', 'interest', 'free time', 'passion', 'leisure', 'fun')) {
    return `🎯 **Altaf's Hobbies & Interests:**\n\n🎬 **Cinema & Web Series** — exploring direction, cinematography, and storytelling\n🎵 **Music** — keeps his coding flow focused\n📊 **Exploring Data** — analyzing public datasets and spotting trends\n🤖 **AI Experimentation** — testing local LLMs and open-source models`;
  }

  // 11. ABOUT / BIO SUMMARY
  if (contains(q, 'about', 'tell me about altaf', 'who is altaf', 'introduce', 'summary', 'bio', 'background', 'batao', 'describe', 'who is he', 'kaun hai')) {
    return `👨‍💻 **About Altaf Khan:**\n\n[PHOTO:${KB.photo}]\n\n• **Role:** ${KB.title}\n• **Education:** B.Tech CSE (Passout 2026, CGPA: ${KB.cgpa}) from Mewat Engineering College / Gurugram University\n• **Training:** Data Analytics Trainee at QSpiders Gurugram (1 Year)\n• **Core Skills:** Python, SQL, Pandas, NumPy, Power BI, Excel, Scikit-learn, Matplotlib\n• **Key Projects:** NovaFlix, NovaReality, Nova AI, NovaRecon, 3D Portfolio\n• **Status:** Available for immediate full-time hire!\n\n📞 ${KB.phone} | 📧 ${KB.email}`;
  }

  // 12. GREETINGS (Strict word boundary to prevent matching "his", "this", "machine", etc.)
  if (hasWord(q, 'hello', 'hi', 'hey', 'helo', 'hii', 'namaste', 'salam', 'sup', 'good morning', 'good evening', 'kaisa', 'kaise', 'hola')) {
    return `Hi there! 👋 I'm **Altaf's AI Assistant**.\n\nI can answer anything about his **skills, projects (NovaFlix, NovaReality, Nova AI), education (CGPA: 7.59), QSpiders training, certifications, and availability for hire**.\n\nWhat would you like to know?`;
  }

  // 13. THANKS / GOODBYE
  if (hasWord(q, 'thanks', 'thank', 'bye', 'goodbye', 'shukriya', 'dhanyawad', 'ok', 'okay', 'nice', 'great', 'awesome')) {
    return `You're welcome! 😊 Feel free to ask anything else or reach out to Altaf directly:\n\n📞 **${KB.phone}**\n📧 **${KB.email}**\n🔗 **${KB.linkedin}**`;
  }

  // 14. DEFAULT SMART FALLBACK
  return `I can help you with anything regarding Altaf! Here are top questions you can ask:\n\n• 🎬 *"Tell me about NovaFlix"* or *"Tell me about NovaReality"*\n• 🛠️ *"What are his core skills?"* (Python, SQL, Power BI, Pandas)\n• 🎓 *"What is his CGPA & College?"* (CGPA: 7.59, Gurugram University)\n• 📊 *"QSpiders Training details"* (1-Year Data Analytics Trainee)\n• 💼 *"Is he available for hire?"* | 💰 *"Salary expectation?"*\n• 🏆 *"Show verified certifications"* (Cisco & NPTEL)\n• 📞 *"Contact details"* | 📄 *"Download his CV"*\n\nTry asking any of these!`;
}

// ─── Suggested quick questions ─────────────────────────────────────────────────
const SUGGESTIONS = [
  'Tell me about NovaFlix 🎬',
  'Tell me about NovaReality 🧠',
  'Tell me about Nova AI 🤖',
  'What are his core skills? 🛠️',
  'What is his CGPA & College? 🎓',
  'QSpiders Training details 📊',
  'Is he available for hire? 💼',
  'Why hire Altaf? 💡',
  'Verified Certifications 🏆',
  'Download his CV 📄',
  'Contact Details 📞',
];

// ─── Message bubble ─────────────────────────────────────────────────────────────
const Bubble = ({ msg }) => {
  const isAI = msg.role === 'ai';

  const formatText = (text) => {
    return text.split('\n').map((line, li) => {
      const photoMatch = line.match(/^\[PHOTO:(.+?)\]$/);
      if (photoMatch) {
        return (
          <span key={li}>
            <img
              src={photoMatch[1]}
              alt="Altaf Khan profile"
              className="w-32 h-36 rounded-2xl object-cover object-top shadow-lg border-2 border-violet-400/40 mt-2 mb-1 block"
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
        className={`max-w-[84%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed ${
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
    { role: 'ai', text: `Hi! 👋 I'm **Altaf's AI assistant**.\n\nAsk me anything about his skills, projects, education, contact info, or job availability!`, id: 0 },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [pulse, setPulse] = useState(true);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const idRef = useRef(1);

  useEffect(() => {
    if (open) setPulse(false);
    window.dispatchEvent(new CustomEvent('ai-chat-state', { detail: { open } }));
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 200);
  }, [open]);

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

    const delay = 400 + Math.random() * 300;
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

      {/* ── Mobile Backdrop ── */}
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
              height: 'min(560px, calc(100dvh - 20px))',
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
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-bold text-white leading-none">Altaf's AI Assistant</div>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                    <span className="text-[10px] text-white/70 font-mono">Instant Portfolio Answers</span>
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
