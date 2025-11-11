import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { colors, typography, spacing, shadows, borderRadius, components } from '../../lib/designTokens'

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
          margin: `0 0 ${spacing.sm} 0`,
          lineHeight: typography.lineHeight.normal,
        }}>
          {offer.description}
        </p>
        <div style={{
          fontSize: typography.fontSize.caption,
          color: colors.text.tertiary,
        }}>
          Created on {offer.createdAt}
        </div>
      </div>

      <div style={{ padding: `0 ${spacing.lg}` }}>
        <div style={{
          ...components.card,
          marginBottom: spacing.lg,
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: spacing.lg,
          }}>
            <h3 style={{
              fontSize: typography.fontSize.h3,
              fontWeight: typography.fontWeight.semibold,
              color: colors.text.primary,
              margin: 0,
            }}>
              Assigned Providers ({assignedProviders.length})
            </h3>
            {!showProviderSelector && (
              <button
                onClick={() => setShowProviderSelector(true)}
                style={{
                  padding: `${spacing.sm} ${spacing.lg}`,
                  background: colors.primary.main,
                  color: colors.text.inverse,
                  border: 'none',
                  borderRadius: borderRadius.sm,
                  fontSize: typography.fontSize.body,
                  fontWeight: typography.fontWeight.semibold,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: spacing.xs,
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                Add
              </button>
            )}
          </div>

          {showProviderSelector && (
            <div style={{
              background: colors.primary.light,
              padding: spacing.lg,
              borderRadius: borderRadius.md,
              marginBottom: spacing.lg,
            }}>
              <h4 style={{
                fontSize: typography.fontSize.body,
                fontWeight: typography.fontWeight.semibold,
                color: colors.text.primary,
                margin: `0 0 ${spacing.md} 0`,
              }}>
                Select Providers
              </h4>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: spacing.sm,
                marginBottom: spacing.lg,
              }}>
                {availableProviders.map((provider) => (
                  <label
                    key={provider.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: spacing.md,
                      cursor: 'pointer',
                      padding: spacing.md,
                      background: colors.base.surface,
                      borderRadius: borderRadius.sm,
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={selectedProviderIds.includes(provider.id)}
                      onChange={() => handleToggleProvider(provider.id)}
                      style={{ cursor: 'pointer' }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontSize: typography.fontSize.body,
                        fontWeight: typography.fontWeight.medium,
                        color: colors.text.primary,
                      }}>
                        {provider.name}
                      </div>
                      <div style={{
                        fontSize: typography.fontSize.caption,
                        color: colors.text.secondary,
                      }}>
                        {provider.email}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
              <div style={{ display: 'flex', gap: spacing.md }}>
                <button
                  onClick={handleAddProviders}
                  disabled={selectedProviderIds.length === 0}
                  style={{
                    flex: 1,
                    ...components.button.primary,
                    cursor: selectedProviderIds.length === 0 ? 'not-allowed' : 'pointer',
                    opacity: selectedProviderIds.length === 0 ? 0.5 : 1,
                  }}
                >
                  Add Selected
                </button>
                <button
                  onClick={() => {
                    setShowProviderSelector(false)
                    setSelectedProviderIds([])
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
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.md }}>
            {assignedProviders.map((provider) => (
              <div
                key={provider.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: spacing.md,
                  padding: spacing.lg,
                  background: colors.base.background,
                  borderRadius: borderRadius.sm,
                }}
              >
                {/* User Icon - Duotone */}
                <div style={{ flexShrink: 0 }}>
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <circle cx="20" cy="15" r="6" fill={colors.primary.light} opacity="0.3" />
                    <circle cx="20" cy="15" r="6" stroke={colors.primary.main} strokeWidth="1.5" fill="none" />
                    <path d="M10 32c0-5.523 4.477-10 10-10s10 4.477 10 10" stroke={colors.primary.main} strokeWidth="1.5" strokeLinecap="round" fill="none" />
                    <circle cx="32" cy="10" r="1.5" fill={colors.primary.main} />
                  </svg>
                </div>

                {/* Provider Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontSize: typography.fontSize.body,
                    fontWeight: typography.fontWeight.semibold,
                    color: colors.text.primary,
                    marginBottom: spacing.xs,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}>
                    {provider.name}
                  </div>
                  <div style={{
                    fontSize: typography.fontSize.caption,
                    color: colors.text.secondary,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}>
                    {provider.email}
                  </div>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => handleRemoveProvider(provider.id)}
                  style={{
                    flexShrink: 0,
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'transparent',
                    border: 'none',
                    color: colors.text.tertiary,
                    cursor: 'pointer',
                    borderRadius: borderRadius.sm,
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>

        <div style={{
          ...components.card,
          marginBottom: spacing.lg,
        }}>
          <h3 style={{
            fontSize: typography.fontSize.h3,
            fontWeight: typography.fontWeight.semibold,
            color: colors.text.primary,
            margin: `0 0 ${spacing.lg} 0`,
          }}>
            Attachments ({attachments.length})
          </h3>

          <label style={{
            display: 'block',
            width: '82%',
            padding: spacing.xl,
            background: colors.primary.light,
            border: `2px dashed ${colors.primary.main}`,
            borderRadius: borderRadius.md,
            textAlign: 'center',
            cursor: 'pointer',
            marginBottom: spacing.lg,
          }}>
            <input
              type="file"
              multiple
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />

            {/* Upload Icon - Duotone */}
            <div style={{ marginBottom: spacing.md }}>
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" style={{ margin: '0 auto', display: 'block' }}>
                <rect x="12" y="16" width="24" height="20" rx="2" fill={colors.primary.main} opacity="0.2" />
                <path d="M24 10v18M18 16l6-6 6 6" stroke={colors.primary.main} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14 30h20a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H14a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2z" stroke={colors.primary.main} strokeWidth="2" fill="none" />
                <circle cx="38" cy="12" r="2" fill={colors.primary.main} />
                <circle cx="10" cy="14" r="1.5" fill={colors.primary.light} />
              </svg>
            </div>

            <div style={{
              fontSize: typography.fontSize.body,
              fontWeight: typography.fontWeight.semibold,
              color: colors.primary.main,
              marginBottom: spacing.xs,
            }}>
              Upload Files
            </div>
            <div style={{
              fontSize: typography.fontSize.caption,
              color: colors.text.secondary,
            }}>
              Click to browse files
            </div>
          </label>

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
                }}
              >
                {/* File Icon - Duotone */}
                <div style={{ flexShrink: 0 }}>
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <rect x="8" y="5" width="24" height="30" rx="3" fill={colors.primary.light} opacity="0.3" />
                    <path d="M12 5h16a4 4 0 0 1 4 4v22a4 4 0 0 1-4 4H12a4 4 0 0 1-4-4V9a4 4 0 0 1 4-4z" stroke={colors.primary.main} strokeWidth="1.5" fill="none" />
                    <path d="M14 15h12M14 20h12M14 25h8" stroke={colors.primary.main} strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>

                {/* File Info */}
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

                {/* Remove Button */}
                <button
                  onClick={() => setAttachments(attachments.filter(a => a.id !== file.id))}
                  style={{
                    flexShrink: 0,
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'transparent',
                    border: 'none',
                    color: colors.text.tertiary,
                    cursor: 'pointer',
                    borderRadius: borderRadius.sm,
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>

        <div style={{
          ...components.card,
          marginBottom: spacing.lg,
        }}>
          <h3 style={{
            fontSize: typography.fontSize.h3,
            fontWeight: typography.fontWeight.semibold,
            color: colors.text.primary,
            margin: `0 0 ${spacing.lg} 0`,
          }}>
            Proposals ({proposals.length})
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.md }}>
            {proposals.map((proposal) => {
              const statusStyle = getStatusStyle(proposal.status)
              return (
                <Link
                  key={proposal.id}
                  to={`/proposals/${proposal.id}`}
                  style={{
                    textDecoration: 'none',
                    display: 'block',
                    padding: spacing.lg,
                    background: colors.base.background,
                    borderRadius: borderRadius.md,
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.boxShadow = shadows.md
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: spacing.sm,
                  }}>
                    <div style={{ flex: 1 }}>
                      <h4 style={{
                        fontSize: typography.fontSize.h3,
                        fontWeight: typography.fontWeight.semibold,
                        color: colors.text.primary,
                        margin: `0 0 ${spacing.xs} 0`,
                      }}>
                        {proposal.freelancerName}
                      </h4>
                      <div style={{
                        fontSize: typography.fontSize.caption,
                        color: colors.text.secondary,
                        marginBottom: spacing.sm,
                      }}>
                        {proposal.freelancerEmail}
                      </div>
                    </div>
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
                      {proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1)}
                    </span>
                  </div>

                  <div style={{
                    display: 'flex',
                    gap: spacing.lg,
                    marginBottom: spacing.md,
                    flexWrap: 'wrap',
                  }}>
                    <div>
                      <span style={{
                        fontSize: typography.fontSize.h3,
                        fontWeight: typography.fontWeight.semibold,
                        color: colors.primary.main,
                      }}>
                        ${proposal.price}
                      </span>
                    </div>
                    <div style={{
                      fontSize: typography.fontSize.body,
                      color: colors.text.secondary,
                    }}>
                      ⏱️ {proposal.deliveryTime}
                    </div>
                    <div style={{
                      fontSize: typography.fontSize.caption,
                      color: colors.text.tertiary,
                    }}>
                      {proposal.submittedAt}
                    </div>
                  </div>

                  <p style={{
                    fontSize: typography.fontSize.body,
                    color: colors.text.secondary,
                    margin: 0,
                    lineHeight: typography.lineHeight.normal,
                  }}>
                    {proposal.description}
                  </p>

                  {proposal.status === 'pending' && (
                    <div style={{
                      display: 'flex',
                      gap: spacing.md,
                      marginTop: spacing.lg,
                      paddingTop: spacing.lg,
                      borderTop: `1px solid ${colors.base.border}`,
                    }}>
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          setProposals(proposals.map(p =>
                            p.id === proposal.id ? { ...p, status: 'accepted' } : p
                          ))
                        }}
                        style={{
                          flex: 1,
                          padding: `${spacing.md} ${spacing.lg}`,
                          background: colors.state.approved.bg,
                          color: colors.state.approved.text,
                          border: 'none',
                          borderRadius: borderRadius.sm,
                          fontSize: typography.fontSize.body,
                          fontWeight: typography.fontWeight.semibold,
                          cursor: 'pointer',
                        }}
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
                        style={{
                          flex: 1,
                          padding: `${spacing.md} ${spacing.lg}`,
                          background: colors.base.surface,
                          color: colors.state.dispute.text,
                          border: `1px solid ${colors.state.dispute.text}`,
                          borderRadius: borderRadius.sm,
                          fontSize: typography.fontSize.body,
                          fontWeight: typography.fontWeight.semibold,
                          cursor: 'pointer',
                        }}
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
