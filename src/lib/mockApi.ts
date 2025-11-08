
export type Job = {
  id: string;
  postedBy: string;
  title: string;
  description: string;
  budgetMin: number;
  budgetMax: number;
  status: "open" | "in_progress" | "closed";
  proposalsCount: number;
};

export type Proposal = {
  id: string;
  author: string;
  jobId: string;
  jobTitle: string;
  title: string;
  description?: string;
  budgetMin: number;
  budgetMax: number;
  status: "sent" | "in_discussion" | "accepted" | "rejected";
};

export type Contract = {
  id: string;
  title: string;
  role: "client" | "freelancer";
  status: "pending" | "active" | "completed";
  description?: string;
  price?: number;
  startDate?: string;
};

export type Notification = {
  id: string;
  type: "new_bid" | "message" | "status_change" | "contract" | "new_offer" | "conditions_updated" | "proposal_approved";
  title: string;
  message: string;
  link: string;
  read: boolean;
  createdAt: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio: string;
  location: string;
  hourlyRate: number;
  rating: number;
  completedJobs: number;
  memberSince: string;
  skills: string[];
  portfolio: Array<{
    title: string;
    description: string;
    image?: string;
  }>;
};

export type ChatMessage = {
  id: string;
  type: "user" | "system";
  sender: "client" | "freelancer";
  senderName: string;
  text: string;
  timestamp: string;
};

export type ProposalConditions = {
  version: number;
  priceMin: number;
  priceMax: number;
  deadline: string;
  deliveryDate: string;
  milestones: string[];
  paymentSchedule: string;
  revisions: number;
  scope: string;
  exclusions?: string;
  clientApproved: boolean;
  freelancerApproved: boolean;
  updatedBy: string;
};

export type ProposalChatData = {
  proposalId: string;
  jobTitle: string;
  status: "new" | "in_discussion" | "agreed";
  myRole: "client" | "freelancer";
  otherPartyName: string;
  currentConditions: ProposalConditions;
  versionHistory: ProposalConditions[];
  messages: ChatMessage[];
};

const sleep = (ms:number)=> new Promise(r=>setTimeout(r, ms));

// Available jobs in marketplace
const jobs: Job[] = [
  { id: "j1", postedBy: "Alice Corp", title: "E-commerce Website", description: "Build a full e-commerce site with cart and payments", budgetMin: 2000, budgetMax: 3500, status: "open", proposalsCount: 5 },
  { id: "j2", postedBy: "Tech Startup", title: "Mobile App Development", description: "React Native app for iOS and Android", budgetMin: 3000, budgetMax: 5000, status: "open", proposalsCount: 8 },
  { id: "j3", postedBy: "Marketing Agency", title: "Landing Page Design", description: "Modern landing page with animations", budgetMin: 500, budgetMax: 1000, status: "open", proposalsCount: 12 },
];

// Jobs I posted as a client
const myJobPosts: Job[] = [
  { id: "j100", postedBy: "Me", title: "WordPress Plugin Development", description: "Custom WordPress plugin for booking system", budgetMin: 800, budgetMax: 1500, status: "open", proposalsCount: 3 },
  { id: "j101", postedBy: "Me", title: "Logo Design", description: "Professional logo for tech company", budgetMin: 200, budgetMax: 400, status: "in_progress", proposalsCount: 7 },
];

// Incoming proposals = Job offers TO me (clients want to hire me)
const incomingOffers: Proposal[] = [
  { id: "p1", author: "Haim", jobId: "direct", jobTitle: "Direct Offer", title: "Landing Page Redesign for Tech Startup", description: "Hi! I saw your portfolio and I'm impressed with your design work. I need a modern, responsive landing page for my SaaS startup. The page should include hero section, features, pricing, testimonials, and contact form. Looking for clean, professional design with smooth animations.", budgetMin: 500, budgetMax: 900, status: "sent" },
  { id: "p2", author: "David", jobId: "direct", jobTitle: "Direct Offer", title: "Dashboard Analytics Widgets", description: "I'm looking for an experienced developer to create custom analytics widgets for my admin dashboard. Need real-time data visualization, charts (line, bar, pie), and interactive filters. The widgets should be responsive and integrate with our existing React/TypeScript stack.", budgetMin: 800, budgetMax: 1200, status: "in_discussion" },
  { id: "p3", author: "Sarah", jobId: "direct", jobTitle: "Direct Offer", title: "E-commerce Product Catalog", description: "Looking for help building a product catalog system with search, filters, and cart functionality. Must have experience with React and e-commerce platforms. Project includes product listing, detail pages, shopping cart, and checkout flow.", budgetMin: 1200, budgetMax: 2000, status: "accepted" },
  { id: "p4", author: "Mike", jobId: "direct", jobTitle: "Direct Offer", title: "Mobile App UI Design", description: "Need UI/UX design for a fitness tracking mobile app. Looking for modern, clean design with intuitive navigation. Deliverables include wireframes, mockups, and design system. Experience with Figma required.", budgetMin: 600, budgetMax: 1000, status: "rejected" },
];

