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
                  width: "100%",
                  boxSizing: "border-box",
                  marginBottom: spacing.sm,
                }}
              />
              <button
                onClick={handleAddSkill}
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
                <svg width="14" height="14" viewBox="0 0 28 28" fill="none">
                  <circle cx="14" cy="14" r="10" fill="rgba(255,255,255,0.2)" />
                  <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M14 9v10M9 14h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                Add
              </button>
            </div>            {/* Skills List */}
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
                      ...components.input,
                      width: "100%",
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                <div style={{ marginBottom: spacing.lg }}>
                  <label style={{
                    display: "block",
                    marginBottom: spacing.xs,
                    fontSize: typography.fontSize.body,
                    fontWeight: typography.fontWeight.medium,
                    color: colors.text.primary,
                  }}>
                    Description *
                  </label>
                  <textarea
                    value={portfolioDescription}
                    onChange={(e) => setPortfolioDescription(e.target.value)}
                    placeholder="Describe the project..."
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

                <div style={{ display: "flex", gap: spacing.sm }}>
                  <button
                    onClick={handleAddPortfolio}
                    style={{
                      ...components.button.primary,
                      flex: 1,
                      cursor: "pointer",
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
                      ...components.button.secondary,
                      flex: 1,
                      cursor: "pointer",
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Portfolio List */}
            <div style={{ display: "flex", flexDirection: "column", gap: spacing.md }}>
              {portfolio.map((item) => (
                <div
                  key={item.id}
                  style={{
                    padding: spacing.lg,
                    background: colors.base.background,
                    border: `1px solid ${colors.base.border}`,
                    borderRadius: borderRadius.md,
                  }}
                >
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: spacing.xs,
                  }}>
                    <h4 style={{
                      margin: 0,
                      fontSize: typography.fontSize.body,
                      fontWeight: typography.fontWeight.semibold,
                      color: colors.text.primary,
                    }}>
                      {item.title}
                    </h4>
                    <button
                      onClick={() => handleRemovePortfolio(item.id)}
                      style={{
                        background: "transparent",
                        border: "none",
                        color: colors.status.error,
                        cursor: "pointer",
                        padding: 0,
                        fontSize: typography.fontSize.h2,
                        lineHeight: 1,
                      }}
                    >
                      ×
                    </button>
                  </div>
                  <p style={{
                    margin: 0,
                    fontSize: typography.fontSize.body,
                    color: colors.text.secondary,
                    lineHeight: typography.lineHeight.normal,
                  }}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            {portfolio.length === 0 && !showPortfolioForm && (
              <div style={{
                textAlign: "center",
                padding: spacing.xl,
                color: colors.text.secondary,
                fontSize: typography.fontSize.body,
              }}>
                No portfolio items yet. Add your first project!
              </div>
            )}
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
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
              Account Settings
            </h3>

            {/* Email */}
            <div style={{ marginBottom: spacing.lg }}>
              <label style={{
                display: "block",
                marginBottom: spacing.sm,
                fontSize: typography.fontSize.body,
                fontWeight: typography.fontWeight.semibold,
                color: colors.text.primary,
              }}>
                Email Address
              </label>
              <input
                type="email"
                defaultValue="john.doe@example.com"
                disabled
                style={{
                  ...components.input,
                  background: colors.base.background,
                  cursor: "not-allowed",
                }}
              />
              <div style={{
                fontSize: typography.fontSize.caption,
                color: colors.text.secondary,
                marginTop: spacing.xs,
              }}>
                Contact support to change your email
              </div>
            </div>

            {/* Password */}
            <div style={{ marginBottom: spacing.xl }}>
              <label style={{
                display: "block",
                marginBottom: spacing.sm,
                fontSize: typography.fontSize.body,
                fontWeight: typography.fontWeight.semibold,
                color: colors.text.primary,
              }}>
                Password
              </label>
              <button
                onClick={() => alert("Change password (mock)")}
                style={components.button.secondary}
              >
                Change Password
              </button>
            </div>

            {/* Notifications */}
            <div style={{ marginBottom: spacing.xl }}>
              <h4 style={{
                fontSize: typography.fontSize.body,
                fontWeight: typography.fontWeight.semibold,
                marginBottom: spacing.md,
                marginTop: 0,
                color: colors.text.primary,
              }}>
                Notifications
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: spacing.md }}>
                <label style={{
                  display: "flex",
                  alignItems: "center",
                  gap: spacing.md,
                  padding: spacing.md,
                  background: colors.base.background,
                  borderRadius: borderRadius.md,
                  cursor: "pointer",
                }}>
                  <input type="checkbox" defaultChecked />
                  <span style={{ fontSize: typography.fontSize.body }}>Email notifications for new messages</span>
                </label>
                <label style={{
                  display: "flex",
                  alignItems: "center",
                  gap: spacing.md,
                  padding: spacing.md,
                  background: colors.base.background,
                  borderRadius: borderRadius.md,
                  cursor: "pointer",
                }}>
                  <input type="checkbox" defaultChecked />
                  <span style={{ fontSize: typography.fontSize.body }}>Email notifications for job offers</span>
                </label>
                <label style={{
                  display: "flex",
                  alignItems: "center",
                  gap: spacing.md,
                  padding: spacing.md,
                  background: colors.base.background,
                  borderRadius: borderRadius.md,
                  cursor: "pointer",
                }}>
                  <input type="checkbox" />
                  <span style={{ fontSize: typography.fontSize.body }}>Email notifications for weekly digest</span>
                </label>
              </div>
            </div>

            {/* Danger Zone */}
            <div style={{
              padding: spacing.lg,
              background: `${colors.status.error}10`,
              border: `1px solid ${colors.status.error}30`,
              borderRadius: borderRadius.md,
            }}>
              <h4 style={{
                fontSize: typography.fontSize.body,
                fontWeight: typography.fontWeight.semibold,
                marginBottom: spacing.sm,
                marginTop: 0,
                color: colors.status.error,
              }}>
                Danger Zone
              </h4>
              <p style={{
                fontSize: typography.fontSize.body,
                color: colors.text.secondary,
                marginBottom: spacing.md,
                marginTop: 0,
              }}>
                Once you delete your account, there is no going back. Please be certain.
              </p>
              <button
                onClick={() => {
                  if (confirm("Are you sure you want to delete your account?")) {
                    alert("Account deleted (mock)");
                  }
                }}
                style={{
                  padding: `${spacing.sm} ${spacing.lg}`,
                  background: colors.status.error,
                  color: colors.text.inverse,
                  border: "none",
                  borderRadius: borderRadius.md,
                  fontSize: typography.fontSize.body,
                  fontWeight: typography.fontWeight.semibold,
                  cursor: "pointer",
                }}
              >
                Delete Account
              </button>
            </div>
          </div>
        )}
      </div>
    </div >
  );
}
