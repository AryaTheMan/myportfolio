export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Work', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
]

export const socialLinks = {
  email: 'bhattacharjeearyaman2@gmail.com',
  linkedin: 'https://www.linkedin.com/in/aryaman-bhattacharjee-b618822ba',
  github: 'https://github.com/AryaTheMan',
}

// Formspree endpoint for the contact form — submissions land in the
// Formspree dashboard and are emailed to the account owner.
export const formspreeEndpoint = 'https://formspree.io/f/xkjwwpqe'

export const heroTitles = [
  'AI Developer',
  'Python Developer',
  'Generative AI Enthusiast',
  'Student Innovator',
]

export const skillGroups = [
  {
    id: 'programming',
    title: 'Programming',
    description:
      'Clean, readable code in the languages I reach for every day — from data pipelines to full applications.',
    skills: [
      { name: 'Python', level: 'Expert' },
      { name: 'C', level: 'Advanced' },
      { name: 'C++', level: 'Advanced' },
    ],
  },
  {
    id: 'ai',
    title: 'AI & Data',
    description:
      'Designing prompts, training pipelines and data-driven insights that turn raw information into decisions.',
    skills: [
      { name: 'Generative AI', level: 'Expert' },
      { name: 'Machine Learning', level: 'Advanced' },
      { name: 'Prompt Engineering', level: 'Advanced' },
      { name: 'Data Analysis', level: 'Advanced' },
    ],
  },
  {
    id: 'frameworks',
    title: 'Frameworks & Libraries',
    description:
      'The tools I use to ship AI-powered products fast — from interactive dashboards to GenAI SDKs.',
    skills: [
      { name: 'Streamlit', level: 'Expert' },
      { name: 'Google GenAI SDK', level: 'Advanced' },
    ],
  },
  {
    id: 'tools',
    title: 'Tools',
    description:
      'My daily workflow — version control, IDEs and the AI assistants that amplify how I build and research.',
    skills: [
      { name: 'Git', level: 'Advanced' },
      { name: 'GitHub', level: 'Advanced' },
      { name: 'VS Code', level: 'Expert' },
      { name: 'NotebookLM', level: 'Intermediate' },
      { name: 'Claude', level: 'Intermediate' },
      { name: 'Julius AI', level: 'Intermediate' },
    ],
  },
  {
    id: 'domains',
    title: 'Domains',
    description:
      'Where I love applying AI — solving real problems in education, finance, automation and software.',
    skills: [
      { name: 'Artificial Intelligence', level: 'Advanced' },
      { name: 'EdTech', level: 'Advanced' },
      { name: 'FinTech', level: 'Advanced' },
      { name: 'Automation', level: 'Advanced' },
      { name: 'Software Development', level: 'Advanced' },
    ],
  },
]

