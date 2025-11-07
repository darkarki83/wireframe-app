
export default function MainPage(){
  return <div className="wrap">
    <h1>Dashboard</h1>

    <h3 style={{marginTop:24,marginBottom:12,color:"#666"}}>As a Freelancer</h3>
    <div className="grid">
      <a className="card" href="/jobs/browse" style={{background:"#3b82f6",color:"white",fontWeight:600}}>🔍 Browse Jobs</a>
      <a className="card" href="/proposals/incoming">📥 Incoming Offers</a>
      <a className="card" href="/proposals/mine">📝 My Bids</a>
    </div>

    <h3 style={{marginTop:24,marginBottom:12,color:"#666"}}>As a Client</h3>
    <div className="grid">
      <a className="card" href="/jobs/create" style={{background:"#059669",color:"white",fontWeight:600}}>➕ Post a Job</a>
      <a className="card" href="/jobs/my-posts">📋 My Job Posts</a>
      <a className="card" href="/proposals/received">📬 Received Bids</a>
    </div>

    <h3 style={{marginTop:24,marginBottom:12,color:"#666"}}>General</h3>
    <div className="grid">
      <a className="card" href="/contracts">📑 Contracts</a>
      <a className="card" href="/chats">💬 Chats</a>
      <a className="card" href="/user/edit">✏️ Profile</a>
      <a className="card" href="/settings">⚙️ Settings</a>
    </div>
  </div>
}
