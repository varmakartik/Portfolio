export const projects = [
  {
    id: 1,
    title: 'Careerly',
    subtitle: 'AI-Powered Career Guidance Platform',
    description:
      'An AI-powered career guidance platform that generates personalized learning roadmaps based on users\' goals and skills.',
    longDescription:
      'Careerly leverages Gemini AI and Clerk authentication to evaluate a user\'s current skills and generate customized, step-by-step career path roadmaps. The platform features an AI chatbot for immediate counseling and integrates learning resources.',
    image: 'project1',
    tags: ['React', 'Node.js', 'MongoDB', 'Clerk Auth', 'Gemini AI'],
    features: [
      'Personalized AI learning roadmap generator',
      'Interactive Gemini AI Chatbot counseling',
      'Clerk-based secure user authentication',
      'Integrated YouTube API learning resources',
      'Resume templates & video bookmarking system',
    ],
    architecture:
      'React frontend connected to a Node/Express backend API. Uses Gemini AI SDK for chatbot logic, MongoDB for profile storage, and Clerk for authentication tokens.',
    challenges:
      'Fine-tuning the prompt parameters for Gemini AI to return structured, step-by-step roadmap JSON packages that can be parsed and rendered on the client.',
    techStack: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS', 'Clerk API', 'Gemini SDK'],
    github: 'https://github.com/varmakartik/Careerly',
    live: 'https://careerly-04.vercel.app',
    featured: true,
    size: 'large',
    gradient: 'from-red-500/20 to-rose-500/20',
    accentColor: '#2563EB',
    year: '2025',
    status: 'Active',
  },
  {
    id: 2,
    title: 'FinTrack',
    subtitle: 'Personal Finance & Expense Tracker',
    description:
      'Full-stack personal finance application supporting income/expense tracking, group bill splitting, and automated savings targets.',
    longDescription:
      'FinTrack is a comprehensive finance management platform built with PostgreSQL and JWT authentication. Users can manage budgets, track savings goals, join shared expense groups, and visualize analytics using interactive charts.',
    image: 'project2',
    tags: ['React.js', 'Node.js', 'Express.js', 'PostgreSQL', 'JWT'],
    features: [
      'Secure JWT authentication with refresh tokens',
      'Interactive dashboard analytics with Recharts',
      'Shared group expense & bill splitting modules',
      'Savings goals progress tracking',
      'Progressive Web App (PWA) offline sync support',
    ],
    architecture:
      'Client-server architecture. Express backend API connected to PostgreSQL, using Knex for migrations and queries. Recharts visual layer on the React client.',
    challenges:
      'Handling real-time offline transactions and automatically sync-merging them to the central database when connection status becomes active.',
    techStack: ['React.js', 'Node.js', 'Express.js', 'PostgreSQL', 'Tailwind CSS', 'Recharts'],
    github: 'https://github.com/varmakartik/Expense-Tracker',
    live: 'https://expense-tracker-fintrack.vercel.app',
    featured: true,
    size: 'medium',
    gradient: 'from-crimson-500/20 to-red-500/20',
    accentColor: '#38BDF8',
    year: '2026',
    status: 'Active',
  },
  {
    id: 3,
    title: 'NEXUS-HR',
    subtitle: 'Employee Management System',
    description:
      'Full-stack HR portal featuring role-based access control, attendance logs, payroll tracking, and dashboard reporting.',
    longDescription:
      'NEXUS-HR simplifies operations by consolidating employee logs, leaves, attendance, and project allocations. It employs role-based dashboards to restrict permissions dynamically.',
    image: 'project3',
    tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT'],
    features: [
      'Role-based dashboard permissions (Admin/Employee)',
      'Attendance tracker & leave approval workflows',
      'Payroll tracking & project assignments',
      'Secure RESTful APIs with JWT authentication',
      'Responsive data tables with export options',
    ],
    architecture:
      'MongoDB schemas for corporate directory models. Node/Express router handling authentication, timesheets, and payroll endpoints.',
    challenges:
      'Structuring access control logic to prevent unauthorized API requests to payroll endpoints while keeping dashboard metrics responsive.',
    techStack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'JWT'],
    github: 'https://github.com/varmakartik/Nexus',
    live: 'https://nexus-frontend-zm73.vercel.app',
    featured: true,
    size: 'medium',
    gradient: 'from-rose-600/20 to-red-600/20',
    accentColor: '#10B981',
    year: '2025',
    status: 'Active',
  },
  {
    id: 4,
    title: 'Connect',
    subtitle: 'Intelligent Note-Taking Platform',
    description:
      'Collaborative document management platform supporting rich text, document nesting, Code Mode, and live sync.',
    longDescription:
      'Connect is a workspace platform built on top of Supabase real-time databases. It enables fluid collaborative editing, rich-text customization, and document organizing inside workspaces.',
    image: 'project4',
    tags: ['React.js', 'Supabase', 'Tailwind CSS', 'Realtime Sync'],
    features: [
      'Real-time workspace synchronization via WebSockets',
      'Nested document structure with folder hierarchies',
      'Dedicated Code Mode editor with syntax highlighting',
      'Rich text editing formatting options',
      'Responsive light and dark modes',
    ],
    techStack: ['React.js', 'Supabase', 'Tailwind CSS', 'Realtime DB'],
    github: 'https://github.com/varmakartik/Connect',
    live: 'https://crosser.vercel.app',
    featured: false,
    size: 'small',
    gradient: 'from-red-700/20 to-orange-700/20',
    accentColor: '#991B1B',
    year: '2025',
    status: 'Active',
  },
]