// My proposals = Bids I submitted on jobs
const myProposals: Proposal[] = [
  { id: "p3", author: "Me", jobId: "j1", jobTitle: "E-commerce Website", title: "React migration", description: "I can migrate your site to React", budgetMin: 700, budgetMax: 1100, status: "sent" },
];

// Bids received on MY job posts
const receivedBids: Proposal[] = [
  { id: "p100", author: "John Dev", jobId: "j100", jobTitle: "WordPress Plugin Development", title: "WordPress Expert", description: "10 years experience with WP plugins", budgetMin: 900, budgetMax: 1400, status: "sent" },
  { id: "p101", author: "Sarah Designer", jobId: "j100", jobTitle: "WordPress Plugin Development", title: "Full-stack developer", description: "Can build the plugin quickly", budgetMin: 800, budgetMax: 1200, status: "in_discussion" },
  { id: "p102", author: "Mike Creative", jobId: "j101", jobTitle: "Logo Design", title: "Brand designer", description: "Portfolio attached", budgetMin: 250, budgetMax: 350, status: "accepted" },
];

const contracts: Contract[] = [
  { id: "c1", title: "E-commerce Website Development", role: "freelancer", status: "active", description: "Building full e-commerce platform with cart, payments, and admin dashboard. Includes responsive design and mobile optimization.", price: 2500, startDate: "2025-10-15" },
  { id: "c2", title: "Mobile App QA Testing", role: "freelancer", status: "pending", description: "Quality assurance testing for React Native mobile application across iOS and Android platforms.", price: 1200, startDate: "2025-11-01" },
  { id: "c3", title: "Landing Page Redesign", role: "freelancer", status: "active", description: "Modern responsive landing page with animations, hero section, features, pricing, and contact form.", price: 700, startDate: "2025-11-05" },
  { id: "c4", title: "Dashboard Analytics Implementation", role: "client", status: "completed", description: "Custom analytics widgets with real-time data visualization and interactive charts for admin dashboard.", price: 1100, startDate: "2025-09-20" },
];

const notifications: Notification[] = [
  { id: "n1", type: "new_offer", title: "New Job Offer", message: "Haim sent you a job offer for Landing redesign", link: "/proposals/p1/chat", read: false, createdAt: "2025-11-07T10:30:00Z" },
  { id: "n2", type: "message", title: "New Message", message: "David sent you a message about Dashboard widgets", link: "/proposals/p2/chat", read: false, createdAt: "2025-11-07T09:15:00Z" },
  { id: "n3", type: "conditions_updated", title: "Terms Updated", message: "David updated the agreement terms for Dashboard widgets", link: "/proposals/p2/chat", read: true, createdAt: "2025-11-06T16:45:00Z" },
  { id: "n4", type: "contract", title: "Contract Started", message: "Your contract for Website build is now active", link: "/contracts/c1", read: true, createdAt: "2025-11-06T14:20:00Z" },
  { id: "n5", type: "proposal_approved", title: "Terms Approved", message: "Client approved your agreement terms for Dashboard widgets", link: "/proposals/p2/chat", read: true, createdAt: "2025-11-05T11:00:00Z" },
];

