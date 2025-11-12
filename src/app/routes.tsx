
import { createBrowserRouter, Link, NavLink, Outlet, useNavigate } from "react-router-dom"
import { useEffect, useState, useRef } from "react"
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
import { RefreshIcon, DepositIcon, WithdrawIcon, SignOutIcon } from "../components/icons";

function Shell() {
  const navigate = useNavigate()
  const menuRef = useRef<HTMLDivElement>(null)
  const [unreadCount, setUnreadCount] = useState(0)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [kycBalance] = useState(0)

  useEffect(() => {
    apiGetUnreadCount().then(setUnreadCount)
    // Poll for new notifications every 30 seconds
    const interval = setInterval(() => {
      apiGetUnreadCount().then(setUnreadCount)
    }, 30000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false)
      }
    }

    if (showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showUserMenu])

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

            {/* User Profile Dropdown */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="w-11 h-11 rounded-full bg-gray-300 flex items-center justify-center cursor-pointer border-none transition-all duration-200 hover:shadow-md"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="8" r="4" fill="#666" />
                  <path d="M4 20v-2a6 6 0 0116 0v2" fill="#666" />
                </svg>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 top-full mt-2 w-72 bg-base-surface rounded-xl shadow-xl border border-base-border z-50 overflow-hidden">
                  {/* User Info Section */}
                  <div className="p-lg bg-gradient-to-br from-primary-light to-primary-subtle">
                    <div className="text-h3 font-bold text-text-primary mb-xs">Artiom Krol</div>
                    <div className="text-caption text-text-secondary">artemkrol47@email.com</div>
                  </div>

                  {/* KYC Balance Card */}
                  <div className="px-lg py-md border-b border-base-border">
                    <div className="bg-white rounded-lg p-md shadow-sm border border-gray-200">
                      <div className="flex items-center justify-between mb-sm">
                        <span className="text-caption font-medium text-text-secondary uppercase tracking-wide">KYC Balance</span>
                        <button className="p-1 bg-transparent border-none cursor-pointer hover:bg-gray-100 rounded-md transition-colors">
                          <RefreshIcon size={16} className="text-primary-main" />
                        </button>
                      </div>
                      <div className="text-h2 font-bold text-primary-main">{kycBalance} USDC</div>
                    </div>
                  </div>

                  {/* Action Links */}
                  <div className="py-sm">
                    <Link
                      to="/kyc"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-md px-lg py-md hover:bg-primary-light cursor-pointer transition-colors duration-200 no-underline text-text-primary group"
                    >
                      <div className="w-9 h-9 rounded-lg bg-primary-light group-hover:bg-primary-main flex items-center justify-center transition-colors">
                        <DepositIcon size={18} className="text-primary-main group-hover:text-white transition-colors" />
                      </div>
                      <span className="text-body font-medium">Deposit KYC</span>
                    </Link>

                    <Link
                      to="/kyc"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-md px-lg py-md hover:bg-primary-light cursor-pointer transition-colors duration-200 no-underline text-text-primary group"
                    >
                      <div className="w-9 h-9 rounded-lg bg-primary-light group-hover:bg-primary-main flex items-center justify-center transition-colors">
                        <WithdrawIcon size={18} className="text-primary-main group-hover:text-white transition-colors" />
                      </div>
                      <span className="text-body font-medium">Withdraw KYC</span>
                    </Link>

                    <div className="h-px bg-base-border my-sm mx-lg"></div>

                    <Link
                      to="/"
                      onClick={() => {
                        setShowUserMenu(false)
                        navigate('/')
                      }}
                      className="flex items-center gap-md px-lg py-md hover:bg-red-50 cursor-pointer transition-colors duration-200 no-underline text-status-error group"
                    >
                      <div className="w-9 h-9 rounded-lg bg-red-50 group-hover:bg-status-error flex items-center justify-center transition-colors">
                        <SignOutIcon size={18} className="text-status-error group-hover:text-white transition-colors" />
                      </div>
                      <span className="text-body font-medium">Sign Out</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>
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
  {
    path: "/",
    element: <Shell />,
    children: [
      { path: "/main", element: <MainPage /> },
      { path: "/kyc", element: <KycGate /> },
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
