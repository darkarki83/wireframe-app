import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BackIcon } from "../../components/icons";
import { getContractById } from "../../mocks";
import OverviewTab from "./tabs/OverviewTab";
import MilestonesTab from "./tabs/MilestonesTab";
import ChatTab from "./tabs/ChatTab";
import FilesTab from "./tabs/FilesTab";
import ActivityTab from "./tabs/ActivityTab";

export default function ContractPage() {
  const { id } = useParams();
  const nav = useNavigate();
  const [tab, setTab] = useState<"overview" | "milestones" | "communication" | "files">("overview");

  // Get contract from mock data
  const contractData = getContractById(id || "c1");
  const contract = contractData ? {
    ...contractData,
    status: contractData.status as "active" | "completed" | "pending"
  } : {
    id: id || "c1",
    title: "Contract Not Found",
    client: "Unknown",
    freelancer: "Unknown",
    total: 0,
    status: "pending" as "active" | "completed" | "pending",
    startDate: "",
    endDate: "",
    description: "",
    price: 0
  };

  const getStatusClasses = (status: string) => {
    const statusMap: Record<string, string> = {
      active: 'bg-state-active-bg text-state-active-text',
      completed: 'bg-state-completed-bg text-state-completed-text',
      pending: 'bg-state-pending-bg text-state-pending-text',
    };
    return statusMap[status] || 'bg-state-draft-bg text-state-draft-text';
  };

  const statusClasses = getStatusClasses(contract.status);

  return (
    <div className="min-h-screen bg-base-background pb-20">
      <div className="px-lg pt-md pb-md">
        <button
          onClick={() => nav('/contracts')}
          className="flex items-center gap-sm bg-base-surface text-text-primary px-lg py-md rounded-md border border-base-border cursor-pointer mb-lg font-semibold text-body transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
        >
          <BackIcon />
          Back to Contracts
        </button>

        <div className="bg-base-surface rounded-lg shadow-base p-lg mb-lg">
          <h2 className="text-h1 font-semibold mb-md mt-0 text-text-primary">
            {contract.title}
          </h2>

          <div className="flex gap-sm mb-lg flex-wrap">
            <span className={`text-caption font-medium px-3 py-1 rounded-full ${statusClasses}`}>
              {contract.status.toUpperCase()}
            </span>
            <span className="text-caption font-semibold text-primary-main bg-primary-light px-3 py-1 rounded-full flex items-center gap-xs">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="1" x2="12" y2="23"></line>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
              ${contract.total.toLocaleString()}
            </span>
          </div>

          <div className="text-body text-text-secondary leading-normal">
            <div className="mb-sm flex items-center gap-xs">
              <svg width="16" height="16" viewBox="0 0 28 28" fill="none">
                <circle cx="14" cy="10" r="4" fill="#E9E7FF" />
                <circle cx="14" cy="10" r="4" stroke="#000000" strokeWidth="1.5" />
                <path d="M6 24v-2a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v2" fill="#E9E7FF" opacity="0.5" />
                <path d="M6 24v-2a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v2" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span className="font-medium text-text-primary">
                Client:
              </span>{' '}
              {contract.client}
            </div>
            <div className="mb-sm flex items-center gap-xs">
              <svg width="16" height="16" viewBox="0 0 28 28" fill="none">
                <rect x="6" y="9" width="16" height="12" rx="1.5" fill="#E9E7FF" />
                <rect x="6" y="9" width="16" height="12" rx="1.5" stroke="#000000" strokeWidth="1.5" />
                <path d="M12 21V7a1.5 1.5 0 0 0-1.5-1.5h-3a1.5 1.5 0 0 0-1.5 1.5v14" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span className="font-medium text-text-primary">
                Freelancer:
              </span>{' '}
              {contract.freelancer}
            </div>
            <div className="flex items-center gap-xs">
              <svg width="16" height="16" viewBox="0 0 28 28" fill="none">
                <rect x="5" y="6" width="18" height="18" rx="2" fill="#E9E7FF" opacity="0.3" />
                <rect x="5" y="6" width="18" height="18" rx="2" stroke="#000000" strokeWidth="1.5" />
                <line x1="17" y1="3" x2="17" y2="9" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="11" y1="3" x2="11" y2="9" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="5" y1="12" x2="23" y2="12" stroke="#000000" strokeWidth="1.5" />
              </svg>
              <span className="font-medium text-text-primary">
                Duration:
              </span>{' '}
              {contract.startDate} → {contract.endDate}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-xs mb-lg">
          <button
            onClick={() => setTab("overview")}
            className={`px-xs py-md rounded-sm font-semibold text-caption cursor-pointer flex flex-col items-center justify-center gap-xs min-h-[60px] ${tab === "overview"
              ? 'bg-primary-main text-text-inverse border-none'
              : 'bg-base-surface text-text-secondary border border-base-border'
              }`}
          >
            <svg width="20" height="20" viewBox="0 0 28 28" fill="none">
              <path d="M21.21 15.89A10 10 0 1 1 8 2.83" fill={tab === "overview" ? "rgba(255,255,255,0.2)" : "#E9E7FF"} />
              <path d="M21.21 15.89A10 10 0 1 1 8 2.83" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M22 12A10 10 0 0 0 12 2v10z" fill={tab === "overview" ? "rgba(255,255,255,0.3)" : "#E9E7FF"} />
              <path d="M22 12A10 10 0 0 0 12 2v10z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Overview</span>
          </button>
          <button
            onClick={() => setTab("milestones")}
            className={`px-xs py-md rounded-sm font-semibold text-caption cursor-pointer flex flex-col items-center justify-center gap-xs min-h-[60px] ${tab === "milestones"
              ? 'bg-primary-main text-text-inverse border-none'
              : 'bg-base-surface text-text-secondary border border-base-border'
              }`}
          >
            <svg width="20" height="20" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="14" r="10" fill={tab === "milestones" ? "rgba(255,255,255,0.2)" : "#E9E7FF"} />
              <circle cx="14" cy="14" r="10" fill={tab === "milestones" ? "rgba(255,255,255,0.2)" : "#E9E7FF"} />
              <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="1.5" />
              <polyline points="14 8 14 14 18 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Milestones</span>
          </button>
          <button
            onClick={() => setTab("communication")}
            className={`px-xs py-md rounded-sm font-semibold text-caption cursor-pointer flex flex-col items-center justify-center gap-xs min-h-[60px] ${tab === "communication"
              ? 'bg-primary-main text-text-inverse border-none'
              : 'bg-base-surface text-text-secondary border border-base-border'
              }`}
          >
            <svg width="20" height="20" viewBox="0 0 28 28" fill="none">
              <path d="M23 17a2 2 0 0 1-2 2H9l-4 4V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" fill={tab === "communication" ? "rgba(255,255,255,0.2)" : "#E9E7FF"} />
              <path d="M23 17a2 2 0 0 1-2 2H9l-4 4V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Communication</span>
          </button>
          <button
            onClick={() => setTab("files")}
            className={`px-xs py-md rounded-sm font-semibold text-caption cursor-pointer flex flex-col items-center justify-center gap-xs min-h-[60px] ${tab === "files"
              ? 'bg-primary-main text-text-inverse border-none'
              : 'bg-base-surface text-text-secondary border border-base-border'
              }`}
          >
            <svg width="20" height="20" viewBox="0 0 28 28" fill="none">
              <path d="M15 4H8a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V11z" fill={tab === "files" ? "rgba(255,255,255,0.2)" : "#E9E7FF"} />
              <path d="M15 4H8a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V11z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <polyline points="15 4 15 11 22 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Files</span>
          </button>
        </div>

        {tab === "overview" && <OverviewTab contract={contract} />}
        {tab === "milestones" && <MilestonesTab />}
        {tab === "communication" && (
          <div className="flex flex-col gap-lg">
            <ChatTab />
            <ActivityTab />
          </div>
        )}
        {tab === "files" && <FilesTab />}
      </div>
    </div>
  );
}
