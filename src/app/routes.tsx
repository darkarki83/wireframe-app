
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
import ProposalChat from "../pages/proposals/ProposalChat";
import ContractList from "../pages/contracts/ContractList";
import ContractPage from "../pages/contracts/ContractPage";
import ChatList from "../pages/chats/ChatList";
import ChatDialog from "../pages/chats/ChatDialog";
import EditProfile from "../pages/user/EditProfile";
import UserProfile from "../pages/user/UserProfile";
import FindFreelancers from "../pages/user/FindFreelancers";
import NotificationsList from "../pages/notifications/NotificationsList";
import Settings from "../pages/settings/Settings";
import OffersPage from "../pages/offers/OffersPage";
import OfferDetailsPage from "../pages/offers/OfferDetailsPage";
import ProposalDetailsPage from "../pages/offers/ProposalDetailsPage";
import IncomingOfferDetailsPage from "../pages/offers/IncomingOfferDetailsPage";
import MyProvidersPage from "../pages/providers/MyProvidersPage";
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
    <div style={{display:"flex",flexDirection:"column",minHeight:"100vh"}}>
      <div className="wrap" style={{flex:1,paddingBottom:80}}>
        <header style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
          <Link to="/main" style={{display:"flex",alignItems:"center"}}>
            <img src="/img/logo/logo-light-streamline.png" alt="Logo" style={{height:32}} />
          </Link>
          <nav style={{display:"flex",alignItems:"center",gap:12}}>
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

      {/* Bottom Navigation */}
      <nav style={{
        position:"fixed",
        bottom:0,
        left:0,
        right:0,
        background:"white",
        borderTop:"1px solid #e5e7eb",
        display:"flex",
        justifyContent:"space-around",
        padding:"12px 0",
        boxShadow:"0 -2px 10px rgba(0,0,0,0.05)"
      }}>
        <NavLink
          to="/main"
          className={({isActive})=>isActive?"active":undefined}
          style={{
            display:"flex",
            flexDirection:"column",
            alignItems:"center",
            gap:4,
            textDecoration:"none",
            color:"#666",
            fontSize:12,
            fontWeight:500
          }}
        >
          <span style={{fontSize:24}}>🏠</span>
          <span>Home</span>
        </NavLink>

        <NavLink
          to="/offers"
          className={({isActive})=>isActive?"active":undefined}
          style={{
            display:"flex",
            flexDirection:"column",
            alignItems:"center",
            gap:4,
            textDecoration:"none",
            color:"#666",
            fontSize:12,
            fontWeight:500
          }}
        >
          <span style={{fontSize:24}}>📥</span>
          <span>Offers</span>
        </NavLink>

        <NavLink
          to="/providers"
          className={({isActive})=>isActive?"active":undefined}
          style={{
            display:"flex",
            flexDirection:"column",
            alignItems:"center",
            gap:4,
            textDecoration:"none",
            color:"#666",
            fontSize:12,
            fontWeight:500
          }}
        >
          <span style={{fontSize:24}}>👥</span>
          <span>My providers</span>
        </NavLink>

        <NavLink
          to="/user/edit"
          className={({isActive})=>isActive?"active":undefined}
          style={{
            display:"flex",
            flexDirection:"column",
            alignItems:"center",
            gap:4,
            textDecoration:"none",
            color:"#666",
            fontSize:12,
            fontWeight:500
          }}
        >
          <span style={{fontSize:24}}>👤</span>
          <span>Profile</span>
        </NavLink>
      </nav>
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
      { path: "/offers", element: <OffersPage /> },
      { path: "/offers/:id", element: <OfferDetailsPage /> },
      { path: "/offers/:offerId/proposals/:proposalId", element: <ProposalDetailsPage /> },
      { path: "/incoming-offers/:id", element: <IncomingOfferDetailsPage /> },
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
      { path: "/proposals/:id/chat", element: <ProposalChat /> },
      { path: "/contracts", element: <ContractList /> },
      { path: "/contracts/:id", element: <ContractPage /> },
      { path: "/chats", element: <ChatList /> },
      { path: "/chats/:id", element: <ChatDialog /> },
      { path: "/notifications", element: <NotificationsList /> },
      { path: "/settings", element: <Settings /> },
      { path: "/providers", element: <MyProvidersPage /> },
      { path: "/freelancers", element: <FindFreelancers /> },
      { path: "/user/edit", element: <EditProfile /> },
      { path: "/user/:id", element: <UserProfile /> },
    ],
  },
]);
