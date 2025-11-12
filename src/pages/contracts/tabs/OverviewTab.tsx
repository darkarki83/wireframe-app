import { colors, spacing, borderRadius, typography, shadows } from "../../../lib/designTokens";

type Contract = {
  id: string;
  title: string;
  client: string;
  freelancer: string;
  total: number;
  status: "active" | "completed" | "pending";
  startDate: string;
  endDate: string;
  description: string;
};

type Props = {
  contract: Contract;
};

export default function OverviewTab({ contract }: Props) {
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
          <path d="M21.21 15.89A10 10 0 1 1 8 2.83" fill={colors.primary.light} />
          <path d="M21.21 15.89A10 10 0 1 1 8 2.83" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M22 12A10 10 0 0 0 12 2v10z" fill={colors.primary.light} />
          <path d="M22 12A10 10 0 0 0 12 2v10z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Contract Overview
      </h3>

      {/* Description */}
      <div style={{ marginBottom: spacing.xl }}>
        <label style={{
          display: "block",
          marginBottom: spacing.sm,
          fontSize: typography.fontSize.caption,
          fontWeight: typography.fontWeight.semibold,
          color: colors.text.default,
        }}>
          Description
        </label>
        <p style={{
          fontSize: typography.fontSize.body,
          color: colors.text.secondary,
          lineHeight: 1.6,
          margin: 0,
          background: colors.base.background,
          padding: spacing.lg,
          borderRadius: borderRadius.sm,
        }}>
          {contract.description}
        </p>
      </div>

      {/* Progress Section */}
      <div style={{ marginBottom: spacing.xl }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: spacing.md,
        }}>
          <div style={{
            fontSize: typography.fontSize.caption,
            fontWeight: typography.fontWeight.semibold,
            color: colors.text.default,
            display: 'flex',
            alignItems: 'center',
            gap: spacing.xs,
          }}>
            <svg width="14" height="14" viewBox="0 0 28 28" fill="none">
              <line x1="14" y1="22" x2="14" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="20" y1="22" x2="20" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="8" y1="22" x2="8" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            Progress
          </div>
          <span style={{
            fontSize: typography.fontSize.caption,
            fontWeight: typography.fontWeight.semibold,
            color: colors.primary.main,
          }}>
            1 / 3 Milestones
          </span>
        </div>
        <div style={{
          width: "100%",
          height: 8,
          background: colors.base.border,
          borderRadius: borderRadius.sm,
          overflow: "hidden",
        }}>
          <div style={{
            width: "33%",
            height: "100%",
            background: colors.primary.main,
            borderRadius: borderRadius.sm,
          }} />
        </div>
      </div>

      {/* Payment Info */}
      <div style={{ marginBottom: spacing.xl }}>
        <h4 style={{
          fontSize: typography.fontSize.body,
          fontWeight: typography.fontWeight.semibold,
          marginBottom: spacing.md,
          marginTop: 0,
          color: colors.text.default,
          display: 'flex',
          alignItems: 'center',
          gap: spacing.xs,
        }}>
          <svg width="16" height="16" viewBox="0 0 28 28" fill="none">
            <circle cx="14" cy="14" r="9" fill={colors.primary.light} />
            <circle cx="14" cy="14" r="9" stroke="currentColor" strokeWidth="1.5" />
            <path d="M14 8v12M16.5 10.5h-3.5a2 2 0 0 0 0 4h3a2 2 0 0 1 0 4h-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          Payment Information
        </h4>
        <div style={{
          background: colors.base.background,
          padding: spacing.lg,
          borderRadius: borderRadius.sm,
          fontSize: typography.fontSize.body,
        }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: spacing.sm,
            color: colors.text.secondary,
          }}>
            <span>Total Contract Value:</span>
            <span style={{ fontWeight: typography.fontWeight.semibold, color: colors.text.default }}>
              ${contract.total.toLocaleString()}
            </span>
          </div>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: spacing.sm,
            color: colors.text.secondary,
          }}>
            <span>Released:</span>
            <span style={{ fontWeight: typography.fontWeight.semibold, color: colors.status.success }}>
              ${(contract.total * 0.33).toFixed(0)}
            </span>
          </div>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            color: colors.text.secondary,
          }}>
            <span>Remaining:</span>
            <span style={{ fontWeight: typography.fontWeight.semibold, color: colors.status.warning }}>
              ${(contract.total * 0.67).toFixed(0)}
            </span>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div>
        <h4 style={{
          fontSize: typography.fontSize.body,
          fontWeight: typography.fontWeight.semibold,
          marginBottom: spacing.md,
          marginTop: 0,
          color: colors.text.default,
          display: 'flex',
          alignItems: 'center',
          gap: spacing.xs,
        }}>
          <svg width="16" height="16" viewBox="0 0 28 28" fill="none">
            <rect x="5" y="6" width="18" height="18" rx="2" fill={colors.primary.light} opacity="0.3" />
            <rect x="5" y="6" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
            <line x1="17" y1="3" x2="17" y2="9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="11" y1="3" x2="11" y2="9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="5" y1="12" x2="23" y2="12" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          Timeline
        </h4>
        <div style={{
          background: colors.base.background,
          padding: spacing.lg,
          borderRadius: borderRadius.sm,
        }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: spacing.md,
          }}>
            <div>
              <div style={{
                fontSize: typography.fontSize.caption,
                color: colors.text.secondary,
                marginBottom: spacing.xs,
              }}>
                Start Date
              </div>
              <div style={{
                fontSize: typography.fontSize.body,
                fontWeight: typography.fontWeight.semibold,
                color: colors.text.default,
              }}>
                {contract.startDate}
              </div>
            </div>
            <div style={{
              fontSize: typography.fontSize.h2,
              color: colors.base.border,
            }}>
              →
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{
                fontSize: typography.fontSize.caption,
                color: colors.text.secondary,
                marginBottom: spacing.xs,
              }}>
                End Date
              </div>
              <div style={{
                fontSize: typography.fontSize.body,
                fontWeight: typography.fontWeight.semibold,
                color: colors.text.default,
              }}>
                {contract.endDate}
              </div>
            </div>
          </div>
          <div style={{
            fontSize: typography.fontSize.caption,
            color: colors.text.secondary,
            textAlign: "center",
            paddingTop: spacing.md,
            borderTop: `1px solid ${colors.base.border}`,
          }}>
            Duration: 2 months
          </div>
        </div>
      </div>
    </div>
  );
}
