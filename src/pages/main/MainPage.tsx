import React from 'react'
import { useNavigate } from 'react-router-dom'

const MainPage: React.FC = () => {
  const navigate = useNavigate()

  // Mock data for active contracts
  const activeContracts = [
    { id: 1, title: 'Website Redesign', provider: 'Design Studio Inc.', status: 'active', amount: '$2,500', dueDate: 'Feb 15, 2024' },
    { id: 2, title: 'Mobile App Development', provider: 'Tech Solutions LLC', status: 'pending', amount: '$5,000', dueDate: 'Mar 1, 2024' },
  ]

  const getStatusClasses = (status: string) => {
    const statusMap: Record<string, string> = {
      active: 'bg-state-active-bg text-state-active-text',
      pending: 'bg-state-pending-bg text-state-pending-text',
      completed: 'bg-state-completed-bg text-state-completed-text',
    }
    return statusMap[status.toLowerCase()] || 'bg-state-draft-bg text-state-draft-text'
  }

  return (
    <div className="min-h-screen bg-base-background pb-20">
      {/* Welcome Header */}
      <div className="px-lg pb-xl">
        <h1 className="text-h1 font-semibold text-text-primary m-0">
          Welcome, Artiom!
        </h1>
      </div>

      {/* Hero Banner Card - "Finish your profile" style */}
      <div className="px-lg pb-xl">
        <div className="flex items-center gap-lg bg-base-surface p-lg rounded-lg shadow-base">
          {/* Left side - Content */}
          <div className="flex-1">
            <h2 className="text-h2 font-semibold text-text-primary m-0 mb-sm">
              Complete your profile
            </h2>

            {/* Progress bar */}
            <div className="bg-primary-light h-1.5 rounded-sm mb-md overflow-hidden">
              <div className="bg-primary-main h-full w-3/5 rounded-sm" />
            </div>

            <p className="text-caption text-text-secondary m-0 mb-lg">
              2 steps to finish
            </p>

            <button
              onClick={() => navigate('/user/edit')}
              className="bg-primary-main hover:bg-primary-hover text-text-inverse h-11 rounded-md px-xl cursor-pointer border-none text-body font-semibold transition-colors duration-200"
            >
              Continue
            </button>
          </div>

          {/* Right side - Illustration (duotone style) */}
          <div className="w-25 h-25 flex-shrink-0">
            <svg viewBox="0 0 100 100" fill="none">
              {/* Duotone illustration - simplified user/profile icon */}
              <circle cx="50" cy="35" r="15" fill="#E9E7FF" />
              <path d="M30 70 C30 60, 35 55, 50 55 C65 55, 70 60, 70 70 L70 75 L30 75 Z" fill="#6C63FF" opacity="0.3" />
              <circle cx="50" cy="35" r="12" stroke="#6C63FF" strokeWidth="2" fill="none" />
              <path d="M32 72 C32 62, 37 58, 50 58 C63 58, 68 62, 68 72" stroke="#6C63FF" strokeWidth="2" strokeLinecap="round" fill="none" />
              {/* Sparkles */}
              <circle cx="75" cy="25" r="2" fill="#6C63FF" />
              <circle cx="82" cy="35" r="1.5" fill="#E9E7FF" />
              <circle cx="25" cy="30" r="1.5" fill="#6C63FF" />
            </svg>
          </div>
        </div>
      </div>

      {/* Quick Actions - 3 tiles like "Your products" */}
      <div className="px-lg pb-xl">
        <h2 className="text-h2 font-semibold text-text-primary m-0 mb-lg">
          Quick actions
        </h2>

        <div className="grid grid-cols-3 gap-md">
          {/* Offers Card */}
          <button
            onClick={() => navigate('/offers')}
            className="bg-base-surface rounded-lg shadow-base p-lg flex flex-col items-center gap-sm cursor-pointer border-none transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="w-14 h-14 relative">
              <svg viewBox="0 0 56 56" fill="none">
                {/* Duotone Offers icon - Dollar coin with sparkles */}
                <circle cx="28" cy="28" r="16" fill="#E9E7FF" />
                <circle cx="28" cy="28" r="13" stroke="#6C63FF" strokeWidth="2" fill="none" />
                <path d="M28 20v16M31 23h-4a2.5 2.5 0 0 0 0 5h2a2.5 2.5 0 0 1 0 5h-4" stroke="#6C63FF" strokeWidth="2" strokeLinecap="round" />
                {/* Sparkles */}
                <circle cx="42" cy="18" r="1.5" fill="#6C63FF" />
                <circle cx="48" cy="24" r="1" fill="#E9E7FF" />
                <circle cx="14" cy="20" r="1" fill="#6C63FF" />
                <circle cx="12" cy="36" r="1.5" fill="#E9E7FF" />
              </svg>
            </div>
            <span className="text-caption font-medium text-text-primary text-center">
              Offers
            </span>
          </button>

          {/* Contracts Card */}
          <button
            onClick={() => navigate('/contracts')}
            className="bg-base-surface rounded-lg shadow-base p-lg flex flex-col items-center gap-sm cursor-pointer border-none transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="w-14 h-14 relative">
              <svg viewBox="0 0 56 56" fill="none">
                {/* Duotone Contracts icon - Document with checkmark */}
                <rect x="18" y="12" width="20" height="28" rx="2" fill="#E9E7FF" />
                <path d="M18 12h12l8 8v20a2 2 0 0 1-2 2H18a2 2 0 0 1-2-2V14a2 2 0 0 1 2-2z" stroke="#6C63FF" strokeWidth="2" fill="none" />
                <path d="M30 12v8h8" stroke="#6C63FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <path d="M24 28h8M24 32h8M24 36h5" stroke="#6C63FF" strokeWidth="1.5" strokeLinecap="round" />
                {/* Sparkles */}
                <circle cx="42" cy="16" r="1.5" fill="#6C63FF" />
                <circle cx="14" cy="22" r="1" fill="#E9E7FF" />
                <circle cx="40" cy="38" r="1" fill="#6C63FF" />
              </svg>
            </div>
            <span className="text-caption font-medium text-text-primary text-center">
              Contracts
            </span>
          </button>

          {/* Messages Card */}
          <button
            onClick={() => navigate('/chats')}
            className="bg-base-surface rounded-lg shadow-base p-lg flex flex-col items-center gap-sm cursor-pointer border-none transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="w-14 h-14 relative">
              <svg viewBox="0 0 56 56" fill="none">
                {/* Duotone Messages icon - Chat bubble with dots */}
                <path d="M14 18a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4h-9l-6 6v-6h-5a4 4 0 0 1-4-4V18z" fill="#E9E7FF" />
                <path d="M14 18a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4h-9l-6 6v-6h-5a4 4 0 0 1-4-4V18z" stroke="#6C63FF" strokeWidth="2" fill="none" />
                {/* Chat dots */}
                <circle cx="22" cy="25" r="1.5" fill="#6C63FF" />
                <circle cx="28" cy="25" r="1.5" fill="#6C63FF" />
                <circle cx="34" cy="25" r="1.5" fill="#6C63FF" />
                {/* Sparkles */}
                <circle cx="44" cy="14" r="1.5" fill="#6C63FF" />
                <circle cx="12" cy="16" r="1" fill="#E9E7FF" />
                <circle cx="42" cy="36" r="1" fill="#6C63FF" />
              </svg>
            </div>
            <span className="text-caption font-medium text-text-primary text-center">
              Messages
            </span>
          </button>
        </div>
      </div>

      {/* Active Contracts Section */}
      <div className="px-lg pb-xl">
        <div className="flex justify-between items-center mb-lg">
          <h2 className="text-h2 font-semibold text-text-primary m-0">
            Active contracts
          </h2>
          <button
            onClick={() => navigate('/contracts')}
            className="bg-transparent border-none text-primary-main text-body font-medium cursor-pointer p-sm hover:underline"
          >
            View all
          </button>
        </div>

        <div className="flex flex-col gap-md">
          {activeContracts.map((contract) => {
            const statusClasses = getStatusClasses(contract.status)
            return (
              <button
                key={contract.id}
                onClick={() => navigate(`/contracts/${contract.id}`)}
                className="bg-base-surface rounded-lg shadow-base p-lg cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md border-none text-left w-full"
              >
                <div className="flex justify-between items-start mb-sm">
                  <h3 className="text-h2 font-semibold text-text-primary m-0 flex-1">
                    {contract.title}
                  </h3>
                  <span className={`text-caption font-medium px-3 py-1 rounded-sm whitespace-nowrap ml-sm ${statusClasses}`}>
                    {contract.status.charAt(0).toUpperCase() + contract.status.slice(1)}
                  </span>
                </div>
                <p className="text-caption text-text-secondary m-0 mb-xs">
                  {contract.provider}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-body font-semibold text-text-primary">
                    {contract.amount}
                  </span>
                  <span className="text-caption text-text-secondary">
                    Due: {contract.dueDate}
                  </span>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default MainPage