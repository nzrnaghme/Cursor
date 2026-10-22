/** Single source of truth for portfolio content. See CONTENT.md for update instructions. */

export const identity = {
  displayName: 'Naghmeh (Melody) Nazar',
  shortName: 'Melody',
  eyebrow: 'M.S. Computer Engineering · CSUN, 2026',
  headline: 'Speech ML Researcher | Trustworthy AI & Agent Security Interests',
  tagline:
    'Speech ML · Trustworthy AI · Tool-Using Agent Safety',
  bio: `My research background is in speech machine learning, and I am independently exploring how untrusted content can affect tool-using LLM agents. My M.S. thesis developed and evaluated a four-class speech-emotion model on RAVDESS and TESS.`,
  extendedBio: `My completed research focuses on speech ML. I am also developing my interests in trustworthy AI and the security of tool-using agents through independent reading and technical exploration.`,
  location: 'Los Angeles, CA, United States',
  email: 'melodynzr@gmail.com',
  portfolio: 'https://melodynazar.com',
  linkedIn: 'https://linkedin.com/in/naghme-nazar',
  github: 'https://github.com/nzrnaghme',
} as const

export const aboutParagraphs = [
  `I completed my M.S. in Computer Engineering at California State University, Northridge in August 2026. My thesis developed a 2D ResNet-inspired CNN for four-class speech emotion recognition using RAVDESS and TESS, with explicit reporting of evaluation limits.`,
  `I am independently exploring how untrusted content in emails, documents, or tool outputs can redirect an LLM agent's tool calls. As part of that exploration, I am studying selected attack patterns documented in MCP-SafetyBench—external work by Zong et al., ICLR 2026—and considering how pre-execution safeguards might be evaluated. This is exploratory work; I do not claim authorship of MCP-SafetyBench or validated defense results.`,
  `For Fall 2027, I am seeking PhD supervision on trustworthy tool-using agents, scalable oversight, and robust machine-learning evaluation. Before my M.S., I worked for several years as a professional software engineer, experience that helps me turn research questions into testable systems.`,
] as const

export const researchSnapshot = [
  { value: 'Independent exploration', label: 'Tool-using agent safety & oversight' },
  { value: 'M.S. thesis', label: 'Four-class speech ML on RAVDESS + TESS' },
  { value: '3+ years', label: 'Production software engineering' },
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

export const agentSecurityStudy = {
  title: 'Exploring Safety for Tool-Using LLM Agents',
  status: 'Independent exploration · Ongoing',
  summary:
    'A self-directed exploration of how untrusted content can influence an agent\'s proposed tool calls and how safeguards might identify risky actions before execution.',
  question:
    'When an agent reads untrusted email, documents, or tool output, what pre-execution signals indicate that a proposed tool call was induced by malicious instructions?',
  threatModel:
    'Indirect prompt injection delivered through content the agent is expected to read, followed by a side-effecting or otherwise high-impact tool call.',
  workCompleted:
    'I am studying selected scenarios and attack patterns documented in MCP-SafetyBench, an external benchmark by Zong et al., to understand how untrusted context can affect tool selection and arguments.',
  defenseHypothesis:
    'One direction I am considering is a pre-execution risk check. Possible evaluation measures include attack success, benign completion, false-block rate, and calibration; I have not produced or validated a defense.',
  evaluationPlan: [
    'Attack success rate under adversarial content',
    'Benign task completion rate',
    'False-block rate for safe tool calls',
    'Calibration of the pre-execution risk signal',
  ],
  artifactStatus:
    'Self-directed reading and problem formulation are in progress. This is not a publication or formal lab project, and there are no public experimental results or defense implementation.',
  benchmarkUrl:
    'https://proceedings.iclr.cc/paper_files/paper/2026/hash/d46f127a80dc58cbc0732a717285c43a-Abstract-Conference.html',
  benchmarkLabel: 'External reference: MCP-SafetyBench — Zong et al., ICLR 2026',
} as const

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

export const publications = [
  {
    title: 'M.S. thesis research',
    detail: 'Real-Time Speech Emotion Recognition Using Optimized Deep Residual Networks',
    venue: 'CSUN · August 2026',
    status: 'Thesis' as const,
    note: 'Thesis PDF available on request.',
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
    title: 'Pre-execution agent safeguards',
    items: [
      'Indirect prompt injection through emails, documents, and tool outputs',
      'Risk and uncertainty signals before side-effecting tool calls',
      'Safety-utility trade-offs and calibrated intervention',
    ],
  },
  {
    title: 'Robust evaluation under shift',
    items: [
      'Speaker-independent and cross-corpus speech evaluation',
      'Subgroup-aware error analysis',
      'Reproducible protocols and transparent limitations',
    ],
  },
  {
    title: 'Oversight, recovery & auditability',
    items: [
      'Human approval for high-impact actions',
      'Recovery after unsafe or ambiguous behavior',
      'Action provenance and scalable oversight',
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
      'Built an n8n tool-using email prototype, then examined where untrusted messages, generated content, and missing approval boundaries can create risk.',
    problem:
      'Email automation combines untrusted input with tools that can draft messages, retrieve records, and schedule actions.',
    contribution:
      'Connected classification and response-generation steps, documented incomplete validation and approval boundaries, and used the workflow to motivate agent-security questions.',
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
    skills: ['Experimental design', 'Error analysis', 'Threat modeling', 'Reproducible evaluation', 'Git', 'Linux'],
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
  title: 'Naghmeh (Melody) Nazar | Speech ML & Trustworthy AI Interests',
  description:
    'Research portfolio of Naghmeh (Melody) Nazar, a Fall 2027 PhD applicant with completed work in speech ML and interests in trustworthy AI, indirect prompt injection, and tool-using agent safety.',
  canonical: 'https://melodynazar.com',
  ogImage: '/images/profile-photo.png',
  themeColor: '#1a2332',
} as const
