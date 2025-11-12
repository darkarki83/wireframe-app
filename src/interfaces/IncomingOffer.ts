export type IncomingOfferStatus = 'pending' | 'active' | 'accepted' | 'rejected'

export interface IncomingOffer {
  id: string
  title: string
  description: string
  status: IncomingOfferStatus
  createdAt: string
  assignedBy: string
  hasAttachments: boolean
  budget: number
  deadline: string
}
