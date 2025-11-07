
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { apiGetProposal, type Proposal } from "../../lib/mockApi";

export default function ProposalDetails(){
  const { id } = useParams();
  const nav = useNavigate();
  const [item, setItem] = useState<Proposal | null>(null);
  useEffect(()=>{ if(id) apiGetProposal(id).then(setItem); },[id]);

  if(!item) return <div className="wrap"><p>Loading...</p></div>;

  // Determine if this is incoming offer or my bid based on author
  const isIncomingOffer = item.author !== "Me";
  const isMyBid = item.author === "Me";

  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted": return "#059669";
      case "rejected": return "#dc2626";
      case "in_discussion": return "#f59e0b";
      default: return "#666";
    }
  };

  return <div className="wrap">
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
          <h2 style={{ margin: 0, marginBottom: 8 }}>{item.title}</h2>
          <div style={{ fontSize: 14, color: "#666" }}>
            {isIncomingOffer ? `From: ${item.author}` : `On: ${item.jobTitle}`}
          </div>
        </div>
        <span
          style={{
            fontSize: 13,
            color: getStatusColor(item.status),
            fontWeight: 500,
            textTransform: "capitalize",
            padding: "6px 12px",
            background: `${getStatusColor(item.status)}15`,
            borderRadius: 4
          }}
        >
          {item.status.replace("_", " ")}
        </span>
      </div>

      <div style={{ display: "flex", gap: 16, fontSize: 15, paddingTop: 12, borderTop: "1px solid #e5e7eb" }}>
        <div>
          <span style={{ color: "#666" }}>Budget: </span>
          <strong style={{ color: "#059669" }}>${item.budgetMin}–${item.budgetMax}</strong>
        </div>
      </div>
    </div>

    <section className="card" style={{ marginBottom: 16 }}>
      <h3 style={{ marginTop: 0 }}>Description</h3>
      <p style={{ lineHeight: 1.6, color: "#444" }}>
        {item.description || "No description provided."}
      </p>
    </section>

    <section className="card" style={{ marginBottom: 16 }}>
      <h3 style={{ marginTop: 0 }}>Chat</h3>
      <div style={{border:"1px solid #ddd", padding:12, height:160, overflow:"auto", borderRadius: 6, background: "#f9fafb"}}>
        <p><em>Chat messages placeholder…</em></p>
      </div>
    </section>

    {/* Actions for incoming offers (you're receiving) */}
    {isIncomingOffer && item.status === "sent" && (
      <div style={{display:"flex", gap:8, flexWrap: "wrap"}}>
        <button
          onClick={()=>alert("Counter-offer modal (mock)")}
          style={{
            padding: "10px 20px",
            background: "#f59e0b",
            color: "white",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
            fontSize: 14,
            fontWeight: 500
          }}
        >
          Counter Offer
        </button>
        <button
          onClick={()=>{
            alert("Accepting offer - creating contract (mock)");
            nav("/contracts/c1");
          }}
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
          Accept Offer
        </button>
        <button
          onClick={()=>{
            alert("Declining offer (mock)");
            nav(-1);
          }}
          style={{
            padding: "10px 20px",
            background: "#dc2626",
            color: "white",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
            fontSize: 14,
            fontWeight: 500
          }}
        >
          Decline
        </button>
      </div>
    )}

    {isIncomingOffer && item.status === "in_discussion" && (
      <div style={{display:"flex", gap:8, flexWrap: "wrap"}}>
        <Link
          to={`/chats/${item.id}`}
          style={{
            padding: "10px 20px",
            background: "#3b82f6",
            color: "white",
            borderRadius: 6,
            textDecoration: "none",
            fontSize: 14,
            fontWeight: 500
          }}
        >
          Continue Chat
        </Link>
        <button
          onClick={()=>{
            alert("Accepting offer - creating contract (mock)");
            nav("/contracts/c1");
          }}
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
          Accept Offer
        </button>
        <button
          onClick={()=>{
            alert("Declining offer (mock)");
            nav(-1);
          }}
          style={{
            padding: "10px 20px",
            background: "#dc2626",
            color: "white",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
            fontSize: 14,
            fontWeight: 500
          }}
        >
          Decline
        </button>
      </div>
    )}

    {isIncomingOffer && item.status === "accepted" && (
      <Link
        to="/contracts/c1"
        style={{
          display: "inline-block",
          padding: "10px 20px",
          background: "#059669",
          color: "white",
          borderRadius: 6,
          textDecoration: "none",
          fontSize: 14,
          fontWeight: 500
        }}
      >
        View Contract
      </Link>
    )}

    {/* Actions for my bids (you sent) */}
    {isMyBid && item.status === "sent" && (
      <div style={{ padding: "12px", background: "#f3f4f6", borderRadius: 6 }}>
        <p style={{ margin: 0, color: "#666", fontSize: 14 }}>
          Waiting for client response...
        </p>
      </div>
    )}

    {isMyBid && item.status === "in_discussion" && (
      <Link
        to={`/chats/${item.id}`}
        style={{
          display: "inline-block",
          padding: "10px 20px",
          background: "#3b82f6",
          color: "white",
          borderRadius: 6,
          textDecoration: "none",
          fontSize: 14,
          fontWeight: 500
        }}
      >
        Continue Chat
      </Link>
    )}

    {isMyBid && item.status === "accepted" && (
      <Link
        to="/contracts/c1"
        style={{
          display: "inline-block",
          padding: "10px 20px",
          background: "#059669",
          color: "white",
          borderRadius: 6,
          textDecoration: "none",
          fontSize: 14,
          fontWeight: 500
        }}
      >
        View Contract
      </Link>
    )}

    {isMyBid && item.status === "rejected" && (
      <div style={{ padding: "12px", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 6 }}>
        <p style={{ margin: 0, color: "#dc2626", fontSize: 14, fontWeight: 500 }}>
          This bid was rejected by the client
        </p>
      </div>
    )}
  </div>
}
