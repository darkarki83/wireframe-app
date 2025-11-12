import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { KycStatus } from '../../interfaces'
import { BackIcon, RefreshIcon } from '../../components/icons'

export default function KycGate() {
  const navigate = useNavigate()
  
  const [kycData, setKycData] = useState({
    status: 'approved' as KycStatus,
    balance: 0,
    lastUpdated: '2025-11-12'
  })

  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefreshBalance = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setKycData({ ...kycData, balance: Math.random() * 1000 })
      setIsRefreshing(false)
    }, 500)
  }

  const handleDeposit = () => {
    alert('Deposit functionality - coming soon')
  }

  const handleWithdraw = () => {
    alert('Withdraw functionality - coming soon')
  }

  const handleSignOut = () => {
    if (confirm('Are you sure you want to sign out?')) {
      navigate('/auth/signin')
    }
  }

  const getStatusConfig = (status: KycStatus) => {
    const configs = {
      not_started: {
        label: 'Not Started',
        bgClass: 'bg-state-draft-bg',
        textClass: 'text-state-draft-text',
        description: 'Complete KYC verification to access the platform'
      },
      in_progress: {
        label: 'In Progress',
        bgClass: 'bg-blue-100',
        textClass: 'text-blue-700',
        description: 'Your documents are being verified'
      },
      pending_review: {
        label: 'Pending Review',
        bgClass: 'bg-state-pending-bg',
        textClass: 'text-state-pending-text',
        description: 'Documents submitted, awaiting review'
      },
      approved: {
        label: 'Approved',
        bgClass: 'bg-state-approved-bg',
        textClass: 'text-state-approved-text',
        description: 'Your account is fully verified'
      },
      rejected: {
        label: 'Rejected',
        bgClass: 'bg-state-dispute-bg',
        textClass: 'text-state-dispute-text',
        description: 'Verification failed, please try again'
      },
      expired: {
        label: 'Expired',
        bgClass: 'bg-gray-100',
        textClass: 'text-gray-700',
        description: 'KYC has expired, please renew'
      }
    }
    return configs[status]
  }

  const statusConfig = getStatusConfig(kycData.status)

  return (
    <div className="min-h-screen bg-base-background pb-20">
      <div className="px-lg pt-md pb-md">
        <button
          onClick={() => navigate(-1)}
          className="bg-transparent border-none text-primary-main text-body font-semibold cursor-pointer p-0 mb-lg flex items-center gap-xs"
        >
          <BackIcon />
          Back
        </button>

        <h1 className="text-h1 font-semibold text-text-primary m-0 mb-xl">
          KYC Verification
        </h1>

        {/* Balance Section */}
        <div className="bg-base-surface rounded-lg shadow-base p-lg mb-lg">
          <div className="flex items-center justify-between mb-md">
            <div>
              <div className="text-caption text-text-secondary mb-xs">
                KYC BALANCE
              </div>
              <div className="text-h1 font-semibold text-text-primary">
                {kycData.balance.toFixed(2)} USDC
              </div>
            </div>
            <button
              onClick={handleRefreshBalance}
              disabled={isRefreshing}
              className={`flex items-center justify-center w-10 h-10 rounded-full bg-primary-light border border-primary-main cursor-pointer transition-transform duration-200 ${
                isRefreshing ? 'animate-spin' : 'hover:scale-110'
              }`}
              title="Refresh balance"
            >
              <RefreshIcon size={20} className="text-primary-main" />
            </button>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-md mb-md">
            <button
              onClick={handleDeposit}
              className="h-11 bg-primary-main hover:bg-primary-hover text-text-inverse border-none rounded-sm text-body font-semibold cursor-pointer transition-colors duration-200"
            >
              Deposit KYC
            </button>
            <button
              onClick={handleWithdraw}
              className="h-11 bg-base-surface hover:bg-base-background text-text-primary border border-base-border rounded-sm text-body font-semibold cursor-pointer transition-colors duration-200"
            >
              Withdraw KYC
            </button>
          </div>

          <button
            onClick={handleSignOut}
            className="w-full h-11 bg-red-500 hover:bg-red-600 text-white border-none rounded-sm text-body font-semibold cursor-pointer transition-colors duration-200"
          >
            Sign Out
          </button>
        </div>

        {/* KYC Status Section */}
        <div className="bg-base-surface rounded-lg shadow-base p-lg">
          <h3 className="text-h2 font-semibold text-text-primary m-0 mb-lg">
            KYC Status
          </h3>

          <div className="flex items-center justify-between mb-md">
            <span className="text-body text-text-secondary">Current status:</span>
            <span className={`px-3 py-1 rounded-sm text-caption font-medium ${statusConfig.bgClass} ${statusConfig.textClass}`}>
              {statusConfig.label}
            </span>
          </div>

          <p className="text-body text-text-secondary m-0 mb-lg">
            {statusConfig.description}
          </p>

          {kycData.lastUpdated && (
            <div className="text-caption text-text-secondary">
              Last updated: {kycData.lastUpdated}
            </div>
          )}

          {/* Status-specific actions */}
          {kycData.status === 'not_started' && (
            <button
              onClick={() => alert('Start KYC process')}
              className="w-full h-11 mt-lg bg-primary-main hover:bg-primary-hover text-text-inverse border-none rounded-sm text-body font-semibold cursor-pointer transition-colors duration-200"
            >
              Start KYC
            </button>
          )}

          {kycData.status === 'rejected' && (
            <button
              onClick={() => alert('Retry KYC process')}
              className="w-full h-11 mt-lg bg-primary-main hover:bg-primary-hover text-text-inverse border-none rounded-sm text-body font-semibold cursor-pointer transition-colors duration-200"
            >
              Try Again
            </button>
          )}

          {kycData.status === 'expired' && (
            <button
              onClick={() => alert('Renew KYC process')}
              className="w-full h-11 mt-lg bg-primary-main hover:bg-primary-hover text-text-inverse border-none rounded-sm text-body font-semibold cursor-pointer transition-colors duration-200"
            >
              Renew KYC
            </button>
          )}

          {kycData.status === 'approved' && (
            <button
              onClick={() => navigate('/main')}
              className="w-full h-11 mt-lg bg-primary-main hover:bg-primary-hover text-text-inverse border-none rounded-sm text-body font-semibold cursor-pointer transition-colors duration-200"
            >
              Go to Home
            </button>
          )}
        </div>

        {/* Status Change Demo (for development) */}
        <div className="mt-xl bg-base-surface rounded-lg shadow-base p-lg">
          <h4 className="text-body font-semibold text-text-primary m-0 mb-md">
            Test Statuses (dev only)
          </h4>
          <div className="grid grid-cols-2 gap-sm">
            {(['not_started', 'in_progress', 'pending_review', 'approved', 'rejected', 'expired'] as KycStatus[]).map((status) => (
              <button
                key={status}
                onClick={() => setKycData({ ...kycData, status })}
                className={`py-sm px-md rounded-sm text-caption border-none cursor-pointer transition-colors duration-200 ${
                  kycData.status === status
                    ? 'bg-primary-main text-text-inverse'
                    : 'bg-base-background text-text-secondary hover:bg-base-border'
                }`}
              >
                {getStatusConfig(status).label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
