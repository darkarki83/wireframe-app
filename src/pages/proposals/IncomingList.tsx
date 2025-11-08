
import { useEffect, useState } from "react";
import { apiListIncoming, type Proposal } from "../../lib/mockApi";
import { Link } from "react-router-dom";

export default function IncomingList(){
  const [items, setItems] = useState<Proposal[]>([]);
  const [filter, setFilter] = useState<string>("active"); // active, all, accepted, rejected

  useEffect(()=>{ apiListIncoming().then(setItems); },[]);

  const handleAccept = (offerId: string) => {
    alert(`Accept offer ${offerId} - will create contract (mock)`);
  };

  const handleDecline = (offerId: string) => {
    alert(`Decline offer ${offerId} (mock)`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted": return "#059669";
      case "rejected": return "#dc2626";
      case "in_discussion": return "#f59e0b";
      default: return "#666";
    }
  };

  const filteredItems = items.filter(item => {
    if (filter === "active") return item.status === "sent" || item.status === "in_discussion";
    if (filter === "accepted") return item.status === "accepted";
    if (filter === "rejected") return item.status === "rejected";
    return true; // all
  });

  return <div className="wrap">
    <h2>Incoming Job Offers</h2>
    <p style={{ color: "#666", marginBottom: 16 }}>Direct job offers from clients</p>

    {/* Filter Tabs */}
    <div style={{ display: "flex", gap: 8, marginBottom: 24, borderBottom: "1px solid #e5e7eb" }}>
      <button
        onClick={() => setFilter("active")}
        style={{
          padding: "8px 16px",
          background: "transparent",
          border: "none",
          borderBottom: filter === "active" ? "2px solid #3b82f6" : "2px solid transparent",
          color: filter === "active" ? "#3b82f6" : "#666",
          cursor: "pointer",
          fontSize: 14,
          fontWeight: filter === "active" ? 600 : 400
        }}
      >
        Active ({items.filter(i => i.status === "sent" || i.status === "in_discussion").length})
      </button>
      <button
        onClick={() => setFilter("accepted")}
        style={{
          padding: "8px 16px",
          background: "transparent",
          border: "none",
          borderBottom: filter === "accepted" ? "2px solid #3b82f6" : "2px solid transparent",
          color: filter === "accepted" ? "#3b82f6" : "#666",
          cursor: "pointer",
          fontSize: 14,
          fontWeight: filter === "accepted" ? 600 : 400
        }}
      >
        Accepted ({items.filter(i => i.status === "accepted").length})
      </button>
      <button
        onClick={() => setFilter("rejected")}
        style={{
          padding: "8px 16px",
          background: "transparent",
          border: "none",
          borderBottom: filter === "rejected" ? "2px solid #3b82f6" : "2px solid transparent",
          color: filter === "rejected" ? "#3b82f6" : "#666",
          cursor: "pointer",
          fontSize: 14,
          fontWeight: filter === "rejected" ? 600 : 400
        }}
      >
        Declined ({items.filter(i => i.status === "rejected").length})
      </button>
      <button
        onClick={() => setFilter("all")}
        style={{
          padding: "8px 16px",
          background: "transparent",
          border: "none",
          borderBottom: filter === "all" ? "2px solid #3b82f6" : "2px solid transparent",
          color: filter === "all" ? "#3b82f6" : "#666",
          cursor: "pointer",
          fontSize: 14,
          fontWeight: filter === "all" ? 600 : 400
        }}
      >
        All ({items.length})
      </button>
    </div>

    <ul className="grid">
      {filteredItems.map(p=>(
        <li key={p.id} className="card">
          <div style={{ marginBottom: 8 }}>
            <strong style={{ fontSize: 16 }}>{p.title}</strong>
            <div style={{ fontSize: 13, color: "#666", marginTop: 4 }}>
              From: <strong>{p.author}</strong>
            </div>
          </div>

          {p.description && (
            <p style={{ margin: "8px 0", fontSize: 14, color: "#444", lineHeight: 1.5 }}>
              {p.description}
            </p>
          )}

          <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginTop: 12, paddingTop: 12, borderTop: "1px solid #e5e7eb" }}>
            <span
              style={{
                fontSize: 13,
                color: getStatusColor(p.status),
                fontWeight: 500,
                textTransform: "capitalize",
                padding: "4px 8px",
                background: `${getStatusColor(p.status)}15`,
                borderRadius: 4
              }}
            >
              {p.status.replace("_", " ")}
            </span>
          </div>

          <div style={{ marginTop: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
            <Link
              to={`/proposals/${p.id}/chat`}
              style={{
                padding: "6px 12px",
                background: "#3b82f6",
                color: "white",
                borderRadius: 4,
                textDecoration: "none",
                fontSize: 13,
                fontWeight: 500
              }}
            >
              💬 Discuss
            </Link>

            <Link
              to={`/proposals/${p.id}`}
              style={{
                padding: "6px 12px",
                background: "#f3f4f6",
                border: "1px solid #e5e7eb",
                borderRadius: 4,
                textDecoration: "none",
                fontSize: 13,
                color: "#333"
              }}
            >
              View Details
            </Link>

            {p.status === "sent" && (
              <>
                <button
                  onClick={() => handleAccept(p.id)}
                  style={{
                    padding: "6px 12px",
                    background: "#059669",
                    color: "white",
                    border: "none",
                    borderRadius: 4,
                    cursor: "pointer",
                    fontSize: 13,
                    fontWeight: 500
                  }}
                >
                  Accept
                </button>
                <button
                  onClick={() => handleDecline(p.id)}
                  style={{
                    padding: "6px 12px",
                    background: "#dc2626",
                    color: "white",
                    border: "none",
                    borderRadius: 4,
                    cursor: "pointer",
                    fontSize: 13,
                    fontWeight: 500
                  }}
                >
                  Decline
                </button>
              </>
            )}

            {p.status === "in_discussion" && (
              <>
                <Link
                  to={`/chats/${p.id}`}
                  style={{
                    padding: "6px 12px",
                    background: "#3b82f6",
                    color: "white",
                    borderRadius: 4,
                    textDecoration: "none",
                    fontSize: 13,
                    fontWeight: 500
                  }}
                >
                  Continue Chat
                </Link>
                <button
                  onClick={() => handleAccept(p.id)}
                  style={{
                    padding: "6px 12px",
                    background: "#059669",
                    color: "white",
                    border: "none",
                    borderRadius: 4,
                    cursor: "pointer",
                    fontSize: 13,
                    fontWeight: 500
                  }}
                >
                  Accept
                </button>
                <button
                  onClick={() => handleDecline(p.id)}
                  style={{
                    padding: "6px 12px",
                    background: "#dc2626",
                    color: "white",
                    border: "none",
                    borderRadius: 4,
                    cursor: "pointer",
                    fontSize: 13,
                    fontWeight: 500
                  }}
                >
                  Decline
                </button>
              </>
            )}

            {p.status === "accepted" && (
              <Link
                to="/contracts/c1"
                style={{
                  padding: "6px 12px",
                  background: "#059669",
                  color: "white",
                  borderRadius: 4,
                  textDecoration: "none",
                  fontSize: 13,
                  fontWeight: 500
                }}
              >
                View Contract
              </Link>
            )}

            {p.status === "rejected" && (
              <span style={{ fontSize: 13, color: "#666", fontStyle: "italic", padding: "6px 0" }}>
                This offer was declined
              </span>
            )}
          </div>
        </li>
      ))}
    </ul>
  </div>
}
