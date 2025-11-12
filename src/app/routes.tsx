
import { createBrowserRouter, Link, NavLink, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
import KycGate from "../pages/kyc/KycGate";
import MainPage from "../pages/main/MainPage";
import ContractList from "../pages/contracts/ContractList";
import ContractPage from "../pages/contracts/ContractPage";
import ChatList from "../pages/chats/ChatList";
import ChatDialog from "../pages/chats/ChatDialog";
import EditProfile from "../pages/user/EditProfile";
import UserProfile from "../pages/user/UserProfile";
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
    <div className="flex flex-col min-h-screen bg-base-background">
      <div className="flex-1 pb-20">
        <header className="flex justify-between items-center px-md py-md bg-base-background">
          <Link to="/main" className="flex items-center">
            <img src="/img/logo/logo.jpg" alt="Logo" className="h-8" />
          </Link>
          <nav className="flex items-center gap-3">
            <NavLink
              to="/notifications"
              className="relative inline-flex p-xs"
            >
              <div className="w-11 h-11 rounded-full bg-primary-light flex items-center justify-center transition-all duration-200 shadow-sm hover:shadow-md">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" fill="#6C63FF" opacity="0.2" />
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="#6C63FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="#6C63FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 bg-status-error text-text-inverse text-caption font-semibold px-1.5 py-0.5 rounded-full min-w-5 h-5 flex items-center justify-center border-2 border-base-background">
                  {unreadCount}
                </span>
              )}
            </NavLink>
          </nav>
        </header>
        <Outlet />
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-base-background border-t border-base-border flex justify-around items-center py-sm shadow-md">
        <NavLink to="/main">
          {({ isActive }) => (
            <div className={`flex flex-col items-center justify-center gap-xs px-md py-sm rounded-lg transition-all duration-200 ${isActive ? 'text-primary-main bg-primary-subtle' : 'text-text-secondary'
              }`}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M3 9L12 2L21 9V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9z" fill={isActive ? '#E9E7FF' : 'transparent'} />
                <path d="M3 9L12 2L21 9V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          )}
        </NavLink>

        <NavLink to="/offers">
          {({ isActive }) => (
            <div className={`flex flex-col items-center justify-center gap-xs px-md py-sm rounded-lg transition-all duration-200 ${isActive ? 'text-primary-main bg-primary-subtle' : 'text-text-secondary'
              }`}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" fill={isActive ? '#E9E7FF' : 'transparent'} />
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                <path d="M12 7v10M14 9.5h-3a1.5 1.5 0 0 0 0 3h2a1.5 1.5 0 0 1 0 3h-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          )}
        </NavLink>

        <NavLink to="/contracts">
          {({ isActive }) => (
            <div className={`flex flex-col items-center justify-center gap-xs px-md py-sm rounded-lg transition-all duration-200 ${isActive ? 'text-primary-main bg-primary-subtle' : 'text-text-secondary'
              }`}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" fill={isActive ? '#E9E7FF' : 'transparent'} />
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14 2v6h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          )}
        </NavLink>

        <NavLink to="/providers">
          {({ isActive }) => (
            <div className={`flex flex-col items-center justify-center gap-xs px-md py-sm rounded-lg transition-all duration-200 ${isActive ? 'text-primary-main bg-primary-subtle' : 'text-text-secondary'
              }`}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" fill={isActive ? '#E9E7FF' : 'transparent'} />
                <circle cx="9" cy="7" r="4" fill={isActive ? '#E9E7FF' : 'transparent'} />
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          )}
        </NavLink>

        <NavLink to="/user/edit">
          {({ isActive }) => (
            <div className={`flex flex-col items-center justify-center gap-xs px-md py-sm rounded-lg transition-all duration-200 ${isActive ? 'text-primary-main bg-primary-subtle' : 'text-text-secondary'
              }`}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="7" r="4" fill={isActive ? '#E9E7FF' : 'transparent'} />
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" fill={isActive ? '#E9E7FF' : 'transparent'} />
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </div>
          )}
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
      { path: "/contracts", element: <ContractList /> },
      { path: "/contracts/:id", element: <ContractPage /> },
      { path: "/chats", element: <ChatList /> },
      { path: "/chats/:id", element: <ChatDialog /> },
      { path: "/notifications", element: <NotificationsList /> },
      { path: "/settings", element: <Settings /> },
      { path: "/providers", element: <MyProvidersPage /> },
      { path: "/user/edit", element: <EditProfile /> },
      { path: "/user/:id", element: <UserProfile /> },
    ],
  },
]);
