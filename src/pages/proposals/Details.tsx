
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiGetProposal, type Proposal } from "../../lib/mockApi";

export default function ProposalDetails(){
  const { id } = useParams();
  const nav = useNavigate();
  const [item, setItem] = useState<Proposal | null>(null);
  useEffect(()=>{ if(id) apiGetProposal(id).then(setItem); },[id]);

  if(!item) return <div className="wrap"><p>Loading...</p></div>;

  return <div className="wrap">
    <h2>{item.title}</h2>
    <p><strong>Budget:</strong> ${item.budgetMin}–{item.budgetMax}</p>
    <section className="card">
      <h3>Description</h3>
      <p>Job summary text…</p>
    </section>
    <section className="card">
      <h3>Chat (mock)</h3>
      <div style={{border:"1px solid #ddd", padding:12, height:160, overflow:"auto"}}>
        <p><em>Chat messages placeholder…</em></p>
      </div>
    </section>
    <div style={{display:"flex", gap:8, marginTop:12}}>
      <button onClick={()=>alert("Counter-offer modal (mock)")}>Counter Offer</button>
      <button onClick={()=>nav("/contracts/c1")}>Approve → Create Contract</button>
      <button onClick={()=>nav(-1)}>Decline</button>
    </div>
  </div>
}