const users: User[] = [
  {
    id: "u1",
    name: "John Dev",
    email: "john@example.com",
    bio: "Full-stack developer with 10+ years of experience in React, Node.js, and WordPress. Specialized in building scalable web applications.",
    location: "San Francisco, USA",
    hourlyRate: 75,
    rating: 4.9,
    completedJobs: 127,
    memberSince: "2020-01-15",
    skills: ["React", "Node.js", "TypeScript", "WordPress", "PostgreSQL", "AWS"],
    portfolio: [
      { title: "E-commerce Platform", description: "Built a full-featured e-commerce platform with React and Node.js" },
      { title: "SaaS Dashboard", description: "Created analytics dashboard for SaaS product" },
      { title: "WordPress Plugin", description: "Developed custom booking system plugin" }
    ]
  },
  {
    id: "u2",
    name: "Sarah Designer",
    email: "sarah@example.com",
    bio: "Creative designer specializing in UI/UX and brand identity. I help businesses create beautiful, user-friendly digital experiences.",
    location: "London, UK",
    hourlyRate: 60,
    rating: 4.8,
    completedJobs: 89,
    memberSince: "2021-03-20",
    skills: ["UI/UX Design", "Figma", "Adobe XD", "Branding", "Illustration", "Prototyping"],
    portfolio: [
      { title: "Mobile App Design", description: "Designed complete UI/UX for fitness tracking app" },
      { title: "Brand Identity", description: "Created full brand identity for tech startup" },
      { title: "Website Redesign", description: "Redesigned e-commerce website increasing conversions by 40%" }
    ]
  },
  {
    id: "u3",
    name: "Mike Creative",
    email: "mike@example.com",
    bio: "Logo designer and brand strategist. I create memorable visual identities that help businesses stand out.",
    location: "New York, USA",
    hourlyRate: 50,
    rating: 4.7,
    completedJobs: 156,
    memberSince: "2019-06-10",
    skills: ["Logo Design", "Branding", "Illustrator", "Photoshop", "Brand Strategy"],
    portfolio: [
      { title: "Tech Company Logo", description: "Modern logo design for AI startup" },
      { title: "Restaurant Branding", description: "Complete branding package for restaurant chain" },
      { title: "App Icon Design", description: "Icon design for mobile application" }
    ]
  }
];

// Job marketplace APIs
export async function apiBrowseJobs() {
  await sleep(200);
  return jobs;
}

export async function apiGetJob(id: string) {
  await sleep(200);
  const allJobs = [...jobs, ...myJobPosts];
  return allJobs.find(j => j.id === id) ?? null;
}

export async function apiCreateJob(data: {
  title: string;
  description: string;
  budgetMin: number;
  budgetMax: number;
}) {
  await sleep(300);
  const newJob: Job = {
    id: `j${myJobPosts.length + 100}`,
    postedBy: "Me",
    title: data.title,
    description: data.description,
    budgetMin: data.budgetMin,
    budgetMax: data.budgetMax,
    status: "open",
    proposalsCount: 0,
  };
  myJobPosts.push(newJob);
  return newJob;
}

export async function apiListMyJobPosts() {
  await sleep(200);
  return myJobPosts;
}

// Proposal APIs
export async function apiListIncoming() {
  await sleep(200);
  return incomingOffers;
}

export async function apiListMine() {
  await sleep(200);
  return myProposals;
}

export async function apiListReceivedBids() {
  await sleep(200);
  return receivedBids;
}

export async function apiGetJobBids(jobId: string) {
  await sleep(200);
  return receivedBids.filter(bid => bid.jobId === jobId);
}

export async function apiGetProposal(id: string) {
  await sleep(200);
  const all = [...incomingOffers, ...myProposals, ...receivedBids];
  return all.find(p => p.id === id) ?? null;
}

export async function apiCreateProposal(data: {
  jobId: string;
  title: string;
  description: string;
  budgetMin: number;
  budgetMax: number;
}) {
  await sleep(300);
  const job = await apiGetJob(data.jobId);
  const newProposal: Proposal = {
    id: `p${myProposals.length + incomingOffers.length + receivedBids.length + 1}`,
    author: "Me",
    jobId: data.jobId,
    jobTitle: job?.title ?? "Unknown Job",
    title: data.title,
    description: data.description,
    budgetMin: data.budgetMin,
    budgetMax: data.budgetMax,
    status: "sent",
  };
  myProposals.push(newProposal);
  return newProposal;
}

// Contract APIs
export async function apiListContracts() {
  await sleep(200);
  return contracts;
}

// Notification APIs
export async function apiListNotifications() {
  await sleep(200);
  return notifications;
}

export async function apiGetUnreadCount() {
  await sleep(100);
  return notifications.filter(n => !n.read).length;
}

export async function apiMarkNotificationRead(id: string) {
  await sleep(100);
  const notification = notifications.find(n => n.id === id);
  if (notification) {
    notification.read = true;
  }
  return notification;
}

export async function apiMarkAllNotificationsRead() {
  await sleep(100);
  for (const n of notifications) {
    n.read = true;
  }
  return notifications;
}

// User APIs
export async function apiGetUser(id: string) {
  await sleep(200);
  return users.find(u => u.id === id) ?? null;
}

