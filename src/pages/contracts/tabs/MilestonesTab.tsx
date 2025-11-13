import { useParams } from "react-router-dom"
import { getMilestonesByContractId } from "../../../mocks"

type Milestone = {
  id: string
  contractId: string
  title: string
  amount: number
  status: "pending" | "in_progress" | "completed"
  description: string
  dueDate: string
  completedDate: string | null
}

export default function MilestonesTab() {
  const { id } = useParams()
  const milestones = getMilestonesByContractId(id || "c1") as Milestone[]

  const getStatusClasses = (status: string) => {
    switch (status) {
      case "completed":
        return 'bg-state-completed-bg text-state-completed-text'
      case "in_progress":
        return 'bg-state-inReview-bg text-state-inReview-text'
      case "pending":
        return 'bg-state-pending-bg text-state-pending-text'
      default:
        return 'bg-state-draft-bg text-state-draft-text'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending": return "Not Started"
      case "in_progress": return "In Progress"
      case "completed": return "Completed"
      default: return status
    }
  }

  return (
    <div className="bg-base-surface rounded-md p-xl shadow-sm">
      <h3 className="text-h2 font-semibold mb-lg mt-0 text-text-primary flex items-center gap-sm">
        <svg width="20" height="20" viewBox="0 0 28 28" fill="none">
          <circle cx="14" cy="14" r="10" fill="#E9E7FF" />
          <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="1.5" />
          <polyline points="14 8 14 14 18 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Project Milestones
      </h3>

      <div className="flex flex-col gap-lg">
        {milestones.map((milestone, index) => (
          <div
            key={milestone.id}
            className="bg-base-background border border-base-border rounded-md p-lg"
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-md gap-md">
              <div className="flex-1">
                <div className="text-body font-semibold text-text-primary mb-xs">
                  {index + 1}. {milestone.title}
                </div>
                <div className="text-caption text-text-secondary leading-normal">
                  {milestone.description}
                </div>
              </div>
              <div className={`px-sm py-xs rounded-full text-caption font-semibold whitespace-nowrap ${getStatusClasses(milestone.status)}`}>
                {getStatusText(milestone.status)}
              </div>
            </div>

            {/* Amount and Actions */}
            <div className="pt-md border-t border-base-border">
              <div className="text-h2 font-bold text-primary-main flex items-center gap-xs mb-md">
                <svg width="18" height="18" viewBox="0 0 28 28" fill="none">
                  <circle cx="14" cy="14" r="9" fill="#E9E7FF" />
                  <circle cx="14" cy="14" r="9" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M14 8v12M16.5 10.5h-3.5a2 2 0 0 0 0 4h3a2 2 0 0 1 0 4h-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                ${milestone.amount.toLocaleString()}
              </div>

              <div className="flex gap-sm flex-wrap">
                {milestone.status === "pending" && (
                  <button className="px-lg py-sm text-caption cursor-pointer bg-primary-main text-text-inverse border-none rounded-sm font-semibold">
                    Fund Milestone
                  </button>
                )}
                {milestone.status === "in_progress" && (
                  <>
                    <button className="px-lg py-sm text-caption cursor-pointer bg-primary-main text-text-inverse border-none rounded-sm font-semibold">
                      Submit Work
                    </button>
                    <button className="px-lg py-sm text-caption cursor-pointer bg-transparent text-status-error border border-status-error rounded-sm font-semibold">
                      Dispute
                    </button>
                  </>
                )}
                {milestone.status === "completed" && (
                  <button className="px-lg py-sm text-caption cursor-pointer bg-primary-main text-text-inverse border-none rounded-sm font-semibold">
                    Withdraw Funds
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
