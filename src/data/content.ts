/** Single source of truth for portfolio content. See CONTENT.md for update instructions. */

export const identity = {
  displayName: 'Naghmeh (Melody) Nazar',
  shortName: 'Melody',
  eyebrow: 'M.S. in Computer Engineering · PhD Applicant for Fall 2027',
  headline: 'Machine Learning Researcher | Speech, Affective Computing & Responsible AI',
  tagline:
    'Speech Emotion Recognition · Real-Time ML · Human-Centered Systems',
  bio: `I study machine-learning methods for human-centered signals. My speech emotion recognition research explores audio preprocessing and residual neural networks, with a focus on reproducibility and the gap between acted speech and real-world use.`,
  extendedBio: `M.S. in Computer Engineering from California State University, Northridge, with several years of professional software-engineering experience. My work connects signal processing and model design with practical software engineering.`,
  location: 'Los Angeles, CA, United States',
  email: 'melodynzr@gmail.com',
  portfolio: 'https://melodynazar.com',
  linkedIn: 'https://linkedin.com/in/naghme-nazar',
  github: 'https://github.com/nzrnaghme',
} as const

/** Prefer same-domain PDF when present in public/; fallback until owner adds file. */
export const cv = {
  label: 'Research CV (PDF)',
  localPath: '/Naghmeh_Melody_Nazar_Research_CV.pdf',
  fallbackUrl:
    'https://drive.google.com/file/d/1AZorZk7XdRCiORRH4z4CcgtQUvFuO29W/view?usp=drive_link',
} as const

export function getCvHref(): string {
  return cv.localPath
}

export const education = [
  {
    degree: 'M.S. in Computer Engineering',
    school: 'California State University, Northridge',
    dates: 'August 2024 – August 2026',
    bullets: [
      'Thesis: Real-Time Speech Emotion Recognition Using Optimized Deep Residual Networks (ResNet)',
      'Areas: Speech Emotion Recognition, Affective Computing, Deep Learning, Signal Processing',
      'GPA: 3.44',
      'Presented at the 40th Annual CSU Student Research Competition',
    ],
    advisor: 'Prof. Shahnam Mirzaei',
    advisorUrl: 'https://www.ecs.csun.edu/~smirzaei/',
  },
  {
    degree: 'B.S. in Computer Engineering',
    school: 'University of Science & Technology of Mazandaran',
    dates: 'August 2016 – March 2021',
    bullets: [
      'Areas: Machine Learning, Artificial Intelligence, Signals & Systems, Data Structures, Algorithms',
    ],
  },
] as const

export const thesisCaseStudy = {
  title: 'Real-Time Speech Emotion Recognition Using Optimized Deep Residual Networks',
  status: 'Research manuscript',
  question:
    'How can residual neural networks classify emotional states from speech, and how should their performance be evaluated across speakers and datasets?',
  data: {
    summary:
      'RAVDESS and TESS speech loaded at 16 kHz and represented as 128 × 128 log-Mel spectrograms. The current label mapping groups RAVDESS calm recordings with neutral.',
  },
  model: '2D ResNet-inspired CNN with four output labels: neutral, happy, sad, and angry.',
  training:
    'Adam optimization with dropout and residual connections. Evaluation and reproducibility checks are ongoing.',
  evaluation: 'Speaker-independent data partitions and a separate held-out test remain to be established. Performance figures are omitted pending verification of the evaluation protocol and results.',
  errorAnalysis: [
    'Happy / Neutral confusion patterns',
    'Speaker variability across the corpus',
    'Cross-corpus distribution shift',
  ],
  prototype:
    'Research prototype for speech emotion classification. Desktop inference and latency profiling are future validation tasks.',
  limitations: [
    'Acted speech datasets (RAVDESS, TESS)',
    'Cross-corpus distribution shift',
    'Speaker-independent and held-out evaluation not yet established',
    'Latency and real-world generalization not yet established',
    'No clinical validation',
    'No claim of generalization to naturalistic or healthcare settings',
  ],
  nextSteps: [
    { label: 'Calibrated evaluation on more naturalistic corpora', status: 'Planned' as const },
    { label: 'Subgroup and speaker-aware analysis', status: 'Planned' as const },
    { label: 'Multimodal sensing extensions', status: 'Future work' as const },
    { label: 'Model compression and profiling', status: 'Future work' as const },
    { label: 'Possible FPGA/SoC mapping', status: 'Future work' as const },
  ],
  figureCaption:
    'Speech emotion recognition pipeline: audio preprocessing, log-Mel features, a ResNet-inspired CNN, and four output labels.',
  codeAvailability: 'Source code has not been publicly released.',
  image: '/images/speech-emotion-pipeline.svg',
  imageAlt: 'Pipeline showing 16 kHz speech, 128 by 128 log-Mel features, a ResNet-inspired CNN, and neutral, happy, sad, and angry output labels',
} as const

