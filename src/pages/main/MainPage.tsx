import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiListContracts, type Contract } from "../../lib/mockApi";

export default function MainPage() {
  const [contracts, setContracts] = useState<Contract[]>([]);

  useEffect(() => {
    apiListContracts().then(setContracts);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "#8b5cf6";
      case "completed": return "#059669";
      case "pending": return "#f59e0b";
      default: return "#666";
    }
  };

  return (
    <div className="wrap" style={{ maxWidth: 600, margin: "0 auto" }}>
      {/* Header */}
      <h1 style={{ textAlign: "center", marginBottom: 32, fontSize: 28 }}>Welcome back!</h1>

      {/* Three Action Buttons */}
      <div style={{ display: "flex", justifyContent: "center", gap: 40, marginBottom: 40 }}>
        <Link to="/offers" style={{ textAlign: "center", textDecoration: "none", color: "inherit" }}>
          <button
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
              marginBottom: 8,
              boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)"
            }}
          >
            📧
          </button>
          <div style={{ fontSize: 14, fontWeight: 600 }}>Offers</div>
        </Link>

        <Link to="/contracts" style={{ textAlign: "center", textDecoration: "none", color: "inherit" }}>
          <button
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
              marginBottom: 8,
              boxShadow: "0 4px 12px rgba(245, 87, 108, 0.3)"
            }}
          >
            📝
          </button>
          <div style={{ fontSize: 14, fontWeight: 600 }}>Contracts</div>
        </Link>

        <Link to="/chats" style={{ textAlign: "center", textDecoration: "none", color: "inherit" }}>
          <button
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
              marginBottom: 8,
              boxShadow: "0 4px 12px rgba(79, 172, 254, 0.3)"
            }}
          >
            💬
          </button>
          <div style={{ fontSize: 14, fontWeight: 600 }}>Chat</div>
        </Link>
      </div>

      {/* Contract List Preview */}
      <div style={{
        background: "white",
        border: "1px solid #e5e7eb",
        borderRadius: 12,
        padding: 20
      }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20
        }}>
          <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>Active Contracts</h3>
          <Link to="/contracts" style={{
            background: "transparent",
            border: "none",
            fontSize: 13,
            color: "#8b5cf6",
            cursor: "pointer",
            textDecoration: "none",
            fontWeight: 600
          }}>
            View all →
          </Link>
        </div>

        {/* Contract Cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {contracts.slice(0, 3).map((contract) => (
            <Link
              key={contract.id}
              to={`/contracts/${contract.id}`}
              style={{
                display: "block",
                background: "#f9fafb",
                border: "1px solid #e5e7eb",
                borderRadius: 10,
                padding: 16,
                textDecoration: "none",
                color: "inherit",
                transition: "all 0.2s"
              }}
            >
              {/* Header: Title and Status */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10, gap: 12 }}>
                <div style={{ fontWeight: 600, fontSize: 15, flex: 1, lineHeight: 1.3 }}>{contract.title}</div>
                <div
                  style={{
                    background: getStatusColor(contract.status),
                    color: "white",
                    padding: "4px 10px",
                    borderRadius: 12,
                    fontSize: 11,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    whiteSpace: "nowrap"
                  }}
                >
                  {contract.status}
                </div>
              </div>

              {/* Description */}
              <p style={{ 
                fontSize: 13, 
                color: "#6b7280", 
                margin: "0 0 12px 0", 
                lineHeight: 1.5,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden"
              }}>
                {contract.description}
              </p>

              {/* Footer: Price and Date */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontSize: 12, color: "#9ca3af" }}>
                  📅 {contract.startDate}
                </div>
                <div style={{ fontWeight: 700, fontSize: 16, color: "#8b5cf6" }}>
                  ${contract.price}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {contracts.length === 0 && (
          <div style={{ textAlign: "center", padding: "40px 20px", color: "#9ca3af" }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>📋</div>
            <div style={{ fontSize: 14, fontWeight: 500 }}>No active contracts yet</div>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "space-around",
        padding: "16px 0",
        background: "white",
        borderTop: "1px solid #e5e7eb"
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 24, marginBottom: 4 }}>🏠</div>
          <div style={{ fontSize: 11, fontWeight: 600 }}>Home</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 24, marginBottom: 4 }}>👤</div>
          <div style={{ fontSize: 11, color: "#999" }}>Profile</div>
        </div>
      </div>
    </div>
  );
}
