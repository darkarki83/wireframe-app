import { useState } from "react";
import { Link } from "react-router-dom";

// Mock data for demonstration
type Offer = {
  id: string;
  title: string;
  description: string;
  status: "active" | "pending" | "accepted" | "rejected";
  createdAt: string;
};

export default function OffersPage() {
  const [activeTab, setActiveTab] = useState<"my" | "incoming">("my");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [myOffers, setMyOffers] = useState<Offer[]>([
    {
      id: "1",
      title: "Website Development Proposal",
      description: "Full-stack development for e-commerce platform with React and Node.js",
      status: "active",
      createdAt: "2025-11-08"
    },
    {
      id: "2",
      title: "Mobile App Design",
      description: "UI/UX design for iOS and Android mobile application",
      status: "pending",
      createdAt: "2025-11-07"
    }
  ]);
  const [incomingOffers, setIncomingOffers] = useState<Offer[]>([
    {
      id: "3",
      title: "Logo Design Project",
      description: "Looking for creative logo design for tech startup",
      status: "pending",
      createdAt: "2025-11-09"
    },
    {
      id: "4",
      title: "SEO Optimization",
      description: "Need SEO expert to improve website ranking",
      status: "pending",
      createdAt: "2025-11-08"
    }
  ]);

  const handleCreateOffer = () => {
    if (!title.trim() || !description.trim()) return;

    const newOffer: Offer = {
      id: Date.now().toString(),
      title,
      description,
      status: "active",
      createdAt: new Date().toISOString().split('T')[0]
    };

    setMyOffers([newOffer, ...myOffers]);
    setTitle("");
    setDescription("");
    setShowCreateForm(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "#8b5cf6";
      case "accepted": return "#059669";
      case "pending": return "#f59e0b";
      case "rejected": return "#dc2626";
      default: return "#666";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return "▶️";
      case "accepted": return "✅";
      case "pending": return "⏳";
      case "rejected": return "❌";
      default: return "📄";
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", paddingBottom: 16 }}>
      {/* Tabs */}
      <div style={{
        display: "flex",
        gap: 8,
        marginBottom: 24,
        borderBottom: "2px solid #e5e7eb"
      }}>
        <button
          onClick={() => setActiveTab("my")}
          style={{
            flex: 1,
            padding: "12px 16px",
            background: "transparent",
            border: "none",
            borderBottom: activeTab === "my" ? "3px solid #8b5cf6" : "3px solid transparent",
            color: activeTab === "my" ? "#8b5cf6" : "#666",
            fontWeight: activeTab === "my" ? 700 : 500,
            fontSize: 15,
            cursor: "pointer",
            marginBottom: -2
          }}
        >
          My Offers
        </button>
        <button
          onClick={() => setActiveTab("incoming")}
          style={{
            flex: 1,
            padding: "12px 16px",
            background: "transparent",
            border: "none",
            borderBottom: activeTab === "incoming" ? "3px solid #8b5cf6" : "3px solid transparent",
            color: activeTab === "incoming" ? "#8b5cf6" : "#666",
            fontWeight: activeTab === "incoming" ? 700 : 500,
            fontSize: 15,
            cursor: "pointer",
            marginBottom: -2
          }}
        >
          Incoming Offers
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "my" ? (
        <div>
          {/* Create Offer Button */}
          {!showCreateForm ? (
            <button
              onClick={() => setShowCreateForm(true)}
              style={{
                width: "100%",
                padding: "16px",
                background: "#8b5cf6",
                color: "white",
                border: "none",
                borderRadius: 12,
                fontSize: 16,
                fontWeight: 600,
                cursor: "pointer",
                marginBottom: 24,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8
              }}
            >
              <span style={{ fontSize: 20 }}>➕</span>
              Create Offer
            </button>
          ) : (
            /* Create Offer Form */
            <div style={{
              background: "#f9fafb",
              border: "1px solid #e5e7eb",
              borderRadius: 12,
              padding: 20,
              marginBottom: 24
            }}>
              <h3 style={{ margin: "0 0 16px 0", fontSize: 18, fontWeight: 600 }}>
                Create New Offer
              </h3>

              <div style={{ marginBottom: 16 }}>
                <label style={{
                  display: "block",
                  marginBottom: 8,
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#374151"
                }}>
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter offer title"
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "1px solid #d1d5db",
                    borderRadius: 8,
                    fontSize: 15,
                    boxSizing: "border-box"
                  }}
                />
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={{
                  display: "block",
                  marginBottom: 8,
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#374151"
                }}>
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your offer"
                  rows={4}
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "1px solid #d1d5db",
                    borderRadius: 8,
                    fontSize: 15,
                    boxSizing: "border-box",
                    resize: "vertical"
                  }}
                />
              </div>

              <div style={{ display: "flex", gap: 12 }}>
                <button
                  onClick={handleCreateOffer}
                  disabled={!title.trim() || !description.trim()}
                  style={{
                    flex: 1,
                    padding: "12px",
                    background: title.trim() && description.trim() ? "#8b5cf6" : "#d1d5db",
                    color: "white",
                    border: "none",
                    borderRadius: 8,
                    fontSize: 15,
                    fontWeight: 600,
                    cursor: title.trim() && description.trim() ? "pointer" : "not-allowed"
                  }}
                >
                  Create
                </button>
                <button
                  onClick={() => {
                    setShowCreateForm(false);
                    setTitle("");
                    setDescription("");
                  }}
                  style={{
                    flex: 1,
                    padding: "12px",
                    background: "white",
                    color: "#666",
                    border: "1px solid #d1d5db",
                    borderRadius: 8,
                    fontSize: 15,
                    fontWeight: 600,
                    cursor: "pointer"
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* My Offers List */}
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16, color: "#374151" }}>
              My Offers ({myOffers.length})
            </h3>
            {myOffers.length === 0 ? (
              <div style={{
                textAlign: "center",
                padding: "40px 20px",
                color: "#9ca3af",
                fontSize: 14
              }}>
                No offers yet. Create your first offer!
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {myOffers.map((offer) => (
                  <Link
                    key={offer.id}
                    to={`/offers/${offer.id}`}
                    style={{
                      textDecoration: "none",
                      color: "inherit"
                    }}
                  >
                    <div
                      style={{
                        background: "white",
                        border: "1px solid #e5e7eb",
                        borderRadius: 12,
                        padding: 16,
                        cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "#8b5cf6";
                        e.currentTarget.style.boxShadow = "0 4px 12px rgba(139, 92, 246, 0.15)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "#e5e7eb";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        marginBottom: 8,
                        gap: 12
                      }}>
                        <div style={{ fontWeight: 600, fontSize: 15, flex: 1 }}>
                          {offer.title}
                        </div>
                        <div style={{
                          background: getStatusColor(offer.status),
                          color: "white",
                          padding: "4px 12px",
                          borderRadius: 20,
                          fontSize: 11,
                          fontWeight: 600,
                          textTransform: "uppercase",
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                          whiteSpace: "nowrap"
                        }}>
                          <span>{getStatusIcon(offer.status)}</span>
                          <span>{offer.status}</span>
                        </div>
                      </div>
                      <p style={{
                        fontSize: 13,
                        color: "#666",
                        margin: "0 0 8px 0",
                        lineHeight: 1.5
                      }}>
                        {offer.description}
                      </p>
                      <div style={{ fontSize: 12, color: "#9ca3af" }}>
                        {offer.createdAt}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Incoming Offers Tab */
        <div>
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16, color: "#374151" }}>
            Incoming Offers ({incomingOffers.length})
          </h3>
          {incomingOffers.length === 0 ? (
            <div style={{
              textAlign: "center",
              padding: "40px 20px",
              color: "#9ca3af",
              fontSize: 14
            }}>
              No incoming offers yet
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {incomingOffers.map((offer) => (
                <div
                  key={offer.id}
                  style={{
                    background: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: 12,
                    padding: 16
                  }}
                >
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: 8,
                    gap: 12
                  }}>
                    <div style={{ fontWeight: 600, fontSize: 15, flex: 1 }}>
                      {offer.title}
                    </div>
                    <div style={{
                      background: getStatusColor(offer.status),
                      color: "white",
                      padding: "4px 12px",
                      borderRadius: 20,
                      fontSize: 11,
                      fontWeight: 600,
                      textTransform: "uppercase",
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      whiteSpace: "nowrap"
                    }}>
                      <span>{getStatusIcon(offer.status)}</span>
                      <span>{offer.status}</span>
                    </div>
                  </div>
                  <p style={{
                    fontSize: 13,
                    color: "#666",
                    margin: "0 0 8px 0",
                    lineHeight: 1.5
                  }}>
                    {offer.description}
                  </p>
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: 12
                  }}>
                    <div style={{ fontSize: 12, color: "#9ca3af" }}>
                      {offer.createdAt}
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button style={{
                        padding: "6px 16px",
                        background: "#059669",
                        color: "white",
                        border: "none",
                        borderRadius: 6,
                        fontSize: 13,
                        fontWeight: 600,
                        cursor: "pointer"
                      }}>
                        Accept
                      </button>
                      <button style={{
                        padding: "6px 16px",
                        background: "white",
                        color: "#dc2626",
                        border: "1px solid #dc2626",
                        borderRadius: 6,
                        fontSize: 13,
                        fontWeight: 600,
                        cursor: "pointer"
                      }}>
                        Decline
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
