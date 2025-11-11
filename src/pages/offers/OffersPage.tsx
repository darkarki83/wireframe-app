import { useState } from 'react'
import { Link } from 'react-router-dom'
import { colors, typography, spacing, shadows, borderRadius, components } from '../../lib/designTokens'

type Offer = {
  id: string
  title: string
  description: string
  status: 'active' | 'pending' | 'accepted' | 'rejected'
  createdAt: string
  assignedBy?: string
  hasAttachments?: boolean
}

export default function OffersPage() {
  const [activeTab, setActiveTab] = useState<'my' | 'incoming'>('my')
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [myOffers, setMyOffers] = useState<Offer[]>([
    {
      id: '1',
      title: 'Website Development Proposal',
      description: 'Full-stack development for e-commerce platform with React and Node.js',
      status: 'active',
      createdAt: '2025-11-08'
    },
    {
      id: '2',
      title: 'Mobile App Design',
      description: 'UI/UX design for iOS and Android mobile application',
      status: 'pending',
      createdAt: '2025-11-07'
    }
  ])
  const [incomingOffers] = useState<Offer[]>([
    {
      id: '3',
      title: 'Mobile App Development Project',
      description: 'Looking for an experienced React Native developer',
      status: 'pending',
      createdAt: '2025-11-09',
      assignedBy: 'John Smith',
      hasAttachments: true
    }
  ])

  const handleCreateOffer = () => {
    if (!title.trim() || !description.trim()) return
    const newOffer: Offer = {
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

  const getStatusStyle = (status: string) => {
    const statusMap: Record<string, { bg: string; text: string }> = {
      active: colors.state.active,
      pending: colors.state.pending,
      accepted: colors.state.approved,
      rejected: colors.state.dispute,
    }
    return statusMap[status] || colors.state.draft
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: colors.base.background,
      paddingBottom: '80px',
    }}>
      <div style={{
        padding: `${spacing.xl} ${spacing.lg}`,
      }}>
        <h1 style={{
          fontSize: typography.fontSize.h1,
          fontWeight: typography.fontWeight.semibold,
          color: colors.text.primary,
          margin: 0,
        }}>
          Offers
        </h1>
      </div>

      <div style={{
        padding: `0 ${spacing.lg}`,
        marginBottom: spacing.xl,
      }}>
        <div style={{
          display: 'flex',
          gap: spacing.xs,
          background: colors.base.surface,
          padding: spacing.xs,
          borderRadius: borderRadius.md,
          boxShadow: shadows.sm,
        }}>
          <button
            onClick={() => setActiveTab('my')}
            style={{
              flex: 1,
              padding: `${spacing.md} ${spacing.lg}`,
              background: activeTab === 'my' ? colors.primary.main : 'transparent',
              color: activeTab === 'my' ? colors.text.inverse : colors.text.secondary,
              border: 'none',
              borderRadius: borderRadius.sm,
              fontSize: typography.fontSize.body,
              fontWeight: typography.fontWeight.semibold,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            My Offers
          </button>
          <button
            onClick={() => setActiveTab('incoming')}
            style={{
              flex: 1,
              padding: `${spacing.md} ${spacing.lg}`,
              background: activeTab === 'incoming' ? colors.primary.main : 'transparent',
              color: activeTab === 'incoming' ? colors.text.inverse : colors.text.secondary,
              border: 'none',
              borderRadius: borderRadius.sm,
              fontSize: typography.fontSize.body,
              fontWeight: typography.fontWeight.semibold,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            Incoming Offers
          </button>
        </div>
      </div>

      <div style={{ padding: `0 ${spacing.lg}` }}>
        {activeTab === 'my' ? (
          <div>
            {showCreateForm ? (
              <div style={{
                ...components.card,
                marginBottom: spacing.xl,
              }}>
                <h3 style={{
                  margin: `0 0 ${spacing.lg} 0`,
                  fontSize: typography.fontSize.h3,
                  fontWeight: typography.fontWeight.semibold,
                  color: colors.text.primary,
                }}>
                  Create New Offer
                </h3>

                <div style={{ marginBottom: spacing.lg }}>
                  <label style={{
                    display: 'block',
                    marginBottom: spacing.sm,
                    fontSize: typography.fontSize.caption,
                    fontWeight: typography.fontWeight.medium,
                    color: colors.text.primary,
                  }}>
                    Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter offer title"
                    style={{
                      width: '100%',
                      padding: `${spacing.md} ${spacing.lg}`,
                      border: `1px solid ${colors.base.border}`,
                      borderRadius: borderRadius.sm,
                      fontSize: typography.fontSize.body,
                      boxSizing: 'border-box',
                      fontFamily: typography.fontFamily.base,
                    }}
                  />
                </div>

                <div style={{ marginBottom: spacing.xl }}>
                  <label style={{
                    display: 'block',
                    marginBottom: spacing.sm,
                    fontSize: typography.fontSize.caption,
                    fontWeight: typography.fontWeight.medium,
                    color: colors.text.primary,
                  }}>
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe your offer..."
                    rows={4}
                    style={{
                      width: '100%',
                      padding: `${spacing.md} ${spacing.lg}`,
                      border: `1px solid ${colors.base.border}`,
                      borderRadius: borderRadius.sm,
                      fontSize: typography.fontSize.body,
                      boxSizing: 'border-box',
                      fontFamily: typography.fontFamily.base,
                      resize: 'vertical',
                    }}
                  />
                </div>

                <div style={{ display: 'flex', gap: spacing.md }}>
                  <button
                    onClick={handleCreateOffer}
                    style={{
                      flex: 1,
                      ...components.button.primary,
                      cursor: 'pointer',
                    }}
                  >
                    Create
                  </button>
                  <button
                    onClick={() => {
                      setShowCreateForm(false)
                      setTitle('')
                      setDescription('')
                    }}
                    style={{
                      flex: 1,
                      ...components.button.secondary,
                      cursor: 'pointer',
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowCreateForm(true)}
                style={{
                  width: '100%',
                  ...components.button.primary,
                  marginBottom: spacing.xl,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: spacing.sm,
                }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                Create Offer
              </button>
            )}

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: spacing.md,
            }}>
              {myOffers.map((offer) => {
                const statusStyle = getStatusStyle(offer.status)
                return (
                  <Link
                    key={offer.id}
                    to={`/offers/${offer.id}`}
                    style={{
                      ...components.card,
                      textDecoration: 'none',
                      display: 'block',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)'
                      e.currentTarget.style.boxShadow = shadows.md
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = shadows.base
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: spacing.sm,
                    }}>
                      <h3 style={{
                        fontSize: typography.fontSize.h3,
                        fontWeight: typography.fontWeight.semibold,
                        color: colors.text.primary,
                        margin: 0,
                        flex: 1,
                      }}>
                        {offer.title}
                      </h3>
                      <span style={{
                        fontSize: typography.fontSize.caption,
                        fontWeight: typography.fontWeight.medium,
                        color: statusStyle.text,
                        background: statusStyle.bg,
                        padding: `4px ${spacing.sm}`,
                        borderRadius: borderRadius.sm,
                        whiteSpace: 'nowrap',
                        marginLeft: spacing.sm,
                      }}>
                        {offer.status.charAt(0).toUpperCase() + offer.status.slice(1)}
                      </span>
                    </div>
                    <p style={{
                      fontSize: typography.fontSize.body,
                      color: colors.text.secondary,
                      margin: `0 0 ${spacing.md} 0`,
                      lineHeight: typography.lineHeight.normal,
                    }}>
                      {offer.description}
                    </p>
                    <div style={{
                      fontSize: typography.fontSize.caption,
                      color: colors.text.tertiary,
                    }}>
                      Created: {offer.createdAt}
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        ) : (
          <div>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: spacing.md,
            }}>
              {incomingOffers.map((offer) => {
                const statusStyle = getStatusStyle(offer.status)
                return (
                  <Link
                    key={offer.id}
                    to={`/incoming-offers/${offer.id}`}
                    style={{
                      ...components.card,
                      textDecoration: 'none',
                      display: 'block',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)'
                      e.currentTarget.style.boxShadow = shadows.md
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = shadows.base
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: spacing.sm,
                    }}>
                      <h3 style={{
                        fontSize: typography.fontSize.h3,
                        fontWeight: typography.fontWeight.semibold,
                        color: colors.text.primary,
                        margin: 0,
                        flex: 1,
                      }}>
                        {offer.title}
                      </h3>
                      <span style={{
                        fontSize: typography.fontSize.caption,
                        fontWeight: typography.fontWeight.medium,
                        color: statusStyle.text,
                        background: statusStyle.bg,
                        padding: `4px ${spacing.sm}`,
                        borderRadius: borderRadius.sm,
                        whiteSpace: 'nowrap',
                        marginLeft: spacing.sm,
                      }}>
                        {offer.status.charAt(0).toUpperCase() + offer.status.slice(1)}
                      </span>
                    </div>
                    <p style={{
                      fontSize: typography.fontSize.body,
                      color: colors.text.secondary,
                      margin: `0 0 ${spacing.md} 0`,
                      lineHeight: typography.lineHeight.normal,
                    }}>
                      {offer.description}
                    </p>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: typography.fontSize.caption,
                      color: colors.text.tertiary,
                    }}>
                      <span>From: {offer.assignedBy}</span>
                      <span>{offer.createdAt}</span>
                    </div>
                    {offer.hasAttachments && (
                      <div style={{
                        marginTop: spacing.sm,
                        display: 'flex',
                        alignItems: 'center',
                        gap: spacing.xs,
                        fontSize: typography.fontSize.caption,
                        color: colors.primary.main,
                      }}>
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
