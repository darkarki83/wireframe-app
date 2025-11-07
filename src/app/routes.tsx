
import { createBrowserRouter, Link, NavLink, Outlet } from "react-router-dom";
import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
import KycGate from "../pages/kyc/KycGate";
import MainPage from "../pages/main/MainPage";
import BrowseJobs from "../pages/jobs/BrowseJobs";
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

function Shell() {
  return (
    <div className="wrap">
      <header style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
        <Link to="/main" style={{fontWeight:700}}>Wireframe</Link>
        <nav>
          <NavLink to="/jobs/browse" className={({isActive})=>isActive?"active":undefined}>Browse Jobs</NavLink>
          <NavLink to="/jobs/my-posts" className={({isActive})=>isActive?"active":undefined}>My Jobs</NavLink>
          <NavLink to="/proposals/incoming" className={({isActive})=>isActive?"active":undefined}>Incoming</NavLink>
          <NavLink to="/proposals/mine" className={({isActive})=>isActive?"active":undefined}>My Bids</NavLink>
          <NavLink to="/contracts" className={({isActive})=>isActive?"active":undefined}>Contracts</NavLink>
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
      { path: "/user/edit", element: <EditProfile /> },
    ],
  },
]);
