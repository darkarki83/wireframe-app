import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { colors, typography, spacing, shadows, borderRadius, components } from '../../lib/designTokens'

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

  const getStatusStyle = (status: string) => {
    const statusMap: Record<string, { bg: string; text: string }> = {
      active: colors.state.active,
      closed: colors.state.draft,
    }
    return statusMap[status] || colors.state.draft
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: colors.base.background,
      paddingBottom: '80px',
    }}>
      <div style={{ padding: `${spacing.xl} ${spacing.lg}` }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            background: 'transparent',
            border: 'none',
            color: colors.primary.main,
            fontSize: typography.fontSize.body,
            fontWeight: typography.fontWeight.semibold,
            cursor: 'pointer',
            padding: 0,
            marginBottom: spacing.lg,
            display: 'flex',
            alignItems: 'center',
            gap: spacing.xs,
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12 15l-5-5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back
        </button>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: spacing.md,
          gap: spacing.md,
        }}>
          <h1 style={{
            fontSize: typography.fontSize.h1,
            fontWeight: typography.fontWeight.semibold,
            color: colors.text.primary,
            margin: 0,
            flex: 1,
          }}>
            {offer.title}
          </h1>
          <span style={{
            ...(() => {
              const statusStyle = getStatusStyle(offer.status)
              return {
                fontSize: typography.fontSize.caption,
                fontWeight: typography.fontWeight.medium,
                color: statusStyle.text,
                background: statusStyle.bg,
                padding: `6px ${spacing.md}`,
                borderRadius: borderRadius.lg,
                whiteSpace: 'nowrap',
              }
            })()
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
          alignItems: 'center',
          gap: spacing.md,
          marginBottom: spacing.sm,
        }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="6" r="3" stroke={colors.primary.main} strokeWidth="1.5" fill="none" />
            <path d="M3 14c0-2.761 2.239-5 5-5s5 2.239 5 5" stroke={colors.primary.main} strokeWidth="1.5" strokeLinecap="round" fill="none" />
          </svg>
          <div>
            <span style={{
              fontSize: typography.fontSize.body,
              fontWeight: typography.fontWeight.semibold,
              color: colors.text.primary,
            }}>
              {offer.clientName}
            </span>
            <span style={{
              fontSize: typography.fontSize.body,
              color: colors.text.secondary,
              marginLeft: spacing.xs,
            }}>
              • {offer.clientCompany}
            </span>
          </div>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: spacing.md,
          marginBottom: spacing.sm,
        }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="3" y="4" width="10" height="9" rx="1" stroke={colors.primary.main} strokeWidth="1.5" fill="none" />
            <path d="M3 7l5 3 5-3" stroke={colors.primary.main} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{
            fontSize: typography.fontSize.body,
            color: colors.text.secondary,
          }}>
            {offer.clientEmail}
          </span>
        </div>

        <div style={{
          fontSize: typography.fontSize.caption,
          color: colors.text.secondary,
          marginBottom: spacing.md,
        }}>
          Posted on {offer.postedAt}
        </div>

        <div style={{
          ...components.card,
          background: colors.primary.light,
          padding: spacing.lg,
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: spacing.md,
          }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 18a8 8 0 100-16 8 8 0 000 16z" stroke={colors.primary.main} strokeWidth="1.5" fill="none" />
              <path d="M10 6v4l2 2" stroke={colors.primary.main} strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <div>
              <div style={{
                fontSize: typography.fontSize.caption,
                color: colors.text.secondary,
                marginBottom: spacing.xs,
              }}>
                Assigned by
              </div>
              <div style={{
                fontSize: typography.fontSize.body,
                fontWeight: typography.fontWeight.semibold,
                color: colors.text.primary,
              }}>
                {offer.assignedBy.name} • {offer.assignedBy.assignedAt}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: `0 ${spacing.lg}` }}>
        <div style={{
          ...components.card,
          marginBottom: spacing.lg,
        }}>
          <h3 style={{
            fontSize: typography.fontSize.h2,
            fontWeight: typography.fontWeight.semibold,
            color: colors.text.primary,
            margin: `0 0 ${spacing.lg} 0`,
          }}>
            Attachments ({attachments.length})
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.sm }}>
            {attachments.map((file) => (
              <div
                key={file.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: spacing.md,
                  padding: spacing.lg,
                  background: colors.base.background,
                  borderRadius: borderRadius.sm,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = shadows.sm
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <div style={{ flexShrink: 0 }}>
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <rect x="8" y="5" width="24" height="30" rx="3" fill={colors.primary.light} opacity="0.3" />
                    <path d="M12 5h16a4 4 0 0 1 4 4v22a4 4 0 0 1-4 4H12a4 4 0 0 1-4-4V9a4 4 0 0 1 4-4z" stroke={colors.primary.main} strokeWidth="1.5" fill="none" />
                    <path d="M14 15h12M14 20h12M14 25h8" stroke={colors.primary.main} strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontSize: typography.fontSize.body,
                    fontWeight: typography.fontWeight.medium,
                    color: colors.text.primary,
                    marginBottom: spacing.xs,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}>
                    {file.name}
                  </div>
                  <div style={{
                    fontSize: typography.fontSize.caption,
                    color: colors.text.secondary,
                  }}>
                    {file.size} • {file.uploadedAt}
                  </div>
                </div>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 3v10M15 8l-5 5-5-5" stroke={colors.primary.main} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            ))}
          </div>
        </div>

        {!showProposalChat ? (
          <button
            onClick={handleCreateProposal}
            style={{
              width: '100%',
              ...components.button.primary,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: spacing.sm,
              cursor: 'pointer',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 3v14M3 10h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            Create Proposal
          </button>
        ) : (
          <div style={{
            ...components.card,
            marginBottom: spacing.lg,
          }}>
            <h3 style={{
              fontSize: typography.fontSize.h2,
              fontWeight: typography.fontWeight.semibold,
              color: colors.text.primary,
              margin: `0 0 ${spacing.lg} 0`,
            }}>
              Proposal Details
            </h3>

            <div style={{ marginBottom: spacing.lg }}>
              <label style={{
                display: 'block',
                marginBottom: spacing.sm,
                fontSize: typography.fontSize.caption,
                fontWeight: typography.fontWeight.medium,
                color: colors.text.primary,
              }}>
                Budget Range
              </label>
              <div style={{ display: 'flex', gap: spacing.md }}>
                <input
                  type="text"
                  value={proposalDetails.budgetMin}
                  onChange={(e) => setProposalDetails({ ...proposalDetails, budgetMin: e.target.value })}
                  placeholder="Min ($)"
                  style={{
                    flex: 1,
                    padding: `${spacing.md} ${spacing.lg}`,
                    border: `1px solid ${colors.base.border}`,
                    borderRadius: borderRadius.sm,
                    fontSize: typography.fontSize.body,
                    boxSizing: 'border-box',
                    fontFamily: typography.fontFamily.base,
                  }}
                />
                <input
                  type="text"
                  value={proposalDetails.budgetMax}
                  onChange={(e) => setProposalDetails({ ...proposalDetails, budgetMax: e.target.value })}
                  placeholder="Max ($)"
                  style={{
                    flex: 1,
                    padding: `${spacing.md} ${spacing.lg}`,
                    border: `1px solid ${colors.base.border}`,
                    borderRadius: borderRadius.sm,
                    fontSize: typography.fontSize.body,
                    boxSizing: 'border-box',
                    fontFamily: typography.fontFamily.base,
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: spacing.lg }}>
              <label style={{
                display: 'block',
                marginBottom: spacing.sm,
                fontSize: typography.fontSize.caption,
                fontWeight: typography.fontWeight.medium,
                color: colors.text.primary,
              }}>
                Duration
              </label>
              <input
                type="text"
                value={proposalDetails.duration}
                onChange={(e) => setProposalDetails({ ...proposalDetails, duration: e.target.value })}
                placeholder="e.g., 2 months"
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
                Deliverables
              </label>
              <textarea
                value={proposalDetails.deliverables}
                onChange={(e) => setProposalDetails({ ...proposalDetails, deliverables: e.target.value })}
                placeholder="Describe what you will deliver..."
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

            <h3 style={{
              fontSize: typography.fontSize.h2,
              fontWeight: typography.fontWeight.semibold,
              color: colors.text.primary,
              margin: `${spacing.xl} 0 ${spacing.lg} 0`,
            }}>
              Chat with Client
            </h3>

            <div style={{
              background: colors.base.background,
              borderRadius: borderRadius.md,
              marginBottom: spacing.lg,
              maxHeight: '300px',
              minHeight: '200px',
              overflowY: 'auto',
            }}>
              <div style={{
                padding: spacing.lg,
                display: 'flex',
                flexDirection: 'column',
                gap: spacing.md,
              }}>
                {messages.map((message) => (
                  <div
                    key={message.id}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: message.senderId === 'system' ? 'center' : message.isOwn ? 'flex-end' : 'flex-start'
                    }}
                  >
                    {message.senderId === 'system' ? (
                      <div style={{
                        background: colors.base.surface,
                        color: colors.text.secondary,
                        padding: `${spacing.sm} ${spacing.md}`,
                        borderRadius: borderRadius.md,
                        fontSize: typography.fontSize.caption,
                        fontStyle: 'italic',
                        textAlign: 'center',
                      }}>
                        {message.text}
                      </div>
                    ) : (
                      <>
                        <div style={{
                          maxWidth: '85%',
                          background: message.isOwn ? colors.primary.main : colors.base.surface,
                          color: message.isOwn ? colors.text.inverse : colors.text.primary,
                          padding: spacing.md,
                          borderRadius: borderRadius.md,
                          borderTopRightRadius: message.isOwn ? '4px' : borderRadius.md,
                          borderTopLeftRadius: message.isOwn ? borderRadius.md : '4px',
                          wordWrap: 'break-word',
                          overflowWrap: 'break-word',
                        }}>
                          <div style={{
                            fontSize: typography.fontSize.caption,
                            fontWeight: typography.fontWeight.semibold,
                            marginBottom: spacing.xs,
                            opacity: 0.8
                          }}>
                            {message.senderName}
                          </div>
                          <div style={{
                            fontSize: typography.fontSize.body,
                            lineHeight: typography.lineHeight.normal,
                            wordWrap: 'break-word',
                            overflowWrap: 'break-word',
                          }}>
                            {message.text}
                          </div>
                        </div>
                        <div style={{
                          fontSize: typography.fontSize.caption,
                          color: colors.text.secondary,
                          marginTop: spacing.xs,
                        }}>
                          {message.timestamp}
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: spacing.sm, marginBottom: spacing.lg, alignItems: 'stretch' }}>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessage()
                  }
                }}
                placeholder="Type your message..."
                style={{
                  flex: 1,
                  minWidth: 0,
                  padding: `${spacing.md} ${spacing.lg}`,
                  border: `1px solid ${colors.base.border}`,
                  borderRadius: borderRadius.sm,
                  fontSize: typography.fontSize.body,
                  boxSizing: 'border-box',
                  fontFamily: typography.fontFamily.base,
                }}
              />
              <button
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                style={{
                  flexShrink: 0,
                  padding: `${spacing.md} ${spacing.lg}`,
                  background: newMessage.trim() ? colors.primary.main : colors.base.border,
                  color: colors.text.inverse,
                  border: 'none',
                  borderRadius: borderRadius.sm,
                  fontSize: typography.fontSize.body,
                  fontWeight: typography.fontWeight.semibold,
                  cursor: newMessage.trim() ? 'pointer' : 'not-allowed',
                  whiteSpace: 'nowrap'
                }}
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
              style={{
                width: '100%',
                ...components.button.primary,
                cursor: 'pointer',
              }}
            >
              Submit Proposal
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
