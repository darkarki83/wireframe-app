import { useState } from "react"

type PortfolioItem = {
  id: string
  title: string
  description: string
}

export default function EditProfile() {
  const [activeTab, setActiveTab] = useState<"profile" | "skills" | "portfolio" | "settings">("profile")

  // Profile state
  const [name, setName] = useState("John Doe")
  const [bio, setBio] = useState("Experienced full-stack developer with 5+ years in web and mobile development. Specialized in React, Node.js, and cloud technologies.")
  const [location, setLocation] = useState("San Francisco, CA")
  const [hourlyRate, setHourlyRate] = useState("75")

  // Skills state
  const [skills, setSkills] = useState<string[]>([
    "React", "TypeScript", "Node.js", "MongoDB", "AWS"
  ])
  const [newSkill, setNewSkill] = useState("")

  // Portfolio state
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([
    {
      id: "1",
      title: "E-commerce Platform",
      description: "Built a full-featured e-commerce platform with payment integration"
    },
    {
      id: "2",
      title: "Mobile Banking App",
      description: "Developed a secure mobile banking application for iOS and Android"
    }
  ])
  const [showPortfolioForm, setShowPortfolioForm] = useState(false)
  const [portfolioTitle, setPortfolioTitle] = useState("")
  const [portfolioDescription, setPortfolioDescription] = useState("")

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()])
      setNewSkill("")
    }
  }

  const handleRemoveSkill = (skill: string) => {
    setSkills(skills.filter(s => s !== skill))
  }

  const handleAddPortfolio = () => {
    if (portfolioTitle.trim() && portfolioDescription.trim()) {
      const newItem: PortfolioItem = {
        id: Date.now().toString(),
        title: portfolioTitle.trim(),
        description: portfolioDescription.trim()
      }
      setPortfolio([...portfolio, newItem])
      setPortfolioTitle("")
      setPortfolioDescription("")
      setShowPortfolioForm(false)
    }
  }

  const handleRemovePortfolio = (id: string) => {
    setPortfolio(portfolio.filter(p => p.id !== id))
  }

  return (
    <div className="min-h-screen bg-base-background pb-20">
      {/* Title */}
      <div className="px-lg pt-lg pb-0">
        <h2 className="text-h1 font-semibold text-text-primary m-0 mb-lg">
          Edit Profile
        </h2>
      </div>

      {/* Tabs */}
      <div className="px-lg pb-lg">
        <div className="grid grid-cols-4 gap-xs mb-lg">
          <button
            onClick={() => setActiveTab("profile")}
            className={`p-md rounded-md font-semibold text-caption cursor-pointer flex flex-col items-center justify-center gap-xs min-h-[70px] shadow-sm border-none ${
              activeTab === "profile" ? 'bg-primary-main text-text-inverse' : 'bg-base-surface text-text-primary'
            }`}
          >
            <svg width="20" height="20" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="10" r="5" fill={activeTab === "profile" ? "rgba(255,255,255,0.2)" : "#E9E7FF"} />
              <circle cx="14" cy="10" r="5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M6 24c0-4 3.6-7 8-7s8 3 8 7" fill={activeTab === "profile" ? "rgba(255,255,255,0.2)" : "#E9E7FF"} />
              <path d="M6 24c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span>Profile</span>
          </button>

          <button
            onClick={() => setActiveTab("skills")}
            className={`p-md rounded-md font-semibold text-caption cursor-pointer flex flex-col items-center justify-center gap-xs min-h-[70px] shadow-sm border-none ${
              activeTab === "skills" ? 'bg-primary-main text-text-inverse' : 'bg-base-surface text-text-primary'
            }`}
          >
            <svg width="20" height="20" viewBox="0 0 28 28" fill="none">
              <rect x="4" y="10" width="20" height="12" rx="2" fill={activeTab === "skills" ? "rgba(255,255,255,0.2)" : "#E9E7FF"} />
              <path d="M9 6l5 4 5-4M4 16h20M4 12h20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <rect x="4" y="10" width="20" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <span>Skills</span>
          </button>

          <button
            onClick={() => setActiveTab("portfolio")}
            className={`p-md rounded-md font-semibold text-caption cursor-pointer flex flex-col items-center justify-center gap-xs min-h-[70px] shadow-sm border-none ${
              activeTab === "portfolio" ? 'bg-primary-main text-text-inverse' : 'bg-base-surface text-text-primary'
            }`}
          >
            <svg width="20" height="20" viewBox="0 0 28 28" fill="none">
              <rect x="5" y="8" width="18" height="14" rx="2" fill={activeTab === "portfolio" ? "rgba(255,255,255,0.2)" : "#E9E7FF"} />
              <path d="M9 8V7a2 2 0 012-2h6a2 2 0 012 2v1" fill={activeTab === "portfolio" ? "rgba(255,255,255,0.2)" : "#E9E7FF"} />
              <rect x="5" y="8" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
              <path d="M9 8V7a2 2 0 012-2h6a2 2 0 012 2v1" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <span>Portfolio</span>
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`p-md rounded-md font-semibold text-caption cursor-pointer flex flex-col items-center justify-center gap-xs min-h-[70px] shadow-sm border-none ${
              activeTab === "settings" ? 'bg-primary-main text-text-inverse' : 'bg-base-surface text-text-primary'
            }`}
          >
            <svg width="20" height="20" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="14" r="3" fill={activeTab === "settings" ? "rgba(255,255,255,0.2)" : "#E9E7FF"} />
              <circle cx="14" cy="14" r="8" fill={activeTab === "settings" ? "rgba(255,255,255,0.2)" : "#E9E7FF"} />
              <circle cx="14" cy="14" r="3" stroke="currentColor" strokeWidth="1.5" />
              <path d="M14 6v2M14 20v2M6 14h2M20 14h2M9.2 9.2l1.4 1.4M17.4 17.4l1.4 1.4M9.2 18.8l1.4-1.4M17.4 10.6l1.4-1.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span>Settings</span>
          </button>
        </div>

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="bg-base-surface rounded-lg shadow-base p-lg border border-base-border">
            <h3 className="text-h2 font-semibold text-text-primary mb-lg mt-0">
              Basic Information
            </h3>

            {/* Avatar */}
            <div className="mb-xl text-center">
              <div className="w-25 h-25 rounded-full bg-gradient-to-br from-primary-main to-primary-light inline-flex items-center justify-center text-h1 text-text-inverse font-bold mb-md">
                {name.charAt(0)}
              </div>
              <div>
                <button className="h-11 px-xl bg-base-background text-text-primary border border-base-border rounded-md text-body font-semibold cursor-pointer hover:bg-base-border transition-colors">
                  Change Avatar
                </button>
              </div>
            </div>

            {/* Name */}
            <div className="mb-lg">
              <label htmlFor="profile-name" className="block mb-xs text-body font-semibold text-text-primary">
                Full Name *
              </label>
              <input
                id="profile-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-11 px-md rounded-md border border-base-border bg-base-surface text-body"
              />
            </div>

            {/* Bio */}
            <div className="mb-lg">
              <label htmlFor="profile-bio" className="block mb-xs text-body font-semibold text-text-primary">
                Bio
              </label>
              <textarea
                id="profile-bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={4}
                className="w-full px-md py-sm rounded-md border border-base-border bg-base-surface text-body resize-y"
              />
            </div>

            {/* Location */}
            <div className="mb-lg">
              <label htmlFor="profile-location" className="block mb-xs text-body font-semibold text-text-primary">
                Location
              </label>
              <input
                id="profile-location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City, Country"
                className="w-full h-11 px-md rounded-md border border-base-border bg-base-surface text-body"
              />
            </div>

            {/* Hourly Rate */}
            <div className="mb-xl">
              <label htmlFor="profile-rate" className="block mb-xs text-body font-semibold text-text-primary">
                Hourly Rate ($)
              </label>
              <input
                id="profile-rate"
                type="number"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(e.target.value)}
                placeholder="75"
                className="w-full h-11 px-md rounded-md border border-base-border bg-base-surface text-body"
              />
            </div>

            {/* Save Button */}
            <button
              onClick={() => alert("Profile saved! (mock)")}
              className="w-full h-11 bg-primary-main text-text-inverse border-none rounded-md text-body font-semibold cursor-pointer hover:bg-primary-dark transition-colors flex items-center justify-center gap-xs"
            >
              <svg width="18" height="18" viewBox="0 0 28 28" fill="none">
                <path d="M20 7v14H8V7" fill="rgba(255,255,255,0.2)" />
                <path d="M21 7V5a2 2 0 00-2-2H9a2 2 0 00-2 2v2M8 7v14a2 2 0 002 2h8a2 2 0 002-2V7M12 3v4M16 3v4M12 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              Save Changes
            </button>
          </div>
        )}

        {/* Skills Tab */}
        {activeTab === "skills" && (
          <div className="bg-base-surface rounded-lg shadow-base p-lg border border-base-border">
            <h3 className="text-h2 font-semibold text-text-primary mb-lg mt-0">
              My Skills
            </h3>

            {/* Add Skill */}
            <div className="mb-xl">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAddSkill()
                  }
                }}
                placeholder="Add a skill (e.g., React, Python, Design)"
                className="w-full h-11 px-md rounded-md border border-base-border bg-base-surface text-body mb-sm"
              />
              <button
                onClick={handleAddSkill}
                className="w-full h-11 bg-primary-main text-text-inverse border-none rounded-md text-body font-semibold cursor-pointer hover:bg-primary-dark transition-colors flex items-center justify-center gap-xs"
              >
                <svg width="14" height="14" viewBox="0 0 28 28" fill="none">
                  <circle cx="14" cy="14" r="10" fill="rgba(255,255,255,0.2)" />
                  <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M14 9v10M9 14h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                Add
              </button>
            </div>

            {/* Skills List */}
            <div className="flex gap-sm flex-wrap">
              {skills.map((skill) => (
                <div
                  key={skill}
                  className="px-md py-xs bg-primary-light text-primary-main rounded-md text-caption font-medium flex items-center gap-xs"
                >
                  <span>{skill}</span>
                  <button
                    onClick={() => handleRemoveSkill(skill)}
                    className="bg-transparent border-none text-status-error cursor-pointer p-0 flex items-center leading-none text-lg"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            {skills.length === 0 && (
              <div className="text-center p-xl text-text-secondary text-body">
                No skills added yet. Add your first skill!
              </div>
            )}
          </div>
        )}

        {/* Portfolio Tab */}
        {activeTab === "portfolio" && (
          <div className="bg-base-surface rounded-lg shadow-base p-lg border border-base-border">
            <h3 className="text-h2 font-semibold text-text-primary mb-lg mt-0">
              Portfolio Projects
            </h3>

            {/* Add Portfolio Button */}
            {!showPortfolioForm && (
              <button
                onClick={() => setShowPortfolioForm(true)}
                className="w-full h-11 bg-primary-main text-text-inverse border-none rounded-md text-body font-semibold cursor-pointer hover:bg-primary-dark transition-colors mb-xl flex items-center justify-center gap-xs"
              >
                <svg width="16" height="16" viewBox="0 0 28 28" fill="none">
                  <circle cx="14" cy="14" r="10" fill="rgba(255,255,255,0.2)" />
                  <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M14 9v10M9 14h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                Add Portfolio Item
              </button>
            )}

            {/* Portfolio Form */}
            {showPortfolioForm && (
              <div className="bg-base-background border border-base-border rounded-md p-lg mb-xl">
                <h4 className="m-0 mb-md text-body font-semibold text-text-primary">
                  Add New Portfolio Item
                </h4>

                <div className="mb-md">
                  <label htmlFor="portfolio-title" className="block mb-xs text-body font-medium text-text-primary">
                    Project Title *
                  </label>
                  <input
                    id="portfolio-title"
                    type="text"
                    value={portfolioTitle}
                    onChange={(e) => setPortfolioTitle(e.target.value)}
                    placeholder="E.g., E-commerce Platform"
                    className="w-full h-11 px-md rounded-md border border-base-border bg-base-surface text-body"
                  />
                </div>

                <div className="mb-lg">
                  <label htmlFor="portfolio-description" className="block mb-xs text-body font-medium text-text-primary">
                    Description *
                  </label>
                  <textarea
                    id="portfolio-description"
                    value={portfolioDescription}
                    onChange={(e) => setPortfolioDescription(e.target.value)}
                    placeholder="Describe the project..."
                    rows={4}
                    className="w-full px-md py-sm rounded-md border border-base-border bg-base-surface text-body resize-y"
                  />
                </div>

                <div className="flex gap-sm">
                  <button
                    onClick={handleAddPortfolio}
                    className="flex-1 h-11 bg-primary-main text-text-inverse border-none rounded-md text-body font-semibold cursor-pointer hover:bg-primary-dark transition-colors"
                  >
                    Add
                  </button>
                  <button
                    onClick={() => {
                      setShowPortfolioForm(false)
                      setPortfolioTitle("")
                      setPortfolioDescription("")
                    }}
                    className="flex-1 h-11 bg-base-background text-text-primary border border-base-border rounded-md text-body font-semibold cursor-pointer hover:bg-base-border transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Portfolio List */}
            <div className="flex flex-col gap-md">
              {portfolio.map((item) => (
                <div
                  key={item.id}
                  className="p-lg bg-base-background border border-base-border rounded-md"
                >
                  <div className="flex justify-between items-start mb-xs">
                    <h4 className="m-0 text-body font-semibold text-text-primary">
                      {item.title}
                    </h4>
                    <button
                      onClick={() => handleRemovePortfolio(item.id)}
                      className="bg-transparent border-none text-status-error cursor-pointer p-0 text-h2 leading-none"
                    >
                      ×
                    </button>
                  </div>
                  <p className="m-0 text-body text-text-secondary leading-normal">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            {portfolio.length === 0 && !showPortfolioForm && (
              <div className="text-center p-xl text-text-secondary text-body">
                No portfolio items yet. Add your first project!
              </div>
            )}
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div className="bg-base-surface rounded-lg shadow-base p-lg border border-base-border">
            <h3 className="text-h2 font-semibold text-text-primary mb-lg mt-0">
              Account Settings
            </h3>

            {/* Email */}
            <div className="mb-lg">
              <label htmlFor="settings-email" className="block mb-sm text-body font-semibold text-text-primary">
                Email Address
              </label>
              <input
                id="settings-email"
                type="email"
                defaultValue="john.doe@example.com"
                disabled
                className="w-full h-11 px-md rounded-md border border-base-border bg-base-background text-body cursor-not-allowed"
              />
              <div className="text-caption text-text-secondary mt-xs">
                Contact support to change your email
              </div>
            </div>

            {/* Password */}
            <div className="mb-xl">
              <label className="block mb-sm text-body font-semibold text-text-primary">
                Password
              </label>
              <button
                onClick={() => alert("Change password (mock)")}
                className="h-11 px-xl bg-base-background text-text-primary border border-base-border rounded-md text-body font-semibold cursor-pointer hover:bg-base-border transition-colors"
              >
                Change Password
              </button>
            </div>

            {/* Notifications */}
            <div className="mb-xl">
              <h4 className="text-body font-semibold mb-md mt-0 text-text-primary">
                Notifications
              </h4>
              <div className="flex flex-col gap-md">
                <label className="flex items-center gap-md p-md bg-base-background rounded-md cursor-pointer">
                  <input type="checkbox" defaultChecked />
                  <span className="text-body">Email notifications for new messages</span>
                </label>
                <label className="flex items-center gap-md p-md bg-base-background rounded-md cursor-pointer">
                  <input type="checkbox" defaultChecked />
                  <span className="text-body">Email notifications for job offers</span>
                </label>
                <label className="flex items-center gap-md p-md bg-base-background rounded-md cursor-pointer">
                  <input type="checkbox" />
                  <span className="text-body">Email notifications for weekly digest</span>
                </label>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="p-lg bg-red-50 border border-red-200 rounded-md">
              <h4 className="text-body font-semibold mb-sm mt-0 text-status-error">
                Danger Zone
              </h4>
              <p className="text-body text-text-secondary mb-md mt-0">
                Once you delete your account, there is no going back. Please be certain.
              </p>
              <button
                onClick={() => {
                  if (confirm("Are you sure you want to delete your account?")) {
                    alert("Account deleted (mock)")
                  }
                }}
                className="px-lg py-sm bg-status-error text-text-inverse border-none rounded-md text-body font-semibold cursor-pointer hover:bg-red-700 transition-colors"
              >
                Delete Account
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
