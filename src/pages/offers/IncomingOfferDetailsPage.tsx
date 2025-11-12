import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  BackIcon,
  UserProfileIcon,
  EmailIcon,
  ClockIcon,
  FileIcon,
  DownloadIcon,
  PlusIcon
} from '../../components/icons'

type Attachment = {
  id: string
  name: string
  size: string
  uploadedAt: string
  type: string
}

type Message = {
  id: string
  senderId: string
  senderName: string
  text: string
  timestamp: string
  isOwn: boolean
}

export default function IncomingOfferDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [offer] = useState({
    id: id || '1',
    title: 'Mobile App Development Project',
    description: 'Looking for an experienced React Native developer to build a cross-platform mobile application for our startup. The app should include user authentication, real-time messaging, payment integration, and push notifications.',
    clientName: 'Sarah Johnson',
    clientEmail: 'sarah.johnson@example.com',
    clientCompany: 'TechStart Inc.',
    assignedBy: {
      name: 'John Smith',
      email: 'john.smith@example.com',
      assignedAt: '2025-11-10'
    },
    postedAt: '2025-11-09',
    status: 'active' as 'active' | 'closed'
  })

  const [attachments] = useState<Attachment[]>([
    { id: '1', name: 'project-requirements.pdf', size: '1.2 MB', uploadedAt: '2025-11-09', type: 'pdf' },
    { id: '2', name: 'wireframes.fig', size: '3.5 MB', uploadedAt: '2025-11-09', type: 'figma' },
    { id: '3', name: 'api-docs.pdf', size: '850 KB', uploadedAt: '2025-11-09', type: 'pdf' }
  ])

  const [showProposalChat, setShowProposalChat] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      senderId: 'system',
      senderName: 'System',
      text: 'Proposal started - begin negotiation',
      timestamp: new Date().toLocaleString(),
      isOwn: false
    }
  ])
  const [newMessage, setNewMessage] = useState('')

  const [proposalDetails, setProposalDetails] = useState({
    budgetMin: '',
    budgetMax: '',
    duration: '',
    deliverables: '',
  })

  const handleCreateProposal = () => {
    setShowProposalChat(true)
  }

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const msg: Message = {
      id: Date.now().toString(),
      senderId: 'user',
      senderName: 'You',
      text: newMessage,
      timestamp: new Date().toLocaleString(),
      isOwn: true
    }
    setMessages([...messages, msg])
    setNewMessage('')
  }

  const getStatusClasses = (status: string) => {
    const statusMap: Record<string, string> = {
      active: 'bg-state-active-bg text-state-active-text',
      closed: 'bg-state-draft-bg text-state-draft-text',
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
          <BackIcon />
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

        <p className="text-body text-text-secondary m-0 mb-md leading-normal">
          {offer.description}
        </p>

        <div className="flex items-center gap-md mb-sm">
          <UserProfileIcon />
          <div>
            <span className="text-body font-semibold text-text-primary">
              {offer.clientName}
            </span>
            <span className="text-body text-text-secondary ml-xs">
              • {offer.clientCompany}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-md mb-sm">
          <EmailIcon />
          <span className="text-body text-text-secondary">
            {offer.clientEmail}
          </span>
        </div>

        <div className="text-caption text-text-secondary mb-md">
          Posted on {offer.postedAt}
        </div>

        <div className="bg-primary-light rounded-lg shadow-base p-lg">
          <div className="flex items-center gap-md">
            <ClockIcon />
            <div>
              <div className="text-caption text-text-secondary mb-xs">
                Assigned by
              </div>
              <div className="text-body font-semibold text-text-primary">
                {offer.assignedBy.name} • {offer.assignedBy.assignedAt}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-lg">
        <div className="bg-base-surface rounded-lg shadow-base p-lg mb-lg">
          <h3 className="text-h2 font-semibold text-text-primary m-0 mb-lg">
            Attachments ({attachments.length})
          </h3>

          <div className="flex flex-col gap-sm">
            {attachments.map((file) => (
              <div
                key={file.id}
                className="flex items-center gap-md p-lg bg-base-background rounded-sm cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm"
              >
                <FileIcon className="flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-body font-medium text-text-primary mb-xs overflow-hidden text-ellipsis whitespace-nowrap">
                    {file.name}
                  </div>
                  <div className="text-caption text-text-secondary">
                    {file.size} • {file.uploadedAt}
                  </div>
                </div>
                <DownloadIcon />
              </div>
            ))}
          </div>
        </div>

        {!showProposalChat ? (
          <button
            onClick={handleCreateProposal}
            className="w-full h-11 bg-primary-main hover:bg-primary-hover text-text-inverse border-none rounded-sm text-body font-semibold cursor-pointer flex items-center justify-center gap-sm transition-colors duration-200"
          >
            <PlusIcon size={20} />
            Create Proposal
          </button>
        ) : (
          <div className="bg-base-surface rounded-lg shadow-base p-lg mb-lg">
            <h3 className="text-h2 font-semibold text-text-primary m-0 mb-lg">
              Proposal Details
            </h3>

            <div className="mb-lg">
              <label htmlFor="budget-range" className="block mb-sm text-caption font-medium text-text-primary">
                Budget Range
              </label>
              <div className="flex gap-md">
                <input
                  id="budget-range"
                  type="text"
                  value={proposalDetails.budgetMin}
                  onChange={(e) => setProposalDetails({ ...proposalDetails, budgetMin: e.target.value })}
                  placeholder="Min ($)"
                  className="flex-1 min-w-0 py-md px-lg border border-base-border rounded-sm text-body"
                />
                <input
                  type="text"
                  value={proposalDetails.budgetMax}
                  onChange={(e) => setProposalDetails({ ...proposalDetails, budgetMax: e.target.value })}
                  placeholder="Max ($)"
                  className="flex-1 min-w-0 py-md px-lg border border-base-border rounded-sm text-body"
                />
              </div>
            </div>

            <div className="mb-lg">
              <label htmlFor="duration" className="block mb-sm text-caption font-medium text-text-primary">
                Duration
              </label>
              <input
                id="duration"
                type="text"
                value={proposalDetails.duration}
                onChange={(e) => setProposalDetails({ ...proposalDetails, duration: e.target.value })}
                placeholder="e.g., 2 months"
                className="w-full py-md px-lg border border-base-border rounded-sm text-body"
              />
            </div>

            <div className="mb-xl">
              <label htmlFor="deliverables" className="block mb-sm text-caption font-medium text-text-primary">
                Deliverables
              </label>
              <textarea
                id="deliverables"
                value={proposalDetails.deliverables}
                onChange={(e) => setProposalDetails({ ...proposalDetails, deliverables: e.target.value })}
                placeholder="Describe what you will deliver..."
                rows={4}
                className="w-full py-md px-lg border border-base-border rounded-sm text-body resize-y"
              />
            </div>

            <h3 className="text-h2 font-semibold text-text-primary mt-xl mb-lg">
              Chat with Client
            </h3>

            <div className="bg-base-background rounded-md mb-lg max-h-[300px] min-h-[200px] overflow-y-auto">
              <div className="p-lg flex flex-col gap-md">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex flex-col ${message.senderId === 'system' ? 'items-center' : message.isOwn ? 'items-end' : 'items-start'}`}
                  >
                    {message.senderId === 'system' ? (
                      <div className="bg-base-surface text-text-secondary py-sm px-md rounded-md text-caption italic text-center">
                        {message.text}
                      </div>
                    ) : (
                      <>
                        <div className={`max-w-[85%] p-md rounded-md break-words ${message.isOwn ? 'bg-primary-main text-text-inverse rounded-tr' : 'bg-base-surface text-text-primary rounded-tl'}`}>
                          <div className="text-caption font-semibold mb-xs opacity-80">
                            {message.senderName}
                          </div>
                          <div className="text-body leading-normal break-words">
                            {message.text}
                          </div>
                        </div>
                        <div className="text-caption text-text-secondary mt-xs">
                          {message.timestamp}
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-sm mb-lg items-stretch">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessage()
                  }
                }}
                placeholder="Type your message..."
                className="flex-1 min-w-0 py-md px-lg border border-base-border rounded-sm text-body"
              />
              <button
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                className={`flex-shrink-0 py-md px-lg border-none rounded-sm text-body font-semibold whitespace-nowrap ${newMessage.trim() ? 'bg-primary-main text-text-inverse cursor-pointer' : 'bg-base-border text-text-inverse cursor-not-allowed'}`}
              >
                Send
              </button>
            </div>

            <button
              onClick={() => {
                if (!proposalDetails.budgetMin || !proposalDetails.budgetMax || !proposalDetails.duration) {
                  alert('Please fill in all required fields')
                  return
                }
                alert('Proposal submitted successfully!')
              }}
              className="w-full h-11 bg-primary-main hover:bg-primary-hover text-text-inverse border-none rounded-sm text-body font-semibold cursor-pointer transition-colors duration-200"
            >
              Submit Proposal
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
