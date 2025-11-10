import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

type Attachment = {
  id: string;
  name: string;
  size: string;
  uploadedAt: string;
  type: string;
};

type Message = {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
  isOwn: boolean;
};

export default function IncomingOfferDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock offer data
  const [offer] = useState({
    id: id || "1",
    title: "Mobile App Development Project",
    description: "Looking for an experienced React Native developer to build a cross-platform mobile application for our startup. The app should include user authentication, real-time messaging, payment integration, and push notifications. We need someone who can start immediately and deliver within 2 months.",
    clientName: "Sarah Johnson",
    clientEmail: "sarah.johnson@example.com",
    clientCompany: "TechStart Inc.",
    assignedBy: {
      name: "John Smith",
      email: "john.smith@example.com",
      assignedAt: "2025-11-10"
    },
    postedAt: "2025-11-09",
    status: "active" as "active" | "closed"
  });

  const [attachments] = useState<Attachment[]>([
    { id: "1", name: "project-requirements.pdf", size: "1.2 MB", uploadedAt: "2025-11-09", type: "pdf" },
    { id: "2", name: "wireframes.fig", size: "3.5 MB", uploadedAt: "2025-11-09", type: "figma" },
    { id: "3", name: "api-docs.pdf", size: "850 KB", uploadedAt: "2025-11-09", type: "pdf" }
  ]);

  const [showProposalChat, setShowProposalChat] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      senderId: "system",
      senderName: "System",
      text: "Proposal started - begin negotiation",
      timestamp: new Date().toLocaleString(),
      isOwn: false
    }
  ]);
  const [newMessage, setNewMessage] = useState("");

  // Proposal Details State
  const [showProposalForm, setShowProposalForm] = useState(false);
  const [proposalDetails, setProposalDetails] = useState({
    budgetMin: "",
    budgetMax: "",
    duration: "",
    deliverables: "",
    terms: "",
    paymentSchedule: ""
  });
  const [proposalSaved, setProposalSaved] = useState(false);
  const [proposalStatus, setProposalStatus] = useState<"draft" | "submitted" | "approved" | "rejected">("draft");

  const handleCreateProposal = () => {
    setShowProposalChat(true);
  };

  const handleSaveProposal = () => {
    if (!proposalDetails.budgetMin || !proposalDetails.budgetMax || !proposalDetails.duration) {
      alert("Please fill in all required fields");
      return;
    }
    setProposalSaved(true);
    setShowProposalForm(false);
    
    // Add system message about proposal details saved
    const systemMsg: Message = {
      id: Date.now().toString(),
      senderId: "system",
      senderName: "System",
      text: "Proposal details saved successfully. You can now submit for approval.",
      timestamp: new Date().toLocaleString(),
      isOwn: false
    };
    setMessages([...messages, systemMsg]);
  };

  const handleSubmitProposal = () => {
    setProposalStatus("submitted");
    const systemMsg: Message = {
      id: Date.now().toString(),
      senderId: "system",
      senderName: "System",
      text: "Proposal submitted for client approval.",
      timestamp: new Date().toLocaleString(),
      isOwn: false
    };
    setMessages([...messages, systemMsg]);
  };

  const handleAutoFill = () => {
    setProposalDetails({
      budgetMin: "4500",
      budgetMax: "6500",
      duration: "2 months (8 weeks)",
      deliverables: "1. Complete mobile app for iOS and Android\n2. User authentication system\n3. Real-time messaging functionality\n4. Payment gateway integration\n5. Push notifications setup\n6. Admin dashboard\n7. Full documentation and deployment",
      paymentSchedule: "• 30% upfront payment ($1,500)\n• 40% after milestone completion ($2,000)\n• 30% upon final delivery and approval ($1,500)",
      terms: "• Source code ownership transferred upon final payment\n• 30 days of free bug fixes after delivery\n• Weekly progress updates\n• All work under NDA\n• Revisions included up to 2 rounds per milestone"
    });
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      senderId: "freelancer-1",
      senderName: "You",
      text: newMessage.trim(),
      timestamp: new Date().toLocaleString(),
      isOwn: true
    };

    setMessages([...messages, message]);
    setNewMessage("");
  };

  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "pdf": return "📄";
      case "doc":
      case "docx": return "📝";
      case "xls":
      case "xlsx": return "📊";
      case "jpg":
      case "jpeg":
      case "png":
      case "gif": return "🖼️";
      case "zip":
      case "rar": return "🗜️";
      case "fig":
      case "figma": return "🎨";
      default: return "📎";
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", paddingBottom: 16 }}>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            background: "transparent",
            border: "none",
            color: "#8b5cf6",
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
            padding: "8px 0",
            marginBottom: 12,
            display: "flex",
            alignItems: "center",
            gap: 4
          }}
        >
          ← Back to Incoming Offers
        </button>

        <div style={{
          background: "white",
          border: "1px solid #e5e7eb",
          borderRadius: 12,
          padding: 20
        }}>
          {/* Create Proposal Button */}
          {!showProposalChat && (
            <button
              onClick={handleCreateProposal}
              style={{
                width: "100%",
                padding: "14px",
                background: "#8b5cf6",
                color: "white",
                border: "none",
                borderRadius: 12,
                fontSize: 16,
                fontWeight: 600,
                cursor: "pointer",
                marginBottom: 20,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8
              }}
            >
              <span>➕</span>
              Create Proposal
            </button>
          )}

          {/* Offer Title & Description */}
          <div style={{ marginBottom: 20 }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, margin: "0 0 12px 0" }}>
              {offer.title}
            </h2>
            <p style={{
              fontSize: 14,
              color: "#374151",
              lineHeight: 1.6,
              margin: 0
            }}>
              {offer.description}
            </p>
          </div>

          {/* Posted Date */}
          <div style={{
            padding: "12px 16px",
            background: "#f9fafb",
            borderRadius: 8,
            marginBottom: 20
          }}>
            <div style={{ fontSize: 12, color: "#666", marginBottom: 4 }}>
              Posted
            </div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#374151" }}>
              {offer.postedAt}
            </div>
          </div>

          {/* Assignment Status */}
          <div style={{
            background: "#eff6ff",
            border: "1px solid #3b82f6",
            borderRadius: 8,
            padding: 16,
            marginBottom: 20
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 8
            }}>
              <span style={{ fontSize: 20 }}>👤</span>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#1e40af" }}>
                Assignment Status
              </div>
            </div>
            <div style={{ fontSize: 14, color: "#1e3a8a", lineHeight: 1.5 }}>
              You have been assigned to this offer by{" "}
              <span style={{ fontWeight: 600 }}>{offer.assignedBy.name}</span>{" "}
              ({offer.assignedBy.email})
            </div>
            <div style={{ fontSize: 12, color: "#60a5fa", marginTop: 4 }}>
              Assigned on {offer.assignedBy.assignedAt}
            </div>
          </div>

          {/* Client Info */}
          <div style={{ marginBottom: 20 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>
              Client Information
            </h3>
            <div style={{
              background: "#f9fafb",
              padding: 16,
              borderRadius: 8
            }}>
              <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>
                {offer.clientName}
              </div>
              <div style={{ fontSize: 13, color: "#666", marginBottom: 2 }}>
                📧 {offer.clientEmail}
              </div>
              {offer.clientCompany && (
                <div style={{ fontSize: 13, color: "#666" }}>
                  🏢 {offer.clientCompany}
                </div>
              )}
            </div>
          </div>

          {/* Attachments */}
          {attachments.length > 0 && (
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>
                Attachments ({attachments.length})
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {attachments.map(attachment => (
                  <div
                    key={attachment.id}
                    style={{
                      background: "#f9fafb",
                      border: "1px solid #e5e7eb",
                      borderRadius: 8,
                      padding: 12,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1 }}>
                      <span style={{ fontSize: 28 }}>{getFileIcon(attachment.type)}</span>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 2 }}>
                          {attachment.name}
                        </div>
                        <div style={{ fontSize: 12, color: "#666" }}>
                          {attachment.size} • {attachment.uploadedAt}
                        </div>
                      </div>
                    </div>
                    <button
                      style={{
                        padding: "6px 12px",
                        background: "white",
                        color: "#8b5cf6",
                        border: "1px solid #8b5cf6",
                        borderRadius: 6,
                        fontSize: 12,
                        fontWeight: 600,
                        cursor: "pointer"
                      }}
                    >
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Proposal Chat Section */}
      {showProposalChat && (
        <div style={{
          background: "white",
          border: "1px solid #e5e7eb",
          borderRadius: 12,
          overflow: "hidden"
        }}>
          <div style={{
            padding: "16px 20px",
            borderBottom: "1px solid #e5e7eb",
            background: "#f9fafb"
          }}>
            <h3 style={{ fontSize: 18, fontWeight: 600, margin: 0 }}>
              💬 Proposal Negotiation
            </h3>
            <div style={{ fontSize: 12, color: "#666", marginTop: 4 }}>
              Discuss the project details with the client
            </div>
          </div>

          {/* Offer Details Summary */}
          <div style={{
            padding: "16px 20px",
            background: "#eff6ff",
            borderBottom: "1px solid #e5e7eb"
          }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, color: "#1e40af" }}>
              Offer Details:
            </div>
            <div style={{ fontSize: 13, color: "#1e3a8a", marginBottom: 4 }}>
              <strong>{offer.title}</strong>
            </div>
            <div style={{ fontSize: 12, color: "#60a5fa" }}>
              Posted: {offer.postedAt}
            </div>
          </div>

          {/* Proposal Action Buttons */}
          {!showProposalForm && proposalStatus === "draft" && (
            <div style={{
              padding: "16px 20px",
              borderBottom: "1px solid #e5e7eb",
              background: "#fefce8"
            }}>
              <button
                onClick={() => setShowProposalForm(true)}
                style={{
                  width: "100%",
                  padding: "12px",
                  background: "#8b5cf6",
                  color: "white",
                  border: "none",
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8
                }}
              >
                📝 Edit Proposal Details
              </button>
            </div>
          )}

          {/* Proposal Form */}
          {showProposalForm && (
            <div style={{
              padding: "20px",
              borderBottom: "1px solid #e5e7eb",
              background: "#f9fafb"
            }}>
              <h4 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16, color: "#374151" }}>
                Professional Proposal Details
              </h4>

              {/* Auto Fill Button for Testing */}
              <div style={{ marginBottom: 16 }}>
                <button
                  onClick={handleAutoFill}
                  style={{
                    width: "100%",
                    padding: "10px",
                    background: "#f3f4f6",
                    color: "#374151",
                    border: "1px solid #d1d5db",
                    borderRadius: 6,
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6
                  }}
                >
                  🔧 Fill (auto for test)
                </button>
              </div>

              {/* Budget Range */}
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 8, color: "#374151" }}>
                  Proposed Budget Range *
                </label>
                <div style={{ display: "flex", gap: 12 }}>
                  <div style={{ flex: 1 }}>
                    <input
                      type="number"
                      placeholder="Min ($)"
                      value={proposalDetails.budgetMin}
                      onChange={(e) => setProposalDetails({...proposalDetails, budgetMin: e.target.value})}
                      style={{
                        width: "100%",
                        padding: "10px",
                        border: "1px solid #d1d5db",
                        borderRadius: 6,
                        fontSize: 14,
                        boxSizing: "border-box"
                      }}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <input
                      type="number"
                      placeholder="Max ($)"
                      value={proposalDetails.budgetMax}
                      onChange={(e) => setProposalDetails({...proposalDetails, budgetMax: e.target.value})}
                      style={{
                        width: "100%",
                        padding: "10px",
                        border: "1px solid #d1d5db",
                        borderRadius: 6,
                        fontSize: 14,
                        boxSizing: "border-box"
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Duration */}
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 8, color: "#374151" }}>
                  Estimated Duration *
                </label>
                <input
                  type="text"
                  placeholder="e.g., 2 months, 8 weeks"
                  value={proposalDetails.duration}
                  onChange={(e) => setProposalDetails({...proposalDetails, duration: e.target.value})}
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #d1d5db",
                    borderRadius: 6,
                    fontSize: 14,
                    boxSizing: "border-box"
                  }}
                />
              </div>

              {/* Deliverables */}
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 8, color: "#374151" }}>
                  Key Deliverables & Milestones
                </label>
                <textarea
                  placeholder="List main deliverables and milestones..."
                  value={proposalDetails.deliverables}
                  onChange={(e) => setProposalDetails({...proposalDetails, deliverables: e.target.value})}
                  rows={4}
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #d1d5db",
                    borderRadius: 6,
                    fontSize: 14,
                    boxSizing: "border-box",
                    resize: "vertical",
                    fontFamily: "inherit"
                  }}
                />
              </div>

              {/* Payment Schedule */}
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 8, color: "#374151" }}>
                  Payment Schedule
                </label>
                <textarea
                  placeholder="e.g., 30% upfront, 40% mid-project, 30% on completion"
                  value={proposalDetails.paymentSchedule}
                  onChange={(e) => setProposalDetails({...proposalDetails, paymentSchedule: e.target.value})}
                  rows={3}
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #d1d5db",
                    borderRadius: 6,
                    fontSize: 14,
                    boxSizing: "border-box",
                    resize: "vertical",
                    fontFamily: "inherit"
                  }}
                />
              </div>

              {/* Terms & Conditions */}
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 8, color: "#374151" }}>
                  Terms & Conditions
                </label>
                <textarea
                  placeholder="Additional terms, conditions, or requirements..."
                  value={proposalDetails.terms}
                  onChange={(e) => setProposalDetails({...proposalDetails, terms: e.target.value})}
                  rows={3}
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #d1d5db",
                    borderRadius: 6,
                    fontSize: 14,
                    boxSizing: "border-box",
                    resize: "vertical",
                    fontFamily: "inherit"
                  }}
                />
              </div>

              {/* Form Actions */}
              <div style={{ display: "flex", gap: 12 }}>
                <button
                  onClick={handleSaveProposal}
                  style={{
                    flex: 1,
                    padding: "12px",
                    background: "#059669",
                    color: "white",
                    border: "none",
                    borderRadius: 8,
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: "pointer"
                  }}
                >
                  💾 Save Proposal
                </button>
                <button
                  onClick={() => setShowProposalForm(false)}
                  style={{
                    flex: 1,
                    padding: "12px",
                    background: "white",
                    color: "#666",
                    border: "1px solid #d1d5db",
                    borderRadius: 8,
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: "pointer"
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Submit Proposal Button */}
          {proposalSaved && proposalStatus === "draft" && (
            <div style={{
              padding: "16px 20px",
              borderBottom: "1px solid #e5e7eb",
              background: "#ecfdf5"
            }}>
              <button
                onClick={handleSubmitProposal}
                style={{
                  width: "100%",
                  padding: "14px",
                  background: "#059669",
                  color: "white",
                  border: "none",
                  borderRadius: 8,
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8
                }}
              >
                ✅ Submit Proposal for Approval
              </button>
            </div>
          )}

          {/* Proposal Status */}
          {proposalStatus === "submitted" && (
            <div style={{
              padding: "16px 20px",
              borderBottom: "1px solid #e5e7eb",
              background: "#fef3c7",
              display: "flex",
              alignItems: "center",
              gap: 12
            }}>
              <span style={{ fontSize: 24 }}>⏳</span>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#92400e" }}>
                  Proposal Submitted
                </div>
                <div style={{ fontSize: 12, color: "#78350f" }}>
                  Waiting for client approval
                </div>
              </div>
            </div>
          )}

          {proposalStatus === "approved" && (
            <div style={{
              padding: "16px 20px",
              borderBottom: "1px solid #e5e7eb",
              background: "#dcfce7",
              display: "flex",
              alignItems: "center",
              gap: 12
            }}>
              <span style={{ fontSize: 24 }}>✅</span>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#166534" }}>
                  Proposal Approved!
                </div>
                <div style={{ fontSize: 12, color: "#15803d" }}>
                  You can now proceed with the project
                </div>
              </div>
            </div>
          )}

          {/* Messages */}
          <div style={{
            padding: 20,
            maxHeight: 400,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 16
          }}>
            {messages.map((message) => (
              <div
                key={message.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: message.senderId === "system" ? "center" : message.isOwn ? "flex-end" : "flex-start"
                }}
              >
                {message.senderId === "system" ? (
                  <div style={{
                    background: "#f3f4f6",
                    color: "#6b7280",
                    padding: "8px 16px",
                    borderRadius: 16,
                    fontSize: 13,
                    fontStyle: "italic"
                  }}>
                    {message.text}
                  </div>
                ) : (
                  <>
                    <div style={{
                      maxWidth: "70%",
                      background: message.isOwn ? "#8b5cf6" : "#f3f4f6",
                      color: message.isOwn ? "white" : "#374151",
                      padding: "12px 16px",
                      borderRadius: 12,
                      borderTopRightRadius: message.isOwn ? 4 : 12,
                      borderTopLeftRadius: message.isOwn ? 12 : 4
                    }}>
                      <div style={{
                        fontSize: 11,
                        fontWeight: 600,
                        marginBottom: 4,
                        opacity: 0.8
                      }}>
                        {message.senderName}
                      </div>
                      <div style={{
                        fontSize: 14,
                        lineHeight: 1.5
                      }}>
                        {message.text}
                      </div>
                    </div>
                    <div style={{
                      fontSize: 11,
                      color: "#9ca3af",
                      marginTop: 4
                    }}>
                      {message.timestamp}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div style={{
            padding: 16,
            borderTop: "1px solid #e5e7eb",
            background: "#f9fafb"
          }}>
            <div style={{ display: "flex", gap: 12 }}>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSendMessage();
                  }
                }}
                placeholder="Type your message..."
                style={{
                  flex: 1,
                  padding: "12px 16px",
                  border: "1px solid #d1d5db",
                  borderRadius: 8,
                  fontSize: 14,
                  background: "white"
                }}
              />
              <button
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                style={{
                  padding: "12px 24px",
                  background: newMessage.trim() ? "#8b5cf6" : "#d1d5db",
                  color: "white",
                  border: "none",
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: newMessage.trim() ? "pointer" : "not-allowed",
                  whiteSpace: "nowrap"
                }}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
