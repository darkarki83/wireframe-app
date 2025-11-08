
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Tab = "account" | "notifications" | "security";

export default function Settings() {
  const nav = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("account");

  // Account settings state
  const [displayName, setDisplayName] = useState("John Doe");
  const [email, setEmail] = useState("john@example.com");
  const [bio, setBio] = useState("Full-stack developer with 5 years experience");
  const [location, setLocation] = useState("New York, USA");
  const [hourlyRate, setHourlyRate] = useState("50");

  // Notification settings state
  const [emailNewBids, setEmailNewBids] = useState(true);
  const [emailMessages, setEmailMessages] = useState(true);
  const [emailStatusChanges, setEmailStatusChanges] = useState(true);
  const [emailContracts, setEmailContracts] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);


  const handleSave = () => {
    alert("Settings saved (mock)");
  };

  return (
    <div className="wrap">
      <div style={{ marginBottom: 24 }}>
        <button
          onClick={() => nav(-1)}
          style={{
            padding: "6px 12px",
            background: "#f3f4f6",
            border: "1px solid #e5e7eb",
            borderRadius: 4,
            cursor: "pointer",
            fontSize: 13
          }}
        >
          ← Back
        </button>
      </div>

      <h2 style={{ marginBottom: 16 }}>Settings</h2>

      {/* Tab Navigation */}
      <div className="tabbar" style={{ marginBottom: 24 }}>
        <button
          className={activeTab === "account" ? "active" : ""}
          onClick={() => setActiveTab("account")}
        >
          Account
        </button>
        <button
          className={activeTab === "notifications" ? "active" : ""}
          onClick={() => setActiveTab("notifications")}
        >
          Notifications
        </button>
        <button
          className={activeTab === "security" ? "active" : ""}
          onClick={() => setActiveTab("security")}
        >
          Security
        </button>
      </div>

      {/* Account Tab */}
      {activeTab === "account" && (
        <div className="card">
          <h3 style={{ marginTop: 0 }}>Account Information</h3>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 6 }}>
                Display Name
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  border: "1px solid #e5e7eb",
                  borderRadius: 4,
                  fontSize: 14
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 6 }}>
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  border: "1px solid #e5e7eb",
                  borderRadius: 4,
                  fontSize: 14
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 6 }}>
                Bio
              </label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={4}
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  border: "1px solid #e5e7eb",
                  borderRadius: 4,
                  fontSize: 14,
                  fontFamily: "inherit",
                  resize: "vertical"
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 6 }}>
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City, Country"
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  border: "1px solid #e5e7eb",
                  borderRadius: 4,
                  fontSize: 14
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 6 }}>
                Hourly Rate (USD)
              </label>
              <input
                type="number"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(e.target.value)}
                min="0"
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  border: "1px solid #e5e7eb",
                  borderRadius: 4,
                  fontSize: 14
                }}
              />
            </div>

            <button
              onClick={handleSave}
              style={{
                padding: "10px 20px",
                background: "#3b82f6",
                color: "white",
                border: "none",
                borderRadius: 6,
                cursor: "pointer",
                fontSize: 14,
                fontWeight: 500,
                alignSelf: "flex-start"
              }}
            >
              Save Changes
            </button>
          </div>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === "notifications" && (
        <div className="card">
          <h3 style={{ marginTop: 0 }}>Notification Preferences</h3>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div>
              <h4 style={{ fontSize: 15, marginBottom: 12 }}>Email Notifications</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={emailNewBids}
                    onChange={(e) => setEmailNewBids(e.target.checked)}
                    style={{ cursor: "pointer" }}
                  />
                  <span style={{ fontSize: 14 }}>New bids on my jobs</span>
                </label>

                <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={emailMessages}
                    onChange={(e) => setEmailMessages(e.target.checked)}
                    style={{ cursor: "pointer" }}
                  />
                  <span style={{ fontSize: 14 }}>New messages</span>
                </label>

                <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={emailStatusChanges}
                    onChange={(e) => setEmailStatusChanges(e.target.checked)}
                    style={{ cursor: "pointer" }}
                  />
                  <span style={{ fontSize: 14 }}>Proposal status changes</span>
                </label>

                <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={emailContracts}
                    onChange={(e) => setEmailContracts(e.target.checked)}
                    style={{ cursor: "pointer" }}
                  />
                  <span style={{ fontSize: 14 }}>Contract updates</span>
                </label>
              </div>
            </div>

            <div style={{ paddingTop: 12, borderTop: "1px solid #e5e7eb" }}>
              <h4 style={{ fontSize: 15, marginBottom: 12 }}>Push Notifications</h4>
              <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={pushNotifications}
                  onChange={(e) => setPushNotifications(e.target.checked)}
                  style={{ cursor: "pointer" }}
                />
                <span style={{ fontSize: 14 }}>Enable push notifications in browser</span>
              </label>
            </div>

            <button
              onClick={handleSave}
              style={{
                padding: "10px 20px",
                background: "#3b82f6",
                color: "white",
                border: "none",
                borderRadius: 6,
                cursor: "pointer",
                fontSize: 14,
                fontWeight: 500,
                alignSelf: "flex-start",
                marginTop: 8
              }}
            >
              Save Preferences
            </button>
          </div>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === "security" && (
        <div className="card">
          <h3 style={{ marginTop: 0 }}>Security Settings</h3>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div>
              <h4 style={{ fontSize: 15, marginBottom: 12 }}>Change Password</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 6 }}>
                    Current Password
                  </label>
                  <input
                    type="password"
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      border: "1px solid #e5e7eb",
                      borderRadius: 4,
                      fontSize: 14
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 6 }}>
                    New Password
                  </label>
                  <input
                    type="password"
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      border: "1px solid #e5e7eb",
                      borderRadius: 4,
                      fontSize: 14
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 6 }}>
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      border: "1px solid #e5e7eb",
                      borderRadius: 4,
                      fontSize: 14
                    }}
                  />
                </div>
                <button
                  onClick={() => alert("Password changed (mock)")}
                  style={{
                    padding: "8px 16px",
                    background: "#3b82f6",
                    color: "white",
                    border: "none",
                    borderRadius: 4,
                    cursor: "pointer",
                    fontSize: 13,
                    fontWeight: 500,
                    alignSelf: "flex-start"
                  }}
                >
                  Update Password
                </button>
              </div>
            </div>

            <div style={{ paddingTop: 12, borderTop: "1px solid #e5e7eb" }}>
              <h4 style={{ fontSize: 15, marginBottom: 12 }}>Two-Factor Authentication</h4>
              <p style={{ fontSize: 14, color: "#666", marginBottom: 12 }}>
                Add an extra layer of security to your account
              </p>
              <button
                onClick={() => alert("Enable 2FA (mock)")}
                style={{
                  padding: "8px 16px",
                  background: "#059669",
                  color: "white",
                  border: "none",
                  borderRadius: 4,
                  cursor: "pointer",
                  fontSize: 13,
                  fontWeight: 500
                }}
              >
                Enable 2FA
              </button>
            </div>

            <div style={{ paddingTop: 12, borderTop: "1px solid #e5e7eb" }}>
              <h4 style={{ fontSize: 15, marginBottom: 12, color: "#dc2626" }}>Danger Zone</h4>
              <p style={{ fontSize: 14, color: "#666", marginBottom: 12 }}>
                Once you delete your account, there is no going back
              </p>
              <button
                onClick={() => {
                  if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
                    alert("Account deletion requested (mock)");
                  }
                }}
                style={{
                  padding: "8px 16px",
                  background: "white",
                  color: "#dc2626",
                  border: "1px solid #dc2626",
                  borderRadius: 4,
                  cursor: "pointer",
                  fontSize: 13,
                  fontWeight: 500
                }}
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
