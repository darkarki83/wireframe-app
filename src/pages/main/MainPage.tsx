
export default function MainPage(){
  return <div className="wrap">
    <h1>Main Page</h1>
    <div className="grid">
      <a className="card" href="/user/edit">✏️ Edit Profile</a>
      <a className="card" href="/proposals/mine">📄 My Proposals</a>
      <a className="card" href="/proposals/incoming">📥 Incoming Offers</a>
      <a className="card" href="/contracts">📑 My Contracts</a>
      <a className="card" href="/chats">💬 Chats</a>
    </div>
  </div>
}