export const publications = [
  {
    title: 'Manuscript based on M.S. thesis',
    detail: 'Real-Time Speech Emotion Recognition Using Optimized Deep Residual Networks',
    venue: 'M.S. thesis research',
    status: 'Research manuscript' as const,
    note: '',
  },
  {
    title: 'Speech emotion recognition research',
    detail: '40th Annual CSU Student Research Competition',
    venue: 'Presentation',
    status: 'Presentation' as const,
    note: '',
  },
] as const

export const researchDirections = [
  {
    title: 'Trustworthy agentic AI',
    items: [
      'Memory and RAG poisoning',
      'Provenance and consistency-based defenses',
      'Recovery and auditability',
    ],
  },
  {
    title: 'Robust human-centered sensing',
    items: [
      'Speech and multimodal signals',
      'Domain shift and subgroup-aware evaluation',
      'Responsible health AI',
    ],
  },
  {
    title: 'Efficient real-time ML',
    items: [
      'Model compression and profiling',
      'Embedded inference',
      'Future FPGA/SoC mapping (not completed)',
    ],
  },
] as const

export type ProjectStatus = 'Research' | 'Prototype' | 'Software Project'

export const projects = [
  {
    id: 'covid-nlp',
    title: 'Persian COVID-19 Social Behavior Analysis',
    status: 'Research' as ProjectStatus,
    year: '2021 – 2023',
    description:
      'Analyzed Persian-language social-media posts using sentiment classification, topic modeling, and temporal trend analysis to study emotional and linguistic shifts during the pandemic.',
    problem:
      'Crisis-driven social behavior is difficult to measure at scale without structured NLP pipelines for Persian text.',
    contribution:
      'Built pipelines for sentiment classification, topic modeling, and temporal tracking; identified emotional cycles and linguistic drift over the crisis timeline.',
    stack: 'Python, NLP, topic modeling, Google Cloud',
    link: 'https://www.linkedin.com/posts/naghme-nazar_machinelearning-nlp-datascience-ugcPost-7361228441074962434-s89Q?utm_source=share&utm_medium=member_desktop&rcm=ACoAACbyPb0Be82yiC7g1CitYj_zttwH1PBbPNM',
    linkLabel: 'Read the project summary on LinkedIn',
    image: '/images/project-covid-analysis.png',
    imageAlt: 'Persian COVID-19 social media analysis project',
  },
  {
    id: 'email-agent',
    title: 'GenAI Email & Scheduling Agent',
    status: 'Prototype' as ProjectStatus,
    year: '2026',
    description:
      'n8n prototype for classifying email, retrieving business context, and generating responses with OpenAI, Gmail, and Airtable integrations.',
    problem:
      'High email volume makes manual triage, labeling, and reply drafting inefficient and inconsistent.',
    contribution:
      'Connected email classification, context retrieval, and response generation in an exported n8n workflow.',
    stack: 'n8n, OpenAI, Gmail API, Airtable, JavaScript',
    link: 'https://github.com/nzrnaghme/RespondEmailAgent',
    linkLabel: 'View the email-agent workflow on GitHub',
    image: '/images/project-ai-email-agent.png',
    imageAlt: 'n8n workflow diagram for AI email agent',
  },
  {
    id: 'cctv-chatbot',
    title: 'CCTV Product-Support Chatbot',
    status: 'Software Project' as ProjectStatus,
    year: '2022',
    description:
      'Intent-driven assistant for CCTV product selection and support using Dialogflow NLP and cloud-backed conversational flows.',
    problem:
      'Users need guided product selection; traditional support does not scale for repetitive product questions.',
    contribution:
      'Built intent classification and dialogue logic for a production-style conversational assistant.',
    stack: 'Dialogflow, Google Cloud, NLP',
    link: 'https://github.com/nzrnaghme/CCTV',
    linkLabel: 'View the CCTV chatbot on GitHub',
    image: '/images/project-cctv-chatbot.png',
    imageAlt: 'CCTV chatbot conversational assistant',
  },
] as const

