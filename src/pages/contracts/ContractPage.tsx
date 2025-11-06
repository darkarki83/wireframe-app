
import { useState } from "react";
import OverviewTab from "./tabs/OverviewTab";
import MilestonesTab from "./tabs/MilestonesTab";
import ChatTab from "./tabs/ChatTab";
import FilesTab from "./tabs/FilesTab";
import ActivityTab from "./tabs/ActivityTab";

export default function ContractPage(){
  const [tab, setTab] = useState<"overview"|"milestones"|"chat"|"files"|"activity">("overview");
  return <div className="wrap">
    <h2>Contract</h2>
    <div className="tabbar" style={{marginBottom:12}}>
      <button onClick={()=>setTab("overview")}>Overview</button>
      <button onClick={()=>setTab("milestones")}>Milestones</button>
      <button onClick={()=>setTab("chat")}>Chat</button>
      <button onClick={()=>setTab("files")}>Files</button>
      <button onClick={()=>setTab("activity")}>Activity</button>
    </div>
    {tab==="overview" && <OverviewTab/>}
    {tab==="milestones" && <MilestonesTab/>}
    {tab==="chat" && <ChatTab/>}
    {tab==="files" && <FilesTab/>}
    {tab==="activity" && <ActivityTab/>}
  </div>
}
