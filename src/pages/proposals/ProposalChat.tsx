
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiGetProposalChat, apiSendChatMessage, apiUpdateConditions, apiApproveConditions, type ProposalChatData, type ChatMessage } from "../../lib/mockApi";

export default function ProposalChat() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<ProposalChatData | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [editingConditions, setEditingConditions] = useState(false);

  // Edit form states
  const [editPrice, setEditPrice] = useState("");
  const [editDeadline, setEditDeadline] = useState("");
  const [editDeliveryDate, setEditDeliveryDate] = useState("");
  const [editMilestones, setEditMilestones] = useState("");
  const [editPaymentSchedule, setEditPaymentSchedule] = useState("");
  const [editRevisions, setEditRevisions] = useState("");
  const [editScope, setEditScope] = useState("");
  const [editExclusions, setEditExclusions] = useState("");

  const loadData = async () => {
    setLoading(true);
    const result = await apiGetProposalChat(id!);
    setData(result);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [id]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !data) return;

    await apiSendChatMessage(id!, message);
    setMessage("");
    loadData(); // Refresh to show new message
  };

  const handleEditConditions = () => {
    if (!data) return;
    setEditPrice(`${data.currentConditions.priceMin}-${data.currentConditions.priceMax}`);
    setEditDeadline(data.currentConditions.deadline);
    setEditDeliveryDate(data.currentConditions.deliveryDate);
    setEditMilestones(data.currentConditions.milestones.join("\n"));
    setEditPaymentSchedule(data.currentConditions.paymentSchedule);
    setEditRevisions(data.currentConditions.revisions.toString());
    setEditScope(data.currentConditions.scope);
    setEditExclusions(data.currentConditions.exclusions || "");
    setEditingConditions(true);
  };

  const handleSaveConditions = async () => {
    if (!data) return;

    const [min, max] = editPrice.split("-").map(s => parseInt(s.trim()));
    const milestones = editMilestones.split("\n").filter(m => m.trim());

    await apiUpdateConditions(id!, {
      priceMin: min,
      priceMax: max,
      deadline: editDeadline,
      deliveryDate: editDeliveryDate,
      milestones,
      paymentSchedule: editPaymentSchedule,
      revisions: parseInt(editRevisions),
      scope: editScope,
      exclusions: editExclusions || undefined
    });

    setEditingConditions(false);
    loadData(); // Refresh to show new version
  };

  const handleApprove = async () => {
    if (!data) return;
    await apiApproveConditions(id!, data.myRole);
    loadData();
  };

  const handleDecline = () => {
    if (confirm("Are you sure you want to decline this proposal?")) {
      alert("Proposal declined (mock)");
      navigate("/proposals/incoming");
    }
  };

  const handleOpenContract = () => {
    alert("Opening contract... (mock)");
    navigate("/contracts");
  };

  if (loading) return <div className="wrap"><p>Loading...</p></div>;
  if (!data) return <div className="wrap"><p>Proposal not found</p></div>;

  const isFullyAgreed = data.currentConditions.clientApproved && data.currentConditions.freelancerApproved;
  const myApproved = data.myRole === "client" ? data.currentConditions.clientApproved : data.currentConditions.freelancerApproved;
  const otherApproved = data.myRole === "client" ? data.currentConditions.freelancerApproved : data.currentConditions.clientApproved;

  return (
    <div className="wrap" style={{ maxWidth: 1200 }}>
      {/* Back button */}
      <button
        onClick={() => navigate("/proposals/incoming")}
        style={{
          padding: "8px 16px",
          background: "#f3f4f6",
          border: "1px solid #e5e7eb",
          borderRadius: 6,
          cursor: "pointer",
          marginBottom: 16
        }}
      >
        ← Back to Proposals
      </button>

      <h2 style={{ marginBottom: 8 }}>{data.jobTitle}</h2>
      <p style={{ color: "#666", marginBottom: 24 }}>
        Discussion with {data.otherPartyName} • Status: <span style={{ color: data.status === "new" ? "#f59e0b" : data.status === "in_discussion" ? "#3b82f6" : "#059669", fontWeight: 600 }}>
          {data.status === "new" ? "New" : data.status === "in_discussion" ? "In Discussion" : "Agreed"}
        </span>
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 24 }}>
        {/* Chat Section */}
        <div>
          <div className="card" style={{ padding: 0, height: 600, display: "flex", flexDirection: "column" }}>
            {/* Messages */}
            <div style={{ flex: 1, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
              {data.messages.map((msg) => {
                if (msg.type === "system") {
                  return (
                    <div key={msg.id} style={{ textAlign: "center", padding: "8px 16px" }}>
                      <span style={{ background: "#f3f4f6", padding: "6px 12px", borderRadius: 12, fontSize: 13, color: "#666" }}>
                        {msg.text}
                      </span>
                    </div>
                  );
                }

                const isMe = msg.sender === data.myRole;
                return (
                  <div
                    key={msg.id}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: isMe ? "flex-end" : "flex-start"
                    }}
                  >
                    <div style={{ fontSize: 12, color: "#666", marginBottom: 4 }}>
                      {msg.senderName} • {new Date(msg.timestamp).toLocaleTimeString()}
                    </div>
                    <div
                      style={{
                        background: isMe ? "#3b82f6" : "#f3f4f6",
                        color: isMe ? "white" : "#333",
                        padding: "10px 14px",
                        borderRadius: 12,
                        maxWidth: "70%",
                        wordWrap: "break-word"
                      }}
                    >
                      {msg.text}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Message Input */}
            <form
              onSubmit={handleSendMessage}
              style={{
                padding: 16,
                borderTop: "1px solid #e5e7eb",
                display: "flex",
                gap: 8
              }}
            >
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                style={{
                  flex: 1,
                  padding: "10px 14px",
                  border: "1px solid #e5e7eb",
                  borderRadius: 6,
                  fontSize: 14
                }}
              />
              <button
                type="submit"
                disabled={!message.trim()}
                style={{
                  padding: "10px 20px",
                  background: message.trim() ? "#3b82f6" : "#e5e7eb",
                  color: message.trim() ? "white" : "#999",
                  border: "none",
                  borderRadius: 6,
                  cursor: message.trim() ? "pointer" : "not-allowed",
                  fontSize: 14,
                  fontWeight: 500
                }}
              >
                Send
              </button>
            </form>
          </div>
        </div>

        {/* Conditions Sidebar */}
        <div>
          {/* Agreement Terms */}
          <div className="card" style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <h3 style={{ margin: 0, fontSize: 16 }}>Agreement Terms</h3>
              <span style={{ fontSize: 12, color: "#666", background: "#f3f4f6", padding: "4px 8px", borderRadius: 4 }}>
                v{data.currentConditions.version}
              </span>
            </div>

            <div style={{ fontSize: 14, marginBottom: 16 }}>
              {/* Project Scope */}
              <div style={{ marginBottom: 12, padding: 12, background: "#f9fafb", borderRadius: 6 }}>
                <strong style={{ color: "#111", fontSize: 13, display: "block", marginBottom: 6 }}>Project Scope:</strong>
                <div style={{ fontSize: 13, color: "#444", lineHeight: 1.6 }}>
                  {data.currentConditions.scope}
                </div>
              </div>

              {/* Financial Terms */}
              <div style={{ marginBottom: 12 }}>
                <strong style={{ color: "#111", fontSize: 13, display: "block", marginBottom: 6 }}>Budget:</strong>
                <div style={{ color: "#059669", fontSize: 18, fontWeight: 700 }}>
                  ${data.currentConditions.priceMin.toLocaleString()} - ${data.currentConditions.priceMax.toLocaleString()}
                </div>
              </div>

              <div style={{ marginBottom: 12 }}>
                <strong style={{ color: "#111", fontSize: 13, display: "block", marginBottom: 6 }}>Payment Schedule:</strong>
                <div style={{ fontSize: 13, color: "#444" }}>
                  {data.currentConditions.paymentSchedule}
                </div>
              </div>

              {/* Timeline */}
              <div style={{ marginBottom: 12, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <strong style={{ color: "#111", fontSize: 13, display: "block", marginBottom: 6 }}>Duration:</strong>
                  <div style={{ fontSize: 13, color: "#444" }}>
                    {data.currentConditions.deadline}
                  </div>
                </div>
                <div>
                  <strong style={{ color: "#111", fontSize: 13, display: "block", marginBottom: 6 }}>Delivery Date:</strong>
                  <div style={{ fontSize: 13, color: "#444" }}>
                    {data.currentConditions.deliveryDate}
                  </div>
                </div>
              </div>

              {/* Milestones */}
              <div style={{ marginBottom: 12 }}>
                <strong style={{ color: "#111", fontSize: 13, display: "block", marginBottom: 6 }}>Milestones:</strong>
                <ul style={{ margin: "0", paddingLeft: 20 }}>
                  {data.currentConditions.milestones.map((milestone, i) => (
                    <li key={i} style={{ fontSize: 13, marginBottom: 4, color: "#444" }}>{milestone}</li>
                  ))}
                </ul>
              </div>

              {/* Revisions */}
              <div style={{ marginBottom: 12 }}>
                <strong style={{ color: "#111", fontSize: 13, display: "block", marginBottom: 6 }}>Revisions Included:</strong>
                <div style={{ fontSize: 13, color: "#444" }}>
                  {data.currentConditions.revisions} round{data.currentConditions.revisions !== 1 ? 's' : ''}
                </div>
              </div>

              {/* Exclusions */}
              {data.currentConditions.exclusions && (
                <div style={{ padding: 12, background: "#fef3c7", borderLeft: "3px solid #f59e0b", borderRadius: 4 }}>
                  <strong style={{ color: "#92400e", fontSize: 13, display: "block", marginBottom: 6 }}>Not Included:</strong>
                  <div style={{ fontSize: 13, color: "#78350f" }}>
                    {data.currentConditions.exclusions}
                  </div>
                </div>
              )}
            </div>

            {/* Edit Button */}
            {!isFullyAgreed && (
              <button
                onClick={handleEditConditions}
                style={{
                  width: "100%",
                  padding: "8px 16px",
                  background: "#f3f4f6",
                  border: "1px solid #e5e7eb",
                  borderRadius: 6,
                  cursor: "pointer",
                  fontSize: 13,
                  fontWeight: 500
                }}
              >
                ✏️ Edit Terms
              </button>
            )}
          </div>

          {/* Approval Status */}
          <div className="card" style={{ marginBottom: 16 }}>
            <h3 style={{ margin: 0, marginBottom: 12, fontSize: 16 }}>Approval Status</h3>

            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 20 }}>
                  {data.currentConditions.clientApproved ? "✅" : "⏳"}
                </span>
                <span style={{ fontSize: 13 }}>
                  Client {data.currentConditions.clientApproved ? "Approved" : "Pending"}
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 20 }}>
                  {data.currentConditions.freelancerApproved ? "✅" : "⏳"}
                </span>
                <span style={{ fontSize: 13 }}>
                  Freelancer {data.currentConditions.freelancerApproved ? "Approved" : "Pending"}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            {isFullyAgreed ? (
              <button
                onClick={handleOpenContract}
                style={{
                  width: "100%",
                  padding: "10px 16px",
                  background: "#059669",
                  color: "white",
                  border: "none",
                  borderRadius: 6,
                  cursor: "pointer",
                  fontSize: 14,
                  fontWeight: 600
                }}
              >
                📑 Open Contract
              </button>
            ) : myApproved ? (
              <div style={{ textAlign: "center", padding: "12px 0", color: "#666", fontSize: 13 }}>
                Waiting for {data.otherPartyName} to approve...
              </div>
            ) : (
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  onClick={handleApprove}
                  style={{
                    flex: 1,
                    padding: "10px 16px",
                    background: "#059669",
                    color: "white",
                    border: "none",
                    borderRadius: 6,
                    cursor: "pointer",
                    fontSize: 14,
                    fontWeight: 500
                  }}
                >
                  ✓ Approve
                </button>
                <button
                  onClick={handleDecline}
                  style={{
                    padding: "10px 16px",
                    background: "white",
                    color: "#dc2626",
                    border: "1px solid #dc2626",
                    borderRadius: 6,
                    cursor: "pointer",
                    fontSize: 14,
                    fontWeight: 500
                  }}
                >
                  ✗ Decline
                </button>
              </div>
            )}
          </div>

          {/* Version History */}
          {data.versionHistory.length > 1 && (
            <div className="card">
              <h3 style={{ margin: 0, marginBottom: 12, fontSize: 16 }}>Version History</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {data.versionHistory.map((v) => (
                  <div
                    key={v.version}
                    style={{
                      padding: "8px 12px",
                      background: v.version === data.currentConditions.version ? "#f0f9ff" : "#f9fafb",
                      border: `1px solid ${v.version === data.currentConditions.version ? "#3b82f6" : "#e5e7eb"}`,
                      borderRadius: 6,
                      fontSize: 13
                    }}
                  >
                    <div style={{ fontWeight: 600, marginBottom: 4 }}>
                      v{v.version} {v.version === data.currentConditions.version && "(Current)"}
                    </div>
                    <div style={{ color: "#666", fontSize: 12 }}>
                      ${v.priceMin}-${v.priceMax} • {v.deadline}
                    </div>
                    <div style={{ color: "#999", fontSize: 11, marginTop: 4 }}>
                      by {v.updatedBy}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Edit Conditions Modal */}
      {editingConditions && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000
          }}
          onClick={() => setEditingConditions(false)}
        >
          <div
            className="card"
            style={{
              width: "90%",
              maxWidth: 500,
              maxHeight: "90vh",
              overflowY: "auto"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ marginTop: 0 }}>Edit Agreement Terms</h3>

            {/* Project Scope */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
                Project Scope
              </label>
              <textarea
                value={editScope}
                onChange={(e) => setEditScope(e.target.value)}
                placeholder="Describe what is included in this project..."
                rows={3}
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  border: "1px solid #e5e7eb",
                  borderRadius: 6,
                  fontSize: 14,
                  fontFamily: "inherit",
                  resize: "vertical"
                }}
              />
            </div>

            {/* Financial Terms */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
                  Budget Range
                </label>
                <input
                  type="text"
                  value={editPrice}
                  onChange={(e) => setEditPrice(e.target.value)}
                  placeholder="e.g. 500-900"
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    border: "1px solid #e5e7eb",
                    borderRadius: 6,
                    fontSize: 14
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
                  Revisions
                </label>
                <input
                  type="number"
                  value={editRevisions}
                  onChange={(e) => setEditRevisions(e.target.value)}
                  placeholder="e.g. 3"
                  min="0"
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    border: "1px solid #e5e7eb",
                    borderRadius: 6,
                    fontSize: 14
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
                Payment Schedule
              </label>
              <input
                type="text"
                value={editPaymentSchedule}
                onChange={(e) => setEditPaymentSchedule(e.target.value)}
                placeholder="e.g. 50% upfront, 50% upon completion"
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  border: "1px solid #e5e7eb",
                  borderRadius: 6,
                  fontSize: 14
                }}
              />
            </div>

            {/* Timeline */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
                  Duration
                </label>
                <input
                  type="text"
                  value={editDeadline}
                  onChange={(e) => setEditDeadline(e.target.value)}
                  placeholder="e.g. 2 weeks"
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    border: "1px solid #e5e7eb",
                    borderRadius: 6,
                    fontSize: 14
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
                  Delivery Date
                </label>
                <input
                  type="text"
                  value={editDeliveryDate}
                  onChange={(e) => setEditDeliveryDate(e.target.value)}
                  placeholder="e.g. December 15, 2025"
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    border: "1px solid #e5e7eb",
                    borderRadius: 6,
                    fontSize: 14
                  }}
                />
              </div>
            </div>

            {/* Milestones */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
                Milestones (one per line)
              </label>
              <textarea
                value={editMilestones}
                onChange={(e) => setEditMilestones(e.target.value)}
                placeholder="Design mockups&#10;Development&#10;Testing"
                rows={4}
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  border: "1px solid #e5e7eb",
                  borderRadius: 6,
                  fontSize: 14,
                  fontFamily: "inherit",
                  resize: "vertical"
                }}
              />
            </div>

            {/* Exclusions */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
                Exclusions (optional)
              </label>
              <textarea
                value={editExclusions}
                onChange={(e) => setEditExclusions(e.target.value)}
                placeholder="What is NOT included in this project..."
                rows={2}
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  border: "1px solid #e5e7eb",
                  borderRadius: 6,
                  fontSize: 14,
                  fontFamily: "inherit",
                  resize: "vertical"
                }}
              />
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={handleSaveConditions}
                style={{
                  flex: 1,
                  padding: "10px 20px",
                  background: "#3b82f6",
                  color: "white",
                  border: "none",
                  borderRadius: 6,
                  cursor: "pointer",
                  fontSize: 14,
                  fontWeight: 500
                }}
              >
                Save Changes
              </button>
              <button
                onClick={() => setEditingConditions(false)}
                style={{
                  padding: "10px 20px",
                  background: "#f3f4f6",
                  color: "#666",
                  border: "1px solid #e5e7eb",
                  borderRadius: 6,
                  cursor: "pointer",
                  fontSize: 14,
                  fontWeight: 500
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
