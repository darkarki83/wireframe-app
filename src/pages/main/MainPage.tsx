import React from 'react'
import { useNavigate } from 'react-router-dom'
import { colors, typography, spacing, shadows, borderRadius, components } from '../../lib/designTokens'

const MainPage: React.FC = () => {
  const navigate = useNavigate()

  // Mock data for active contracts
  const activeContracts = [
    { id: 1, title: 'Website Redesign', provider: 'Design Studio Inc.', status: 'active', amount: '$2,500', dueDate: 'Feb 15, 2024' },
    { id: 2, title: 'Mobile App Development', provider: 'Tech Solutions LLC', status: 'pending', amount: '$5,000', dueDate: 'Mar 1, 2024' },
  ]

  const getStatusStyle = (status: string) => {
    const statusMap: Record<string, { bg: string; text: string }> = {
      active: colors.state.active,
      pending: colors.state.pending,
      completed: colors.state.completed,
    }
    return statusMap[status.toLowerCase()] || colors.state.draft
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: colors.base.background,
      paddingBottom: '80px',
    }}>
      {/* Welcome Header */}
      <div style={{
        padding: `${spacing.xl} ${spacing.lg}`,
      }}>
        <h1 style={{
          fontSize: typography.fontSize.h1,
          fontWeight: typography.fontWeight.semibold,
          color: colors.text.primary,
          margin: 0,
        }}>
          Welcome, Artiom!
        </h1>
      </div>

      {/* Hero Banner Card - "Finish your profile" style */}
      <div style={{
        padding: `0 ${spacing.lg} ${spacing.xl}`,
      }}>
        <div style={{
          ...components.hero,
          display: 'flex',
          alignItems: 'center',
          gap: spacing.lg,
          background: colors.base.surface,
        }}>
          {/* Left side - Content */}
          <div style={{ flex: 1 }}>
            <h2 style={{
              fontSize: typography.fontSize.h2,
              fontWeight: typography.fontWeight.semibold,
              color: colors.text.primary,
              margin: 0,
              marginBottom: spacing.sm,
            }}>
              Complete your profile
            </h2>
            
            {/* Progress bar */}
            <div style={{
              background: colors.primary.light,
              height: '6px',
              borderRadius: '3px',
              marginBottom: spacing.md,
              overflow: 'hidden',
            }}>
              <div style={{
                background: colors.primary.main,
                height: '100%',
                width: '60%',
                borderRadius: '3px',
              }} />
            </div>

            <p style={{
              fontSize: typography.fontSize.caption,
              color: colors.text.secondary,
              margin: 0,
              marginBottom: spacing.lg,
            }}>
              2 steps to finish
            </p>

            <button
              onClick={() => navigate('/user/edit')}
              style={{
                ...components.button.primary,
                padding: `0 ${spacing.xl}`,
                cursor: 'pointer',
                border: 'none',
                fontSize: typography.fontSize.body,
                fontWeight: typography.fontWeight.semibold,
              }}
            >
              Continue
            </button>
          </div>

          {/* Right side - Illustration (duotone style) */}
          <div style={{
            width: '100px',
            height: '100px',
            flexShrink: 0,
          }}>
            <svg viewBox="0 0 100 100" fill="none">
              {/* Duotone illustration - simplified user/profile icon */}
              <circle cx="50" cy="35" r="15" fill={colors.primary.light} />
              <path d="M30 70 C30 60, 35 55, 50 55 C65 55, 70 60, 70 70 L70 75 L30 75 Z" fill={colors.primary.main} opacity="0.3" />
              <circle cx="50" cy="35" r="12" stroke={colors.primary.main} strokeWidth="2" fill="none" />
              <path d="M32 72 C32 62, 37 58, 50 58 C63 58, 68 62, 68 72" stroke={colors.primary.main} strokeWidth="2" strokeLinecap="round" fill="none" />
              {/* Sparkles */}
              <circle cx="75" cy="25" r="2" fill={colors.primary.main} />
              <circle cx="82" cy="35" r="1.5" fill={colors.primary.light} />
              <circle cx="25" cy="30" r="1.5" fill={colors.primary.main} />
            </svg>
          </div>
        </div>
      </div>

      {/* Quick Actions - 3 tiles like "Your products" */}
      <div style={{
        padding: `0 ${spacing.lg} ${spacing.xl}`,
      }}>
        <h2 style={{
          fontSize: typography.fontSize.h2,
          fontWeight: typography.fontWeight.semibold,
          color: colors.text.primary,
          margin: 0,
          marginBottom: spacing.lg,
        }}>
          Quick actions
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: spacing.md,
        }}>
          {/* Offers Card */}
          <button
            onClick={() => navigate('/offers')}
            style={{
              ...components.card,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: spacing.sm,
              cursor: 'pointer',
              border: 'none',
              padding: spacing.lg,
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
              width: '56px',
              height: '56px',
              position: 'relative',
            }}>
              <svg viewBox="0 0 56 56" fill="none">
                {/* Duotone Offers icon - Dollar coin with sparkles */}
                <circle cx="28" cy="28" r="16" fill={colors.primary.light} />
                <circle cx="28" cy="28" r="13" stroke={colors.primary.main} strokeWidth="2" fill="none" />
                <path d="M28 20v16M31 23h-4a2.5 2.5 0 0 0 0 5h2a2.5 2.5 0 0 1 0 5h-4" stroke={colors.primary.main} strokeWidth="2" strokeLinecap="round" />
                {/* Sparkles */}
                <circle cx="42" cy="18" r="1.5" fill={colors.primary.main} />
                <circle cx="48" cy="24" r="1" fill={colors.primary.light} />
                <circle cx="14" cy="20" r="1" fill={colors.primary.main} />
                <circle cx="12" cy="36" r="1.5" fill={colors.primary.light} />
              </svg>
            </div>
            <span style={{
              fontSize: typography.fontSize.caption,
              fontWeight: typography.fontWeight.medium,
              color: colors.text.primary,
              textAlign: 'center',
            }}>
              Offers
            </span>
          </button>

          {/* Contracts Card */}
          <button
            onClick={() => navigate('/contracts')}
            style={{
              ...components.card,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: spacing.sm,
              cursor: 'pointer',
              border: 'none',
              padding: spacing.lg,
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
              width: '56px',
              height: '56px',
              position: 'relative',
            }}>
              <svg viewBox="0 0 56 56" fill="none">
                {/* Duotone Contracts icon - Document with checkmark */}
                <rect x="18" y="12" width="20" height="28" rx="2" fill={colors.primary.light} />
                <path d="M18 12h12l8 8v20a2 2 0 0 1-2 2H18a2 2 0 0 1-2-2V14a2 2 0 0 1 2-2z" stroke={colors.primary.main} strokeWidth="2" fill="none" />
                <path d="M30 12v8h8" stroke={colors.primary.main} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <path d="M24 28h8M24 32h8M24 36h5" stroke={colors.primary.main} strokeWidth="1.5" strokeLinecap="round" />
                {/* Sparkles */}
                <circle cx="42" cy="16" r="1.5" fill={colors.primary.main} />
                <circle cx="14" cy="22" r="1" fill={colors.primary.light} />
                <circle cx="40" cy="38" r="1" fill={colors.primary.main} />
              </svg>
            </div>
            <span style={{
              fontSize: typography.fontSize.caption,
              fontWeight: typography.fontWeight.medium,
              color: colors.text.primary,
              textAlign: 'center',
            }}>
              Contracts
            </span>
          </button>

          {/* Messages Card */}
          <button
            onClick={() => navigate('/chats')}
            style={{
              ...components.card,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: spacing.sm,
              cursor: 'pointer',
              border: 'none',
              padding: spacing.lg,
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
              width: '56px',
              height: '56px',
              position: 'relative',
            }}>
              <svg viewBox="0 0 56 56" fill="none">
                {/* Duotone Messages icon - Chat bubble with dots */}
                <path d="M14 18a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4h-9l-6 6v-6h-5a4 4 0 0 1-4-4V18z" fill={colors.primary.light} />
                <path d="M14 18a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4h-9l-6 6v-6h-5a4 4 0 0 1-4-4V18z" stroke={colors.primary.main} strokeWidth="2" fill="none" />
                {/* Chat dots */}
                <circle cx="22" cy="25" r="1.5" fill={colors.primary.main} />
                <circle cx="28" cy="25" r="1.5" fill={colors.primary.main} />
                <circle cx="34" cy="25" r="1.5" fill={colors.primary.main} />
                {/* Sparkles */}
                <circle cx="44" cy="14" r="1.5" fill={colors.primary.main} />
                <circle cx="12" cy="16" r="1" fill={colors.primary.light} />
                <circle cx="42" cy="36" r="1" fill={colors.primary.main} />
              </svg>
            </div>
            <span style={{
              fontSize: typography.fontSize.caption,
              fontWeight: typography.fontWeight.medium,
              color: colors.text.primary,
              textAlign: 'center',
            }}>
              Messages
            </span>
          </button>
        </div>
      </div>

      {/* Active Contracts Section */}
      <div style={{
        padding: `0 ${spacing.lg} ${spacing.xl}`,
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: spacing.lg,
        }}>
          <h2 style={{
            fontSize: typography.fontSize.h2,
            fontWeight: typography.fontWeight.semibold,
            color: colors.text.primary,
            margin: 0,
          }}>
            Active contracts
          </h2>
          <button
            onClick={() => navigate('/contracts')}
            style={{
              background: 'transparent',
              border: 'none',
              color: colors.primary.main,
              fontSize: typography.fontSize.body,
              fontWeight: typography.fontWeight.medium,
              cursor: 'pointer',
              padding: spacing.sm,
            }}
          >
            View all
          </button>
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: spacing.md,
        }}>
          {activeContracts.map((contract) => {
            const statusStyle = getStatusStyle(contract.status)
            return (
              <div
                key={contract.id}
                onClick={() => navigate(`/contracts/${contract.id}`)}
                style={{
                  ...components.card,
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
                    {contract.title}
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
                    {contract.status.charAt(0).toUpperCase() + contract.status.slice(1)}
                  </span>
                </div>
                <p style={{
                  fontSize: typography.fontSize.caption,
                  color: colors.text.secondary,
                  margin: 0,
                  marginBottom: spacing.xs,
                }}>
                  {contract.provider}
                </p>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  <span style={{
                    fontSize: typography.fontSize.body,
                    fontWeight: typography.fontWeight.semibold,
                    color: colors.text.primary,
                  }}>
                    {contract.amount}
                  </span>
                  <span style={{
                    fontSize: typography.fontSize.caption,
                    color: colors.text.tertiary,
                  }}>
                    Due: {contract.dueDate}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default MainPage
