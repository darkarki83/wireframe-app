
import { Link } from "react-router-dom";
export default function KycGate(){
  return <div className="wrap">
    <h1>KYC</h1>
    <p>Status: <strong>approved</strong> (mock)</p>
    <p><Link to="/main">Go to Main</Link></p>
  </div>
}
