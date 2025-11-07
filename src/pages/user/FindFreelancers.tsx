
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiSearchUsers, type User } from "../../lib/mockApi";

export default function FindFreelancers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter states
  const [skillSearch, setSkillSearch] = useState("");
  const [minRating, setMinRating] = useState("");
  const [maxRate, setMaxRate] = useState("");

  const loadUsers = async () => {
    setLoading(true);
    const filters: { skill?: string; minRating?: number; maxHourlyRate?: number } = {};

    if (skillSearch) filters.skill = skillSearch;
    if (minRating) filters.minRating = parseFloat(minRating);
    if (maxRate) filters.maxHourlyRate = parseFloat(maxRate);

    const results = await apiSearchUsers(filters);
    setUsers(results);
    setLoading(false);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    loadUsers();
  };

  const handleClearFilters = () => {
    setSkillSearch("");
    setMinRating("");
    setMaxRate("");
    apiSearchUsers().then(setUsers);
  };

  return (
    <div className="wrap">
      <h2 style={{ marginBottom: 16 }}>Find Freelancers</h2>
      <p style={{ color: "#666", marginBottom: 24 }}>
        Search for talented freelancers by skills, rating, and hourly rate
      </p>

      {/* Search & Filter Form */}
      <form onSubmit={handleSearch} className="card" style={{ marginBottom: 24 }}>
        <h3 style={{ marginTop: 0, marginBottom: 16 }}>Search & Filter</h3>

        <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
          <div>
            <label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 6 }}>
              Search by Skill
            </label>
            <input
              type="text"
              value={skillSearch}
              onChange={(e) => setSkillSearch(e.target.value)}
              placeholder="e.g. React, Design, Node.js"
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
              Min Rating
            </label>
            <select
              value={minRating}
              onChange={(e) => setMinRating(e.target.value)}
              style={{
                width: "100%",
                padding: "8px 12px",
                border: "1px solid #e5e7eb",
                borderRadius: 4,
                fontSize: 14,
                cursor: "pointer"
              }}
            >
              <option value="">Any Rating</option>
              <option value="4.5">4.5+ Stars</option>
              <option value="4.0">4.0+ Stars</option>
              <option value="3.5">3.5+ Stars</option>
              <option value="3.0">3.0+ Stars</option>
            </select>
          </div>

          <div>
            <label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 6 }}>
              Max Hourly Rate
            </label>
            <input
              type="number"
              value={maxRate}
              onChange={(e) => setMaxRate(e.target.value)}
              placeholder="e.g. 100"
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
        </div>

        <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
          <button
            type="submit"
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
            🔍 Search
          </button>
          <button
            type="button"
            onClick={handleClearFilters}
            style={{
              padding: "10px 20px",
              background: "#f3f4f6",
              color: "#666",
              border: "1px solid #e5e7eb",
              borderRadius: 6,
              cursor: "pointer",
              fontSize: 14,
              fontWeight: 500
            }}
          >
            Clear Filters
          </button>
        </div>
      </form>

      {/* Results */}
      {loading ? (
        <p>Loading freelancers...</p>
      ) : users.length === 0 ? (
        <div className="card" style={{ textAlign: "center", padding: 40 }}>
          <p style={{ color: "#666", fontSize: 15 }}>
            No freelancers found matching your criteria. Try adjusting your filters.
          </p>
        </div>
      ) : (
        <>
          <p style={{ color: "#666", marginBottom: 16 }}>
            Found {users.length} freelancer{users.length !== 1 ? 's' : ''}
          </p>

          <ul className="grid">
            {users.map(user => (
              <li key={user.id} className="card">
                {/* User Header */}
                <div style={{ display: "flex", gap: 16, marginBottom: 12 }}>
                  {/* Avatar */}
                  <div
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 24,
                      color: "white",
                      fontWeight: 700,
                      flexShrink: 0
                    }}
                  >
                    {user.name.charAt(0)}
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 style={{ margin: 0, marginBottom: 4, fontSize: 16 }}>
                      {user.name}
                    </h3>
                    <p style={{ margin: 0, fontSize: 13, color: "#666", marginBottom: 6 }}>
                      📍 {user.location}
                    </p>
                    <div style={{ display: "flex", gap: 12, fontSize: 13 }}>
                      <span style={{ color: "#f59e0b", fontWeight: 500 }}>
                        ⭐ {user.rating}
                      </span>
                      <span style={{ color: "#059669", fontWeight: 500 }}>
                        ${user.hourlyRate}/hr
                      </span>
                      <span style={{ color: "#666" }}>
                        {user.completedJobs} jobs
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <p style={{ margin: "12px 0", fontSize: 14, color: "#444", lineHeight: 1.5 }}>
                  {user.bio.length > 120 ? `${user.bio.substring(0, 120)}...` : user.bio}
                </p>

                {/* Skills */}
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
                  {user.skills.slice(0, 4).map((skill, index) => (
                    <span
                      key={index}
                      style={{
                        padding: "4px 8px",
                        background: "#f0f9ff",
                        color: "#0369a1",
                        borderRadius: 4,
                        fontSize: 12,
                        fontWeight: 500
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                  {user.skills.length > 4 && (
                    <span
                      style={{
                        padding: "4px 8px",
                        background: "#f3f4f6",
                        color: "#666",
                        borderRadius: 4,
                        fontSize: 12
                      }}
                    >
                      +{user.skills.length - 4} more
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div style={{ display: "flex", gap: 8, paddingTop: 12, borderTop: "1px solid #e5e7eb" }}>
                  <Link
                    to={`/user/${user.id}`}
                    style={{
                      flex: 1,
                      padding: "8px 16px",
                      background: "#3b82f6",
                      color: "white",
                      borderRadius: 6,
                      textDecoration: "none",
                      fontSize: 13,
                      fontWeight: 500,
                      textAlign: "center"
                    }}
                  >
                    View Profile
                  </Link>
                  <button
                    onClick={() => alert(`Send message to ${user.name} (mock)`)}
                    style={{
                      padding: "8px 16px",
                      background: "white",
                      color: "#3b82f6",
                      border: "1px solid #3b82f6",
                      borderRadius: 6,
                      cursor: "pointer",
                      fontSize: 13,
                      fontWeight: 500
                    }}
                  >
                    💬 Message
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
