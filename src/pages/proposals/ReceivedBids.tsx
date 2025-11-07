
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiListReceivedBids, type Proposal } from "../../lib/mockApi";

export default function ReceivedBids() {
  const [items, setItems] = useState<Proposal[]>([]);

  useEffect(() => {
    apiListReceivedBids().then(setItems);
  }, []);

  const handleAccept = (bidId: string) => {
    alert(`Accept bid ${bidId} - will create contract (mock)`);
  };

  const handleReject = (bidId: string) => {
    alert(`Reject bid ${bidId} (mock)`);
  };

  const handleDiscuss = (bidId: string) => {
    alert(`Start discussion with bidder (mock)`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted": return "#059669";
      case "rejected": return "#dc2626";
      case "in_discussion": return "#f59e0b";
      default: return "#666";
    }
  };

  return (
    <div className="wrap">
      <h2>Received Bids</h2>
      <p style={{ color: "#666", marginBottom: 16 }}>Proposals received on your job postings</p>

      <ul className="grid">
        {items.map(bid => (
          <li key={bid.id} className="card">
            <div style={{ marginBottom: 8 }}>
              <div style={{ fontSize: 13, color: "#666", marginBottom: 4 }}>
                On: <strong>{bid.jobTitle}</strong>
              </div>
              <strong style={{ fontSize: 15 }}>{bid.title}</strong>
              <div style={{ fontSize: 13, color: "#666", marginTop: 4 }}>
                From: {bid.author}
              </div>
            </div>

            {bid.description && (
              <p style={{ margin: "8px 0", fontSize: 14, color: "#444" }}>
                {bid.description}
              </p>
            )}

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12 }}>
              <span style={{ fontWeight: 500, color: "#059669" }}>
                ${bid.budgetMin}–${bid.budgetMax}
              </span>
              <span style={{ fontSize: 13, color: getStatusColor(bid.status), fontWeight: 500, textTransform: "capitalize" }}>
                {bid.status.replace("_", " ")}
              </span>
            </div>

            <div style={{ marginTop: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
              <Link
                to={`/proposals/${bid.id}`}
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

              <Link
                to={`/jobs/${bid.jobId}/bids`}
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
                View All Bids
              </Link>

              {bid.status === "sent" && (
                <>
                  <button
                    onClick={() => handleDiscuss(bid.id)}
                    style={{
                      padding: "6px 12px",
                      background: "#f59e0b",
                      color: "white",
                      border: "none",
                      borderRadius: 4,
                      cursor: "pointer",
                      fontSize: 13,
                      fontWeight: 500
                    }}
                  >
                    Discuss
                  </button>
                  <button
                    onClick={() => handleAccept(bid.id)}
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
                    onClick={() => handleReject(bid.id)}
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
                    Reject
                  </button>
                </>
              )}

              {bid.status === "in_discussion" && (
                <>
                  <Link
                    to={`/chats/${bid.id}`}
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
                    onClick={() => handleAccept(bid.id)}
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
                    onClick={() => handleReject(bid.id)}
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
                    Reject
                  </button>
                </>
              )}

              {bid.status === "accepted" && (
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

              {bid.status === "rejected" && (
                <span style={{ fontSize: 13, color: "#666", fontStyle: "italic", padding: "6px 0" }}>
                  This bid was rejected
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
