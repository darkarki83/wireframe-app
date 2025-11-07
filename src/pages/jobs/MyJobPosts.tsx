
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiListMyJobPosts, type Job } from "../../lib/mockApi";

export default function MyJobPosts() {
  const [items, setItems] = useState<Job[]>([]);

  useEffect(() => {
    apiListMyJobPosts().then(setItems);
  }, []);

  return (
    <div className="wrap">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h2 style={{ margin: 0 }}>My Job Posts</h2>
        <Link
          to="/jobs/create"
          style={{
            padding: "8px 16px",
            background: "#3b82f6",
            color: "white",
            borderRadius: 6,
            textDecoration: "none",
            fontSize: 14,
            fontWeight: 500
          }}
        >
          + Post New Job
        </Link>
      </div>

      <ul className="grid">
        {items.map(job => (
          <li key={job.id} className="card">
            <div style={{ marginBottom: 8 }}>
              <strong style={{ fontSize: 16 }}>{job.title}</strong>
              <div style={{ fontSize: 13, color: "#666", marginTop: 4 }}>
                Status: <span style={{ textTransform: "capitalize" }}>{job.status}</span>
              </div>
            </div>

            <p style={{ margin: "8px 0", fontSize: 14, color: "#444" }}>
              {job.description}
            </p>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12 }}>
              <span style={{ fontWeight: 500, color: "#059669" }}>
                ${job.budgetMin}–${job.budgetMax}
              </span>
              <span style={{ fontSize: 13, color: "#666" }}>
                {job.proposalsCount} proposals received
              </span>
            </div>

            <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
              <Link
                to={`/jobs/${job.id}`}
                style={{
                  padding: "6px 12px",
                  background: "#f3f4f6",
                  border: "1px solid #e5e7eb",
                  borderRadius: 4,
                  textDecoration: "none",
                  fontSize: 13
                }}
              >
                View Job
              </Link>
              <Link
                to={`/jobs/${job.id}/bids`}
                style={{
                  padding: "6px 12px",
                  background: "#3b82f6",
                  color: "white",
                  borderRadius: 4,
                  textDecoration: "none",
                  fontSize: 13,
                  fontWeight: 500
                }}
              >
                View Bids ({job.proposalsCount})
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
