
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { apiGetJob, apiGetJobBids, type Job, type Proposal } from "../../lib/mockApi";

export default function JobBids() {
  const { jobId } = useParams();
  const [job, setJob] = useState<Job | null>(null);
  const [bids, setBids] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (jobId) {
      Promise.all([
        apiGetJob(jobId),
        apiGetJobBids(jobId)
      ]).then(([jobData, bidsData]) => {
        setJob(jobData);
        setBids(bidsData);
        setLoading(false);
      });
    }
  }, [jobId]);

  const handleAccept = (bidId: string) => {
    alert(`Accept bid ${bidId} - will create contract (mock)`);
    // In real app: navigate to contract creation
  };

  const handleReject = (bidId: string) => {
    alert(`Reject bid ${bidId} (mock)`);
    // In real app: update bid status to rejected
  };

  const handleStartDiscussion = (bidId: string) => {
    alert(`Start discussion with bidder (mock)`);
    // In real app: navigate to chat or change status to in_discussion
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted": return "#059669";
      case "rejected": return "#dc2626";
      case "in_discussion": return "#f59e0b";
      default: return "#666";
    }
  };

  if (loading) return <div className="wrap"><p>Loading bids...</p></div>;
  if (!job) return <div className="wrap"><p>Job not found</p></div>;

  return (
    <div className="wrap">
      <div style={{ marginBottom: 24 }}>
        <Link to="/jobs/my-posts" style={{ fontSize: 14, color: "#3b82f6" }}>← Back to My Jobs</Link>
      </div>

      <div className="card" style={{ marginBottom: 24 }}>
        <h2 style={{ margin: 0, marginBottom: 8 }}>{job.title}</h2>
        <p style={{ color: "#666", margin: "8px 0" }}>{job.description}</p>
        <div style={{ display: "flex", gap: 16, marginTop: 12 }}>
          <span style={{ fontWeight: 500, color: "#059669" }}>
            Budget: ${job.budgetMin}–${job.budgetMax}
          </span>
          <span style={{ color: "#666" }}>
            Status: <span style={{ textTransform: "capitalize", fontWeight: 500 }}>{job.status}</span>
          </span>
          <span style={{ color: "#666" }}>
            {job.proposalsCount} proposals received
          </span>
        </div>
      </div>

      <h3 style={{ marginBottom: 16 }}>Received Bids ({bids.length})</h3>

      {bids.length === 0 ? (
        <div className="card">
          <p style={{ color: "#666", textAlign: "center" }}>No bids received yet</p>
        </div>
      ) : (
        <ul className="grid">
          {bids.map(bid => (
            <li key={bid.id} className="card">
              <div style={{ marginBottom: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                  <div>
                    <strong style={{ fontSize: 16 }}>{bid.title}</strong>
                    <div style={{ fontSize: 13, color: "#666", marginTop: 4 }}>
                      From: <strong>{bid.author}</strong>
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: 13,
                      color: getStatusColor(bid.status),
                      fontWeight: 500,
                      textTransform: "capitalize",
                      padding: "4px 8px",
                      background: `${getStatusColor(bid.status)}15`,
                      borderRadius: 4
                    }}
                  >
                    {bid.status.replace("_", " ")}
                  </span>
                </div>
              </div>

              {bid.description && (
                <p style={{ margin: "12px 0", fontSize: 14, color: "#444", lineHeight: 1.5 }}>
                  {bid.description}
                </p>
              )}

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12, paddingTop: 12, borderTop: "1px solid #e5e7eb" }}>
                <span style={{ fontWeight: 600, color: "#059669", fontSize: 15 }}>
                  ${bid.budgetMin}–${bid.budgetMax}
                </span>
              </div>

              <div style={{ marginTop: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
                <Link
                  to={`/proposals/${bid.id}`}
                  style={{
                    padding: "6px 12px",
                    background: "#f3f4f6",
                    border: "1px solid #e5e7eb",
                    borderRadius: 4,
                    textDecoration: "none",
                    fontSize: 13,
                    color: "#333"
                  }}
                >
                  View Details
                </Link>

                {bid.status === "sent" && (
                  <>
                    <button
                      onClick={() => handleStartDiscussion(bid.id)}
                      style={{
                        padding: "6px 12px",
                        background: "#f59e0b",
                        color: "white",
                        border: "none",
                        borderRadius: 4,
                        cursor: "pointer",
                        fontSize: 13,
                        fontWeight: 500
                      }}
                    >
                      Discuss
                    </button>
                    <button
                      onClick={() => handleAccept(bid.id)}
                      style={{
                        padding: "6px 12px",
                        background: "#059669",
                        color: "white",
                        border: "none",
                        borderRadius: 4,
                        cursor: "pointer",
                        fontSize: 13,
                        fontWeight: 500
                      }}
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleReject(bid.id)}
                      style={{
                        padding: "6px 12px",
                        background: "#dc2626",
                        color: "white",
                        border: "none",
                        borderRadius: 4,
                        cursor: "pointer",
                        fontSize: 13,
                        fontWeight: 500
                      }}
                    >
                      Reject
                    </button>
                  </>
                )}

                {bid.status === "in_discussion" && (
                  <>
                    <Link
                      to={`/chats/${bid.id}`}
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
                      Continue Chat
                    </Link>
                    <button
                      onClick={() => handleAccept(bid.id)}
                      style={{
                        padding: "6px 12px",
                        background: "#059669",
                        color: "white",
                        border: "none",
                        borderRadius: 4,
                        cursor: "pointer",
                        fontSize: 13,
                        fontWeight: 500
                      }}
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleReject(bid.id)}
                      style={{
                        padding: "6px 12px",
                        background: "#dc2626",
                        color: "white",
                        border: "none",
                        borderRadius: 4,
                        cursor: "pointer",
                        fontSize: 13,
                        fontWeight: 500
                      }}
                    >
                      Reject
                    </button>
                  </>
                )}

                {bid.status === "accepted" && (
                  <Link
                    to={`/contracts/c1`}
                    style={{
                      padding: "6px 12px",
                      background: "#059669",
                      color: "white",
                      borderRadius: 4,
                      textDecoration: "none",
                      fontSize: 13,
                      fontWeight: 500
                    }}
                  >
                    View Contract
                  </Link>
                )}

                {bid.status === "rejected" && (
                  <span style={{ fontSize: 13, color: "#666", fontStyle: "italic" }}>
                    This bid was rejected
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
