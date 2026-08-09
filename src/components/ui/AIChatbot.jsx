import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles, RotateCcw, ChevronDown } from 'lucide-react';

// ─── Portfolio knowledge base ──────────────────────────────────────────────────
const KB = {
  name: 'Altaf Khan',
  fullName: 'Altaf Khan',
  title: 'Data Analyst & Data Scientist',
  phone: '+91 8053821088',
  email: 'altafkhan122105@gmail.com',
  location: 'Gurugram, Haryana, India',
  github: 'https://github.com/ialtaf14',
  linkedin: 'https://www.linkedin.com/in/ialtaf14/',
  photo: '/images/header-profile-final.jpg',
  education: 'B.Tech in Computer Science & Engineering from Gurugram University, graduated in 2026, with a specialization in Data Science & Machine Learning.',
  college: 'Mewat Engineering College (MECW), Nuh, Haryana — affiliated to Gurugram University, AICTE Approved.',
  university: 'Gurugram University, Gurugram, Haryana — UGC State University (Govt. of Haryana), established 2017.',
  degree: 'Bachelor of Technology (B.Tech)',
  branch: 'Computer Science & Engineering (CSE)',
  specialization: 'Data Science & Machine Learning',
  passoutYear: '2026',
  skills: 'Python, SQL, Pandas, NumPy, Excel, Power BI, Scikit-learn, Matplotlib, Data Cleaning, EDA, Feature Engineering, Model Evaluation, Git, GitHub, Jupyter Notebook, VS Code.',
  projects: [
    {
      name: 'RealityML – AI Feasibility Suite',
      desc: 'A Python project that evaluates whether a business problem is suitable for machine learning by analyzing data and potential risks. Features: ML feasibility assessment, synthetic dataset generation, data quality analysis, bias and leakage detection, Streamlit dashboard.',
      tech: 'Python, Pandas, Scikit-learn, FastAPI, Streamlit',
      url: 'https://github.com/ialtaf14/RealityML',
    },
    {
      name: 'Nova AI',
      desc: 'An AI-powered assistant built using the Google Gemini API. Supports multi-turn conversations, prompt management, error handling, and a modular Python backend.',
      tech: 'Python, Gemini API, FastAPI, JSON',
      url: 'https://github.com/ialtaf14/Nova-AI',
    },
  ],
  certifications: [
    'Artificial Intelligence: Concepts & Techniques – NPTEL / IIT (Jul–Aug 2025)',
    'Introduction to Internet of Things – NPTEL / IIT (Jul–Aug 2025)',
    'Data Analytics Essentials – Cisco Networking Academy (Jan–Feb 2026)',
    'Introduction to Data Science – Cisco Networking Academy (Jan–Feb 2026)',
  ],
  status: 'Currently seeking full-time Data Analyst, Business Analyst, Data Scientist, or Python Developer roles.',
  age: '23 years old (born 6th July 2003)',
  dob: '6th July 2003',
  nationality: 'Indian',
  gender: 'Male',
  languages: 'Hindi and English',
  whatsapp: '+91 8053821088',
  hobbies: 'Watching cinema, listening to music, exploring new datasets and tools, and staying updated with trends in AI and data science.',
  salary: 'Around ₹20,000 per month (open to discussion based on role and growth opportunities).',
  workMode: 'Open to both remote and on-site positions across India.',
  experience: 'Fresher — no prior work experience. All skills are built through academic projects, self-learning, and certified online courses.',
  portfolio: window.location.origin,
};

// ─── Intent → response engine ──────────────────────────────────────────────────
const match = (q, ...keywords) => keywords.some(k => q.includes(k));

