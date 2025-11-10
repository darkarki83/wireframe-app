import { useState } from "react";

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
    <div style={{ maxWidth: 600, margin: "0 auto", paddingBottom: 16 }}>
      <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>My Providers</h2>

      {/* Add Provider Button */}
      {!showAddForm ? (
        <button
          onClick={() => setShowAddForm(true)}
          style={{
            width: "100%",
            padding: "16px",
            background: "#8b5cf6",
            color: "white",
            border: "none",
            borderRadius: 12,
            fontSize: 16,
            fontWeight: 600,
            cursor: "pointer",
            marginBottom: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8
          }}
        >
          <span style={{ fontSize: 20 }}>➕</span>
          Add Provider
        </button>
      ) : (
        /* Add Provider Form */
        <div style={{
          background: "#f9fafb",
          border: "1px solid #e5e7eb",
          borderRadius: 12,
          padding: 20,
          marginBottom: 24
        }}>
          <h3 style={{ margin: "0 0 16px 0", fontSize: 18, fontWeight: 600 }}>
            Add New Provider
          </h3>

          {/* Email Field */}
          <div style={{ marginBottom: 16 }}>
            <label style={{
              display: "block",
              marginBottom: 8,
              fontSize: 14,
              fontWeight: 500,
              color: "#374151"
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
                width: "100%",
                padding: "12px",
                border: isAutoFilled ? "2px solid #059669" : "1px solid #d1d5db",
                borderRadius: 8,
                fontSize: 15,
                boxSizing: "border-box",
                background: isAutoFilled ? "#f0fdf4" : "white"
              }}
            />
            {isAutoFilled && (
              <div style={{
                fontSize: 12,
                color: "#059669",
                marginTop: 4,
                fontWeight: 500
              }}>
                ✓ User found in system - details auto-filled
              </div>
            )}
          </div>

          {/* Name Field */}
          <div style={{ marginBottom: 16 }}>
            <label style={{
              display: "block",
              marginBottom: 8,
              fontSize: 14,
              fontWeight: 500,
              color: "#374151"
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
                width: "100%",
                padding: "12px",
                border: "1px solid #d1d5db",
                borderRadius: 8,
                fontSize: 15,
                boxSizing: "border-box",
                background: isAutoFilled ? "#f9fafb" : "white",
                cursor: isAutoFilled ? "not-allowed" : "text"
              }}
            />
          </div>

          {/* Phone Field with Country Code */}
          <div style={{ marginBottom: 20 }}>
            <label style={{
              display: "block",
              marginBottom: 8,
              fontSize: 14,
              fontWeight: 500,
              color: "#374151"
            }}>
              Phone *
            </label>
            <div style={{ display: "flex", gap: 8 }}>
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                disabled={isAutoFilled}
                style={{
                  padding: "12px",
                  border: "1px solid #d1d5db",
                  borderRadius: 8,
                  fontSize: 15,
                  background: isAutoFilled ? "#f9fafb" : "white",
                  cursor: isAutoFilled ? "not-allowed" : "pointer",
                  minWidth: 80
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
                  flex: 1,
                  padding: "12px",
                  border: "1px solid #d1d5db",
                  borderRadius: 8,
                  fontSize: 15,
                  boxSizing: "border-box",
                  background: isAutoFilled ? "#f9fafb" : "white",
                  cursor: isAutoFilled ? "not-allowed" : "text"
                }}
              />
            </div>
          </div>

          {/* Form Actions */}
          <div style={{ display: "flex", gap: 12 }}>
            <button
              onClick={handleAddProvider}
              disabled={!email.trim() || !name.trim() || !phone.trim()}
              style={{
                flex: 1,
                padding: "12px",
                background: (email.trim() && name.trim() && phone.trim()) ? "#8b5cf6" : "#d1d5db",
                color: "white",
                border: "none",
                borderRadius: 8,
                fontSize: 15,
                fontWeight: 600,
                cursor: (email.trim() && name.trim() && phone.trim()) ? "pointer" : "not-allowed"
              }}
            >
              Add
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

      {/* Providers List */}
      <div>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16, color: "#374151" }}>
          My Providers ({providers.length})
        </h3>
        {providers.length === 0 ? (
          <div style={{
            textAlign: "center",
            padding: "40px 20px",
            color: "#9ca3af",
            fontSize: 14
          }}>
            No providers yet. Add your first provider!
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {providers.map((provider) => (
              <div
                key={provider.id}
                style={{
                  background: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: 12,
                  padding: 16,
                  position: "relative"
                }}
              >
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: 12
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 4 }}>
                      {provider.name}
                    </div>
                    <div style={{ fontSize: 14, color: "#666", marginBottom: 4 }}>
                      📧 {provider.email}
                    </div>
                    <div style={{ fontSize: 14, color: "#666" }}>
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
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: "pointer"
                    }}
                  >
                    Remove
                  </button>
                </div>
                <div style={{ fontSize: 12, color: "#9ca3af" }}>
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
