import { colors, spacing, borderRadius, typography, shadows, components } from "../../../lib/designTokens";

export default function ChatTab() {
  const messages = [
    { id: 1, sender: "Client", text: "Hi! Can we discuss the project timeline?", time: "10:30 AM", isMe: false },
    { id: 2, sender: "You", text: "Sure! I can deliver the first milestone by next week.", time: "10:32 AM", isMe: true },
    { id: 3, sender: "Client", text: "Perfect! That works for me.", time: "10:35 AM", isMe: false },
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
          <path d="M23 17a2 2 0 0 1-2 2H9l-4 4V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" fill={colors.primary.light} />
          <path d="M23 17a2 2 0 0 1-2 2H9l-4 4V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Chat
      </h3>      <div style={{
        background: colors.base.background,
        border: `1px solid ${colors.base.border}`,
        borderRadius: borderRadius.sm,
        padding: spacing.lg,
        minHeight: '300px',
        maxHeight: '500px',
        overflowY: 'auto',
        marginBottom: spacing.lg,
      }}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              display: 'flex',
              justifyContent: msg.isMe ? 'flex-end' : 'flex-start',
              marginBottom: spacing.md,
            }}
          >
            <div
              style={{
                maxWidth: '70%',
                padding: spacing.md,
                borderRadius: borderRadius.md,
                background: msg.isMe ? colors.primary.main : colors.base.surface,
                color: msg.isMe ? colors.text.inverse : colors.text.default,
                boxShadow: shadows.md,
              }}
            >
              <div style={{
                fontSize: typography.fontSize.caption,
                fontWeight: typography.fontWeight.semibold,
                marginBottom: spacing.xs,
                opacity: 0.8,
              }}>
                {msg.sender}
              </div>
              <div style={{
                fontSize: typography.fontSize.body,
                lineHeight: typography.lineHeight.normal,
                marginBottom: spacing.xs,
              }}>
                {msg.text}
              </div>
              <div style={{
                fontSize: typography.fontSize.caption,
                opacity: 0.7,
              }}>
                {msg.time}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: spacing.sm }}>
        <input
          type="text"
          placeholder="Type a message..."
          style={{
            ...components.input,
            flex: 1,
          }}
        />
        <button
          style={{
            ...components.button.primary,
            padding: `${spacing.md} ${spacing.xl}`,
            fontSize: typography.fontSize.body,
            cursor: 'pointer',
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
