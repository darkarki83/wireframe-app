
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
      <div style={{ flex: 1, paddingBottom: 80 }}>
        <header style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: `${spacing.md} ${spacing.md}`,
          background: colors.base.background,
        }}>
          <Link to="/main" style={{ display: "flex", alignItems: "center" }}>
            <img src="/img/logo/logo.jpg" alt="Logo" style={{ height: 32 }} />
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
                boxShadow: shadows.sm,
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  {/* Duotone Bell icon with sparkles */}
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" fill={colors.primary.light} opacity="0.3" />
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke={colors.text.primary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke={colors.text.primary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  {/* Sparkles */}
                  <circle cx="20" cy="4" r="1" fill={colors.primary.main} />
                  <circle cx="22" cy="7" r="0.7" fill={colors.primary.light} />
                  <circle cx="4" cy="5" r="0.7" fill={colors.primary.main} />
                </svg>
              </div>
              {unreadCount > 0 && (
                <span style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  background: colors.status.error,
                  color: colors.text.inverse,
                  fontSize: typography.fontSize.caption,
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
        >
          {({ isActive }) => (
            <div style={{
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
            }}>
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                {/* Duotone Home icon */}
                <path d="M4.5 10.5L14 3.5L23.5 10.5V23a1 1 0 0 1-1 1H5.5a1 1 0 0 1-1-1V10.5z" fill={isActive ? colors.primary.light : 'transparent'} />
                <path d="M4.5 10.5L14 3.5L23.5 10.5V23a1 1 0 0 1-1 1H5.5a1 1 0 0 1-1-1V10.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M10.5 24V15h7v9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Home</span>
            </div>
          )}
        </NavLink>

        <NavLink
          to="/offers"
          className={({ isActive }) => isActive ? "active" : undefined}
        >
          {({ isActive }) => (
            <div style={{
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
            }}>
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                {/* Duotone Offers icon - Dollar */}
                <circle cx="14" cy="14" r="9" fill={isActive ? colors.primary.light : 'transparent'} />
                <circle cx="14" cy="14" r="9" stroke="currentColor" strokeWidth="1.5" />
                <path d="M14 8v12M16.5 10.5h-3.5a2 2 0 0 0 0 4h3a2 2 0 0 1 0 4h-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span>Offers</span>
            </div>
          )}
        </NavLink>

        <NavLink
          to="/contracts"
          className={({ isActive }) => isActive ? "active" : undefined}
        >
          {({ isActive }) => (
            <div style={{
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
            }}>
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                {/* Duotone Contracts icon - Document */}
                <path d="M8 4h8l6 6v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" fill={isActive ? colors.primary.light : 'transparent'} />
                <path d="M8 4h8l6 6v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16 4v6h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M10 14h8M10 18h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span>Contracts</span>
            </div>
          )}
        </NavLink>

        <NavLink
          to="/providers"
          className={({ isActive }) => isActive ? "active" : undefined}
        >
          {({ isActive }) => (
            <div style={{
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
            }}>
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                {/* Duotone Providers icon - Multiple users */}
                <circle cx="10" cy="9" r="3" fill={isActive ? colors.primary.light : 'transparent'} />
                <circle cx="10" cy="9" r="3" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="19" cy="9" r="3" fill={isActive ? colors.primary.light : 'transparent'} />
                <circle cx="19" cy="9" r="3" stroke="currentColor" strokeWidth="1.5" />
                <path d="M4 22v-1.5a4.5 4.5 0 0 1 4.5-4.5h3a4.5 4.5 0 0 1 4.5 4.5V22" fill={isActive ? colors.primary.light : 'transparent'} opacity="0.5" />
                <path d="M4 22v-1.5a4.5 4.5 0 0 1 4.5-4.5h3a4.5 4.5 0 0 1 4.5 4.5V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M17 22v-1.5a4.5 4.5 0 0 1 4.5-4.5h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span>Providers</span>
            </div>
          )}
        </NavLink>

        <NavLink
          to="/user/edit"
          className={({ isActive }) => isActive ? "active" : undefined}
        >
          {({ isActive }) => (
            <div style={{
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
            }}>
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                {/* Duotone Profile icon */}
                <circle cx="14" cy="10" r="4" fill={isActive ? colors.primary.light : 'transparent'} />
                <circle cx="14" cy="10" r="4" stroke="currentColor" strokeWidth="1.5" />
                <path d="M6 24v-2a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v2" fill={isActive ? colors.primary.light : 'transparent'} opacity="0.5" />
                <path d="M6 24v-2a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span>Profile</span>
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
