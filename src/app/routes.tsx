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
import { colors, typography, spacing, borderRadius } from "../lib/designTokens";

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
    <div style={{ 
      display: "flex", 
      flexDirection: "column", 
      minHeight: "100vh",
      background: colors.base.background 
    }}>
      <div className="wrap" style={{ flex: 1, paddingBottom: 80 }}>
        {/* Header - Fintech style */}
        <header style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center", 
          padding: `${spacing.md} ${spacing.md}`,
          borderBottom: `1px solid ${colors.base.border}`,
          background: colors.base.surface,
          marginBottom: spacing.md
        }}>
          <Link to="/main" style={{ display: "flex", alignItems: "center" }}>
            <img src="/img/logo/logo-light-streamline.png" alt="Logo" style={{ height: 28 }} />
          </Link>
          <nav style={{ display: "flex", alignItems: "center", gap: spacing.sm }}>
            <NavLink
              to="/notifications"
              style={({ isActive }) => ({ 
                position: "relative", 
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: isActive ? colors.primary.light : 'transparent',
                transition: 'background 0.2s'
              })}
            >
              {({ isActive }) => (
                <>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={isActive ? colors.primary.main : colors.text.secondary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                  </svg>
                  {unreadCount > 0 && (
                    <span style={{
                      position: "absolute",
                      top: 4,
                      right: 4,
                      background: colors.status.error,
                      color: colors.text.inverse,
                      fontSize: typography.fontSize.tiny,
                      fontWeight: typography.fontWeight.semibold,
                      padding: "2px 5px",
                      borderRadius: borderRadius.full,
                      minWidth: 18,
                      height: 18,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      lineHeight: 1
                    }}>
                      {unreadCount}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          </nav>
        </header>
        <Outlet />
      </div>

      {/* Bottom Navigation - Fintech style */}
      <nav style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: colors.base.surface,
        borderTop: `1px solid ${colors.base.border}`,
        display: "flex",
        justifyContent: "space-around",
        padding: `${spacing.md} 0`,
        boxShadow: "0 -1px 3px rgba(0,0,0,0.04)"
      }}>
        <NavLink
          to="/main"
          style={({ isActive }) => ({
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: spacing.xs,
            textDecoration: "none",
            color: isActive ? colors.primary.main : colors.text.secondary,
            fontSize: typography.fontSize.tiny,
            fontWeight: typography.fontWeight.medium,
            transition: 'color 0.2s'
          })}
        >
          {({ isActive }) => (
            <>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={isActive ? colors.primary.main : colors.text.secondary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              <span>Home</span>
            </>
          )}
        </NavLink>

        <NavLink
          to="/offers"
          style={({ isActive }) => ({
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: spacing.xs,
            textDecoration: "none",
            color: isActive ? colors.primary.main : colors.text.secondary,
            fontSize: typography.fontSize.tiny,
            fontWeight: typography.fontWeight.medium,
            transition: 'color 0.2s'
          })}
        >
          {({ isActive }) => (
            <>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={isActive ? colors.primary.main : colors.text.secondary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              <span>Offers</span>
            </>
          )}
        </NavLink>

        <NavLink
          to="/providers"
          style={({ isActive }) => ({
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: spacing.xs,
            textDecoration: "none",
            color: isActive ? colors.primary.main : colors.text.secondary,
            fontSize: typography.fontSize.tiny,
            fontWeight: typography.fontWeight.medium,
            transition: 'color 0.2s'
          })}
        >
          {({ isActive }) => (
            <>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={isActive ? colors.primary.main : colors.text.secondary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              <span>Providers</span>
            </>
          )}
        </NavLink>

        <NavLink
          to="/user/edit"
          style={({ isActive }) => ({
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: spacing.xs,
            textDecoration: "none",
            color: isActive ? colors.primary.main : colors.text.secondary,
            fontSize: typography.fontSize.tiny,
            fontWeight: typography.fontWeight.medium,
            transition: 'color 0.2s'
          })}
        >
          {({ isActive }) => (
            <>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={isActive ? colors.primary.main : colors.text.secondary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span>Profile</span>
            </>
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