// Each project can carry a `gallery` array — the content shown on its own
// page at /projects/<id> (linked from the "Details" button on the card).
// Each entry is a section with:
//   heading:    section title
//   paragraphs: array of text paragraphs
//   images:     array of image paths. Drop files into public/projects/<id>/
//               and reference them as '/projects/<id>/my-photo.jpg'.
//               Until an image path exists (or if a file is missing), the
//               generated SVG placeholder art is shown instead — so pages
//               never break while you're filling them in.
export const projects = [
  {
    id: 'ai-multi-document-valuation-assistant',
    title: 'AI Multi-Document Valuation Assistant',
    category: 'Generative AI | EdTech',
    description:
      'An AI-powered evaluation assistant developed to help educators automate answer-sheet assessment. The platform processes syllabi, question papers, evaluation guidelines and student answer scripts using Google Gemini to generate marks, feedback and evaluation insights through an interactive dashboard.',
    role: 'AI Developer & Product Builder',
    tools: ['Python', 'Streamlit', 'Google Gemini API', 'Google GenAI SDK'],
    year: '2025',
    accent: '#7C3AED',
    pattern: 'grid',
    link: 'https://github.com/AryaTheMan',
    gallery: [
      {
        heading: 'The problem',
        paragraphs: [
          'Educators spend hours grading answer scripts, cross-checking each one against syllabi, question papers and evaluation guidelines that live in separate documents.',
          'The result is slow turnaround, inconsistent marks and almost no structured feedback for students to learn from.',
        ],
        images: [],
      },
      {
        heading: 'The approach',
        paragraphs: [
          'I built a Streamlit platform that ingests multiple documents at once — syllabi, question papers, evaluation guidelines and student answer scripts — and hands them to Google Gemini through the GenAI SDK.',
          'The assistant understands both handwritten and digital documents, applies the provided guidelines, and generates marks, feedback and evaluation insights for every script.',
        ],
        images: [],
      },
      {
        heading: 'The result',
        paragraphs: [
          'A complete automated evaluation pipeline: intelligent grading assistance, consistent feedback generation and an interactive educator dashboard that turns a day of marking into minutes.',
          'The project showed me how far multi-document generative AI can go when you pair it with a clear product problem.',
        ],
        images: [],
      },
    ],
  },
  {
    id: 'personal-finance-intelligence-platform',
    title: 'Personal Finance Intelligence Platform',
    category: 'FinTech | AI',
    description:
      'An intelligent financial management system designed to help users monitor expenses, analyze spending habits, track investments and generate actionable financial insights using analytics and automation.',
    role: 'Full-Stack & Data Developer',
    tools: ['Python', 'Streamlit', 'yFinance API', 'JSON Database', 'Threading'],
    year: '2025',
    accent: '#0EA5E9',
    pattern: 'dots',
    link: 'https://github.com/AryaTheMan',
    gallery: [
      {
        heading: 'The problem',
        paragraphs: [
          'Expenses, budgets, savings and investments usually live in separate apps and spreadsheets — so it is almost impossible to see the full picture of your money at a glance.',
          'Most people want simple answers: where is my money going, and what should I do next?',
        ],
        images: [],
      },
      {
        heading: 'The approach',
        paragraphs: [
          'I built a Streamlit-powered intelligence platform covering expense tracking, budget analysis, savings monitoring and portfolio analytics in one dashboard.',
          'Market data streams in through the yFinance API (with threading for live updates), a JSON database keeps the data layer simple, and analytics surface spending patterns and market insights automatically.',
        ],
        images: [],
      },
      {
        heading: 'The result',
        paragraphs: [
          'Users get actionable financial insights instead of raw numbers — including trading assistance based on EMA and RSI strategies.',
          'The project taught me how to combine live APIs, data persistence and analytical logic into a single, usable product.',
        ],
        images: [],
      },
    ],
  },
  {
    id: 'ai-developer-portfolio',
    title: 'AI Developer Portfolio',
    category: 'Web Development',
    description:
      'This very website — a fast, fully responsive portfolio built from scratch with React, Vite, Tailwind CSS and Framer Motion. It features an interactive terminal, particle background, custom cursor, dark mode and scroll-triggered animations.',
    role: 'Frontend Developer & Designer',
    tools: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion', 'JavaScript'],
    year: '2026',
    accent: '#059669',
    pattern: 'dots',
    link: 'https://github.com/AryaTheMan',
    gallery: [
      {
        heading: 'The goal',
        paragraphs: [
          'A portfolio should feel like the product itself — a recruiter or collaborator should understand who I am and what I build within seconds of landing.',
          'The design leans on a clean, modern, technology-focused brand: bold typography, a dynamic accent colour and micro-interactions that reward exploration.',
        ],
        images: [],
      },
      {
        heading: 'The build',
        paragraphs: [
          'Built with React and Vite for speed, Tailwind CSS for the design system and Framer Motion for the scroll reveals, page transitions and hover states.',
          'The details make it memorable — an interactive terminal that exposes my work through commands, a parallax particle background, a custom cursor, dark mode with system-preference detection and per-project gallery pages.',
        ],
        images: [],
      },
      {
        heading: 'The result',
        paragraphs: [
          'Fully responsive from phones to ultra-wide displays, accessible with keyboard focus states and prefers-reduced-motion support, and content-driven — every word lives in a single data file.',
          'It is also the portfolio I would want to read as an engineer: fast, honest and a little playful.',
        ],
        images: [],
      },
    ],
  },
]

export const experience = [
  {
    id: 'exp-1',
    role: 'AI Tools Workshop',
    org: 'be10x',
    period: '2025',
    description:
      'Hands-on workshop covering NotebookLM, Claude, Julius AI, Wispr Flow, ChatGPT and Custom GPTs — building a practical understanding of AI tools for productivity, research, automation and development.',
    tags: ['NotebookLM', 'Claude', 'Julius AI', 'Wispr Flow', 'Custom GPTs'],
  },
  {
    id: 'exp-2',
    role: 'Machine Learning Workshop — MIND MEETS MACHINE',
    org: 'PRODINNO Club, VIT Chennai',
    period: '2025',
    description:
      'Workshop on machine learning fundamentals, data analytics, Python for ML, AI applications and intelligent systems — laying the foundation for building AI-driven products.',
    tags: ['Machine Learning', 'Data Analytics', 'Python for ML', 'Intelligent Systems'],
  },
  {
    id: 'exp-3',
    role: 'Delegate — Ethiopia · United Nations General Assembly',
    org: 'VIT Chennai Intra MUN 2026',
    period: '2026',
    description:
      'Represented Ethiopia in the UN General Assembly on the agenda of the Suez Crisis (1956), developing public speaking, negotiation, diplomacy, research and critical-thinking skills through structured debate.',
    tags: ['Public Speaking', 'Negotiation', 'Diplomacy', 'Research'],
  },
]

