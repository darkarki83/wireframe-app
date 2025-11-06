
export type Proposal = {
  id: string;
  author: string;
  title: string;
  budgetMin: number;
  budgetMax: number;
  status: "sent" | "in_discussion";
};

export type Contract = {
  id: string;
  title: string;
  role: "client" | "freelancer";
  status: "pending" | "active" | "completed";
};

const sleep = (ms:number)=> new Promise(r=>setTimeout(r, ms));

const proposals: Proposal[] = [
  { id: "p1", author: "Haim", title: "Landing redesign", budgetMin: 500, budgetMax: 900, status: "sent" },
  { id: "p2", author: "David", title: "Dashboard widgets", budgetMin: 800, budgetMax: 1200, status: "in_discussion" },
];

const myProposals: Proposal[] = [
  { id: "p3", author: "Me", title: "React migration", budgetMin: 700, budgetMax: 1100, status: "sent" },
];

const contracts: Contract[] = [
  { id: "c1", title: "Website build", role: "client", status: "active" },
  { id: "c2", title: "Mobile app QA", role: "freelancer", status: "pending" },
];

export async function apiListIncoming() {
  await sleep(200);
  return proposals;
}
export async function apiListMine() {
  await sleep(200);
  return myProposals;
}
export async function apiGetProposal(id:string) {
  await sleep(200);
  const all = [...proposals, ...myProposals];
  return all.find(p=>p.id===id) ?? null;
}
export async function apiListContracts() {
  await sleep(200);
  return contracts;
}
