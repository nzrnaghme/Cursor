/** Single source of truth for portfolio content. See CONTENT.md for update instructions. */

export const identity = {
  displayName: 'Naghmeh (Melody) Nazar',
  shortName: 'Melody',
  eyebrow: 'M.S. Computer Engineering · CSUN, 2026',
  headline: 'Machine Learning Researcher | Speech, Multimodal & Trustworthy AI',
  tagline:
    'Speech ML · Multimodal Learning · Robust Evaluation',
  bio: `I am a Fall 2027 PhD applicant with an M.S. in Computer Engineering and research experience in speech emotion recognition. My broader interests include speech and multimodal learning, trustworthy and robust machine learning, human-centered AI, and the safety of emerging AI systems.`,
  extendedBio: `My completed research focuses on speech ML. I am interested in doctoral research spanning multimodal learning, trustworthy and robust machine learning, affective computing, human-centered AI, and safe AI systems.`,
  location: 'Los Angeles, CA, United States',
  email: 'melodynzr@gmail.com',
  portfolio: 'https://melodynazar.com',
  linkedIn: 'https://linkedin.com/in/naghme-nazar',
  github: 'https://github.com/nzrnaghme',
} as const

export const aboutParagraphs = [
  `I completed my M.S. in Computer Engineering at California State University, Northridge in August 2026. My thesis developed a 2D ResNet-inspired CNN for four-class speech emotion recognition using RAVDESS and TESS, with explicit reporting of evaluation limits.`,
  `My broader research interests include speech and multimodal learning, trustworthy and robust machine learning, affective computing, human-centered AI, and the safe design of emerging AI systems. I am especially interested in careful evaluation under distribution shift and in methods that make model behavior more transparent and reliable.`,
  `For Fall 2027, I am seeking PhD supervision where these interests can connect with a faculty member's research program. Before my M.S., I worked for more than three years as a professional software engineer, experience that helps me turn research questions into testable systems.`,
] as const

export const researchSnapshot = [
  { value: 'Completed research', label: 'Four-class speech ML on RAVDESS + TESS' },
  { value: 'Broader interests', label: 'Trustworthy, robust & multimodal ML' },
  { value: '5+ years', label: 'Production software engineering' },
] as const

/** Prefer same-domain PDF when present in public/; fallback until owner adds file. */
export const cv = {
  label: 'Research CV',
  pdfLabel: 'Research CV (PDF)',
  localPath: '/Naghmeh_Melody_Nazar_Research_CV.pdf',
  accessiblePath: '/Naghmeh_Melody_Nazar_Research_CV.html',
  fallbackUrl:
    'https://drive.google.com/file/d/1AZorZk7XdRCiORRH4z4CcgtQUvFuO29W/view?usp=drive_link',
} as const

export function getCvHref(): string {
  return cv.localPath
}

