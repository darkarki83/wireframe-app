export type KycStatus = 
  | 'not_started'
  | 'in_progress'
  | 'pending_review'
  | 'approved'
  | 'rejected'
  | 'expired'

export interface KycData {
  status: KycStatus
  balance: number
  lastUpdated?: string
  rejectionReason?: string
  expiryDate?: string
}
