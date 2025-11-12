import { colors, spacing, borderRadius, typography, shadows, components } from "../../../lib/designTokens";

export default function ChatTab() {
  const messages = [
    { id: 1, sender: "Sarah Chen", text: "Hi! Can we discuss the project timeline?", time: "10:30 AM", isMe: false },
    { id: 2, sender: "You", text: "Sure! I can deliver the first milestone by next week.", time: "10:32 AM", isMe: true },
    { id: 3, sender: "Sarah Chen", text: "Perfect! That works for me.", time: "10:35 AM", isMe: false },
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
        Messages
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.md, marginBottom: spacing.lg }}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              background: msg.isMe ? colors.primary.main : colors.base.background,
              padding: spacing.lg,
              borderRadius: borderRadius.md,
              border: msg.isMe ? 'none' : `1px solid ${colors.base.border}`,
              alignSelf: msg.isMe ? 'flex-end' : 'flex-start',
              maxWidth: '75%',
            }}
          >
            <div style={{
              fontSize: typography.fontSize.caption,
              fontWeight: typography.fontWeight.semibold,
              marginBottom: spacing.xs,
              color: msg.isMe ? colors.text.inverse : colors.text.secondary,
            }}>
              {msg.sender}
            </div>
            <div style={{
              fontSize: typography.fontSize.body,
              lineHeight: typography.lineHeight.normal,
              marginBottom: spacing.xs,
              color: msg.isMe ? colors.text.inverse : colors.text.default,
            }}>
              {msg.text}
            </div>
            <div style={{
              fontSize: typography.fontSize.caption,
              color: msg.isMe ? colors.text.inverse : colors.text.secondary,
              opacity: 0.7,
            }}>
              {msg.time}
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
