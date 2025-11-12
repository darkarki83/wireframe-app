import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiListNotifications, apiMarkNotificationRead, apiMarkAllNotificationsRead, type Notification } from "../../lib/mockApi";
import { colors, spacing, typography, borderRadius, shadows, components } from "../../lib/designTokens";

export default function NotificationsList() {
  const [items, setItems] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  useEffect(() => {
    apiListNotifications().then(data => {
      setItems(data);
      setLoading(false);
    });
  }, []);

  const handleMarkAsRead = async (id: string) => {
    await apiMarkNotificationRead(id);
    setItems(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleMarkAllRead = async () => {
    await apiMarkAllNotificationsRead();
    setItems(prev => prev.map(n => ({ ...n, read: true })));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "new_bid":
      case "new_offer":
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="8" fill={colors.primary.light} />
            <circle cx="12" cy="12" r="8" stroke={colors.primary.main} strokeWidth="1.5" />
            <path d="M12 6v12M14.5 8.5h-3a1.5 1.5 0 0 0 0 3h3a1.5 1.5 0 0 1 0 3h-3" stroke={colors.primary.main} strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        );
      case "message":
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M3 6h18a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" fill={colors.primary.light} />
            <path d="M3 6h18a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" stroke={colors.primary.main} strokeWidth="1.5" />
            <path d="M1 8l11 7 11-7" stroke={colors.primary.main} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      case "status_change":
      case "conditions_updated":
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" fill={colors.status.warning + "20"} />
            <path d="M6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" stroke={colors.status.warning} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M14 2v6h6M8 13h8M8 17h5" stroke={colors.status.warning} strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        );
      case "proposal_approved":
      case "contract":
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="9" fill={colors.status.success + "20"} />
            <circle cx="12" cy="12" r="9" stroke={colors.status.success} strokeWidth="1.5" />
            <path d="M8 12l3 3 5-6" stroke={colors.status.success} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      default:
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" fill={colors.primary.light} opacity="0.3" />
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" stroke={colors.primary.main} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  const unreadCount = items.filter(n => !n.read).length;
  const filteredItems = filter === "unread" ? items.filter(n => !n.read) : items;

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: colors.base.background,
        paddingBottom: '80px',
      }}>
        <div style={{ padding: spacing.lg }}>
          <p style={{ color: colors.text.secondary }}>Loading notifications...</p>
        </div>
      </div>
    );
  }

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
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: spacing.lg,
        }}>
          <h2 style={{
            margin: 0,
            fontSize: typography.fontSize.h1,
            fontWeight: typography.fontWeight.semibold,
            color: colors.text.primary,
          }}>
            Notifications
          </h2>
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllRead}
              style={{
                ...components.button.secondary,
                padding: `${spacing.sm} ${spacing.lg}`,
                height: 'auto',
                cursor: "pointer",
                fontSize: typography.fontSize.caption,
              }}
            >
              Mark all read
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{
        padding: `0 ${spacing.lg}`,
      }}>
        <div style={{
          display: "flex",
          gap: spacing.sm,
          marginBottom: spacing.lg,
          borderBottom: `1px solid ${colors.base.border}`,
        }}>
          <button
            onClick={() => setFilter("all")}
            style={{
              flex: 1,
              padding: `${spacing.md} ${spacing.lg}`,
              background: "transparent",
              border: "none",
              borderBottom: filter === "all" ? `2px solid ${colors.primary.main}` : "2px solid transparent",
              color: filter === "all" ? colors.primary.main : colors.text.secondary,
              fontWeight: typography.fontWeight.semibold,
              fontSize: typography.fontSize.body,
              cursor: "pointer",
              marginBottom: -1,
            }}
          >
            All ({items.length})
          </button>
          <button
            onClick={() => setFilter("unread")}
            style={{
              flex: 1,
              padding: `${spacing.md} ${spacing.lg}`,
              background: "transparent",
              border: "none",
              borderBottom: filter === "unread" ? `2px solid ${colors.primary.main}` : "2px solid transparent",
              color: filter === "unread" ? colors.primary.main : colors.text.secondary,
              fontWeight: typography.fontWeight.semibold,
              fontSize: typography.fontSize.body,
              cursor: "pointer",
              marginBottom: -1,
            }}
          >
            Unread ({unreadCount})
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div style={{
        padding: `0 ${spacing.lg} ${spacing.lg}`,
      }}>
        {filteredItems.length === 0 ? (
          <div style={{
            ...components.card,
            textAlign: "center",
            padding: spacing.xxxl,
          }}>
            <div style={{
              fontSize: '48px',
              marginBottom: spacing.lg,
            }}>
              🔔
            </div>
            <div style={{
              fontSize: typography.fontSize.h2,
              fontWeight: typography.fontWeight.semibold,
              color: colors.text.primary,
              marginBottom: spacing.sm,
            }}>
              No {filter === "unread" ? "unread" : ""} notifications
            </div>
            <div style={{
              fontSize: typography.fontSize.body,
              color: colors.text.secondary,
            }}>
              {filter === "unread"
                ? "You're all caught up!"
                : "You'll see notifications here when you receive them"}
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: spacing.sm }}>
            {filteredItems.map(notification => (
              <Link
                key={notification.id}
                to={notification.link}
                onClick={() => !notification.read && handleMarkAsRead(notification.id)}
                style={{
                  display: "block",
                  background: notification.read ? colors.base.surface : colors.primary.subtle,
                  border: notification.read ? 'none' : `1px solid ${colors.primary.light}`,
                  borderRadius: borderRadius.lg,
                  padding: spacing.lg,
                  textDecoration: "none",
                  color: "inherit",
                  transition: "all 0.2s",
                  position: "relative",
                  boxShadow: shadows.sm,
                }}
              >
                <div style={{ display: "flex", gap: spacing.md, alignItems: "flex-start" }}>
                  {/* Icon */}
                  <div style={{
                    width: 48,
                    height: 48,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: notification.read ? colors.base.background : colors.base.surface,
                    borderRadius: borderRadius.md,
                    flexShrink: 0,
                  }}>
                    {getNotificationIcon(notification.type)}
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: spacing.xs,
                      gap: spacing.sm,
                    }}>
                      <strong style={{
                        fontSize: typography.fontSize.body,
                        fontWeight: typography.fontWeight.semibold,
                        color: colors.text.primary,
                        lineHeight: typography.lineHeight.normal,
                      }}>
                        {notification.title}
                      </strong>
                      {!notification.read && (
                        <span style={{
                          width: 8,
                          height: 8,
                          background: colors.primary.main,
                          borderRadius: borderRadius.full,
                          flexShrink: 0,
                          marginTop: 4,
                        }} />
                      )}
                    </div>

                    <p style={{
                      margin: `0 0 ${spacing.sm} 0`,
                      fontSize: typography.fontSize.body,
                      color: colors.text.secondary,
                      lineHeight: typography.lineHeight.normal,
                    }}>
                      {notification.message}
                    </p>

                    <div style={{
                      fontSize: typography.fontSize.caption,
                      color: colors.text.secondary,
                      fontWeight: typography.fontWeight.medium,
                    }}>
                      {formatDate(notification.createdAt)}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
