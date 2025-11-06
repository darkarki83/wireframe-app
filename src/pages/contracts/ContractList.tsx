
import { useEffect, useState } from "react";
import { apiListContracts, type Contract } from "../../lib/mockApi";
import { Link } from "react-router-dom";

export default function ContractList(){
  const [items, setItems] = useState<Contract[]>([]);
  useEffect(()=>{ apiListContracts().then(setItems); },[]);
  return <div className="wrap">
    <h2>Contracts</h2>
    <ul className="grid">
      {items.map(c=>(
        <li key={c.id} className="card">
          <div style={{display:"flex",justifyContent:"space-between"}}>
            <strong>{c.title}</strong>
            <span>{c.role} · {c.status}</span>
          </div>
          <div style={{marginTop:8}}>
            <Link to={`/contracts/${c.id}`}>Open</Link>
          </div>
        </li>
      ))}
    </ul>
  </div>
}
