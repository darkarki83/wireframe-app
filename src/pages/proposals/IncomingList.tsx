
import { useEffect, useState } from "react";
import { apiListIncoming, type Proposal } from "../../lib/mockApi";
import { Link } from "react-router-dom";

export default function IncomingList(){
  const [items, setItems] = useState<Proposal[]>([]);
  useEffect(()=>{ apiListIncoming().then(setItems); },[]);

  const handleAccept = (offerId: string) => {
    alert(`Accept offer ${offerId} - will create contract (mock)`);
  };

  const handleDecline = (offerId: string) => {
    alert(`Decline offer ${offerId} (mock)`);
  };

  const handleCounterOffer = (offerId: string) => {
    alert(`Counter-offer modal for ${offerId} (mock)`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted": return "#059669";
      case "rejected": return "#dc2626";
      case "in_discussion": return "#f59e0b";
      default: return "#666";
    }
  };

  return <div className="wrap">
    <h2>Incoming Job Offers</h2>
    <p style={{ color: "#666", marginBottom: 16 }}>Direct job offers from clients</p>

    <ul className="grid">
      {items.map(p=>(
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

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12, paddingTop: 12, borderTop: "1px solid #e5e7eb" }}>
            <span style={{ fontWeight: 600, color: "#059669", fontSize: 15 }}>
              ${p.budgetMin}–${p.budgetMax}
            </span>
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
                  onClick={() => handleCounterOffer(p.id)}
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
                  Counter Offer
                </button>
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
