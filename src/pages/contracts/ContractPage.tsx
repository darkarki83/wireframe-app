
import { useState } from "react";
import { useParams } from "react-router-dom";
import OverviewTab from "./tabs/OverviewTab";
import MilestonesTab from "./tabs/MilestonesTab";
import ChatTab from "./tabs/ChatTab";
import FilesTab from "./tabs/FilesTab";
import ActivityTab from "./tabs/ActivityTab";

export default function ContractPage() {
  const { id } = useParams();
  const [tab, setTab] = useState<"overview" | "milestones" | "chat" | "files" | "activity">("overview");

  // Mock contract data
  const contract = {
    id: id || "1",
    title: "E-commerce Platform Development",
    client: "Sarah Johnson",
    freelancer: "John Doe",
    total: 5000,
    status: "active" as "active" | "completed" | "pending",
    startDate: "2025-11-01",
    endDate: "2025-12-30",
    description: "Full-stack development of an e-commerce platform with payment integration and inventory management."
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "#8b5cf6";
      case "completed": return "#059669";
      case "pending": return "#f59e0b";
      default: return "#666";
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", paddingBottom: 16 }}>
      {/* Header with Contract Info */}
      <div style={{
        background: "white",
        border: "1px solid #e5e7eb",
        borderRadius: 12,
        padding: 20,
        marginBottom: 16
      }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12, marginTop: 0 }}>
          {contract.title}
        </h2>

        <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
          <div
            style={{
              background: getStatusColor(contract.status),
              color: "white",
              padding: "6px 14px",
              borderRadius: 16,
              fontSize: 12,
              fontWeight: 600,
              textTransform: "uppercase"
            }}
          >
            {contract.status}
          </div>
          <div
            style={{
              background: "#f3f4f6",
              color: "#374151",
              padding: "6px 14px",
              borderRadius: 16,
              fontSize: 12,
              fontWeight: 600
            }}
          >
            💰 ${contract.total.toLocaleString()}
          </div>
        </div>

        <div style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.8 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span>👤 <strong>Client:</strong> {contract.client}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span>💼 <strong>Freelancer:</strong> {contract.freelancer}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>📅 <strong>Duration:</strong> {contract.startDate} → {contract.endDate}</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
        gap: 6,
        marginBottom: 16
      }}>
        <button
          onClick={() => setTab("overview")}
          style={{
            padding: "10px 4px",
            background: tab === "overview" ? "#8b5cf6" : "white",
            color: tab === "overview" ? "white" : "#666",
            border: tab === "overview" ? "none" : "1px solid #e5e7eb",
            borderRadius: 8,
            fontWeight: 600,
            fontSize: 11,
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
            minHeight: 60,
            boxSizing: "border-box"
          }}
        >
          <span style={{ fontSize: 16 }}>📊</span>
          <span>Overview</span>
        </button>
        <button
          onClick={() => setTab("milestones")}
          style={{
            padding: "10px 4px",
            background: tab === "milestones" ? "#8b5cf6" : "white",
            color: tab === "milestones" ? "white" : "#666",
            border: tab === "milestones" ? "none" : "1px solid #e5e7eb",
            borderRadius: 8,
            fontWeight: 600,
            fontSize: 11,
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
            minHeight: 60,
            boxSizing: "border-box"
          }}
        >
          <span style={{ fontSize: 16 }}>🎯</span>
          <span>Milestones</span>
        </button>
        <button
          onClick={() => setTab("chat")}
          style={{
            padding: "10px 4px",
            background: tab === "chat" ? "#8b5cf6" : "white",
            color: tab === "chat" ? "white" : "#666",
            border: tab === "chat" ? "none" : "1px solid #e5e7eb",
            borderRadius: 8,
            fontWeight: 600,
            fontSize: 11,
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
            minHeight: 60,
            boxSizing: "border-box"
          }}
        >
          <span style={{ fontSize: 16 }}>💬</span>
          <span>Chat</span>
        </button>
        <button
          onClick={() => setTab("files")}
          style={{
            padding: "10px 4px",
            background: tab === "files" ? "#8b5cf6" : "white",
            color: tab === "files" ? "white" : "#666",
            border: tab === "files" ? "none" : "1px solid #e5e7eb",
            borderRadius: 8,
            fontWeight: 600,
            fontSize: 11,
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
            minHeight: 60,
            boxSizing: "border-box"
          }}
        >
          <span style={{ fontSize: 16 }}>📁</span>
          <span>Files</span>
        </button>
        <button
          onClick={() => setTab("activity")}
          style={{
            padding: "10px 4px",
            background: tab === "activity" ? "#8b5cf6" : "white",
            color: tab === "activity" ? "white" : "#666",
            border: tab === "activity" ? "none" : "1px solid #e5e7eb",
            borderRadius: 8,
            fontWeight: 600,
            fontSize: 11,
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
            minHeight: 60,
            boxSizing: "border-box"
          }}
        >
          <span style={{ fontSize: 16 }}>📝</span>
          <span>Activity</span>
        </button>
      </div>

      {/* Tab Content */}
      {tab === "overview" && <OverviewTab contract={contract} />}
      {tab === "milestones" && <MilestonesTab />}
      {tab === "chat" && <ChatTab />}
      {tab === "files" && <FilesTab />}
      {tab === "activity" && <ActivityTab />}
    </div>
  );
}
