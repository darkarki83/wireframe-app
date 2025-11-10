
import { useEffect, useState } from "react";
import { apiListContracts, type Contract } from "../../lib/mockApi";
import { Link } from "react-router-dom";

export default function ContractList() {
  const [items, setItems] = useState<Contract[]>([]);
  const [activeTab, setActiveTab] = useState<"all" | "active" | "completed">("all");

  useEffect(() => {
    apiListContracts().then(setItems);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "#8b5cf6";
      case "completed": return "#059669";
      case "pending": return "#f59e0b";
      default: return "#666";
    }
  };

  const filteredContracts = items.filter(contract => {
    if (activeTab === "all") return true;
    if (activeTab === "active") return contract.status === "active";
    if (activeTab === "completed") return contract.status === "completed";
    return true;
  });

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", paddingBottom: 16 }}>
      <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>My Contracts</h2>

      {/* Tabs */}
      <div style={{
        display: "flex",
        gap: 8,
        marginBottom: 24,
        borderBottom: "2px solid #e5e7eb"
      }}>
        <button
          onClick={() => setActiveTab("all")}
          style={{
            flex: 1,
            padding: "12px 16px",
            background: "transparent",
            border: "none",
            borderBottom: activeTab === "all" ? "3px solid #8b5cf6" : "3px solid transparent",
            color: activeTab === "all" ? "#8b5cf6" : "#666",
            fontWeight: 600,
            fontSize: 15,
            cursor: "pointer",
            marginBottom: -2
          }}
        >
          All ({items.length})
        </button>
        <button
          onClick={() => setActiveTab("active")}
          style={{
            flex: 1,
            padding: "12px 16px",
            background: "transparent",
            border: "none",
            borderBottom: activeTab === "active" ? "3px solid #8b5cf6" : "3px solid transparent",
            color: activeTab === "active" ? "#8b5cf6" : "#666",
            fontWeight: 600,
            fontSize: 15,
            cursor: "pointer",
            marginBottom: -2
          }}
        >
          Active ({items.filter(c => c.status === "active").length})
        </button>
        <button
          onClick={() => setActiveTab("completed")}
          style={{
            flex: 1,
            padding: "12px 16px",
            background: "transparent",
            border: "none",
            borderBottom: activeTab === "completed" ? "3px solid #8b5cf6" : "3px solid transparent",
            color: activeTab === "completed" ? "#8b5cf6" : "#666",
            fontWeight: 600,
            fontSize: 15,
            cursor: "pointer",
            marginBottom: -2
          }}
        >
          Completed ({items.filter(c => c.status === "completed").length})
        </button>
      </div>

      {/* Contract Cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {filteredContracts.map((contract) => (
          <Link
            key={contract.id}
            to={`/contracts/${contract.id}`}
            style={{
              display: "block",
              background: "white",
              border: "1px solid #e5e7eb",
              borderRadius: 12,
              padding: 16,
              textDecoration: "none",
              color: "inherit",
              transition: "all 0.2s"
            }}
          >
            {/* Header: Title and Role Badge */}
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: 12,
              gap: 12
            }}>
              <div style={{
                fontWeight: 600,
                fontSize: 16,
                flex: 1,
                lineHeight: 1.3,
                color: "#111827"
              }}>
                {contract.title}
              </div>
              <div
                style={{
                  background: contract.role === "client" ? "#eff6ff" : "#f0fdf4",
                  color: contract.role === "client" ? "#1e40af" : "#166534",
                  padding: "4px 10px",
                  borderRadius: 12,
                  fontSize: 11,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  whiteSpace: "nowrap"
                }}
              >
                {contract.role === "client" ? "↗ Outcome" : "↙ Income"}
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

            {/* Footer: Date, Status, Price */}
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingTop: 12,
              borderTop: "1px solid #f3f4f6"
            }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: 12
              }}>
                <div style={{ fontSize: 12, color: "#9ca3af" }}>
                  📅 {contract.startDate}
                </div>
                <div
                  style={{
                    background: getStatusColor(contract.status),
                    color: "white",
                    padding: "3px 8px",
                    borderRadius: 10,
                    fontSize: 10,
                    fontWeight: 600,
                    textTransform: "uppercase"
                  }}
                >
                  {contract.status}
                </div>
              </div>
              <div style={{
                fontWeight: 700,
                fontSize: 16,
                color: "#8b5cf6"
              }}>
                ${contract.price}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Empty State */}
      {filteredContracts.length === 0 && (
        <div style={{
          textAlign: "center",
          padding: "60px 20px",
          background: "white",
          border: "1px solid #e5e7eb",
          borderRadius: 12
        }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>📋</div>
          <div style={{ fontSize: 16, fontWeight: 600, color: "#374151", marginBottom: 8 }}>
            No {activeTab === "all" ? "" : activeTab} contracts
          </div>
          <div style={{ fontSize: 14, color: "#9ca3af" }}>
            {activeTab === "all"
              ? "You don't have any contracts yet"
              : `No ${activeTab} contracts found`}
          </div>
        </div>
      )}
    </div>
  );
}
