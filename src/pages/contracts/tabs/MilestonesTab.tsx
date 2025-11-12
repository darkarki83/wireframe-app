import { colors, spacing, borderRadius, typography, shadows, components } from "../../../lib/designTokens";

type Milestone = {
  id: string;
  title: string;
  amount: number;
  status: "pending" | "funded" | "submitted" | "approved" | "completed";
  description: string;
};

export default function MilestonesTab() {
  const milestones: Milestone[] = [
    {
      id: "1",
      title: "Design Phase",
      amount: 1500,
      status: "approved",
      description: "Complete UI/UX design, wireframes, and mockups"
    },
    {
      id: "2",
      title: "Development Phase",
      amount: 2500,
      status: "funded",
      description: "Build core features and functionality"
    },
    {
      id: "3",
      title: "Launch & Deployment",
      amount: 1000,
      status: "pending",
      description: "Final testing, deployment and documentation"
    }
  ];

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "completed":
      case "approved":
        return colors.state.completed;
      case "submitted":
        return colors.state.inReview;
      case "funded":
        return colors.state.funded;
      case "pending":
        return colors.state.pending;
      default:
        return colors.state.draft;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending": return "Not Funded";
      case "funded": return "In Progress";
      case "submitted": return "Submitted";
      case "approved": return "Completed";
      case "completed": return "Completed";
      default: return status;
    }
  };

  return (
    <div style={{
      background: colors.base.surface,
      borderRadius: borderRadius.md,
      padding: spacing.xl,
      boxShadow: shadows.sm,
    }}>
      <h3 style={{
        fontSize: typography.fontSize.h2,
        fontWeight: typography.fontWeight.semibold,
        marginBottom: spacing.lg,
        marginTop: 0,
        color: colors.text.default,
        display: 'flex',
        alignItems: 'center',
        gap: spacing.sm,
      }}>
        <svg width="20" height="20" viewBox="0 0 28 28" fill="none">
          <circle cx="14" cy="14" r="10" fill={colors.primary.light} />
          <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="1.5" />
          <polyline points="14 8 14 14 18 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Project Milestones
      </h3>

      <div style={{ display: "flex", flexDirection: "column", gap: spacing.lg }}>
        {milestones.map((milestone, index) => (
          <div
            key={milestone.id}
            style={{
              background: colors.base.background,
              border: `1px solid ${colors.base.border}`,
              borderRadius: borderRadius.md,
              padding: spacing.lg,
            }}
          >
            {/* Header */}
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: spacing.md,
              gap: spacing.md,
            }}>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: typography.fontSize.body,
                  fontWeight: typography.fontWeight.semibold,
                  color: colors.text.default,
                  marginBottom: spacing.xs,
                }}>
                  {index + 1}. {milestone.title}
                </div>
                <div style={{
                  fontSize: typography.fontSize.caption,
                  color: colors.text.secondary,
                  lineHeight: 1.5,
                }}>
                  {milestone.description}
                </div>
              </div>
              <div
                style={{
                  background: getStatusStyle(milestone.status).bg,
                  color: getStatusStyle(milestone.status).text,
                  padding: `${spacing.xs} ${spacing.sm}`,
                  borderRadius: borderRadius.full,
                  fontSize: typography.fontSize.caption,
                  fontWeight: typography.fontWeight.semibold,
                  whiteSpace: "nowrap",
                }}
              >
                {getStatusText(milestone.status)}
              </div>
            </div>

            {/* Amount and Actions */}
            <div style={{
              paddingTop: spacing.md,
              borderTop: `1px solid ${colors.base.border}`,
            }}>
              <div style={{
                fontSize: typography.fontSize.h2,
                fontWeight: typography.fontWeight.bold,
                color: colors.primary.main,
                display: 'flex',
                alignItems: 'center',
                gap: spacing.xs,
                marginBottom: spacing.md,
              }}>
                <svg width="18" height="18" viewBox="0 0 28 28" fill="none">
                  <circle cx="14" cy="14" r="9" fill={colors.primary.light} />
                  <circle cx="14" cy="14" r="9" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M14 8v12M16.5 10.5h-3.5a2 2 0 0 0 0 4h3a2 2 0 0 1 0 4h-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                ${milestone.amount.toLocaleString()}
              </div>

              <div style={{ display: "flex", gap: spacing.sm, flexWrap: "wrap" }}>
                {milestone.status === "pending" && (
                  <button style={{
                    ...components.button.primary,
                    padding: `${spacing.sm} ${spacing.lg}`,
                    fontSize: typography.fontSize.caption,
                    cursor: "pointer",
                  }}>
                    Fund Milestone
                  </button>
                )}
                {milestone.status === "funded" && (
                  <>
                    <button style={{
                      ...components.button.primary,
                      padding: `${spacing.sm} ${spacing.lg}`,
                      fontSize: typography.fontSize.caption,
                      cursor: "pointer",
                    }}>
                      Submit Work
                    </button>
                    <button style={{
                      ...components.button.secondary,
                      padding: `${spacing.sm} ${spacing.lg}`,
                      fontSize: typography.fontSize.caption,
                      cursor: "pointer",
                      background: 'transparent',
                      color: colors.status.error,
                      border: `1px solid ${colors.status.error}`,
                    }}>
                      Dispute
                    </button>
                  </>
                )}
                {milestone.status === "submitted" && (
                  <>
                    <button style={{
                      ...components.button.primary,
                      padding: `${spacing.sm} ${spacing.lg}`,
                      fontSize: typography.fontSize.caption,
                      cursor: "pointer",
                    }}>
                      Approve
                    </button>
                    <button style={{
                      ...components.button.secondary,
                      padding: `${spacing.sm} ${spacing.lg}`,
                      fontSize: typography.fontSize.caption,
                      cursor: "pointer",
                    }}>
                      Request Changes
                    </button>
                  </>
                )}
                {milestone.status === "approved" && (
                  <button style={{
                    ...components.button.primary,
                    padding: `${spacing.sm} ${spacing.lg}`,
                    fontSize: typography.fontSize.caption,
                    cursor: "pointer",
                  }}>
                    Withdraw Funds
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
