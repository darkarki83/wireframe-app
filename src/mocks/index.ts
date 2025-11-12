import type { Contract } from '../interfaces/Contract'
import type { Offer } from '../interfaces/Offer'
import type { IncomingOffer } from '../interfaces/IncomingOffer'
import type { Provider } from '../interfaces/Provider'
import type { Milestone } from '../interfaces/Milestone'
import type { File } from '../interfaces/File'

import contractsData from './contracts.json'
import offersData from './offers.json'
import incomingOffersData from './incomingOffers.json'
import providersData from './providers.json'
import milestonesData from './milestones.json'
import filesData from './files.json'

// Type the imported JSON data
export const contracts = contractsData as Contract[]
export const offers = offersData as Offer[]
export const incomingOffers = incomingOffersData as IncomingOffer[]
export const providers = providersData as Provider[]
export const milestones = milestonesData as Milestone[]
export const files = filesData as File[]

// Helper functions to get mock data
export const getContractById = (id: string): Contract | undefined => {
  return contracts.find((c) => c.id === id)
}

export const getMilestonesByContractId = (contractId: string): Milestone[] => {
  return milestones.filter((m) => m.contractId === contractId)
}

export const getFilesByContractId = (contractId: string): File[] => {
  return files.filter((f) => f.contractId === contractId)
}

export const getOfferById = (id: string): Offer | undefined => {
  return offers.find((o) => o.id === id)
}

export const getProviderById = (id: string): Provider | undefined => {
  return providers.find((p) => p.id === id)
}

export const getIncomingOfferById = (id: string): IncomingOffer | undefined => {
  return incomingOffers.find((o) => o.id === id)
}
