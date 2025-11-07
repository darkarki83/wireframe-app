
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { apiGetJob, type Job } from "../../lib/mockApi";

export default function JobDetails() {
  const { id } = useParams();
  const nav = useNavigate();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      apiGetJob(id).then(data => {
        setJob(data);
        setLoading(false);
      });
    }
  }, [id]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open": return "#059669";
      case "in_progress": return "#f59e0b";
      case "closed": return "#dc2626";
      default: return "#666";
    }
  };

  if (loading) return <div className="wrap"><p>Loading job details...</p></div>;
  if (!job) return <div className="wrap"><p>Job not found</p></div>;

  const isMyJob = job.postedBy === "Me";

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

      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 12 }}>
          <div>
            <h2 style={{ margin: 0, marginBottom: 8 }}>{job.title}</h2>
            <div style={{ fontSize: 14, color: "#666" }}>
              Posted by: <strong>{job.postedBy}</strong>
            </div>
          </div>
          <span
            style={{
              fontSize: 13,
              color: getStatusColor(job.status),
              fontWeight: 500,
              textTransform: "capitalize",
              padding: "6px 12px",
              background: `${getStatusColor(job.status)}15`,
              borderRadius: 4
            }}
          >
            {job.status.replace("_", " ")}
          </span>
        </div>

        <div style={{ display: "flex", gap: 24, fontSize: 15, paddingTop: 12, borderTop: "1px solid #e5e7eb" }}>
          <div>
            <span style={{ color: "#666" }}>Budget: </span>
            <strong style={{ color: "#059669" }}>${job.budgetMin}–${job.budgetMax}</strong>
          </div>
          <div>
            <span style={{ color: "#666" }}>Proposals: </span>
            <strong>{job.proposalsCount}</strong>
          </div>
        </div>
      </div>

      <section className="card" style={{ marginBottom: 16 }}>
        <h3 style={{ marginTop: 0 }}>Job Description</h3>
        <p style={{ lineHeight: 1.6, color: "#444", whiteSpace: "pre-wrap" }}>
          {job.description}
        </p>
      </section>

      <section className="card" style={{ marginBottom: 16 }}>
        <h3 style={{ marginTop: 0 }}>Project Details</h3>
        <div style={{ display: "grid", gap: 12 }}>
          <div>
            <div style={{ fontSize: 13, color: "#666", marginBottom: 4 }}>Budget Range</div>
            <div style={{ fontSize: 15, fontWeight: 500 }}>${job.budgetMin} - ${job.budgetMax}</div>
          </div>
          <div>
            <div style={{ fontSize: 13, color: "#666", marginBottom: 4 }}>Status</div>
            <div style={{ fontSize: 15, fontWeight: 500, textTransform: "capitalize" }}>{job.status.replace("_", " ")}</div>
          </div>
          <div>
            <div style={{ fontSize: 13, color: "#666", marginBottom: 4 }}>Proposals Received</div>
            <div style={{ fontSize: 15, fontWeight: 500 }}>{job.proposalsCount} proposals</div>
          </div>
        </div>
      </section>

      {/* Actions for marketplace jobs (not my jobs) */}
      {!isMyJob && job.status === "open" && (
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Link
            to={`/proposals/create?jobId=${job.id}`}
            style={{
              display: "inline-block",
              padding: "12px 24px",
              background: "#059669",
              color: "white",
              borderRadius: 6,
              textDecoration: "none",
              fontSize: 15,
              fontWeight: 600
            }}
          >
            Submit Proposal
          </Link>
          <button
            onClick={() => alert("Save job (mock)")}
            style={{
              padding: "12px 24px",
              background: "#f3f4f6",
              border: "1px solid #e5e7eb",
              borderRadius: 6,
              cursor: "pointer",
              fontSize: 15,
              fontWeight: 500
            }}
          >
            Save for Later
          </button>
        </div>
      )}

      {!isMyJob && job.status === "in_progress" && (
        <div style={{ padding: "12px", background: "#fef3c7", border: "1px solid #fbbf24", borderRadius: 6 }}>
          <p style={{ margin: 0, color: "#92400e", fontSize: 14, fontWeight: 500 }}>
            This job is currently in progress with another freelancer
          </p>
        </div>
      )}

      {!isMyJob && job.status === "closed" && (
        <div style={{ padding: "12px", background: "#f3f4f6", border: "1px solid #e5e7eb", borderRadius: 6 }}>
          <p style={{ margin: 0, color: "#666", fontSize: 14, fontWeight: 500 }}>
            This job is closed and no longer accepting proposals
          </p>
        </div>
      )}

      {/* Actions for my jobs */}
      {isMyJob && (
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Link
            to={`/jobs/${job.id}/bids`}
            style={{
              display: "inline-block",
              padding: "12px 24px",
              background: "#3b82f6",
              color: "white",
              borderRadius: 6,
              textDecoration: "none",
              fontSize: 15,
              fontWeight: 600
            }}
          >
            View All Bids ({job.proposalsCount})
          </Link>
          <button
            onClick={() => alert("Edit job (mock)")}
            style={{
              padding: "12px 24px",
              background: "#f3f4f6",
              border: "1px solid #e5e7eb",
              borderRadius: 6,
              cursor: "pointer",
              fontSize: 15,
              fontWeight: 500
            }}
          >
            Edit Job
          </button>
          {job.status === "open" && (
            <button
              onClick={() => alert("Close job (mock)")}
              style={{
                padding: "12px 24px",
                background: "#dc2626",
                color: "white",
                border: "none",
                borderRadius: 6,
                cursor: "pointer",
                fontSize: 15,
                fontWeight: 500
              }}
            >
              Close Job
            </button>
          )}
        </div>
      )}
    </div>
  );
}
