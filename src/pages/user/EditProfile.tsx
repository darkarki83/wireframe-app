import { useState } from "react";

type PortfolioItem = {
  id: string;
  title: string;
  description: string;
};

export default function EditProfile() {
  const [activeTab, setActiveTab] = useState<"profile" | "skills" | "portfolio" | "settings">("profile");

  // Profile state
  const [name, setName] = useState("John Doe");
  const [bio, setBio] = useState("Experienced full-stack developer with 5+ years in web and mobile development. Specialized in React, Node.js, and cloud technologies.");
  const [location, setLocation] = useState("San Francisco, CA");
  const [hourlyRate, setHourlyRate] = useState("75");

  // Skills state
  const [skills, setSkills] = useState<string[]>([
    "React", "TypeScript", "Node.js", "MongoDB", "AWS"
  ]);
  const [newSkill, setNewSkill] = useState("");

  // Portfolio state
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([
    {
      id: "1",
      title: "E-commerce Platform",
      description: "Built a full-featured e-commerce platform with payment integration"
    },
    {
      id: "2",
      title: "Mobile Banking App",
      description: "Developed a secure mobile banking application for iOS and Android"
    }
  ]);
  const [showPortfolioForm, setShowPortfolioForm] = useState(false);
  const [portfolioTitle, setPortfolioTitle] = useState("");
  const [portfolioDescription, setPortfolioDescription] = useState("");

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setSkills(skills.filter(s => s !== skill));
  };

  const handleAddPortfolio = () => {
    if (portfolioTitle.trim() && portfolioDescription.trim()) {
      const newItem: PortfolioItem = {
        id: Date.now().toString(),
        title: portfolioTitle.trim(),
        description: portfolioDescription.trim()
      };
      setPortfolio([...portfolio, newItem]);
      setPortfolioTitle("");
      setPortfolioDescription("");
      setShowPortfolioForm(false);
    }
  };

  const handleRemovePortfolio = (id: string) => {
    setPortfolio(portfolio.filter(p => p.id !== id));
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", paddingBottom: 16 }}>
      <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>Edit Profile</h2>

      {/* Tabs */}
      <div style={{
        display: "flex",
        gap: 8,
        marginBottom: 24,
        borderBottom: "2px solid #e5e7eb",
        overflowX: "auto"
      }}>
        <button
          onClick={() => setActiveTab("profile")}
          style={{
            padding: "12px 20px",
            background: "transparent",
            border: "none",
            borderBottom: activeTab === "profile" ? "3px solid #8b5cf6" : "3px solid transparent",
            color: activeTab === "profile" ? "#8b5cf6" : "#666",
            fontWeight: activeTab === "profile" ? 700 : 500,
            fontSize: 15,
            cursor: "pointer",
            marginBottom: -2,
            whiteSpace: "nowrap"
          }}
        >
          👤 Profile
        </button>
        <button
          onClick={() => setActiveTab("skills")}
          style={{
            padding: "12px 20px",
            background: "transparent",
            border: "none",
            borderBottom: activeTab === "skills" ? "3px solid #8b5cf6" : "3px solid transparent",
            color: activeTab === "skills" ? "#8b5cf6" : "#666",
            fontWeight: activeTab === "skills" ? 700 : 500,
            fontSize: 15,
            cursor: "pointer",
            marginBottom: -2,
            whiteSpace: "nowrap"
          }}
        >
          🔧 Skills
        </button>
        <button
          onClick={() => setActiveTab("portfolio")}
          style={{
            padding: "12px 20px",
            background: "transparent",
            border: "none",
            borderBottom: activeTab === "portfolio" ? "3px solid #8b5cf6" : "3px solid transparent",
            color: activeTab === "portfolio" ? "#8b5cf6" : "#666",
            fontWeight: activeTab === "portfolio" ? 700 : 500,
            fontSize: 15,
            cursor: "pointer",
            marginBottom: -2,
            whiteSpace: "nowrap"
          }}
        >
          💼 Portfolio
        </button>
        <button
          onClick={() => setActiveTab("settings")}
          style={{
            padding: "12px 20px",
            background: "transparent",
            border: "none",
            borderBottom: activeTab === "settings" ? "3px solid #8b5cf6" : "3px solid transparent",
            color: activeTab === "settings" ? "#8b5cf6" : "#666",
            fontWeight: activeTab === "settings" ? 700 : 500,
            fontSize: 15,
            cursor: "pointer",
            marginBottom: -2,
            whiteSpace: "nowrap"
          }}
        >
          ⚙️ Settings
        </button>
      </div>

      {/* Profile Tab */}
      {activeTab === "profile" && (
        <div style={{
          background: "white",
          border: "1px solid #e5e7eb",
          borderRadius: 12,
          padding: 24
        }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 20, marginTop: 0 }}>
            Basic Information
          </h3>

          {/* Avatar */}
          <div style={{ marginBottom: 24, textAlign: "center" }}>
            <div
              style={{
                width: 100,
                height: 100,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 40,
                color: "white",
                fontWeight: 700,
                marginBottom: 12
              }}
            >
              {name.charAt(0)}
            </div>
            <div>
              <button style={{
                padding: "8px 16px",
                background: "#f3f4f6",
                border: "1px solid #d1d5db",
                borderRadius: 6,
                fontSize: 13,
                fontWeight: 500,
                cursor: "pointer"
              }}>
                Change Avatar
              </button>
            </div>
          </div>

          {/* Name */}
          <div style={{ marginBottom: 20 }}>
            <label style={{
              display: "block",
              marginBottom: 8,
              fontSize: 14,
              fontWeight: 600,
              color: "#374151"
            }}>
              Full Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #d1d5db",
                borderRadius: 8,
                fontSize: 15,
                boxSizing: "border-box"
              }}
            />
          </div>

          {/* Bio */}
          <div style={{ marginBottom: 20 }}>
            <label style={{
              display: "block",
              marginBottom: 8,
              fontSize: 14,
              fontWeight: 600,
              color: "#374151"
            }}>
              Bio
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #d1d5db",
                borderRadius: 8,
                fontSize: 15,
                boxSizing: "border-box",
                resize: "vertical",
                fontFamily: "inherit"
              }}
            />
          </div>

          {/* Location */}
          <div style={{ marginBottom: 20 }}>
            <label style={{
              display: "block",
              marginBottom: 8,
              fontSize: 14,
              fontWeight: 600,
              color: "#374151"
            }}>
              Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="City, Country"
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #d1d5db",
                borderRadius: 8,
                fontSize: 15,
                boxSizing: "border-box"
              }}
            />
          </div>

          {/* Hourly Rate */}
          <div style={{ marginBottom: 24 }}>
            <label style={{
              display: "block",
              marginBottom: 8,
              fontSize: 14,
              fontWeight: 600,
              color: "#374151"
            }}>
              Hourly Rate ($)
            </label>
            <input
              type="number"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(e.target.value)}
              placeholder="75"
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #d1d5db",
                borderRadius: 8,
                fontSize: 15,
                boxSizing: "border-box"
              }}
            />
          </div>

          {/* Save Button */}
          <button
            onClick={() => alert("Profile saved! (mock)")}
            style={{
              width: "100%",
              padding: "14px",
              background: "#8b5cf6",
              color: "white",
              border: "none",
              borderRadius: 8,
              fontSize: 16,
              fontWeight: 600,
              cursor: "pointer"
            }}
          >
            💾 Save Changes
          </button>
        </div>
      )}

      {/* Skills Tab */}
      {activeTab === "skills" && (
        <div style={{
          background: "white",
          border: "1px solid #e5e7eb",
          borderRadius: 12,
          padding: 24
        }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 20, marginTop: 0 }}>
            My Skills
          </h3>

          {/* Add Skill */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ display: "flex", gap: 12 }}>
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleAddSkill();
                  }
                }}
                placeholder="Add a skill (e.g., React, Python, Design)"
                style={{
                  flex: 1,
                  padding: "12px",
                  border: "1px solid #d1d5db",
                  borderRadius: 8,
                  fontSize: 15,
                  boxSizing: "border-box"
                }}
              />
              <button
                onClick={handleAddSkill}
                style={{
                  padding: "12px 24px",
                  background: "#8b5cf6",
                  color: "white",
                  border: "none",
                  borderRadius: 8,
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: "pointer",
                  whiteSpace: "nowrap"
                }}
              >
                ➕ Add
              </button>
            </div>
          </div>

          {/* Skills List */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {skills.map((skill) => (
              <div
                key={skill}
                style={{
                  padding: "8px 16px",
                  background: "#f0f9ff",
                  color: "#0369a1",
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 500,
                  display: "flex",
                  alignItems: "center",
                  gap: 8
                }}
              >
                <span>{skill}</span>
                <button
                  onClick={() => handleRemoveSkill(skill)}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "#dc2626",
                    cursor: "pointer",
                    fontSize: 16,
                    padding: 0,
                    display: "flex",
                    alignItems: "center"
                  }}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {skills.length === 0 && (
            <div style={{
              textAlign: "center",
              padding: "40px 20px",
              color: "#9ca3af",
              fontSize: 14
            }}>
              No skills added yet. Add your first skill!
            </div>
          )}
        </div>
      )}

      {/* Portfolio Tab */}
      {activeTab === "portfolio" && (
        <div style={{
          background: "white",
          border: "1px solid #e5e7eb",
          borderRadius: 12,
          padding: 24
        }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 20, marginTop: 0 }}>
            Portfolio Projects
          </h3>

          {/* Add Portfolio Button */}
          {!showPortfolioForm && (
            <button
              onClick={() => setShowPortfolioForm(true)}
              style={{
                width: "100%",
                padding: "14px",
                background: "#8b5cf6",
                color: "white",
                border: "none",
                borderRadius: 12,
                fontSize: 15,
                fontWeight: 600,
                cursor: "pointer",
                marginBottom: 24,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8
              }}
            >
              <span>➕</span>
              Add Portfolio Item
            </button>
          )}

          {/* Portfolio Form */}
          {showPortfolioForm && (
            <div style={{
              background: "#f9fafb",
              border: "1px solid #e5e7eb",
              borderRadius: 12,
              padding: 20,
              marginBottom: 24
            }}>
              <h4 style={{ margin: "0 0 16px 0", fontSize: 16, fontWeight: 600 }}>
                Add New Portfolio Item
              </h4>

              <div style={{ marginBottom: 16 }}>
                <label style={{
                  display: "block",
                  marginBottom: 8,
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#374151"
                }}>
                  Project Title *
                </label>
                <input
                  type="text"
                  value={portfolioTitle}
                  onChange={(e) => setPortfolioTitle(e.target.value)}
                  placeholder="E.g., E-commerce Platform"
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "1px solid #d1d5db",
                    borderRadius: 8,
                    fontSize: 15,
                    boxSizing: "border-box"
                  }}
                />
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={{
                  display: "block",
                  marginBottom: 8,
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#374151"
                }}>
                  Description *
                </label>
                <textarea
                  value={portfolioDescription}
                  onChange={(e) => setPortfolioDescription(e.target.value)}
                  placeholder="Describe the project..."
                  rows={4}
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "1px solid #d1d5db",
                    borderRadius: 8,
                    fontSize: 15,
                    boxSizing: "border-box",
                    resize: "vertical",
                    fontFamily: "inherit"
                  }}
                />
              </div>

              <div style={{ display: "flex", gap: 12 }}>
                <button
                  onClick={handleAddPortfolio}
                  style={{
                    flex: 1,
                    padding: "12px",
                    background: "#8b5cf6",
                    color: "white",
                    border: "none",
                    borderRadius: 8,
                    fontSize: 15,
                    fontWeight: 600,
                    cursor: "pointer"
                  }}
                >
                  Add
                </button>
                <button
                  onClick={() => {
                    setShowPortfolioForm(false);
                    setPortfolioTitle("");
                    setPortfolioDescription("");
                  }}
                  style={{
                    flex: 1,
                    padding: "12px",
                    background: "white",
                    color: "#666",
                    border: "1px solid #d1d5db",
                    borderRadius: 8,
                    fontSize: 15,
                    fontWeight: 600,
                    cursor: "pointer"
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Portfolio List */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {portfolio.map((item) => (
              <div
                key={item.id}
                style={{
                  padding: 16,
                  background: "#f9fafb",
                  border: "1px solid #e5e7eb",
                  borderRadius: 12
                }}
              >
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: 8
                }}>
                  <h4 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>
                    {item.title}
                  </h4>
                  <button
                    onClick={() => handleRemovePortfolio(item.id)}
                    style={{
                      padding: "6px 12px",
                      background: "#fee2e2",
                      color: "#dc2626",
                      border: "none",
                      borderRadius: 6,
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: "pointer"
                    }}
                  >
                    Remove
                  </button>
                </div>
                <p style={{
                  margin: 0,
                  fontSize: 14,
                  color: "#666",
                  lineHeight: 1.6
                }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {portfolio.length === 0 && !showPortfolioForm && (
            <div style={{
              textAlign: "center",
              padding: "40px 20px",
              color: "#9ca3af",
              fontSize: 14
            }}>
              No portfolio items yet. Add your first project!
            </div>
          )}
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === "settings" && (
        <div style={{
          background: "white",
          border: "1px solid #e5e7eb",
          borderRadius: 12,
          padding: 24
        }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 20, marginTop: 0 }}>
            Account Settings
          </h3>

          {/* Email */}
          <div style={{ marginBottom: 20 }}>
            <label style={{
              display: "block",
              marginBottom: 8,
              fontSize: 14,
              fontWeight: 600,
              color: "#374151"
            }}>
              Email Address
            </label>
            <input
              type="email"
              defaultValue="john.doe@example.com"
              disabled
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #d1d5db",
                borderRadius: 8,
                fontSize: 15,
                boxSizing: "border-box",
                background: "#f9fafb",
                cursor: "not-allowed"
              }}
            />
            <div style={{ fontSize: 12, color: "#666", marginTop: 4 }}>
              Contact support to change your email
            </div>
          </div>

          {/* Password */}
          <div style={{ marginBottom: 24 }}>
            <label style={{
              display: "block",
              marginBottom: 8,
              fontSize: 14,
              fontWeight: 600,
              color: "#374151"
            }}>
              Password
            </label>
            <button
              onClick={() => alert("Change password (mock)")}
              style={{
                padding: "12px 20px",
                background: "white",
                color: "#8b5cf6",
                border: "1px solid #8b5cf6",
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer"
              }}
            >
              Change Password
            </button>
          </div>

          {/* Notifications */}
          <div style={{ marginBottom: 24 }}>
            <h4 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>
              Notifications
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <label style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "12px",
                background: "#f9fafb",
                borderRadius: 8,
                cursor: "pointer"
              }}>
                <input type="checkbox" defaultChecked />
                <span style={{ fontSize: 14 }}>Email notifications for new messages</span>
              </label>
              <label style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "12px",
                background: "#f9fafb",
                borderRadius: 8,
                cursor: "pointer"
              }}>
                <input type="checkbox" defaultChecked />
                <span style={{ fontSize: 14 }}>Email notifications for job offers</span>
              </label>
              <label style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "12px",
                background: "#f9fafb",
                borderRadius: 8,
                cursor: "pointer"
              }}>
                <input type="checkbox" />
                <span style={{ fontSize: 14 }}>Weekly digest email</span>
              </label>
            </div>
          </div>

          {/* Danger Zone */}
          <div style={{
            padding: 20,
            background: "#fef2f2",
            border: "1px solid #fecaca",
            borderRadius: 8
          }}>
            <h4 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, color: "#dc2626" }}>
              Danger Zone
            </h4>
            <p style={{ fontSize: 14, color: "#666", marginBottom: 12 }}>
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <button
              onClick={() => {
                if (confirm("Are you sure you want to delete your account?")) {
                  alert("Account deleted (mock)");
                }
              }}
              style={{
                padding: "10px 20px",
                background: "#dc2626",
                color: "white",
                border: "none",
                borderRadius: 6,
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer"
              }}
            >
              Delete Account
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
