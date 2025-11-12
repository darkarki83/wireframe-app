import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'

type Provider = {
  id: string
  email: string
  name: string
  phone: string
  countryCode: string
}

type Attachment = {
  id: string
  name: string
  size: string
  uploadedAt: string
  type: string
}

type Proposal = {
  id: string
  freelancerName: string
  freelancerEmail: string
  price: number
  deliveryTime: string
  description: string
  status: 'pending' | 'accepted' | 'rejected'
  submittedAt: string
}

const myProvidersList: Provider[] = [
  { id: '1', email: 'sarah.johnson@example.com', name: 'Sarah Johnson', phone: '5557890', countryCode: '+1' },
  { id: '2', email: 'mike.brown@example.com', name: 'Mike Brown', phone: '5551122', countryCode: '+44' },
  { id: '3', email: 'john.doe@example.com', name: 'John Doe', phone: '5551234', countryCode: '+1' },
  { id: '4', email: 'jane.smith@example.com', name: 'Jane Smith', phone: '5555678', countryCode: '+1' },
]

export default function OfferDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [offer] = useState({
    id: id || '1',
    title: 'Website Development Proposal',
    description: 'Full-stack development for e-commerce platform with React and Node.js. Includes responsive design, payment integration, and admin dashboard.',
    status: 'active',
    createdAt: '2025-11-08'
  })

  const [assignedProviders, setAssignedProviders] = useState<Provider[]>([
    { id: '1', email: 'sarah.johnson@example.com', name: 'Sarah Johnson', phone: '5557890', countryCode: '+1' }
  ])

  const [attachments, setAttachments] = useState<Attachment[]>([
    { id: '1', name: 'project-brief.pdf', size: '2.4 MB', uploadedAt: '2025-11-08', type: 'pdf' },
    { id: '2', name: 'wireframes.fig', size: '1.8 MB', uploadedAt: '2025-11-08', type: 'figma' }
  ])

  const [proposals, setProposals] = useState<Proposal[]>([
    {
      id: '1',
      freelancerName: 'Alex Wilson',
      freelancerEmail: 'alex.wilson@example.com',
      price: 2800,
      deliveryTime: '14 days',
      description: 'I have 5+ years of experience in full-stack development.',
      status: 'pending',
      submittedAt: '2025-11-09'
    },
    {
      id: '2',
      freelancerName: 'Maria Garcia',
      freelancerEmail: 'maria.garcia@example.com',
      price: 2500,
      deliveryTime: '10 days',
      description: 'Experienced developer specializing in React and Node.js.',
      status: 'pending',
      submittedAt: '2025-11-09'
    }
  ])

  const [showProviderSelector, setShowProviderSelector] = useState(false)
  const [selectedProviderIds, setSelectedProviderIds] = useState<string[]>([])

  const availableProviders = myProvidersList.filter(
    p => !assignedProviders.find(ap => ap.id === p.id)
  )

  const handleToggleProvider = (providerId: string) => {
    if (selectedProviderIds.includes(providerId)) {
      setSelectedProviderIds(selectedProviderIds.filter(id => id !== providerId))
    } else {
      setSelectedProviderIds([...selectedProviderIds, providerId])
    }
  }

  const handleAddProviders = () => {
    const providersToAdd = myProvidersList.filter(p => selectedProviderIds.includes(p.id))
    setAssignedProviders([...assignedProviders, ...providersToAdd])
    setSelectedProviderIds([])
    setShowProviderSelector(false)
  }

  const handleRemoveProvider = (providerId: string) => {
    setAssignedProviders(assignedProviders.filter(p => p.id !== providerId))
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    const newAttachments: Attachment[] = Array.from(files).map((file, index) => ({
      id: `${Date.now()}-${index}`,
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
      uploadedAt: new Date().toISOString().split('T')[0],
      type: file.name.split('.').pop() || 'file'
    }))

    setAttachments([...attachments, ...newAttachments])
  }

  const getStatusClasses = (status: string) => {
    const statusMap: Record<string, string> = {
      active: 'bg-state-active-bg text-state-active-text',
      pending: 'bg-state-pending-bg text-state-pending-text',
      accepted: 'bg-state-approved-bg text-state-approved-text',
      rejected: 'bg-state-dispute-bg text-state-dispute-text',
    }
    return statusMap[status] || 'bg-state-draft-bg text-state-draft-text'
  }

  return (
    <div className="min-h-screen bg-base-background pb-20">
      <div className="px-lg pt-md pb-md">
        <button
          onClick={() => navigate(-1)}
          className="bg-transparent border-none text-primary-main text-body font-semibold cursor-pointer p-0 mb-lg flex items-center gap-xs"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12 15l-5-5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back
        </button>

        <div className="flex justify-between items-start mb-md gap-md">
          <h1 className="text-h1 font-semibold text-text-primary m-0 flex-1">
            {offer.title}
          </h1>
          <span className={`text-caption font-medium px-3 py-1 rounded-sm whitespace-nowrap ${getStatusClasses(offer.status)}`}>
            {offer.status.charAt(0).toUpperCase() + offer.status.slice(1)}
          </span>
        </div>

        <p className="text-body text-text-secondary m-0 mb-sm leading-normal">
          {offer.description}
        </p>
        <div className="text-caption text-text-secondary">
          Created on {offer.createdAt}
        </div>
      </div>

      <div className="px-lg">
        <div className="bg-base-surface rounded-lg shadow-base p-lg mb-lg">
          <div className="flex justify-between items-center mb-lg">
            <h3 className="text-h2 font-semibold text-text-primary m-0">
              Assigned Providers ({assignedProviders.length})
            </h3>
            {!showProviderSelector && (
              <button
                onClick={() => setShowProviderSelector(true)}
                className="py-sm px-lg bg-primary-main text-text-inverse border-none rounded-sm text-body font-semibold cursor-pointer flex items-center gap-xs"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                Add
              </button>
            )}
          </div>

          {showProviderSelector && (
            <div className="bg-primary-light p-lg rounded-md mb-lg">
              <h4 className="text-body font-semibold text-text-primary m-0 mb-md">
                Select Providers
              </h4>
              <div className="flex flex-col gap-sm mb-lg">
                {availableProviders.map((provider) => (
                  <label
                    key={provider.id}
                    className="flex items-center gap-md cursor-pointer p-md bg-base-surface rounded-sm"
                  >
                    <input
                      type="checkbox"
                      checked={selectedProviderIds.includes(provider.id)}
                      onChange={() => handleToggleProvider(provider.id)}
                      className="cursor-pointer"
                    />
                    <div className="flex-1">
                      <div className="text-body font-medium text-text-primary">
                        {provider.name}
                      </div>
                      <div className="text-caption text-text-secondary">
                        {provider.email}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
              <div className="flex gap-md">
                <button
                  onClick={handleAddProviders}
                  disabled={selectedProviderIds.length === 0}
                  className="flex-1 bg-primary-main hover:bg-primary-hover text-text-inverse h-11 rounded-md px-xl cursor-pointer border-none text-body font-semibold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add Selected
                </button>
                <button
                  onClick={() => {
                    setShowProviderSelector(false)
                    setSelectedProviderIds([])
                  }}
                  className="flex-1 bg-base-surface hover:bg-base-background text-text-primary h-11 rounded-md px-xl cursor-pointer border border-base-border text-body font-semibold transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-md">
            {assignedProviders.map((provider) => (
              <div
                key={provider.id}
                className="flex items-center gap-md p-lg bg-base-background rounded-sm"
              >
                {/* User Icon - Duotone */}
                <div className="flex-shrink-0">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <circle cx="20" cy="15" r="6" fill="#E9E7FF" opacity="0.3" />
                    <circle cx="20" cy="15" r="6" stroke="#6C63FF" strokeWidth="1.5" fill="none" />
                    <path d="M10 32c0-5.523 4.477-10 10-10s10 4.477 10 10" stroke="#6C63FF" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                    <circle cx="32" cy="10" r="1.5" fill="#6C63FF" />
                  </svg>
                </div>

                {/* Provider Info */}
                <div className="flex-1 min-w-0">
                  <div className="text-body font-semibold text-text-primary mb-xs overflow-hidden text-ellipsis whitespace-nowrap">
                    {provider.name}
                  </div>
                  <div className="text-caption text-text-secondary overflow-hidden text-ellipsis whitespace-nowrap">
                    {provider.email}
                  </div>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => handleRemoveProvider(provider.id)}
                  className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-transparent border-none text-text-secondary cursor-pointer rounded-sm"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-base-surface rounded-lg shadow-base p-lg mb-lg">
          <h3 className="text-h2 font-semibold text-text-primary m-0 mb-lg">
            Attachments ({attachments.length})
          </h3>

          <label className="block w-full p-xl bg-primary-light border-2 border-dashed border-primary-main rounded-md text-center cursor-pointer mb-lg">
            <input
              type="file"
              multiple
              onChange={handleFileUpload}
              className="hidden"
            />

            {/* Upload Icon - Duotone */}
            <div className="mb-md">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="mx-auto block">
                <rect x="12" y="16" width="24" height="20" rx="2" fill="#6C63FF" opacity="0.2" />
                <path d="M24 10v18M18 16l6-6 6 6" stroke="#6C63FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14 30h20a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H14a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2z" stroke="#6C63FF" strokeWidth="2" fill="none" />
                <circle cx="38" cy="12" r="2" fill="#6C63FF" />
                <circle cx="10" cy="14" r="1.5" fill="#E9E7FF" />
              </svg>
            </div>

            <div className="text-body font-semibold text-primary-main mb-xs">
              Upload Files
            </div>
            <div className="text-caption text-text-secondary">
              Click to browse files
            </div>
          </label>

          <div className="flex flex-col gap-sm">
            {attachments.map((file) => (
              <div
                key={file.id}
                className="flex items-center gap-md p-lg bg-base-background rounded-sm"
              >
                {/* File Icon - Duotone */}
                <div className="flex-shrink-0">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <rect x="8" y="5" width="24" height="30" rx="3" fill="#E9E7FF" opacity="0.3" />
                    <path d="M12 5h16a4 4 0 0 1 4 4v22a4 4 0 0 1-4 4H12a4 4 0 0 1-4-4V9a4 4 0 0 1 4-4z" stroke="#6C63FF" strokeWidth="1.5" fill="none" />
                    <path d="M14 15h12M14 20h12M14 25h8" stroke="#6C63FF" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>

                {/* File Info */}
                <div className="flex-1 min-w-0">
                  <div className="text-body font-medium text-text-primary mb-xs overflow-hidden text-ellipsis whitespace-nowrap">
                    {file.name}
                  </div>
                  <div className="text-caption text-text-secondary">
                    {file.size} • {file.uploadedAt}
                  </div>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => setAttachments(attachments.filter(a => a.id !== file.id))}
                  className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-transparent border-none text-text-secondary cursor-pointer rounded-sm"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-base-surface rounded-lg shadow-base p-lg mb-lg">
          <h3 className="text-h2 font-semibold text-text-primary m-0 mb-lg">
            Proposals ({proposals.length})
          </h3>

          <div className="flex flex-col gap-md">
            {proposals.map((proposal) => {
              const statusClasses = getStatusClasses(proposal.status)
              return (
                <Link
                  key={proposal.id}
                  to={`/proposals/${proposal.id}`}
                  className="no-underline block p-lg bg-base-background rounded-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="flex justify-between items-start mb-sm">
                    <div className="flex-1">
                      <h4 className="text-h2 font-semibold text-text-primary m-0 mb-xs">
                        {proposal.freelancerName}
                      </h4>
                      <div className="text-caption text-text-secondary mb-sm">
                        {proposal.freelancerEmail}
                      </div>
                    </div>
                    <span className={`text-caption font-medium px-3 py-1 rounded-sm whitespace-nowrap ml-sm ${statusClasses}`}>
                      {proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1)}
                    </span>
                  </div>

                  <div className="flex gap-lg mb-md flex-wrap">
                    <div>
                      <span className="text-h2 font-semibold text-primary-main">
                        ${proposal.price}
                      </span>
                    </div>
                    <div className="text-body text-text-secondary">
                      ⏱️ {proposal.deliveryTime}
                    </div>
                    <div className="text-caption text-text-secondary">
                      {proposal.submittedAt}
                    </div>
                  </div>

                  <p className="text-body text-text-secondary m-0 leading-normal">
                    {proposal.description}
                  </p>

                  {proposal.status === 'pending' && (
                    <div className="flex gap-md mt-lg pt-lg border-t border-base-border">
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          setProposals(proposals.map(p =>
                            p.id === proposal.id ? { ...p, status: 'accepted' } : p
                          ))
                        }}
                        className="flex-1 h-11 flex items-center justify-center bg-state-approved-bg text-state-approved-text border-none rounded-sm text-body font-semibold cursor-pointer"
                      >
                        ✓ Accept
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          setProposals(proposals.map(p =>
                            p.id === proposal.id ? { ...p, status: 'rejected' } : p
                          ))
                        }}
                        className="flex-1 h-11 flex items-center justify-center bg-base-surface text-state-dispute-text border border-state-dispute-text rounded-sm text-body font-semibold cursor-pointer"
                      >
                        ✕ Reject
                      </button>
                    </div>
                  )}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
