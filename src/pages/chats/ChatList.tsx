
import { Link } from "react-router-dom";
export default function ChatList(){
  return <div className="wrap">
    <h2>Chats</h2>
    <ul className="grid">
      <li className="card"><Link to="/chats/1">Contract: Website build</Link></li>
      <li className="card"><Link to="/chats/2">Proposal: Landing redesign</Link></li>
    </ul>
  </div>
}
