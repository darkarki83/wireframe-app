
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiListNotifications, apiMarkNotificationRead, apiMarkAllNotificationsRead, type Notification } from "../../lib/mockApi";

export default function NotificationsList() {
  const [items, setItems] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

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
      case "message": return "💬";
      case "status_change": return "🔄";
      case "contract": return "📝";
      default: return "🔔";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "new_bid": return "#3b82f6";
      case "message": return "#8b5cf6";
      case "status_change": return "#f59e0b";
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

  if (loading) return <div className="wrap"><p>Loading notifications...</p></div>;

  return (
    <div className="wrap">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h2 style={{ margin: 0 }}>Notifications</h2>
        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllRead}
            style={{
              padding: "8px 16px",
              background: "#f3f4f6",
              border: "1px solid #e5e7eb",
              borderRadius: 6,
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 500
            }}
          >
            Mark all as read
          </button>
        )}
      </div>

      {unreadCount > 0 && (
        <p style={{ color: "#666", marginBottom: 16 }}>
          You have {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
        </p>
      )}

      {items.length === 0 ? (
        <div className="card" style={{ textAlign: "center", padding: 40 }}>
          <p style={{ color: "#666", fontSize: 15 }}>No notifications yet</p>
        </div>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
          {items.map(notification => (
            <li
              key={notification.id}
              className="card"
              style={{
                background: notification.read ? "white" : "#f0f9ff",
                border: notification.read ? "1px solid #e5e7eb" : "1px solid #bae6fd",
                position: "relative"
              }}
            >
              <Link
                to={notification.link}
                style={{ textDecoration: "none", color: "inherit", display: "block" }}
                onClick={() => !notification.read && handleMarkAsRead(notification.id)}
              >
                <div style={{ display: "flex", gap: 12, alignItems: "start" }}>
                  <div
                    style={{
                      fontSize: 24,
                      width: 40,
                      height: 40,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: `${getTypeColor(notification.type)}15`,
                      borderRadius: 8,
                      flexShrink: 0
                    }}
                  >
                    {getNotificationIcon(notification.type)}
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 4 }}>
                      <strong style={{ fontSize: 15, color: "#111" }}>{notification.title}</strong>
                      {!notification.read && (
                        <span
                          style={{
                            width: 8,
                            height: 8,
                            background: "#3b82f6",
                            borderRadius: "50%",
                            flexShrink: 0,
                            marginLeft: 8,
                            marginTop: 6
                          }}
                        />
                      )}
                    </div>

                    <p style={{ margin: "4px 0", fontSize: 14, color: "#444", lineHeight: 1.4 }}>
                      {notification.message}
                    </p>

                    <div style={{ fontSize: 12, color: "#666", marginTop: 6 }}>
                      {formatDate(notification.createdAt)}
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