export function getAccessibleCvHref(): string {
  return cv.accessiblePath
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
  status: 'M.S. thesis research',
  question:
    'How can residual neural networks classify emotional states from speech, and how should their performance be evaluated across speakers and datasets?',
  data: {
    summary:
      'RAVDESS and TESS speech loaded at 16 kHz and represented as 128 × 128 log-Mel spectrograms. The current label mapping groups RAVDESS calm recordings with neutral.',
  },
  model: '2D ResNet-inspired CNN with four output labels: neutral, happy, sad, and angry.',
  training:
    'Adam optimization with dropout and residual connections, supported by a reproducible preprocessing and evaluation pipeline.',
  evaluation: 'On the current mixed-corpus split, the model achieved 80.36% validation accuracy and 74.4% held-out test accuracy. The split does not establish speaker-independent or cross-corpus generalization.',
  errorAnalysis: [
    'Happy / Neutral confusion patterns',
    'Speaker variability across the corpus',
    'Cross-corpus distribution shift',
  ],
  prototype:
    'Research prototype toward practical speech-emotion inference. Desktop latency profiling remains future work; no real-time deployment claim is made.',
  limitations: [
    'Acted speech datasets (RAVDESS, TESS)',
    'Cross-corpus distribution shift',
    'The held-out mixed test set is not evidence of speaker-independent or cross-corpus generalization',
    'Real-world latency and generalization remain to be established',
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

export const agentSecurityResearch = {
  title: 'Security Evaluation of Tool-Using LLM Agents',
  status: 'Ongoing independent research',
  text: `Independent research on how untrusted content — for example text inside emails, documents, or tool outputs — can redirect an LLM agent's tool calls. Includes a structured analysis of MCP-SafetyBench (a benchmark of unsafe tool-use scenarios), tracing of the decision points where injected content changes agent behavior, and defense ideas such as confidence gating before tool execution. This work connects to my PhD research direction in trustworthy agentic AI.`,
} as const

export const publications = [
  {
    title: 'M.S. thesis research',
    detail: 'Real-Time Speech Emotion Recognition Using Optimized Deep Residual Networks',
    venue: 'CSUN · August 2026',
    status: 'Thesis' as const,
    note: 'Thesis PDF available on request.',
    manuscript: 'Manuscript in preparation for Interspeech 2027.',
  },
  {
    title: '40th Annual CSU Student Research Competition',
    detail: 'Presentation of the M.S. speech emotion recognition research',
    venue: 'Presenter · 2026',
    status: 'Presentation' as const,
    note: 'Presentation materials available on request.',
  },
] as const

export const researchDirections = [
  {
    title: 'Speech & multimodal learning',
    items: [
      'Speaker-independent and cross-corpus speech evaluation',
      'Multimodal learning from speech, language, and behavioral signals',
      'Naturalistic data and deployment-aware model design',
    ],
  },
  {
    title: 'Trustworthy & human-centered ML',
    items: [
      'Calibration and uncertainty-aware decision support',
      'Subgroup-aware error analysis and distribution shift',
      'Reproducible evaluation and transparent limitations',
    ],
  },
  {
    title: 'Safe & reliable AI systems',
    items: [
      'Human oversight for high-impact AI-assisted actions',
      'Validation and recovery for uncertain system behavior',
      'Safety of emerging tool-using and agentic systems',
    ],
  },
] as const

export type ProjectStatus = 'Research' | 'Prototype' | 'Software Project'

export const projects = [
  {
    id: 'email-agent',
    title: 'GenAI Email & Scheduling Agent',
    status: 'Prototype' as ProjectStatus,
    year: '2026',
    description:
      'Built an n8n workflow that classifies incoming messages, drafts responses, and supports scheduling across connected services.',
    problem:
      'Email triage and scheduling require several repetitive steps across messaging, data, and calendar tools.',
    contribution:
      'Integrated classification, response generation, record lookup, and scheduling while documenting validation and human-approval boundaries for generated actions.',
    stack: 'n8n, OpenAI, Gmail API, Airtable, JavaScript',
    link: 'https://github.com/nzrnaghme/RespondEmailAgent',
    linkLabel: 'Inspect the email-agent workflow on GitHub',
    image: '/images/project-ai-email-agent.png',
    imageAlt: 'n8n workflow diagram for an AI email agent',
  },
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
      'Built pipelines for sentiment classification, topic modeling, and temporal tracking to explore changes across the crisis timeline.',
    stack: 'Python, NLP, topic modeling, Google Cloud',
    link: 'https://www.linkedin.com/posts/naghme-nazar_machinelearning-nlp-datascience-ugcPost-7361228441074962434-s89Q?utm_source=share&utm_medium=member_desktop&rcm=ACoAACbyPb0Be82yiC7g1CitYj_zttwH1PBbPNM',
    linkLabel: 'Read the project summary on LinkedIn',
    image: '/images/project-covid-analysis.png',
    imageAlt: 'Persian COVID-19 social media analysis project',
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
    label: 'Research & Evaluation',
    skills: ['Experimental design', 'Error analysis', 'Cross-corpus evaluation', 'Reproducible evaluation', 'Git', 'Linux'],
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
] as const

export const navItems = [
  { id: 'research', label: 'Research', desktop: true },
  { id: 'publications', label: 'Outputs', desktop: true },
  { id: 'directions', label: 'Agenda', desktop: true },
  { id: 'experience', label: 'Experience', desktop: true },
  { id: 'projects', label: 'Engineering', desktop: false },
  { id: 'about', label: 'Background', desktop: true },
  { id: 'contact', label: 'Contact', desktop: false },
] as const

export const seo = {
  title: 'Naghmeh (Melody) Nazar | Speech, Multimodal & Trustworthy AI',
  description:
    'Research portfolio of Naghmeh (Melody) Nazar, a Fall 2027 PhD applicant with completed work in speech emotion recognition and broader interests in multimodal, trustworthy, robust, and human-centered AI.',
  canonical: 'https://melodynazar.com',
  ogImage: '/images/profile-photo.png',
  themeColor: '#1a2332',
} as const
