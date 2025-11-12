import { useEffect, useState } from "react";
import { apiListContracts, type Contract } from "../../lib/mockApi";
import { Link } from "react-router-dom";
import { colors, typography, spacing, shadows, borderRadius, components } from "../../lib/designTokens";

export default function ContractList() {
  const [items, setItems] = useState<Contract[]>([]);
  const [activeTab, setActiveTab] = useState<"all" | "active" | "completed">("all");

  useEffect(() => {
    apiListContracts().then(setItems);
  }, []);

  const getStatusStyle = (status: string) => {
    const statusMap: Record<string, { bg: string; text: string }> = {
      active: colors.state.active,
      completed: colors.state.approved,
      pending: colors.state.pending,
    };
    return statusMap[status] || colors.state.draft;
  };

  const filteredContracts = items.filter(contract => {
    if (activeTab === "all") return true;
    if (activeTab === "active") return contract.status === "active";
    if (activeTab === "completed") return contract.status === "completed";
    return true;
  });

  return (
    <div style={{
      minHeight: '100vh',
      background: colors.base.background,
      paddingBottom: '80px',
    }}>
      {/* Header */}
      <div style={{
        padding: `${spacing.lg} ${spacing.lg} 0`,
      }}>
        <h1 style={{
          fontSize: typography.fontSize.h1,
          fontWeight: typography.fontWeight.semibold,
          color: colors.text.primary,
          margin: 0,
          marginBottom: spacing.lg,
        }}>
          My Contracts
        </h1>
      </div>

      {/* Filter Tabs */}
      <div style={{
        padding: `0 ${spacing.lg}`,
        marginBottom: spacing.lg,
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
            onClick={() => setActiveTab('all')}
            style={{
              flex: 1,
              padding: `${spacing.md} ${spacing.lg}`,
              background: activeTab === 'all' ? colors.primary.main : 'transparent',
              color: activeTab === 'all' ? colors.text.inverse : colors.text.secondary,
              border: 'none',
              borderRadius: borderRadius.sm,
              fontSize: typography.fontSize.body,
              fontWeight: typography.fontWeight.semibold,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            All
          </button>
          <button
            onClick={() => setActiveTab('active')}
            style={{
              flex: 1,
              padding: `${spacing.md} ${spacing.lg}`,
              background: activeTab === 'active' ? colors.primary.main : 'transparent',
              color: activeTab === 'active' ? colors.text.inverse : colors.text.secondary,
              border: 'none',
              borderRadius: borderRadius.sm,
              fontSize: typography.fontSize.body,
              fontWeight: typography.fontWeight.semibold,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            Active
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            style={{
              flex: 1,
              padding: `${spacing.md} ${spacing.lg}`,
              background: activeTab === 'completed' ? colors.primary.main : 'transparent',
              color: activeTab === 'completed' ? colors.text.inverse : colors.text.secondary,
              border: 'none',
              borderRadius: borderRadius.sm,
              fontSize: typography.fontSize.body,
              fontWeight: typography.fontWeight.semibold,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            Completed
          </button>
        </div>
      </div>

      {/* Contracts List */}
      <div style={{ padding: `0 ${spacing.lg} ${spacing.lg}` }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: spacing.md,
        }}>
          {filteredContracts.map((contract) => {
            const statusStyle = getStatusStyle(contract.status);
            return (
              <Link
                key={contract.id}
                to={`/contracts/${contract.id}`}
                style={{
                  ...components.card,
                  textDecoration: 'none',
                  display: 'block',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = shadows.md;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = shadows.base;
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: spacing.sm,
                }}>
                  <h3 style={{
                    fontSize: typography.fontSize.h2,
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
                  fontSize: typography.fontSize.body,
                  color: colors.text.secondary,
                  margin: `0 0 ${spacing.md} 0`,
                  lineHeight: typography.lineHeight.normal,
                }}>
                  {contract.description}
                </p>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: typography.fontSize.caption,
                  color: colors.text.secondary,
                }}>
                  <span>{contract.startDate}</span>
                  <span style={{
                    fontSize: typography.fontSize.h2,
                    fontWeight: typography.fontWeight.semibold,
                    color: colors.primary.main,
                  }}>
                    ${contract.price}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {filteredContracts.length === 0 && (
          <div style={{
            ...components.card,
            textAlign: 'center',
            padding: spacing.xxxl,
          }}>
            <div style={{
              marginBottom: spacing.lg,
            }}>
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" style={{ margin: '0 auto' }}>
                <path d="M6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" fill={colors.primary.light} />
                <path d="M6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" stroke={colors.primary.main} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14 2v6h6M8 13h8M8 17h5" stroke={colors.primary.main} strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <p style={{
              fontSize: typography.fontSize.h2,
              fontWeight: typography.fontWeight.semibold,
              color: colors.text.primary,
              margin: `0 0 ${spacing.sm} 0`,
            }}>
              No {activeTab === 'all' ? '' : activeTab} contracts
            </p>
            <p style={{
              fontSize: typography.fontSize.body,
              color: colors.text.secondary,
              margin: 0,
            }}>
              {activeTab === 'all'
                ? "You don't have any contracts yet"
                : `No ${activeTab} contracts found`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
