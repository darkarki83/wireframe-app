import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

type Provider = {
  id: string;
  email: string;
  name: string;
  phone: string;
  countryCode: string;
};

type Attachment = {
  id: string;
  name: string;
  size: string;
  uploadedAt: string;
  type: string;
};

type Proposal = {
  id: string;
  freelancerName: string;
  freelancerEmail: string;
  price: number;
  deliveryTime: string;
  description: string;
  status: "pending" | "accepted" | "rejected";
  submittedAt: string;
};

// Mock my providers list
const myProvidersList: Provider[] = [
  { id: "1", email: "sarah.johnson@example.com", name: "Sarah Johnson", phone: "5557890", countryCode: "+1" },
  { id: "2", email: "mike.brown@example.com", name: "Mike Brown", phone: "5551122", countryCode: "+44" },
  { id: "3", email: "john.doe@example.com", name: "John Doe", phone: "5551234", countryCode: "+1" },
  { id: "4", email: "jane.smith@example.com", name: "Jane Smith", phone: "5555678", countryCode: "+1" },
];

export default function OfferDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock offer data
  const [offer] = useState({
    id: id || "1",
    title: "Website Development Proposal",
    description: "Full-stack development for e-commerce platform with React and Node.js. Includes responsive design, payment integration, and admin dashboard.",
    status: "active",
    createdAt: "2025-11-08"
  });

  const [assignedProviders, setAssignedProviders] = useState<Provider[]>([
    { id: "1", email: "sarah.johnson@example.com", name: "Sarah Johnson", phone: "5557890", countryCode: "+1" }
  ]);

  const [attachments, setAttachments] = useState<Attachment[]>([
    { id: "1", name: "project-brief.pdf", size: "2.4 MB", uploadedAt: "2025-11-08", type: "pdf" },
    { id: "2", name: "wireframes.fig", size: "1.8 MB", uploadedAt: "2025-11-08", type: "figma" }
  ]);

  const [proposals, setProposals] = useState<Proposal[]>([
    {
      id: "1",
      freelancerName: "Alex Wilson",
      freelancerEmail: "alex.wilson@example.com",
      price: 2800,
      deliveryTime: "14 days",
      description: "I have 5+ years of experience in full-stack development. I'll deliver a high-quality e-commerce platform with modern design and all requested features.",
      status: "pending",
      submittedAt: "2025-11-09"
    },
    {
      id: "2",
      freelancerName: "Maria Garcia",
      freelancerEmail: "maria.garcia@example.com",
      price: 2500,
      deliveryTime: "10 days",
      description: "Experienced developer specializing in React and Node.js. Can deliver faster with quality guaranteed.",
      status: "pending",
      submittedAt: "2025-11-09"
    },
    {
      id: "3",
      freelancerName: "John Doe",
      freelancerEmail: "john.doe@example.com",
      price: 3200,
      deliveryTime: "21 days",
      description: "Senior full-stack developer with expertise in e-commerce solutions. Will include additional features and optimization.",
      status: "accepted",
      submittedAt: "2025-11-08"
    }
  ]);

  const [showProviderSelector, setShowProviderSelector] = useState(false);
  const [selectedProviderIds, setSelectedProviderIds] = useState<string[]>([]);

  // Get available providers (not already assigned)
  const availableProviders = myProvidersList.filter(
    p => !assignedProviders.find(ap => ap.id === p.id)
  );

  const handleToggleProvider = (providerId: string) => {
    if (selectedProviderIds.includes(providerId)) {
      setSelectedProviderIds(selectedProviderIds.filter(id => id !== providerId));
    } else {
      setSelectedProviderIds([...selectedProviderIds, providerId]);
    }
  };

  const handleAddProviders = () => {
    const providersToAdd = myProvidersList.filter(p => selectedProviderIds.includes(p.id));
    setAssignedProviders([...assignedProviders, ...providersToAdd]);
    setSelectedProviderIds([]);
    setShowProviderSelector(false);
  };

  const handleRemoveProvider = (providerId: string) => {
    setAssignedProviders(assignedProviders.filter(p => p.id !== providerId));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newAttachments: Attachment[] = Array.from(files).map((file, index) => ({
      id: `${Date.now()}-${index}`,
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
      uploadedAt: new Date().toISOString().split('T')[0],
      type: file.name.split('.').pop() || "file"
    }));

    setAttachments([...attachments, ...newAttachments]);
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
      case "gif": return "��️";
      case "zip":
      case "rar": return "🗜️";
      case "fig":
      case "figma": return "🎨";
      default: return "📎";
    }
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
          ← Back
        </button>

        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 12,
          gap: 12
        }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, margin: 0, flex: 1 }}>
            {offer.title}
          </h2>
          <div style={{
            background: getStatusColor(offer.status),
            color: "white",
            padding: "6px 14px",
            borderRadius: 20,
            fontSize: 12,
            fontWeight: 600,
            textTransform: "uppercase",
            whiteSpace: "nowrap"
          }}>
            {offer.status}
          </div>
        </div>

        <p style={{ fontSize: 14, color: "#666", margin: "0 0 8px 0", lineHeight: 1.6 }}>
          {offer.description}
        </p>
        <div style={{ fontSize: 12, color: "#9ca3af" }}>
          Created on {offer.createdAt}
        </div>
      </div>

      {/* Assigned Providers Section */}
      <div style={{
        background: "white",
        border: "1px solid #e5e7eb",
        borderRadius: 12,
        padding: 20,
        marginBottom: 16
      }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16
        }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, margin: 0 }}>
            Assigned Providers ({assignedProviders.length})
          </h3>
          {!showProviderSelector && (
            <button
              onClick={() => setShowProviderSelector(true)}
              style={{
                padding: "8px 16px",
                background: "#8b5cf6",
                color: "white",
                border: "none",
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6
              }}
            >
              <span>➕</span>
              Add Provider
            </button>
          )}
        </div>

        {/* Provider Selector */}
        {showProviderSelector && (
          <div style={{
            background: "#f9fafb",
            border: "1px solid #e5e7eb",
            borderRadius: 8,
            padding: 16,
            marginBottom: 16
          }}>
            <div style={{
              fontSize: 14,
              fontWeight: 600,
              marginBottom: 12,
              color: "#374151"
            }}>
              Select providers to add:
            </div>

            {availableProviders.length === 0 ? (
              <div style={{
                textAlign: "center",
                padding: "20px",
                color: "#9ca3af",
                fontSize: 14
              }}>
                No available providers. All providers are already assigned.
              </div>
            ) : (
              <>
                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  marginBottom: 12
                }}>
                  {availableProviders.map(provider => (
                    <label
                      key={provider.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        padding: "12px",
                        background: selectedProviderIds.includes(provider.id) ? "#ede9fe" : "white",
                        border: selectedProviderIds.includes(provider.id) ? "2px solid #8b5cf6" : "1px solid #e5e7eb",
                        borderRadius: 8,
                        cursor: "pointer"
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={selectedProviderIds.includes(provider.id)}
                        onChange={() => handleToggleProvider(provider.id)}
                        style={{
                          width: 18,
                          height: 18,
                          cursor: "pointer"
                        }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 2 }}>
                          {provider.name}
                        </div>
                        <div style={{ fontSize: 12, color: "#666" }}>
                          {provider.email}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>

                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    onClick={handleAddProviders}
                    disabled={selectedProviderIds.length === 0}
                    style={{
                      flex: 1,
                      padding: "10px",
                      background: selectedProviderIds.length > 0 ? "#8b5cf6" : "#d1d5db",
                      color: "white",
                      border: "none",
                      borderRadius: 6,
                      fontSize: 14,
                      fontWeight: 600,
                      cursor: selectedProviderIds.length > 0 ? "pointer" : "not-allowed"
                    }}
                  >
                    Add Selected ({selectedProviderIds.length})
                  </button>
                  <button
                    onClick={() => {
                      setShowProviderSelector(false);
                      setSelectedProviderIds([]);
                    }}
                    style={{
                      flex: 1,
                      padding: "10px",
                      background: "white",
                      color: "#666",
                      border: "1px solid #d1d5db",
                      borderRadius: 6,
                      fontSize: 14,
                      fontWeight: 600,
                      cursor: "pointer"
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* Assigned Providers List */}
        {assignedProviders.length === 0 ? (
          <div style={{
            textAlign: "center",
            padding: "30px 20px",
            color: "#9ca3af",
            fontSize: 14
          }}>
            No providers assigned yet
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {assignedProviders.map(provider => (
              <div
                key={provider.id}
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
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>
                    {provider.name}
                  </div>
                  <div style={{ fontSize: 12, color: "#666", marginBottom: 2 }}>
                    📧 {provider.email}
                  </div>
                  <div style={{ fontSize: 12, color: "#666" }}>
                    📱 {provider.countryCode} {provider.phone}
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveProvider(provider.id)}
                  style={{
                    padding: "6px 12px",
                    background: "#fee2e2",
                    color: "#dc2626",
                    border: "none",
                    borderRadius: 6,
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer"
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Attachments Section */}
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
          marginBottom: 16
        }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, margin: 0 }}>
            Attachments ({attachments.length})
          </h3>
          <label style={{
            padding: "8px 16px",
            background: "#8b5cf6",
            color: "white",
            border: "none",
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 6
          }}>
            <span>📎</span>
            Upload
            <input
              type="file"
              multiple
              onChange={handleFileUpload}
              style={{ display: "none" }}
            />
          </label>
        </div>

        {attachments.length === 0 ? (
          <div style={{
            textAlign: "center",
            padding: "30px 20px",
            color: "#9ca3af",
            fontSize: 14
          }}>
            No attachments yet
          </div>
        ) : (
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
        )}
      </div>

      {/* Proposals Section */}
      <div style={{
        background: "white",
        border: "1px solid #e5e7eb",
        borderRadius: 12,
        padding: 20,
        marginTop: 16
      }}>
        <h3 style={{ fontSize: 18, fontWeight: 600, margin: "0 0 16px 0" }}>
          Proposals ({proposals.length})
        </h3>

        {proposals.length === 0 ? (
          <div style={{
            textAlign: "center",
            padding: "30px 20px",
            color: "#9ca3af",
            fontSize: 14
          }}>
            No proposals yet
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {proposals.map(proposal => (
              <div
                key={proposal.id}
                style={{
                  background: "#f9fafb",
                  border: "1px solid #e5e7eb",
                  borderRadius: 12,
                  padding: 16
                }}
              >
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: 12,
                  gap: 12
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      marginBottom: 4
                    }}>
                      <div style={{ fontWeight: 600, fontSize: 16 }}>
                        {proposal.freelancerName}
                      </div>
                      <div style={{
                        background: proposal.status === "accepted" ? "#059669" :
                                   proposal.status === "rejected" ? "#dc2626" : "#f59e0b",
                        color: "white",
                        padding: "2px 8px",
                        borderRadius: 12,
                        fontSize: 10,
                        fontWeight: 600,
                        textTransform: "uppercase"
                      }}>
                        {proposal.status}
                      </div>
                    </div>
                    <div style={{ fontSize: 13, color: "#666", marginBottom: 8 }}>
                      📧 {proposal.freelancerEmail}
                    </div>
                    <div style={{
                      display: "flex",
                      gap: 16,
                      marginBottom: 10,
                      flexWrap: "wrap"
                    }}>
                      <div style={{ fontSize: 14 }}>
                        <span style={{ fontWeight: 600, color: "#8b5cf6" }}>
                          ${proposal.price}
                        </span>
                      </div>
                      <div style={{ fontSize: 14, color: "#666" }}>
                        ⏱️ {proposal.deliveryTime}
                      </div>
                      <div style={{ fontSize: 12, color: "#9ca3af" }}>
                        Submitted: {proposal.submittedAt}
                      </div>
                    </div>
                    <p style={{
                      fontSize: 13,
                      color: "#374151",
                      margin: 0,
                      lineHeight: 1.5
                    }}>
                      {proposal.description}
                    </p>
                  </div>
                </div>

                {proposal.status === "pending" && (
                  <div style={{
                    display: "flex",
                    gap: 8,
                    marginTop: 12,
                    paddingTop: 12,
                    borderTop: "1px solid #e5e7eb"
                  }}>
                    <button
                      onClick={() => {
                        setProposals(proposals.map(p =>
                          p.id === proposal.id ? { ...p, status: "accepted" } : p
                        ));
                      }}
                      style={{
                        flex: 1,
                        padding: "10px",
                        background: "#059669",
                        color: "white",
                        border: "none",
                        borderRadius: 8,
                        fontSize: 14,
                        fontWeight: 600,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 6
                      }}
                    >
                      <span>✓</span>
                      Accept
                    </button>
                    <button
                      onClick={() => {
                        setProposals(proposals.map(p =>
                          p.id === proposal.id ? { ...p, status: "rejected" } : p
                        ));
                      }}
                      style={{
                        flex: 1,
                        padding: "10px",
                        background: "white",
                        color: "#dc2626",
                        border: "1px solid #dc2626",
                        borderRadius: 8,
                        fontSize: 14,
                        fontWeight: 600,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 6
                      }}
                    >
                      <span>✕</span>
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