function getReply(raw) {
  const q = raw.toLowerCase().trim();

  // Help / menu
  if (match(q, 'help', 'kya kar', 'what can you', 'menu', 'option'))
    return `Here's what I can answer:\n\n• 📸 Profile photo\n• 📞 Phone, WhatsApp, Email, Location\n• 👤 Name, Age, DOB, Gender, Nationality\n• 🎓 College, University, Branch, Passout Year\n• 🛠️ Skills (Python, SQL, Pandas, etc.)\n• 🚀 Projects (RealityML, Nova AI)\n• 🏆 Certifications\n• 💼 Job availability, salary, work mode\n• 🎯 Hobbies & interests\n• 🔗 GitHub & LinkedIn\n\nJust type your question naturally!`;

  // Photo / profile picture / image
  if (match(q, 'photo', 'picture', 'pic', 'image', 'tasveer', 'selfie', 'face', 'look', 'profile photo', 'profile pic', 'show me'))
    return `Here is Altaf's profile photo 👇\n[PHOTO:${KB.photo}]\n\nYou can also see his full profile in the **Hero section** at the top of this portfolio.`;

  // Greetings
  if (match(q, 'hello', 'hi', 'hey', 'helo', 'hii', 'namaste', 'salam', 'sup', 'good morning', 'good evening'))
    return `Hi there! 👋 I'm **Altaf's AI assistant**.\n\nI can answer questions about his skills, projects, contact info, availability, and more. What would you like to know?`;

  // Name / full name
  if (match(q, 'name', 'who is', 'who are', 'kaun', 'naam', 'full name'))
    return `His full name is **${KB.fullName}**. He is a ${KB.title} — a 2026 B.Tech CSE graduate actively looking for full-time opportunities.`;

  // Age / DOB
  if (match(q, 'age', 'old', 'born', 'dob', 'birthday', 'date of birth', 'kitne saal', 'umar', 'janam', 'birth'))
    return `🎂 Altaf is **${KB.age}**.\nDate of Birth: **${KB.dob}**`;

  // Gender
  if (match(q, 'gender', 'male', 'female', 'ladka', 'ladki', 'boy', 'girl'))
    return `Altaf is **Male**.`;

  // Nationality
  if (match(q, 'nationality', 'country', 'citizen', 'indian', 'india', 'desh'))
    return `🇮🇳 Altaf is **Indian**. He is based in **${KB.location}**.`;

  // Languages spoken
  if (match(q, 'language', 'speak', 'bol', 'spoken', 'communication', 'boli'))
    return `🗣️ Altaf speaks **${KB.languages}** fluently — comfortable in both professional and casual communication in either language.`;

  // Passout year / graduation year / batch
  if (match(q, 'passout', 'pass out', 'batch', 'graduated', 'graduation year', 'passing year', 'year of passing', 'konse year'))
    return `🎓 Altaf's **passout year is ${KB.passoutYear}**.\n\nHe completed his **B.Tech in Computer Science & Engineering** from **Gurugram University** in **${KB.passoutYear}**.`;

  // Degree / qualification
  if (match(q, 'degree', 'qualification', 'b.tech', 'btech', 'bachelor', 'engineering'))
    return `🎓 Altaf holds a **${KB.degree}** in **${KB.branch}** (Specialization: ${KB.specialization}) from Gurugram University — graduated **${KB.passoutYear}**.`;

  // Branch / subject / field of study
  if (match(q, 'branch', 'cse', 'computer science', 'field', 'stream', 'subject', 'major'))
    return `💻 Altaf's branch is **${KB.branch}** with a specialization in **${KB.specialization}**.\n\nHe studied at **Mewat Engineering College** (Nuh, Haryana), affiliated to **Gurugram University**.`;

  // College name
  if (match(q, 'college', 'mecw', 'mewat', 'institute', 'school', 'institution'))
    return `🏫 Altaf's college is **Mewat Engineering College (MECW)**, Nuh, Haryana.\n${KB.college}\n\nOfficial website: https://www.mecw.ac.in/`;

  // University name
  if (match(q, 'university', 'gurugram university', 'varsity', 'affiliat'))
    return `🏛️ Altaf's university is **Gurugram University**, Gurugram, Haryana.\n${KB.university}\n\nOfficial website: https://gurugramuniversity.ac.in/`;

  // Phone / mobile / contact number
  if (match(q, 'phone', 'mobile', 'number', 'call', 'contact number', 'mob', 'phon', 'no.'))
    return `📞 Altaf's phone number is **${KB.phone}**.\n\nYou can click the phone number in the Contact section of this portfolio to open your dialer directly.`;

  // WhatsApp
  if (match(q, 'whatsapp', 'whats app', 'wa', 'chat'))
    return `💬 Altaf is available on **WhatsApp** at **${KB.whatsapp}** — same as his phone number. Feel free to message him!`;

  // Email
  if (match(q, 'email', 'mail', 'gmail', 'ईमेल'))
    return `📧 Altaf's email address is **${KB.email}**.\n\nYou can also use the contact form on this portfolio page to reach him directly.`;

  // Location / city
  if (match(q, 'location', 'city', 'address', 'where', 'place', 'kahan', 'live', 'located', 'state', 'gurgaon', 'gurugram', 'haryana'))
    return `📍 Altaf is based in **${KB.location}**.\n\nClick the location in the Contact section to open Google Maps.`;

  // Contact (all channels)
  if (match(q, 'contact', 'reach', 'touch', 'connect', 'sampark'))
    return `📬 **All contact details:**\n\n📞 Phone: **${KB.phone}**\n💬 WhatsApp: **${KB.whatsapp}**\n📧 Email: **${KB.email}**\n📍 Location: ${KB.location}\n🔗 LinkedIn: ${KB.linkedin}\n💻 GitHub: ${KB.github}`;

  // GitHub
  if (match(q, 'github', 'git hub', 'repository', 'repo'))
    return `💻 GitHub: **${KB.github}**\n\nPublic repositories: **RealityML** and **Nova AI**`;

  // Git (version control)
  if (match(q, 'git ', 'version control', 'branching', 'commit'))
    return `🔀 Altaf uses **Git** for version control — branching, merging, commits, and code history. Hosted on GitHub: ${KB.github}`;

  // LinkedIn
  if (match(q, 'linkedin', 'linked in', 'profile'))
    return `🔗 LinkedIn: **${KB.linkedin}**`;

  // Portfolio
  if (match(q, 'portfolio', 'website', 'site', 'this site', 'link'))
    return `🌐 You are currently viewing Altaf's **official portfolio website**!\n\nIt showcases his projects, certifications, education, skills, and contact information.`;

  // Education / B.Tech / college / university combined
  if (match(q, 'education', 'study', 'padhai', 'padha', 'academic'))
    return `🎓 **${KB.education}**\n\n🏫 College: Mewat Engineering College (MECW), Nuh, Haryana\n🏛️ University: Gurugram University, Gurugram\n📅 Passout Year: **${KB.passoutYear}**\n\nKey coursework: Machine Learning, Data Mining & Warehousing, Linear Algebra, Probability & Statistics, DBMS, Data Structures.`;

  // Skills (general)
  if (match(q, 'skill', 'technology', 'tech', 'stack', 'tool', 'kya aata', 'what do you know', 'expertise'))
    return `🛠️ **Altaf's full skill set:**\n\n${KB.skills}\n\nPrimary language: **Python** | Analytics: **SQL, Pandas, Power BI**`;

  // Python
  if (match(q, 'python'))
    return `🐍 **Python** is Altaf's primary language.\n\n• Data analysis & cleaning\n• EDA (Exploratory Data Analysis)\n• Machine learning model building\n• Scripting & automation\n• Backend development (FastAPI)`;

  // SQL
  if (match(q, 'sql', 'database', 'query', 'queries', 'dbms', 'joins', 'aggregat'))
    return `🗃️ Altaf is proficient in **SQL** — complex queries, multi-table joins, aggregations, subqueries, GROUP BY, and relational database analytics.`;

  // Pandas
  if (match(q, 'pandas', 'dataframe', 'data frame'))
    return `🐼 **Pandas** — DataFrame manipulation, grouping, merging, data cleaning, CSV/Excel file handling.`;

  // NumPy
  if (match(q, 'numpy', 'num py', 'array', 'vector'))
    return `🔢 **NumPy** — vectorized math, array operations, numerical transformations for data science.`;

  // Matplotlib / visualization
  if (match(q, 'matplotlib', 'plot', 'chart', 'graph', 'seaborn', 'visual'))
    return `📈 **Matplotlib** — line plots, bar charts, histograms, scatter plots, custom chart styling for analysis reports.`;

  // Power BI / Excel
  if (match(q, 'power bi', 'powerbi', 'excel', 'dashboard', 'pivot', 'business intelligence'))
    return `📊 **Power BI** — interactive dashboards, DAX, data modeling\n**Excel** — pivot tables, VLOOKUP, data validation, reporting`;

  // Scikit-learn
  if (match(q, 'scikit', 'sklearn', 'classifier', 'regression', 'classification'))
    return `🤖 **Scikit-learn** — classification & regression models, cross-validation, hyperparameter tuning, model evaluation (Accuracy, F1, Precision, Recall, Confusion Matrix).`;

  // EDA
  if (match(q, 'eda', 'exploratory', 'exploration', 'data exploration'))
    return `🔍 **EDA** is one of Altaf's core strengths — finding patterns, detecting outliers, distributions, correlations, and insights using Python (Pandas + Matplotlib).`;

  // Data Cleaning
  if (match(q, 'data clean', 'cleaning', 'missing', 'imputation', 'null', 'outlier', 'preprocessing'))
    return `🧹 **Data Cleaning** — missing values, outlier treatment, encoding, feature scaling, removing duplicates.`;

  // Feature Engineering
  if (match(q, 'feature engineering', 'feature selection', 'feature extraction'))
    return `⚙️ **Feature Engineering** — selecting, transforming, and creating new features to improve ML model performance.`;

  // Streamlit
  if (match(q, 'streamlit', 'dashboard app', 'web app'))
    return `🎛️ **Streamlit** — Altaf used it to build an interactive ML feasibility dashboard for RealityML.`;

  // Jupyter Notebook
  if (match(q, 'jupyter', 'notebook', 'ipynb'))
    return `📓 **Jupyter Notebook** — used for interactive data analysis, inline visualizations, and step-by-step Python documentation.`;

  // Machine learning / AI (general)
  if (match(q, 'machine learning', ' ml ', 'artificial intelligence', 'model', 'deep learning'))
    return `🧠 Altaf's **Machine Learning** skills:\n\n• Scikit-learn (classification & regression)\n• Data Cleaning & Feature Engineering\n• Model Evaluation (Accuracy, F1, Precision, Recall)\n• EDA\n\nProjects: **RealityML** & **Nova AI**`;

  // Projects (general)
  if (match(q, 'project', 'build', 'made', 'created', 'banaya', 'kitne project', 'how many project'))
    return `🚀 **Altaf's projects (2 public):**\n\n1. **${KB.projects[0].name}**\n${KB.projects[0].desc}\n*Tech: ${KB.projects[0].tech}*\n\n2. **${KB.projects[1].name}**\n${KB.projects[1].desc}\n*Tech: ${KB.projects[1].tech}*\n\nGitHub: ${KB.github}`;

  // RealityML
  if (match(q, 'realityml', 'reality ml', 'reality', 'feasibility'))
    return `🤖 **RealityML – AI Feasibility Suite**\n\n${KB.projects[0].desc}\n\n**Tech:** ${KB.projects[0].tech}\n**GitHub:** ${KB.projects[0].url}`;

  // Nova AI
  if (match(q, 'nova', 'nova ai', 'gemini', 'gemini api'))
    return `✨ **Nova AI**\n\n${KB.projects[1].desc}\n\n**Tech:** ${KB.projects[1].tech}\n**GitHub:** ${KB.projects[1].url}`;

  // Certifications
  if (match(q, 'certificate', 'certification', 'course', 'nptel', 'cisco', 'certified', 'credential'))
    return `🏆 **Altaf's Certifications (4):**\n\n${KB.certifications.map((c, i) => `${i + 1}. ${c}`).join('\n')}\n\nDownload available in the Certifications section of this portfolio.`;

  // Experience / fresher
  if (match(q, 'experience', 'work experience', 'internship', 'worked', 'job history', 'fresher'))
    return `💼 Altaf is a **fresher** — no prior full-time work experience.\n\nSkills built through:\n• Academic projects (B.Tech)\n• Self-learning & practice\n• 4 industry certifications (NPTEL & Cisco)\n\n${KB.status}`;

  // Hobbies
  if (match(q, 'hobby', 'hobbies', 'interest', 'free time', 'passion', 'like to do', 'leisure', 'fun', 'pastime'))
    return `🎯 Altaf's hobbies:\n\n🎬 **Watching Cinema** — movies & web series fan\n🎵 **Listening to Music** — keeps him focused\n📊 **Exploring Datasets** — real-world data for fun\n🤖 **Following AI Trends** — stays updated on data science & AI`;

  // Salary
  if (match(q, 'salary', 'ctc', 'pay', 'package', 'compensation', 'expect', 'stipend', 'kitna', 'paisa'))
    return `💰 Salary expectation: **~₹20,000/month**\n\nOpen to discussion based on role, company, and growth opportunities.`;

  // Work mode
  if (match(q, 'remote', 'onsite', 'work from home', 'wfh', 'hybrid', 'office', 'work mode', 'flexible'))
    return `🌐 Altaf is **open to both remote and on-site roles** — no preference, fully flexible.\n\n${KB.workMode}`;

  // Job / hire / availability
  if (match(q, 'hire', 'available', 'availability', 'looking', 'full-time', 'fulltime', 'role', 'position', 'naukri', 'kaam', 'job', 'opportunity', 'recruit', 'onboard'))
    return `🟢 **${KB.status}**\n\nCan join immediately.\n💰 Salary: ~₹20,000/month\n🌐 Work mode: Remote or On-site\n📞 ${KB.phone}\n📧 ${KB.email}`;

  // Freelance
  if (match(q, 'freelance', 'freelancer', 'contract', 'part time', 'part-time', 'gig'))
    return `Altaf is primarily looking for **full-time employment**. Open to discussing freelance/contract work based on scope.\n\n📧 ${KB.email} | 📞 ${KB.phone}`;

  // Resume / CV
  if (match(q, 'resume', 'cv', 'download', 'pdf'))
    return `📄 Click the **"Download Resume"** button in the **Hero section** at the top of this portfolio to download Altaf's resume.`;

  // About / summary
  if (match(q, 'about', 'tell me', 'introduce', 'summary', 'bio', 'background', 'batao', 'describe'))
    return `👨‍💻 **About Altaf Khan:**\n\n[PHOTO:${KB.photo}]\n\n**Age:** 23 years | **DOB:** 6th July 2003\n**Degree:** B.Tech CSE | **Passout:** 2026\n**College:** Mewat Engineering College\n**University:** Gurugram University\n\n${KB.status}\n\n📞 ${KB.phone} | 📧 ${KB.email}`;

  // Thanks / goodbye
  if (match(q, 'thank', 'thanks', 'bye', 'goodbye', 'shukriya', 'dhanyawad', 'ok thanks', 'got it'))
    return `You're welcome! 😊 Feel free to come back anytime.\n\n📞 **${KB.phone}**\n📧 **${KB.email}**`;

  // Default fallback
  return `I didn't quite catch that — but here's what I can help with:\n\n• 📸 Photo, 📞 Phone, 💬 WhatsApp, 📧 Email\n• 👤 Name, Age, DOB, Gender, Nationality\n• 🎓 College, University, Branch, Passout Year\n• 🛠️ Skills (Python, SQL, Pandas, Power BI…)\n• 🚀 Projects | 🏆 Certifications\n• 💼 Job status, Salary, Work mode\n• 🎯 Hobbies | 🔗 GitHub & LinkedIn\n\nTry: *"Show me his photo"* or *"What is his passout year?"*`;

  // Greetings
  if (match(q, 'hello', 'hi', 'hey', 'helo', 'hii', 'namaste', 'salam', 'sup', 'good morning', 'good evening'))
    return `Hi there! 👋 I'm **Altaf's AI assistant**.\n\nI can answer questions about his skills, projects, contact info, availability, and more. What would you like to know?`;

  // Name
  if (match(q, 'name', 'who is', 'who are', 'kaun', 'naam'))
    return `His name is **${KB.name}**. He is a ${KB.title} — a 2026 B.Tech CSE graduate actively looking for full-time opportunities.`;

  // Age / DOB
  if (match(q, 'age', 'old', 'born', 'dob', 'birthday', 'date of birth', 'kitne saal', 'umar'))
    return `🎂 Altaf is **${KB.age}**.\n\nDate of Birth: **${KB.dob}**`;

  // Languages spoken
  if (match(q, 'language', 'speak', 'bol', 'spoken', 'communication', 'boli', 'english', 'hindi'))
    return `🗣️ Altaf speaks **${KB.languages}** fluently — comfortable in both professional and casual communication in either language.`;

  // Phone / mobile / contact number
  if (match(q, 'phone', 'mobile', 'number', 'call', 'contact number', 'mob', 'phon', 'no.'))
    return `📞 Altaf's phone number is **${KB.phone}**.\n\nYou can also click the phone number in the Contact section of this portfolio to open your dialer directly.`;

  // WhatsApp
  if (match(q, 'whatsapp', 'whats app', 'wa', 'chat'))
    return `💬 Altaf is available on **WhatsApp** at **${KB.whatsapp}** — same as his phone number.\n\nFeel free to message him directly!`;

  // Email
  if (match(q, 'email', 'mail', 'gmail', 'ईमेल'))
    return `📧 Altaf's email address is **${KB.email}**.\n\nYou can also use the contact form on this portfolio page to send him a message directly.`;

  // Location / address / city
  if (match(q, 'location', 'city', 'address', 'where', 'place', 'kahan', 'live', 'located', 'state', 'gurgaon', 'gurugram', 'haryana'))
    return `📍 Altaf is based in **${KB.location}**.\n\nClick the location in the Contact section to open it directly in Google Maps.`;

  // Contact (general)
  if (match(q, 'contact', 'reach', 'touch', 'connect', 'sampark'))
    return `📬 Here are all the ways to contact Altaf:\n\n📞 Phone: **${KB.phone}**\n💬 WhatsApp: **${KB.whatsapp}**\n📧 Email: **${KB.email}**\n🔗 LinkedIn: ${KB.linkedin}\n💻 GitHub: ${KB.github}`;

  // GitHub
  if (match(q, 'github', 'git hub', 'repository', 'repo'))
    return `💻 Altaf's GitHub profile:\n**${KB.github}**\n\nHe has public repositories including **RealityML** and **Nova AI**.`;

  // Git (version control)
  if (match(q, 'git ', 'version control', 'branching', 'commit'))
    return `🔀 Altaf uses **Git** for version control — branching, merging, committing, and managing code history. His code is hosted on **GitHub** at ${KB.github}.`;

  // LinkedIn
  if (match(q, 'linkedin', 'linked in', 'profile'))
    return `🔗 Connect with Altaf on LinkedIn:\n**${KB.linkedin}**`;

  // Education / degree / college / university
  if (match(q, 'education', 'degree', 'college', 'university', 'study', 'graduation', 'btech', 'b.tech', 'padhai', 'padha', 'gurugram university'))
    return `🎓 **${KB.education}**\n\nKey coursework: Machine Learning, Data Mining & Warehousing, Linear Algebra, Probability & Statistics, DBMS, and Data Structures.`;

  // Skills / tech stack / tools (general)
  if (match(q, 'skill', 'technology', 'tech', 'stack', 'tool', 'kya aata', 'kya aataa', 'what do you know', 'expertise'))
    return `🛠️ **Altaf's full skill set:**\n\n${KB.skills}\n\nHis primary language is **Python**, and he works extensively with **SQL** and the Python data science ecosystem.`;

  // Python
  if (match(q, 'python'))
    return `🐍 **Python** is Altaf's primary programming language.\n\nHe uses it for:\n• Data analysis & cleaning\n• Exploratory Data Analysis (EDA)\n• Machine learning model building\n• Scripting and automation\n• Backend development (FastAPI)`;

  // SQL / database
  if (match(q, 'sql', 'database', 'query', 'queries', 'dbms', 'joins', 'aggregat'))
    return `🗃️ Altaf is proficient in **SQL** — writing complex queries, multi-table joins, aggregations, subqueries, GROUP BY, and relational database concepts used in analytics.`;

  // Pandas
  if (match(q, 'pandas', 'dataframe', 'data frame'))
    return `🐼 Altaf uses **Pandas** extensively for:\n• DataFrame manipulation\n• Grouping, merging & reshaping data\n• Data cleaning and transformation\n• Working with CSV, Excel files`;

  // NumPy
  if (match(q, 'numpy', 'num py', 'array', 'vector'))
    return `🔢 **NumPy** is part of Altaf's data science toolkit — used for vectorized mathematical computations, array operations, and numerical transformations during analysis.`;

  // Matplotlib / visualization
  if (match(q, 'matplotlib', 'plot', 'chart', 'graph', 'seaborn', 'visual'))
    return `📈 Altaf uses **Matplotlib** for creating data visualizations — line plots, bar charts, histograms, scatter plots, multi-panel subplots, and custom chart styling for reports.`;

  // Power BI / Excel / dashboard
  if (match(q, 'power bi', 'powerbi', 'excel', 'dashboard', 'pivot', 'bi tool', 'business intelligence'))
    return `📊 Altaf works with:\n• **Power BI** — interactive dashboards, DAX measures, data modeling\n• **Excel** — pivot tables, VLOOKUP, data validation, summary reporting\n\nBoth are used for business reporting and decision-making analytics.`;

  // Scikit-learn / ML models
  if (match(q, 'scikit', 'sklearn', 'classifier', 'regression', 'classification'))
    return `🤖 Altaf uses **Scikit-learn** to build and evaluate machine learning models:\n• Classification & regression algorithms\n• Cross-validation & hyperparameter tuning\n• Model Evaluation: Accuracy, Precision, Recall, F1-score, Confusion Matrix`;

  // EDA
  if (match(q, 'eda', 'exploratory', 'exploration', 'data exploration'))
    return `🔍 **Exploratory Data Analysis (EDA)** is one of Altaf's core strengths — finding patterns, detecting outliers, analyzing distributions, checking correlations, and generating insights from raw data using Python (Pandas + Matplotlib).`;

  // Data Cleaning
  if (match(q, 'data clean', 'cleaning', 'missing', 'imputation', 'null', 'outlier', 'preprocessing'))
    return `🧹 Altaf is skilled in **Data Cleaning**:\n• Handling missing values & null entries\n• Outlier detection & treatment\n• Encoding categorical variables\n• Feature scaling and normalization\n• Removing duplicates and inconsistencies`;

  // Feature Engineering
  if (match(q, 'feature engineering', 'feature selection', 'feature extraction'))
    return `⚙️ Altaf practices **Feature Engineering** — selecting, transforming, and creating new features to improve machine learning model performance.`;

  // Streamlit
  if (match(q, 'streamlit', 'dashboard app', 'web app'))
    return `🎛️ Altaf has used **Streamlit** to build an interactive dashboard for **RealityML** — his ML feasibility assessment project. Streamlit allows Python developers to create web-based data apps quickly without needing frontend skills.`;

  // Jupyter Notebook
  if (match(q, 'jupyter', 'notebook', 'ipynb'))
    return `📓 Altaf regularly uses **Jupyter Notebook** for interactive data analysis, writing Python code with inline visualizations, and documenting analysis steps clearly.`;

  // Machine learning / ML / AI (general)
  if (match(q, 'machine learning', ' ml ', 'artificial intelligence', 'model', 'deep learning'))
    return `🧠 Altaf has a solid foundation in **Machine Learning**:\n\n• Scikit-learn for classification & regression\n• Data Cleaning, Feature Engineering\n• Model Evaluation (Accuracy, F1, Precision, Recall)\n• EDA for pattern discovery\n\nProjects: **RealityML** (ML feasibility tool) & **Nova AI** (Gemini API assistant)`;

  // Projects (general)
  if (match(q, 'project', 'build', 'made', 'created', 'banaya', 'kitne project', 'how many project'))
    return `🚀 **Altaf's key projects (2 public):**\n\n1. **${KB.projects[0].name}**\n${KB.projects[0].desc}\n*Tech: ${KB.projects[0].tech}*\n\n2. **${KB.projects[1].name}**\n${KB.projects[1].desc}\n*Tech: ${KB.projects[1].tech}*\n\nAll code is available on his GitHub: ${KB.github}`;

  // RealityML
  if (match(q, 'realityml', 'reality ml', 'reality', 'feasibility'))
    return `🤖 **RealityML – AI Feasibility Suite**\n\n${KB.projects[0].desc}\n\n**Tech Stack:** ${KB.projects[0].tech}\n**GitHub:** ${KB.projects[0].url}`;

  // Nova AI
  if (match(q, 'nova', 'nova ai', 'gemini', 'gemini api'))
    return `✨ **Nova AI**\n\n${KB.projects[1].desc}\n\n**Tech Stack:** ${KB.projects[1].tech}\n**GitHub:** ${KB.projects[1].url}`;

  // Certifications
  if (match(q, 'certificate', 'certification', 'course', 'nptel', 'cisco', 'certified', 'credential'))
    return `🏆 **Altaf's Certifications (4):**\n\n${KB.certifications.map((c, i) => `${i + 1}. ${c}`).join('\n')}\n\nAll certificates are available for download in the Certifications section of this portfolio.`;

  // Experience
  if (match(q, 'experience', 'work experience', 'internship', 'worked', 'job history', 'fresher'))
    return `💼 Altaf is a **fresher** — he has no prior full-time work experience.\n\nAll his skills come from:\n• Academic projects during B.Tech\n• Self-learning and practice\n• 4 industry certifications (NPTEL & Cisco)\n\n${KB.status}`;

  // Hobbies / Interests
  if (match(q, 'hobby', 'hobbies', 'interest', 'free time', 'passion', 'like to do', 'leisure', 'fun', 'pastime'))
    return `🎯 Outside of work, Altaf enjoys:\n\n🎬 **Watching Cinema** — a big movie & web series fan\n🎵 **Listening to Music** — helps him stay focused\n📊 **Exploring Datasets** — analyzing real-world data for fun\n🤖 **Following AI Trends** — staying up-to-date with the latest in data science & AI`;

  // Salary / CTC / expectation
  if (match(q, 'salary', 'ctc', 'pay', 'package', 'compensation', 'expect', 'stipend', 'kitna', 'paisa'))
    return `💰 Altaf's **salary expectation is approximately ₹20,000/month**.\n\nHe is open to discussion based on the role, company, and growth opportunities offered.`;

  // Work mode / remote / onsite
  if (match(q, 'remote', 'onsite', 'work from home', 'wfh', 'hybrid', 'office', 'location preference', 'work mode', 'flexible'))
    return `🌐 Altaf is **open to both remote and on-site roles** — he has no preference and is flexible based on the company's requirement.\n\n${KB.workMode}`;

  // Job / hire / availability / opportunity
  if (match(q, 'hire', 'available', 'availability', 'looking', 'full-time', 'fulltime', 'role', 'position', 'naukri', 'kaam', 'job', 'opportunity', 'recruit', 'onboard'))
    return `🟢 **${KB.status}**\n\nHe is currently free and can join immediately.\n\n💰 Salary expectation: ~₹20,000/month\n🌐 Work mode: Remote or On-site\n\n📞 ${KB.phone}\n📧 ${KB.email}`;

  // Freelance
  if (match(q, 'freelance', 'freelancer', 'contract', 'part time', 'part-time', 'gig'))
    return `Altaf is primarily looking for **full-time employment** right now. He is open to discussing freelance or contract-based opportunities depending on the scope of work.\n\nFeel free to reach out at **${KB.email}** or **${KB.phone}**.`;

  // Resume / CV
  if (match(q, 'resume', 'cv', 'download', 'pdf'))
    return `📄 You can download Altaf's resume using the **"Download Resume"** button in the Hero section at the top of this portfolio page.`;

  // About / summary / introduction
  if (match(q, 'about', 'tell me', 'introduce', 'summary', 'bio', 'background', 'batao', 'describe'))
    return `👨‍💻 **About Altaf Khan:**\n\nAltaf is a **23-year-old** 2026 B.Tech CSE graduate from Gurugram University, specializing in Data Science & Machine Learning.\n\nHe is skilled in Python, SQL, Pandas, NumPy, Scikit-learn, Power BI, and more. He has built 2 public projects and holds 4 certifications from NPTEL and Cisco.\n\n${KB.status}\n\n📞 ${KB.phone} | 📧 ${KB.email}`;

  // Thanks / goodbye
  if (match(q, 'thank', 'thanks', 'bye', 'goodbye', 'shukriya', 'dhanyawad', 'ok thanks', 'got it'))
    return `You're welcome! 😊 Feel free to come back anytime with more questions.\n\nYou can reach Altaf directly at:\n📞 **${KB.phone}**\n📧 **${KB.email}**`;

  // Default fallback
  return `I didn't quite catch that — but here's what I can help with:\n\n• 📞 Phone, WhatsApp, Email, Location\n• 👤 Name, Age, Languages spoken\n• 🛠️ Skills (Python, SQL, Pandas, Power BI…)\n• 🚀 Projects (RealityML, Nova AI)\n• 🎓 Education & Certifications\n• 💼 Job availability, salary & work mode\n• 🎯 Hobbies & interests\n• 🔗 GitHub & LinkedIn\n\nTry: *"What is the phone number?"* or *"Tell me about his projects"*`;
}

