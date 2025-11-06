
import { useEffect, useState } from "react";
import { apiListMine, type Proposal } from "../../lib/mockApi";
import { Link } from "react-router-dom";

export default function MyList(){
  const [items, setItems] = useState<Proposal[]>([]);
  useEffect(()=>{ apiListMine().then(setItems); },[]);
  return <div className="wrap">
    <h2>My Proposals</h2>
    <ul className="grid">
      {items.map(p=>(
        <li key={p.id} className="card">
          <div style={{display:"flex",justifyContent:"space-between"}}>
            <strong>{p.title}</strong>
            <span>${p.budgetMin}–{p.budgetMax}</span>
          </div>
          <div>status: {p.status}</div>
          <div style={{marginTop:8}}>
            <Link to={`/proposals/${p.id}`}>Open</Link>
          </div>
        </li>
      ))}
    </ul>
  </div>
}
