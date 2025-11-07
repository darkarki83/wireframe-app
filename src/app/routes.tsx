
import { createBrowserRouter, Link, NavLink, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
import KycGate from "../pages/kyc/KycGate";
import MainPage from "../pages/main/MainPage";
import BrowseJobs from "../pages/jobs/BrowseJobs";
import JobDetails from "../pages/jobs/JobDetails";
import MyJobPosts from "../pages/jobs/MyJobPosts";
import PostJob from "../pages/jobs/PostJob";
import JobBids from "../pages/jobs/JobBids";
import IncomingList from "../pages/proposals/IncomingList";
import MyList from "../pages/proposals/MyList";
import ReceivedBids from "../pages/proposals/ReceivedBids";
import CreateProposal from "../pages/proposals/CreateProposal";
import ProposalDetails from "../pages/proposals/Details";
import ContractList from "../pages/contracts/ContractList";
import ContractPage from "../pages/contracts/ContractPage";
import ChatList from "../pages/chats/ChatList";
import ChatDialog from "../pages/chats/ChatDialog";
import EditProfile from "../pages/user/EditProfile";
import NotificationsList from "../pages/notifications/NotificationsList";
import Settings from "../pages/settings/Settings";
import { apiGetUnreadCount } from "../lib/mockApi";

function Shell() {
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    apiGetUnreadCount().then(setUnreadCount);
    // Poll for new notifications every 30 seconds
    const interval = setInterval(() => {
      apiGetUnreadCount().then(setUnreadCount);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="wrap">
      <header style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
        <Link to="/main" style={{fontWeight:700}}>Wireframe</Link>
        <nav style={{display:"flex",alignItems:"center",gap:12}}>
          <NavLink to="/jobs/browse" className={({isActive})=>isActive?"active":undefined}>Browse Jobs</NavLink>
          <NavLink to="/jobs/my-posts" className={({isActive})=>isActive?"active":undefined}>My Jobs</NavLink>
          <NavLink to="/proposals/incoming" className={({isActive})=>isActive?"active":undefined}>Incoming</NavLink>
          <NavLink to="/proposals/mine" className={({isActive})=>isActive?"active":undefined}>My Bids</NavLink>
          <NavLink to="/contracts" className={({isActive})=>isActive?"active":undefined}>Contracts</NavLink>
          <NavLink
            to="/notifications"
            className={({isActive})=>isActive?"active":undefined}
            style={{position:"relative",display:"inline-block"}}
          >
            <span style={{fontSize:18}}>🔔</span>
            {unreadCount > 0 && (
              <span style={{
                position:"absolute",
                top:-4,
                right:-8,
                background:"#dc2626",
                color:"white",
                fontSize:11,
                fontWeight:600,
                padding:"2px 6px",
                borderRadius:10,
                minWidth:18,
                textAlign:"center",
                lineHeight:1.2
              }}>
                {unreadCount}
              </span>
            )}
          </NavLink>
        </nav>
      </header>
      <Outlet />
    </div>
  );
}

export const router = createBrowserRouter([
  { path: "/", element: <SignIn /> },
  { path: "/sign-up", element: <SignUp /> },
  { path: "/kyc", element: <KycGate /> },
  {
    path: "/",
    element: <Shell />,
    children: [
      { path: "/main", element: <MainPage /> },
      { path: "/jobs/browse", element: <BrowseJobs /> },
      { path: "/jobs/my-posts", element: <MyJobPosts /> },
      { path: "/jobs/create", element: <PostJob /> },
      { path: "/jobs/:id", element: <JobDetails /> },
      { path: "/jobs/:jobId/bids", element: <JobBids /> },
      { path: "/proposals/incoming", element: <IncomingList /> },
      { path: "/proposals/mine", element: <MyList /> },
      { path: "/proposals/received", element: <ReceivedBids /> },
      { path: "/proposals/create", element: <CreateProposal /> },
      { path: "/proposals/:id", element: <ProposalDetails /> },
      { path: "/contracts", element: <ContractList /> },
      { path: "/contracts/:id", element: <ContractPage /> },
      { path: "/chats", element: <ChatList /> },
      { path: "/chats/:id", element: <ChatDialog /> },
      { path: "/notifications", element: <NotificationsList /> },
      { path: "/settings", element: <Settings /> },
      { path: "/user/edit", element: <EditProfile /> },
    ],
  },
]);
