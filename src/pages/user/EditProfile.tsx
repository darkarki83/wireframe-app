import { useState } from "react";
import { colors, typography, spacing, borderRadius, components, shadows } from "../../lib/designTokens";

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
    <div style={{
      minHeight: '100vh',
      background: colors.base.background,
      paddingBottom: '80px',
    }}>
      {/* Title */}
      <div style={{
        padding: `${spacing.lg} ${spacing.lg} 0`,
      }}>
        <h2 style={{
          fontSize: typography.fontSize.h1,
          fontWeight: typography.fontWeight.semibold,
          color: colors.text.primary,
          margin: 0,
          marginBottom: spacing.lg,
        }}>
          Edit Profile
        </h2>
      </div>

      {/* Tabs */}
      <div style={{
        padding: `0 ${spacing.lg} ${spacing.lg}`,
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          gap: spacing.xs,
          marginBottom: spacing.lg,
        }}>
          <button
            onClick={() => setActiveTab("profile")}
            style={{
              padding: `${spacing.md} ${spacing.sm}`,
              background: activeTab === "profile" ? colors.primary.main : colors.base.surface,
              color: activeTab === "profile" ? colors.text.inverse : colors.text.default,
              border: 'none',
              borderRadius: borderRadius.md,
              fontWeight: typography.fontWeight.semibold,
              fontSize: typography.fontSize.caption,
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: spacing.xs,
              minHeight: '70px',
              boxShadow: shadows.sm,
            }}
          >
            <svg width="20" height="20" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="10" r="5" fill={activeTab === "profile" ? "rgba(255,255,255,0.2)" : colors.primary.light} />
              <circle cx="14" cy="10" r="5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M6 24c0-4 3.6-7 8-7s8 3 8 7" fill={activeTab === "profile" ? "rgba(255,255,255,0.2)" : colors.primary.light} />
              <path d="M6 24c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span>Profile</span>
          </button>
          
          <button
            onClick={() => setActiveTab("skills")}
            style={{
              padding: `${spacing.md} ${spacing.sm}`,
              background: activeTab === "skills" ? colors.primary.main : colors.base.surface,
              color: activeTab === "skills" ? colors.text.inverse : colors.text.default,
              border: 'none',
              borderRadius: borderRadius.md,
              fontWeight: typography.fontWeight.semibold,
              fontSize: typography.fontSize.caption,
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: spacing.xs,
              minHeight: '70px',
              boxShadow: shadows.sm,
            }}
          >
            <svg width="20" height="20" viewBox="0 0 28 28" fill="none">
              <rect x="4" y="10" width="20" height="12" rx="2" fill={activeTab === "skills" ? "rgba(255,255,255,0.2)" : colors.primary.light} />
              <path d="M9 6l5 4 5-4M4 16h20M4 12h20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <rect x="4" y="10" width="20" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <span>Skills</span>
          </button>
          
          <button
            onClick={() => setActiveTab("portfolio")}
            style={{
              padding: `${spacing.md} ${spacing.sm}`,
              background: activeTab === "portfolio" ? colors.primary.main : colors.base.surface,
              color: activeTab === "portfolio" ? colors.text.inverse : colors.text.default,
              border: 'none',
              borderRadius: borderRadius.md,
              fontWeight: typography.fontWeight.semibold,
              fontSize: typography.fontSize.caption,
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: spacing.xs,
              minHeight: '70px',
              boxShadow: shadows.sm,
            }}
          >
            <svg width="20" height="20" viewBox="0 0 28 28" fill="none">
              <rect x="5" y="8" width="18" height="14" rx="2" fill={activeTab === "portfolio" ? "rgba(255,255,255,0.2)" : colors.primary.light} />
              <path d="M9 8V7a2 2 0 012-2h6a2 2 0 012 2v1" fill={activeTab === "portfolio" ? "rgba(255,255,255,0.2)" : colors.primary.light} />
              <rect x="5" y="8" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
              <path d="M9 8V7a2 2 0 012-2h6a2 2 0 012 2v1" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <span>Portfolio</span>
          </button>
          
          <button
            onClick={() => setActiveTab("settings")}
            style={{
              padding: `${spacing.md} ${spacing.sm}`,
              background: activeTab === "settings" ? colors.primary.main : colors.base.surface,
              color: activeTab === "settings" ? colors.text.inverse : colors.text.default,
              border: 'none',
              borderRadius: borderRadius.md,
              fontWeight: typography.fontWeight.semibold,
              fontSize: typography.fontSize.caption,
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: spacing.xs,
              minHeight: '70px',
              boxShadow: shadows.sm,
            }}
          >
            <svg width="20" height="20" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="14" r="3" fill={activeTab === "settings" ? "rgba(255,255,255,0.2)" : colors.primary.light} />
              <circle cx="14" cy="14" r="8" fill={activeTab === "settings" ? "rgba(255,255,255,0.2)" : colors.primary.light} />
              <circle cx="14" cy="14" r="3" stroke="currentColor" strokeWidth="1.5" />
              <path d="M14 6v2M14 20v2M6 14h2M20 14h2M9.2 9.2l1.4 1.4M17.4 17.4l1.4 1.4M9.2 18.8l1.4-1.4M17.4 10.6l1.4-1.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span>Settings</span>
          </button>
        </div>

      {/* Profile Tab */}
      {activeTab === "profile" && (
        <div style={{
          ...components.card,
        }}>
          <h3 style={{
            fontSize: typography.fontSize.h2,
            fontWeight: typography.fontWeight.semibold,
            color: colors.text.primary,
            marginBottom: spacing.lg,
            marginTop: 0,
          }}>
            Basic Information
          </h3>

          {/* Avatar */}
          <div style={{ marginBottom: spacing.xl, textAlign: "center" }}>
            <div
              style={{
                width: '100px',
                height: '100px',
                borderRadius: borderRadius.full,
                background: `linear-gradient(135deg, ${colors.primary.main} 0%, ${colors.primary.light} 100%)`,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: typography.fontSize.h1,
                color: colors.text.inverse,
                fontWeight: typography.fontWeight.bold,
                marginBottom: spacing.md,
              }}
            >
              {name.charAt(0)}
            </div>
            <div>
              <button style={{
                ...components.button.secondary,
                cursor: "pointer",
              }}>
                Change Avatar
              </button>
            </div>
          </div>

          {/* Name */}
          <div style={{ marginBottom: spacing.lg }}>
            <label style={{
              display: "block",
              marginBottom: spacing.xs,
              fontSize: typography.fontSize.body,
              fontWeight: typography.fontWeight.semibold,
              color: colors.text.primary,
            }}>
              Full Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                ...components.input,
                width: "100%",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* Bio */}
          <div style={{ marginBottom: spacing.lg }}>
            <label style={{
              display: "block",
              marginBottom: spacing.xs,
              fontSize: typography.fontSize.body,
              fontWeight: typography.fontWeight.semibold,
              color: colors.text.primary,
            }}>
              Bio
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
              style={{
                ...components.input,
                width: "100%",
                boxSizing: "border-box",
                resize: "vertical",
                fontFamily: "inherit",
              }}
            />
          </div>

          {/* Location */}
          <div style={{ marginBottom: spacing.lg }}>
            <label style={{
              display: "block",
              marginBottom: spacing.xs,
              fontSize: typography.fontSize.body,
              fontWeight: typography.fontWeight.semibold,
              color: colors.text.primary,
            }}>
              Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="City, Country"
              style={{
                ...components.input,
                width: "100%",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* Hourly Rate */}
          <div style={{ marginBottom: spacing.xl }}>
            <label style={{
              display: "block",
              marginBottom: spacing.xs,
              fontSize: typography.fontSize.body,
              fontWeight: typography.fontWeight.semibold,
              color: colors.text.primary,
            }}>
              Hourly Rate ($)
            </label>
            <input
              type="number"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(e.target.value)}
              placeholder="75"
              style={{
                ...components.input,
                width: "100%",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* Save Button */}
          <button
            onClick={() => alert("Profile saved! (mock)")}
            style={{
              ...components.button.primary,
              width: "100%",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: spacing.xs,
            }}
          >
            <svg width="18" height="18" viewBox="0 0 28 28" fill="none">
              <path d="M20 7v14H8V7" fill="rgba(255,255,255,0.2)" />
              <path d="M21 7V5a2 2 0 00-2-2H9a2 2 0 00-2 2v2M8 7v14a2 2 0 002 2h8a2 2 0 002-2V7M12 3v4M16 3v4M12 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            Save Changes
          </button>
        </div>
      )}

      {/* Skills Tab */}
      {activeTab === "skills" && (
        <div style={{
          ...components.card,
        }}>
          <h3 style={{
            fontSize: typography.fontSize.h2,
            fontWeight: typography.fontWeight.semibold,
            color: colors.text.primary,
            marginBottom: spacing.lg,
            marginTop: 0,
          }}>
            My Skills
          </h3>

          {/* Add Skill */}
          <div style={{ marginBottom: spacing.xl }}>
            <div style={{ display: "flex", gap: spacing.sm }}>
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAddSkill();
                  }
                }}
                placeholder="Add a skill (e.g., React, Python, Design)"
                style={{
                  ...components.input,
                  flex: 1,
                  boxSizing: "border-box",
                }}
              />
              <button
                onClick={handleAddSkill}
                style={{
                  ...components.button.primary,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  display: "flex",
                  alignItems: "center",
                  gap: spacing.xs,
                }}
              >
                <svg width="16" height="16" viewBox="0 0 28 28" fill="none">
                  <circle cx="14" cy="14" r="10" fill="rgba(255,255,255,0.2)" />
                  <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M14 9v10M9 14h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                Add
              </button>
            </div>
          </div>

          {/* Skills List */}
          <div style={{ display: "flex", gap: spacing.sm, flexWrap: "wrap" }}>
            {skills.map((skill) => (
              <div
                key={skill}
                style={{
                  padding: `${spacing.xs} ${spacing.md}`,
                  background: colors.primary.light,
                  color: colors.primary.main,
                  borderRadius: borderRadius.sm,
                  fontSize: typography.fontSize.caption,
                  fontWeight: typography.fontWeight.medium,
                  display: "flex",
                  alignItems: "center",
                  gap: spacing.xs,
                }}
              >
                <span>{skill}</span>
                <button
                  onClick={() => handleRemoveSkill(skill)}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: colors.status.error,
                    cursor: "pointer",
                    padding: 0,
                    display: "flex",
                    alignItems: "center",
                    lineHeight: 1,
                  }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          {skills.length === 0 && (
            <div style={{
              textAlign: "center",
              padding: spacing.xl,
              color: colors.text.secondary,
              fontSize: typography.fontSize.body,
            }}>
              No skills added yet. Add your first skill!
            </div>
          )}
        </div>
      )}

      {/* Portfolio Tab */}
      {activeTab === "portfolio" && (
        <div style={{
          ...components.card,
        }}>
          <h3 style={{
            fontSize: typography.fontSize.h2,
            fontWeight: typography.fontWeight.semibold,
            color: colors.text.primary,
            marginBottom: spacing.lg,
            marginTop: 0,
          }}>
            Portfolio Projects
          </h3>

          {/* Add Portfolio Button */}
          {!showPortfolioForm && (
            <button
              onClick={() => setShowPortfolioForm(true)}
              style={{
                ...components.button.primary,
                width: "100%",
                cursor: "pointer",
                marginBottom: spacing.xl,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: spacing.xs,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 28 28" fill="none">
                <circle cx="14" cy="14" r="10" fill="rgba(255,255,255,0.2)" />
                <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="1.5" />
                <path d="M14 9v10M9 14h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              Add Portfolio Item
            </button>
          )}

          {/* Portfolio Form */}
          {showPortfolioForm && (
            <div style={{
              background: colors.base.background,
              border: `1px solid ${colors.base.border}`,
              borderRadius: borderRadius.md,
              padding: spacing.lg,
              marginBottom: spacing.xl,
            }}>
              <h4 style={{
                margin: 0,
                marginBottom: spacing.md,
                fontSize: typography.fontSize.body,
                fontWeight: typography.fontWeight.semibold,
                color: colors.text.primary,
              }}>
                Add New Portfolio Item
              </h4>

              <div style={{ marginBottom: spacing.md }}>
                <label style={{
                  display: "block",
                  marginBottom: spacing.xs,
                  fontSize: typography.fontSize.body,
                  fontWeight: typography.fontWeight.medium,
                  color: colors.text.primary,
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
          padding: 16
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
    </div>
  );
}
