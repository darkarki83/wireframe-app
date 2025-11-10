import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiListContracts, type Contract } from "../../lib/mockApi";
import { colors, typography, spacing, borderRadius, getStatusStyle } from "../../lib/designTokens";

export default function MainPage() {
  const [contracts, setContracts] = useState<Contract[]>([]);

  useEffect(() => {
    apiListContracts().then(setContracts);
  }, []);

  return (
    <div style={{
      maxWidth: 600,
      margin: "0 auto",
      background: colors.base.backgroundGradient,
      fontFamily: typography.fontFamily.base,
      padding: `${spacing.xl} ${spacing.md}`,
    }}>
      {/* Header - Crypto style */}
      <div style={{ marginBottom: spacing.xxxl }}>
        <h1 style={{
          fontSize: '24px',
          fontWeight: typography.fontWeight.medium,
          color: colors.text.primary,
          marginBottom: spacing.sm,
          marginTop: 0,
        }}>
          Welcome back, Artiom
        </h1>
        <p style={{
          fontSize: typography.fontSize.body,
          color: colors.text.secondary,
          margin: 0,
        }}>
          Manage your work efficiently
        </p>
      </div>

      {/* Three Action Cards - Crypto style */}
      <div style={{
        display: "flex",
        flexDirection: "row",
        gap: spacing.sm,
        marginBottom: spacing.xxxl,
      }}>
        {/* OFFERS Card */}
        <Link to="/offers" style={{ textDecoration: "none", flex: 1 }}>
          <div
            style={{
              background: colors.base.surface,
              border: 'none',
              borderRadius: borderRadius.md,
              padding: `${spacing.lg} ${spacing.sm}`,
              cursor: "pointer",
              transition: 'all 0.2s',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: spacing.sm,
              textAlign: 'center',
              minHeight: '110px',
            }}
          >
            {/* Icon - Briefcase/Offer */}
            <div style={{
              width: 48,
              height: 48,
              borderRadius: borderRadius.full,
              background: colors.base.background,
              border: `2px solid ${colors.primary.main}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={colors.primary.main} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
              </svg>
            </div>
            <div style={{
              fontSize: typography.fontSize.tiny,
              fontWeight: typography.fontWeight.semibold,
              color: colors.text.primary,
              textTransform: 'uppercase',
              letterSpacing: '0.3px',
            }}>
              Offers
            </div>
          </div>
        </Link>

        {/* CONTRACTS Card */}
        <Link to="/contracts" style={{ textDecoration: "none", flex: 1 }}>
          <div
            style={{
              background: colors.base.surface,
              border: 'none',
              borderRadius: borderRadius.md,
              padding: `${spacing.lg} ${spacing.sm}`,
              cursor: "pointer",
              transition: 'all 0.2s',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: spacing.sm,
              textAlign: 'center',
              minHeight: '110px',
            }}
          >
            {/* Icon - File/Document */}
            <div style={{
              width: 48,
              height: 48,
              borderRadius: borderRadius.full,
              background: colors.base.background,
              border: `2px solid ${colors.secondary.main}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={colors.secondary.main} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <line x1="10" y1="9" x2="8" y2="9"></line>
              </svg>
            </div>
            <div style={{
              fontSize: typography.fontSize.tiny,
              fontWeight: typography.fontWeight.semibold,
              color: colors.text.primary,
              textTransform: 'uppercase',
              letterSpacing: '0.3px',
            }}>
              Contracts
            </div>
          </div>
        </Link>

        {/* CHATS Card */}
        <Link to="/chats" style={{ textDecoration: "none", flex: 1 }}>
          <div
            style={{
              background: colors.base.surface,
              border: 'none',
              borderRadius: borderRadius.md,
              padding: `${spacing.lg} ${spacing.sm}`,
              cursor: "pointer",
              transition: 'all 0.2s',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: spacing.sm,
              textAlign: 'center',
              minHeight: '110px',
            }}
          >
            {/* Icon - Message/Chat */}
            <div style={{
              width: 48,
              height: 48,
              borderRadius: borderRadius.full,
              background: colors.base.background,
              border: `2px solid ${colors.primary.main}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={colors.primary.main} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                <line x1="9" y1="10" x2="15" y2="10"></line>
                <line x1="9" y1="14" x2="13" y2="14"></line>
              </svg>
            </div>
            <div style={{
              fontSize: typography.fontSize.tiny,
              fontWeight: typography.fontWeight.semibold,
              color: colors.text.primary,
              textTransform: 'uppercase',
              letterSpacing: '0.3px',
            }}>
              Messages
            </div>
          </div>
        </Link>
      </div>

      {/* Active Contracts Section */}
      <div>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: spacing.lg
        }}>
          <h2 style={{
            margin: 0,
            fontSize: typography.fontSize.h2,
            fontWeight: typography.fontWeight.semibold,
            color: colors.text.primary,
          }}>
            Active contracts
          </h2>
          <Link to="/contracts" style={{
            fontSize: typography.fontSize.caption,
            color: colors.primary.main,
            textDecoration: "none",
            fontWeight: typography.fontWeight.medium,
          }}>
            View all →
          </Link>
        </div>

        {/* Contract Cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: spacing.md }}>
          {contracts.slice(0, 3).map((contract) => (
            <Link
              key={contract.id}
              to={`/contracts/${contract.id}`}
              style={{
                display: "block",
                background: colors.base.surface,
                border: `1px solid ${colors.base.border}`,
                borderRadius: borderRadius.md,
                padding: spacing.lg,
                textDecoration: "none",
                color: "inherit",
                transition: "all 0.2s"
              }}
            >
              {/* Header: Title and Status */}
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: spacing.sm,
                gap: spacing.md
              }}>
                <div style={{
                  fontWeight: typography.fontWeight.semibold,
                  fontSize: typography.fontSize.body,
                  color: colors.text.primary,
                  flex: 1,
                  lineHeight: typography.lineHeight.tight
                }}>
                  {contract.title}
                </div>
                <div
                  style={{
                    background: getStatusStyle(contract.status).bg,
                    color: getStatusStyle(contract.status).text,
                    padding: `${spacing.xs} ${spacing.sm}`,
                    borderRadius: borderRadius.sm,
                    fontSize: typography.fontSize.tiny,
                    fontWeight: typography.fontWeight.semibold,
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                    letterSpacing: '0.5px',
                  }}
                >
                  {contract.status}
                </div>
              </div>

              {/* Description */}
              <p style={{
                fontSize: typography.fontSize.caption,
                color: colors.text.secondary,
                margin: `0 0 ${spacing.md} 0`,
                lineHeight: typography.lineHeight.normal,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden"
              }}>
                {contract.description}
              </p>

              {/* Footer: Price and Date */}
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingTop: spacing.sm,
                borderTop: `1px solid ${colors.base.border}`,
              }}>
                <div style={{
                  fontSize: typography.fontSize.caption,
                  color: colors.text.tertiary,
                  display: 'flex',
                  alignItems: 'center',
                  gap: spacing.xs,
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={colors.text.tertiary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  {contract.startDate}
                </div>
                <div style={{
                  fontWeight: typography.fontWeight.bold,
                  fontSize: typography.fontSize.h3,
                  color: colors.primary.main
                }}>
                  ${contract.price}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {contracts.length === 0 && (
          <div style={{
            textAlign: "center",
            padding: `${spacing.xxxl} ${spacing.lg}`,
            color: colors.text.tertiary,
            background: colors.base.surface,
            border: `1px solid ${colors.base.border}`,
            borderRadius: borderRadius.md,
          }}>
            <div style={{
              fontSize: '32px',
              marginBottom: spacing.md,
              opacity: 0.5,
            }}>
              📋
            </div>
            <div style={{
              fontSize: typography.fontSize.body,
              fontWeight: typography.fontWeight.medium,
              color: colors.text.secondary,
            }}>
              No active contracts yet
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
