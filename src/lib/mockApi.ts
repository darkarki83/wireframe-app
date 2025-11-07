
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
};

export type Notification = {
  id: string;
  type: "new_bid" | "message" | "status_change" | "contract";
  title: string;
  message: string;
  link: string;
  read: boolean;
  createdAt: string;
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
  { id: "p1", author: "Haim", jobId: "direct", jobTitle: "Direct Offer", title: "Landing redesign", description: "Need a landing page redesigned", budgetMin: 500, budgetMax: 900, status: "sent" },
  { id: "p2", author: "David", jobId: "direct", jobTitle: "Direct Offer", title: "Dashboard widgets", description: "Create dashboard widgets", budgetMin: 800, budgetMax: 1200, status: "in_discussion" },
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
  { id: "c1", title: "Website build", role: "client", status: "active" },
  { id: "c2", title: "Mobile app QA", role: "freelancer", status: "pending" },
];

const notifications: Notification[] = [
  { id: "n1", type: "new_bid", title: "New Bid Received", message: "John Dev submitted a bid on WordPress Plugin Development", link: "/jobs/j100/bids", read: false, createdAt: "2025-11-07T10:30:00Z" },
  { id: "n2", type: "message", title: "New Message", message: "David sent you a message about Dashboard widgets", link: "/chats/p2", read: false, createdAt: "2025-11-07T09:15:00Z" },
  { id: "n3", type: "status_change", title: "Proposal Accepted", message: "Your bid on E-commerce Website was accepted", link: "/proposals/p3", read: true, createdAt: "2025-11-06T16:45:00Z" },
  { id: "n4", type: "contract", title: "Contract Started", message: "Your contract for Website build is now active", link: "/contracts/c1", read: true, createdAt: "2025-11-06T14:20:00Z" },
  { id: "n5", type: "new_bid", title: "New Bid Received", message: "Sarah Designer submitted a bid on WordPress Plugin Development", link: "/jobs/j100/bids", read: true, createdAt: "2025-11-05T11:00:00Z" },
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
  notifications.forEach(n => n.read = true);
  return notifications;
}
