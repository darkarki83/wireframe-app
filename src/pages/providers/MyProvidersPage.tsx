import { useState } from "react"

type Provider = {
  id: string
  email: string
  name: string
  phone: string
  countryCode: string
  addedAt: string
}

// Mock database of users in the system
const systemUsers = [
  { email: "john.doe@example.com", name: "John Doe", phone: "5551234", countryCode: "+1" },
  { email: "jane.smith@example.com", name: "Jane Smith", phone: "5555678", countryCode: "+1" },
  { email: "alex.wilson@example.com", name: "Alex Wilson", phone: "5559012", countryCode: "+44" },
  { email: "maria.garcia@example.com", name: "Maria Garcia", phone: "5553456", countryCode: "+34" },
]

export default function MyProvidersPage() {
  const [showAddForm, setShowAddForm] = useState(false)
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [countryCode, setCountryCode] = useState("+1")
  const [isAutoFilled, setIsAutoFilled] = useState(false)

  const [providers, setProviders] = useState<Provider[]>([
    {
      id: "1",
      email: "sarah.johnson@example.com",
      name: "Sarah Johnson",
      phone: "5557890",
      countryCode: "+1",
      addedAt: "2025-11-05"
    },
    {
      id: "2",
      email: "mike.brown@example.com",
      name: "Mike Brown",
      phone: "5551122",
      countryCode: "+44",
      addedAt: "2025-11-03"
    }
  ])

  const handleEmailBlur = () => {
    const user = systemUsers.find(u => u.email.toLowerCase() === email.toLowerCase())
    if (user) {
      setName(user.name)
      setPhone(user.phone)
      setCountryCode(user.countryCode)
      setIsAutoFilled(true)
    }
  }

  const handleAddProvider = () => {
    if (!email.trim() || !name.trim() || !phone.trim()) return

    const newProvider: Provider = {
      id: Date.now().toString(),
      email: email.trim(),
      name: name.trim(),
      phone: phone.trim(),
      countryCode,
      addedAt: new Date().toISOString().split('T')[0]
    }

    setProviders([newProvider, ...providers])

    // Reset form
    setEmail("")
    setName("")
    setPhone("")
    setCountryCode("+1")
    setIsAutoFilled(false)
    setShowAddForm(false)
  }

  const handleRemoveProvider = (id: string) => {
    setProviders(providers.filter(p => p.id !== id))
  }

  return (
    <div className="min-h-screen bg-base-background pb-20">
      {/* Page Header */}
      <div className="px-lg pt-xl pb-xl">
        <h1 className="text-h1 font-semibold text-text-primary m-0">
          My Providers
        </h1>
      </div>

      {/* Add Provider Button or Form */}
      <div className="px-lg pb-xl">
        {showAddForm ? (
          /* Add Provider Form - Card */
          <div className="bg-base-surface rounded-lg shadow-base p-lg mb-xl border border-base-border">
            <div className="flex items-center gap-md mb-lg">
              {/* Duotone Add User Icon */}
              <div className="w-12 h-12 rounded-md bg-primary-light flex items-center justify-center flex-shrink-0">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <circle cx="14" cy="10" r="4" fill="#E9E7FF" />
                  <circle cx="14" cy="10" r="4" stroke="#6C63FF" strokeWidth="1.5" />
                  <path d="M6 24v-2a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v2" fill="#E9E7FF" opacity="0.5" />
                  <path d="M6 24v-2a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v2" stroke="#6C63FF" strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="22" cy="8" r="1.5" fill="#6C63FF" />
                </svg>
              </div>
              <h2 className="text-h2 font-semibold text-text-primary m-0">
                Add New Provider
              </h2>
            </div>

            {/* Email Field */}
            <div className="mb-lg">
              <label 
                htmlFor="provider-email"
                className="block mb-sm text-caption font-medium text-text-secondary"
              >
                Email *
              </label>
              <input
                id="provider-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setIsAutoFilled(false)
                }}
                onBlur={handleEmailBlur}
                placeholder="Enter email address"
                className={`w-full h-11 px-md rounded-md text-body border transition-colors ${
                  isAutoFilled 
                    ? 'border-2 border-status-success bg-green-50' 
                    : 'border-base-border bg-base-surface'
                }`}
              />
              {isAutoFilled && (
                <div className="text-caption text-status-success mt-xs font-medium flex items-center gap-xs">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="7" fill="#10B981" opacity="0.2" />
                    <path d="M5 8l2 2 4-4" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  User found in system - details auto-filled
                </div>
              )}
            </div>

            {/* Name Field */}
            <div className="mb-lg">
              <label 
                htmlFor="provider-name"
                className="block mb-sm text-caption font-medium text-text-secondary"
              >
                Name *
              </label>
              <input
                id="provider-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name"
                readOnly={isAutoFilled}
                className={`w-full h-11 px-md rounded-md text-body border border-base-border ${
                  isAutoFilled ? 'bg-base-background cursor-not-allowed' : 'bg-base-surface'
                }`}
              />
            </div>

            {/* Phone Field with Country Code */}
            <div className="mb-xl">
              <label 
                htmlFor="provider-phone"
                className="block mb-sm text-caption font-medium text-text-secondary"
              >
                Phone *
              </label>
              <div className="flex gap-sm">
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  disabled={isAutoFilled}
                  className={`h-11 px-sm rounded-md text-body border border-base-border w-24 flex-shrink-0 ${
                    isAutoFilled ? 'bg-base-background cursor-not-allowed' : 'bg-base-surface cursor-pointer'
                  }`}
                >
                  <option value="+1">🇺🇸 +1</option>
                  <option value="+44">🇬🇧 +44</option>
                  <option value="+34">🇪🇸 +34</option>
                  <option value="+49">🇩🇪 +49</option>
                  <option value="+33">🇫🇷 +33</option>
                  <option value="+39">🇮🇹 +39</option>
                  <option value="+7">🇷🇺 +7</option>
                  <option value="+86">🇨🇳 +86</option>
                  <option value="+81">🇯🇵 +81</option>
                  <option value="+91">🇮🇳 +91</option>
                </select>
                <input
                  id="provider-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  placeholder="Phone number"
                  readOnly={isAutoFilled}
                  className={`flex-1 h-11 px-md rounded-md text-body border border-base-border ${
                    isAutoFilled ? 'bg-base-background cursor-not-allowed' : 'bg-base-surface'
                  }`}
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex gap-md">
              <button
                onClick={handleAddProvider}
                disabled={!email.trim() || !name.trim() || !phone.trim()}
                className={`flex-1 h-11 bg-primary-main text-text-inverse border-none rounded-md text-body font-semibold transition-colors ${
                  (email.trim() && name.trim() && phone.trim()) 
                    ? 'cursor-pointer hover:bg-primary-dark' 
                    : 'cursor-not-allowed opacity-50'
                }`}
              >
                Add Provider
              </button>
              <button
                onClick={() => {
                  setShowAddForm(false)
                  setEmail("")
                  setName("")
                  setPhone("")
                  setCountryCode("+1")
                  setIsAutoFilled(false)
                }}
                className="flex-1 h-11 bg-base-background text-text-primary border border-base-border rounded-md text-body font-semibold cursor-pointer hover:bg-base-border transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          /* Add Provider Button */
          <button
            onClick={() => setShowAddForm(true)}
            className="w-full bg-primary-subtle border-2 border-dashed border-primary-main rounded-lg shadow-base p-lg flex items-center justify-center gap-md cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md mb-xl"
          >
            {/* Duotone Plus Icon */}
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="14" r="10" fill="#E9E7FF" opacity="0.3" />
              <circle cx="14" cy="14" r="10" stroke="#6C63FF" strokeWidth="1.5" />
              <path d="M14 9v10M9 14h10" stroke="#6C63FF" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span className="text-body font-semibold text-primary-main">
              Add Provider
            </span>
          </button>
        )}
      </div>

      {/* Providers List */}
      <div className="px-lg">
        <div className="flex justify-between items-center mb-lg">
          <h2 className="text-h2 font-semibold text-text-primary m-0">
            Providers
          </h2>
          <div className="px-md py-xs bg-primary-light rounded-full text-caption font-semibold text-primary-main">
            {providers.length}
          </div>
        </div>

        {providers.length === 0 ? (
          /* Empty State */
          <div className="bg-base-surface rounded-lg shadow-base p-xxxl text-center border border-base-border">
            {/* Duotone Empty Icon */}
            <div className="flex justify-center mb-lg">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                <circle cx="40" cy="28" r="12" fill="#E9E7FF" opacity="0.3" />
                <circle cx="40" cy="28" r="12" stroke="#6C63FF" strokeWidth="2" />
                <path d="M20 60v-4a16 16 0 0 1 16-16h8a16 16 0 0 1 16 16v4" fill="#E9E7FF" opacity="0.2" />
                <path d="M20 60v-4a16 16 0 0 1 16-16h8a16 16 0 0 1 16 16v4" stroke="#6C63FF" strokeWidth="2" strokeLinecap="round" />
                <circle cx="60" cy="20" r="2" fill="#6C63FF" />
                <circle cx="65" cy="28" r="1.5" fill="#E9E7FF" />
              </svg>
            </div>
            <p className="text-body text-text-secondary m-0">
              No providers yet. Add your first provider!
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-md">
            {providers.map((provider) => (
              <div
                key={provider.id}
                className="bg-base-surface rounded-lg shadow-base p-lg border border-base-border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex gap-md mb-md">
                  {/* Avatar Icon */}
                  <div className="w-14 h-14 rounded-md bg-primary-light flex items-center justify-center flex-shrink-0">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                      <circle cx="16" cy="12" r="5" fill="#E9E7FF" />
                      <circle cx="16" cy="12" r="5" stroke="#6C63FF" strokeWidth="2" />
                      <path d="M8 26v-2a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v2" fill="#E9E7FF" opacity="0.5" />
                      <path d="M8 26v-2a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v2" stroke="#6C63FF" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-h2 font-semibold text-text-primary m-0 mb-xs">
                      {provider.name}
                    </h3>

                    {/* Email */}
                    <div className="flex items-center gap-sm mb-xs">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <rect x="2" y="4" width="12" height="9" rx="1" fill="#E9E7FF" opacity="0.3" />
                        <path d="M2 5l6 4 6-4M2 5v7a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1z" stroke="#64748B" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="text-caption text-text-secondary">
                        {provider.email}
                      </span>
                    </div>

                    {/* Phone */}
                    <div className="flex items-center gap-sm">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <rect x="4" y="2" width="8" height="12" rx="1.5" fill="#E9E7FF" opacity="0.3" />
                        <rect x="4" y="2" width="8" height="12" rx="1.5" stroke="#64748B" strokeWidth="1.2" />
                        <circle cx="8" cy="12" r="0.5" fill="#64748B" />
                      </svg>
                      <span className="text-caption text-text-secondary">
                        {provider.countryCode} {provider.phone}
                      </span>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemoveProvider(provider.id)}
                    className="px-md py-sm bg-red-50 text-status-error border-none rounded-md text-caption font-semibold cursor-pointer h-fit transition-all duration-200 hover:bg-status-error hover:text-text-inverse"
                  >
                    Remove
                  </button>
                </div>

                {/* Added Date */}
                <div className="text-caption text-text-secondary flex items-center gap-xs">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <rect x="2" y="3" width="10" height="9" rx="1" stroke="#64748B" strokeWidth="1.2" fill="none" />
                    <path d="M5 2v2M9 2v2M2 6h10" stroke="#64748B" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                  Added on {provider.addedAt}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
