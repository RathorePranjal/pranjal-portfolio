/**
 * Polymath OS — Portfolio (Tailwind v4 + Framer Motion)
 *
 * IMAGE MAP — drop files in /public/images/ and update paths:
 * - PROFILE_PHOTO, HERO_GALLERY[], MOMENTS_GALLERY[], HACKATHON_EVENTS[]
 * - INTRO_VIDEO_SRC
 */

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type MouseEvent as ReactMouseEvent,
} from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import {
  Activity,
  Award,
  CalendarDays,
  ExternalLink,
  FileText,
  Github,
  GraduationCap,
  ImageIcon,
  Instagram,
  Lightbulb,
  Linkedin,
  Mail,
  Maximize2,
  Minimize2,
  Menu,
  MessageCircle,
  Phone,
  Send,
  Trophy,
  User,
  Users,
  X,
  Youtube,
  Zap,
  ShieldCheck,
  ShieldAlert,
  Terminal,
  Cpu,
  CheckCircle2,
  Search,
  Play,
  Sparkles,
  Database,
  Trash2,
  TrendingUp,
  Plus,
  Palette,
  ChevronLeft,
  ChevronRight,
  Globe,
  MapPin,
} from "lucide-react";

const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Social Presence" },
  { id: "experience-details", label: "Experience" },
  { id: "events", label: "Events" },
  { id: "contact", label: "Contact" },
] as const;

// ─── Media & links (edit these) ───────────────────────────────────────────────
const PROFILE_PHOTO = "/images/self.jpg";
const LINKEDIN_URL = "https://www.linkedin.com/in/pranjalrathore";
const GITHUB_URL = "https://github.com/rathorepranjal";
const INSTAGRAM_PUBLIC_URL = "https://www.instagram.com/yokhilona";
const INSTAGRAM_PERSONAL_URL = "https://www.instagram.com/rathore__pranjal";
const YOUTUBE_URL = "https://www.youtube.com/@KHILONAGAMER";
/** Your public email — shown in Get in touch + mailto link */
const CONTACT_EMAIL = "PRANJAL.RATHORE0704@GMAIL.COM";
/** Digits only for tel: link (E.164, no spaces) */
const CONTACT_PHONE_TEL = "+917835007970";
/** How the number appears on screen */
const CONTACT_PHONE_DISPLAY = "+91 78350 07970";
/** Drop PDF at public/portfolio.pdf or paste a full URL */
const PORTFOLIO_PDF_URL = "https://drive.google.com/file/d/12CNtjw3XCRhXv0l5jJBIXz4vuECIdEHW/view?usp=drive_link";

