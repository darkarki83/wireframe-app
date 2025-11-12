import contracts from './contracts.json';
import offers from './offers.json';
import providers from './providers.json';
import milestones from './milestones.json';
import files from './files.json';

export { contracts, offers, providers, milestones, files };

// Helper functions to get mock data
export const getContractById = (id: string) => {
  return contracts.find(c => c.id === id);
};

export const getMilestonesByContractId = (contractId: string) => {
  return milestones.filter(m => m.contractId === contractId);
};

export const getFilesByContractId = (contractId: string) => {
  return files.filter(f => f.contractId === contractId);
};

export const getOfferById = (id: string) => {
  return offers.find(o => o.id === id);
};

export const getProviderById = (id: string) => {
  return providers.find(p => p.id === id);
};
