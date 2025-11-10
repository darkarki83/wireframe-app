
type Milestone = {
  id: string;
  title: string;
  amount: number;
  status: "pending" | "funded" | "submitted" | "approved" | "completed";
  description: string;
};

export default function MilestonesTab() {
  const milestones: Milestone[] = [
    {
      id: "1",
      title: "Design Phase",
      amount: 1500,
      status: "approved",
      description: "Complete UI/UX design, wireframes, and mockups"
    },
    {
      id: "2",
      title: "Development Phase",
      amount: 2500,
      status: "funded",
      description: "Build core features and functionality"
    },
    {
      id: "3",
      title: "Launch & Deployment",
      amount: 1000,
      status: "pending",
      description: "Final testing, deployment and documentation"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
      case "approved": return "#059669";
      case "submitted":
      case "funded": return "#8b5cf6";
      case "pending": return "#9ca3af";
      default: return "#666";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending": return "Not Funded";
      case "funded": return "In Progress";
      case "submitted": return "Submitted";
      case "approved": return "Completed";
      case "completed": return "Completed";
      default: return status;
    }
  };

  return (
    <div style={{
      background: "white",
      border: "1px solid #e5e7eb",
      borderRadius: 12,
      padding: 20
    }}>
      <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 20, marginTop: 0 }}>
        Project Milestones
      </h3>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {milestones.map((milestone, index) => (
          <div
            key={milestone.id}
            style={{
              background: "#f9fafb",
              border: "1px solid #e5e7eb",
              borderRadius: 10,
              padding: 16
            }}
          >
            {/* Header */}
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: 12,
              gap: 12
            }}>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: 15,
                  fontWeight: 600,
                  color: "#111827",
                  marginBottom: 4
                }}>
                  {index + 1}. {milestone.title}
                </div>
                <div style={{
                  fontSize: 13,
                  color: "#6b7280",
                  lineHeight: 1.5
                }}>
                  {milestone.description}
                </div>
              </div>
              <div
                style={{
                  background: getStatusColor(milestone.status),
                  color: "white",
                  padding: "4px 10px",
                  borderRadius: 12,
                  fontSize: 11,
                  fontWeight: 600,
                  whiteSpace: "nowrap"
                }}
              >
                {getStatusText(milestone.status)}
              </div>
            </div>

            {/* Amount and Actions */}
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingTop: 12,
              borderTop: "1px solid #e5e7eb"
            }}>
              <div style={{
                fontSize: 16,
                fontWeight: 700,
                color: "#8b5cf6"
              }}>
                💰 ${milestone.amount.toLocaleString()}
              </div>

              <div style={{ display: "flex", gap: 8 }}>
                {milestone.status === "pending" && (
                  <button style={{
                    padding: "6px 14px",
                    background: "#8b5cf6",
                    color: "white",
                    border: "none",
                    borderRadius: 6,
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer"
                  }}>
                    Fund
                  </button>
                )}
                {milestone.status === "funded" && (
                  <>
                    <button style={{
                      padding: "6px 14px",
                      background: "#059669",
                      color: "white",
                      border: "none",
                      borderRadius: 6,
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: "pointer"
                    }}>
                      Submit Work
                    </button>
                    <button style={{
                      padding: "6px 14px",
                      background: "#dc2626",
                      color: "white",
                      border: "none",
                      borderRadius: 6,
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: "pointer"
                    }}>
                      Dispute
                    </button>
                  </>
                )}
                {milestone.status === "submitted" && (
                  <>
                    <button style={{
                      padding: "6px 14px",
                      background: "#059669",
                      color: "white",
                      border: "none",
                      borderRadius: 6,
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: "pointer"
                    }}>
                      Approve
                    </button>
                    <button style={{
                      padding: "6px 14px",
                      background: "#f59e0b",
                      color: "white",
                      border: "none",
                      borderRadius: 6,
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: "pointer"
                    }}>
                      Request Changes
                    </button>
                  </>
                )}
                {milestone.status === "approved" && (
                  <button style={{
                    padding: "6px 14px",
                    background: "#059669",
                    color: "white",
                    border: "none",
                    borderRadius: 6,
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer"
                  }}>
                    Withdraw Funds
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