export async function apiSearchUsers(filters?: {
  skill?: string;
  minRating?: number;
  maxHourlyRate?: number;
}) {
  await sleep(200);
  let filtered = [...users];

  if (filters?.skill) {
    const skillLower = filters.skill.toLowerCase();
    filtered = filtered.filter(u =>
      u.skills.some(s => s.toLowerCase().includes(skillLower))
    );
  }

  if (filters?.minRating !== undefined) {
    filtered = filtered.filter(u => u.rating >= filters.minRating!);
  }

  if (filters?.maxHourlyRate !== undefined) {
    filtered = filtered.filter(u => u.hourlyRate <= filters.maxHourlyRate!);
  }

  return filtered;
}

// Proposal chat data storage
const proposalChats: Map<string, ProposalChatData> = new Map([
  ["p1", {
    proposalId: "p1",
    jobTitle: "Landing redesign",
    status: "new",
    myRole: "freelancer",
    otherPartyName: "Haim",
    currentConditions: {
      version: 1,
      priceMin: 500,
      priceMax: 900,
      deadline: "2 weeks",
      deliveryDate: "December 15, 2025",
      milestones: ["Design mockups", "Development", "Revisions"],
      paymentSchedule: "50% upfront, 50% upon completion",
      revisions: 3,
      scope: "Modern, responsive landing page with hero section, features, pricing, testimonials, and contact form. Includes smooth animations and mobile optimization.",
      exclusions: "Backend development, hosting setup, content writing",
      clientApproved: false,
      freelancerApproved: false,
      updatedBy: "Haim"
    },
    versionHistory: [
      {
        version: 1,
        priceMin: 500,
        priceMax: 900,
        deadline: "2 weeks",
        deliveryDate: "December 15, 2025",
        milestones: ["Design mockups", "Development", "Revisions"],
        paymentSchedule: "50% upfront, 50% upon completion",
        revisions: 3,
        scope: "Modern, responsive landing page with hero section, features, pricing, testimonials, and contact form. Includes smooth animations and mobile optimization.",
        exclusions: "Backend development, hosting setup, content writing",
        clientApproved: false,
        freelancerApproved: false,
        updatedBy: "Haim"
      }
    ],
    messages: [
      {
        id: "m1",
        type: "system",
        sender: "client",
        senderName: "System",
        text: "Haim sent you a proposal for Landing redesign",
        timestamp: "2025-11-07T09:00:00Z"
      },
      {
        id: "m2",
        type: "user",
        sender: "client",
        senderName: "Haim",
        text: "Hi! I need a landing page redesigned for my startup. Can you help?",
        timestamp: "2025-11-07T09:01:00Z"
      }
    ]
  }],
  ["p2", {
    proposalId: "p2",
    jobTitle: "Dashboard widgets",
    status: "in_discussion",
    myRole: "freelancer",
    otherPartyName: "David",
    currentConditions: {
      version: 2,
      priceMin: 900,
      priceMax: 1300,
      deadline: "3 weeks",
      deliveryDate: "December 28, 2025",
      milestones: ["Widget design", "API integration", "Testing", "Deployment"],
      paymentSchedule: "30% upfront, 40% after integration, 30% upon completion",
      revisions: 2,
      scope: "Custom analytics widgets for admin dashboard with real-time data visualization, interactive charts (line, bar, pie), and advanced filtering capabilities. Fully responsive and integrated with existing React/TypeScript stack.",
      exclusions: "Database design, backend API development, server infrastructure",
      clientApproved: false,
      freelancerApproved: true,
      updatedBy: "Me"
    },
    versionHistory: [
      {
        version: 1,
        priceMin: 800,
        priceMax: 1200,
        deadline: "2 weeks",
        deliveryDate: "December 21, 2025",
        milestones: ["Design", "Development", "Testing"],
        paymentSchedule: "50% upfront, 50% upon completion",
        revisions: 2,
        scope: "Basic analytics widgets with standard charts and filters.",
        clientApproved: false,
        freelancerApproved: false,
        updatedBy: "David"
      },
      {
        version: 2,
        priceMin: 900,
        priceMax: 1300,
        deadline: "3 weeks",
        deliveryDate: "December 28, 2025",
        milestones: ["Widget design", "API integration", "Testing", "Deployment"],
        paymentSchedule: "30% upfront, 40% after integration, 30% upon completion",
        revisions: 2,
        scope: "Custom analytics widgets for admin dashboard with real-time data visualization, interactive charts (line, bar, pie), and advanced filtering capabilities. Fully responsive and integrated with existing React/TypeScript stack.",
        exclusions: "Database design, backend API development, server infrastructure",
        clientApproved: false,
        freelancerApproved: true,
        updatedBy: "Me"
      }
    ],
    messages: [
      {
        id: "m1",
        type: "system",
        sender: "client",
        senderName: "System",
        text: "David sent you a proposal for Dashboard widgets",
        timestamp: "2025-11-06T14:00:00Z"
      },
      {
        id: "m2",
        type: "user",
        sender: "client",
        senderName: "David",
        text: "I need custom dashboard widgets for my analytics platform.",
        timestamp: "2025-11-06T14:05:00Z"
      },
      {
        id: "m3",
        type: "user",
        sender: "freelancer",
        senderName: "Me",
        text: "Sure! I have experience with dashboard development. Let me review the requirements.",
        timestamp: "2025-11-06T15:30:00Z"
      },
      {
        id: "m4",
        type: "system",
        sender: "freelancer",
        senderName: "System",
        text: "Agreement terms updated to v2 by Me",
        timestamp: "2025-11-07T10:00:00Z"
      },
      {
        id: "m5",
        type: "user",
        sender: "freelancer",
        senderName: "Me",
        text: "I've updated the terms to include more detailed milestones. Please review.",
        timestamp: "2025-11-07T10:01:00Z"
      }
    ]
  }]
]);