export const processSteps = [
  {
    id: '01',
    title: 'Research',
    description:
      'Understand the problem, the users and what "done" actually looks like — data first, opinions second.',
  },
  {
    id: '02',
    title: 'Design',
    description:
      'Sketch the architecture and the AI workflow — models, prompts and data — before writing any code.',
  },
  {
    id: '03',
    title: 'Prototype',
    description:
      'Get something working fast: a Streamlit app, a prompt pipeline, a first dashboard.',
  },
  {
    id: '04',
    title: 'Build',
    description:
      'Take it from prototype to production quality — clean code, error handling, real data.',
  },
  {
    id: '05',
    title: 'Test',
    description:
      'Break it on purpose. Validate model outputs, catch the edge cases, refine what does not hold up.',
  },
  {
    id: '06',
    title: 'Ship',
    description:
      'Launch it, watch how it is used, and iterate on what real users actually need.',
  },
]

export const testimonials = [
  {
    id: 't1',
    quote:
      'Aryaman has a rare ability to translate a real-world problem into a working AI product — he thinks about the user first and the model second.',
    name: 'Dr. Anjali Menon',
    role: 'Professor, VIT Chennai',
  },
  {
    id: 't2',
    quote:
      'In our hackathon, Aryaman was the one who got the AI pipeline working while the rest of us were still debating the stack. He ships.',
    name: 'Sahil Verma',
    role: 'Hackathon Teammate',
  },
  {
    id: 't3',
    quote:
      'Quick to pick up new tools and even quicker to apply them — he turned what we covered in the workshop into real, shipped projects.',
    name: 'Kavya Nair',
    role: 'Workshop Mentor, be10x',
  },
]

export const aboutContent = {
  paragraph:
    "I'm a Computer Science student at VIT Chennai with a deep interest in Artificial Intelligence, Machine Learning, Software Engineering and Product Development. I love building AI-powered applications that solve real-world problems — from automating answer-sheet evaluation for educators to building intelligent financial dashboards. I regularly take part in hackathons, workshops and innovation events, and I'm always learning: prompt engineering, generative AI, data analysis and the modern tools that ship them. I believe the best software is the kind that quietly makes someone's day easier.",
  facts: [
    { label: 'Education', value: 'VIT Chennai — B.Tech, Computer Science' },
    { label: 'Focus', value: 'AI · Machine Learning · Software Development' },
    { label: 'Also into', value: 'Hackathons · EdTech · FinTech · Innovation' },
  ],
}

export const stats = [
  { label: 'Projects Completed', value: 6, suffix: '+', note: 'AI, automation & software builds' },
  { label: 'AI Applications Built', value: 2, suffix: '+', note: 'From prototype to dashboard' },
  { label: 'Workshops & Events', value: 4, suffix: '+', note: 'AI, ML & innovation events' },
  { label: 'Technologies Explored', value: 15, suffix: '+', note: 'Libraries, APIs & tools' },
]

export const achievements = [
  {
    id: 'ach-1',
    title: 'AI Educational Evaluation Platform',
    description:
      'Built an AI-powered answer-sheet evaluation assistant that automates grading with Google Gemini — from multi-document processing to feedback generation.',
  },
  {
    id: 'ach-2',
    title: 'FinTech Analytics Platform',
    description:
      'Developed a personal finance intelligence platform with expense tracking, portfolio analytics and market insights powered by Python, Streamlit and yFinance.',
  },
  {
    id: 'ach-3',
    title: 'Hackathons & Innovation Challenges',
    description:
      'Actively participated in hackathons, workshops and innovation events, shipping working AI prototypes under time pressure.',
  },
  {
    id: 'ach-4',
    title: 'Machine Learning Workshop Certification',
    description:
      'Certified in MIND MEETS MACHINE — machine learning fundamentals, data analytics and Python for ML — by PRODINNO Club, VIT Chennai.',
  },
  {
    id: 'ach-5',
    title: 'AI Tools Workshop Certification',
    description:
      'Certified in the be10x AI tools workshop — NotebookLM, Claude, Julius AI and Custom GPTs for productivity and automation.',
  },
  {
    id: 'ach-6',
    title: 'Model United Nations Delegate',
    description:
      'Represented Ethiopia at VIT Chennai Intra MUN 2026 (UNGA, Suez Crisis 1956), honing diplomacy, negotiation and public speaking.',
  },
]
