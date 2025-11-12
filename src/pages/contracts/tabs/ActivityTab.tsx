import { colors, spacing, borderRadius, typography, shadows } from "../../../lib/designTokens";

export default function ActivityTab() {
  const activities = [
    { 
      id: 1, 
      action: "Contract Created", 
      description: "Proposal approved and contract was created",
      time: "2 hours ago",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      ),
      color: colors.status.success,
    },
    { 
      id: 2, 
      action: "Milestone #1 Funded", 
      description: "Design Phase milestone was funded by client",
      time: "1 day ago",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="1" x2="12" y2="23"></line>
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
        </svg>
      ),
      color: colors.primary.main,
    },
    { 
      id: 3, 
      action: "Work Submitted", 
      description: "Freelancer submitted work for Milestone #1",
      time: "3 days ago",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="22" y1="2" x2="11" y2="13"></line>
          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
        </svg>
      ),
      color: colors.status.info,
    },
    { 
      id: 4, 
      action: "Milestone Approved", 
      description: "Client approved Milestone #1 deliverables",
      time: "5 days ago",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="8 12 12 16 16 10"></polyline>
        </svg>
      ),
      color: colors.status.success,
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
          <polyline points="24 14 20 14 17 23 11 5 8 14 4 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Activity Timeline
      </h3>

      <div style={{ position: 'relative' }}>
        {/* Timeline line */}
        <div style={{
          position: 'absolute',
          left: '24px',
          top: '24px',
          bottom: '24px',
          width: '2px',
          background: colors.base.border,
        }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.lg }}>
          {activities.map((activity) => (
            <div
              key={activity.id}
              style={{
                display: 'flex',
                gap: spacing.lg,
                position: 'relative',
              }}
            >
              {/* Icon circle */}
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: activity.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                zIndex: 1,
              }}>
                {activity.icon}
              </div>

              {/* Content */}
              <div style={{
                flex: 1,
                background: colors.base.background,
                padding: spacing.lg,
                borderRadius: borderRadius.md,
                border: `1px solid ${colors.base.border}`,
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
