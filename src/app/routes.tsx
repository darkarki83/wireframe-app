
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
import { colors, spacing, borderRadius, shadows, typography } from "../lib/designTokens";

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
      background: colors.base.background,
    }}>
      <div className="wrap" style={{ flex: 1, paddingBottom: 80 }}>
        <header style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: `${spacing.md} ${spacing.md}`,
          background: colors.base.background,
        }}>
          <Link to="/main" style={{ display: "flex", alignItems: "center" }}>
            <img src="/img/logo/logo-light-streamline.png" alt="Logo" style={{ height: 32 }} />
          </Link>
          <nav style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <NavLink
              to="/notifications"
              className={({ isActive }) => isActive ? "active" : undefined}
              style={{ position: "relative", display: "inline-flex" }}
            >
              <div style={{
                width: 44,
                height: 44,
                borderRadius: borderRadius.full,
                background: colors.base.surface,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s ease",
              }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={colors.text.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
              </div>
              {unreadCount > 0 && (
                <span style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  background: colors.status.error,
                  color: colors.text.inverse,
                  fontSize: typography.fontSize.tiny,
                  fontWeight: typography.fontWeight.semibold,
                  padding: "3px 6px",
                  borderRadius: borderRadius.full,
                  minWidth: 20,
                  height: 20,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: `2px solid ${colors.base.background}`,
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
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: colors.base.background,
        borderTop: `1px solid ${colors.base.border}`,
        display: "flex",
        justifyContent: "space-around",
        padding: `${spacing.md} 0`,
        boxShadow: shadows.md,
      }}>
        <NavLink
          to="/main"
          className={({ isActive }) => isActive ? "active" : undefined}
          style={({ isActive }) => ({
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: spacing.xs,
            textDecoration: "none",
            color: isActive ? colors.primary.main : colors.text.secondary,
            fontSize: typography.fontSize.caption,
            fontWeight: typography.fontWeight.medium,
            padding: `${spacing.sm} ${spacing.md}`,
            borderRadius: borderRadius.md,
            background: isActive ? colors.primary.subtle : "transparent",
            transition: "all 0.2s ease",
          })}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          <span>Home</span>
        </NavLink>

        <NavLink
          to="/offers"
          className={({ isActive }) => isActive ? "active" : undefined}
          style={({ isActive }) => ({
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: spacing.xs,
            textDecoration: "none",
            color: isActive ? colors.primary.main : colors.text.secondary,
            fontSize: typography.fontSize.caption,
            fontWeight: typography.fontWeight.medium,
            padding: `${spacing.sm} ${spacing.md}`,
            borderRadius: borderRadius.md,
            background: isActive ? colors.primary.subtle : "transparent",
            transition: "all 0.2s ease",
          })}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
          <span>Offers</span>
        </NavLink>

        <NavLink
          to="/contracts"
          className={({ isActive }) => isActive ? "active" : undefined}
          style={({ isActive }) => ({
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: spacing.xs,
            textDecoration: "none",
            color: isActive ? colors.primary.main : colors.text.secondary,
            fontSize: typography.fontSize.caption,
            fontWeight: typography.fontWeight.medium,
            padding: `${spacing.sm} ${spacing.md}`,
            borderRadius: borderRadius.md,
            background: isActive ? colors.primary.subtle : "transparent",
            transition: "all 0.2s ease",
          })}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
          <span>Contracts</span>
        </NavLink>

        <NavLink
          to="/user/edit"
          className={({ isActive }) => isActive ? "active" : undefined}
          style={({ isActive }) => ({
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: spacing.xs,
            textDecoration: "none",
            color: isActive ? colors.primary.main : colors.text.secondary,
            fontSize: typography.fontSize.caption,
            fontWeight: typography.fontWeight.medium,
            padding: `${spacing.sm} ${spacing.md}`,
            borderRadius: borderRadius.md,
            background: isActive ? colors.primary.subtle : "transparent",
            transition: "all 0.2s ease",
          })}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
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
