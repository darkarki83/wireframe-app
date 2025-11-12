import { colors, spacing, borderRadius, typography, shadows } from "../../../lib/designTokens";

export default function FilesTab() {
  const files = [
    { id: 1, name: "Project Requirements.pdf", size: "2.4 MB", date: "Jan 15, 2024", icon: "📄" },
    { id: 2, name: "Design Mockups.fig", size: "8.1 MB", date: "Jan 18, 2024", icon: "🎨" },
    { id: 3, name: "Logo Assets.zip", size: "15.3 MB", date: "Jan 20, 2024", icon: "📦" },
  ];

  return (
    <div style={{
      background: colors.base.surface,
      borderRadius: borderRadius.md,
      padding: spacing.xl,
      boxShadow: shadows.sm,
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.lg,
      }}>
        <h3 style={{ 
          fontSize: typography.fontSize.h2, 
          fontWeight: typography.fontWeight.semibold, 
          margin: 0,
          color: colors.text.default,
          display: 'flex',
          alignItems: 'center',
          gap: spacing.sm,
        }}>
          <svg width="20" height="20" viewBox="0 0 28 28" fill="none">
            <path d="M15 4H8a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V11z" fill={colors.primary.light} />
            <path d="M15 4H8a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V11z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <polyline points="15 4 15 11 22 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Files
        </h3>
        <button
          style={{
            padding: `${spacing.sm} ${spacing.lg}`,
            background: colors.primary.main,
            color: colors.text.inverse,
            border: 'none',
            borderRadius: borderRadius.sm,
            fontSize: typography.fontSize.caption,
            fontWeight: typography.fontWeight.semibold,
            cursor: 'pointer',
          }}
        >
          + Upload File
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.md }}>
        {files.map((file) => (
          <div
            key={file.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: spacing.lg,
              background: colors.base.background,
              border: `1px solid ${colors.base.border}`,
              borderRadius: borderRadius.md,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = colors.primary.main;
              e.currentTarget.style.boxShadow = shadows.sm;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = colors.base.border;
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: spacing.md, flex: 1 }}>
              <div style={{
                width: '48px',
                height: '48px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: colors.primary.light,
                borderRadius: borderRadius.sm,
              }}>
                <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
                  <path d="M15 4H8a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V11z" fill={colors.primary.main} opacity="0.2" />
                  <path d="M15 4H8a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V11z" stroke={colors.primary.main} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <polyline points="15 4 15 11 22 11" stroke={colors.primary.main} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <div style={{
                  fontSize: typography.fontSize.body,
                  fontWeight: typography.fontWeight.semibold,
                  color: colors.text.default,
                  marginBottom: spacing.xs,
                }}>
                  {file.name}
                </div>
                <div style={{
                  fontSize: typography.fontSize.caption,
                  color: colors.text.secondary,
                }}>
                  {file.size} • {file.date}
                </div>
              </div>
            </div>
            <button
              style={{
                padding: `${spacing.sm} ${spacing.md}`,
                background: 'transparent',
                color: colors.primary.main,
                border: `1px solid ${colors.primary.main}`,
                borderRadius: borderRadius.sm,
                fontSize: typography.fontSize.caption,
                fontWeight: typography.fontWeight.semibold,
                cursor: 'pointer',
              }}
            >
              Download
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
