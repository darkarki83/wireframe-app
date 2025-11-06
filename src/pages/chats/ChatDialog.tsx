
import { useParams } from "react-router-dom";
export default function ChatDialog(){
  const { id } = useParams();
  return <div className="wrap">
    <h2>Dialog #{id}</h2>
    <div className="card" style={{height:240, overflow:"auto"}}>
      <p><em>Messages placeholder…</em></p>
    </div>
  </div>
}
