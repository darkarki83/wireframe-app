import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BackIcon } from '../../components/icons'
import { offers, incomingOffers as incomingOffersData } from '../../mocks'
import type { OfferStatus } from '../../interfaces'
import type { IncomingOfferStatus } from '../../interfaces'

type DisplayOffer = {
  id: string
  title: string
  description: string
  status: OfferStatus | IncomingOfferStatus
  createdAt: string
  assignedBy?: string
  hasAttachments?: boolean
}

export default function OffersPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'my' | 'incoming'>('my')
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [myOffers, setMyOffers] = useState<DisplayOffer[]>(
    offers.map(o => ({
      id: o.id,
      title: o.title,
      description: o.description,
      status: o.status,
      createdAt: o.createdAt,
      hasAttachments: false
    }))
  )
  const [incomingOffers] = useState<DisplayOffer[]>(
    incomingOffersData.map(o => ({
      id: o.id,
      title: o.title,
      description: o.description,
      status: o.status,
      createdAt: o.createdAt,
      assignedBy: o.assignedBy,
      hasAttachments: o.hasAttachments
    }))
  )

  const handleCreateOffer = () => {
    if (!title.trim() || !description.trim()) return
    const newOffer: DisplayOffer = {
      id: Date.now().toString(),
      title,
      description,
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0]
    }
    setMyOffers([newOffer, ...myOffers])
    setTitle('')
    setDescription('')
    setShowCreateForm(false)
  }

  const getStatusClasses = (status: string) => {
    const statusMap: Record<string, string> = {
      active: 'bg-state-active-bg text-state-active-text',
      pending: 'bg-state-pending-bg text-state-pending-text',
      accepted: 'bg-state-approved-bg text-state-approved-text',
      rejected: 'bg-state-dispute-bg text-state-dispute-text',
      draft: 'bg-state-draft-bg text-state-draft-text',
      in_review: 'bg-state-pending-bg text-state-pending-text',
      completed: 'bg-state-approved-bg text-state-approved-text',
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

        <h1 className="text-h1 font-semibold text-text-primary m-0">
          Offers
        </h1>
      </div>

      <div className="px-lg mb-xl">
        <div className="flex gap-xs bg-base-surface p-xs rounded-md shadow-sm">
          <button
            onClick={() => setActiveTab('my')}
            className={`flex-1 py-md px-lg rounded-sm text-body font-semibold cursor-pointer border-none transition-all duration-200 ${activeTab === 'my'
              ? 'bg-primary-main text-text-inverse'
              : 'bg-transparent text-text-secondary'
              }`}
          >
            My Offers
          </button>
          <button
            onClick={() => setActiveTab('incoming')}
            className={`flex-1 py-md px-lg rounded-sm text-body font-semibold cursor-pointer border-none transition-all duration-200 ${activeTab === 'incoming'
              ? 'bg-primary-main text-text-inverse'
              : 'bg-transparent text-text-secondary'
              }`}
          >
            Incoming Offers
          </button>
        </div>
      </div>

      <div className="px-lg">
        {activeTab === 'my' ? (
          <div>
            {showCreateForm ? (
              <div className="bg-base-surface rounded-lg shadow-base p-lg mb-xl">
                <h3 className="m-0 mb-lg text-h2 font-semibold text-text-primary">
                  Create New Offer
                </h3>

                <div className="mb-lg">
                  <label className="block mb-sm text-caption font-medium text-text-primary">
                    Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter offer title"
                    className="w-full py-md px-lg border border-base-border rounded-sm text-body box-border"
                  />
                </div>

                <div className="mb-xl">
                  <label className="block mb-sm text-caption font-medium text-text-primary">
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe your offer..."
                    rows={4}
                    className="w-full py-md px-lg border border-base-border rounded-sm text-body box-border resize-y"
                  />
                </div>

                <div className="flex gap-md">
                  <button
                    onClick={handleCreateOffer}
                    className="flex-1 bg-primary-main hover:bg-primary-hover text-text-inverse h-11 rounded-md px-xl cursor-pointer border-none text-body font-semibold transition-colors duration-200"
                  >
                    Create
                  </button>
                  <button
                    onClick={() => {
                      setShowCreateForm(false)
                      setTitle('')
                      setDescription('')
                    }}
                    className="flex-1 bg-base-surface hover:bg-base-background text-text-primary h-11 rounded-md px-xl cursor-pointer border border-base-border text-body font-semibold transition-colors duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowCreateForm(true)}
                className="w-full bg-primary-main hover:bg-primary-hover text-text-inverse h-11 rounded-md px-xl mb-xl cursor-pointer border-none text-body font-semibold transition-colors duration-200 flex items-center justify-center gap-sm"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                Create Offer
              </button>
            )}

            <div className="flex flex-col gap-md">
              {myOffers.map((offer) => {
                const statusClasses = getStatusClasses(offer.status)
                return (
                  <Link
                    key={offer.id}
                    to={`/offers/${offer.id}`}
                    className="bg-base-surface rounded-lg shadow-base p-lg no-underline block cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className="flex justify-between items-start mb-sm">
                      <h3 className="text-h2 font-semibold text-text-primary m-0 flex-1">
                        {offer.title}
                      </h3>
                      <span className={`text-caption font-medium px-3 py-1 rounded-sm whitespace-nowrap ml-sm ${statusClasses}`}>
                        {offer.status.charAt(0).toUpperCase() + offer.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-body text-text-secondary m-0 mb-md leading-normal">
                      {offer.description}
                    </p>
                    <div className="text-caption text-text-secondary">
                      Created: {offer.createdAt}
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        ) : (
          <div>
            <div className="flex flex-col gap-md">
              {incomingOffers.map((offer) => {
                const statusClasses = getStatusClasses(offer.status)
                return (
                  <Link
                    key={offer.id}
                    to={`/incoming-offers/${offer.id}`}
                    className="bg-base-surface rounded-lg shadow-base p-lg no-underline block cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className="flex justify-between items-start mb-sm">
                      <h3 className="text-h2 font-semibold text-text-primary m-0 flex-1">
                        {offer.title}
                      </h3>
                      <span className={`text-caption font-medium px-3 py-1 rounded-sm whitespace-nowrap ml-sm ${statusClasses}`}>
                        {offer.status.charAt(0).toUpperCase() + offer.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-body text-text-secondary m-0 mb-md leading-normal">
                      {offer.description}
                    </p>
                    <div className="flex justify-between items-center text-caption text-text-secondary">
                      <span>From: {offer.assignedBy}</span>
                      <span>{offer.createdAt}</span>
                    </div>
                    {offer.hasAttachments && (
                      <div className="mt-sm flex items-center gap-xs text-caption text-primary-main">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M12 7.5v3a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 2 10.5v-7A1.5 1.5 0 0 1 3.5 2h3M9 2h3v3M6 8l5.5-5.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Has attachments
                      </div>
                    )}
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