// ─── Suggested quick questions ─────────────────────────────────────────────────
const SUGGESTIONS = [
  'Show me his photo',
  'What is the phone number?',
  'What are his skills?',
  'What is his passout year?',
  'Is he available for hire?',
  'Tell me about RealityML',
  'What is his age?',
  'Salary expectation?',
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
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {/* Tooltip hint */}
        <AnimatePresence>
          {!open && pulse && (
            <motion.div
              initial={{ opacity: 0, x: 10, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.9 }}
              transition={{ delay: 1.5 }}
              className="bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-[11px] font-medium px-3 py-1.5 rounded-full shadow-lg whitespace-nowrap pointer-events-none"
            >
              Ask AI about Altaf ✨
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setOpen(o => !o)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          aria-label={open ? 'Close AI assistant' : 'Open AI assistant'}
          className="relative w-14 h-14 rounded-full shadow-2xl flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
          style={{
            background: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 50%, #2563eb 100%)',
          }}
        >
          {/* Pulse ring */}
          {pulse && (
            <span className="absolute inset-0 rounded-full animate-ping bg-violet-400 opacity-30" />
          )}

          <AnimatePresence mode="wait">
            {open ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-6 h-6 text-white" />
              </motion.span>
            ) : (
              <motion.span
                key="ai"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center"
              >
                {/* Premium AI Orb Logo */}
                <svg viewBox="0 0 32 32" width="30" height="30" fill="none">
                  {/* Outer orbit ring spinning */}
                  <motion.ellipse
                    cx="16" cy="16" rx="13" ry="5"
                    stroke="white" strokeWidth="1" opacity="0.35"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                    style={{ transformOrigin: '16px 16px' }}
                  />
                  {/* Middle orbit ring counter-spin, tilted */}
                  <motion.ellipse
                    cx="16" cy="16" rx="10" ry="4"
                    stroke="white" strokeWidth="1" opacity="0.45"
                    transform="rotate(60 16 16)"
                    animate={{ rotate: [60, 420] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
                    style={{ transformOrigin: '16px 16px' }}
                  />
                  {/* Inner orbit ring */}
                  <motion.ellipse
                    cx="16" cy="16" rx="7" ry="3"
                    stroke="white" strokeWidth="1" opacity="0.55"
                    transform="rotate(-45 16 16)"
                    animate={{ rotate: [-45, 315] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
                    style={{ transformOrigin: '16px 16px' }}
                  />
                  {/* Glowing core */}
                  <circle cx="16" cy="16" r="4" fill="white" opacity="0.95" />
                  <circle cx="16" cy="16" r="2.2" fill="white" opacity="1" />
                  {/* Orbiting node dots */}
                  <motion.circle
                    cx="29" cy="16" r="1.5" fill="white" opacity="0.9"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                    style={{ transformOrigin: '16px 16px' }}
                  />
                  <motion.circle
                    cx="16" cy="3" r="1.2" fill="white" opacity="0.7"
                    animate={{ rotate: [60, 420] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
                    style={{ transformOrigin: '16px 16px' }}
                  />
                  <motion.circle
                    cx="6" cy="19" r="1" fill="white" opacity="0.6"
                    animate={{ rotate: [-45, 315] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
                    style={{ transformOrigin: '16px 16px' }}
                  />
                </svg>
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* ── Chat Panel ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="chatpanel"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 flex flex-col rounded-2xl overflow-hidden shadow-2xl border border-neutral-200 dark:border-neutral-800"
            style={{ maxHeight: '520px' }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3 flex-shrink-0"
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
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-white dark:bg-neutral-950" style={{ minHeight: 0 }}>
              {messages.map(msg => <Bubble key={msg.id} msg={msg} />)}
              {typing && <TypingDots />}
              <div ref={bottomRef} />
            </div>

            {/* Suggestions row */}
            <div className="px-3 py-2 flex gap-1.5 overflow-x-auto flex-shrink-0 bg-white dark:bg-neutral-950 border-t border-neutral-100 dark:border-neutral-800/80">
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
                placeholder="Ask anything about Altaf…"
                className="flex-1 px-3 py-2 rounded-xl text-xs bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
              />
              <motion.button
                type="submit"
                disabled={!input.trim() || typing}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-8 h-8 flex-shrink-0 rounded-xl flex items-center justify-center text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                style={{
                  background: 'linear-gradient(135deg, #7c3aed, #2563eb)',
                }}
              >
                <Send className="w-3.5 h-3.5" />
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatbot;
