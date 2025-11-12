import { useEffect, useState } from "react";
import { apiListContracts, type Contract } from "../../lib/mockApi";
import { Link } from "react-router-dom";

export default function ContractList() {
  const [items, setItems] = useState<Contract[]>([]);
  const [activeTab, setActiveTab] = useState<"all" | "active" | "completed">("all");

  useEffect(() => {
    apiListContracts().then(setItems);
  }, []);

  const getStatusClasses = (status: string) => {
    const statusMap: Record<string, string> = {
      active: 'bg-state-active-bg text-state-active-text',
      completed: 'bg-state-completed-bg text-state-completed-text',
      pending: 'bg-state-pending-bg text-state-pending-text',
    };
    return statusMap[status] || 'bg-state-draft-bg text-state-draft-text';
  };

  const filteredContracts = items.filter(contract => {
    if (activeTab === "all") return true;
    if (activeTab === "active") return contract.status === "active";
    if (activeTab === "completed") return contract.status === "completed";
    return true;
  });

  return (
    <div className="min-h-screen bg-base-background pb-20">
      {/* Header */}
      <div className="px-lg pt-md pb-md">
        <h1 className="text-h1 font-semibold text-text-primary m-0 mb-lg">
          My Contracts
        </h1>
      </div>

      {/* Filter Tabs */}
      <div className="px-lg mb-lg">
        <div className="flex gap-xs bg-base-surface p-xs rounded-md shadow-sm">
          <button
            onClick={() => setActiveTab('all')}
            className={`flex-1 px-lg py-md rounded-sm text-body font-semibold cursor-pointer border-none transition-all duration-200 ${activeTab === 'all' ? 'bg-primary-main text-text-inverse' : 'bg-transparent text-text-secondary'
              }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveTab('active')}
            className={`flex-1 px-lg py-md rounded-sm text-body font-semibold cursor-pointer border-none transition-all duration-200 ${activeTab === 'active' ? 'bg-primary-main text-text-inverse' : 'bg-transparent text-text-secondary'
              }`}
          >
            Active
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`flex-1 px-lg py-md rounded-sm text-body font-semibold cursor-pointer border-none transition-all duration-200 ${activeTab === 'completed' ? 'bg-primary-main text-text-inverse' : 'bg-transparent text-text-secondary'
              }`}
          >
            Completed
          </button>
        </div>
      </div>

      {/* Contracts List */}
      <div className="px-lg pb-lg">
        <div className="flex flex-col gap-md">
          {filteredContracts.map((contract) => {
            const statusClasses = getStatusClasses(contract.status);
            return (
              <Link
                key={contract.id}
                to={`/contracts/${contract.id}`}
                className="bg-base-surface rounded-lg shadow-base p-lg no-underline block cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex justify-between items-start mb-sm">
                  <h3 className="text-h2 font-semibold text-text-primary m-0 flex-1">
                    {contract.title}
                  </h3>
                  <span className={`text-caption font-medium px-3 py-1 rounded-sm whitespace-nowrap ml-sm ${statusClasses}`}>
                    {contract.status.charAt(0).toUpperCase() + contract.status.slice(1)}
                  </span>
                </div>
                <p className="text-body text-text-secondary m-0 mb-md leading-normal">
                  {contract.description}
                </p>
                <div className="flex justify-between items-center text-caption text-text-secondary">
                  <span>{contract.startDate}</span>
                  <span className="text-h2 font-semibold text-primary-main">
                    ${contract.price}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {filteredContracts.length === 0 && (
          <div className="bg-base-surface rounded-lg shadow-base p-xxxl text-center">
            <div className="mb-lg">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" className="mx-auto">
                <path d="M6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" fill="#E9E7FF" />
                <path d="M6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" stroke="#6C63FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14 2v6h6M8 13h8M8 17h5" stroke="#6C63FF" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <p className="text-h2 font-semibold text-text-primary m-0 mb-sm">
              No {activeTab === 'all' ? '' : activeTab} contracts
            </p>
            <p className="text-body text-text-secondary m-0">
              {activeTab === 'all'
                ? "You don't have any contracts yet"
                : `No ${activeTab} contracts found`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
