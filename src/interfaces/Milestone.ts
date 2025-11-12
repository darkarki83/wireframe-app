export type MilestoneStatus = 'pending' | 'in_progress' | 'completed'

export interface Milestone {
  id: string
  contractId: string
  title: string
  description: string
  amount: number
  status: MilestoneStatus
  dueDate: string
  completedDate?: string
}
