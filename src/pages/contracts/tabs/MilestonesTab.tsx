
export default function MilestonesTab(){
  return <div className="card">
    <h3>Milestones</h3>
    <ul className="grid">
      <li className="card"><strong>Design</strong> — $500 <div><button>Fund</button> <button>Submit</button> <button>Approve</button> <button>Dispute</button> <button>Withdraw</button></div></li>
      <li className="card"><strong>Dev</strong> — $800 <div><button>Fund</button> <button>Submit</button> <button>Approve</button></div></li>
      <li className="card"><strong>Launch</strong> — $200 <div><button>Fund</button></div></li>
    </ul>
  </div>
}
