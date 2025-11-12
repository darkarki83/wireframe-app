export type ContractStatus = 'active' | 'completed' | 'pending'

export interface Contract {
  id: string
  title: string
  client: string
  freelancer: string
  total: number
  status: ContractStatus
  startDate: string
  endDate: string
  description: string
  price: number
}
