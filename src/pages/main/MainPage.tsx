
export default function MainPage() {
  return <div className="wrap">
    <h1>Work Place</h1>

    <div className="grid">
      <a className="card" href="/proposals/incoming">📥 Incoming Offers</a>
    </div>

    <h3 style={{ marginTop: 24, marginBottom: 12, color: "#666" }}>General</h3>
    <div className="grid">
      <a className="card" href="/contracts">📑 Contracts</a>
      <a className="card" href="/user/edit">✏️ Profile</a>
      <a className="card" href="/settings">⚙️ Settings</a>
    </div>
  </div>
}
