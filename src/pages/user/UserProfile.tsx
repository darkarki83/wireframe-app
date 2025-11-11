import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiGetUser, type User } from "../../lib/mockApi";
import { colors, typography, spacing, shadows, borderRadius, components } from "../../lib/designTokens";

export default function UserProfile() {
  const { id } = useParams();
  const nav = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      apiGetUser(id).then(data => {
        setUser(data);
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: colors.base.background,
        padding: spacing.xl,
      }}>
        <p style={{ fontSize: typography.fontSize.body, color: colors.text.secondary }}>
          Loading profile...
        </p>
      </div>
    );
  }

  if (!user) {
    return (
      <div style={{
        minHeight: '100vh',
        background: colors.base.background,
        padding: spacing.xl,
      }}>
        <p style={{ fontSize: typography.fontSize.body, color: colors.text.secondary }}>
          User not found
        </p>
      </div>
    );
  }

  const memberYears = new Date().getFullYear() - new Date(user.memberSince).getFullYear();

  return (
    <div style={{
      minHeight: '100vh',
      background: colors.base.background,
      paddingBottom: '80px',
    }}>
      <div style={{
        padding: `${spacing.xl} ${spacing.lg}`,
      }}>
        <button
          onClick={() => nav(-1)}
          style={{
            ...components.button.secondary,
            marginBottom: spacing.lg,
            cursor: 'pointer',
          }}
        >
          ← Back
        </button>

        <div style={{
          ...components.card,
          marginBottom: spacing.lg,
        }}>
          <div style={{ display: "flex", gap: spacing.lg, alignItems: "start" }}>
            <div
              style={{
                width: '100px',
                height: '100px',
                borderRadius: borderRadius.full,
                background: `linear-gradient(135deg, ${colors.primary.main} 0%, ${colors.primary.light} 100%)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: typography.fontSize.h1,
                color: colors.text.inverse,
                fontWeight: typography.fontWeight.bold,
                flexShrink: 0
              }}
            >
              {user.name.charAt(0)}
            </div>

            <div style={{ flex: 1 }}>
              <h2 style={{
                margin: 0,
                marginBottom: spacing.sm,
                fontSize: typography.fontSize.h1,
                fontWeight: typography.fontWeight.semibold,
                color: colors.text.primary,
              }}>
                {user.name}
              </h2>
              <p style={{
                margin: 0,
                color: colors.text.secondary,
                fontSize: typography.fontSize.body,
                marginBottom: spacing.lg
              }}>
                📍 {user.location}
              </p>

              <div style={{ display: "flex", gap: spacing.xl, marginBottom: spacing.lg, flexWrap: "wrap" }}>
                <div>
                  <div style={{
                    fontSize: typography.fontSize.caption,
                    color: colors.text.secondary,
                    marginBottom: spacing.xs
                  }}>
                    Rating
                  </div>
                  <div style={{
                    fontSize: typography.fontSize.h2,
                    fontWeight: typography.fontWeight.semibold,
                    color: colors.status.warning
                  }}>
                    ⭐ {user.rating}/5.0
                  </div>
                </div>
                <div>
                  <div style={{
                    fontSize: typography.fontSize.caption,
                    color: colors.text.secondary,
                    marginBottom: spacing.xs
                  }}>
                    Completed Jobs
                  </div>
                  <div style={{
                    fontSize: typography.fontSize.h2,
                    fontWeight: typography.fontWeight.semibold,
                    color: colors.status.success
                  }}>
                    {user.completedJobs}
                  </div>
                </div>
                <div>
                  <div style={{
                    fontSize: typography.fontSize.caption,
                    color: colors.text.secondary,
                    marginBottom: spacing.xs
                  }}>
                    Hourly Rate
                  </div>
                  <div style={{
                    fontSize: typography.fontSize.h2,
                    fontWeight: typography.fontWeight.semibold,
                    color: colors.primary.main
                  }}>
                    ${user.hourlyRate}/hr
                  </div>
                </div>
                <div>
                  <div style={{
                    fontSize: typography.fontSize.caption,
                    color: colors.text.secondary,
                    marginBottom: spacing.xs
                  }}>
                    Member Since
                  </div>
                  <div style={{
                    fontSize: typography.fontSize.h2,
                    fontWeight: typography.fontWeight.semibold,
                    color: colors.text.primary
                  }}>
                    {memberYears}+ {memberYears === 1 ? "year" : "years"}
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", gap: spacing.sm, flexWrap: "wrap" }}>
                <button
                  onClick={() => alert("Send message (mock)")}
                  style={{
                    ...components.button.primary,
                    cursor: 'pointer',
                  }}
                >
                  💬 Send Message
                </button>
                <button
                  onClick={() => alert("Send job offer (mock)")}
                  style={{
                    ...components.button.primary,
                    cursor: 'pointer',
                  }}
                >
                  📨 Send Job Offer
                </button>
                <button
                  onClick={() => alert("Save to favorites (mock)")}
                  style={{
                    ...components.button.secondary,
                    cursor: 'pointer',
                  }}
                >
                  ⭐ Save
                </button>
              </div>
            </div>
          </div>
        </div>

        <div style={{
          ...components.card,
          marginBottom: spacing.lg,
        }}>
          <h3 style={{
            marginTop: 0,
            marginBottom: spacing.md,
            fontSize: typography.fontSize.h2,
            fontWeight: typography.fontWeight.semibold,
            color: colors.text.primary,
          }}>
            About
          </h3>
          <p style={{
            lineHeight: typography.lineHeight.normal,
            color: colors.text.secondary,
            fontSize: typography.fontSize.body,
            margin: 0
          }}>
            {user.bio}
          </p>
        </div>

        <div style={{
          ...components.card,
          marginBottom: spacing.lg,
        }}>
          <h3 style={{
            marginTop: 0,
            marginBottom: spacing.md,
            fontSize: typography.fontSize.h2,
            fontWeight: typography.fontWeight.semibold,
            color: colors.text.primary,
          }}>
            Skills
          </h3>
          <div style={{ display: "flex", gap: spacing.sm, flexWrap: "wrap" }}>
            {user.skills.map((skill, index) => (
              <span
                key={index}
                style={{
                  padding: `${spacing.xs} ${spacing.md}`,
                  background: colors.primary.light,
                  color: colors.primary.main,
                  borderRadius: borderRadius.sm,
                  fontSize: typography.fontSize.caption,
                  fontWeight: typography.fontWeight.medium
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div style={{
          ...components.card,
          marginBottom: spacing.lg,
        }}>
          <h3 style={{
            marginTop: 0,
            marginBottom: spacing.md,
            fontSize: typography.fontSize.h2,
            fontWeight: typography.fontWeight.semibold,
            color: colors.text.primary,
          }}>
            Portfolio
          </h3>
          <div style={{ display: "grid", gap: spacing.md }}>
            {user.portfolio.map((item, index) => (
              <div
                key={index}
                style={{
                  padding: spacing.lg,
                  background: colors.base.background,
                  borderRadius: borderRadius.md,
                  border: `1px solid ${colors.base.border}`
                }}
              >
                <h4 style={{
                  margin: 0,
                  marginBottom: spacing.xs,
                  fontSize: typography.fontSize.body,
                  fontWeight: typography.fontWeight.semibold,
                  color: colors.text.primary
                }}>
                  {item.title}
                </h4>
                <p style={{
                  margin: 0,
                  fontSize: typography.fontSize.body,
                  color: colors.text.secondary,
                  lineHeight: typography.lineHeight.normal
                }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div style={components.card}>
          <h3 style={{
            marginTop: 0,
            marginBottom: spacing.md,
            fontSize: typography.fontSize.h2,
            fontWeight: typography.fontWeight.semibold,
            color: colors.text.primary,
          }}>
            Recent Reviews
          </h3>
          <div style={{ display: "grid", gap: spacing.lg }}>
            <div style={{ paddingBottom: spacing.lg, borderBottom: `1px solid ${colors.base.border}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: spacing.sm }}>
                <strong style={{
                  fontSize: typography.fontSize.body,
                  fontWeight: typography.fontWeight.semibold,
                  color: colors.text.primary
                }}>
                  Alice Corp
                </strong>
                <span style={{
                  color: colors.status.warning,
                  fontSize: typography.fontSize.body
                }}>
                  ⭐⭐⭐⭐⭐ 5.0
                </span>
              </div>
              <p style={{
                margin: 0,
                fontSize: typography.fontSize.body,
                color: colors.text.secondary,
                lineHeight: typography.lineHeight.normal
              }}>
                Excellent work! {user.name} delivered exactly what we needed on time and within budget.
                Highly recommend for any web development project.
              </p>
              <div style={{
                fontSize: typography.fontSize.caption,
                color: colors.text.secondary,
                marginTop: spacing.sm
              }}>
                2 weeks ago
              </div>
            </div>

            <div style={{ paddingBottom: spacing.lg, borderBottom: `1px solid ${colors.base.border}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: spacing.sm }}>
                <strong style={{
                  fontSize: typography.fontSize.body,
                  fontWeight: typography.fontWeight.semibold,
                  color: colors.text.primary
                }}>
                  Tech Startup
                </strong>
                <span style={{
                  color: colors.status.warning,
                  fontSize: typography.fontSize.body
                }}>
                  ⭐⭐⭐⭐⭐ 5.0
                </span>
              </div>
              <p style={{
                margin: 0,
                fontSize: typography.fontSize.body,
                color: colors.text.secondary,
                lineHeight: typography.lineHeight.normal
              }}>
                Great communication and professional work. Will definitely hire again!
              </p>
              <div style={{
                fontSize: typography.fontSize.caption,
                color: colors.text.secondary,
                marginTop: spacing.sm
              }}>
                1 month ago
              </div>
            </div>

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: spacing.sm }}>
                <strong style={{
                  fontSize: typography.fontSize.body,
                  fontWeight: typography.fontWeight.semibold,
                  color: colors.text.primary
                }}>
                  Marketing Agency
                </strong>
                <span style={{
                  color: colors.status.warning,
                  fontSize: typography.fontSize.body
                }}>
                  ⭐⭐⭐⭐ 4.5
                </span>
              </div>
              <p style={{
                margin: 0,
                fontSize: typography.fontSize.body,
                color: colors.text.secondary,
                lineHeight: typography.lineHeight.normal
              }}>
                Good work overall. Minor revisions needed but very responsive to feedback.
              </p>
              <div style={{
                fontSize: typography.fontSize.caption,
                color: colors.text.secondary,
                marginTop: spacing.sm
              }}>
                2 months ago
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
