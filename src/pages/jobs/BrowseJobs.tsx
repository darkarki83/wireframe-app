
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiBrowseJobs, type Job } from "../../lib/mockApi";

export default function BrowseJobs() {
  const [items, setItems] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiBrowseJobs().then(data => {
      setItems(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="wrap"><p>Loading jobs...</p></div>;

  return (
    <div className="wrap">
      <h2>Browse Jobs</h2>
      <p style={{ color: "#666", marginBottom: 16 }}>Find jobs and submit proposals</p>

      <ul className="grid">
        {items.map(job => (
          <li key={job.id} className="card">
            <div style={{ marginBottom: 8 }}>
              <strong style={{ fontSize: 16 }}>{job.title}</strong>
              <div style={{ fontSize: 13, color: "#666", marginTop: 4 }}>
                Posted by: {job.postedBy}
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
                {job.proposalsCount} proposals
              </span>
            </div>

            <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
              <Link
                to={`/jobs/${job.id}`}
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
                View Details
              </Link>
              <Link
                to={`/proposals/create?jobId=${job.id}`}
                style={{
                  padding: "6px 12px",
                  border: "1px solid #3b82f6",
                  color: "#3b82f6",
                  borderRadius: 4,
                  textDecoration: "none",
                  fontSize: 13,
                  fontWeight: 500
                }}
              >
                Submit Proposal
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
