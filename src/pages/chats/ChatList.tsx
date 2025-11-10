
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

type Chat = {
  id: string;
  type: "contract" | "proposal" | "direct";
  title: string;
  otherParty: string;
  lastMessage: string;
  lastMessageTime: string;
  unread: number;
  link: string;
  status?: string;
};

export default function ChatList() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<"all" | "contracts" | "proposals" | "direct">("all");

  const chats: Chat[] = [
    {
      id: "1",
      type: "contract",
      title: "E-commerce Platform Development",
      otherParty: "Sarah Johnson",
      lastMessage: "The payment gateway integration is complete. Ready for testing.",
      lastMessageTime: "5m ago",
      unread: 2,
      link: "/contracts/1",
      status: "active"
    },
    {
      id: "2",
      type: "proposal",
      title: "Mobile App Design Project",
      otherParty: "Michael Chen",
      lastMessage: "I've updated the terms. Please review and approve.",
      lastMessageTime: "1h ago",
      unread: 1,
      link: "/incoming-offers/2",
      status: "in_discussion"
    },
    {
      id: "3",
      type: "direct",
      title: "David Rodriguez",
      otherParty: "David Rodriguez",
      lastMessage: "Thanks for your interest! When can you start?",
      lastMessageTime: "3h ago",
      unread: 0,
      link: "/chats/3",
      status: undefined
    },
    {
      id: "4",
      type: "contract",
      title: "Dashboard Widgets Development",
      otherParty: "Emma Wilson",
      lastMessage: "Milestone 2 submitted for review",
      lastMessageTime: "1d ago",
      unread: 0,
      link: "/contracts/2",
      status: "active"
    },
    {
      id: "5",
      type: "proposal",
      title: "Website Redesign",
      otherParty: "Alex Turner",
      lastMessage: "Looking forward to working together!",
      lastMessageTime: "2d ago",
      unread: 0,
      link: "/incoming-offers/5",
      status: "agreed"
    }
  ];

  const filteredChats = chats.filter(chat => {
    if (filter === "all") return true;
    if (filter === "contracts") return chat.type === "contract";
    if (filter === "proposals") return chat.type === "proposal";
    if (filter === "direct") return chat.type === "direct";
    return true;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "contract": return "📋";
      case "proposal": return "💼";
      case "direct": return "👤";
      default: return "💬";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "contract": return "#8b5cf6";
      case "proposal": return "#3b82f6";
      case "direct": return "#059669";
      default: return "#666";
    }
  };

  const totalUnread = chats.reduce((sum, chat) => sum + chat.unread, 0);

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", paddingBottom: 16 }}>
      {/* Back Button */}
      <div style={{ padding: "0 16px", marginBottom: "16px", marginTop: "16px" }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            padding: "8px 16px",
            background: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "14px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          ← Back
        </button>
      </div>

      {/* Header */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20
      }}>
        <h2 style={{ margin: 0, fontSize: 24, fontWeight: 700 }}>Messages</h2>
        {totalUnread > 0 && (
          <div style={{
            background: "#dc2626",
            color: "white",
            padding: "4px 12px",
            borderRadius: 12,
            fontSize: 13,
            fontWeight: 600
          }}>
            {totalUnread} unread
          </div>
        )}
      </div>

      {/* Filter Tabs */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr 1fr",
        gap: 6,
        marginBottom: 20
      }}>
        <button
          onClick={() => setFilter("all")}
          style={{
            padding: "10px 8px",
            background: filter === "all" ? "#8b5cf6" : "white",
            color: filter === "all" ? "white" : "#666",
            border: filter === "all" ? "none" : "1px solid #e5e7eb",
            borderRadius: 8,
            fontWeight: 600,
            fontSize: 13,
            cursor: "pointer"
          }}
        >
          All
        </button>
        <button
          onClick={() => setFilter("contracts")}
          style={{
            padding: "10px 8px",
            background: filter === "contracts" ? "#8b5cf6" : "white",
            color: filter === "contracts" ? "white" : "#666",
            border: filter === "contracts" ? "none" : "1px solid #e5e7eb",
            borderRadius: 8,
            fontWeight: 600,
            fontSize: 13,
            cursor: "pointer"
          }}
        >
          Contracts
        </button>
        <button
          onClick={() => setFilter("proposals")}
          style={{
            padding: "10px 8px",
            background: filter === "proposals" ? "#8b5cf6" : "white",
            color: filter === "proposals" ? "white" : "#666",
            border: filter === "proposals" ? "none" : "1px solid #e5e7eb",
            borderRadius: 8,
            fontWeight: 600,
            fontSize: 13,
            cursor: "pointer"
          }}
        >
          Proposals
        </button>
        <button
          onClick={() => setFilter("direct")}
          style={{
            padding: "10px 8px",
            background: filter === "direct" ? "#8b5cf6" : "white",
            color: filter === "direct" ? "white" : "#666",
            border: filter === "direct" ? "none" : "1px solid #e5e7eb",
            borderRadius: 8,
            fontWeight: 600,
            fontSize: 13,
            cursor: "pointer"
          }}
        >
          Direct
        </button>
      </div>

      {/* Chat List */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {filteredChats.map((chat) => (
          <Link
            key={chat.id}
            to={chat.link}
            style={{
              display: "block",
              background: chat.unread > 0 ? "#f0f9ff" : "white",
              border: chat.unread > 0 ? "1px solid #93c5fd" : "1px solid #e5e7eb",
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
                  background: `${getTypeColor(chat.type)}20`,
                  borderRadius: 10,
                  flexShrink: 0
                }}
              >
                {getTypeIcon(chat.type)}
              </div>

              {/* Content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: 4,
                  gap: 8
                }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontSize: 15,
                      fontWeight: 600,
                      color: "#111827",
                      marginBottom: 2,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap"
                    }}>
                      {chat.title}
                    </div>
                    <div style={{
                      fontSize: 12,
                      color: "#6b7280",
                      fontWeight: 500
                    }}>
                      {chat.otherParty}
                    </div>
                  </div>
                  
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{
                      fontSize: 11,
                      color: "#9ca3af",
                      whiteSpace: "nowrap"
                    }}>
                      {chat.lastMessageTime}
                    </span>
                    {chat.unread > 0 && (
                      <span
                        style={{
                          background: "#3b82f6",
                          color: "white",
                          fontSize: 11,
                          fontWeight: 600,
                          padding: "2px 6px",
                          borderRadius: 10,
                          minWidth: 20,
                          textAlign: "center"
                        }}
                      >
                        {chat.unread}
                      </span>
                    )}
                  </div>
                </div>

                <p style={{
                  margin: 0,
                  fontSize: 14,
                  color: chat.unread > 0 ? "#374151" : "#6b7280",
                  fontWeight: chat.unread > 0 ? 500 : 400,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap"
                }}>
                  {chat.lastMessage}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Empty State */}
      {filteredChats.length === 0 && (
        <div style={{
          textAlign: "center",
          padding: "60px 20px",
          background: "white",
          border: "1px solid #e5e7eb",
          borderRadius: 12
        }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>💬</div>
          <div style={{ fontSize: 16, fontWeight: 600, color: "#374151", marginBottom: 8 }}>
            No {filter === "all" ? "" : filter} messages
          </div>
          <div style={{ fontSize: 14, color: "#9ca3af" }}>
            Your conversations will appear here
          </div>
        </div>
      )}
    </div>
  );
}
