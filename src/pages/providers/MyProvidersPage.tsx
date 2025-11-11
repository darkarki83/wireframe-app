import { useState } from "react";
import { colors, typography, spacing, shadows, borderRadius, components } from "../../lib/designTokens";

type Provider = {
  id: string;
  email: string;
  name: string;
  phone: string;
  countryCode: string;
  addedAt: string;
};

// Mock database of users in the system
const systemUsers = [
  { email: "john.doe@example.com", name: "John Doe", phone: "5551234", countryCode: "+1" },
  { email: "jane.smith@example.com", name: "Jane Smith", phone: "5555678", countryCode: "+1" },
  { email: "alex.wilson@example.com", name: "Alex Wilson", phone: "5559012", countryCode: "+44" },
  { email: "maria.garcia@example.com", name: "Maria Garcia", phone: "5553456", countryCode: "+34" },
];

export default function MyProvidersPage() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+1");
  const [isAutoFilled, setIsAutoFilled] = useState(false);

  const [providers, setProviders] = useState<Provider[]>([
    {
      id: "1",
      email: "sarah.johnson@example.com",
      name: "Sarah Johnson",
      phone: "5557890",
      countryCode: "+1",
      addedAt: "2025-11-05"
    },
    {
      id: "2",
      email: "mike.brown@example.com",
      name: "Mike Brown",
      phone: "5551122",
      countryCode: "+44",
      addedAt: "2025-11-03"
    }
  ]);

  const handleEmailBlur = () => {
    const user = systemUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (user) {
      setName(user.name);
      setPhone(user.phone);
      setCountryCode(user.countryCode);
      setIsAutoFilled(true);
    }
  };

  const handleAddProvider = () => {
    if (!email.trim() || !name.trim() || !phone.trim()) return;

    const newProvider: Provider = {
      id: Date.now().toString(),
      email: email.trim(),
      name: name.trim(),
      phone: phone.trim(),
      countryCode,
      addedAt: new Date().toISOString().split('T')[0]
    };

    setProviders([newProvider, ...providers]);

    // Reset form
    setEmail("");
    setName("");
    setPhone("");
    setCountryCode("+1");
    setIsAutoFilled(false);
    setShowAddForm(false);
  };

  const handleRemoveProvider = (id: string) => {
    setProviders(providers.filter(p => p.id !== id));
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: colors.base.background,
      paddingBottom: '80px',
    }}>
      {/* Page Header */}
      <div style={{
        padding: `${spacing.xl} ${spacing.lg}`,
      }}>
        <h1 style={{
          fontSize: typography.fontSize.h1,
          fontWeight: typography.fontWeight.semibold,
          color: colors.text.primary,
          margin: 0,
        }}>
          My Providers
        </h1>
      </div>

      {/* Add Provider Button or Form */}
      <div style={{
        padding: `0 ${spacing.lg} ${spacing.xl}`,
      }}>
        {showAddForm ? (
          /* Add Provider Form - Card */
          <div style={{
            ...components.card,
            marginBottom: spacing.xl,
            width: '100%',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: spacing.md,
              marginBottom: spacing.lg,
            }}>
              {/* Duotone Add User Icon */}
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: borderRadius.md,
                background: colors.primary.light,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <circle cx="14" cy="10" r="4" fill={colors.primary.light} />
                  <circle cx="14" cy="10" r="4" stroke={colors.primary.main} strokeWidth="1.5" />
                  <path d="M6 24v-2a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v2" fill={colors.primary.light} opacity="0.5" />
                  <path d="M6 24v-2a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v2" stroke={colors.primary.main} strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="22" cy="8" r="1.5" fill={colors.primary.main} />
                </svg>
              </div>
              <h2 style={{
                fontSize: typography.fontSize.h2,
                fontWeight: typography.fontWeight.semibold,
                color: colors.text.primary,
                margin: 0,
              }}>
                Add New Provider
              </h2>
            </div>

            {/* Email Field */}
            <div style={{ marginBottom: spacing.lg }}>
              <label style={{
                display: "block",
                marginBottom: spacing.sm,
                fontSize: typography.fontSize.caption,
                fontWeight: typography.fontWeight.medium,
                color: colors.text.secondary,
              }}>
                Email *
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setIsAutoFilled(false);
                }}
                onBlur={handleEmailBlur}
                placeholder="Enter email address"
                style={{
                  ...components.input,
                  width: "100%",
                  border: isAutoFilled ? `2px solid ${colors.status.success}` : components.input.border,
                  background: isAutoFilled ? colors.status.successLight : colors.base.surface,
                }}
              />
              {isAutoFilled && (
                <div style={{
                  fontSize: typography.fontSize.caption,
                  color: colors.status.success,
                  marginTop: spacing.xs,
                  fontWeight: typography.fontWeight.medium,
                  display: 'flex',
                  alignItems: 'center',
                  gap: spacing.xs,
                }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="7" fill={colors.status.success} opacity="0.2" />
                    <path d="M5 8l2 2 4-4" stroke={colors.status.success} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  User found in system - details auto-filled
                </div>
              )}
            </div>

            {/* Name Field */}
            <div style={{ marginBottom: spacing.lg }}>
              <label style={{
                display: "block",
                marginBottom: spacing.sm,
                fontSize: typography.fontSize.caption,
                fontWeight: typography.fontWeight.medium,
                color: colors.text.secondary,
              }}>
                Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name"
                readOnly={isAutoFilled}
                style={{
                  ...components.input,
                  width: "100%",
                  background: isAutoFilled ? colors.base.background : colors.base.surface,
                  cursor: isAutoFilled ? "not-allowed" : "text",
                }}
              />
            </div>

            {/* Phone Field with Country Code */}
            <div style={{ marginBottom: spacing.xl }}>
              <label style={{
                display: "block",
                marginBottom: spacing.sm,
                fontSize: typography.fontSize.caption,
                fontWeight: typography.fontWeight.medium,
                color: colors.text.secondary,
              }}>
                Phone *
              </label>
              <div style={{ display: "flex", gap: spacing.sm, minWidth: 0 }}>
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  disabled={isAutoFilled}
                  style={{
                    ...components.input,
                    background: isAutoFilled ? colors.base.background : colors.base.surface,
                    cursor: isAutoFilled ? "not-allowed" : "pointer",
                    width: '100px',
                    minWidth: 0,
                    flexShrink: 0,
                    padding: `${spacing.sm} ${spacing.sm}`,
                  }}
                >
                  <option value="+1">🇺🇸 +1</option>
                  <option value="+44">🇬🇧 +44</option>
                  <option value="+34">🇪🇸 +34</option>
                  <option value="+49">🇩🇪 +49</option>
                  <option value="+33">🇫🇷 +33</option>
                  <option value="+39">🇮🇹 +39</option>
                  <option value="+7">🇷🇺 +7</option>
                  <option value="+86">🇨🇳 +86</option>
                  <option value="+81">🇯🇵 +81</option>
                  <option value="+91">🇮🇳 +91</option>
                </select>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  placeholder="Phone number"
                  readOnly={isAutoFilled}
                  style={{
                    ...components.input,
                    flex: 1,
                    minWidth: 0,
                    background: isAutoFilled ? colors.base.background : colors.base.surface,
                    cursor: isAutoFilled ? "not-allowed" : "text",
                  }}
                />
              </div>
            </div>

            {/* Form Actions */}
            <div style={{ display: "flex", gap: spacing.md, minWidth: 0 }}>
              <button
                onClick={handleAddProvider}
                disabled={!email.trim() || !name.trim() || !phone.trim()}
                style={{
                  ...components.button.primary,
                  flex: 1,
                  minWidth: 0,
                  padding: `0 ${spacing.xl}`,
                  cursor: (email.trim() && name.trim() && phone.trim()) ? "pointer" : "not-allowed",
                  opacity: (email.trim() && name.trim() && phone.trim()) ? 1 : 0.5,
                  border: 'none',
                  fontSize: typography.fontSize.body,
                  fontWeight: typography.fontWeight.semibold,
                }}
              >
                Add Provider
              </button>
              <button
                onClick={() => {
                  setShowAddForm(false);
                  setEmail("");
                  setName("");
                  setPhone("");
                  setCountryCode("+1");
                  setIsAutoFilled(false);
                }}
                style={{
                  ...components.button.secondary,
                  flex: 1,
                  minWidth: 0,
                  padding: `0 ${spacing.xl}`,
                  cursor: "pointer",
                  border: 'none',
                  fontSize: typography.fontSize.body,
                  fontWeight: typography.fontWeight.semibold,
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          /* Add Provider Button */
          <button
            onClick={() => setShowAddForm(true)}
            style={{
              ...components.card,
              width: "100%",
              cursor: "pointer",
              border: `2px dashed ${colors.primary.main}`,
              background: colors.primary.subtle,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: spacing.md,
              transition: 'all 0.2s ease',
              marginBottom: spacing.xl,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = shadows.md
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = shadows.base
            }}
          >
            {/* Duotone Plus Icon */}
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="14" r="10" fill={colors.primary.light} opacity="0.3" />
              <circle cx="14" cy="14" r="10" stroke={colors.primary.main} strokeWidth="1.5" />
              <path d="M14 9v10M9 14h10" stroke={colors.primary.main} strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span style={{
              fontSize: typography.fontSize.body,
              fontWeight: typography.fontWeight.semibold,
              color: colors.primary.main,
            }}>
              Add Provider
            </span>
          </button>
        )}
      </div>

      {/* Providers List */}
      <div style={{
        padding: `0 ${spacing.lg}`,
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: spacing.lg,
        }}>
          <h2 style={{
            fontSize: typography.fontSize.h2,
            fontWeight: typography.fontWeight.semibold,
            color: colors.text.primary,
            margin: 0,
          }}>
            Providers
          </h2>
          <div style={{
            padding: `${spacing.xs} ${spacing.md}`,
            background: colors.primary.light,
            borderRadius: borderRadius.full,
            fontSize: typography.fontSize.caption,
            fontWeight: typography.fontWeight.semibold,
            color: colors.primary.main,
          }}>
            {providers.length}
          </div>
        </div>

        {providers.length === 0 ? (
          /* Empty State */
          <div style={{
            ...components.card,
            textAlign: "center",
            padding: `${spacing.xxxl} ${spacing.lg}`,
            width: '100%',
          }}>
            {/* Duotone Empty Icon */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: spacing.lg,
            }}>
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                <circle cx="40" cy="28" r="12" fill={colors.primary.light} opacity="0.3" />
                <circle cx="40" cy="28" r="12" stroke={colors.primary.main} strokeWidth="2" />
                <path d="M20 60v-4a16 16 0 0 1 16-16h8a16 16 0 0 1 16 16v4" fill={colors.primary.light} opacity="0.2" />
                <path d="M20 60v-4a16 16 0 0 1 16-16h8a16 16 0 0 1 16 16v4" stroke={colors.primary.main} strokeWidth="2" strokeLinecap="round" />
                <circle cx="60" cy="20" r="2" fill={colors.primary.main} />
                <circle cx="65" cy="28" r="1.5" fill={colors.primary.light} />
              </svg>
            </div>
            <p style={{
              fontSize: typography.fontSize.body,
              color: colors.text.secondary,
              margin: 0,
            }}>
              No providers yet. Add your first provider!
            </p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: spacing.md }}>
            {providers.map((provider) => (
              <div
                key={provider.id}
                style={{
                  ...components.card,
                  transition: 'all 0.2s ease',
                  width: '100%',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = shadows.md
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = shadows.base
                }}
              >
                <div style={{
                  display: "flex",
                  gap: spacing.md,
                  marginBottom: spacing.md,
                }}>
                  {/* Avatar Icon */}
                  <div style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: borderRadius.md,
                    background: colors.primary.light,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                      <circle cx="16" cy="12" r="5" fill={colors.primary.light} />
                      <circle cx="16" cy="12" r="5" stroke={colors.primary.main} strokeWidth="2" />
                      <path d="M8 26v-2a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v2" fill={colors.primary.light} opacity="0.5" />
                      <path d="M8 26v-2a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v2" stroke={colors.primary.main} strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 style={{
                      fontSize: typography.fontSize.h2,
                      fontWeight: typography.fontWeight.semibold,
                      color: colors.text.primary,
                      margin: 0,
                      marginBottom: spacing.xs,
                    }}>
                      {provider.name}
                    </h3>

                    {/* Email */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: spacing.sm,
                      marginBottom: spacing.xs,
                    }}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <rect x="2" y="4" width="12" height="9" rx="1" fill={colors.primary.light} opacity="0.3" />
                        <path d="M2 5l6 4 6-4M2 5v7a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1z" stroke={colors.text.secondary} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span style={{
                        fontSize: typography.fontSize.caption,
                        color: colors.text.secondary,
                      }}>
                        {provider.email}
                      </span>
                    </div>

                    {/* Phone */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: spacing.sm,
                    }}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <rect x="4" y="2" width="8" height="12" rx="1.5" fill={colors.primary.light} opacity="0.3" />
                        <rect x="4" y="2" width="8" height="12" rx="1.5" stroke={colors.text.secondary} strokeWidth="1.2" />
                        <circle cx="8" cy="12" r="0.5" fill={colors.text.secondary} />
                      </svg>
                      <span style={{
                        fontSize: typography.fontSize.caption,
                        color: colors.text.secondary,
                      }}>
                        {provider.countryCode} {provider.phone}
                      </span>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemoveProvider(provider.id)}
                    style={{
                      padding: `${spacing.sm} ${spacing.md}`,
                      background: colors.status.errorLight,
                      color: colors.status.error,
                      border: "none",
                      borderRadius: borderRadius.sm,
                      fontSize: typography.fontSize.caption,
                      fontWeight: typography.fontWeight.semibold,
                      cursor: "pointer",
                      height: 'fit-content',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = colors.status.error
                      e.currentTarget.style.color = colors.text.inverse
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = colors.status.errorLight
                      e.currentTarget.style.color = colors.status.error
                    }}
                  >
                    Remove
                  </button>
                </div>

                {/* Added Date */}
                <div style={{
                  fontSize: typography.fontSize.caption,
                  color: colors.text.secondary,
                  display: 'flex',
                  alignItems: 'center',
                  gap: spacing.xs,
                }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <rect x="2" y="3" width="10" height="9" rx="1" stroke={colors.text.secondary} strokeWidth="1.2" fill="none" />
                    <path d="M5 2v2M9 2v2M2 6h10" stroke={colors.text.secondary} strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                  Added on {provider.addedAt}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
