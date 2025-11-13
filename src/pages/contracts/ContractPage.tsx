import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BackIcon, DollarIcon, ClientIcon, FreelancerIcon, CalendarIcon, OverviewTabIcon, MilestonesTabIcon, CommunicationTabIcon, FilesTabIcon } from "../../components/icons";
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
          className="bg-transparent border-none text-primary-main text-body font-semibold cursor-pointer p-0 mb-lg flex items-center gap-xs"
        >
          <BackIcon />
          Back
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
              <DollarIcon />
              ${contract.total.toLocaleString()}
            </span>
          </div>

          <div className="text-body text-text-secondary leading-normal">
            <div className="mb-sm flex items-center gap-xs">
              <ClientIcon />
              <span className="font-medium text-text-primary">
                Client:
              </span>{' '}
              {contract.client}
            </div>
            <div className="mb-sm flex items-center gap-xs">
              <FreelancerIcon />
              <span className="font-medium text-text-primary">
                Freelancer:
              </span>{' '}
              {contract.freelancer}
            </div>
            <div className="flex items-center gap-xs">
              <CalendarIcon />
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
            <OverviewTabIcon isActive={tab === "overview"} />
            <span>Overview</span>
          </button>
          <button
            onClick={() => setTab("milestones")}
            className={`px-xs py-md rounded-sm font-semibold text-caption cursor-pointer flex flex-col items-center justify-center gap-xs min-h-[60px] ${tab === "milestones"
              ? 'bg-primary-main text-text-inverse border-none'
              : 'bg-base-surface text-text-secondary border border-base-border'
              }`}
          >
            <MilestonesTabIcon isActive={tab === "milestones"} />
            <span>Milestones</span>
          </button>
          <button
            onClick={() => setTab("communication")}
            className={`px-xs py-md rounded-sm font-semibold text-caption cursor-pointer flex flex-col items-center justify-center gap-xs min-h-[60px] ${tab === "communication"
              ? 'bg-primary-main text-text-inverse border-none'
              : 'bg-base-surface text-text-secondary border border-base-border'
              }`}
          >
            <CommunicationTabIcon isActive={tab === "communication"} />
            <span>Communication</span>
          </button>
          <button
            onClick={() => setTab("files")}
            className={`px-xs py-md rounded-sm font-semibold text-caption cursor-pointer flex flex-col items-center justify-center gap-xs min-h-[60px] ${tab === "files"
              ? 'bg-primary-main text-text-inverse border-none'
              : 'bg-base-surface text-text-secondary border border-base-border'
              }`}
          >
            <FilesTabIcon isActive={tab === "files"} />
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
