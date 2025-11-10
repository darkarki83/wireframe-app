import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiListContracts, type Contract } from "../../lib/mockApi";
import { colors, typography, spacing, borderRadius, shadows, getStatusStyle } from "../../lib/designTokens";

export default function MainPage() {
  const [contracts, setContracts] = useState<Contract[]>([]);

  useEffect(() => {
    apiListContracts().then(setContracts);
  }, []);

  return (
    <div style={{
      maxWidth: 600,
      margin: "0 auto",
      background: colors.base.background,
      fontFamily: typography.fontFamily.base,
      padding: `${spacing.xl} ${spacing.md}`,
    }}>
      {/* Header - Clean, lots of whitespace */}
      <h1 style={{
        fontSize: typography.fontSize.h1,
        fontWeight: typography.fontWeight.semibold,
        color: colors.text.primary,
        marginBottom: spacing.xxxl,
        marginTop: spacing.xl,
        letterSpacing: '-0.5px'
      }}>
        Welcome
      </h1>

      {/* Three Big Action Buttons - Round with fintech icons */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: spacing.xxxl,
        marginBottom: spacing.xxxl,
      }}>
        <Link to="/offers" style={{ textAlign: "center", textDecoration: "none", color: "inherit" }}>
          <button
            style={{
              width: '88px',
              height: '88px',
              borderRadius: borderRadius.full,
              background: colors.base.surface,
              border: `2px solid ${colors.base.border}`,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: 'all 0.2s',
              boxShadow: shadows.sm,
              marginBottom: spacing.sm,
            }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={colors.primary.main} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
          </button>
          <div style={{
            fontSize: typography.fontSize.caption,
            fontWeight: typography.fontWeight.medium,
            color: colors.text.primary
          }}>
            Offers
          </div>
        </Link>

        <Link to="/contracts" style={{ textAlign: "center", textDecoration: "none", color: "inherit" }}>
          <button
            style={{
              width: '88px',
              height: '88px',
              borderRadius: borderRadius.full,
              background: colors.base.surface,
              border: `2px solid ${colors.base.border}`,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: 'all 0.2s',
              boxShadow: shadows.sm,
              marginBottom: spacing.sm,
            }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={colors.primary.main} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
          </button>
          <div style={{
            fontSize: typography.fontSize.caption,
            fontWeight: typography.fontWeight.medium,
            color: colors.text.primary
          }}>
            Contracts
          </div>
        </Link>

        <Link to="/chats" style={{ textAlign: "center", textDecoration: "none", color: "inherit" }}>
          <button
            style={{
              width: '88px',
              height: '88px',
              borderRadius: borderRadius.full,
              background: colors.base.surface,
              border: `2px solid ${colors.base.border}`,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: 'all 0.2s',
              boxShadow: shadows.sm,
              marginBottom: spacing.sm,
            }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={colors.primary.main} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </button>
          <div style={{
            fontSize: typography.fontSize.caption,
            fontWeight: typography.fontWeight.medium,
            color: colors.text.primary
          }}>
            Messages
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
            letterSpacing: '-0.3px'
          }}>
            Active contracts
          </h2>
          <Link to="/contracts" style={{
            fontSize: typography.fontSize.caption,
            color: colors.primary.main,
            textDecoration: "none",
            fontWeight: typography.fontWeight.medium
          }}>
            View all →
          </Link>
        </div>

        {/* Contract Cards - Clean, minimal */}
        <div style={{ display: "flex", flexDirection: "column", gap: spacing.sm }}>
          {contracts.slice(0, 3).map((contract) => {
            const statusStyle = getStatusStyle(contract.status);
            return (
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
                  transition: "border-color 0.2s"
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
                    fontSize: typography.fontSize.h3,
                    flex: 1,
                    lineHeight: typography.lineHeight.tight,
                    color: colors.text.primary
                  }}>
                    {contract.title}
                  </div>
                  <div
                    style={{
                      background: statusStyle.bg,
                      color: statusStyle.text,
                      padding: "4px 8px",
                      borderRadius: borderRadius.sm,
                      fontSize: typography.fontSize.tiny,
                      fontWeight: typography.fontWeight.medium,
                      textTransform: "capitalize",
                      whiteSpace: "nowrap"
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
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{
                    fontSize: typography.fontSize.caption,
                    color: colors.text.tertiary
                  }}>
                    {contract.startDate}
                  </div>
                  <div style={{
                    fontWeight: typography.fontWeight.semibold,
                    fontSize: typography.fontSize.h3,
                    color: colors.text.primary
                  }}>
                    ${contract.price?.toLocaleString() || '0'}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {contracts.length === 0 && (
          <div style={{
            textAlign: "center",
            padding: `${spacing.xxxl} ${spacing.lg}`,
            background: colors.base.surface,
            border: `1px solid ${colors.base.border}`,
            borderRadius: borderRadius.md
          }}>
            <div style={{
              fontSize: typography.fontSize.body,
              fontWeight: typography.fontWeight.medium,
              color: colors.text.secondary,
              marginBottom: spacing.xs
            }}>
              No active contracts
            </div>
            <div style={{
              fontSize: typography.fontSize.caption,
              color: colors.text.tertiary
            }}>
              Your contracts will appear here
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