export const experience = [
  {
    id: 'golrang',
    title: 'Senior Frontend Developer',
    company: 'Golrang Industrial Group',
    location: 'Tehran, Iran',
    dates: 'July 2022 – July 2024',
    description:
      'Architected cross-platform applications with React Native and PWA (React.js); led UI implementation, state management, and performance optimization.',
    highlights: [
      'Cross-platform delivery for iOS and Android',
      'Custom UI components and caching/state management',
      'Team collaboration and code review practices',
    ],
    link: 'https://www.kaman.io/',
    image: '/images/experience-golrang.png',
    imageAlt: 'Golrang Industrial Group experience',
  },
  {
    id: 'erole',
    title: 'React Developer',
    company: 'Erole.ir',
    location: 'Tehran, Iran',
    dates: 'June 2021 – June 2022',
    description:
      'Developed React applications with Redux, RESTful APIs, and real-time SignalR communication.',
    highlights: [
      'Custom UI components and real-time client–server updates',
      'Code-splitting and lazy loading for performance',
    ],
    image: '/images/experience-erole.png',
    imageAlt: 'Erole.ir React developer experience',
  },
] as const

export const skillGroups = [
  {
    id: 'ml',
    label: 'Machine Learning',
    skills: [
      'Python',
      'TensorFlow',
      'Keras',
      'scikit-learn',
      'NumPy',
      'Pandas',
      'CNNs',
      'ResNet',
      'GRU/RNN',
      'Evaluation',
    ],
  },
  {
    id: 'signal',
    label: 'Signal & Behavioral Data',
    skills: [
      'Audio preprocessing',
      'Mel-spectrograms',
      'MFCCs',
      'Time-frequency analysis',
      'NLP',
      'Topic modeling',
    ],
  },
  {
    id: 'research-tools',
    label: 'Research Tools',
    skills: ['SciPy', 'Librosa', 'Jupyter', 'Google Colab', 'Git', 'Linux'],
  },
  {
    id: 'engineering',
    label: 'Engineering',
    skills: [
      'C++',
      'JavaScript',
      'TypeScript',
      'React',
      'Vue.js',
      'Node.js',
      'REST APIs',
    ],
  },
  {
    id: 'systems',
    label: 'Systems / Future Direction',
    skills: [
      'Real-time inference',
      'SoC coursework',
      'FPGA/SoC familiarity (not deployed)',
    ],
  },
] as const

export const navItems = [
  { id: 'about', label: 'About' },
  { id: 'research', label: 'Research' },
  { id: 'publications', label: 'Publications & Presentations' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
] as const

export const seo = {
  title: 'Naghmeh (Melody) Nazar | ML Researcher in Speech & Affective Computing',
  description:
    'Research portfolio of Naghmeh (Melody) Nazar, an M.S. in Computer Engineering working on speech emotion recognition, affective computing, responsible AI, and real-time machine learning.',
  canonical: 'https://melodynazar.com',
  ogImage: '/images/profile-photo.png',
  themeColor: '#1a2332',
} as const
