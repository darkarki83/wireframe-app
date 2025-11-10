
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiListNotifications, apiMarkNotificationRead, apiMarkAllNotificationsRead, type Notification } from "../../lib/mockApi";

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
      case "new_bid": return "💼";
      case "new_offer": return "📧";
      case "message": return "💬";
      case "status_change": return "🔄";
      case "conditions_updated": return "📝";
      case "proposal_approved": return "✅";
      case "contract": return "📋";
      default: return "🔔";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "new_bid": return "#3b82f6";
      case "new_offer": return "#8b5cf6";
      case "message": return "#3b82f6";
      case "status_change": return "#f59e0b";
      case "conditions_updated": return "#f59e0b";
      case "proposal_approved": return "#059669";
      case "contract": return "#059669";
      default: return "#666";
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

  if (loading) return (
    <div style={{ maxWidth: 600, margin: "0 auto", paddingBottom: 16 }}>
      <p>Loading notifications...</p>
    </div>
  );

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", paddingBottom: 16 }}>
      {/* Header */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20
      }}>
        <h2 style={{ margin: 0, fontSize: 24, fontWeight: 700 }}>Notifications</h2>
        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllRead}
            style={{
              padding: "8px 16px",
              background: "#8b5cf6",
              color: "white",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 600
            }}
          >
            Mark all read
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div style={{
        display: "flex",
        gap: 8,
        marginBottom: 20,
        borderBottom: "2px solid #e5e7eb"
      }}>
        <button
          onClick={() => setFilter("all")}
          style={{
            flex: 1,
            padding: "12px 16px",
            background: "transparent",
            border: "none",
            borderBottom: filter === "all" ? "3px solid #8b5cf6" : "3px solid transparent",
            color: filter === "all" ? "#8b5cf6" : "#666",
            fontWeight: 600,
            fontSize: 15,
            cursor: "pointer",
            marginBottom: -2
          }}
        >
          All ({items.length})
        </button>
        <button
          onClick={() => setFilter("unread")}
          style={{
            flex: 1,
            padding: "12px 16px",
            background: "transparent",
            border: "none",
            borderBottom: filter === "unread" ? "3px solid #8b5cf6" : "3px solid transparent",
            color: filter === "unread" ? "#8b5cf6" : "#666",
            fontWeight: 600,
            fontSize: 15,
            cursor: "pointer",
            marginBottom: -2
          }}
        >
          Unread ({unreadCount})
        </button>
      </div>

      {/* Notifications List */}
      {filteredItems.length === 0 ? (
        <div style={{
          textAlign: "center",
          padding: "60px 20px",
          background: "white",
          border: "1px solid #e5e7eb",
          borderRadius: 12
        }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>🔔</div>
          <div style={{ fontSize: 16, fontWeight: 600, color: "#374151", marginBottom: 8 }}>
            No {filter === "unread" ? "unread" : ""} notifications
          </div>
          <div style={{ fontSize: 14, color: "#9ca3af" }}>
            {filter === "unread" 
              ? "You're all caught up!"
              : "You'll see notifications here when you receive them"}
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {filteredItems.map(notification => (
            <Link
              key={notification.id}
              to={notification.link}
              onClick={() => !notification.read && handleMarkAsRead(notification.id)}
              style={{
                display: "block",
                background: notification.read ? "white" : "#f0f9ff",
                border: notification.read ? "1px solid #e5e7eb" : "1px solid #93c5fd",
                borderRadius: 12,
                padding: 16,
                textDecoration: "none",
                color: "inherit",
                transition: "all 0.2s",
                position: "relative"
              }}
            >
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                {/* Icon */}
                <div
                  style={{
                    fontSize: 24,
                    width: 48,
                    height: 48,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: notification.read ? "#f9fafb" : `${getTypeColor(notification.type)}20`,
                    borderRadius: 10,
                    flexShrink: 0
                  }}
                >
                  {getNotificationIcon(notification.type)}
                </div>

                {/* Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: 6,
                    gap: 8
                  }}>
                    <strong style={{
                      fontSize: 15,
                      fontWeight: 600,
                      color: "#111827",
                      lineHeight: 1.3
                    }}>
                      {notification.title}
                    </strong>
                    {!notification.read && (
                      <span
                        style={{
                          width: 10,
                          height: 10,
                          background: "#3b82f6",
                          borderRadius: "50%",
                          flexShrink: 0,
                          marginTop: 4
                        }}
                      />
                    )}
                  </div>

                  <p style={{
                    margin: "0 0 8px 0",
                    fontSize: 14,
                    color: "#6b7280",
                    lineHeight: 1.5
                  }}>
                    {notification.message}
                  </p>

                  <div style={{
                    fontSize: 12,
                    color: "#9ca3af",
                    fontWeight: 500
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
  );
}
