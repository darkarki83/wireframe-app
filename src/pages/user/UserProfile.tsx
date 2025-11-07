
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiGetUser, type User } from "../../lib/mockApi";

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

  if (loading) return <div className="wrap"><p>Loading profile...</p></div>;
  if (!user) return <div className="wrap"><p>User not found</p></div>;

  const memberYears = new Date().getFullYear() - new Date(user.memberSince).getFullYear();

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

      {/* Profile Header Card */}
      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", gap: 20, alignItems: "start" }}>
          {/* Avatar */}
          <div
            style={{
              width: 100,
              height: 100,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 40,
              color: "white",
              fontWeight: 700,
              flexShrink: 0
            }}
          >
            {user.name.charAt(0)}
          </div>

          {/* Profile Info */}
          <div style={{ flex: 1 }}>
            <h2 style={{ margin: 0, marginBottom: 8 }}>{user.name}</h2>
            <p style={{ margin: 0, color: "#666", fontSize: 15, marginBottom: 12 }}>
              📍 {user.location}
            </p>

            {/* Stats */}
            <div style={{ display: "flex", gap: 24, marginBottom: 16, flexWrap: "wrap" }}>
              <div>
                <div style={{ fontSize: 13, color: "#666", marginBottom: 2 }}>Rating</div>
                <div style={{ fontSize: 18, fontWeight: 600, color: "#f59e0b" }}>
                  ⭐ {user.rating}/5.0
                </div>
              </div>
              <div>
                <div style={{ fontSize: 13, color: "#666", marginBottom: 2 }}>Completed Jobs</div>
                <div style={{ fontSize: 18, fontWeight: 600, color: "#059669" }}>
                  {user.completedJobs}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 13, color: "#666", marginBottom: 2 }}>Hourly Rate</div>
                <div style={{ fontSize: 18, fontWeight: 600, color: "#3b82f6" }}>
                  ${user.hourlyRate}/hr
                </div>
              </div>
              <div>
                <div style={{ fontSize: 13, color: "#666", marginBottom: 2 }}>Member Since</div>
                <div style={{ fontSize: 18, fontWeight: 600 }}>
                  {memberYears}+ {memberYears === 1 ? "year" : "years"}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <button
                onClick={() => alert("Send message (mock)")}
                style={{
                  padding: "10px 20px",
                  background: "#3b82f6",
                  color: "white",
                  border: "none",
                  borderRadius: 6,
                  cursor: "pointer",
                  fontSize: 14,
                  fontWeight: 500
                }}
              >
                💬 Send Message
              </button>
              <button
                onClick={() => alert("Send job offer (mock)")}
                style={{
                  padding: "10px 20px",
                  background: "#059669",
                  color: "white",
                  border: "none",
                  borderRadius: 6,
                  cursor: "pointer",
                  fontSize: 14,
                  fontWeight: 500
                }}
              >
                📨 Send Job Offer
              </button>
              <button
                onClick={() => alert("Save to favorites (mock)")}
                style={{
                  padding: "10px 20px",
                  background: "white",
                  color: "#666",
                  border: "1px solid #e5e7eb",
                  borderRadius: 6,
                  cursor: "pointer",
                  fontSize: 14,
                  fontWeight: 500
                }}
              >
                ⭐ Save
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section className="card" style={{ marginBottom: 16 }}>
        <h3 style={{ marginTop: 0 }}>About</h3>
        <p style={{ lineHeight: 1.6, color: "#444", margin: 0 }}>
          {user.bio}
        </p>
      </section>

      {/* Skills Section */}
      <section className="card" style={{ marginBottom: 16 }}>
        <h3 style={{ marginTop: 0 }}>Skills</h3>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {user.skills.map((skill, index) => (
            <span
              key={index}
              style={{
                padding: "6px 12px",
                background: "#f0f9ff",
                color: "#0369a1",
                borderRadius: 6,
                fontSize: 13,
                fontWeight: 500
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="card" style={{ marginBottom: 16 }}>
        <h3 style={{ marginTop: 0 }}>Portfolio</h3>
        <div style={{ display: "grid", gap: 16 }}>
          {user.portfolio.map((item, index) => (
            <div
              key={index}
              style={{
                padding: 16,
                background: "#f9fafb",
                borderRadius: 8,
                border: "1px solid #e5e7eb"
              }}
            >
              <h4 style={{ margin: 0, marginBottom: 6, fontSize: 15 }}>{item.title}</h4>
              <p style={{ margin: 0, fontSize: 14, color: "#666", lineHeight: 1.5 }}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews Section (Mock) */}
      <section className="card">
        <h3 style={{ marginTop: 0 }}>Recent Reviews</h3>
        <div style={{ display: "grid", gap: 16 }}>
          <div style={{ paddingBottom: 16, borderBottom: "1px solid #e5e7eb" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <strong style={{ fontSize: 14 }}>Alice Corp</strong>
              <span style={{ color: "#f59e0b", fontSize: 14 }}>⭐⭐⭐⭐⭐ 5.0</span>
            </div>
            <p style={{ margin: 0, fontSize: 14, color: "#666", lineHeight: 1.5 }}>
              Excellent work! {user.name} delivered exactly what we needed on time and within budget.
              Highly recommend for any web development project.
            </p>
            <div style={{ fontSize: 12, color: "#999", marginTop: 8 }}>2 weeks ago</div>
          </div>

          <div style={{ paddingBottom: 16, borderBottom: "1px solid #e5e7eb" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <strong style={{ fontSize: 14 }}>Tech Startup</strong>
              <span style={{ color: "#f59e0b", fontSize: 14 }}>⭐⭐⭐⭐⭐ 5.0</span>
            </div>
            <p style={{ margin: 0, fontSize: 14, color: "#666", lineHeight: 1.5 }}>
              Great communication and professional work. Will definitely hire again!
            </p>
            <div style={{ fontSize: 12, color: "#999", marginTop: 8 }}>1 month ago</div>
          </div>

          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <strong style={{ fontSize: 14 }}>Marketing Agency</strong>
              <span style={{ color: "#f59e0b", fontSize: 14 }}>⭐⭐⭐⭐ 4.5</span>
            </div>
            <p style={{ margin: 0, fontSize: 14, color: "#666", lineHeight: 1.5 }}>
              Good work overall. Minor revisions needed but very responsive to feedback.
            </p>
            <div style={{ fontSize: 12, color: "#999", marginTop: 8 }}>2 months ago</div>
          </div>
        </div>
      </section>
    </div>
  );
}
