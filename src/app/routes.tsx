
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
import { colors, spacing, typography, borderRadius } from "../lib/designTokens";

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
      background: colors.base.backgroundGradient
    }}>
      <div className="wrap" style={{ flex: 1, paddingBottom: 80 }}>
        {/* Header - Crypto Dark style */}
        <header style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center", 
          padding: `${spacing.md} ${spacing.md}`,
          borderBottom: `1px solid ${colors.base.border}`,
          background: colors.base.surface,
          marginBottom: 0,
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
                width: 44,
                height: 44,
                borderRadius: '50%',
                background: isActive ? colors.primary.subtle : colors.base.background,
                border: `1px solid ${isActive ? colors.primary.main : colors.base.border}`,
                transition: 'all 0.2s',
                textDecoration: 'none',
              })}
            >
              {({ isActive }) => (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={isActive ? colors.primary.main : colors.text.secondary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                  </svg>
                  {unreadCount > 0 && (
                    <span style={{
                      position: "absolute",
                      top: 2,
                      right: 2,
                      background: colors.status.error,
                      color: colors.text.primary,
                      fontSize: typography.fontSize.tiny,
                      fontWeight: typography.fontWeight.bold,
                      padding: "2px 6px",
                      borderRadius: borderRadius.full,
                      minWidth: 18,
                      height: 18,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      lineHeight: 1,
                      boxShadow: '0 0 0 2px ' + colors.base.surface,
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

      {/* Bottom Navigation - Crypto Dark style */}
      <nav style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: colors.base.surface,
        borderTop: `1px solid ${colors.base.border}`,
        display: "flex",
        justifyContent: "space-around",
        padding: `${spacing.lg} 0`,
        boxShadow: "0 -2px 8px rgba(0,0,0,0.3)"
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
            transition: 'all 0.2s',
            padding: `${spacing.xs} ${spacing.md}`,
            borderRadius: borderRadius.md,
            background: isActive ? colors.primary.subtle : 'transparent',
          })}
        >
          {({ isActive }) => (
            <>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={isActive ? colors.primary.main : colors.text.secondary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              <span style={{ fontSize: typography.fontSize.tiny, fontWeight: typography.fontWeight.semibold }}>Home</span>
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
            transition: 'all 0.2s',
            padding: `${spacing.xs} ${spacing.md}`,
            borderRadius: borderRadius.md,
            background: isActive ? colors.primary.subtle : 'transparent',
          })}
        >
          {({ isActive }) => (
            <>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={isActive ? colors.primary.main : colors.text.secondary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
              </svg>
              <span style={{ fontSize: typography.fontSize.tiny, fontWeight: typography.fontWeight.semibold }}>Offers</span>
            </>
          )}
        </NavLink>

        <NavLink
          to="/contracts"
          style={({ isActive }) => ({
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: spacing.xs,
            textDecoration: "none",
            color: isActive ? colors.primary.main : colors.text.secondary,
            fontSize: typography.fontSize.tiny,
            fontWeight: typography.fontWeight.medium,
            transition: 'all 0.2s',
            padding: `${spacing.xs} ${spacing.md}`,
            borderRadius: borderRadius.md,
            background: isActive ? colors.primary.subtle : 'transparent',
          })}
        >
          {({ isActive }) => (
            <>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={isActive ? colors.primary.main : colors.text.secondary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <line x1="10" y1="9" x2="8" y2="9"></line>
              </svg>
              <span style={{ fontSize: typography.fontSize.tiny, fontWeight: typography.fontWeight.semibold }}>Contracts</span>
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
            transition: 'all 0.2s',
            padding: `${spacing.xs} ${spacing.md}`,
            borderRadius: borderRadius.md,
            background: isActive ? colors.primary.subtle : 'transparent',
          })}
        >
          {({ isActive }) => (
            <>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={isActive ? colors.primary.main : colors.text.secondary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span style={{ fontSize: typography.fontSize.tiny, fontWeight: typography.fontWeight.semibold }}>Profile</span>
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
