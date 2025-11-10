import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

type Message = {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
  isOwn: boolean;
};

export default function ProposalDetailsPage() {
  const { offerId, proposalId } = useParams();
  const navigate = useNavigate();

  // Mock proposal data
  const [proposal, setProposal] = useState({
    id: proposalId || "1",
    freelancerName: "Alex Wilson",
    freelancerEmail: "alex.wilson@example.com",
    freelancerPhone: "+44 5559012",
    price: 2800,
    deliveryTime: "14 days",
    description: "I have 5+ years of experience in full-stack development. I'll deliver a high-quality e-commerce platform with modern design and all requested features.",
    status: "pending" as "pending" | "accepted" | "rejected",
    submittedAt: "2025-11-09",
    offerTitle: "Website Development Proposal",
    skills: ["React", "Node.js", "TypeScript", "MongoDB", "AWS"],
    portfolio: [
      { title: "E-commerce Platform", url: "https://example.com/project1" },
      { title: "SaaS Dashboard", url: "https://example.com/project2" }
    ],
    experience: "5+ years",
    completedProjects: 47,
    rating: 4.9
  });

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      senderId: "freelancer-1",
      senderName: "Alex Wilson",
      text: "Hi! I've submitted my proposal for your project. I'm very excited about this opportunity!",
      timestamp: "2025-11-09 10:30",
      isOwn: false
    },
    {
      id: "2",
      senderId: "client-1",
      senderName: "You",
      text: "Hello Alex! Thanks for your proposal. Can you tell me more about your experience with e-commerce platforms?",
      timestamp: "2025-11-09 11:15",
      isOwn: true
    },
    {
      id: "3",
      senderId: "freelancer-1",
      senderName: "Alex Wilson",
      text: "Of course! I've built 12+ e-commerce platforms in the last 3 years. My most recent project was a multi-vendor marketplace with 50k+ active users. I'm experienced with payment integrations, inventory management, and admin dashboards.",
      timestamp: "2025-11-09 11:45",
      isOwn: false
    },
    {
      id: "4",
      senderId: "client-1",
      senderName: "You",
      text: "That sounds great! What payment gateways have you worked with?",
      timestamp: "2025-11-09 12:00",
      isOwn: true
    },
    {
      id: "5",
      senderId: "freelancer-1",
      senderName: "Alex Wilson",
      text: "I have extensive experience with Stripe, PayPal, Square, and also worked with custom payment solutions. I can integrate any payment gateway you prefer!",
      timestamp: "2025-11-09 12:15",
      isOwn: false
    }
  ]);

  const [newMessage, setNewMessage] = useState("");
  const [showContractForm, setShowContractForm] = useState(false);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      senderId: "client-1",
      senderName: "You",
      text: newMessage.trim(),
      timestamp: new Date().toLocaleString(),
      isOwn: true
    };

    setMessages([...messages, message]);
    setNewMessage("");
  };

  const handleAcceptProposal = () => {
    setProposal({ ...proposal, status: "accepted" });
    setShowContractForm(true);
  };

  const handleRejectProposal = () => {
    setProposal({ ...proposal, status: "rejected" });
  };

  const handleCreateContract = () => {
    // Create contract and navigate
    alert("Contract created successfully!");
    navigate("/contracts");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted": return "#059669";
      case "rejected": return "#dc2626";
      case "pending": return "#f59e0b";
      default: return "#666";
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
          ← Back to Offer
        </button>

        <div style={{
          background: "white",
          border: "1px solid #e5e7eb",
          borderRadius: 12,
          padding: 20
        }}>
          <div style={{ fontSize: 12, color: "#9ca3af", marginBottom: 8 }}>
            Proposal for: {proposal.offerTitle}
          </div>

          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 16,
            gap: 12
          }}>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: 24, fontWeight: 700, margin: "0 0 8px 0" }}>
                {proposal.freelancerName}
              </h2>
              <div style={{ fontSize: 14, color: "#666", marginBottom: 4 }}>
                📧 {proposal.freelancerEmail}
              </div>
              <div style={{ fontSize: 14, color: "#666", marginBottom: 8 }}>
                📱 {proposal.freelancerPhone}
              </div>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <div style={{ fontSize: 14, color: "#666" }}>
                  ⭐ {proposal.rating} / 5.0
                </div>
                <div style={{ fontSize: 14, color: "#666" }}>
                  • {proposal.completedProjects} projects completed
                </div>
              </div>
            </div>

            <div style={{
              background: getStatusColor(proposal.status),
              color: "white",
              padding: "6px 14px",
              borderRadius: 20,
              fontSize: 12,
              fontWeight: 600,
              textTransform: "uppercase",
              whiteSpace: "nowrap"
            }}>
              {proposal.status}
            </div>
          </div>

          {/* Price and Delivery */}
          <div style={{
            display: "flex",
            gap: 24,
            padding: "16px",
            background: "#f9fafb",
            borderRadius: 8,
            marginBottom: 16
          }}>
            <div>
              <div style={{ fontSize: 12, color: "#666", marginBottom: 4 }}>
                Price
              </div>
              <div style={{ fontSize: 24, fontWeight: 700, color: "#8b5cf6" }}>
                ${proposal.price}
              </div>
            </div>
            <div style={{ borderLeft: "1px solid #e5e7eb", paddingLeft: 24 }}>
              <div style={{ fontSize: 12, color: "#666", marginBottom: 4 }}>
                Delivery Time
              </div>
              <div style={{ fontSize: 18, fontWeight: 600, color: "#374151" }}>
                {proposal.deliveryTime}
              </div>
            </div>
            <div style={{ borderLeft: "1px solid #e5e7eb", paddingLeft: 24 }}>
              <div style={{ fontSize: 12, color: "#666", marginBottom: 4 }}>
                Experience
              </div>
              <div style={{ fontSize: 18, fontWeight: 600, color: "#374151" }}>
                {proposal.experience}
              </div>
            </div>
          </div>

          {/* Description */}
          <div style={{ marginBottom: 16 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>
              Proposal Description
            </h3>
            <p style={{
              fontSize: 14,
              color: "#374151",
              lineHeight: 1.6,
              margin: 0
            }}>
              {proposal.description}
            </p>
          </div>

          {/* Skills */}
          <div style={{ marginBottom: 16 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>
              Skills
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {proposal.skills.map((skill, index) => (
                <span
                  key={index}
                  style={{
                    background: "#ede9fe",
                    color: "#8b5cf6",
                    padding: "4px 12px",
                    borderRadius: 16,
                    fontSize: 13,
                    fontWeight: 500
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Portfolio */}
          <div style={{ marginBottom: 16 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>
              Portfolio
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {proposal.portfolio.map((item, index) => (
                <a
                  key={index}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "#8b5cf6",
                    fontSize: 14,
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: 6
                  }}
                >
                  🔗 {item.title}
                </a>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          {proposal.status === "pending" && (
            <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
              <button
                onClick={handleAcceptProposal}
                style={{
                  flex: 1,
                  padding: "12px",
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
                <span>✓</span>
                Accept Proposal
              </button>
              <button
                onClick={handleRejectProposal}
                style={{
                  flex: 1,
                  padding: "12px",
                  background: "white",
                  color: "#dc2626",
                  border: "1px solid #dc2626",
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
                <span>✕</span>
                Reject Proposal
              </button>
            </div>
          )}

          {/* Create Contract Section - shown after accepting */}
          {proposal.status === "accepted" && showContractForm && (
            <div style={{
              marginTop: 20,
              padding: 20,
              background: "#f0fdf4",
              border: "2px solid #059669",
              borderRadius: 12
            }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 16
              }}>
                <span style={{ fontSize: 24 }}>✅</span>
                <h3 style={{ fontSize: 18, fontWeight: 600, margin: 0, color: "#059669" }}>
                  Proposal Accepted!
                </h3>
              </div>
              <p style={{
                fontSize: 14,
                color: "#166534",
                marginBottom: 16,
                lineHeight: 1.5
              }}>
                Great choice! Now you can create a contract with {proposal.freelancerName} to formalize the agreement.
              </p>
              <div style={{
                background: "white",
                padding: 16,
                borderRadius: 8,
                marginBottom: 16
              }}>
                <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>
                  Contract Details:
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#666" }}>Freelancer:</span>
                    <span style={{ fontWeight: 600 }}>{proposal.freelancerName}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#666" }}>Project:</span>
                    <span style={{ fontWeight: 600 }}>{proposal.offerTitle}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#666" }}>Amount:</span>
                    <span style={{ fontWeight: 700, color: "#8b5cf6" }}>${proposal.price}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#666" }}>Delivery Time:</span>
                    <span style={{ fontWeight: 600 }}>{proposal.deliveryTime}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={handleCreateContract}
                style={{
                  width: "100%",
                  padding: "14px",
                  background: "#059669",
                  color: "white",
                  border: "none",
                  borderRadius: 8,
                  fontSize: 16,
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8
                }}
              >
                <span>📝</span>
                Create Contract
              </button>
            </div>
          )}

          <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 12 }}>
            Submitted on {proposal.submittedAt}
          </div>
        </div>
      </div>

      {/* Chat Section */}
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
            💬 Discussion
          </h3>
        </div>

        {/* Messages */}
        <div style={{
          padding: 20,
          maxHeight: 500,
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
                alignItems: message.isOwn ? "flex-end" : "flex-start"
              }}
            >
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
    </div>
  );
}
