
type Contract = {
  id: string;
  title: string;
  client: string;
  freelancer: string;
  total: number;
  status: "active" | "completed" | "pending";
  startDate: string;
  endDate: string;
  description: string;
};

type Props = {
  contract: Contract;
};

export default function OverviewTab({ contract }: Props) {
  return (
    <div style={{
      background: "white",
      border: "1px solid #e5e7eb",
      borderRadius: 12,
      padding: 20
    }}>
      <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 20, marginTop: 0 }}>
        Contract Overview
      </h3>

      {/* Description */}
      <div style={{ marginBottom: 24 }}>
        <label style={{
          display: "block",
          marginBottom: 8,
          fontSize: 13,
          fontWeight: 600,
          color: "#374151"
        }}>
          Description
        </label>
        <p style={{
          fontSize: 14,
          color: "#6b7280",
          lineHeight: 1.6,
          margin: 0,
          background: "#f9fafb",
          padding: 16,
          borderRadius: 8
        }}>
          {contract.description}
        </p>
      </div>

      {/* Progress Section */}
      <div style={{ marginBottom: 24 }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 12
        }}>
          <label style={{
            fontSize: 13,
            fontWeight: 600,
            color: "#374151"
          }}>
            Progress
          </label>
          <span style={{
            fontSize: 13,
            fontWeight: 600,
            color: "#8b5cf6"
          }}>
            1 / 3 Milestones
          </span>
        </div>
        <div style={{
          width: "100%",
          height: 8,
          background: "#e5e7eb",
          borderRadius: 4,
          overflow: "hidden"
        }}>
          <div style={{
            width: "33%",
            height: "100%",
            background: "linear-gradient(90deg, #8b5cf6 0%, #667eea 100%)",
            borderRadius: 4
          }} />
        </div>
      </div>

      {/* Payment Info */}
      <div style={{ marginBottom: 24 }}>
        <h4 style={{
          fontSize: 15,
          fontWeight: 600,
          marginBottom: 12,
          marginTop: 0,
          color: "#374151"
        }}>
          Payment Information
        </h4>
        <div style={{
          background: "#f9fafb",
          padding: 16,
          borderRadius: 8,
          fontSize: 14
        }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 8,
            color: "#6b7280"
          }}>
            <span>Total Contract Value:</span>
            <span style={{ fontWeight: 600, color: "#111827" }}>
              ${contract.total.toLocaleString()}
            </span>
          </div>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 8,
            color: "#6b7280"
          }}>
            <span>Released:</span>
            <span style={{ fontWeight: 600, color: "#059669" }}>
              ${(contract.total * 0.33).toFixed(0)}
            </span>
          </div>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            color: "#6b7280"
          }}>
            <span>Remaining:</span>
            <span style={{ fontWeight: 600, color: "#f59e0b" }}>
              ${(contract.total * 0.67).toFixed(0)}
            </span>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div>
        <h4 style={{
          fontSize: 15,
          fontWeight: 600,
          marginBottom: 12,
          marginTop: 0,
          color: "#374151"
        }}>
          Timeline
        </h4>
        <div style={{
          background: "#f9fafb",
          padding: 16,
          borderRadius: 8
        }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 12
          }}>
            <div>
              <div style={{ fontSize: 12, color: "#9ca3af", marginBottom: 4 }}>
                Start Date
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#374151" }}>
                📅 {contract.startDate}
              </div>
            </div>
            <div style={{
              fontSize: 20,
              color: "#d1d5db"
            }}>
              →
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 12, color: "#9ca3af", marginBottom: 4 }}>
                End Date
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#374151" }}>
                🏁 {contract.endDate}
              </div>
            </div>
          </div>
          <div style={{
            fontSize: 12,
            color: "#6b7280",
            textAlign: "center",
            paddingTop: 12,
            borderTop: "1px solid #e5e7eb"
          }}>
            Duration: 2 months
          </div>
        </div>
      </div>
    </div>
  );
}
