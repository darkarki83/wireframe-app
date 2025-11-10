import React from 'react'
import { useNavigate } from 'react-router-dom'
import { colors, typography, spacing, shadows, borderRadius } from '../../lib/designTokens'

const MainPage: React.FC = () => {
  const navigate = useNavigate()

  // Mock data for active contracts
  const activeContracts = [
    { id: 1, title: 'Website Redesign', provider: 'Design Studio Inc.', status: 'In Progress', dueDate: '2024-02-15' },
    { id: 2, title: 'Mobile App Development', provider: 'Tech Solutions LLC', status: 'Pending', dueDate: '2024-03-01' },
  ]

  const actionCards = [
    { 
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
        </svg>
      ),
      label: 'Offers',
      color: colors.primary.main,
      onClick: () => navigate('/offers')
    },
    { 
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
          <polyline points="10 9 9 9 8 9"/>
        </svg>
      ),
      label: 'My Contracts',
      color: colors.primary.main,
      onClick: () => navigate('/contracts')
    },
    { 
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      ),
      label: 'Messages',
      color: colors.primary.main,
      onClick: () => navigate('/chats')
    }
  ]

  return (
    <div style={{
      minHeight: '100vh',
      background: colors.base.background,
      paddingBottom: '80px',
    }}>
      {/* Welcome Section */}
      <div style={{
        padding: `${spacing.xl} ${spacing.md}`,
      }}>
        <h1 style={{
          fontSize: typography.fontSize.h1,
          fontWeight: typography.fontWeight.semibold,
          color: colors.text.primary,
          margin: 0,
          marginBottom: spacing.sm,
        }}>
          Welcome back, Artiom 👋
        </h1>
        <p style={{
          fontSize: typography.fontSize.body,
          color: colors.text.secondary,
          margin: 0,
        }}>
          Manage your offers and contracts
        </p>
      </div>

      {/* Action Cards */}
      <div style={{
        padding: `0 ${spacing.md}`,
        marginBottom: spacing.xl,
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: spacing.sm,
        }}>
          {actionCards.map((card, index) => (
            <button
              key={index}
              onClick={card.onClick}
              style={{
                background: colors.base.surface,
                border: 'none',
                borderRadius: borderRadius.lg,
                padding: `${spacing.lg} ${spacing.md}`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: spacing.md,
                cursor: 'pointer',
                minHeight: '110px',
                transition: 'all 0.2s ease',
                boxShadow: shadows.sm,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = colors.base.surfaceHover
                e.currentTarget.style.boxShadow = shadows.base
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = colors.base.surface
                e.currentTarget.style.boxShadow = shadows.sm
              }}
            >
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: borderRadius.full,
                background: colors.primary.light,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: colors.primary.main,
                flexShrink: 0,
              }}>
                {card.icon}
              </div>
              <span style={{
                fontSize: typography.fontSize.caption,
                fontWeight: typography.fontWeight.medium,
                color: colors.text.primary,
                textAlign: 'center',
                lineHeight: typography.lineHeight.tight,
              }}>
                {card.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Active Contracts Section */}
      <div style={{
        padding: `0 ${spacing.md} ${spacing.xl}`,
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: spacing.md,
        }}>
          <h2 style={{
            fontSize: typography.fontSize.h2,
            fontWeight: typography.fontWeight.semibold,
            color: colors.text.primary,
            margin: 0,
          }}>
            Active Contracts
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
            View All
          </button>
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: spacing.md,
        }}>
          {activeContracts.map((contract) => (
            <div
              key={contract.id}
              onClick={() => navigate(`/contracts/${contract.id}`)}
              style={{
                background: colors.base.surface,
                borderRadius: borderRadius.lg,
                padding: spacing.lg,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: shadows.sm,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = colors.base.surfaceHover
                e.currentTarget.style.boxShadow = shadows.base
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = colors.base.surface
                e.currentTarget.style.boxShadow = shadows.sm
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
                }}>
                  {contract.title}
                </h3>
                <span style={{
                  fontSize: typography.fontSize.caption,
                  fontWeight: typography.fontWeight.medium,
                  color: colors.primary.main,
                  background: colors.primary.light,
                  padding: `${spacing.xs} ${spacing.sm}`,
                  borderRadius: borderRadius.sm,
                  whiteSpace: 'nowrap',
                }}>
                  {contract.status}
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
              <p style={{
                fontSize: typography.fontSize.caption,
                color: colors.text.tertiary,
                margin: 0,
              }}>
                Due: {contract.dueDate}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MainPage