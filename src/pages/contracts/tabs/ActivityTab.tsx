import { colors, spacing, borderRadius, typography, shadows } from "../../../lib/designTokens";

export default function ActivityTab() {
  const activities = [
    {
      id: 1,
      action: "Contract Created",
      description: "Proposal approved and contract was created",
      time: "2 hours ago",
      dotColor: '#D1FAE5',
      borderColor: colors.status.success,
    },
    {
      id: 2,
      action: "Milestone #1 Funded",
      description: "Design Phase milestone was funded by client",
      time: "1 day ago",
      dotColor: colors.primary.light,
      borderColor: colors.primary.main,
    },
    {
      id: 3,
      action: "Work Submitted",
      description: "Freelancer submitted work for Milestone #1",
      time: "3 days ago",
      dotColor: '#DBEAFE',
      borderColor: colors.status.info,
    },
    {
      id: 4,
      action: "Milestone Approved",
      description: "Client approved Milestone #1 deliverables",
      time: "5 days ago",
      dotColor: '#D1FAE5',
      borderColor: colors.status.success,
    },
  ];

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
          <polyline points="24 14 20 14 17 23 11 5 8 14 4 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Activity Timeline
      </h3>

      <div style={{ position: 'relative' }}>
        {/* Timeline vertical line */}
        <div style={{
          position: 'absolute',
          left: '12px',
          top: '12px',
          bottom: '12px',
          width: '2px',
          background: colors.base.border,
        }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.md }}>
          {activities.map((activity) => (
            <div
              key={activity.id}
              style={{
                display: 'flex',
                gap: spacing.md,
                position: 'relative',
              }}
            >
              {/* Soft colored dot */}
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: activity.dotColor,
                border: `2px solid ${activity.borderColor}`,
                flexShrink: 0,
                zIndex: 1,
              }} />

              {/* Content card */}
              <div style={{
                flex: 1,
                background: colors.base.surface,
                padding: spacing.lg,
                borderRadius: borderRadius.md,
                boxShadow: shadows.sm,
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: spacing.xs,
                }}>
                  <div style={{
                    fontSize: typography.fontSize.body,
                    fontWeight: typography.fontWeight.semibold,
                    color: colors.text.default,
                  }}>
                    {activity.action}
                  </div>
                  <div style={{
                    fontSize: typography.fontSize.caption,
                    color: colors.text.secondary,
                    whiteSpace: 'nowrap',
                    marginLeft: spacing.md,
                  }}>
                    {activity.time}
                  </div>
                </div>
                <div style={{
                  fontSize: typography.fontSize.caption,
                  color: colors.text.secondary,
                  lineHeight: typography.lineHeight.normal,
                }}>
                  {activity.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
