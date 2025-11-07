
import { useEffect, useState } from "react";
import { apiListMine, type Proposal } from "../../lib/mockApi";
import { Link } from "react-router-dom";

export default function MyList(){
  const [items, setItems] = useState<Proposal[]>([]);
  useEffect(()=>{ apiListMine().then(setItems); },[]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted": return "#059669";
      case "rejected": return "#dc2626";
      case "in_discussion": return "#f59e0b";
      default: return "#666";
    }
  };

  return <div className="wrap">
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
      <h2 style={{margin:0}}>My Bids</h2>
      <Link to="/jobs/browse" style={{padding:"8px 16px",background:"#3b82f6",color:"white",borderRadius:6,textDecoration:"none",fontSize:14,fontWeight:500}}>Browse Jobs</Link>
    </div>
    <p style={{ color: "#666", marginBottom: 16 }}>Proposals you submitted on jobs</p>

    <ul className="grid">
      {items.map(p=>(
        <li key={p.id} className="card">
          <div style={{ marginBottom: 8 }}>
            <div style={{ fontSize: 13, color: "#666", marginBottom: 4 }}>
              On: <strong>{p.jobTitle}</strong>
            </div>
            <strong style={{ fontSize: 16 }}>{p.title}</strong>
          </div>

          {p.description && (
            <p style={{ margin: "8px 0", fontSize: 14, color: "#444", lineHeight: 1.5 }}>
              {p.description}
            </p>
          )}

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12, paddingTop: 12, borderTop: "1px solid #e5e7eb" }}>
            <span style={{ fontWeight: 600, color: "#059669", fontSize: 15 }}>
              ${p.budgetMin}–${p.budgetMax}
            </span>
            <span
              style={{
                fontSize: 13,
                color: getStatusColor(p.status),
                fontWeight: 500,
                textTransform: "capitalize",
                padding: "4px 8px",
                background: `${getStatusColor(p.status)}15`,
                borderRadius: 4
              }}
            >
              {p.status.replace("_", " ")}
            </span>
          </div>

          <div style={{marginTop:12, display:"flex", gap:8, flexWrap:"wrap"}}>
            <Link
              to={`/proposals/${p.id}`}
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

            {p.jobId !== "direct" && (
              <Link
                to={`/jobs/${p.jobId}`}
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
                View Job
              </Link>
            )}

            {p.status === "in_discussion" && (
              <Link
                to={`/chats/${p.id}`}
                style={{
                  padding: "6px 12px",
                  background: "#f59e0b",
                  color: "white",
                  borderRadius: 4,
                  textDecoration: "none",
                  fontSize: 13,
                  fontWeight: 500
                }}
              >
                Continue Chat
              </Link>
            )}

            {p.status === "accepted" && (
              <Link
                to="/contracts/c1"
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

            {p.status === "rejected" && (
              <span style={{ fontSize: 13, color: "#666", fontStyle: "italic", padding: "6px 0" }}>
                This bid was rejected
              </span>
            )}
          </div>
        </li>
      ))}
    </ul>
  </div>
}
