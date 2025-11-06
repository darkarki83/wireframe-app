
import { useEffect, useState } from "react";
import { apiListIncoming, type Proposal } from "../../lib/mockApi";
import { Link } from "react-router-dom";

export default function IncomingList(){
  const [items, setItems] = useState<Proposal[]>([]);
  useEffect(()=>{ apiListIncoming().then(setItems); },[]);
  return <div className="wrap">
    <h2>Incoming Offers</h2>
    <ul className="grid">
      {items.map(p=>(
        <li key={p.id} className="card">
          <div style={{display:"flex",justifyContent:"space-between"}}>
            <strong>{p.title}</strong>
            <span>${p.budgetMin}–{p.budgetMax}</span>
          </div>
          <div>from: {p.author} · status: {p.status}</div>
          <div style={{marginTop:8}}>
            <Link to={`/proposals/${p.id}`}>Open</Link>
          </div>
        </li>
      ))}
    </ul>
  </div>
}
