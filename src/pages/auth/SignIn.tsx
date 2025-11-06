
import { Link } from "react-router-dom";
export default function SignIn(){
  return <div className="wrap">
    <h1>Sign In</h1>
    <p><Link to="/sign-up">Create account</Link> · <Link to="/kyc">KYC</Link> · <Link to="/main">Skip to Main</Link></p>
  </div>
}
