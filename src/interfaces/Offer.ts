export type OfferStatus = "active" | "draft" | "in_review" | "completed" | "closed";

export interface Offer {
  id: string;
  title: string;
  description: string;
  budget: number;
  deadline: string;
  status: OfferStatus;
  category: string;
  createdAt: string;
  proposalsCount: number;
}