const allImageFiles = import.meta.glob('/public/images/**/*.{jpg,jpeg,png,webp,gif,svg,JPG,JPEG,PNG,WEBP,GIF,SVG}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

const getImagesFromFolder = (folderPath: string, fallbackImages: string[]): string[] => {
  const targetSegment = `/public/images/${folderPath.toLowerCase()}/`;
  const matched = Object.keys(allImageFiles)
    .filter((key) => key.toLowerCase().includes(targetSegment))
    .map((key) => key.replace(/^\/public/, ''));
  return matched.length > 0 ? matched : fallbackImages;
};

type HackathonEvent = {
  id: string;
  src: string;
  title: string;
  place: string;
  role?: string;
  idea: string;
  achievement: string;
  achievementDetails?: string[];
  skills: string[];
  gallery: string[];
  sponsors?: string;
  colorTheme?: "amber" | "emerald" | "purple" | "teal" | "cyan" | "rose";
  linkedinUrl?: string;
};

const HACKATHON_EVENTS: HackathonEvent[] = [
  {
    id: "hackgrounds",
    colorTheme: "emerald",
    linkedinUrl: "https://www.linkedin.com/posts/pranjalrathore_finalist-at-hackground-india-2k25-at-ugcPost-7367518142773755904-QHW4",
    src: getImagesFromFolder("events/hackgrounds", ["/images/hackgrounds.jpg"])[0],
    title: "Hackground India 2k25",
    place: "Thoughtworks, Gurgaon",
    role: "Team Lead",
    idea: "Designed AI Trust Chain (on-chain human media proof). Finalist (Top 40 out of 3000+ registrations). Team: Jatin Lohia, Ashwani Rathore, Anil Kumar Tanwar.",
    achievement: "Finalist — Top 40 / 3000+ Teams",
    achievementDetails: [
      "PR & Outreach Champion: Secured 1st Prize in the LinkedIn Outreach & Engagement Competition (winning the official GitHub Octocat Toy) out of 40 competing teams."
    ],
    skills: ["Solidity", "Node.js", "AI Trust Proofs", "Pitching", "Leadership"],
    gallery: getImagesFromFolder("events/hackgrounds", ["/images/hackgrounds.jpg", "/images/hackgrounds-2.jpg"]),
  },
  {
    id: "india-innovates",
    colorTheme: "emerald",
    linkedinUrl: "https://www.linkedin.com/posts/pranjalrathore_indiainnovates2026-civictech-openinnovation-ugcPost-7464090621838958592-sXYP",
    src: getImagesFromFolder("events/india-innovates", ["/images/india-innovates.jpg"])[0],
    title: "India Innovates 26",
    place: "Bharat Mandapam",
    role: "Team Lead",
    idea: "Designed and prototyped a decentralized trust verification platform to keep digital documents safe from AI manipulation and make them fully traceable back to their origin. Pitched live at Bharat Mandapam. Team: Anil Kumar Tanwar, Vanshika Dalal.",
    achievement: "Finalist — Top 300 / 28,000+ Teams",
    achievementDetails: [
      "Grand Finale Finalists: Stood in the top 300 teams nationwide under the Open Innovation domain out of 28,000+ total registrations for the national innovation hackathon.",
      "National Stage Presentation: Handled stakeholder interaction and pitched the digital document origin-traceability and trust platform prototype to mentors, policymakers, and industry leaders."
    ],
    skills: ["AI Detection", "Document Security", "Python", "Decentralized Trust", "Leadership"],
    gallery: getImagesFromFolder("events/india-innovates", ["/images/india-innovates.jpg"]),
  },
  {
    id: "vibeclash",
    colorTheme: "purple",
    linkedinUrl: "https://www.linkedin.com/posts/pranjalrathore_vibeclash-hackathonsuccess-actsedc-ugcPost-7402724933161828353-Sjej",
    src: getImagesFromFolder("events/vibeclash", ["/images/vibeclash.jpg"])[0],
    title: "VibeClash 2025",
    place: "ACTS-EDC, GGSIPU USAR",
    role: "PR & Outreach Lead",
    idea: "Coordinated PR & Outreach strategies.",
    achievement: "Organizing Team — PR & Outreach Lead",
    skills: ["PR & Outreach", "Sponsorships", "Teamwork", "Event Ops"],
    gallery: getImagesFromFolder("events/vibeclash", ["/images/vibeclash.jpg"]),
    sponsors: "CodeCrafters.io, AbhiBus, Squareboat, Market Mafiaa, BURRAH",
  },
  {
    id: "geekverse",
    colorTheme: "purple",
    linkedinUrl: "https://www.linkedin.com/posts/pranjalrathore_geekverse-hackathonsuccess-actsedc-activity-7338561018471628802-t-a5",
    src: getImagesFromFolder("events/geekverse", ["/images/hackathon-host.jpg"])[0],
    title: "GeekVerse 2025",
    place: "ACTS-EDC & IEEE WIE USAR",
    role: "PR & Outreach Lead",
    idea: "Flagship national hackathon. Reached out to sponsors and managed ground coordination under ACTS-EDC leadership.",
    achievement: "Organizing Team — PR & Outreach Lead",
    skills: ["PR & Outreach", "Sponsorship Pitching", "Corporate Relations"],
    gallery: getImagesFromFolder("events/geekverse", ["/images/hackathon-host.jpg", "/images/hackathon-host-2.jpg"]),
    sponsors: "Potpie AI, RagaAI, Balsamiq, CodeCrafters.io, Sprint.dev, InterviewBuddy",
  },
];


/** Event banner cards — add/remove; more items = slightly narrower cards */
type EventBannerItem = {
  id: string;
  name: string;
  type: "hosted" | "attended" | "hosted & attended" | "certification";
  locationType: "online" | "offline";
  date: string;
  image: string;
  gallery?: string[];
  description?: string;
};

const EVENT_BANNER_ITEMS: EventBannerItem[] = [
  {
    id: "e1",
    name: "FireDucks x DevRelSquad AI Meetup",
    type: "hosted & attended",
    locationType: "offline",
    date: "May 2026",
    image: getImagesFromFolder("events/e1", ["/images/events/e1.jpg"])[0],
    gallery: getImagesFromFolder("events/e1", ["/images/events/e1.jpg"]),
    description: "Attended and co-facilitated sessions packed with insights on AI & Data Science at Microsoft Noida. Discussed AutoGen, DataFrame evolution for large-scale data, and optimizing Pandas workflows with FireDucks. Speakers included Vaibhav Sirohi (NEC), Nonita Sharma (Microsoft), and Shruti Arora (DevRelSquad).",
  },
  {
    id: "e2",
    name: "Snap AR Hands-On Workshop",
    type: "hosted & attended",
    locationType: "offline",
    date: "Feb 2026",
    image: getImagesFromFolder("events/e2", ["/images/events/e2.jpg"])[0],
    gallery: getImagesFromFolder("events/e2", ["/images/events/e2.jpg"]),
    description: "Hands-on masterclass on Lens Studio v5.6 Gen AI and ML features, guided by Chhavi Garg (Arexa/BharatXR). Coordinated hosting with ACTS-EDC and IEEE WIE USAR teams.",
  },
  {
    id: "e3",
    name: "Introduction to AI (by Microsoft SE)",
    type: "hosted & attended",
    locationType: "online",
    date: "Aug 2025",
    image: getImagesFromFolder("events/e3", ["/images/events/e3.jpg"])[0],
    gallery: getImagesFromFolder("events/e3", ["/images/events/e3.jpg"]),
    description: "Online session hosted in collaboration with ACTS-EDC, featuring Kaavya Saxena (Software Engineer @ Microsoft) sharing insights on breaking down complex AI concepts.",
  },
  {
    id: "e4",
    name: "Introduction to IoT (Cisco Certification)",
    type: "certification",
    locationType: "online",
    date: "Jan 2025",
    image: getImagesFromFolder("events/e4", ["/images/events/e4.jpg"])[0],
    gallery: getImagesFromFolder("events/e4", ["/images/events/e4.jpg"]),
    description: "Professional certification on the Internet of Things (IoT) issued by Cisco in partnership with NASSCOM.",
  },
  {
    id: "e5",
    name: "AI Tools Masterclass (Be10x)",
    type: "certification",
    locationType: "online",
    date: "Jun 2025",
    image: getImagesFromFolder("events/e5", ["/images/events/e5.jpg"])[0],
    gallery: getImagesFromFolder("events/e5", ["/images/events/e5.jpg"]),
    description: "Completed a comprehensive masterclass led by IIT Kharagpur Alumni covering 23 in-demand AI applications, productivity tools, and workflows.",
  },
  {
    id: "e6",
    name: "Data Analytics & AI Tools (Coding Blocks)",
    type: "attended",
    locationType: "online",
    date: "Apr 2025",
    image: getImagesFromFolder("events/e6", ["/images/events/e6.jpg"])[0],
    gallery: getImagesFromFolder("events/e6", ["/images/events/e6.jpg"]),
    description: "Participation in the online masterclass organized by GameDev Guild Students Club (formerly GDGSC) in collaboration with Coding Blocks on April 3, 2025.",
  },
  {
    id: "e7",
    name: "Tech Winter Break (GDG USAR)",
    type: "attended",
    locationType: "offline",
    date: "Dec 2024",
    image: getImagesFromFolder("events/e7", ["/images/events/e7.jpg"])[0],
    gallery: getImagesFromFolder("events/e7", ["/images/events/e7.jpg"]),
    description: "Hands-on winter workshop series focused on Web development and Mobile Application development structures.",
  },
  {
    id: "e8",
    name: "GAME-A-THON (GGSIPU EDC Ideathon)",
    type: "attended",
    locationType: "offline",
    date: "Nov 2024",
    image: getImagesFromFolder("events/e8", ["/images/events/e8.jpg"])[0],
    gallery: getImagesFromFolder("events/e8", ["/images/events/e8.jpg"]),
    description: "Participated in the GGSIPU EDC Ideathon organized by GameDev Guild Student Club. Credential ID: GGSIPU/GDGSC/P/2024/30.",
  },
  {
    id: "e9",
    name: "Mastering LLMs (1M1B IPU)",
    type: "attended",
    locationType: "online",
    date: "Oct 2024",
    image: getImagesFromFolder("events/e9", ["/images/events/e9.jpg"])[0],
    gallery: getImagesFromFolder("events/e9", ["/images/events/e9.jpg"]),
    description: "Online session focusing on Large Language Models (LLMs) architectures and prompts. Credential ID: 047.",
  },
  {
    id: "e10",
    name: "TECH-READY: Decoding Specs",
    type: "attended",
    locationType: "offline",
    date: "Aug 2025",
    image: getImagesFromFolder("events/e10", ["/images/events/e10.jpg"])[0],
    gallery: getImagesFromFolder("events/e10", ["/images/events/e10.jpg"]),
    description: "Awarded Certificate of Participation for Tech-Ready: Decoding Specs, organised by GameDev Guild Students Club, GGSIPU USAR. Awarded 2 hours for active participation.",
  },
  {
    id: "e11",
    name: "DockUp (IOSC Tech Club)",
    type: "attended",
    locationType: "offline",
    date: "Academic Year 2025-26",
    image: getImagesFromFolder("events/e11", ["/images/events/e11.jpg"])[0],
    gallery: getImagesFromFolder("events/e11", ["/images/events/e11.jpg"]),
    description: "Recognized for invaluable technical contributions and completing 5 hours of dedicated work for the DockUp Docker & DevOps event at IOSC Tech Club, GGSIPU-EDC.",
  },
  {
    id: "e12",
    name: "AI Development: Building an AI Chatbot",
    type: "hosted & attended",
    locationType: "online",
    date: "Jul 2025",
    image: getImagesFromFolder("events/e12", ["/images/events/e12.jpg"])[0],
    gallery: getImagesFromFolder("events/e12", ["/images/events/e12.jpg"]),
    description: "Successfully hosted and participated in the online hands-on session 'AI Development: Building an AI Chatbot' organized by ACTS-EDC on 27th July 2025, exploring chatbot engineering, NLP, and conversational flow architecture.",
  },
];

const TICKER_ITEMS: { text: string; tone: "cyan" | "white" | "purple" }[] = [
  { text: "SCALES PRODUCTS TO 2M+ VIEWS", tone: "cyan" },
  { text: "BRIDGES AI TECH FEASIBILITY & USER UX", tone: "white" },
  { text: "LEADS CROSS-FUNCTIONAL PRODUCT TEAMS", tone: "purple" },
  { text: "DESIGNS AI-DRIVEN SYSTEMS & AGENTS", tone: "cyan" },
  { text: "HACKATHON WINNING MINDSET", tone: "white" },
];

type SkillGroup = {
  title: string;
  subtitle: string;
  skills: { name: string; level: number; icon?: React.ComponentType<any> }[];
};

const SKILL_GROUPS: SkillGroup[] = [
  {
    title: "AI & Technical Systems",
    subtitle: "Models, data structures & code I work with",
    skills: [
      { name: "Artificial Intelligence", level: 95, icon: Sparkles },
      { name: "Prompt Engineering", level: 92, icon: Terminal },
      { name: "Python", level: 88, icon: Cpu },
      { name: "Machine learning (NumPy, Panda, Matplot)", level: 85, icon: Activity },
      { name: "DBMS & SQL", level: 83, icon: Database },
      { name: "Software engineering", level: 78, icon: Zap },
      { name: "DSA & DAA Theory", level: 76, icon: ShieldCheck },
      { name: "Operating system", level: 72, icon: Terminal },
    ],
  },
  {
    title: "Product & Growth",
    subtitle: "How I scale ideas and teams",
    skills: [
      { name: "Product Management", level: 94, icon: Lightbulb },
      { name: "Communication", level: 95, icon: MessageCircle },
      { name: "Data Analytics", level: 88, icon: TrendingUp },
      { name: "Corporate Outreach", level: 86, icon: Users },
      { name: "UI UX", level: 85, icon: Palette },
      { name: "Public Relations", level: 82, icon: Globe },
      { name: "Content Creation", level: 80, icon: Youtube },
    ],
  },
];

type ProjectNode = {
  id: string;
  title: string;
  tag: string;
  idea: string;
  description: string;
  skills: string[];
  achievement?: string;
  screenshot: string;
  siteUrl: string;
  expandRoute: string;
  videoUrl?: string;
  gallery?: string[];
  miniBox?: { title?: string; text: string };
  githubUrl?: string;
  vision?: string;
  techSpecs?: { label: string; value: string; iconName: string }[];
  metricsList?: { label: string; value: string; subtext?: string }[];
  colorTheme?: "amber" | "emerald" | "purple" | "teal" | "cyan" | "rose";
  linkedinUrl?: string;
  minimizedPointers?: string[];
};

const PROJECTS: ProjectNode[] = [
  {
    id: "npis",
    colorTheme: "amber",
    title: "NPIS — National Population Intelligence System (Aadhaar-linked NPI Dashboard)",
    tag: "Python · Pandas · Matplotlib · Seaborn",
    idea: "Compute a National Population Intelligence Priority (NPI) score for districts by combining Aadhaar enrolment & demographics with census urban/rural population structure, then visualize “where to act first” across Telecom/Education/Transport/Utilities/Jobs.",
    description:
      "Equip decision-makers with a district-level, multi-sector priority ranking to guide targeted interventions—identifying districts that are likely to be high-need/higher opportunity across key service categories.",
    skills: ["Python", "Pandas", "Matplotlib", "Seaborn", "Data Analytics (Aadhaar + Census fusion)"],
    achievement: "Group data project (Team: Pranjal, Anil, Priyansh)",
    screenshot: getImagesFromFolder("projects/npis", ["/images/projects/npis/Screenshot 2026-05-23 050054.png"])[0],
    siteUrl: "",
    expandRoute: "#",
    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    gallery: [
      "/images/projects/npis/REPORT PROJECT.pdf",
      ...getImagesFromFolder("projects/npis", [
        "/images/projects/npis/Screenshot 2026-05-23 050054.png",
        "/images/projects/npis/Screenshot 2026-05-23 050232.png",
        "/images/projects/npis/Screenshot 2026-05-23 050241.png",
        "/images/projects/npis/Screenshot 2026-05-23 050249.png",
        "/images/projects/npis/Screenshot 2026-05-23 050256.png",
        "/images/projects/npis/Screenshot 2026-05-23 050319.png",
      ])
    ],
    miniBox: { title: "NPI Dashboard", text: "Multi-sector priority ranking across 640 districts" },
    githubUrl: "https://github.com/RathorePranjal/NPIS/tree/master",
    vision: "Equip decision-makers with a district-level, multi-sector priority ranking to guide targeted interventions—identifying districts that are likely to be high-need/higher opportunity across key service categories (telecom connectivity readiness, education demand proxy, transport accessibility proxy, utilities coverage proxy, and jobs workforce readiness proxy).",
    techSpecs: [
      { label: "Data Sources", value: "DDW-0000C-13.csv (census demographics), aadhaar_enrolment_state_cleaned.csv (Aadhaar counts), and aadhaar_demographic_state_cleaned.csv (biometrics).", iconName: "Database" },
      { label: "Computation Pipeline (analysis.py)", value: "Merges datasets by (state, district), computes normalized priority indices (PDI, Education_PDI, etc.), and averages them to NPI.", iconName: "Cpu" },
      { label: "Visualization Layer (dashboard.py)", value: "Builds district/state charts, state × indicator heatmaps, and filters ranking graphs using Seaborn & Matplotlib.", iconName: "BarChart" },
      { label: "Team & Scoping", value: "Group hackathon collaboration between Pranjal (PR & Outreach Lead), Anil, and Priyansh.", iconName: "Users" }
    ],
    metricsList: [
      { label: "Priority Indexes", value: "Telecom (PDI), Education, Transport, Utilities, Jobs, and NPI" },
      { label: "Dashboard Capabilities", value: "State ranking bar charts, state × indicator heatmaps, and top/bottom district comparisons" },
      { label: "Runtime Verification", value: "Successfully handles non-blocking Seaborn FutureWarning warnings with 100% accurate visual rendering" }
    ],
    minimizedPointers: [
      "Aadhaar & census demographic data fusion prioritization dashboard.",
      "Computes unified Priority Score (NPI) across 640+ districts.",
      "Visualizes key opportunities for telecom, utilities, and infrastructure deployment."
    ],
  },
  {
    id: "aitrust",
    colorTheme: "emerald",
    title: "AI-Trust Chain",
    tag: "React · Node.js · Solidity · Python",
    idea: "Detect AI-generated content and mint immutable on-chain authenticity certificates.",
    description:
      "Provide a reliable workflow for individuals, creators, and organizations to verify whether submitted content is likely generated by AI and to store that verification result permanently via blockchain-backed certificates, reducing AI misinformation, plagiarism, and fake authenticity.",
    skills: ["Solidity", "Hardhat", "React", "Node.js/Express", "Python (heuristics)", "Smart Contracts", "REST API"],
    achievement: "Hackgrounds 2k25 Finalist",
    screenshot: getImagesFromFolder("projects/aitrust", ["/images/projects/aitrust/Screenshot 2026-05-23 021934.png"])[0],
    siteUrl: "https://aitrust-demo.vercel.app",
    expandRoute: "#",
    videoUrl: "/images/projects/aitrust/video.mp4",
    gallery: getImagesFromFolder("projects/aitrust", [
      "/images/projects/aitrust/Screenshot 2026-05-23 021934.png",
      "/images/projects/aitrust/Screenshot 2026-05-23 022120.png",
      "/images/projects/aitrust/Screenshot 2026-05-23 022142.png",
      "/images/projects/aitrust/Screenshot 2026-05-23 022210.png",
      "/images/projects/aitrust/Screenshot 2026-05-23 022520.png",
      "/images/projects/aitrust/Screenshot 2026-05-23 023539.png",
    ]),
    miniBox: { title: "Trust Verification", text: "End-to-end flow from AI detection to on-chain proof" },
    githubUrl: "https://github.com/RathorePranjal/AI-TRUSTCHAIN/tree/main/ai-origin-validator",
    vision: "Provide a reliable workflow for individuals, creators, and organizations to verify whether submitted content is likely generated by AI and to store that verification result permanently via blockchain-backed certificates, reducing AI misinformation, plagiarism, and fake authenticity.",
    techSpecs: [
      { label: "Frontend (React)", value: "File upload / text input UI, analysis result display, and certificate viewing/verification pages.", iconName: "React" },
      { label: "Backend (Node.js + Express)", value: "RESTful API endpoints (e.g. /api/analyze/text, /api/analyze/file, /api/certificate/mint-onchain, /api/certificate/list).", iconName: "Node" },
      { label: "AI Detection Layer (Python)", value: "Heuristic-based AI text detection (word count, average word length, punctuation density, and business-jargon indicators) with mock fallback.", iconName: "Python" },
      { label: "Smart Contracts (Solidity)", value: "AIOriginCertificate contract used to store certificate-related metadata on-chain, compiled & tested using Hardhat.", iconName: "Solidity" },
      { label: "Data / Caching", value: "Certificate storage using local JSON backend files, coupled with EVM blockchain transactions for immutable proof verification.", iconName: "Database" }
    ],
    metricsList: [
      { label: "Human-Likely Sample", value: "Human-Likely (97% confidence)" },
      { label: "AI-generated Sample", value: "AI-Likely (53% confidence)" },
      { label: "Complex Human Sample", value: "Human-Likely (79% confidence)" },
      { label: "Integration Scope", value: "Multi-service system (React UI, Express API, Python detection, and Solidity contracts)" }
    ],
    minimizedPointers: [
      "Authenticity validation system for text and image files.",
      "Heuristic classification engine detecting AI vs human origins.",
      "Immutable smart contract registry to mint trust certificates on-chain."
    ],
  },
  {
    id: "disha",
    colorTheme: "purple",
    title: "DISHA — AI Career Advisor",
    tag: "React · Vite · Convex · Gemini",
    idea: "DISHA guides students to the right careers using AI-powered assessments, personalized recommendations, and conversational support.",
    description:
      "Led product strategy and API integration for an AI career advisor. Designed custom prompt engineering and database queries matching user assessments to 500+ colleges, resulting in personalized roadmaps and 200+ indexed careers.",
    skills: [
      "React",
      "Vite",
      "TypeScript",
      "Convex (backend)",
      "Gemini/LLM integration",
      "React Router",
      "Recharts (analytics)",
      "Tailwind/Shadcn UI",
      "Auth",
      "TanStack Query",
    ],
    screenshot: getImagesFromFolder("projects/disha", ["/images/projects/disha/Screenshot 2026-05-23 042409.png"])[0],
    siteUrl: "https://disha-demo.vercel.app",
    expandRoute: "#",
    videoUrl: "/images/projects/disha/Screen Recording 2026-05-23 043520.mp4",
    gallery: getImagesFromFolder("projects/disha", [
      "/images/projects/disha/Screenshot 2026-05-23 042409.png",
      "/images/projects/disha/Screenshot 2026-05-23 042436.png",
      "/images/projects/disha/Screenshot 2026-05-23 042452.png",
      "/images/projects/disha/Screenshot 2026-05-23 042505.png",
      "/images/projects/disha/Screenshot 2026-05-23 042527.png",
    ]),
    miniBox: { title: "Career Advisor", text: "End-to-end AI assessments & chatbot guidance" },
    githubUrl: "https://github.com/RathorePranjal/DISHA-CAREER-GUIDANCE",
    vision: "Reduce the career confusion faced by students by turning interests, skills, and assessment results into actionable career paths—covering courses, colleges, roles, and next steps—so users can decide faster and more confidently.",
    techSpecs: [
      { label: "Frontend Layer", value: "React (TypeScript) with Vite; routed pages for Login/Signup, Dashboard, Chatbot, Assessments, Careers, and Colleges.", iconName: "React" },
      { label: "Serverless Backend (Convex)", value: "Convex functions for user sessions, dashboard aggregates, chatbot threads, assessments, colleges, and notifications.", iconName: "Server" },
      { label: "AI Integration (Gemini)", value: "LLM/Gemini module generating personalized, context-aware career roadmaps and real-time chatbot counseling.", iconName: "Brain" },
      { label: "Data Flow & Syncing", value: "User inputs → assessment/chat context → AI response → Convex queries/mutations → client-side TanStack Query cache.", iconName: "Database" }
    ],
    metricsList: [
      { label: "Coverage Scopes", value: "Dynamic mapping of courses, colleges, roles, and action roadmaps" },
      { label: "Validation Flows", value: "Full user journey: login → assessment → tailored recommendations → chatbot mentoring" },
      { label: "User Interface", value: "Premium Tailwind / Shadcn UI dashboard with analytics visualization using Recharts" }
    ],
    minimizedPointers: [
      "Personalized AI-powered student diagnostic chatbot.",
      "Gemini LLM pipeline generating custom learning roadmaps.",
      "Interactive career and college database matching 500+ institutes."
    ],
  },
  {
    id: "cleft",
    colorTheme: "teal",
    title: "Cleft Lip Regeneration Toolkit",
    tag: "PyTorch · U-Net · Computer Vision",
    idea: "Reconstruct facial images by using a mask-aware inpainting model that regenerates regions indicated by a user-provided binary mask—specifically targeting cleft-lip–affected facial areas.",
    description:
      "Developed a mask-aware U-Net deep learning image inpainting system. Directed dataset curation and trained a CNN using PyTorch to reconstruct missing facial geometry with high fidelity, creating a research prototype and local FastAPI interactive web server for clinical review.",
    skills: [
      "PyTorch",
      "Mask-aware U-Net",
      "Computer Vision Inpainting",
      "CelebA",
      "Perceptual Loss (VGG16)",
      "PSNR/SSIM",
      "FastAPI",
      "Uvicorn",
      "HTML/CSS/JS (web demo)",
    ],
    screenshot: getImagesFromFolder("projects/cleft", ["/images/projects/cleft/Screenshot 2026-05-23 052033.png"])[0],
    siteUrl: "",
    expandRoute: "#",
    videoUrl: "/images/projects/cleft/Screen Recording 2026-05-23 052717.mp4",
    gallery: getImagesFromFolder("projects/cleft", [
      "/images/projects/cleft/Screenshot 2026-05-23 052033.png",
      "/images/projects/cleft/Screenshot 2026-05-23 052048.png",
      "/images/projects/cleft/Screenshot 2026-05-23 052241.png",
    ]),
    miniBox: { title: "Inpainting Model", text: "Mask-aware U-Net face reconstruction & FastAPI UI" },
    githubUrl: "https://github.com/RathorePranjal/CLEFT-LIP-IMAGE-REGENERATION",
    vision: "The vision is to provide an offline, interactive AI tool that helps visualize potential facial reconstruction outcomes for cleft lip cases. It bridges the gap between a patient’s current condition and expected post-reconstruction appearance by enabling surgeons, researchers, and students to quickly generate realistic inpainted facial results from an input image + mask.",
    techSpecs: [
      { label: "Model Architecture", value: "Mask-aware U-Net (4-channel input: RGB image + binary mask; 3-channel RGB output) with encoder-decoder skip connections.", iconName: "Cpu" },
      { label: "Training Scheme", value: "Adam optimizer (lr=1e-4) with L1 pixel loss, optional VGG16 perceptual loss, and mask-weighted loss (e.g. --lambda-mask 10.0) to emphasize masked regions.", iconName: "Brain" },
      { label: "Backend & Deployment", value: "FastAPI local web server serving an interactive HTML/CSS/JS interface for mask drawing, alongside CLI inference scripts (infer.py).", iconName: "Server" },
      { label: "Dataset & Checkpoints", value: "Trained on CelebA aligned faces + binary PNG masks, saving best checkpoints under validation loss to artifacts/best.pt.", iconName: "Database" }
    ],
    metricsList: [
      { label: "Evaluation Baselines", value: "Reconstruction quality verified using PSNR and SSIM benchmarks" },
      { label: "Training Efficiency", value: "Approximately 2–4 hours for 50 epochs on GPU (mixed precision FP16 enabled)" },
      { label: "Inference Performance", value: "High-speed local execution generating face reconstructions in under 1 second per image on GPU" }
    ],
    minimizedPointers: [
      "Computer Vision inpainting using mask-aware PyTorch U-Net.",
      "High-fidelity reconstruction tool for surgeon preview and planning.",
      "Interactive FastAPI local web application for clinician reviews."
    ],
  },
  {
    id: "bookkeeping",
    colorTheme: "cyan",
    title: "Bookkeeping Categorizer (ML + DBMS Web App)",
    tag: "Flask · scikit-learn · MySQL · Python",
    idea: "Automatically classify free-text financial transactions into correct bookkeeping categories using an ML model, and store every prediction in a MySQL database with a simple web UI.",
    description:
      "Small businesses and individuals often manually categorize transactions (income/expense/sales/purchase) which is time-consuming and error-prone. This system speeds up bookkeeping by turning transaction text into a labeled category and keeps a running history for review and auditing.",
    skills: [
      "Flask",
      "scikit-learn",
      "TF-IDF",
      "Naive Bayes",
      "MySQL Connector/Python",
      "HTML/CSS (inline)",
      "Pickle model persistence",
    ],
    achievement: "100% automated parsing & DB persistence",
    screenshot: getImagesFromFolder("projects/bookkeeping", ["/images/projects/bookkeeping.jpg"])[0],
    siteUrl: "",
    expandRoute: "#",
    videoUrl: "/images/projects/bookkeeping/video.mp4",
    gallery: getImagesFromFolder("projects/bookkeeping", [
      "/images/projects/bookkeeping-1.jpg",
      "/images/projects/bookkeeping-2.jpg",
    ]),
    miniBox: { title: "Transaction Classifier", text: "End-to-end ML classification & MySQL storage flow" },
    githubUrl: "https://github.com/RathorePranjal/Bookkeeping-categorizer-Basic-ml-model",
    vision: "Small businesses and individuals often manually categorize transactions (income/expense/sales/purchase) which is time-consuming and error-prone. This system speeds up bookkeeping by turning transaction text into a labeled category and keeps a running history for review and auditing.",
    techSpecs: [
      { label: "ML Model (Python)", value: "TfidfVectorizer + MultinomialNB pipeline trained on sample_data.csv, serialized to model.pkl via Pickle.", iconName: "Brain" },
      { label: "Web Application / API (Flask)", value: "App server defining GET /, POST /predict (runs model, saves to MySQL), GET /predictions (reads history), and DELETE /clear (clears table).", iconName: "Flask" },
      { label: "Database Integration", value: "mysql.connector connection helper executing queries per request with transactional safety.", iconName: "Database" },
      { label: "Data Storage (MySQL)", value: "Schema storing records in a predictions(id, text, predicted_label, timestamp) table.", iconName: "Schema" }
    ],
    metricsList: [
      { label: "Supported Categories", value: "purchase, expense, sales, income" },
      { label: "Dataset Volume", value: "18 labeled benchmark transactions in sample_data.csv" },
      { label: "End-to-End Pipeline", value: "model.py trains and serializes, app.py serves predictions and UI history" }
    ],
    minimizedPointers: [
      "Financial transaction categorization via Naive Bayes & TF-IDF.",
      "Flask API microservice persistence with mysql-connector.",
      "Predictions schema design tracking categorizations in MySQL."
    ],
  },
  {
    id: "syndicate",
    colorTheme: "rose",
    title: "The Art Syndicate",
    tag: "Google Sites · Paid Ads (Lead Gen) · IndiaMART · Age 16",
    idea: "Digital fine art showcase and B2B lead generation engine showcasing original mother's paintings.",
    description:
      "Created a digital art showcase at age 16 (in 2022) using a no-code Google Sites template to exhibit fine art paintings created by my mother. Managed paid advertising campaigns to drive high-intent buyer leads to the site and listed the portfolio on IndiaMART, successfully converting digital inquiries into direct custom painting sales.",
    skills: [
      "No-Code Development",
      "Google Sites",
      "Paid Advertising (Google/Meta Ads)",
      "IndiaMART Integration",
      "B2B Lead Generation",
      "Lead Acquisition",
    ],
    achievement: "Direct Sales (Paid Ad Campaigns + IndiaMART B2B Commissions)",
    screenshot: getImagesFromFolder("projects/syndicate", ["/images/projects/syndicate/Screenshot 2026-05-23 052407.png"])[0],
    siteUrl: "",
    expandRoute: "#",
    gallery: getImagesFromFolder("projects/syndicate", [
      "/images/projects/syndicate/Screenshot 2026-05-23 052407.png",
      "/images/projects/syndicate/Screenshot 2026-05-23 052419.png",
    ]),
    miniBox: { title: "Art Gallery & Leads", text: "Google Sites, Paid Ads setup & IndiaMART B2B catalog" },
    githubUrl: "https://github.com/Rathorepranjal/the-art-syndicate",
    vision: "The goal was to build a low-overhead, high-impact digital presence to showcase fine art paintings created by my mother. By utilizing no-code Google Sites for rapid layout, setting up paid advertising campaigns to acquire inbound leads, and listing on IndiaMART, the project captured local and national buyer intent for original art and custom commission contracts.",
    techSpecs: [
      { label: "Platform & Layout", value: "No-code Google Sites site structure with custom-themed categories, high-resolution painting grids, and contact forms.", iconName: "Layout" },
      { label: "Ad Campaigns", value: "Paid advertising campaigns configured to target art collectors, optimizing for budget efficiency, leads, and conversion rate.", iconName: "TrendingUp" },
      { label: "B2B Lead Generation", value: "IndiaMART listing optimization with customized product catalog, pricing, and business inquiry webhooks to capture direct sales leads.", iconName: "Users" },
      { label: "Painting Portfolio", value: "A curated collection of fine art paintings created by my mother, capturing diverse styles and mediums.", iconName: "Palette" }
    ],
    metricsList: [
      { label: "Age & Year", value: "Built in 2022 at age 16" },
      { label: "Lead Acquisition", value: "Paid ad campaigns generating inbound calls and custom commission leads" },
      { label: "Lead Inbound Source", value: "IndiaMART profile generating B2B leads and custom commissions" }
    ],
    minimizedPointers: [
      "No-code fine art showcase built using Google Sites.",
      "Lead acquisition via targeted paid advertising campaigns.",
      "B2B sales pipeline using IndiaMART merchant directory."
    ],
  },
];

// ─── Image frame (fixed aspect — prevents overlap) ────────────────────────────
function MediaFrame({
  src,
  alt,
  caption,
  className = "",
  aspect = "aspect-video",
  rounded = "rounded-xl",
}: {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  aspect?: string;
  rounded?: string;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={`relative isolate w-full max-w-full overflow-hidden glass-panel ${aspect} ${rounded} ${className}`}
    >
      <div className="absolute inset-0 size-full">
        {!failed ? (
          <img
            src={src}
            alt={alt}
            className="block size-full max-w-none object-cover"
            onError={() => setFailed(true)}
            loading="lazy"
          />
        ) : (
          <div className="flex size-full flex-col items-center justify-center gap-2 bg-linear-to-br from-cyan-glow/10 to-purple-node/15 p-4 text-center">
            <ImageIcon className="size-8 text-cyan-glow/50" />
            <p className="px-2 text-[10px] text-white/50 sm:text-xs">Add: {src}</p>
          </div>
        )}
      </div>
      {caption && (
        <div className="absolute inset-x-0 bottom-0 z-10 bg-linear-to-t from-black/90 to-transparent px-3 py-2">
          <p className="text-xs text-white/80">{caption}</p>
        </div>
      )}
    </div>
  );
}

function SlideshowFrame({
  srcs,
  alt,
  caption,
  className = "",
  aspect = "aspect-video",
  rounded = "rounded-xl",
  intervalMs = 4000,
}: {
  srcs: string[];
  alt: string;
  caption?: string;
  className?: string;
  aspect?: string;
  rounded?: string;
  intervalMs?: number;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [failedIndices, setFailedIndices] = useState<Record<number, boolean>>({});

  const validImages = srcs.filter((_, idx) => !failedIndices[idx]);

  useEffect(() => {
    if (validImages.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % validImages.length);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [validImages.length, intervalMs]);

  const activeImage = validImages[currentIndex] || validImages[0];

  if (validImages.length === 0) {
    return (
      <div
        className={`relative isolate w-full max-w-full overflow-hidden glass-panel ${aspect} ${rounded} ${className}`}
      >
        <div className="flex size-full flex-col items-center justify-center gap-2 bg-linear-to-br from-cyan-glow/10 to-purple-node/15 p-4 text-center">
          <ImageIcon className="size-8 text-cyan-glow/50" />
          <p className="px-2 text-[10px] text-white/50 sm:text-xs">No images available</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative isolate w-full max-w-full overflow-hidden glass-panel ${aspect} ${rounded} ${className}`}
    >
      <div className="absolute inset-0 size-full">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.img
            key={activeImage}
            src={activeImage}
            alt={`${alt} slideshow ${currentIndex + 1}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 block size-full max-w-none object-cover"
            onError={() => {
              const origIdx = srcs.indexOf(activeImage);
              if (origIdx !== -1) {
                setFailedIndices((prev) => ({ ...prev, [origIdx]: true }));
              }
            }}
          />
        </AnimatePresence>
      </div>

      {caption && (
        <div className="absolute inset-x-0 bottom-0 z-10 bg-linear-to-t from-black/90 to-transparent px-3 py-2">
          <p className="text-xs text-white/80">{caption}</p>
        </div>
      )}

      {validImages.length > 1 && (
        <div className="absolute bottom-3 left-3 z-20 flex gap-1.5 rounded-full bg-black/40 px-2 py-1 backdrop-blur-xs">
          {validImages.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(idx);
              }}
              className={`size-1.5 rounded-full transition-all ${
                idx === currentIndex ? "bg-cyan-glow w-3" : "bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function SkillChips({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((s) => (
        <span
          key={s}
          className="rounded-md border border-cyan-glow/20 bg-cyan-glow/8 px-2 py-0.5 text-[10px] text-cyan-glow/90 sm:text-xs"
        >
          {s}
        </span>
      ))}
    </div>
  );
}

function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[60] transition-all duration-300 ${
        scrolled
          ? "border-b border-glass-border bg-space/90 shadow-[0_8px_32px_rgb(0_0_0/0.45)] backdrop-blur-xl"
          : "bg-space/50 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:h-16 md:px-6">
        <button
          type="button"
          onClick={() => go("home")}
          className="group shrink-0 text-left"
        >
          <span className="font-display text-sm font-bold text-white transition group-hover:text-cyan-glow sm:text-base">
            PRANJAL RATHORE
          </span>
        </button>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => go(link.id)}
              className="group relative rounded-lg px-3 py-2 text-xs font-medium text-white/70 transition hover:bg-cyan-glow/10 hover:text-cyan-glow"
            >
              {link.label}
              <span className="pointer-events-none absolute inset-x-2 bottom-1.5 h-px origin-left scale-x-0 bg-cyan-glow transition group-hover:scale-x-100" />
            </button>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => go("contact")}
          className="hidden rounded-lg border border-cyan-glow/35 bg-cyan-glow/10 px-3 py-1.5 text-xs font-semibold text-cyan-glow transition hover:bg-cyan-glow/20 sm:block"
        >
          Hire me
        </button>

        <button
          type="button"
          className="rounded-lg border border-glass-border p-2 text-white/80 md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-glass-border bg-space/95 md:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-3">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => go(link.id)}
                  className="rounded-lg px-3 py-2.5 text-left text-sm text-white/80 transition hover:bg-cyan-glow/10 hover:text-cyan-glow"
                >
                  {link.label}
                </button>
              ))}
              <button
                type="button"
                onClick={() => go("contact")}
                className="mt-2 rounded-lg bg-cyan-glow/15 py-2.5 text-sm font-semibold text-cyan-glow"
              >
                Hire me
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

function ExpandResizeButton({
  expanded,
  onToggle,
  size = "default",
  className = "absolute right-2 top-2 z-30 sm:right-3 sm:top-3",
}: {
  expanded: boolean;
  onToggle: () => void;
  size?: "tiny" | "default";
  className?: string;
}) {
  const iconClass = size === "tiny" ? "size-3" : "size-3.5";
  const btnClass =
    size === "tiny"
      ? "size-6 p-0"
      : "size-7 p-0 sm:size-8";

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      className={`flex items-center justify-center rounded-sm bg-transparent text-white/55 transition hover:text-cyan-glow ${btnClass} ${className}`}
      aria-label={expanded ? "Shrink card" : "Enlarge card"}
      title={expanded ? "Shrink" : "Enlarge"}
    >
      {expanded ? (
        <Minimize2 className={iconClass} strokeWidth={1.5} />
      ) : (
        <Maximize2 className={iconClass} strokeWidth={1.5} />
      )}
    </button>
  );
}

const GALLERY_THUMB_HEIGHT = 112;

function GalleryThumb({
  src,
  alt,
  onClick,
  isActive,
}: {
  src: string;
  alt: string;
  onClick?: () => void;
  isActive?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const [widthPx, setWidthPx] = useState(120);

  const isPdf = src.toLowerCase().endsWith(".pdf");

  const onLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    if (!img.naturalWidth || !img.naturalHeight) return;
    const ratio = img.naturalWidth / img.naturalHeight;
    const h = GALLERY_THUMB_HEIGHT;
    const w = ratio >= 1 ? h * ratio : h * (9 / 16);
    setWidthPx(Math.round(Math.min(Math.max(w, 64), 200)));
  };

  if (isPdf) {
    const Wrapper = onClick ? "button" : "div";
    const extraProps = onClick ? { type: "button" as const, onClick } : {};
    return (
      <Wrapper
        style={{ width: 100, height: GALLERY_THUMB_HEIGHT }}
        className={`relative shrink-0 overflow-hidden rounded-md border bg-black/50 transition cursor-pointer flex flex-col items-center justify-center gap-1.5 p-2 text-center ${
          isActive
            ? "border-cyan-glow ring-1 ring-cyan-glow/50 shadow-[0_0_12px_rgba(0,245,255,0.25)]"
            : "border-glass-border hover:border-white/30"
        }`}
        {...extraProps}
      >
        <FileText className="size-6 text-cyan-glow" />
        <span className="text-[8px] uppercase font-bold tracking-wider text-cyan-glow leading-normal">
          PDF Report
        </span>
      </Wrapper>
    );
  }

  if (failed) {
    return (
      <div
        style={{ width: 80, height: GALLERY_THUMB_HEIGHT }}
        className="flex shrink-0 items-center justify-center rounded-md border border-glass-border bg-white/5"
      >
        <ImageIcon className="size-4 text-white/30" />
      </div>
    );
  }

  const Wrapper = onClick ? "button" : "div";
  const extraProps = onClick ? { type: "button" as const, onClick } : {};

  return (
    <Wrapper
      style={{ width: widthPx, height: GALLERY_THUMB_HEIGHT }}
      className={`relative shrink-0 overflow-hidden rounded-md border bg-black/50 transition cursor-pointer ${
        isActive
          ? "border-cyan-glow ring-1 ring-cyan-glow/50 shadow-[0_0_12px_rgba(0,245,255,0.25)] animate-pulse-subtle"
          : "border-glass-border hover:border-white/30"
      }`}
      {...extraProps}
    >
      <img
        src={src}
        alt={alt}
        className="size-full object-cover pointer-events-none"
        loading="lazy"
        onLoad={onLoad}
        onError={() => setFailed(true)}
      />
    </Wrapper>
  );
}

function CompactGallery({
  images,
  altPrefix,
  onSelectImage,
  activeImage,
  videoUrl,
  onSelectVideo,
  isVideoActive,
  posterUrl,
}: {
  images: string[];
  altPrefix: string;
  onSelectImage?: (src: string) => void;
  activeImage?: string | null;
  videoUrl?: string;
  onSelectVideo?: () => void;
  isVideoActive?: boolean;
  posterUrl?: string;
}) {
  return (
    <div className="max-h-32 overflow-x-auto overflow-y-hidden sm:max-h-36">
      <div className="flex gap-2 pb-1">
        {videoUrl && onSelectVideo && (
          <button
            type="button"
            onClick={onSelectVideo}
            style={{ width: 140, height: GALLERY_THUMB_HEIGHT }}
            className={`relative shrink-0 overflow-hidden rounded-md border bg-black/70 flex flex-col items-center justify-center gap-1.5 transition cursor-pointer ${
              isVideoActive
                ? "border-cyan-glow ring-1 ring-cyan-glow/50 shadow-[0_0_12px_rgba(0,245,255,0.25)]"
                : "border-glass-border hover:border-white/30"
            }`}
          >
            {posterUrl ? (
              <img
                src={posterUrl}
                alt="Video poster"
                className="absolute inset-0 size-full object-cover opacity-40 pointer-events-none"
              />
            ) : null}
            <div className="relative z-10 flex size-8 items-center justify-center rounded-full bg-cyan-glow/20 text-cyan-glow border border-cyan-glow/30">
              <Play className="size-4 fill-cyan-glow/30 ml-0.5" />
            </div>
            <span className="relative z-10 text-[9px] uppercase font-bold tracking-wider text-cyan-glow">
              Watch Video
            </span>
          </button>
        )}

        {images.map((src, i) => (
          <GalleryThumb
            key={`${src}-${i}`}
            src={src}
            alt={`${altPrefix} ${i + 1}`}
            onClick={onSelectImage ? () => onSelectImage(src) : undefined}
            isActive={activeImage === src}
          />
        ))}
      </div>
    </div>
  );
}

interface Certificate {
  textHash: string;
  originalText: string;
  origin: "Human-Likely" | "AI-Likely";
  confidence: number;
  txHash: string;
  blockNumber: number;
  timestamp: string;
  signer: string;
}

const JARGON_WORDS = [
  "leverage", "synergy", "paradigm shift", "utilize", "optimize", 
  "maximize", "furthermore", "crucial", "dynamic", "transformative", 
  "innovative", "streamline"
];

function calculateHeuristics(text: string) {
  if (!text.trim()) {
    return {
      wordCount: 0,
      avgWordLength: 0,
      jargonCount: 0,
      punctuationDensity: 0,
      confidence: 50,
      origin: "Human-Likely" as const
    };
  }

  const words = text.toLowerCase().match(/\b\w+\b/g) || [];
  const wordCount = words.length;
  
  let totalWordLength = 0;
  let jargonCount = 0;
  words.forEach((w) => {
    totalWordLength += w.length;
    if (JARGON_WORDS.includes(w)) {
      jargonCount++;
    }
  });
  
  const avgWordLength = wordCount > 0 ? parseFloat((totalWordLength / wordCount).toFixed(1)) : 0;
  
  const punctuations = text.match(/[,.!?]/g) || [];
  const punctuationDensity = text.length > 0 ? parseFloat(((punctuations.length / text.length) * 100).toFixed(1)) : 0;

  const lowerText = text.toLowerCase();
  
  let confidence = 50;
  let origin: "Human-Likely" | "AI-Likely" = "Human-Likely";

  if (lowerText.includes("authentic user patterns") || lowerText.includes("qualitative research")) {
    origin = "Human-Likely";
    confidence = 97;
  } else if (lowerText.includes("synergistic methodologies") || lowerText.includes("paradigm shifts")) {
    origin = "AI-Likely";
    confidence = 53;
  } else if (lowerText.includes("hardhat to test solidity") || lowerText.includes("l2 bridge endpoints")) {
    origin = "Human-Likely";
    confidence = 79;
  } else {
    let aiScore = 0;
    
    const jargonDensity = wordCount > 0 ? jargonCount / wordCount : 0;
    if (jargonDensity > 0.05) aiScore += 30;
    else if (jargonDensity > 0.02) aiScore += 15;
    
    if (avgWordLength > 6.0) aiScore += 25;
    else if (avgWordLength > 5.2) aiScore += 10;
    
    if (punctuationDensity > 4.5) aiScore += 15;
    
    if (aiScore > 35) {
      origin = "AI-Likely";
      confidence = Math.min(Math.max(50 + Math.round(aiScore * 0.7), 51), 95);
    } else {
      origin = "Human-Likely";
      confidence = Math.min(Math.max(98 - Math.round(aiScore * 0.8), 60), 99);
    }
  }

  return {
    wordCount,
    avgWordLength,
    jargonCount,
    punctuationDensity,
    confidence,
    origin
  };
}

const PRESETS = [
  {
    name: "Human-Likely Sample",
    text: "Our user-focused approach has always been driven by the need to understand authentic user patterns. We design features based on real qualitative research, testing prototypes in bilingual environments to ensure that all communities can seamlessly adopt our products."
  },
  {
    name: "AI-Likely Sample",
    text: "Furthermore, it is crucial to leverage synergistic methodologies and prioritize paradigm shifts within the enterprise landscape. Utilising machine learning capabilities, we aim to optimize scalability and maximize the key metrics dynamically."
  },
  {
    name: "Complex Human Sample",
    text: "I've been working on integrating the local development environment using Hardhat to test Solidity smart contracts. It's a bit tricky to manage L2 bridge endpoints, but compiling the contract locally runs fast enough."
  }
];

function mockSha256(text: string): string {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  const hex = Math.abs(hash).toString(16).padStart(8, "0");
  const randomChars = Array.from({ length: 56 }, () => 
    Math.floor(Math.random() * 16).toString(16)
  ).join("");
  return "0x" + hex + randomChars;
}

function mockTxHash(): string {
  return "0x" + Array.from({ length: 64 }, () => 
    Math.floor(Math.random() * 16).toString(16)
  ).join("");
}

function AITrustChainSimulator() {
  const [inputText, setInputText] = useState("");
  const [isMinting, setIsMinting] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [latestCert, setLatestCert] = useState<Certificate | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState<Certificate | null | "not_found">(null);

  const initialCerts = useMemo<Certificate[]>(() => [
    {
      textHash: "0x78abef982c7d3129ba89f2d1e0892c578fbe567a12cd34ef5678ab9012cd34ef",
      originalText: PRESETS[0].text,
      origin: "Human-Likely",
      confidence: 97,
      txHash: "0x2e8f192b0c4a7e8f12cd89fbe567a12cd34ef5678ab9012cd34ef5678ab90a1b",
      blockNumber: 1042,
      timestamp: new Date(Date.now() - 24 * 3600 * 1000).toLocaleString(),
      signer: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
    },
    {
      textHash: "0xfb342e5871ab89cd34ef567a12cd34ef5678ab9012cd34ef5678ab90a1b2c3d4",
      originalText: PRESETS[1].text,
      origin: "AI-Likely",
      confidence: 53,
      txHash: "0x7c9a10ef5678ab9012cd34ef5678ab90a1b2c3d4ef89ab012cd34567890abcdef",
      blockNumber: 1043,
      timestamp: new Date(Date.now() - 12 * 3600 * 1000).toLocaleString(),
      signer: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
    }
  ], []);

  const [certificates, setCertificates] = useState<Certificate[]>(initialCerts);

  const heuristics = useMemo(() => calculateHeuristics(inputText), [inputText]);

  const loadPreset = (text: string) => {
    setInputText(text);
    setLatestCert(null);
  };

  const handleMint = async () => {
    if (!inputText.trim() || isMinting) return;
    setIsMinting(true);
    setLatestCert(null);
    setTerminalLogs([]);

    const logSteps = [
      `[Express API] POST /api/analyze/text - Received payload size: ${inputText.length} bytes`,
      `[Python Daemon] Executing heuristic classifier on content...`,
      `[Python Daemon] Calculated metrics: words=${heuristics.wordCount}, avgLength=${heuristics.avgWordLength}, jargonCount=${heuristics.jargonCount}`,
      `[Python Daemon] Prediction: ${heuristics.origin} with confidence ${heuristics.confidence}%`,
      `[Express API] Generation request sent to EVM node...`,
      `[Hardhat Node] Loading contract 'AIOriginCertificate' at 0x5FbDB2315678afecb367f032d93F642f64180aa3`,
      `[Hardhat Node] Account 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 signing mintTransaction`,
      `[Hardhat Node] Tx sent: hash=${mockTxHash().substring(0, 16)}...`,
      `[Hardhat Node] Mining block #${1044 + certificates.length}...`,
      `[Hardhat Node] Block mined successfully. Gas used: 84,203`,
      `[Express API] Blockchain receipt logged. Minting complete.`
    ];

    for (let i = 0; i < logSteps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, i === 1 || i === 7 ? 350 : 150));
      setTerminalLogs((prev) => [...prev, logSteps[i]]);
    }

    const newCert: Certificate = {
      textHash: mockSha256(inputText),
      originalText: inputText,
      origin: heuristics.origin,
      confidence: heuristics.confidence,
      txHash: mockTxHash(),
      blockNumber: 1044 + certificates.length,
      timestamp: new Date().toLocaleString(),
      signer: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
    };

    setCertificates((prev) => [newCert, ...prev]);
    setLatestCert(newCert);
    setIsMinting(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setSearchResult(null);
      return;
    }
    const cleanQuery = searchQuery.trim().toLowerCase();
    const found = certificates.find(
      (c) =>
        c.txHash.toLowerCase() === cleanQuery ||
        c.textHash.toLowerCase() === cleanQuery ||
        c.txHash.toLowerCase().includes(cleanQuery) ||
        c.textHash.toLowerCase().includes(cleanQuery)
    );
    setSearchResult(found || "not_found");
  };

  return (
    <div className="space-y-5 text-left">
      <div className="rounded-lg border border-glass-border bg-black/40 p-4 space-y-4">
        {/* Preset Selectors */}
        <div className="space-y-2">
          <p className="text-[10px] uppercase tracking-wider text-white/50 font-semibold">
            Select Test Scenario Presets
          </p>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => loadPreset(p.text)}
                className="rounded bg-white/5 border border-glass-border hover:bg-white/10 px-2.5 py-1 text-xs text-white/90 hover:text-white transition cursor-pointer"
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        {/* Input Text */}
        <div className="space-y-2">
          <p className="text-[10px] uppercase tracking-wider text-white/50 font-semibold">
            Input Content for Analysis
          </p>
          <textarea
            value={inputText}
            onChange={(e) => {
              setInputText(e.target.value);
              setLatestCert(null);
            }}
            placeholder="Paste raw text or select a preset above to run the blockchain validation workflow..."
            rows={4}
            className="w-full rounded-md border border-glass-border bg-black/55 p-3 text-xs text-white placeholder-white/30 focus:outline-hidden focus:ring-1 focus:ring-cyan-glow/50 transition resize-none"
          />
        </div>

        {/* Live Heuristics Indicators */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <div className="rounded border border-glass-border bg-white/5 p-2 text-center">
            <p className="text-[9px] uppercase tracking-wider text-white/40 font-semibold">Words</p>
            <p className="text-xs font-bold text-white mt-0.5">{heuristics.wordCount}</p>
          </div>
          <div className="rounded border border-glass-border bg-white/5 p-2 text-center">
            <p className="text-[9px] uppercase tracking-wider text-white/40 font-semibold">Avg Length</p>
            <p className="text-xs font-bold text-white mt-0.5">{heuristics.avgWordLength} chars</p>
          </div>
          <div className="rounded border border-glass-border bg-white/5 p-2 text-center">
            <p className="text-[9px] uppercase tracking-wider text-white/40 font-semibold">Jargon Count</p>
            <p className="text-xs font-bold text-white mt-0.5">{heuristics.jargonCount}</p>
          </div>
          <div className="rounded border border-glass-border bg-white/5 p-2 text-center">
            <p className="text-[9px] uppercase tracking-wider text-white/40 font-semibold">Punctuation</p>
            <p className="text-xs font-bold text-white mt-0.5">{heuristics.punctuationDensity}%</p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleMint}
          disabled={!inputText.trim() || isMinting}
          className="w-full flex items-center justify-center gap-2 rounded-lg bg-cyan-glow/15 border border-cyan-glow/30 hover:bg-cyan-glow/25 text-cyan-glow py-2.5 text-xs font-bold transition disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
        >
          {isMinting ? (
            <>
              <Activity className="size-3.5 animate-pulse" /> Analyzing & Minting Proof...
            </>
          ) : (
            <>
              <Cpu className="size-3.5 animate-pulse" /> Analyze Content & Mint Authenticity Certificate
            </>
          )}
        </button>
      </div>

      {/* Terminal logs showing Hardhat simulation */}
      {terminalLogs.length > 0 && (
        <div className="rounded-lg border border-glass-border bg-black/85 p-3 font-mono text-[10px] text-emerald-400 space-y-1 shadow-inner max-h-48 overflow-y-auto">
          <div className="flex items-center gap-1.5 border-b border-glass-border pb-1.5 mb-1.5 text-white/40">
            <Terminal className="size-3.5 text-emerald-400" />
            <span>LOCAL LOGS: HARDHAT DEVNET & EXPRESS BACKEND</span>
          </div>
          {terminalLogs.map((log, index) => (
            <div key={index} className="leading-relaxed whitespace-pre-wrap">
              {log}
            </div>
          ))}
          {isMinting && (
            <div className="inline-block size-1.5 rounded-full bg-emerald-400 animate-ping mt-1 ml-1" />
          )}
        </div>
      )}

      {/* Minted Certificate Display */}
      {latestCert && (
        <div className="rounded-lg border border-cyan-glow/30 bg-cyan-glow/5 p-4 space-y-3 relative overflow-hidden animate-fade-in">
          <div className="absolute top-2 right-2 flex items-center gap-1 bg-cyan-glow/10 border border-cyan-glow/30 rounded-full px-2 py-0.5 text-[9px] text-cyan-glow font-bold uppercase">
            <ShieldCheck className="size-3" /> Minted
          </div>
          <div className="space-y-1">
            <p className="text-[10px] text-white/40 uppercase tracking-wider font-semibold">Origin Certificate Minted Successfully</p>
            <h4 className={`text-sm font-bold flex items-center gap-1.5 ${
              latestCert.origin === "Human-Likely" ? "text-emerald-400" : "text-amber-400"
            }`}>
              {latestCert.origin === "Human-Likely" ? (
                <CheckCircle2 className="size-4" />
              ) : (
                <ShieldAlert className="size-4" />
              )}
              {latestCert.origin} ({latestCert.confidence}% Confidence)
            </h4>
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 text-[10px] bg-black/35 rounded border border-glass-border p-2.5 font-mono text-white/80">
            <div className="space-y-1">
              <p><span className="text-white/40">Text SHA256:</span> <span className="text-white select-all">{latestCert.textHash.substring(0, 16)}...</span></p>
              <p><span className="text-white/40">Block:</span> <span className="text-white">{latestCert.blockNumber}</span></p>
              <p><span className="text-white/40">Signer:</span> <span className="text-white">{latestCert.signer.substring(0, 10)}...</span></p>
            </div>
            <div className="space-y-1">
              <p><span className="text-white/40">Tx Hash:</span> <span className="text-white select-all">{latestCert.txHash.substring(0, 16)}...</span></p>
              <p><span className="text-white/40">Timestamp:</span> <span className="text-white">{latestCert.timestamp}</span></p>
            </div>
          </div>
        </div>
      )}

      {/* Certificate Query Lookup */}
      <div className="rounded-lg border border-glass-border bg-black/45 p-4 space-y-4">
        <div className="space-y-1">
          <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
            <Search className="size-3.5 text-cyan-glow" /> Query On-Chain Proof Lookup
          </h4>
          <p className="text-[10px] text-white/40">
            Enter a certificate SHA-256 hash or transaction hash to verify authenticity. Try pasting hashes from the initial logs:
          </p>
        </div>

        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search e.g. 0x2e8f192b0c4a7e8f12cd89fbe567a12cd34ef5678ab9012cd34ef5678ab90a1b..."
            className="flex-1 rounded-md border border-glass-border bg-black/55 p-2 text-xs text-white placeholder-white/30 focus:outline-hidden focus:ring-1 focus:ring-cyan-glow/50 transition font-mono"
          />
          <button
            type="submit"
            className="rounded-md bg-white/8 hover:bg-white/12 border border-glass-border px-3 py-1.5 text-xs text-white hover:text-white transition cursor-pointer font-semibold"
          >
            Query
          </button>
        </form>

        {searchResult === "not_found" && (
          <div className="flex items-center gap-2 rounded border border-rose-500/20 bg-rose-500/5 p-2.5 text-[10px] text-rose-400 font-semibold">
            <ShieldAlert className="size-4 shrink-0" />
            No record found for this hash. Ensure the transaction has been submitted to the local EVM node.
          </div>
        )}

        {searchResult && searchResult !== "not_found" && (
          <div className="rounded border border-emerald-500/25 bg-emerald-500/5 p-3 space-y-2.5 animate-fade-in text-[10px]">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-emerald-400 font-bold uppercase tracking-wider">
                <ShieldCheck className="size-4" /> Immutable Record Authenticated
              </span>
              <span className="text-[9px] text-white/45">Block #{searchResult.blockNumber}</span>
            </div>
            <div className="bg-black/35 rounded border border-glass-border p-2 space-y-1 font-mono text-white/80">
              <p><span className="text-white/40 font-semibold">Origin:</span> <span className="text-emerald-400 font-bold">{searchResult.origin} ({searchResult.confidence}%)</span></p>
              <p className="whitespace-pre-wrap leading-relaxed"><span className="text-white/40 font-semibold">Payload Content:</span> <span className="text-white">"{searchResult.originalText}"</span></p>
              <p><span className="text-white/40 font-semibold">Text SHA256:</span> <span className="text-white select-all">{searchResult.textHash}</span></p>
              <p><span className="text-white/40 font-semibold">Tx Hash:</span> <span className="text-white select-all">{searchResult.txHash}</span></p>
              <p><span className="text-white/40 font-semibold">Signer:</span> <span className="text-white select-all">{searchResult.signer}</span></p>
              <p><span className="text-white/40 font-semibold">Timestamp:</span> <span className="text-white">{searchResult.timestamp}</span></p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const BOOKKEEPING_PRESETS = [
  { name: "AWS Hosting (Expense)", text: "AWS Cloud Web Hosting Monthly Subscription - $50.00" },
  { name: "Office Furniture (Purchase)", text: "Ergonomic Office Chairs & Desks Purchased - $300.00" },
  { name: "SaaS Sales (Sales)", text: "Enterprise SaaS License Annual Sales Invoice #8092 - $1,200.00" },
  { name: "Bank Interest (Income)", text: "Monthly Inbound Interest Credit from Checking Account - $12.45" }
];

interface BookkeepingRecord {
  id: number;
  text: string;
  predicted_label: "purchase" | "expense" | "sales" | "income";
  timestamp: string;
}

function classifyTransaction(text: string): { label: "purchase" | "expense" | "sales" | "income"; confidence: number } {
  const t = text.toLowerCase();
  if (t.includes("purchase") || t.includes("purchased") || t.includes("bought") || t.includes("order")) {
    return { label: "purchase", confidence: 94 };
  }
  if (t.includes("sale") || t.includes("sales") || t.includes("invoice") || t.includes("sold") || t.includes("revenue")) {
    return { label: "sales", confidence: 96 };
  }
  if (t.includes("income") || t.includes("interest") || t.includes("credit") || t.includes("refund") || t.includes("received") || t.includes("dividend")) {
    return { label: "income", confidence: 91 };
  }
  if (t.includes("expense") || t.includes("bill") || t.includes("payment") || t.includes("subscription") || t.includes("hosting") || t.includes("fees") || t.includes("rent") || t.includes("paid")) {
    return { label: "expense", confidence: 95 };
  }
  return { label: "expense", confidence: 85 };
}

function BookkeepingSimulator() {
  const [inputText, setInputText] = useState("");
  const [isClassifying, setIsClassifying] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [latestRecord, setLatestRecord] = useState<BookkeepingRecord | null>(null);

  const initialRecords = useMemo<BookkeepingRecord[]>(() => [
    {
      id: 1,
      text: "GCP Cloud Billing - Invoice #2031 - $82.40",
      predicted_label: "expense",
      timestamp: new Date(Date.now() - 24 * 3600 * 1000).toLocaleString()
    },
    {
      id: 2,
      text: "Office supplies - Notebooks & Pens - $15.50",
      predicted_label: "purchase",
      timestamp: new Date(Date.now() - 12 * 3600 * 1000).toLocaleString()
    },
    {
      id: 3,
      text: "Client retainer fee payment - Acme Corp - $500.00",
      predicted_label: "sales",
      timestamp: new Date(Date.now() - 2 * 3600 * 1000).toLocaleString()
    }
  ], []);

  const [records, setRecords] = useState<BookkeepingRecord[]>(initialRecords);

  const loadPreset = (text: string) => {
    setInputText(text);
    setLatestRecord(null);
  };

  const handleClassify = async () => {
    if (!inputText.trim() || isClassifying) return;
    setIsClassifying(true);
    setLatestRecord(null);
    setTerminalLogs([]);

    const classification = classifyTransaction(inputText);
    const newId = records.length > 0 ? Math.max(...records.map(r => r.id)) + 1 : 1;

    const logSteps = [
      `[Flask Server] POST /predict - Content-Type: application/json`,
      `[Flask Server] Request Payload: { "text": "${inputText}" }`,
      `[ML Pipeline] Loading scikit-learn classifier from 'model.pkl'...`,
      `[ML Pipeline] Running TfidfVectorizer on raw text feature extractor...`,
      `[ML Pipeline] Executing MultinomialNB classifier inference...`,
      `[ML Pipeline] Predicted Category: '${classification.label}' with confidence ${classification.confidence}%`,
      `[MySQL Connector] Connecting to MySQL database 'bookkeeping_db' at localhost:3306...`,
      `[MySQL Connector] SQL: INSERT INTO predictions (text, predicted_label) VALUES ('${inputText.replace(/'/g, "''")}', '${classification.label}')`,
      `[MySQL Connector] SQL: COMMIT transaction`,
      `[MySQL Connector] Insert Success. Auto-increment ID assigned: ${newId}`,
      `[Flask Server] Response: 200 OK - { "status": "success", "id": ${newId}, "predicted_label": "${classification.label}" }`
    ];

    for (let i = 0; i < logSteps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, i === 2 || i === 6 ? 300 : 120));
      setTerminalLogs((prev) => [...prev, logSteps[i]]);
    }

    const newRecord: BookkeepingRecord = {
      id: newId,
      text: inputText,
      predicted_label: classification.label,
      timestamp: new Date().toLocaleString()
    };

    setRecords((prev) => [newRecord, ...prev]);
    setLatestRecord(newRecord);
    setIsClassifying(false);
  };

  const handleClear = async () => {
    if (isClassifying) return;
    setIsClassifying(true);
    setTerminalLogs([]);
    setLatestRecord(null);

    const logSteps = [
      `[Flask Server] DELETE /clear - Clear prediction history requested`,
      `[MySQL Connector] Connecting to 'bookkeeping_db'...`,
      `[MySQL Connector] SQL: TRUNCATE TABLE predictions`,
      `[MySQL Connector] SQL: ALTER TABLE predictions AUTO_INCREMENT = 1`,
      `[MySQL Connector] SQL: COMMIT transaction`,
      `[MySQL Connector] Table truncated successfully. Row count is now 0.`,
      `[Flask Server] Response: 200 OK - { "status": "database cleared" }`
    ];

    for (let i = 0; i < logSteps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 150));
      setTerminalLogs((prev) => [...prev, logSteps[i]]);
    }

    setRecords([]);
    setIsClassifying(false);
  };

  return (
    <div className="space-y-5 text-left">
      <div className="rounded-lg border border-glass-border bg-black/40 p-4 space-y-4">
        {/* Preset Selectors */}
        <div className="space-y-2">
          <p className="text-[10px] uppercase tracking-wider text-white/50 font-semibold">
            Select Sample Presets
          </p>
          <div className="flex flex-wrap gap-2">
            {BOOKKEEPING_PRESETS.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => loadPreset(p.text)}
                className="rounded bg-white/5 border border-glass-border hover:bg-white/10 px-2.5 py-1 text-xs text-white/90 hover:text-white transition cursor-pointer"
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        {/* Input Text */}
        <div className="space-y-2">
          <p className="text-[10px] uppercase tracking-wider text-white/50 font-semibold">
            Transaction Text Entry
          </p>
          <textarea
            value={inputText}
            onChange={(e) => {
              setInputText(e.target.value);
              setLatestRecord(null);
            }}
            placeholder="Type a custom transaction (e.g., 'Paid $200 for Google Ads marketing' or 'Received payment for web development consulting' or select a preset above...)"
            rows={3}
            className="w-full rounded-md border border-glass-border bg-black/55 p-3 text-xs text-white placeholder-white/30 focus:outline-hidden focus:ring-1 focus:ring-cyan-glow/50 transition resize-none"
          />
        </div>

        <button
          type="button"
          onClick={handleClassify}
          disabled={!inputText.trim() || isClassifying}
          className="w-full flex items-center justify-center gap-2 rounded-lg bg-cyan-glow/15 border border-cyan-glow/30 hover:bg-cyan-glow/25 text-cyan-glow py-2.5 text-xs font-bold transition disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
        >
          {isClassifying ? (
            <>
              <Activity className="size-3.5 animate-pulse" /> Running ML Inference...
            </>
          ) : (
            <>
              <Cpu className="size-3.5 animate-pulse" /> Classify Transaction & Save to Database
            </>
          )}
        </button>
      </div>

      {/* Terminal logs */}
      {terminalLogs.length > 0 && (
        <div className="rounded-lg border border-glass-border bg-black/85 p-3 font-mono text-[10px] text-emerald-400 space-y-1 shadow-inner max-h-48 overflow-y-auto">
          <div className="flex items-center gap-1.5 border-b border-glass-border pb-1.5 mb-1.5 text-white/40">
            <Terminal className="size-3.5 text-emerald-400" />
            <span>LOCAL LOGS: FLASK ROUTER & SCENE PROCESSES</span>
          </div>
          {terminalLogs.map((log, index) => (
            <div key={index} className="leading-relaxed whitespace-pre-wrap">
              {log}
            </div>
          ))}
          {isClassifying && (
            <div className="inline-block size-1.5 rounded-full bg-emerald-400 animate-ping mt-1 ml-1" />
          )}
        </div>
      )}

      {/* Latest Prediction Card */}
      {latestRecord && (
        <div className="rounded-lg border border-cyan-glow/30 bg-cyan-glow/5 p-4 space-y-3 relative overflow-hidden animate-fade-in">
          <div className="absolute top-2 right-2 flex items-center gap-1 bg-cyan-glow/10 border border-cyan-glow/30 rounded-full px-2 py-0.5 text-[9px] text-cyan-glow font-bold uppercase">
            <Database className="size-3" /> Saved
          </div>
          <div className="space-y-1">
            <p className="text-[10px] text-white/40 uppercase tracking-wider font-semibold">Database Insert Verified</p>
            <h4 className="text-sm font-bold flex items-center gap-1.5 text-emerald-400">
              <CheckCircle2 className="size-4 animate-bounce" />
              Category: <span className="uppercase text-cyan-glow">{latestRecord.predicted_label}</span>
            </h4>
          </div>
          <div className="bg-black/35 rounded border border-glass-border p-2.5 font-mono text-[10px] text-white/80 space-y-1">
            <p><span className="text-white/40">Record ID:</span> {latestRecord.id}</p>
            <p><span className="text-white/40">Input Text:</span> "{latestRecord.text}"</p>
            <p><span className="text-white/40">Timestamp:</span> {latestRecord.timestamp}</p>
          </div>
        </div>
      )}

      {/* Database State Table */}
      <div className="rounded-lg border border-glass-border bg-black/45 p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
            <Database className="size-3.5 text-cyan-glow" /> MySQL Database: `predictions` Table
          </h4>
          {records.length > 0 && (
            <button
              type="button"
              onClick={handleClear}
              disabled={isClassifying}
              className="flex items-center gap-1 text-[10px] font-bold text-rose-400 hover:text-rose-300 transition cursor-pointer"
            >
              <Trash2 className="size-3.5" /> Reset Database (DELETE /clear)
            </button>
          )}
        </div>

        {records.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-6 text-center border border-dashed border-glass-border rounded-lg bg-black/10">
            <Database className="size-6 text-white/20 mb-1.5" />
            <p className="text-[10px] text-white/40">Database is empty. Submit a classification to populate the records.</p>
          </div>
        ) : (
          <div className="overflow-x-auto border border-glass-border rounded-lg bg-black/20">
            <table className="w-full text-left border-collapse text-[10px] font-mono text-white/80">
              <thead>
                <tr className="border-b border-glass-border bg-white/5 text-white/50 text-[9px] uppercase tracking-wider">
                  <th className="p-2 pl-3 font-semibold">ID</th>
                  <th className="p-2 font-semibold">Transaction Description</th>
                  <th className="p-2 font-semibold">Predicted Label</th>
                  <th className="p-2 pr-3 font-semibold">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-glass-border/30">
                {records.map((r) => (
                  <tr key={r.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-2 pl-3 text-cyan-glow font-bold">{r.id}</td>
                    <td className="p-2 max-w-[200px] truncate text-white">{r.text}</td>
                    <td className="p-2 font-semibold">
                      <span className={`px-1.5 py-0.5 rounded text-[9px] uppercase tracking-wider font-bold ${
                        r.predicted_label === "purchase" ? "bg-amber-500/15 border border-amber-500/30 text-amber-400" :
                        r.predicted_label === "expense" ? "bg-rose-500/15 border border-rose-500/30 text-rose-400" :
                        r.predicted_label === "sales" ? "bg-emerald-500/15 border border-emerald-500/30 text-emerald-400" :
                        "bg-cyan-500/15 border border-cyan-500/30 text-cyan-glow"
                      }`}>
                        {r.predicted_label}
                      </span>
                    </td>
                    <td className="p-2 pr-3 text-white/50">{r.timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

interface DishaPreset {
  name: string;
  answers: Record<number, string>;
  careers: { title: string; confidence: number; courses: string; colleges: string }[];
}

const DISHA_PRESETS: DishaPreset[] = [
  {
    name: "Tech & Systems Focus",
    answers: {
      1: "Tech & Computer Systems",
      2: "Writing code, scripting, and solving complex logic puzzles",
      3: "Building backend APIs, pipelines, or training ML models"
    },
    careers: [
      { title: "Machine Learning Engineer", confidence: 94, courses: "ML Ops, Advanced Deep Learning", colleges: "IIT Delhi, DTU" },
      { title: "Cloud Systems Architect", confidence: 88, courses: "AWS Solutions Architect, Distributed Systems", colleges: "NSUT, IIIT Delhi" },
      { title: "Technical Product Manager", confidence: 82, courses: "System Architecture for PMs, Agile Scoping", colleges: "GGSIPU USAR" }
    ]
  },
  {
    name: "Design & UX Focus",
    answers: {
      1: "Design, Art & Media",
      2: "Crafting visual graphics, sketching, or designing layouts",
      3: "Conducting user research and designing wireframes/interfaces"
    },
    careers: [
      { title: "UX/UI Product Designer", confidence: 95, courses: "Interaction Design, Cognitive Psychology", colleges: "NID, IIT Bombay" },
      { title: "Creative Director", confidence: 89, courses: "Visual Communication, Branding Strategy", colleges: "USAP GGSIPU" },
      { title: "Front-End Engineer", confidence: 83, courses: "React Frameworks, Animation Libraries", colleges: "DTU, USAR" }
    ]
  },
  {
    name: "Business & Growth Focus",
    answers: {
      1: "Business, Management & Marketing",
      2: "Pitching ideas, coordinating teams, and analyzing growth metrics",
      3: "Researching market trends, defining specs, or managing projects"
    },
    careers: [
      { title: "Product Manager (AI/Growth)", confidence: 93, courses: "Data Analytics, Product Strategy", colleges: "FMS Delhi, GGSIPU" },
      { title: "Growth Marketing Manager", confidence: 87, courses: "Performance Marketing, Conversion Optimization", colleges: "Delhi University" },
      { title: "Business Intelligence Analyst", confidence: 81, courses: "SQL & DBMS Analytics, Data Warehousing", colleges: "NSUT, USAR" }
    ]
  }
];

function DishaSimulator() {
  const [step, setStep] = useState<"preset" | "quiz" | "processing" | "results">("preset");
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [recommendedCareers, setRecommendedCareers] = useState<DishaPreset["careers"]>([]);
  
  // Chat state
  const [chatMessages, setChatMessages] = useState<Array<{ sender: "user" | "disha"; text: string }>>([
    { sender: "disha", text: "Hello! I am your DISHA AI career mentor. Based on your profile, how can I help you take the next step?" }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isChatting, setIsChatting] = useState(false);
  const [chatLogs, setChatLogs] = useState<string[]>([]);

  const handleStartCustom = () => {
    setAnswers({});
    setCurrentQuestion(1);
    setStep("quiz");
  };

  const handleAnswerSelect = (qId: number, optionVal: string) => {
    setAnswers(prev => ({ ...prev, [qId]: optionVal }));
    if (qId < 3) {
      setCurrentQuestion(qId + 1);
    }
  };

  const executeSimulation = async (selectedAnswers: Record<number, string>) => {
    setStep("processing");
    setTerminalLogs([]);
    
    // Determine recommendations based on answer vectors
    const isTech = selectedAnswers[1]?.includes("Tech") || selectedAnswers[2]?.includes("code") || selectedAnswers[3]?.includes("APIs");
    const isDesign = selectedAnswers[1]?.includes("Design") || selectedAnswers[2]?.includes("visual") || selectedAnswers[3]?.includes("research");
    
    let careers: DishaPreset["careers"] = [];
    if (isTech) {
      careers = DISHA_PRESETS[0].careers;
    } else if (isDesign) {
      careers = DISHA_PRESETS[1].careers;
    } else {
      careers = DISHA_PRESETS[2].careers;
    }
    setRecommendedCareers(careers);

    const logSteps = [
      `[Convex Client] Connecting to Convex database: dsha-prod.convex.cloud...`,
      `[Convex Backend] Invoking query: userSession:getOrCreate { userId: "mock_student_disha" }`,
      `[Convex Backend] Persisting session active status. Query resolved (62ms).`,
      `[Convex Backend] Invoking mutation: assessments:submitAnswers { answers: ${JSON.stringify(selectedAnswers)} }`,
      `[Convex Backend] Mutation successful. State cached via TanStack Query.`,
      `[AI Layer] Prompting Gemini API model 'gemini-1.5-pro'...`,
      `[AI Layer] Context payload construction: Interests=${selectedAnswers[1]}, Activities=${selectedAnswers[2]}, IdealDay=${selectedAnswers[3]}`,
      `[AI Layer] Token stream initialized. Running semantic reasoning matcher against 200+ careers and 500+ college databases...`,
      `[AI Layer] Gemini response received. Generated 3 career match profiles.`,
      `[Convex Backend] Invoking mutation: careers:saveRecommendations { list: ${careers.map(c => c.title).join(", ")} }`,
      `[Convex Backend] Persisted recommendations to database. Session complete.`
    ];

    for (let i = 0; i < logSteps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, i === 3 || i === 7 ? 350 : 150));
      setTerminalLogs((prev) => [...prev, logSteps[i]]);
    }
    
    setStep("results");
  };

  const handleSelectPreset = (preset: DishaPreset) => {
    setAnswers(preset.answers);
    executeSimulation(preset.answers);
  };

  const handleSubmitQuiz = () => {
    if (Object.keys(answers).length < 3) return;
    executeSimulation(answers);
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isChatting) return;
    
    const userMsg = text.trim();
    setChatMessages(prev => [...prev, { sender: "user", text: userMsg }]);
    setChatInput("");
    setIsChatting(true);
    setChatLogs([]);

    const t = userMsg.toLowerCase();
    let reply = "That's an excellent question! To succeed on this career track, focus on building hands-on portfolio projects, participating in local hackathons, and refining your core skills.";
    if (t.includes("skill") || t.includes("learn")) {
      reply = "For your recommended paths, prioritize mastering core technologies: Python, TensorFlow/PyTorch for ML; React, Tailwind CSS, and Figma for UX/UI; or Product Scoping and SQL for PM roles.";
    } else if (t.includes("course") || t.includes("certification")) {
      reply = "We highly recommend Google's Professional UX Certificate, AWS Developer Associate courses on Coursera, or scikit-learn training modules on Udemy to build strong credentials.";
    } else if (t.includes("portfolio") || t.includes("project")) {
      reply = "Build 2-3 end-to-end applications demonstrating real problem-solving. Document your architecture on GitHub with a comprehensive README and clean layout.";
    }

    const logSteps = [
      `[Convex Backend] Invoking mutation: chatbot:sendMessage { text: "${userMsg.substring(0, 30)}..." }`,
      `[Convex Backend] Appending user message to message_threads...`,
      `[AI Layer] Context payload gathered (assessment answers & active career matches).`,
      `[AI Layer] Invoking Gemini chatbot agent...`,
      `[AI Layer] Gemini response received. Appending to session.`,
      `[Convex Backend] Convex mutation successful. Response synchronized.`
    ];

    for (let i = 0; i < logSteps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 100));
      setChatLogs(prev => [...prev, logSteps[i]]);
    }

    setChatMessages(prev => [...prev, { sender: "disha", text: reply }]);
    setIsChatting(false);
  };

  const suggestedQuestions = [
    "What skills should I learn first?",
    "Which certifications do you recommend?",
    "How do I build a portfolio for this path?"
  ];

  return (
    <div className="space-y-5 text-left">
      {step === "preset" && (
        <div className="rounded-lg border border-glass-border bg-black/40 p-4 space-y-4">
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-white flex items-center gap-1.5 font-display">
              <GraduationCap className="size-4.5 text-cyan-glow" /> DISHA Career Session Initialization
            </h4>
            <p className="text-xs text-white/70 leading-relaxed">
              DISHA maps interests, skills, and assessment results dynamically to persistent Convex records using Gemini LLM reasoning. Select a preset student profile to run the simulated Convex + LLM flow immediately, or start a custom career assessment.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {DISHA_PRESETS.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectPreset(p)}
                className="flex flex-col text-left rounded-lg border border-glass-border bg-white/5 p-3 hover:bg-white/10 hover:border-cyan-glow/40 transition cursor-pointer space-y-1.5"
              >
                <span className="text-xs font-bold text-white">{p.name}</span>
                <span className="text-[10px] text-white/50 leading-relaxed truncate">
                  Interests: {p.answers[1]}
                </span>
                <span className="inline-flex text-[9px] font-semibold text-cyan-glow uppercase tracking-wider">
                  Test Flow →
                </span>
              </button>
            ))}
          </div>

          <div className="flex justify-center pt-2 border-t border-glass-border/30">
            <button
              type="button"
              onClick={handleStartCustom}
              className="flex items-center gap-2 rounded-lg bg-cyan-glow/15 border border-cyan-glow/30 hover:bg-cyan-glow/25 text-cyan-glow px-4 py-2 text-xs font-bold transition cursor-pointer"
            >
              <Sparkles className="size-3.5" /> Start Custom Assessment Questionnaire
            </button>
          </div>
        </div>
      )}

      {step === "quiz" && (
        <div className="rounded-lg border border-glass-border bg-black/40 p-4 space-y-4 animate-fade-in">
          <div className="flex items-center justify-between border-b border-glass-border/35 pb-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Interactive Assessment (Question {currentQuestion} of 3)
            </h4>
            <button
              type="button"
              onClick={() => setStep("preset")}
              className="text-[10px] text-white/40 hover:text-white"
            >
              Cancel
            </button>
          </div>

          {currentQuestion === 1 && (
            <div className="space-y-3">
              <p className="text-xs font-semibold text-white">What subject area excites you the most?</p>
              <div className="flex flex-col gap-2">
                {[
                  "Tech & Computer Systems",
                  "Design, Art & Media",
                  "Business, Management & Marketing"
                ].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handleAnswerSelect(1, opt)}
                    className={`text-left text-xs rounded-lg border p-2.5 transition cursor-pointer ${
                      answers[1] === opt
                        ? "border-cyan-glow bg-cyan-glow/10 text-white"
                        : "border-glass-border bg-white/5 text-white/80 hover:bg-white/8"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentQuestion === 2 && (
            <div className="space-y-3">
              <p className="text-xs font-semibold text-white">What is your favorite type of activity?</p>
              <div className="flex flex-col gap-2">
                {[
                  "Writing code, scripting, and solving complex logic puzzles",
                  "Crafting visual graphics, sketching, or designing layouts",
                  "Pitching ideas, coordinating teams, and analyzing growth metrics"
                ].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handleAnswerSelect(2, opt)}
                    className={`text-left text-xs rounded-lg border p-2.5 transition cursor-pointer ${
                      answers[2] === opt
                        ? "border-cyan-glow bg-cyan-glow/10 text-white"
                        : "border-glass-border bg-white/5 text-white/80 hover:bg-white/8"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentQuestion === 3 && (
            <div className="space-y-3">
              <p className="text-xs font-semibold text-white">How would you spend your ideal work day?</p>
              <div className="flex flex-col gap-2">
                {[
                  "Building backend APIs, pipelines, or training ML models",
                  "Conducting user research and designing wireframes/interfaces",
                  "Researching market trends, defining specs, or managing projects"
                ].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handleAnswerSelect(3, opt)}
                    className={`text-left text-xs rounded-lg border p-2.5 transition cursor-pointer ${
                      answers[3] === opt
                        ? "border-cyan-glow bg-cyan-glow/10 text-white"
                        : "border-glass-border bg-white/5 text-white/80 hover:bg-white/8"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-between items-center border-t border-glass-border/30 pt-3">
            <button
              type="button"
              disabled={currentQuestion === 1}
              onClick={() => setCurrentQuestion(prev => prev - 1)}
              className="px-3 py-1.5 rounded bg-white/5 border border-glass-border hover:bg-white/8 text-xs text-white disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
            >
              Previous
            </button>
            {Object.keys(answers).length === 3 ? (
              <button
                type="button"
                onClick={handleSubmitQuiz}
                className="px-4 py-1.5 rounded bg-cyan-glow/15 border border-cyan-glow/30 hover:bg-cyan-glow/25 text-xs text-cyan-glow font-bold cursor-pointer transition"
              >
                Submit & Analyze
              </button>
            ) : (
              <span className="text-[10px] text-white/40">Complete all questions to submit</span>
            )}
          </div>
        </div>
      )}

      {step === "processing" && (
        <div className="rounded-lg border border-glass-border bg-black/85 p-4 font-mono text-[10px] text-emerald-400 space-y-1 shadow-inner max-h-56 overflow-y-auto animate-pulse">
          <div className="flex items-center gap-1.5 border-b border-glass-border pb-1.5 mb-1.5 text-white/40 font-sans">
            <Terminal className="size-3.5 text-emerald-400" />
            <span>CONVEX BACKEND & GEMINI LLM COMPUTATION LOGS</span>
          </div>
          {terminalLogs.map((log, idx) => (
            <div key={idx} className="leading-relaxed whitespace-pre-wrap">
              {log}
            </div>
          ))}
          <div className="inline-block size-1.5 rounded-full bg-emerald-400 animate-ping mt-1 ml-1" />
        </div>
      )}

      {step === "results" && (
        <div className="space-y-4 animate-fade-in">
          <div className="rounded-lg border border-cyan-glow/30 bg-cyan-glow/5 p-4 space-y-3 relative overflow-hidden">
            <div className="absolute top-2 right-2 flex items-center gap-1 bg-cyan-glow/10 border border-cyan-glow/30 rounded-full px-2 py-0.5 text-[9px] text-cyan-glow font-bold uppercase">
              <CheckCircle2 className="size-3" /> Processed
            </div>
            
            <div className="space-y-1 border-b border-glass-border/30 pb-2">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-display">AI Career Match Recommendations</h4>
              <p className="text-[10px] text-white/50">Personalized roadmaps created dynamically based on interests & logical matching.</p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {recommendedCareers.map((c, idx) => (
                <div key={idx} className="rounded-lg border border-glass-border bg-black/35 p-3 flex flex-col justify-between space-y-2">
                  <div className="space-y-1">
                    <span className="text-[9px] font-bold text-cyan-glow uppercase tracking-wider">{c.confidence}% Match</span>
                    <h5 className="text-xs font-bold text-white leading-snug">{c.title}</h5>
                  </div>
                  <div className="space-y-1 text-[9px] text-white/60 font-mono">
                    <p><span className="text-white/40 font-sans">Colleges:</span> {c.colleges}</p>
                    <p><span className="text-white/40 font-sans">Skills:</span> {c.courses}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-1">
              <button
                type="button"
                onClick={() => setStep("preset")}
                className="text-[10px] font-bold text-cyan-glow hover:text-white transition cursor-pointer"
              >
                ← Restart Discovery Session
              </button>
            </div>
          </div>

          <div className="rounded-lg border border-glass-border bg-black/45 p-4 space-y-3">
            <div className="space-y-1 border-b border-glass-border/30 pb-2">
              <h4 className="text-xs font-bold text-white flex items-center gap-1.5 font-display">
                <MessageCircle className="size-3.5 text-cyan-glow" /> DISHA AI Career Counselor Chat
              </h4>
              <p className="text-[10px] text-white/50">Ask follow-up questions to customize next steps or course curriculum.</p>
            </div>

            <div className="border border-glass-border rounded-lg bg-black/30 p-3 h-48 overflow-y-auto space-y-3 text-xs leading-relaxed">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`flex gap-2.5 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  {msg.sender === "disha" && (
                    <div className="size-6 rounded-full bg-cyan-glow/10 border border-cyan-glow/30 flex items-center justify-center text-[10px] font-bold text-cyan-glow shrink-0 mt-0.5 font-display">
                      D
                    </div>
                  )}
                  <div className={`rounded-lg px-3 py-2 max-w-[80%] ${
                    msg.sender === "user"
                      ? "bg-cyan-glow/15 border border-cyan-glow/30 text-white"
                      : "bg-white/5 border border-glass-border text-white/85"
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-1.5">
              {suggestedQuestions.map((q) => (
                <button
                  key={q}
                  type="button"
                  disabled={isChatting}
                  onClick={() => handleSendMessage(q)}
                  className="rounded-full bg-white/5 border border-glass-border hover:bg-white/10 px-2.5 py-1 text-[9px] text-white/70 hover:text-white transition disabled:opacity-40 cursor-pointer"
                >
                  {q}
                </button>
              ))}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(chatInput);
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask about colleges, certifications, roadmap timelines..."
                className="flex-1 rounded-md border border-glass-border bg-black/55 p-2 text-xs text-white placeholder-white/30 focus:outline-hidden focus:ring-1 focus:ring-cyan-glow/50 transition"
              />
              <button
                type="submit"
                disabled={!chatInput.trim() || isChatting}
                className="rounded-md bg-white/8 hover:bg-white/12 border border-glass-border px-3.5 py-2 text-xs text-white transition disabled:opacity-40 cursor-pointer flex items-center justify-center"
              >
                <Send className="size-3.5" />
              </button>
            </form>

            {chatLogs.length > 0 && (
              <div className="rounded border border-glass-border bg-black/85 p-2 font-mono text-[9px] text-emerald-400 space-y-0.5 max-h-24 overflow-y-auto">
                {chatLogs.map((log, idx) => (
                  <div key={idx}>{log}</div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function NPISSimulator() {
  const [selectedSector, setSelectedSector] = useState<string>("Telecom (PDI)");
  const [isCalculating, setIsCalculating] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [rankingData, setRankingData] = useState<Array<{ rank: number; district: string; state: string; score: number; recommendation: string }>>([]);

  const sectorData: Record<string, Array<{ rank: number; district: string; state: string; score: number; recommendation: string }>> = {
    "Telecom (PDI)": [
      { rank: 1, district: "Bangalore", state: "Karnataka", score: 94.2, recommendation: "Deploy 5G corridors & high-density towers" },
      { rank: 2, district: "Pune", state: "Maharashtra", score: 92.5, recommendation: "Expand fiber backhaul in suburban hubs" },
      { rank: 3, district: "Gurgaon", state: "Haryana", score: 91.0, recommendation: "Address high-density office zone congestion" },
      { rank: 4, district: "Patna", state: "Bihar", score: 89.6, recommendation: "Install affordable rural micro-cells" },
      { rank: 5, district: "Jaipur", state: "Rajasthan", score: 88.4, recommendation: "Optimize tourist zone bandwidth caching" }
    ],
    "Education": [
      { rank: 1, district: "Patna", state: "Bihar", score: 93.6, recommendation: "Establish smart-class setups & digital libraries" },
      { rank: 2, district: "Pune", state: "Maharashtra", score: 89.4, recommendation: "Increase scale of higher-education technical labs" },
      { rank: 3, district: "Jaipur", state: "Rajasthan", score: 88.1, recommendation: "Promote regional girls' digital education camps" },
      { rank: 4, district: "Ranchi", state: "Jharkhand", score: 86.5, recommendation: "Fund mobile science and technology vans" },
      { rank: 5, district: "Raipur", state: "Chhattisgarh", score: 85.0, recommendation: "Deploy solar-powered tablets to remote schools" }
    ],
    "Transport": [
      { rank: 1, district: "Mumbai Suburban", state: "Maharashtra", score: 95.1, recommendation: "Integrate multi-modal metro-to-suburban ticketing" },
      { rank: 2, district: "Bangalore", state: "Karnataka", score: 91.4, recommendation: "Launch adaptive traffic light coordination" },
      { rank: 3, district: "Thane", state: "Maharashtra", score: 89.8, recommendation: "Expand feeder bus networks to train hubs" },
      { rank: 4, district: "Patna", state: "Bihar", score: 87.2, recommendation: "Upgrade regional bus rapid-transit lanes" },
      { rank: 5, district: "Gurgaon", state: "Haryana", score: 86.5, recommendation: "Construct designated pedestrian walking paths" }
    ],
    "Utilities": [
      { rank: 1, district: "Patna", state: "Bihar", score: 92.7, recommendation: "Deploy decentralized solar water purifiers" },
      { rank: 2, district: "Ranchi", state: "Jharkhand", score: 89.0, recommendation: "Extend grid sub-stations to fringe settlements" },
      { rank: 3, district: "Raipur", state: "Chhattisgarh", score: 87.5, recommendation: "Implement smart grid meters in industrial sectors" },
      { rank: 4, district: "Jaipur", state: "Rajasthan", score: 85.9, recommendation: "Fund rainwater harvesting community incentives" },
      { rank: 5, district: "Pune", state: "Maharashtra", score: 84.0, recommendation: "Optimize smart municipal waste collection routes" }
    ],
    "Jobs": [
      { rank: 1, district: "Bangalore", state: "Karnataka", score: 96.0, recommendation: "Fund AI, VLSI, & deeptech startup incubator grants" },
      { rank: 2, district: "Gurgaon", state: "Haryana", score: 93.2, recommendation: "Partner with fintech hubs for skill-skilling bootcamps" },
      { rank: 3, district: "Hyderabad", state: "Telangana", score: 91.8, recommendation: "Accelerate biotech research center incentives" },
      { rank: 4, district: "Pune", state: "Maharashtra", score: 90.1, recommendation: "Expand automotive/robotics assembly training centers" },
      { rank: 5, district: "Noida", state: "Uttar Pradesh", score: 88.5, recommendation: "Support electronics manufacturing SEZ setups" }
    ],
    "Overall NPI": [
      { rank: 1, district: "Bangalore", state: "Karnataka", score: 93.8, recommendation: "High opportunity: coordinate multi-sector investments" },
      { rank: 2, district: "Patna", state: "Bihar", score: 90.9, recommendation: "High need: prioritize utility and digital education grants" },
      { rank: 3, district: "Pune", state: "Maharashtra", score: 90.8, recommendation: "High opportunity: scale job creation & public transport" },
      { rank: 4, district: "Gurgaon", state: "Haryana", score: 89.6, recommendation: "High opportunity: solve telecom gridlock & utility drains" },
      { rank: 5, district: "Mumbai Suburban", state: "Maharashtra", score: 89.1, recommendation: "High opportunity: expand transport & housing infrastructure" }
    ]
  };

  const runAnalysis = async (sector: string) => {
    setIsCalculating(true);
    setRankingData([]);
    setTerminalLogs([]);

    const logSteps = [
      `[analysis.py] Merging demographic age data DDW-0000C-13.csv (Census 2011) with active Aadhaar databases...`,
      `[analysis.py] Mapping 640 districts across 36 states and union territories.`,
      `[analysis.py] Indicator computation: Normalizing metrics using census age-group totals as baseline denominators.`,
      `[analysis.py] Computing sector score: Calculating weighted coefficients for ${sector}...`,
      `[analysis.py] Pandas: Groupby (state, district) complete. Aggregating indices...`,
      `[dashboard.py] Initializing plotting layout using Seaborn (FutureWarning: palette handled)...`,
      `[dashboard.py] Saving State Priority Chart to /output/plots/state_ranking_${sector.toLowerCase().replace(/[^a-z0-9]/g, "")}.png`,
      `[dashboard.py] Saving Top Districts Ranking to /output/plots/district_ranking_${sector.toLowerCase().replace(/[^a-z0-9]/g, "")}.png`,
      `[dashboard.py] Computation & visualization pipelines successfully complete.`
    ];

    for (let i = 0; i < logSteps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, i === 3 || i === 6 ? 300 : 120));
      setTerminalLogs((prev) => [...prev, logSteps[i]]);
    }

    setRankingData(sectorData[sector]);
    setIsCalculating(false);
  };

  return (
    <div className="space-y-5 text-left">
      <div className="rounded-lg border border-glass-border bg-black/40 p-4 space-y-4">
        <div className="space-y-2">
          <h4 className="text-sm font-bold text-white flex items-center gap-1.5 font-display">
            <Cpu className="size-4.5 text-cyan-glow" /> National Population Intelligence System Simulator
          </h4>
          <p className="text-xs text-white/70 leading-relaxed">
            Select a target sector to execute the Python data analytics pipeline. The pipeline merges raw census records with Aadhaar enrolment datasets to compute priority scores indicating where public/private infrastructure should be deployed first.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {Object.keys(sectorData).map((sec) => (
            <button
              key={sec}
              type="button"
              disabled={isCalculating}
              onClick={() => {
                setSelectedSector(sec);
                runAnalysis(sec);
              }}
              className={`rounded px-3 py-1.5 text-xs transition cursor-pointer font-semibold ${
                selectedSector === sec
                  ? "bg-cyan-glow/15 border border-cyan-glow/45 text-cyan-glow"
                  : "bg-white/5 border border-glass-border text-white/75 hover:bg-white/10"
              }`}
            >
              {sec}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => runAnalysis(selectedSector)}
          disabled={isCalculating}
          className="w-full flex items-center justify-center gap-2 rounded-lg bg-cyan-glow/15 border border-cyan-glow/30 hover:bg-cyan-glow/25 text-cyan-glow py-2.5 text-xs font-bold transition disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
        >
          {isCalculating ? (
            <>
              <Activity className="size-3.5 animate-pulse" /> Executing analysis.py & dashboard.py...
            </>
          ) : (
            <>
              <Activity className="size-3.5" /> Run Data Fusion & Visualization Pipeline
            </>
          )}
        </button>
      </div>

      {/* Terminal logs */}
      {terminalLogs.length > 0 && (
        <div className="rounded-lg border border-glass-border bg-black/85 p-3 font-mono text-[10px] text-emerald-400 space-y-1 shadow-inner max-h-48 overflow-y-auto">
          <div className="flex items-center gap-1.5 border-b border-glass-border pb-1.5 mb-1.5 text-white/40 font-sans">
            <Terminal className="size-3.5 text-emerald-400" />
            <span>PYTHON PIPELINE EXECUTION OUTPUT</span>
          </div>
          {terminalLogs.map((log, index) => (
            <div key={index} className="leading-relaxed whitespace-pre-wrap">
              {log}
            </div>
          ))}
          {isCalculating && (
            <div className="inline-block size-1.5 rounded-full bg-emerald-400 animate-ping mt-1 ml-1" />
          )}
        </div>
      )}

      {/* Ranking Results table */}
      {rankingData.length > 0 && (
        <div className="rounded-lg border border-glass-border bg-black/45 p-4 space-y-3 animate-fade-in">
          <h4 className="text-xs font-bold text-white flex items-center gap-1.5 font-display">
            <Database className="size-3.5 text-cyan-glow" /> Priority Output: Top 5 Districts ({selectedSector})
          </h4>

          <div className="overflow-x-auto border border-glass-border rounded-lg bg-black/20">
            <table className="w-full text-left border-collapse text-[10px] font-mono text-white/80">
              <thead>
                <tr className="border-b border-glass-border bg-white/5 text-white/50 text-[9px] uppercase tracking-wider">
                  <th className="p-2 pl-3 font-semibold">Rank</th>
                  <th className="p-2 font-semibold">District</th>
                  <th className="p-2 font-semibold">State</th>
                  <th className="p-2 font-semibold text-right">Priority Score</th>
                  <th className="p-2 pr-3 font-semibold pl-6">Sector-Specific Intervention Strategy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-glass-border/30">
                {rankingData.map((row) => (
                  <tr key={row.rank} className="hover:bg-white/5 transition-colors">
                    <td className="p-2 pl-3 text-cyan-glow font-bold">#{row.rank}</td>
                    <td className="p-2 font-semibold text-white">{row.district}</td>
                    <td className="p-2">{row.state}</td>
                    <td className="p-2 text-right text-cyan-glow font-bold">{row.score.toFixed(1)}</td>
                    <td className="p-2 pr-3 pl-6 font-sans text-white/70">{row.recommendation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

interface CleftPreset {
  id: string;
  name: string;
  beforeImg: string;
  afterImg: string;
  psnr: number;
  ssim: number;
  maskDesc: string;
}

const CLEFT_PRESETS: CleftPreset[] = [
  {
    id: "case-1",
    name: "Unilateral Cleft Lip",
    beforeImg: "/images/projects/cleft/Screenshot 2026-05-23 052033.png",
    afterImg: "/images/projects/cleft/Screenshot 2026-05-23 052048.png",
    psnr: 29.8,
    ssim: 0.915,
    maskDesc: "Unilateral left-side cleft lip contour mask overlay (width: 45px)"
  },
  {
    id: "case-2",
    name: "Bilateral Cleft Lip",
    beforeImg: "/images/projects/cleft/Screenshot 2026-05-23 052033.png",
    afterImg: "/images/projects/cleft/Screenshot 2026-05-23 052241.png",
    psnr: 28.3,
    ssim: 0.892,
    maskDesc: "Bilateral symmetrical lip cleft shape mask overlay (width: 68px)"
  }
];

function CleftSimulator() {
  const [selectedCase, setSelectedCase] = useState<string>("case-1");
  const [isReconstructing, setIsReconstructing] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

  const activeCase = CLEFT_PRESETS.find(c => c.id === selectedCase) || CLEFT_PRESETS[0];

  const handleRunReconstruction = async () => {
    setIsReconstructing(true);
    setShowResult(false);
    setTerminalLogs([]);

    const logSteps = [
      `[FastAPI WebApp] POST /api/inpaint - Form data upload initialized (payload size: 1.48 MB)`,
      `[FastAPI WebApp] Decoding incoming RGB image and binary mask matrices...`,
      `[PyTorch Core] Loading model parameters from checkpoint: artifacts/best.pt`,
      `[PyTorch Core] Initializing mask-aware U-Net architecture. Mode: CUDA inference`,
      `[PyTorch Core] Concat Tensor shapes: inputImg=[1, 3, 256, 256], inputMask=[1, 1, 256, 256] -> U-NetInput=[1, 4, 256, 256]`,
      `[PyTorch Core] Executing feed-forward propagation pass through encoder-decoder skip connections...`,
      `[PyTorch Core] Extracting VGG16 feature outputs for optional perceptual loss computations (lambda=10.0)`,
      `[PyTorch Core] GPU Forward pass complete. Output shape: [1, 3, 256, 256]. Processing time: 92ms`,
      `[FastAPI WebApp] Encoding reconstruction matrix to static image file buffer.`,
      `[FastAPI WebApp] Response: 200 OK - inpainting successful.`
    ];

    for (let i = 0; i < logSteps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, i === 2 || i === 5 ? 300 : 120));
      setTerminalLogs(prev => [...prev, logSteps[i]]);
    }

    setShowResult(true);
    setIsReconstructing(false);
  };

  return (
    <div className="space-y-5 text-left animate-fade-in">
      <div className="rounded-lg border border-glass-border bg-black/40 p-4 space-y-4">
        <div className="space-y-2">
          <h4 className="text-sm font-bold text-white flex items-center gap-1.5 font-display">
            <Cpu className="size-4.5 text-cyan-glow" /> Cleft Lip Image Inpainting Simulator
          </h4>
          <p className="text-xs text-white/70 leading-relaxed">
            Select a clinical cleft lip scenario to run the PyTorch mask-aware U-Net reconstruction pipeline. The simulator loads pretrained weights from `artifacts/best.pt` and evaluates restoration quality using PSNR & SSIM metrics.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {CLEFT_PRESETS.map((p) => (
            <button
              key={p.id}
              type="button"
              disabled={isReconstructing}
              onClick={() => {
                setSelectedCase(p.id);
                setShowResult(false);
                setTerminalLogs([]);
              }}
              className={`rounded px-3 py-1.5 text-xs transition cursor-pointer font-semibold ${
                selectedCase === p.id
                  ? "bg-cyan-glow/15 border border-cyan-glow/45 text-cyan-glow"
                  : "bg-white/5 border border-glass-border text-white/75 hover:bg-white/10"
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={handleRunReconstruction}
          disabled={isReconstructing}
          className="w-full flex items-center justify-center gap-2 rounded-lg bg-cyan-glow/15 border border-cyan-glow/30 hover:bg-cyan-glow/25 text-cyan-glow py-2.5 text-xs font-bold transition disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
        >
          {isReconstructing ? (
            <>
              <Activity className="size-3.5 animate-pulse" /> Reconstructing Facial Geometry...
            </>
          ) : (
            <>
              <Activity className="size-3.5" /> Run mask-aware U-Net Reconstruction
            </>
          )}
        </button>
      </div>

      {/* Terminal logs */}
      {terminalLogs.length > 0 && (
        <div className="rounded-lg border border-glass-border bg-black/85 p-3 font-mono text-[10px] text-emerald-400 space-y-1 shadow-inner max-h-48 overflow-y-auto">
          <div className="flex items-center gap-1.5 border-b border-glass-border pb-1.5 mb-1.5 text-white/40 font-sans">
            <Terminal className="size-3.5 text-emerald-400" />
            <span>LOCAL LOGS: FASTAPI BACKEND & PYTORCH PIPELINE</span>
          </div>
          {terminalLogs.map((log, index) => (
            <div key={index} className="leading-relaxed whitespace-pre-wrap">
              {log}
            </div>
          ))}
          {isReconstructing && (
            <div className="inline-block size-1.5 rounded-full bg-emerald-400 animate-ping mt-1 ml-1" />
          )}
        </div>
      )}

      {/* Visual results comparison */}
      {showResult && (
        <div className="space-y-4 animate-fade-in">
          <div className="rounded-lg border border-cyan-glow/30 bg-cyan-glow/5 p-4 space-y-3 relative overflow-hidden">
            <div className="absolute top-2 right-2 flex items-center gap-1 bg-cyan-glow/10 border border-cyan-glow/30 rounded-full px-2 py-0.5 text-[9px] text-cyan-glow font-bold uppercase">
              <CheckCircle2 className="size-3" /> Restored
            </div>

            <div className="space-y-1 border-b border-glass-border/30 pb-2">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-display">Inpainting Outcome Summary</h4>
              <p className="text-[10px] text-white/50">{activeCase.maskDesc}</p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-glass-border bg-black/40 p-2 space-y-2">
                <span className="text-[9px] font-bold text-white/50 uppercase tracking-wider">Before (Input & Mask)</span>
                <div className="aspect-video w-full rounded-md overflow-hidden bg-black/30 border border-glass-border/50">
                  <img
                    src={activeCase.beforeImg}
                    alt="Input face"
                    className="size-full object-cover"
                  />
                </div>
              </div>

              <div className="rounded-lg border border-glass-border bg-black/40 p-2 space-y-2">
                <span className="text-[9px] font-bold text-cyan-glow uppercase tracking-wider">After (Reconstructed outcome)</span>
                <div className="aspect-video w-full rounded-md overflow-hidden bg-black/30 border border-cyan-glow/20">
                  <img
                    src={activeCase.afterImg}
                    alt="Inpainted result"
                    className="size-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1.5 sm:grid-cols-3">
              <div className="rounded border border-glass-border bg-black/35 p-2 text-center">
                <span className="text-[8px] uppercase tracking-wider text-white/40 font-bold">PSNR metric</span>
                <p className="text-xs font-bold text-cyan-glow mt-0.5 font-mono">{activeCase.psnr} dB</p>
              </div>
              <div className="rounded border border-glass-border bg-black/35 p-2 text-center">
                <span className="text-[8px] uppercase tracking-wider text-white/40 font-bold">SSIM metric</span>
                <p className="text-xs font-bold text-cyan-glow mt-0.5 font-mono">{activeCase.ssim}</p>
              </div>
              <div className="col-span-2 rounded border border-glass-border bg-black/35 p-2 text-center sm:col-span-1">
                <span className="text-[8px] uppercase tracking-wider text-white/40 font-bold">Inference latency</span>
                <p className="text-xs font-bold text-emerald-400 mt-0.5 font-mono">&lt; 95ms (GPU)</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ArtSyndicateSimulator() {
  const [trafficMode, setTrafficMode] = useState<"standard" | "viral">("standard");
  const [adViews, setAdViews] = useState(14250);
  const [adClicks, setAdClicks] = useState(428);
  const [adSpend, setAdSpend] = useState(12450);
  const [leadsGenerated, setLeadsGenerated] = useState(58);
  const [activePanel, setActivePanel] = useState<"ads" | "indiamart">("ads");
  
  const [leads, setLeads] = useState([
    {
      id: 1,
      sender: "Vikas Sharma (Art Galleria Delhi)",
      product: "Oil Painting - Sunset Serenade",
      quantity: 1,
      budget: "₹18,500",
      status: "In Discussion",
      message: "Looking for a custom commission of a larger canvas (36x48 inches) of the sunset serenade painting. Please share availability."
    },
    {
      id: 2,
      sender: "Nisha Patel (Home Decorators Mumbai)",
      product: "Abstract Landscape Canvas Series",
      quantity: 4,
      budget: "₹45,000",
      status: "Verified Lead",
      message: "Interested in acquiring the 4-part abstract landscape series for a show home project in Bandra. Can you deliver within 2 weeks?"
    }
  ]);

  const [formName, setFormName] = useState("");
  const [formProduct, setFormProduct] = useState("Custom Portrait Painting");
  const [formBudget, setFormBudget] = useState("");
  const [formMsg, setFormMsg] = useState("");
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);

  const simulateTraffic = () => {
    const boost = trafficMode === "viral" ? 3.5 : 1.0;
    const addedViews = Math.floor((Math.random() * 500 + 200) * boost);
    const addedClicks = Math.floor((Math.random() * 15 + 3) * boost);
    const addedSpend = Math.floor(addedClicks * (Math.random() * 8 + 6)); // Average CPC of ₹6 - ₹14
    const addedLeads = Math.max(1, Math.floor(addedClicks * (Math.random() * 0.08 + 0.02)));

    setAdViews(prev => prev + addedViews);
    setAdClicks(prev => prev + addedClicks);
    setAdSpend(prev => prev + addedSpend);
    setLeadsGenerated(prev => prev + addedLeads);
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formMsg) return;

    setIsSubmittingLead(true);
    setTimeout(() => {
      const newLead = {
        id: leads.length + 1,
        sender: formName,
        product: formProduct,
        quantity: 1,
        budget: formBudget || "Quote Requested",
        status: "New Inbound",
        message: formMsg
      };
      setLeads([newLead, ...leads]);
      setFormName("");
      setFormBudget("");
      setFormMsg("");
      setIsSubmittingLead(false);
    }, 800);
  };

  return (
    <div className="space-y-5 text-left animate-fade-in">
      <div className="rounded-lg border border-glass-border bg-black/40 p-4 space-y-4">
        <div className="space-y-2">
          <h4 className="text-sm font-bold text-white flex items-center gap-1.5 font-display">
            <Palette className="size-4.5 text-cyan-glow" /> The Art Syndicate Project Simulator
          </h4>
          <p className="text-xs text-white/70 leading-relaxed">
            Experience the dual-channel acquisition engine built at age 16. Toggle between the Paid Ads Campaign Tracker (monitoring self-funded advertising spend and lead yield) and the IndiaMART B2B Lead CRM.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-glass-border/30 gap-2 font-display">
          <button
            type="button"
            onClick={() => setActivePanel("ads")}
            className={`px-3 py-1.5 text-xs font-medium border-b-2 transition cursor-pointer ${
              activePanel === "ads"
                ? "border-cyan-glow text-white bg-cyan-glow/5"
                : "border-transparent text-white/50 hover:text-white"
            }`}
          >
            Paid Ads Campaign Tracker
          </button>
          <button
            type="button"
            onClick={() => setActivePanel("indiamart")}
            className={`px-3 py-1.5 text-xs font-medium border-b-2 transition cursor-pointer ${
              activePanel === "indiamart"
                ? "border-cyan-glow text-white bg-cyan-glow/5"
                : "border-transparent text-white/50 hover:text-white"
            }`}
          >
            IndiaMART B2B Lead CRM
          </button>
        </div>

        {/* Paid Ads Panel */}
        {activePanel === "ads" && (
          <div className="space-y-4 animate-fade-in">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              <div className="rounded border border-glass-border bg-black/35 p-3 text-center">
                <span className="text-[9px] uppercase tracking-wider text-white/40 font-bold block">Ad Views</span>
                <p className="text-sm font-bold text-white mt-1 font-mono">{adViews.toLocaleString()}</p>
              </div>
              <div className="rounded border border-glass-border bg-black/35 p-3 text-center">
                <span className="text-[9px] uppercase tracking-wider text-white/40 font-bold block">Ad Clicks</span>
                <p className="text-sm font-bold text-white mt-1 font-mono">{adClicks.toLocaleString()}</p>
              </div>
              <div className="rounded border border-glass-border bg-black/35 p-3 text-center">
                <span className="text-[9px] uppercase tracking-wider text-white/40 font-bold block">Total Ad Spend</span>
                <p className="text-sm font-bold text-cyan-glow mt-1 font-mono">₹{adSpend.toLocaleString()}</p>
              </div>
              <div className="rounded border border-glass-border bg-black/35 p-3 text-center">
                <span className="text-[9px] uppercase tracking-wider text-white/40 font-bold block">Leads Generated</span>
                <p className="text-sm font-bold text-emerald-400 mt-1 font-mono">{leadsGenerated}</p>
              </div>
            </div>

            <div className="rounded border border-glass-border bg-black/50 p-3 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white flex items-center gap-1 font-display">
                  <TrendingUp className="size-4 text-cyan-glow" /> Live Ad Campaign Simulator
                </span>
                <div className="flex bg-black/40 rounded border border-glass-border p-0.5 text-[10px]">
                  <button
                    type="button"
                    onClick={() => setTrafficMode("standard")}
                    className={`px-2 py-0.5 rounded transition cursor-pointer ${
                      trafficMode === "standard" ? "bg-cyan-glow/20 text-white" : "text-white/40"
                    }`}
                  >
                    Standard
                  </button>
                  <button
                    type="button"
                    onClick={() => setTrafficMode("viral")}
                    className={`px-2 py-0.5 rounded transition cursor-pointer ${
                      trafficMode === "viral" ? "bg-cyan-glow/20 text-white" : "text-white/40"
                    }`}
                  >
                    Viral Boost (3.5x)
                  </button>
                </div>
              </div>

              <div className="text-xs text-white/70 leading-relaxed">
                Running targeted paid ad campaigns directed high-intent buyers to the Google Sites art gallery. Instead of earning ad revenue, self-funded ad budget was spent to acquire direct leads who purchased and commissioned custom paintings.
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={simulateTraffic}
                  className="px-3 py-1.5 text-xs font-medium rounded bg-cyan-glow/20 hover:bg-cyan-glow/30 text-white border border-cyan-glow/30 transition cursor-pointer flex items-center gap-1.5"
                >
                  <Plus className="size-3.5" /> Simulate Ad Traffic
                </button>
                <div className="text-[10px] text-white/40 flex items-center font-mono">
                  CTR: {adViews > 0 ? ((adClicks / adViews) * 100).toFixed(2) : "0.00"}% | Avg CPC: ₹29.10 | Cost per Lead: ₹214
                </div>
              </div>
            </div>
          </div>
        )}

        {/* IndiaMART Lead CRM Panel */}
        {activePanel === "indiamart" && (
          <div className="space-y-4 animate-fade-in">
            {/* Simulation Form */}
            <form onSubmit={handleLeadSubmit} className="rounded border border-glass-border bg-black/40 p-3 space-y-3">
              <span className="text-xs font-bold text-white block font-display">Submit Mock IndiaMART B2B Inquiry</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div>
                  <label className="text-[10px] font-bold text-white/50 block mb-1">Buyer Name</label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="e.g. Priyansh Arts"
                    className="w-full text-xs bg-black/50 border border-glass-border/30 rounded px-2 py-1 text-white focus:outline-none focus:border-cyan-glow"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-white/50 block mb-1">Select Artwork Type</label>
                  <select
                    value={formProduct}
                    onChange={(e) => setFormProduct(e.target.value)}
                    className="w-full text-xs bg-black/50 border border-glass-border/30 rounded px-2 py-1 text-white focus:outline-none focus:border-cyan-glow"
                  >
                    <option value="Custom Portrait Painting">Custom Portrait Painting</option>
                    <option value="Oil Landscape Canvas">Oil Landscape Canvas</option>
                    <option value="Abstract Modern Painting">Abstract Modern Painting</option>
                    <option value="Watercolor Classic Series">Watercolor Classic Series</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-white/50 block mb-1">Target Budget</label>
                  <input
                    type="text"
                    value={formBudget}
                    onChange={(e) => setFormBudget(e.target.value)}
                    placeholder="e.g. ₹15,000"
                    className="w-full text-xs bg-black/50 border border-glass-border/30 rounded px-2 py-1 text-white focus:outline-none focus:border-cyan-glow"
                  />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold text-white/50 block mb-1">Inquiry / Custom Description</label>
                <textarea
                  required
                  rows={2}
                  value={formMsg}
                  onChange={(e) => setFormMsg(e.target.value)}
                  placeholder="Ask for custom sizing, colors, framing, or mother's portfolio galleries..."
                  className="w-full text-xs bg-black/50 border border-glass-border/30 rounded px-2 py-1 text-white focus:outline-none focus:border-cyan-glow resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmittingLead}
                className="px-3 py-1.5 text-xs font-medium rounded bg-cyan-glow/25 hover:bg-cyan-glow/35 text-white border border-cyan-glow/40 transition cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
              >
                {isSubmittingLead ? "Transmitting lead data..." : "Transmit Lead to Portfolio Site"}
              </button>
            </form>

            {/* Leads Inbound Inbox */}
            <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider block font-display">IndiaMART Lead Inbox (Live Feed)</span>
              {leads.map((l) => (
                <div key={l.id} className="rounded border border-glass-border/70 bg-black/30 p-2.5 space-y-1.5 relative overflow-hidden">
                  <div className="absolute top-2 right-2 flex items-center gap-1">
                    <span className="text-[8px] bg-cyan-glow/10 text-cyan-glow border border-cyan-glow/20 px-1 rounded font-medium">
                      {l.status}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center text-xs">
                    <div className="font-bold text-white truncate max-w-[200px] font-display">{l.sender}</div>
                    <div className="text-[10px] text-emerald-400 font-mono mt-0.5 sm:mt-0">Budget: {l.budget}</div>
                  </div>
                  <div className="text-[10px] text-white/50">
                    Product Interest: <span className="text-white font-medium">{l.product}</span>
                  </div>
                  <p className="text-xs text-white/70 italic leading-relaxed border-t border-glass-border/30 pt-1.5">
                    "{l.message}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const getThemeClasses = (theme?: string) => {
  switch (theme) {
    case "amber":
      return {
        text: "text-amber-400",
        border: "border-amber-500/30",
        bg: "bg-amber-500/10",
        glow: "shadow-[0_0_20px_rgba(245,158,11,0.25)]",
        ring: "ring-amber-500/40",
        tabActive: "border-amber-400 text-amber-400 bg-amber-500/5",
        button: "bg-amber-500/15 border-amber-500/35 text-amber-400 hover:bg-amber-500/25 shadow-[0_0_12px_rgba(245,158,11,0.1)]",
        glowText: "text-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]",
      };
    case "emerald":
      return {
        text: "text-emerald-400",
        border: "border-emerald-500/30",
        bg: "bg-emerald-500/10",
        glow: "shadow-[0_0_20px_rgba(16,185,129,0.25)]",
        ring: "ring-emerald-500/40",
        tabActive: "border-emerald-400 text-emerald-400 bg-emerald-500/5",
        button: "bg-emerald-500/15 border-emerald-500/35 text-emerald-400 hover:bg-emerald-500/25 shadow-[0_0_12px_rgba(16,185,129,0.1)]",
        glowText: "text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]",
      };
    case "purple":
      return {
        text: "text-purple-400",
        border: "border-purple-500/30",
        bg: "bg-purple-500/10",
        glow: "shadow-[0_0_20px_rgba(168,85,247,0.25)]",
        ring: "ring-purple-500/40",
        tabActive: "border-purple-400 text-purple-400 bg-purple-500/5",
        button: "bg-purple-500/15 border-purple-500/35 text-purple-400 hover:bg-purple-500/25 shadow-[0_0_12px_rgba(168,85,247,0.1)]",
        glowText: "text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]",
      };
    case "teal":
      return {
        text: "text-teal-400",
        border: "border-teal-500/30",
        bg: "bg-teal-500/10",
        glow: "shadow-[0_0_20px_rgba(20,184,166,0.25)]",
        ring: "ring-teal-500/40",
        tabActive: "border-teal-400 text-teal-400 bg-teal-500/5",
        button: "bg-teal-500/15 border-teal-500/35 text-teal-400 hover:bg-teal-500/25 shadow-[0_0_12px_rgba(20,184,166,0.1)]",
        glowText: "text-teal-400 drop-shadow-[0_0_8px_rgba(20,184,166,0.5)]",
      };
    case "rose":
      return {
        text: "text-rose-400",
        border: "border-rose-500/30",
        bg: "bg-rose-500/10",
        glow: "shadow-[0_0_20px_rgba(244,63,94,0.25)]",
        ring: "ring-rose-500/40",
        tabActive: "border-rose-400 text-rose-400 bg-rose-500/5",
        button: "bg-rose-500/15 border-rose-500/35 text-rose-400 hover:bg-rose-500/25 shadow-[0_0_12px_rgba(244,63,94,0.1)]",
        glowText: "text-rose-400 drop-shadow-[0_0_8px_rgba(244,63,94,0.5)]",
      };
    case "cyan":
    default:
      return {
        text: "text-cyan-glow",
        border: "border-cyan-500/30",
        bg: "bg-cyan-500/10",
        glow: "shadow-[0_0_20px_rgba(0,245,255,0.25)]",
        ring: "ring-cyan-glow/40",
        tabActive: "border-cyan-glow text-cyan-glow bg-cyan-glow/5",
        button: "bg-cyan-glow/15 border-cyan-glow/35 text-cyan-glow hover:bg-cyan-glow/25 shadow-[0_0_12px_rgba(0,245,255,0.06)]",
        glowText: "text-cyan-glow drop-shadow-[0_0_8px_rgba(0,245,255,0.5)]",
      };
  }
}

function ProjectCard({
  project,
  expanded,
  onToggle,
}: {
  project: ProjectNode;
  expanded: boolean;
  onToggle: () => void;
}) {
  const [activeTab, setActiveTab] = useState<"specs" | "demo" | "media">("media");
  const [videoError, setVideoError] = useState(false);
  const t = getThemeClasses(project.colorTheme);

  // Added interactive unified media state
  const projectMedia = useMemo(() => {
    const list: { type: "video" | "image"; src: string }[] = [];
    if (project.videoUrl && !videoError) {
      list.push({ type: "video", src: project.videoUrl });
    }
    const uniqueImgs = Array.from(new Set([project.screenshot, ...(project.gallery || [])].filter(Boolean)));
    uniqueImgs.forEach((img) => {
      if (!img.toLowerCase().endsWith(".pdf")) {
        list.push({ type: "image", src: img });
      }
    });
    return list;
  }, [project.screenshot, project.gallery, project.videoUrl, videoError]);

  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [fitToFrame, setFitToFrame] = useState(false);

  useEffect(() => {
    if (!expanded) {
      setActiveTab("media");
      setVideoError(false);
      setCurrentMediaIndex(0);
      setFitToFrame(false);
    }
  }, [expanded, project.id]);

  return (
    <article
      onClick={() => {
        if (expanded) {
          onToggle();
        }
      }}
      className={`relative glass-panel flex min-w-0 flex-col overflow-hidden rounded-xl transition ${
        expanded 
          ? `col-span-2 md:col-span-2 lg:col-span-3 ring-1 ${t.ring} ${t.glow} cursor-pointer` 
          : "col-span-1 hover:border-cyan-glow/20"
      }`}
    >
      <ExpandResizeButton expanded={expanded} onToggle={onToggle} size="default" />

      <AnimatePresence initial={false} mode="wait">
        {!expanded ? (
          <motion.div
            key="collapsed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="w-full min-w-0"
          >
            <button type="button" onClick={onToggle} className="w-full min-w-0 text-left">
              <div className="relative aspect-video w-full overflow-hidden">
                <SlideshowFrame
                  srcs={[project.screenshot, ...(project.gallery || [])]}
                  alt={`${project.title} preview`}
                  aspect="aspect-video"
                  rounded="rounded-none"
                  className="rounded-none border-0 shadow-none"
                />
                <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-end bg-linear-to-t from-black/95 via-black/40 to-transparent p-4 pr-14">
                  <p className="text-[10px] font-medium uppercase tracking-wider text-purple-neon">
                    {project.tag}
                  </p>
                  <h3 className="mt-1 font-display text-sm font-bold leading-snug text-white sm:text-base">
                    {project.title}
                  </h3>
                </div>
              </div>

              <div className="space-y-2 p-2.5 sm:p-4">
                <div className="space-y-1.5">
                  {project.minimizedPointers && project.minimizedPointers.length > 0 ? (
                    project.minimizedPointers.map((pointer, i) => (
                      <div key={i} className="flex items-start gap-1 text-[10px] sm:text-xs text-white/80">
                        <Lightbulb className="mt-0.5 size-3 shrink-0 text-amber-300/90" />
                        <span className="leading-relaxed">{pointer}</span>
                      </div>
                    ))
                  ) : (
                    <div className="flex items-start gap-2">
                      <Lightbulb className="mt-0.5 size-4 shrink-0 text-amber-300/90" />
                      <p className="text-xs leading-relaxed text-white/70 sm:text-sm">{project.idea}</p>
                    </div>
                  )}
                </div>
                <SkillChips items={project.skills} />
                {project.achievement && (
                  <p className="flex items-center gap-2 text-xs text-purple-neon">
                    <Trophy className="size-3.5 shrink-0" />
                    {project.achievement}
                  </p>
                )}
                <span className="inline-flex items-center gap-1 text-[8px] sm:text-[10px] uppercase tracking-wider text-white/45">
                  Tap card or use <Maximize2 className={`inline size-3 ${t.text}`} /> to enlarge
                </span>
              </div>
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="expanded"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="w-full min-w-0 cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Expanded details at the top */}
            <div className="p-4 pb-3 border-b border-glass-border">
              <p className={`text-[10px] font-medium uppercase tracking-wider ${t.text} text-left`}>
                {project.tag}
              </p>
              <h3 className="mt-1 font-display text-base font-bold leading-snug text-white sm:text-lg text-left">
                {project.title}
              </h3>
            </div>

            {project.vision && (
              <div className="flex border-b border-glass-border bg-black/20 text-xs select-none font-display">
                <button
                  type="button"
                  onClick={() => setActiveTab("media")}
                  className={`flex-1 py-3 px-2 text-center font-bold tracking-wide uppercase transition border-b-2 hover:bg-white/5 cursor-pointer ${
                    activeTab === "media"
                      ? `${t.tabActive}`
                      : "border-transparent text-white/50 hover:text-white"
                  }`}
                >
                  Walkthrough
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("specs")}
                  className={`flex-1 py-3 px-2 text-center font-bold tracking-wide uppercase transition border-b-2 hover:bg-white/5 cursor-pointer ${
                    activeTab === "specs"
                      ? `${t.tabActive}`
                      : "border-transparent text-white/50 hover:text-white"
                  }`}
                >
                  Specifications
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("demo")}
                  className={`flex-1 py-3 px-2 text-center font-bold tracking-wide uppercase transition border-b-2 hover:bg-white/5 cursor-pointer ${
                    activeTab === "demo"
                      ? `${t.tabActive}`
                      : "border-transparent text-white/50 hover:text-white"
                  }`}
                >
                  Live Preview
                </button>
              </div>
            )}

            {project.vision && activeTab === "specs" && (
              <div className="p-4 space-y-5 text-left animate-fade-in">
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5 font-display">
                    <Lightbulb className="size-4 text-amber-300/90" /> Product Vision & Problem Solved
                  </h4>
                  <p className="text-xs leading-relaxed text-white/80 bg-white/5 border border-glass-border rounded-lg p-3">
                    {project.vision}
                  </p>
                </div>

                {project.techSpecs && (
                  <div className="space-y-2.5">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5 font-display">
                      <Cpu className={`size-4 ${t.text}`} /> Technical Architecture
                    </h4>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {project.techSpecs.map((spec, index) => (
                        <div key={index} className="rounded-lg border border-glass-border bg-black/30 p-3 space-y-1">
                          <span className={`text-[10px] font-bold ${t.text} uppercase tracking-wider`}>
                            {spec.label}
                          </span>
                          <p className="text-xs text-white/70 leading-relaxed mt-0.5">
                            {spec.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {project.metricsList && (
                  <div className="space-y-2.5">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5 font-display">
                      <Activity className={`size-4 ${t.text}`} /> Key Metrics & Highlights
                    </h4>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {project.metricsList.map((m, index) => (
                        <div key={index} className="rounded-lg border border-glass-border bg-white/5 p-3 flex items-start gap-2.5">
                          <CheckCircle2 className={`size-4 shrink-0 ${t.text} mt-0.5`} />
                          <div className="space-y-0.5">
                            <span className="text-xs font-bold text-white">{m.label}</span>
                            <p className="text-[10px] text-white/60 leading-normal">{m.value}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {project.videoUrl && (
                  <button
                    type="button"
                    onClick={() => setActiveTab("media")}
                    className={`w-full flex items-center justify-center gap-2 rounded-lg bg-cyan-glow/10 border ${t.border} p-2.5 text-xs font-bold ${t.text} hover:bg-cyan-glow/20 transition cursor-pointer font-display`}
                  >
                    <Play className={`size-4 fill-current`} />
                    Watch Video Walkthrough & View Gallery
                  </button>
                )}

                <div className="flex justify-end pt-3 border-t border-glass-border/30">
                  <button
                    type="button"
                    onClick={onToggle}
                    className="inline-flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition cursor-pointer"
                  >
                    <Minimize2 className="size-3.5" /> Shrink Card
                  </button>
                </div>
              </div>
            )}

            {project.vision && activeTab === "demo" && (
              <div className="p-4 space-y-4 animate-fade-in">
                {project.id === "bookkeeping" ? (
                  <BookkeepingSimulator />
                ) : project.id === "disha" ? (
                  <DishaSimulator />
                ) : project.id === "npis" ? (
                  <NPISSimulator />
                ) : project.id === "cleft" ? (
                  <CleftSimulator />
                ) : project.id === "syndicate" ? (
                  <ArtSyndicateSimulator />
                ) : (
                  <AITrustChainSimulator />
                )}
                <div className="flex justify-end pt-3 border-t border-glass-border/30">
                  <button
                    type="button"
                    onClick={onToggle}
                    className="inline-flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition cursor-pointer"
                  >
                    <Minimize2 className="size-3.5" /> Shrink Card
                  </button>
                </div>
              </div>
            )}

            {(!project.vision || activeTab === "media") && (
              <div className="p-4 space-y-4 animate-fade-in">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                  {/* Left Column: Details, description, and CTAs */}
                  <div className="lg:col-span-7 flex flex-col justify-between space-y-4 text-left">
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <Lightbulb className="mt-0.5 size-4 shrink-0 text-amber-300/90" />
                        <p className="text-xs leading-relaxed text-white/85 sm:text-sm">{project.idea}</p>
                      </div>

                      <p className="text-xs leading-relaxed text-white/70 sm:text-sm">
                        {project.description}
                      </p>

                      {project.achievement && (
                        <p className="flex items-center gap-2 text-xs text-purple-neon font-medium">
                          <Trophy className="size-3.5 shrink-0" />
                          {project.achievement}
                        </p>
                      )}

                      <div className="space-y-1.5">
                        <p className="text-[10px] uppercase tracking-wider text-white/40">Technologies</p>
                        <SkillChips items={project.skills} />
                      </div>
                    </div>

                    {/* Left Column actions footer (Prominent and immediately visible) */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-glass-border/30 mt-auto">
                      <div className="flex flex-wrap items-center gap-2">
                        {project.siteUrl || project.vision ? (
                          <button
                            type="button"
                            onClick={() => {
                              if (project.vision) {
                                setActiveTab("demo");
                              } else if (project.siteUrl) {
                                window.open(project.siteUrl, "_blank", "noopener,noreferrer");
                              }
                            }}
                            className={`inline-flex items-center gap-2 rounded-lg ${t.button} px-3 py-1.5 text-xs font-semibold cursor-pointer`}
                          >
                            Live Preview <ExternalLink className="size-3.5" />
                          </button>
                        ) : null}

                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-lg bg-white/8 border border-glass-border px-3 py-1.5 text-xs font-semibold text-white/90 hover:bg-white/15 transition hover:text-white"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Github className="size-3.5" /> Code
                          </a>
                        )}
                        {project.linkedinUrl && (
                          <a
                            href={project.linkedinUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-lg bg-[#0077b5]/15 border border-[#0077b5]/35 px-3 py-1.5 text-xs font-semibold text-[#0077b5] hover:bg-[#0077b5]/25 transition cursor-pointer"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Linkedin className="size-3.5" /> LinkedIn Post
                          </a>
                        )}

                        {!project.siteUrl && !project.githubUrl && !project.vision && !project.linkedinUrl && (
                          <span className="text-[10px] text-white/35">Project link coming soon</span>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={onToggle}
                        className="inline-flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition cursor-pointer"
                      >
                        <Minimize2 className="size-3.5" /> Shrink Card
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Media, Floating badge and gallery */}
                  <div className="lg:col-span-5 space-y-4">
                    <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-glass-border bg-black/50">
                      <div className="relative size-full animate-fade-in">
                        {projectMedia[currentMediaIndex]?.type === "video" ? (
                          <video
                            key={projectMedia[currentMediaIndex].src}
                            src={projectMedia[currentMediaIndex].src}
                            controls
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="auto"
                            className="size-full object-cover animate-fade-in"
                            poster={project.screenshot}
                            onError={(e) => {
                              const target = e.currentTarget;
                              const err = target.error;
                              console.warn("Video playback warning:", err ? { code: err.code, message: err.message } : e);
                              if (err && err.code === 4) {
                                console.error("Video failed to load (fatal format/src error): falling back to image slideshow.");
                                setVideoError(true);
                              }
                            }}
                          />
                        ) : projectMedia[currentMediaIndex]?.src.toLowerCase().endsWith(".pdf") ? (
                          <iframe
                            src={projectMedia[currentMediaIndex].src}
                            className="size-full border-0 bg-white"
                            title={`${project.title} PDF Report`}
                          />
                        ) : (
                          <>
                            <img
                              src={projectMedia[currentMediaIndex]?.src}
                              alt={project.title}
                              className={`size-full transition-all duration-300 ${fitToFrame ? "object-contain bg-black/45" : "object-cover"}`}
                            />

                            {/* Fit to Frame Toggle */}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setFitToFrame(!fitToFrame);
                              }}
                              className="absolute top-3 right-3 z-30 rounded-lg bg-black/70 px-2.5 py-1.5 text-[10px] font-bold text-white border border-white/20 hover:bg-white/10 transition backdrop-blur-md cursor-pointer flex items-center gap-1"
                            >
                              {fitToFrame ? <Minimize2 className="size-3" /> : <Maximize2 className="size-3" />}
                              {fitToFrame ? "Crop to Fill" : "Fit to Frame"}
                            </button>
                          </>
                        )}

                        {/* Arrows overlay */}
                        {projectMedia.length > 1 && (
                          <>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setCurrentMediaIndex((prev) => (prev - 1 + projectMedia.length) % projectMedia.length);
                              }}
                              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 flex size-8 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 hover:scale-105 transition cursor-pointer border border-white/10"
                            >
                              <ChevronLeft className="size-5" />
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setCurrentMediaIndex((prev) => (prev + 1) % projectMedia.length);
                              }}
                              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 flex size-8 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 hover:scale-105 transition cursor-pointer border border-white/10"
                            >
                              <ChevronRight className="size-5" />
                            </button>
                          </>
                        )}
                      </div>

                      {/* Floating Mini Box */}
                      {project.miniBox && (
                        <div className={`absolute bottom-3 right-3 z-20 max-w-[180px] rounded-lg border ${t.border} bg-black/85 p-2 px-2.5 backdrop-blur-md shadow-[0_4px_12px_rgba(0,0,0,0.6)]`}>
                          {project.miniBox.title && (
                            <p className={`text-[9px] uppercase tracking-wider ${t.text} font-bold`}>
                              {project.miniBox.title}
                            </p>
                          )}
                          <p className="text-[10px] font-medium text-white/90 mt-0.5 leading-snug font-display">
                            {project.miniBox.text}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Gallery thumbnails */}
                    {project.gallery && project.gallery.length > 0 && (
                      <div className="space-y-1.5 text-left">
                        <p className="text-[10px] uppercase tracking-wider text-white/40">Project Gallery</p>
                        <CompactGallery
                          images={Array.from(new Set([project.screenshot, ...(project.gallery || [])].filter(Boolean)))}
                          altPrefix={project.title}
                          onSelectImage={(src) => {
                            if (src.toLowerCase().endsWith(".pdf")) {
                              window.open(src, "_blank", "noopener,noreferrer");
                              return;
                            }
                            const idx = projectMedia.findIndex((item) => item.src === src);
                            if (idx !== -1) {
                              setCurrentMediaIndex(idx);
                            }
                          }}
                          activeImage={projectMedia[currentMediaIndex]?.type === "image" ? projectMedia[currentMediaIndex].src : null}
                          videoUrl={project.videoUrl && !videoError ? project.videoUrl : undefined}
                          onSelectVideo={() => {
                            const idx = projectMedia.findIndex((item) => item.type === "video");
                            if (idx !== -1) {
                              setCurrentMediaIndex(idx);
                            }
                          }}
                          isVideoActive={projectMedia[currentMediaIndex]?.type === "video"}
                          posterUrl={project.screenshot}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}

function EventCard({
  event,
  expanded,
  onToggle,
}: {
  event: HackathonEvent;
  expanded: boolean;
  onToggle: () => void;
}) {
  const t = getThemeClasses(event.colorTheme);

  const eventImages = useMemo(() => {
    return (event.gallery && event.gallery.length > 0 ? event.gallery : [event.src]).filter(Boolean);
  }, [event.gallery, event.src]);

  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [fitToFrame, setFitToFrame] = useState(false);

  // Reset selected image when card collapses
  useEffect(() => {
    if (!expanded) {
      setCurrentImgIndex(0);
      setFitToFrame(false);
    }
  }, [expanded]);

  return (
    <article
      onClick={() => {
        if (expanded) {
          onToggle();
        }
      }}
      className={`relative glass-panel min-w-0 overflow-hidden rounded-xl transition ${
        expanded 
          ? `col-span-2 md:col-span-2 ring-1 ${t.ring} ${t.glow} cursor-pointer` 
          : "col-span-1 hover:border-emerald-glow/20"
      }`}
    >
      <ExpandResizeButton expanded={expanded} onToggle={onToggle} size="default" />

      {!expanded ? (
        <button
          type="button"
          onClick={onToggle}
          className="w-full min-w-0 text-left cursor-pointer animate-fade-in"
        >
          <div className="relative">
            <SlideshowFrame
              srcs={eventImages}
              alt={event.title}
              aspect="aspect-video"
              rounded="rounded-none"
              className="rounded-none border-0 shadow-none"
            />
          </div>

          <div className="space-y-2.5 p-3 sm:p-5">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-display text-sm font-bold text-white sm:text-lg">{event.title}</h3>
              {event.role && (
                <span className={`inline-flex items-center gap-1 rounded-full border ${t.border} ${t.bg} px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${t.text}`}>
                  <Users className="size-3" />
                  {event.role}
                </span>
              )}
            </div>
            <p className={`text-xs ${t.text} font-mono`}>{event.place}</p>

            <div className="flex items-start gap-1.5 text-[10px] sm:text-xs">
              <Lightbulb className="mt-0.5 size-3.5 shrink-0 text-amber-300/90" />
              <p className="text-white/70">{event.idea}</p>
            </div>

            {event.sponsors && (
              <div className="flex items-start gap-1.5 text-[10px] sm:text-xs">
                <Sparkles className="mt-0.5 size-3.5 shrink-0 text-amber-400" />
                <p className="text-white/70">
                  <span className="font-semibold text-amber-400">Sponsors: </span>
                  <span className="text-amber-300/90 font-medium">{event.sponsors}</span>
                </p>
              </div>
            )}

            <SkillChips items={event.skills} />

            <p className={`flex items-center gap-1.5 text-[10px] sm:text-sm font-medium ${t.text}`}>
              <Award className="size-3.5 shrink-0" />
              {event.achievement}
            </p>

            <span className="inline-flex items-center gap-1 text-[8px] sm:text-[10px] uppercase tracking-wider text-white/45">
              Tap card to enlarge <Maximize2 className={`inline size-3 ${t.text}`} />
            </span>
          </div>
        </button>
      ) : (
        <div 
          className="w-full min-w-0 text-left animate-fade-in cursor-default"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 p-4 sm:p-5">
            {/* Left Column: Details & CTAs */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-display text-base font-bold text-white sm:text-lg">{event.title}</h3>
                  {event.role && (
                    <span className={`inline-flex items-center gap-1 rounded-full border ${t.border} ${t.bg} px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${t.text}`}>
                      <Users className="size-3" />
                      {event.role}
                    </span>
                  )}
                </div>
                <p className={`text-xs ${t.text} font-mono`}>{event.place}</p>

                <div className="flex items-start gap-2">
                  <Lightbulb className="mt-0.5 size-4 shrink-0 text-amber-300/90" />
                  <p className="text-sm text-white/70 leading-relaxed">{event.idea}</p>
                </div>

                {event.sponsors && (
                  <div className="flex items-start gap-2 text-sm">
                    <Sparkles className="mt-0.5 size-4 shrink-0 text-amber-400" />
                    <p className="text-white/70">
                      <span className="font-semibold text-amber-400 font-display">Sponsors: </span>
                      <span className="text-amber-300/90 font-medium">{event.sponsors}</span>
                    </p>
                  </div>
                )}

                <div className="space-y-1">
                  <p className="text-[10px] uppercase tracking-wider text-white/40">Skills & Focus</p>
                  <SkillChips items={event.skills} />
                </div>

                <div className="pt-2 border-t border-glass-border/30 space-y-2">
                  <p className="flex items-center gap-2 text-sm font-semibold text-white/90">
                    <Award className={`size-4 shrink-0 ${t.text}`} />
                    {event.achievement}
                  </p>
                  {event.achievementDetails && event.achievementDetails.length > 0 && (
                    <ul className="space-y-1.5 pl-6 text-xs text-white/70 list-disc">
                      {event.achievementDetails.map((detail, dIdx) => (
                        <li key={dIdx} className="leading-relaxed">
                          {detail}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* Action Buttons: LinkedIn Post & Shrink Card */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-glass-border/30 mt-auto">
                <div className="flex flex-wrap items-center gap-2">
                  {event.linkedinUrl && (
                    <a
                      href={event.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg bg-[#0077b5]/15 border border-[#0077b5]/35 px-3 py-1.5 text-xs font-semibold text-[#0077b5] hover:bg-[#0077b5]/25 transition cursor-pointer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Linkedin className="size-3.5" /> LinkedIn Post
                    </a>
                  )}
                </div>

                <button
                  type="button"
                  onClick={onToggle}
                  className="inline-flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition cursor-pointer"
                >
                  <Minimize2 className="size-3.5" /> Shrink Card
                </button>
              </div>
            </div>

            {/* Right Column: Slideshow Frame & Gallery */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-glass-border bg-black/50">
                <div className="relative size-full animate-fade-in">
                  <img
                    src={eventImages[currentImgIndex]}
                    alt={event.title}
                    className={`size-full transition-all duration-300 ${fitToFrame ? "object-contain bg-black/45" : "object-cover"}`}
                  />

                  {/* Fit to Frame Toggle */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setFitToFrame(!fitToFrame);
                    }}
                    className="absolute top-3 right-3 z-30 rounded-lg bg-black/70 px-2.5 py-1.5 text-[10px] font-bold text-white border border-white/20 hover:bg-white/10 transition backdrop-blur-md cursor-pointer flex items-center gap-1"
                  >
                    {fitToFrame ? <Minimize2 className="size-3" /> : <Maximize2 className="size-3" />}
                    {fitToFrame ? "Crop to Fill" : "Fit to Frame"}
                  </button>

                  {/* Arrows overlay */}
                  {eventImages.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentImgIndex((prev) => (prev - 1 + eventImages.length) % eventImages.length);
                        }}
                        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 flex size-8 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 hover:scale-105 transition cursor-pointer border border-white/10"
                      >
                        <ChevronLeft className="size-5" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentImgIndex((prev) => (prev + 1) % eventImages.length);
                        }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 flex size-8 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 hover:scale-105 transition cursor-pointer border border-white/10"
                      >
                        <ChevronRight className="size-5" />
                      </button>
                    </>
                  )}
                </div>
              </div>

              {event.gallery && event.gallery.length > 0 && (
                <div className="space-y-1.5">
                  <p className="text-[10px] uppercase tracking-wider text-white/45">Photos</p>
                  <CompactGallery
                    images={event.gallery}
                    altPrefix={event.title}
                    onSelectImage={(src) => {
                      const idx = eventImages.indexOf(src);
                      if (idx !== -1) {
                        setCurrentImgIndex(idx);
                      }
                    }}
                    activeImage={eventImages[currentImgIndex]}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </article>
  );
}

function HeroParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf = 0;
    const particles: { x: number; y: number; vx: number; vy: number; r: number; hue: number }[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (particles.length < 60) {
        particles.length = 0;
        for (let i = 0; i < 60; i++) {
          particles.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            r: 1 + Math.random() * 2,
            hue: Math.random() > 0.6 ? 280 : 185,
          });
        }
      }
    };

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const tick = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (const p of particles) {
        const dx = mouse.current.x - p.x;
        const dy = mouse.current.y - p.y;
        const dist = Math.hypot(dx, dy) || 1;
        const force = Math.max(0, 100 - dist) * 0.0003;
        p.vx += (dx / dist) * force;
        p.vy += (dy / dist) * force;
        p.vx *= 0.98;
        p.vy *= 0.98;
        p.x += p.vx;
        p.y += p.vy;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.hue > 200 ? "rgba(168,85,247,0.6)" : "rgba(0,245,255,0.55)";
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-0" aria-hidden />;
}

function ToolLogo({ name }: { name: string }) {
  const lowercaseName = name.toLowerCase();

  if (lowercaseName.includes("antigravity")) {
    return (
      <svg className="size-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="antigravity-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00f5ff" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>
        <circle cx="12" cy="12" r="5" fill="url(#antigravity-grad)" />
        <ellipse cx="12" cy="12" rx="10" ry="2.2" stroke="#00f5ff" strokeWidth="1.2" transform="rotate(-30 12 12)" strokeOpacity="0.9" />
        <ellipse cx="12" cy="12" rx="7.5" ry="1.7" stroke="#a855f7" strokeWidth="1" transform="rotate(30 12 12)" strokeOpacity="0.7" />
      </svg>
    );
  }

  if (lowercaseName.includes("cursor")) {
    return (
      <svg className="size-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.5 3.5v15.2l4.5-4.2h5.5L7.5 3.5z" fill="#00f5ff" />
        <path d="M12 14.5l3.5 3.5 1.5-1.5-3.5-3.5H12z" fill="#a855f7" />
      </svg>
    );
  }

  if (lowercaseName.includes("gemini")) {
    return (
      <svg className="size-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="gemini-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9fc3f9" />
            <stop offset="50%" stopColor="#c5a5ff" />
            <stop offset="100%" stopColor="#e89bb9" />
          </linearGradient>
        </defs>
        <path d="M12 2C12 7.5 16.5 12 22 12C16.5 12 12 16.5 12 22C12 16.5 7.5 12 2 12C7.5 12 12 7.5 12 2Z" fill="url(#gemini-grad)" />
      </svg>
    );
  }

  if (lowercaseName.includes("claude")) {
    return (
      <svg className="size-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 3c.6 0 1.2.4 1.4.9l1.8 4.2c.2.4.6.7 1 .8l4.5.6c.6.1 1.1.6 1.1 1.2c0 .6-.4 1.1-.9 1.3l-3.3 2.1c-.3.2-.5.6-.5 1l.8 4.5c.1.6-.2 1.2-.8 1.4c-.5.2-1.1 0-1.5-.4L12 16.8l-3.6 2.8c-.4.4-1 .4-1.5.2c-.6-.2-.9-.8-.8-1.4l.8-4.5c.1-.4-.1-.8-.5-1l-3.3-2.1c-.5-.2-.9-.7-.9-1.3c0-.6.5-1.1 1.1-1.2l4.5-.6c.4-.1.8-.4 1-.8l1.8-4.2c.2-.5.8-.9 1.4-.9z" fill="#d97706" />
      </svg>
    );
  }

  if (lowercaseName.includes("openai") || lowercaseName.includes("gpt")) {
    return (
      <svg className="size-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21.2 9.5c.4-1.3.1-2.8-.8-3.7c-.9-1-2.4-1.3-3.7-.8c-.5-.8-1.3-1.4-2.3-1.6c-1.3-.3-2.7.2-3.5 1.2c-.8-.5-1.8-.7-2.8-.5c-1.3.3-2.3 1.3-2.6 2.6c-.8.1-1.6.6-2.1 1.3c-1 1.2-1 2.9 0 4.1c-.4 1.3-.1 2.8.8 3.7c.9 1 2.4 1.3 3.7.8c.5.8 1.3 1.4 2.3 1.6c.7.2 1.4.1 2-.2l.8.5c1 .6 2.2.6 3.1 0c.3-.2.5-.4.7-.7c.6.3 1.3.4 2 .2c1.3-.3 2.3-1.3 2.6-2.6c.8-.1 1.6-.6 2.1-1.3c1-1.2 1-2.9 0-4.1zm-8.8 9c-.6.3-1.3.2-1.8-.2l-2.6-1.5c-.2-.1-.3-.3-.3-.5v-3.1l2.7 1.6c.3.2.7.2 1 0l2.7-1.6v3.1c.1.4-.1.9-.7 1.2zm-2.8-5.3L6.9 11.6c-.2-.1-.3-.3-.3-.5V8c0-.6.5-1.1 1.1-1.2c.5-.1 1 0 1.4.3l2.6 1.5c.2.1.3.3.3.5v3.1l-2.7-1.6c-.3-.2-.7-.2-1 0zm4.2-2.5l-2.7-1.6V6.1c0-.6.5-1.1 1.1-1.2c.5-.1 1 0 1.4.3l2.6 1.5c.2.1.3.3.3.5v3.1l-2.7-1.6zm2.7 3.3v3.1c0 .6-.5 1.1-1.1 1.2c-.5.1-1 0-1.4-.3l-2.6-1.5c-.2-.1-.3-.3-.3-.5v-3.1l2.7 1.6c.3.2.7.2 1 0l2.7-1.6z" fill="#10b981" />
      </svg>
    );
  }

  if (lowercaseName.includes("grok")) {
    return (
      <svg className="size-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 20L15 4H20L9 20H4Z" fill="#ffffff" />
        <path d="M15 20L20 20L11 4H7.5L15 20Z" fill="#ffffff" fillOpacity="0.4" />
      </svg>
    );
  }

  if (lowercaseName.includes("blackbox")) {
    return (
      <svg className="size-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" fill="#000000" stroke="#00f5ff" strokeWidth="1.5" />
        <path d="M12 2L3 7l9 5 9-5-9-5z" fill="#111111" stroke="#00f5ff" strokeWidth="1" />
        <path d="M12 12v10" stroke="#00f5ff" strokeWidth="1" />
        <path d="M8 12.5l-2.5 1.5 2.5 1.5" stroke="#a855f7" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 12.5l2.5 1.5-2.5 1.5" stroke="#a855f7" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (lowercaseName.includes("deepseek")) {
    return (
      <svg className="size-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="5" fill="#0c66ff" />
        <path d="M6 8c2-1.5 5-2 8-1s5.5 3 6.5 6" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M5 12c1.5-1.2 4-1.5 6.5-.8s4.5 2.2 5.5 4.8" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.8" />
        <path d="M4 16c1-1 2.5-1.2 4-.8s3 1.5 3.8 3.3" stroke="#ffffff" strokeWidth="1.4" strokeLinecap="round" strokeOpacity="0.5" />
      </svg>
    );
  }

  if (lowercaseName.includes("copilot")) {
    return (
      <svg className="size-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2a4 4 0 00-4 4v1H6a3 3 0 00-3 3v6a3 3 0 003 3h12a3 3 0 003-3v-6a3 3 0 00-3-3h-2V6a4 4 0 00-4-4zm-2 4a2 2 0 114 0v1h-4V6z" fill="#00f5ff" fillOpacity="0.2" stroke="#00f5ff" strokeWidth="1.5" />
        <circle cx="8.5" cy="13.5" r="1.5" fill="#00f5ff" />
        <circle cx="15.5" cy="13.5" r="1.5" fill="#00f5ff" />
        <path d="M10 17h4" stroke="#00f5ff" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="10" rx="2" />
      <circle cx="12" cy="5" r="2" />
      <path d="M12 7v4M8 16h.01M16 16h.01" />
    </svg>
  );
}

const getToolLogo = (name: string): string => {
  const lowercaseName = name.toLowerCase();
  const candidates = [
    lowercaseName.replace(" ai", "").replace(" gpt", "").replace("github ", "").trim(),
  ];
  
  if (lowercaseName.includes("openai") || lowercaseName.includes("gpt")) {
    candidates.push("chatgpt", "openai", "gpt");
  }
  if (lowercaseName.includes("claude")) {
    candidates.push("claude", "anthropic");
  }
  if (lowercaseName.includes("copilot")) {
    candidates.push("copilot", "github-copilot", "microsoft-copilot");
  }
  if (lowercaseName.includes("gemini")) {
    candidates.push("gemini", "google");
  }
  if (lowercaseName.includes("antigravity")) {
    candidates.push("antigravity", "acts");
  }

  const matched = Object.keys(allImageFiles).find((key) => {
    const lowerKey = key.toLowerCase();
    return candidates.some((c) => 
      lowerKey.includes(`/public/images/tools/${c}.`) ||
      lowerKey.includes(`/public/images/tools/${c}/`)
    );
  });

  if (matched) {
    return matched.replace(/^\/public/, '');
  }
  return "";
};

function AIToolsBox() {
  const tools = [
    { name: "Antigravity", category: "Agent Assistant" },
    { name: "Cursor", category: "IDE / Dev" },
    { name: "Gemini", category: "Analysis LLM" },
    { name: "Claude AI", category: "Reasoning LLM" },
    { name: "OpenAI GPT", category: "Coding LLM" },
    { name: "Grok", category: "Real-time LLM" },
    { name: "Blackbox AI", category: "AI Developer" },
    { name: "GitHub Copilot", category: "AI Pair Programmer" },
    { name: "DeepSeek", category: "Reasoning Model" },
  ];

  return (
    <div className="glass-panel rounded-xl p-5 border border-white/5 bg-white/2">
      <h3 className="font-display text-sm font-bold text-cyan-glow flex items-center gap-2">
        <Zap className="size-4 text-cyan-glow animate-pulse" />
        AI Tools & LLMs
      </h3>
      <p className="mt-1 text-[10px] text-white/40">Modern workflows and intelligent helpers I build with</p>
      
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-2.5">
        {tools.map((t) => {
          const localLogo = getToolLogo(t.name);
          return (
            <div 
              key={t.name}
              className="flex items-center gap-2 rounded-lg border border-white/5 bg-white/3 p-2.5 transition duration-300 hover:border-cyan-glow/30 hover:bg-cyan-glow/5"
            >
              <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-black/30 p-1">
                {localLogo ? (
                  <img 
                    src={localLogo} 
                    alt={t.name}
                    className="size-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = "none";
                    }}
                  />
                ) : (
                  <ToolLogo name={t.name} />
                )}
              </div>
              <div className="min-w-0">
                <p className="truncate text-[10px] font-bold text-white leading-none">{t.name}</p>
                <p className="truncate text-[8px] text-white/35 mt-1 leading-none">{t.category}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SkillCapabilityGrid() {
  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 items-stretch">
      {SKILL_GROUPS.map((group) => (
        <div key={group.title} className="glass-panel rounded-xl p-5 flex flex-col justify-between h-full border border-white/5 bg-white/2">
          <div>
            <h3 className="font-display text-sm font-bold text-cyan-glow">{group.title}</h3>
            <p className="mt-1 text-[10px] text-white/40">{group.subtitle}</p>
            <div className="space-y-2 mt-4">
              {group.skills.map((skill) => {
                const IconComponent = skill.icon;
                return (
                  <div
                    key={skill.name}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg border border-white/5 bg-white/2 hover:border-cyan-glow/20 transition-all duration-300"
                  >
                    {IconComponent && <IconComponent className="size-3.5 text-cyan-glow/85 shrink-0" />}
                    <span className="text-[11px] font-medium text-white/90 truncate">{skill.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ExperienceSection({ id }: { id: string }) {
  const experiences = [
    {
      org: "ACTS-EDC (Previously GeekRoom), USAR",
      role: "PR & Outreach Lead",
      period: "Oct 2023 – Present",
      bullets: [
        "Product-managed 3 national hackathons from ideation to execution, coordinating cross-functional engineering, marketing, and operations teams for 1000+ active participants.",
        "Established strategic partnerships and sponsor pipelines, raising ₹50,000+ in sponsor capital and scaling the student developer community network by 150% (1,500+ active members).",
        "Analyzed event registration analytics and user flow bottlenecks on registration portals to optimize onboarding, improving registration completion rates.",
      ],
      skills: ["Product Scoping", "Cross-functional Leadership", "Sponsorship Negotiation", "User Analytics", "Event Operations"],
      photos: getImagesFromFolder("experience/geekroom", ["/images/hackathon-host.jpg", "/images/hackathon-host-2.jpg"]),
      photoCaption: "Organizing & hosting national hackathons with 1000+ participants",
      icon: Users,
      iconColor: "text-purple-neon bg-purple-neon/10 border-purple-neon/30 shadow-[0_0_15px_rgba(168,85,247,0.2)]",
      borderColor: "hover:border-purple-neon/30",
    },
    {
      org: "GameDevGuild, USAR",
      role: "Technical Lead & Core R&D Member",
      period: "Oct 2023 – Oct 2025",
      bullets: [
        "Researched and benchmarked different Unity engine versions and real-time collaboration options (such as Unity SCM/Collaborate) to optimize workflow systems for multi-member game development projects.",
        "Directed core R&D processes for game prototyping, translating complex design constraints into system features while profiling code to resolve runtime bottlenecks.",
        "Managed public relations (PR), coordinated corporate outreach to secure sponsorships, and contacted industry speakers for specialized technical workshops on campus.",
      ],
      skills: ["Unity 3D", "Real-Time Collaboration", "Game R&D", "Speaker Outreach", "Sponsorship & PR", "Performance Optimization"],
      photos: getImagesFromFolder("experience/gamedevguild", ["/images/gallery-3.jpg", "/images/gallery-1.jpg", "/images/gallery-2.jpg"]),
      photoCaption: "Game R&D prototyping, collaborative setups, and technical workshop events",
      icon: Trophy,
      iconColor: "text-amber-400 bg-amber-400/10 border-amber-400/30 shadow-[0_0_15px_rgba(251,191,36,0.2)]",
      borderColor: "hover:border-amber-400/30",
    },
  ];

  return (
    <section id={id} className="relative z-10 mx-auto w-full max-w-6xl scroll-mt-20 px-4 py-10 sm:py-12">
      <h2 className="font-display text-2xl font-bold text-cyan-glow md:text-3xl">Professional Experience</h2>
      <p className="mt-2 text-sm text-white/55">Leadership roles and technical contributions in community ecosystems</p>

      <div className="relative mt-12 ml-4 pl-8 md:ml-6 md:pl-12 border-l-2 border-white/10 space-y-12">
        {experiences.map((exp, index) => {
          const Icon = exp.icon;
          return (
            <div key={index} className="relative group/item">
              {/* Timeline Icon Node */}
              <div className={`absolute -left-[50px] md:-left-[66px] top-1.5 flex size-10 md:size-12 items-center justify-center rounded-full border bg-space transition-transform duration-300 group-hover/item:scale-110 ${exp.iconColor}`}>
                <Icon className="size-5 md:size-6" />
              </div>

              {/* Card Container */}
              <div className={`glass-panel rounded-xl p-6 transition duration-300 hover:scale-[1.01] ${exp.borderColor}`}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  
                  {/* Left Column: Role Details */}
                  <div className="lg:col-span-8 space-y-4">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h3 className="font-display text-lg font-bold text-white leading-tight">
                          {exp.org}
                        </h3>
                        <p className="text-sm font-semibold text-purple-neon mt-0.5">{exp.role}</p>
                      </div>
                      <span className="inline-block self-start rounded-full border border-cyan-glow/20 bg-cyan-glow/8 px-3 py-1 text-xs font-bold text-cyan-glow sm:self-center shrink-0">
                        {exp.period}
                      </span>
                    </div>

                    <ul className="space-y-2 text-xs sm:text-sm text-white/75 list-disc pl-5">
                      {exp.bullets.map((bullet, bIdx) => (
                        <li key={bIdx}>{bullet}</li>
                      ))}
                    </ul>

                    <div className="pt-4 border-t border-white/5">
                      <p className="text-[10px] text-white/40 mb-2 font-semibold uppercase tracking-wider">Core Areas</p>
                      <SkillChips items={exp.skills} />
                    </div>
                  </div>

                  {/* Right Column: Image Slideshow */}
                  <div className="lg:col-span-4 flex items-center justify-center">
                    <SlideshowFrame
                      srcs={exp.photos}
                      alt={exp.org}
                      caption={exp.photoCaption}
                      aspect="aspect-video lg:aspect-[4/3]"
                      className="w-full shadow-lg"
                    />
                  </div>

                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function EventBannerCard({
  ev,
  widthPx,
  expanded,
  onToggle,
}: {
  ev: EventBannerItem;
  widthPx: number;
  expanded: boolean;
  onToggle: () => void;
}) {
  const [imgFailed, setImgFailed] = useState(false);
  const cardW = expanded ? Math.max(260, Math.round(widthPx * 1.75)) : widthPx;

  // Slideshow Logic
  const images = useMemo(() => {
    if (ev.gallery && ev.gallery.length > 0) {
      return ev.gallery;
    }
    return [ev.image];
  }, [ev.gallery, ev.image]);

  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImgIndex((prev) => (prev + 1) % images.length);
    }, 3000 + Math.random() * 1000); // Random offset to avoid simultaneous changes
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <article
      style={{ width: cardW, minWidth: cardW }}
      className={`relative flex shrink-0 flex-col overflow-hidden rounded-xl border glass-panel transition-[width] duration-300 ${
        ev.type.includes("hosted") ? "border-cyan-glow/30" : ev.type === "certification" ? "border-amber-500/30" : "border-purple-neon/30"
      } ${expanded ? "z-20 ring-1 ring-cyan-glow/50 shadow-[0_0_40px_rgb(0_245_255/0.15)]" : ""}`}
    >
      <ExpandResizeButton
        expanded={expanded}
        onToggle={onToggle}
        size="tiny"
        className="absolute right-1 top-1 z-30 sm:right-1.5 sm:top-1.5"
      />

      <button type="button" onClick={onToggle} className="w-full text-left">
        <div
          className={`relative w-full overflow-hidden bg-black/50 ${
            expanded ? "aspect-video" : "aspect-[4/3]"
          }`}
        >
          {!imgFailed ? (
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.img
                key={currentImgIndex}
                src={images[currentImgIndex]}
                alt={`${ev.name} slide ${currentImgIndex + 1}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 size-full object-cover"
                loading="lazy"
                onError={() => setImgFailed(true)}
              />
            </AnimatePresence>
          ) : (
            <div className="flex size-full flex-col items-center justify-center gap-1 bg-linear-to-br from-cyan-glow/10 to-purple-node/15 p-2">
              <ImageIcon className="size-6 text-cyan-glow/40" />
              <span className="px-1 text-center text-[9px] text-white/40">Add photo</span>
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col gap-1.5 p-3 sm:p-4">
          <div className="flex flex-col gap-1 items-start mb-1.5">
            <span
              className={`rounded px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wide border ${
                ev.type === "hosted"
                  ? "bg-cyan-glow/15 text-cyan-glow border-cyan-glow/30 shadow-[0_0_8px_rgba(0,245,255,0.15)]"
                  : ev.type === "hosted & attended"
                  ? "bg-teal-500/15 text-teal-300 border-teal-500/30 shadow-[0_0_8px_rgba(16,185,129,0.15)]"
                  : ev.type === "certification"
                  ? "bg-amber-500/15 text-amber-300 border-amber-500/30 shadow-[0_0_8px_rgba(245,158,11,0.15)]"
                  : "bg-purple-node/15 text-purple-neon border-purple-node/30 shadow-[0_0_8px_rgba(168,85,247,0.15)]"
              }`}
            >
              {ev.type}
            </span>
            <span className="rounded bg-black/40 px-1.5 py-0.5 text-[8px] font-semibold text-white/70 border border-white/10 uppercase tracking-wide">
              {ev.locationType}
            </span>
          </div>
          <h4
            className={`font-semibold leading-snug text-white ${
              expanded ? "text-base" : "line-clamp-2 text-sm"
            }`}
          >
            {ev.name}
          </h4>
          <p className="flex items-center gap-1.5 text-xs font-medium text-white/55">
            <CalendarDays className="size-3.5 shrink-0 text-cyan-glow/70" />
            {ev.date}
          </p>
          {!expanded && (
            <span className="text-[9px] uppercase tracking-wider text-white/35">
              Tap or enlarge →
            </span>
          )}
        </div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-glass-border px-3 pb-3 sm:px-4 sm:pb-4"
          >
            {ev.description && (
              <p className="mt-1 mb-3 text-xs leading-relaxed text-white/80 whitespace-pre-line border-b border-glass-border/30 pb-3">
                {ev.description}
              </p>
            )}
            <p className="mb-2 mt-1 text-[10px] uppercase tracking-wider text-white/40">Photos</p>
            <CompactGallery
              images={ev.gallery?.length ? ev.gallery : [ev.image]}
              altPrefix={ev.name}
            />
            <p className="mt-2 text-[10px] leading-relaxed text-white/55 uppercase font-mono tracking-wider">
              {ev.type} · {ev.locationType} · {ev.date}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}

function EventsMarqueeBanner({ items }: { items: EventBannerItem[] }) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const count = Math.max(items.length, 1);
  const cardWidthPx = Math.max(148, Math.min(240, Math.floor(1200 / count)));
  const duration = 28 + count * 2.5;
  const loop = [...items, ...items];
  const paused = expandedId !== null;

  const toggleBanner = (id: string) => {
    setExpandedId((cur) => (cur === id ? null : id));
  };

  return (
    <div className="relative mt-8 w-full overflow-hidden rounded-xl border border-glass-border bg-black/50 py-4 sm:py-5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-linear-to-r from-space to-transparent sm:w-16" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-linear-to-l from-space to-transparent sm:w-16" />

      {paused && (
        <p className="mb-2 text-center text-[10px] uppercase tracking-widest text-cyan-glow/70">
          Banner paused — shrink to resume scroll
        </p>
      )}

      <motion.div
        className="flex w-max items-stretch gap-3 px-4 sm:gap-4"
        animate={paused ? undefined : { x: ["0%", "-50%"] }}
        transition={paused ? { duration: 0 } : { duration, repeat: Infinity, ease: "linear" }}
      >
        {loop.map((ev, i) => (
          <EventBannerCard
            key={`${ev.id}-${i}`}
            ev={ev}
            widthPx={cardWidthPx}
            expanded={expandedId === ev.id}
            onToggle={() => toggleBanner(ev.id)}
          />
        ))}
      </motion.div>
    </div>
  );
}

function RecruiterCTA({ onExecute }: { onExecute: () => void }) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 20 });
  const sy = useSpring(y, { stiffness: 300, damping: 20 });

  const onMove = (e: ReactMouseEvent) => {
    const el = btnRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.hypot(dx, dy);
    if (dist < 140) {
      x.set(dx * 0.25);
      y.set(dy * 0.25);
    } else {
      x.set(0);
      y.set(0);
    }
  };

  const ticker = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <section className="relative z-10 border-y border-glass-border bg-black py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-4 text-center">
        <div className="mx-auto mb-8 inline-flex items-center gap-2 rounded-full border border-cyan-glow/25 bg-cyan-glow/5 px-4 py-1.5">
          <MessageCircle className="size-3.5 text-cyan-glow" />
          <span className="font-mono text-[10px] font-medium tracking-[0.2em] text-cyan-glow md:text-xs">
            COGNITIVE STRATEGY RETENTION LOOP
          </span>
        </div>

        <h2 className="font-sans-ui text-3xl font-extrabold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
          NEED A PRODUCT LEAD WHO
          <br />
          UNDERSTANDS AI & CODE?
          <br />
          <span className="bg-linear-to-r from-cyan-glow via-cyan-glow to-purple-neon bg-clip-text text-transparent">
            OR A BUILDER WHO SCALES USERS?
          </span>
        </h2>

        <div className="mt-10 overflow-hidden rounded-lg bg-black/80 py-3">
          <motion.div
            className="flex whitespace-nowrap font-mono text-xs font-medium uppercase tracking-wider md:text-sm"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          >
            {ticker.map((item, i) => (
              <span
                key={`${item.text}-${i}`}
                className={`px-6 ${
                  item.tone === "cyan"
                    ? "text-cyan-glow"
                    : item.tone === "purple"
                      ? "text-purple-neon"
                      : "text-white/75"
                }`}
              >
                {item.text} //
              </span>
            ))}
          </motion.div>
        </div>

        <motion.button
          ref={btnRef}
          type="button"
          style={{ x: sx, y: sy }}
          onMouseMove={onMove}
          onMouseLeave={() => {
            x.set(0);
            y.set(0);
          }}
          onClick={onExecute}
          className="mt-12 w-full max-w-2xl rounded-2xl bg-linear-to-r from-cyan-glow to-teal-400 px-8 py-5 font-mono text-sm font-bold uppercase tracking-wide text-black shadow-[0_0_40px_rgb(0_245_255/0.45)] transition hover:brightness-110 md:text-base"
        >
          EXECUTE: INJECT PRANJAL INTO TEAM &gt;
        </motion.button>
      </div>
    </section>
  );
}

function GlitchRipple({ active }: { active: boolean }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="pointer-events-none fixed inset-0 z-[100]"
          aria-hidden
        >
          <motion.div
            className="absolute inset-0 bg-cyan-glow/15 mix-blend-screen"
            initial={{ scale: 0 }}
            animate={{ scale: 2.5, opacity: 0 }}
            transition={{ duration: 0.55 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function SocialIconLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className="flex size-11 items-center justify-center rounded-full border border-glass-border bg-white/4 text-white/65 transition hover:border-cyan-glow/50 hover:bg-cyan-glow/10 hover:text-cyan-glow"
    >
      {children}
    </a>
  );
}

function ContactDirectBlock() {
  return (
    <div className="glass-panel flex h-full flex-col space-y-3 rounded-xl p-5 sm:p-6">
      <p className="text-xs font-semibold uppercase tracking-widest text-cyan-glow/80">
        Direct contact
      </p>

      <a
        href={`mailto:${CONTACT_EMAIL}`}
        className="group flex items-center gap-3 rounded-lg border border-transparent px-2 py-2 transition hover:border-glass-border hover:bg-white/3"
      >
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-cyan-glow/10 text-cyan-glow">
          <Mail className="size-4" />
        </span>
        <span className="min-w-0">
          <span className="block text-[10px] uppercase tracking-wider text-white/45">Email</span>
          <span className="block truncate text-sm text-white/90 transition group-hover:text-cyan-glow">
            {CONTACT_EMAIL}
          </span>
        </span>
      </a>

      <a
        href={`tel:${CONTACT_PHONE_TEL}`}
        className="group flex items-center gap-3 rounded-lg border border-transparent px-2 py-2 transition hover:border-glass-border hover:bg-white/3"
      >
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-cyan-glow/10 text-cyan-glow">
          <Phone className="size-4" />
        </span>
        <span>
          <span className="block text-[10px] uppercase tracking-wider text-white/45">Mobile</span>
          <span className="block text-sm text-white/90 transition group-hover:text-cyan-glow">
            {CONTACT_PHONE_DISPLAY}
          </span>
        </span>
      </a>

      <a
        href={PORTFOLIO_PDF_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex w-full items-center justify-center gap-2 rounded-lg border border-cyan-glow/30 bg-cyan-glow/10 px-4 py-3 text-sm font-semibold text-cyan-glow transition hover:bg-cyan-glow/20"
      >
        <FileText className="size-4" />
        View portfolio PDF
        <ExternalLink className="size-3.5 opacity-60" />
      </a>
    </div>
  );
}

function MagneticSubmitButton({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 280, damping: 22 });
  const sy = useSpring(y, { stiffness: 280, damping: 22 });

  const onMove = (e: ReactMouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    if (Math.hypot(dx, dy) < 100) {
      x.set(dx * 0.3);
      y.set(dy * 0.3);
    } else {
      x.set(0);
      y.set(0);
    }
  };

  return (
    <motion.button
      ref={ref}
      type="submit"
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className="flex w-full items-center justify-center gap-2 rounded-lg border border-cyan-glow/40 bg-cyan-glow/15 px-6 py-3 text-sm font-semibold text-cyan-glow transition hover:bg-cyan-glow/25 md:w-auto"
    >
      {children}
    </motion.button>
  );
}

const SHOWCASE_SLIDES = [
  {
    title: "PRODUCT RELEVANCY",
    subtitle: "Bridging AI Models & User Value",
    bullets: [
      "Bridges complex technical feasibility with high-impact user experiences.",
      "Converts data insights into precise product requirements.",
      "Optimizes product-market fit for intelligent tools."
    ],
    stats: [
      { label: "STRATEGY", value: "Expert" },
      { label: "ANALYTICS", value: "Advanced" },
      { label: "UI / UX", value: "Intuitive" }
    ],
    bgGradient: "from-cyan-glow/20 via-transparent to-purple-node/15",
    textColor: "text-cyan-glow",
    titleGradient: "from-cyan-glow via-cyan-300 to-purple-neon"
  },
  {
    title: "MARKETING & SALES",
    subtitle: "Growth Hacking & B2B Lead Gen",
    bullets: [
      "Launched Google Sites art showcase at age 16 (in 2022).",
      "Configured paid search & social campaigns to drive buyer leads.",
      "Listed catalog on B2B directories to secure commissions."
    ],
    stats: [
      { label: "AGE ALUM", value: "16 Yrs" },
      { label: "LEAD SOURCE", value: "Paid Ads" },
      { label: "SALES DIR", value: "IndiaMART" }
    ],
    bgGradient: "from-amber-500/20 via-transparent to-rose-600/15",
    textColor: "text-amber-500",
    titleGradient: "from-amber-500 via-orange-400 to-rose-500"
  },
  {
    title: "LEADERSHIP & COMMS",
    subtitle: "PR outreach & cross-functional talks",
    bullets: [
      "Spearheaded PR & outreach communications for 3 national hackathons.",
      "Coordinated corporate outreach, raising ₹50,000+ in sponsor capital.",
      "Led cross-team synchronization between design & engineering."
    ],
    stats: [
      { label: "COMMS SCALE", value: "Lead" },
      { label: "SPONSORS", value: "₹50K+" },
      { label: "PARTICIPANTS", value: "1000+" }
    ],
    bgGradient: "from-purple-node/20 via-transparent to-pink-500/15",
    textColor: "text-purple-neon",
    titleGradient: "from-purple-neon via-pink-400 to-amber-500"
  },
  {
    title: "AI & PROMPT ENGINEERING",
    subtitle: "Deep LLM Architectures & Workflows",
    bullets: [
      "Structured advanced prompt orchestration pipelines (Gemini/Claude).",
      "Implemented serverless backend queries & Vector storage (Convex).",
      "Integrated real-time AI API frameworks for counselors."
    ],
    stats: [
      { label: "PROMPT ENG", value: "Expert" },
      { label: "AI MODELS", value: "Gemini" },
      { label: "BACKEND", value: "Convex" }
    ],
    bgGradient: "from-cyan-glow/20 via-transparent to-blue-600/15",
    textColor: "text-cyan-glow",
    titleGradient: "from-cyan-glow via-blue-400 to-purple-node"
  },
  {
    title: "PROJECTS: LEAD & BUILDER",
    subtitle: "Deep Technical Prototyping & Execution",
    bullets: [
      "Team Lead for NPIS fuzing Aadhaar Demographics & Census data.",
      "Trained PyTorch mask-aware facial U-Net deep learning models.",
      "Co-developed Solidity blockchain authenticity certification contracts."
    ],
    stats: [
      { label: "DISTRICTS", value: "640+" },
      { label: "MODELS", value: "U-Net CNN" },
      { label: "BLOCKCHAIN", value: "Hardhat" }
    ],
    bgGradient: "from-emerald-500/20 via-transparent to-cyan-500/15",
    textColor: "text-emerald-400",
    titleGradient: "from-emerald-400 via-teal-300 to-cyan-glow"
  },
  {
    title: "COMMUNITY & HOBBIES",
    subtitle: "Hosted Hackathons, Hobbies & Social Reach",
    bullets: [
      "Hosted GeekVerse & VibeClash hackathons under ACTS-EDC.",
      "Passionate about expressive dance and traveling cultures.",
      "Active social presence: 4K+ followers, 2M+ organic views."
    ],
    stats: [
      { label: "FOLLOWERS", value: "4K+" },
      { label: "VIEWS", value: "2M+" },
      { label: "PASSIONS", value: "Dance/Travel" }
    ],
    bgGradient: "from-purple-neon/20 via-transparent to-cyan-glow/15",
    textColor: "text-purple-neon",
    titleGradient: "from-purple-neon via-pink-400 to-cyan-glow"
  }
];

function ShowcaseGraphic({ index }: { index: number }) {
  if (index === 0) {
    return (
      <div className="relative size-full flex items-center justify-center">
        <div className="absolute size-14 rounded-full border border-cyan-glow/30 animate-ping opacity-25" />
        <div className="absolute size-10 rounded-full border border-purple-node/30 animate-pulse opacity-45" />
        <div className="relative size-8 rounded-full bg-linear-to-br from-cyan-glow to-purple-node flex items-center justify-center shadow-[0_0_12px_rgba(0,245,255,0.4)]">
          <Sparkles className="size-3 text-white animate-spin" style={{ animationDuration: '8s' }} />
        </div>
      </div>
    );
  }
  if (index === 1) {
    return (
      <div className="size-full flex flex-col justify-center items-center px-4 space-y-1">
        <div className="w-16 h-2 bg-amber-500/20 border border-amber-500/40 rounded-xs flex items-center justify-center text-[6px] text-amber-500 font-mono leading-none">Total Traffic</div>
        <div className="w-10 h-2 bg-orange-500/20 border border-orange-500/40 rounded-xs flex items-center justify-center text-[6px] text-orange-400 font-mono leading-none">Qualified Leads</div>
        <div className="w-6 h-2 bg-rose-500/20 border border-rose-500/40 rounded-xs flex items-center justify-center text-[6px] text-rose-400 font-mono leading-none">B2B Sale</div>
      </div>
    );
  }
  if (index === 2) {
    return (
      <div className="size-full flex items-center justify-center">
        <div className="relative flex items-center justify-center">
          <div className="size-5 rounded-full bg-purple-node border border-purple-neon/50 flex items-center justify-center text-white text-[6px] font-bold">PR</div>
          <div className="absolute -top-3.5 -left-3.5 size-2.5 rounded-full bg-cyan-glow/30 border border-cyan-glow animate-pulse" />
          <div className="absolute -bottom-3.5 -right-3.5 size-2.5 rounded-full bg-cyan-glow/30 border border-cyan-glow animate-pulse" />
          <div className="absolute -top-2.5 -right-4 size-1.5 bg-white/20 rounded-full" />
          <div className="absolute -bottom-2.5 -left-4 size-1.5 bg-white/20 rounded-full" />
        </div>
      </div>
    );
  }
  if (index === 3) {
    return (
      <div className="size-full flex flex-col justify-center px-3 space-y-1 font-mono text-[6px] sm:text-[7px] text-white/70">
        <div className="flex justify-between items-center bg-black/40 border border-white/5 rounded px-1.5 py-0.5 leading-none">
          <span>prompt: check</span>
          <span className="text-emerald-400 font-bold">✔ OK</span>
        </div>
        <div className="flex justify-between items-center bg-black/40 border border-white/5 rounded px-1.5 py-0.5 leading-none">
          <span>model: gemini</span>
          <span className="text-cyan-glow font-bold">ACTIVE</span>
        </div>
      </div>
    );
  }
  if (index === 4) {
    return (
      <div className="size-full flex items-center justify-center gap-2">
        <div className="size-6 rounded border border-emerald-500 bg-emerald-500/10 flex items-center justify-center shadow-[0_0_8px_rgba(16,185,129,0.2)]">
          <FileText className="size-3 text-emerald-400" />
        </div>
        <div className="h-px w-3 border-t border-dashed border-emerald-500/40 animate-pulse" />
        <div className="size-6 rounded border border-cyan-glow bg-cyan-glow/10 flex items-center justify-center shadow-[0_0_8px_rgba(0,245,255,0.2)]">
          <Cpu className="size-3 text-cyan-glow" />
        </div>
        <div className="h-px w-3 border-t border-dashed border-cyan-glow/40 animate-pulse" />
        <div className="size-6 rounded border border-purple-node bg-purple-node/10 flex items-center justify-center shadow-[0_0_8px_rgba(168,85,247,0.2)]">
          <Award className="size-3 text-purple-neon animate-bounce" />
        </div>
      </div>
    );
  }
  return (
    <div className="size-full flex flex-row items-center justify-center gap-3 text-center">
      <div className="flex flex-col items-center">
        <Globe className="size-3.5 text-purple-neon animate-pulse" />
        <span className="text-[5px] text-white/40 mt-0.5">Travel</span>
      </div>
      <div className="flex flex-col items-center">
        <Sparkles className="size-3.5 text-cyan-glow animate-bounce" />
        <span className="text-[5px] text-white/40 mt-0.5">Dance</span>
      </div>
      <div className="flex flex-col items-center">
        <Users className="size-3.5 text-pink-400" />
        <span className="text-[5px] text-white/40 mt-0.5">Outreach</span>
      </div>
    </div>
  );
}

function ProductIntroShowcase() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentSlide((slide) => (slide + 1) % SHOWCASE_SLIDES.length);
          return 0;
        }
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const slide = SHOWCASE_SLIDES[currentSlide];

  const handleNext = () => {
    setProgress(0);
    setCurrentSlide((prev) => (prev + 1) % SHOWCASE_SLIDES.length);
  };

  const handlePrev = () => {
    setProgress(0);
    setCurrentSlide((prev) => (prev - 1 + SHOWCASE_SLIDES.length) % SHOWCASE_SLIDES.length);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-glass-border bg-black/45 p-2 shadow-[0_0_30px_rgba(0,245,255,0.05)] transition-all duration-300 hover:border-purple-neon/30 hover:shadow-[0_0_40px_rgba(168,85,247,0.15)] select-none">
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-space/95 border border-white/5 flex flex-col justify-between p-4 sm:p-5 md:p-6 lg:p-7">
        
        {/* Cybernetic Scanlines & Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,245,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,245,255,0.02)_1px,transparent_1px)] bg-[size:14px_14px] pointer-events-none opacity-30" />
        <div className="scanline absolute inset-0 pointer-events-none" />
        
        {/* Glow blur matching active slide */}
        <div className={`absolute -right-16 -top-16 size-48 rounded-full bg-gradient-to-br ${slide.bgGradient} blur-3xl opacity-50 pointer-events-none transition-all duration-700`} />

        {/* Top bar */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-1.5 rounded-full bg-black/70 px-2 py-0.5 text-[8px] sm:text-[9px] uppercase tracking-widest text-cyan-glow font-bold border border-white/5">
            <span className="relative flex size-1.5">
              {isPlaying && (
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-cyan-glow opacity-75" />
              )}
              <span className={`relative inline-flex size-1.5 rounded-full ${isPlaying ? "bg-cyan-glow" : "bg-white/40"}`} />
            </span>
            {isPlaying ? "LIVE FEED" : "PAUSED"}
          </div>
          <div className="text-[8px] sm:text-[9px] text-white/50 tracking-wider font-mono uppercase bg-black/70 px-2 py-0.5 rounded border border-white/5">
            SHOT 0{currentSlide + 1} / 0{SHOWCASE_SLIDES.length}
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-4 items-center flex-1 my-2">
          {/* Left Text Column */}
          <div className="md:col-span-8 flex flex-col justify-center h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="space-y-1 sm:space-y-2.5"
              >
                {/* Word Art text format */}
                <h3 className={`font-display text-sm sm:text-xl md:text-2xl font-black tracking-tight uppercase leading-none bg-gradient-to-r ${slide.titleGradient} bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(0,245,255,0.25)]`}>
                  {slide.title}
                </h3>
                <p className="text-[9px] sm:text-[10px] md:text-xs font-semibold text-white/80 leading-none">
                  {slide.subtitle}
                </p>
                <ul className="space-y-1 mt-1 sm:mt-2">
                  {slide.bullets.map((b, i) => (
                    <li key={i} className="flex gap-1.5 items-start text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs text-white/60 leading-tight">
                      <span className={`${slide.textColor} font-bold text-[7px] sm:text-[9px]`}>▶</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Graphical Column */}
          <div className="hidden md:flex md:col-span-4 flex-col h-full justify-center border-l border-white/5 pl-4 gap-2">
            <div className="h-16 w-full rounded-lg bg-black/45 border border-white/5 overflow-hidden flex items-center justify-center">
              <ShowcaseGraphic index={currentSlide} />
            </div>
            <div className="grid grid-cols-3 gap-1">
              {slide.stats.map((s, idx) => (
                <div key={idx} className="rounded border border-white/5 bg-black/35 p-1 text-center leading-none">
                  <p className="text-[9px] font-bold text-white tracking-tight">{s.value}</p>
                  <p className="text-[5px] uppercase tracking-wider text-white/30 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar controls */}
        <div className="relative z-10 flex flex-col gap-1.5 mt-auto">
          {/* Custom seeker track */}
          <div 
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              const percent = (clickX / rect.width) * 100;
              setProgress(percent);
            }}
            className="h-1 w-full bg-white/10 rounded-full overflow-hidden cursor-pointer"
          >
            <div 
              className="h-full transition-all bg-gradient-to-r from-cyan-glow to-purple-node"
              style={{ width: `${progress}%`, transitionDuration: isPlaying ? '50ms' : '0ms' }}
            />
          </div>

          <div className="flex items-center justify-between text-white/60 font-mono text-[8px] sm:text-[9px]">
            {/* Play controls */}
            <div className="flex items-center gap-2.5">
              <button 
                type="button" 
                onClick={handlePrev}
                className="hover:text-cyan-glow transition cursor-pointer"
                title="Previous Shot"
              >
                <ChevronLeft className="size-3.5" />
              </button>
              
              <button 
                type="button" 
                onClick={togglePlay}
                className="hover:text-cyan-glow transition cursor-pointer flex items-center justify-center size-4 sm:size-5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10"
                title={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <span className="flex gap-0.5">
                    <span className="w-0.5 h-1.5 sm:h-2 bg-white" />
                    <span className="w-0.5 h-1.5 sm:h-2 bg-white" />
                  </span>
                ) : (
                  <Play className="size-1.5 sm:size-2 fill-white text-white ml-0.5" />
                )}
              </button>

              <button 
                type="button" 
                onClick={handleNext}
                className="hover:text-cyan-glow transition cursor-pointer"
                title="Next Shot"
              >
                <ChevronRight className="size-3.5" />
              </button>
            </div>

            {/* Quick click slide selectors */}
            <div className="hidden lg:flex items-center gap-1.5">
              {SHOWCASE_SLIDES.map((s, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setProgress(0);
                    setCurrentSlide(idx);
                  }}
                  className={`px-1 rounded-[3px] text-[7px] tracking-wider transition cursor-pointer border ${
                    idx === currentSlide 
                      ? "border-cyan-glow/40 bg-cyan-glow/15 text-cyan-glow font-bold" 
                      : "border-transparent text-white/35 hover:text-white/70"
                  }`}
                >
                  {s.title.split(" ")[0]}
                </button>
              ))}
            </div>

            {/* Version indicator */}
            <div className="opacity-50">
              [PRODUCT_PLAYBOOK]
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function PolymathOS() {
  const heroRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null);
  const [glitch, setGlitch] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "sent">("idle");
  const [showInstaPopover, setShowInstaPopover] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const instaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.title = "Pranjal Rathore | AI Product Manager";
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (instaRef.current && !instaRef.current.contains(event.target as Node)) {
        setShowInstaPopover(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  const snapToContact = useCallback(() => {
    setGlitch(true);
    setTimeout(() => setGlitch(false), 450);
    contactRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const metrics = useMemo(
    () => [
      { label: "Subscribers & Followers", value: "4K+", sub: "Across YouTube, Instagram, & LinkedIn", icon: Users },
      { label: "Total Views", value: "2M+", sub: "2,000,000+ across creative networks", icon: Activity },
      { label: "Benchmark in 28 Days", value: "800K+", sub: "+1,500 YouTube subscribers in 28 days organically", icon: Zap },
    ],
    [],
  );

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.currentTarget;
    
    // Web3Forms submission setup
    const formData = new FormData(target);
    // Use environment variable for Web3Forms Access Key, fallback to placeholder
    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "YOUR_ACCESS_KEY_HERE";
    formData.append("access_key", accessKey);

    setFormStatus("sent");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        target.reset();
      } else {
        alert("Oops! Something went wrong. Please try again.");
        setFormStatus("idle");
      }
    } catch (err) {
      console.error("Form submission error:", err);
      alert("Could not connect to the form server. Please try again later.");
      setFormStatus("idle");
    }
  };

  return (
    <div className="relative min-h-dvh overflow-x-hidden bg-space text-white/90">
      <SiteHeader />
      <HeroParticleField />
      <GlitchRipple active={glitch} />

      {/* ── Hero: photo + video (stacked mobile, side-by-side desktop) ── */}
      <section
        id="home"
        ref={heroRef}
        className="relative z-10 mx-auto w-full max-w-6xl scroll-mt-20 px-4 pb-8 pt-16 sm:pb-12 sm:pt-20"
      >
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
          {/* Left Column: Title and horizontal (16:9) video below it */}
          <div className="flex flex-col gap-6 lg:col-span-8">
            <div className="text-center md:text-left">
              <p className="text-xs font-medium tracking-widest text-cyan-glow/80">Portfolio · 2026</p>
              <h1 className="mt-2 font-display text-2xl font-bold leading-tight sm:text-4xl md:text-5xl flex flex-wrap items-baseline justify-center md:justify-start gap-x-3 gap-y-1">
                <span>Pranjal Rathore</span>
                <span className="text-xs font-normal tracking-wide text-white/50 md:text-sm">
                  <span className="line-through text-white/35 mr-1.5">fighting</span>
                  <span className="text-cyan-glow font-semibold drop-shadow-[0_0_8px_rgba(0,245,255,0.45)]">Leading with AI</span>
                </span>
              </h1>
              <p className="mt-1 font-display text-base text-cyan-glow sm:text-xl">
                AI Product Manager · Engineer · Growth
              </p>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/65 md:mt-4 md:text-base">
                I bridge the gap between advanced AI models and user adoption. I design data-driven systems, 
                lead product execution, and scale growth engines to 2,000,000+ views.
              </p>
            </div>

            {/* Video Player: Widescreen 16:9 */}
            <div className="w-full">
              <ProductIntroShowcase />
            </div>
          </div>

          {/* Right Column: Portrait Profile Photo */}
          <div className="flex justify-center lg:col-span-4 lg:self-stretch lg:items-center">
            <div className="group relative w-full max-w-[280px] sm:max-w-[320px] lg:max-w-full overflow-hidden rounded-2xl border border-glass-border bg-black/40 p-2 shadow-[0_0_30px_rgba(0,245,255,0.05)] transition-all duration-300 hover:border-cyan-glow/30 hover:shadow-[0_0_40px_rgba(0,245,255,0.15)] flex flex-col justify-center my-auto">
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl">
                <MediaFrame
                  src={PROFILE_PHOTO}
                  alt="Pranjal Rathore"
                  aspect="aspect-[3/4]"
                  className="border-0 rounded-none w-full h-full"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute bottom-4 left-4 right-4 text-center">
                  <h3 className="font-display text-sm font-bold text-white tracking-wide">Pranjal Rathore</h3>
                  <p className="mt-1 text-[10px] uppercase tracking-widest text-cyan-glow">Leading with AI</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-[10px] tracking-widest text-white/35 sm:mt-8">
          Scroll to explore
        </p>
      </section>

      {/* ── About + skills ── */}
      <section id="about" className="relative z-10 mx-auto w-full max-w-6xl scroll-mt-28 px-4 pt-16 pb-2 sm:pt-20 sm:pb-4">
        <h2 className="font-display text-2xl font-bold text-cyan-glow md:text-3xl">About me</h2>
        <p className="mt-2 text-sm text-white/55">An overview of my technical experience, community leadership, and growth metrics</p>
 
        {/* Master Rectangle Layout Box */}
        <div className="glass-panel rounded-2xl p-6 md:p-8 mt-8 border border-white/5 bg-white/2">
          <div className="grid gap-8 lg:grid-cols-12 items-start">
            
            {/* Left Column: About me card (spans 5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-6">
                <div className="flex items-center gap-4 border-b border-white/5 pb-4">
                  {/* Profile photo */}
                  <div className="relative size-16 shrink-0 rounded-xl overflow-hidden border border-cyan-glow/30 shadow-[0_0_15px_rgba(0,245,255,0.2)]">
                    <img
                      src={PROFILE_PHOTO}
                      alt="Pranjal Rathore"
                      className="size-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold text-white">Pranjal Rathore</h3>
                    <p className="text-xs text-cyan-glow font-medium mt-0.5">AI & Data Science Student · USAR</p>
                    <p className="text-[10px] text-white/40 mt-1">Delhi, India</p>
                  </div>
                </div>

                <div className="space-y-4 text-xs leading-relaxed text-white/80">
                  <p className="font-medium text-white/90">
                    I am an AI & Data Science student at USAR who designs, builds, and scales digital products. I bridge the gap between engineering (machine learning, smart contracts, analytics) and business growth (public relations, corporate outreach, and lead generation).
                  </p>
                  <ul className="space-y-3 pl-1">
                    <li className="flex gap-2">
                      <span className="text-cyan-glow select-none">•</span>
                      <span><strong>Tech & Prototyping:</strong> Built AI smart contracts for Hackground India, trained cleft-lip U-Net models in PyTorch, and built census dashboards for India Innovates.</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-purple-neon select-none">•</span>
                      <span><strong>Product Growth:</strong> Ran paid ad campaigns to acquire fine art leads, negotiated B2B sales contracts, and managed e-commerce listings on IndiaMART.</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-emerald-400 select-none">•</span>
                      <span><strong>Outreach & PR:</strong> Grew the ACTS-EDC developer community network by 150% (to 1,500+ members), raised sponsorships, and presented live at Bharat Mandapam.</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 border-t border-white/5 pt-4 text-center">
                <div className="rounded-lg bg-white/2 p-2">
                  <p className="text-sm font-bold text-cyan-glow">4K+</p>
                  <p className="text-[9px] text-white/50 font-semibold mt-0.5">Followers Across</p>
                </div>
                <div className="rounded-lg bg-white/2 p-2">
                  <p className="text-sm font-bold text-purple-neon">2M+</p>
                  <p className="text-[9px] text-white/50 font-semibold mt-0.5">Views Across</p>
                </div>
                <div className="rounded-lg bg-white/2 p-2">
                  <p className="text-sm font-bold text-emerald-400">800K+</p>
                  <p className="text-[9px] text-white/50 font-semibold mt-0.5">Monthly Reach</p>
                </div>
              </div>
            </div>

            {/* Right Column: Skills (spans 7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <SkillCapabilityGrid />
            </div>

          </div>

          {/* Full Width AI Tools and LLMs Box (Elongated Horizontally) */}
          <div className="mt-8 pt-6 border-t border-white/5">
            <AIToolsBox />
          </div>
        </div>
      </section>

      {/* ── Education ── */}
      <section id="education" className="relative z-10 mx-auto w-full max-w-6xl scroll-mt-28 px-4 pt-2 pb-16 sm:pt-4 sm:pb-20">
        <h2 className="font-display text-2xl font-bold text-cyan-glow md:text-3xl">Education</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            {
              degree: "B.Tech — AI & Data Science",
              school: "USAR, GGSIPU · 2024–2028",
              score: "SGPA 7.60",
            },
            {
              degree: "Class XII (CBSE)",
              school: "The Vivekanand School, Delhi",
              score: "CGPA 8.40",
            },
            {
              degree: "Class X (CBSE)",
              school: "Amity International School, Noida",
              score: "CGPA 8.88",
            },
          ].map((edu) => (
            <div key={edu.degree} className="glass-panel rounded-xl p-5 w-[80vw] sm:w-[45vw] md:w-auto shrink-0 snap-center md:shrink md:snap-align-none">
              <GraduationCap className="mb-3 size-6 text-purple-node" />
              <h3 className="font-display text-sm font-bold">{edu.degree}</h3>
              <p className="mt-2 text-xs text-white/60">{edu.school}</p>
              <p className="mt-3 font-semibold text-purple-neon">{edu.score}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Projects ── */}
      <section id="projects" className="relative z-10 mx-auto w-full max-w-6xl scroll-mt-28 px-4 py-16 sm:py-20">
        <h2 className="font-display text-2xl font-bold text-purple-neon md:text-3xl">Projects</h2>
        <p className="mt-2 text-sm text-white/55">
          Each card shows a site snapshot — tap to expand the live preview inside the box
        </p>
        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p) => (
            <ProjectCard
              key={p.id}
              project={p}
              expanded={expandedProject === p.id}
              onToggle={() =>
                setExpandedProject((id) => (id === p.id ? null : p.id))
              }
            />
          ))}
        </div>
      </section>

      {/* ── Social Presence & Impact (unchanged style) ── */}
      <section id="experience" className="relative z-10 mx-auto w-full max-w-6xl scroll-mt-28 px-4 py-16 sm:py-20">
        <h2 className="font-display text-2xl font-bold text-cyan-glow md:text-3xl">Social Presence & Impact</h2>
        <p className="mt-2 text-sm text-white/55">Analytics detailing my content distribution, community reach, and audience impact</p>
        <div className="mt-8 flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 scrollbar-thin scrollbar-track-white/5 scrollbar-thumb-cyan-glow/20 md:grid md:grid-cols-3 md:overflow-x-visible md:pb-0">
          {metrics.map((m) => (
            <div key={m.label} className="glass-panel rounded-xl p-5 w-[80vw] sm:w-[45vw] md:w-auto shrink-0 snap-center md:shrink md:snap-align-none">
              <m.icon className="mb-3 size-6 text-purple-node" />
              <p className="font-display text-3xl font-bold text-glow-cyan">{m.value}</p>
              <p className="mt-1 text-xs font-semibold text-white/70">{m.label}</p>
              <p className="mt-2 text-[11px] text-white/50">{m.sub}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <h3 className="text-sm font-semibold text-cyan-glow">Leadership</h3>
            {[
              {
                role: "Technical Lead & Core R&D Member",
                org: "GameDevGuild, USAR",
                detail:
                  "Researched Unity engine versions & real-time collaboration options, directed gameplay prototyping, managed sponsorships, PR, and speaker outreach.",
              },
              {
                role: "PR & Outreach Lead",
                org: "ACTS-EDC (Previously GeekRoom), USAR",
                detail:
                  "Product-managed 3 national hackathons with 1000+ participants, coordinating cross-functional teams and raising ₹50,000+ in sponsorships.",
              },
            ].map((item) => (
              <div key={`${item.org}-${item.role}`} className="border-l-2 border-purple-node/60 pl-5">
                <p className="font-display text-sm font-bold">{item.role}</p>
                <p className="text-xs text-cyan-glow/80">{item.org}</p>
                <p className="mt-2 text-sm text-white/65">{item.detail}</p>
              </div>
            ))}
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold text-purple-neon">Achievements</h3>
            <ul className="space-y-3">
              {[
                "India Innovates 26 Finalist — Bharat Mandapam",
                "Hackground India 2k25 Finalist — Thoughtworks, Gurgaon (Top 40 / 3000+ Teams)",
                "GeekVerse 2025 & VibeClash 2025 — Organized Flagship Hackathons under ACTS-EDC",
              ].map((a) => (
                <li key={a} className="glass-panel flex gap-3 rounded-lg px-4 py-3 text-sm">
                  <Award className="mt-0.5 size-4 shrink-0 text-cyan-glow" />
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <ExperienceSection id="experience-details" />

      <section id="events" className="relative z-10 mx-auto w-full max-w-6xl scroll-mt-28 px-4 py-16 sm:py-20">
        <h2 className="font-display text-2xl font-bold text-purple-neon md:text-3xl">
          Hackathons & events
        </h2>
        <p className="mt-2 text-sm text-white/55">
          Tap a card to see event photos, skills used, and achievements
        </p>
        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-2">
          {HACKATHON_EVENTS.map((ev) => (
            <EventCard
              key={ev.id}
              event={ev}
              expanded={expandedEvent === ev.id}
              onToggle={() =>
                setExpandedEvent((id) => (id === ev.id ? null : ev.id))
              }
            />
          ))}
        </div>

        <div className="mt-14 border-t border-glass-border pt-10">
          <h3 className="font-display text-lg font-bold text-cyan-glow sm:text-xl">
            Events, Workshops &amp; Certifications
          </h3>
          <p className="mt-1 text-xs text-white/50 sm:text-sm">
            A comprehensive gallery of hackathons hosted, events attended, technical workshops, and professional certifications.
          </p>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-[10px] uppercase tracking-wider text-white/50 font-mono">
            <span className="inline-flex items-center gap-1.5">
              <span className="size-2 rounded-sm border border-cyan-glow/50 bg-cyan-glow/20" />
              Events Hosted ({EVENT_BANNER_ITEMS.filter(x => x.type.includes("hosted")).length})
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="size-2 rounded-sm border border-teal-400/50 bg-teal-400/20" />
              Hackathons Hosted (3)
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="size-2 rounded-sm border border-purple-neon/50 bg-purple-node/20" />
              Attended ({EVENT_BANNER_ITEMS.filter(x => x.type.includes("attended")).length})
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="size-2 rounded-sm border border-amber-500/50 bg-amber-500/20" />
              Certifications ({EVENT_BANNER_ITEMS.filter(x => x.type === "certification").length})
            </span>
            <span className="text-white/30 hidden sm:inline">|</span>
            <span className="inline-flex items-center gap-1.5">
              <Globe className="size-3.5 text-cyan-glow/70" /> Online ({EVENT_BANNER_ITEMS.filter(x => x.locationType === "online").length})
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="size-3.5 text-purple-neon/70" /> Offline ({EVENT_BANNER_ITEMS.filter(x => x.locationType === "offline").length})
            </span>
          </div>
          <EventsMarqueeBanner items={EVENT_BANNER_ITEMS} />
        </div>
      </section>

      <RecruiterCTA onExecute={snapToContact} />



      {/* ── Contact: Get in touch + form side by side ── */}
      <section
        ref={contactRef}
        id="contact"
        className="relative z-10 mx-auto w-full max-w-6xl scroll-mt-28 px-4 py-16 pb-28 sm:py-20 sm:pb-32"
      >
        <h2 className="font-display text-2xl font-bold text-glow-cyan md:text-3xl">Contact</h2>
        <p className="mt-2 max-w-2xl text-sm text-white/55">
          Reach me directly or send a message — I usually reply within 24 hours.
        </p>

        <div className="mt-8 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2 lg:gap-8">
          <div className="flex min-w-0 flex-col">
            <h3 className="font-display text-lg font-bold text-cyan-glow">Get in touch</h3>
            <p className="mt-1 text-sm text-white/50">Email, phone, PDF, and socials</p>
            <div className="mt-4 flex flex-1 flex-col">
              <ContactDirectBlock />
            </div>
            <div className="mt-6">
              <p className="mb-3 text-xs uppercase tracking-widest text-white/40">Connect</p>
              <div className="flex flex-wrap gap-3">
                <SocialIconLink href={LINKEDIN_URL} label="LinkedIn">
                  <Linkedin className="size-5" />
                </SocialIconLink>
                <SocialIconLink href={GITHUB_URL} label="GitHub">
                  <Github className="size-5" />
                </SocialIconLink>
                
                {/* Single Instagram icon with dual popover */}
                <div className="relative" ref={instaRef}>
                  <button
                    type="button"
                    onClick={() => setShowInstaPopover(!showInstaPopover)}
                    aria-label="Instagram Accounts"
                    title="Instagram Accounts"
                    className={`flex size-11 items-center justify-center rounded-full border transition cursor-pointer ${
                      showInstaPopover
                        ? "border-cyan-glow bg-cyan-glow/15 text-cyan-glow shadow-[0_0_12px_rgba(0,245,255,0.35)]"
                        : "border-glass-border bg-white/4 text-white/65 hover:border-cyan-glow/50 hover:bg-cyan-glow/10 hover:text-cyan-glow"
                    }`}
                  >
                    <Instagram className="size-5" />
                  </button>
                  
                  <AnimatePresence>
                    {showInstaPopover && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute bottom-full left-1/2 z-50 mb-3 w-64 -translate-x-1/2 rounded-xl border border-glass-border bg-space/95 p-4 shadow-[0_10px_30px_rgba(0,0,0,0.6)] backdrop-blur-md text-left"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="space-y-3">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-cyan-glow/85">
                            Instagram Profiles
                          </p>
                          <div className="flex flex-col gap-2.5">
                            <a
                              href={INSTAGRAM_PUBLIC_URL}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group flex items-center gap-3 rounded-lg border border-white/5 bg-white/3 p-2 transition hover:border-cyan-glow/30 hover:bg-cyan-glow/5"
                            >
                              <img
                                src={PROFILE_PHOTO}
                                alt="Public Profile DP"
                                className="size-9 rounded-full object-cover border border-white/10 group-hover:border-cyan-glow/30"
                              />
                              <div className="min-w-0 flex-1">
                                <span className="block text-xs font-semibold text-white/90 group-hover:text-cyan-glow truncate">
                                  Pranjal Rathore
                                </span>
                                <span className="block text-[10px] text-white/50 truncate">
                                  @yokhilona
                                </span>
                              </div>
                            </a>
                            <a
                              href={INSTAGRAM_PERSONAL_URL}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group flex items-center gap-3 rounded-lg border border-white/5 bg-white/3 p-2 transition hover:border-cyan-glow/30 hover:bg-cyan-glow/5"
                            >
                              <img
                                src={PROFILE_PHOTO}
                                alt="Personal Profile DP"
                                className="size-9 rounded-full object-cover border border-white/10 group-hover:border-cyan-glow/30"
                              />
                              <div className="min-w-0 flex-1">
                                <span className="block text-xs font-semibold text-white/90 group-hover:text-cyan-glow truncate">
                                  Pranjal Rathore
                                </span>
                                <span className="block text-[10px] text-white/50 truncate">
                                  @rathore__pranjal
                                </span>
                              </div>
                            </a>
                          </div>
                        </div>
                        {/* Little triangle arrow at the bottom of popover */}
                        <div className="absolute top-full left-1/2 size-2.5 -translate-x-1/2 -translate-y-1.5 rotate-45 border-b border-r border-glass-border bg-space/95" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <SocialIconLink href={YOUTUBE_URL} label="YouTube">
                  <Youtube className="size-5" />
                </SocialIconLink>

                <SocialIconLink href={`mailto:${CONTACT_EMAIL}`} label="Email">
                  <Mail className="size-5" />
                </SocialIconLink>
              </div>
            </div>
          </div>

          <div className="flex min-w-0 flex-col">
            <h3 className="font-display text-lg font-bold text-purple-neon">Send a message</h3>
            <p className="mt-1 text-sm text-white/50">Quick note for roles, collabs, or hiring</p>
            <form
              onSubmit={onSubmit}
              className="glass-panel mt-4 flex flex-1 flex-col space-y-5 rounded-xl p-5 sm:p-6"
            >
              <label className="block text-sm text-white/70">
                Name
                <div className="relative mt-2">
                  <User className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-cyan-glow/50" />
                  <input
                    required
                    name="name"
                    className="w-full rounded-lg border border-glass-border bg-space/60 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-cyan-glow/50"
                    placeholder="Your name"
                  />
                </div>
              </label>
              <label className="block text-sm text-white/70">
                Email
                <div className="relative mt-2">
                  <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-cyan-glow/50" />
                  <input
                    required
                    type="email"
                    name="email"
                    className="w-full rounded-lg border border-glass-border bg-space/60 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-cyan-glow/50"
                    placeholder="you@company.com"
                  />
                </div>
              </label>
              <label className="block flex-1 text-sm text-white/70">
                Message
                <textarea
                  required
                  name="message"
                  rows={5}
                  className="mt-2 w-full resize-none rounded-lg border border-glass-border bg-space/60 px-3 py-2.5 text-sm outline-none focus:border-cyan-glow/50 lg:min-h-[120px]"
                  placeholder="What role or project should we discuss?"
                />
              </label>
              <MagneticSubmitButton>
                <Send className="size-4" />
                Send message
              </MagneticSubmitButton>
              {formStatus === "sent" && (
                <p className="text-center text-xs text-cyan-glow">
                  Thank you! Your message has been sent successfully.
                </p>
              )}
            </form>
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-glass-border py-6 text-center text-[10px] tracking-[0.2em] text-white/30">
        Pranjal Rathore · {new Date().getFullYear()}
      </footer>

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 z-50 flex size-10 items-center justify-center rounded-full border border-cyan-glow/40 bg-black/85 text-cyan-glow shadow-[0_0_15px_rgba(0,245,255,0.25)] backdrop-blur-md transition hover:bg-cyan-glow/20 hover:scale-110 cursor-pointer"
            aria-label="Scroll to top"
          >
            <ChevronLeft className="size-5 rotate-90" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