// Proposal chat APIs
export async function apiGetProposalChat(id: string): Promise<ProposalChatData | null> {
  await sleep(200);
  return proposalChats.get(id) ?? null;
}

export async function apiSendChatMessage(proposalId: string, text: string) {
  await sleep(200);
  const chat = proposalChats.get(proposalId);
  if (!chat) return;

  const newMessage: ChatMessage = {
    id: `m${chat.messages.length + 1}`,
    type: "user",
    sender: chat.myRole,
    senderName: "Me",
    text,
    timestamp: new Date().toISOString()
  };

  chat.messages.push(newMessage);
  if (chat.status === "new") {
    chat.status = "in_discussion";
  }
}

export async function apiUpdateConditions(
  proposalId: string,
  conditions: {
    priceMin: number;
    priceMax: number;
    deadline: string;
    deliveryDate: string;
    milestones: string[];
    paymentSchedule: string;
    revisions: number;
    scope: string;
    exclusions?: string;
  }
) {
  await sleep(300);
  const chat = proposalChats.get(proposalId);
  if (!chat) return;

  const newVersion: ProposalConditions = {
    version: chat.currentConditions.version + 1,
    priceMin: conditions.priceMin,
    priceMax: conditions.priceMax,
    deadline: conditions.deadline,
    deliveryDate: conditions.deliveryDate,
    milestones: conditions.milestones,
    paymentSchedule: conditions.paymentSchedule,
    revisions: conditions.revisions,
    scope: conditions.scope,
    exclusions: conditions.exclusions,
    clientApproved: false,
    freelancerApproved: false,
    updatedBy: "Me"
  };

  chat.currentConditions = newVersion;
  chat.versionHistory.push(newVersion);
  chat.status = "in_discussion";

  // Add system message
  const systemMessage: ChatMessage = {
    id: `m${chat.messages.length + 1}`,
    type: "system",
    sender: chat.myRole,
    senderName: "System",
    text: `Agreement terms updated to v${newVersion.version} by Me`,
    timestamp: new Date().toISOString()
  };
  chat.messages.push(systemMessage);
}

export async function apiApproveConditions(proposalId: string, role: "client" | "freelancer") {
  await sleep(200);
  const chat = proposalChats.get(proposalId);
  if (!chat) return;

  if (role === "client") {
    chat.currentConditions.clientApproved = true;
  } else {
    chat.currentConditions.freelancerApproved = true;
  }

  // Check if both approved
  if (chat.currentConditions.clientApproved && chat.currentConditions.freelancerApproved) {
    chat.status = "agreed";

    // Add system message
    const systemMessage: ChatMessage = {
      id: `m${chat.messages.length + 1}`,
      type: "system",
      sender: role,
      senderName: "System",
      text: "Both parties approved! Contract can now be created.",
      timestamp: new Date().toISOString()
    };
    chat.messages.push(systemMessage);
  } else {
    // Add approval message
    const systemMessage: ChatMessage = {
      id: `m${chat.messages.length + 1}`,
      type: "system",
      sender: role,
      senderName: "System",
      text: `${role === "client" ? "Client" : "Freelancer"} approved the agreement terms`,
      timestamp: new Date().toISOString()
    };
    chat.messages.push(systemMessage);
  }
}
