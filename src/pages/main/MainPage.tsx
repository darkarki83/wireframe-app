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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return "▶️";
      case "completed": return "✅";
      case "pending": return "⏳";
      default: return "📄";
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
              width: 70,
              height: 70,
              borderRadius: "50%",
              background: "#3d3d7a",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
              marginBottom: 8
            }}
          >
            📥
          </button>
          <div style={{ fontSize: 14, fontWeight: 500 }}>Offers</div>
        </Link>

        <Link to="/contracts" style={{ textAlign: "center", textDecoration: "none", color: "inherit" }}>
          <button
            style={{
              width: 70,
              height: 70,
              borderRadius: "50%",
              background: "#e74c3c",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
              marginBottom: 8
            }}
          >
            📑
          </button>
          <div style={{ fontSize: 14, fontWeight: 500 }}>Contracts</div>
        </Link>

        <div style={{ textAlign: "center" }}>
          <button
            style={{
              width: 70,
              height: 70,
              borderRadius: "50%",
              background: "#3d3d7a",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
              marginBottom: 8
            }}
          >
            💬
          </button>
          <div style={{ fontSize: 14, fontWeight: 500 }}>Chat</div>
        </div>
      </div>

      {/* Project List Section */}
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
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>Contracts list preview</h3>
          <button style={{
            background: "transparent",
            border: "none",
            fontSize: 13,
            color: "#666",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 4
          }}>
            🔍 View all
          </button>
        </div>

        {/* Project List */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {contracts.slice(0, 4).map((contract) => (
            <div
              key={contract.id}
              style={{
                borderBottom: "1px solid #e5e7eb",
                paddingBottom: 16
              }}
            >
              {/* Title, Price and Status */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8, gap: 8 }}>
                <div style={{ fontWeight: 600, fontSize: 16, flex: 1 }}>{contract.title}</div>
                <div style={{ fontWeight: 700, fontSize: 16, whiteSpace: "nowrap" }}>${contract.price}</div>
                <div
                  style={{
                    background: getStatusColor(contract.status),
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
                  }}
                >
                  <span>{getStatusIcon(contract.status)}</span>
                  <span>{contract.status}</span>
                </div>
              </div>

              {/* Description */}
              <p style={{ fontSize: 13, color: "#666", margin: "0 0 8px 0", lineHeight: 1.5 }}>
                {contract.description}
              </p>

              {/* Date */}
              <div style={{ fontSize: 12, color: "#999" }}>{contract.startDate}</div>
            </div>
          ))}
        </div>
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
