"use client"
import { useState, useEffect } from "react"
import { Lock, Crown, User, Mail, Calendar, DollarSign, Eye, EyeOff, Loader2 } from "lucide-react"

export default function HomePage() {
  const [auth, setAuth] = useState(false)
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [sessionToken, setSessionToken] = useState("")
  const [form, setForm] = useState({ name: "", email: "", year: "", amount: "" })
  const [isLoading, setIsLoading] = useState(false)
  const [isAuthLoading, setIsAuthLoading] = useState(false)

  const checkPass = async () => {
    setIsAuthLoading(true);

    try {
      const res = await fetch("/api/check-pass", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok && data.success && data.token) {
        setAuth(true);
        setSessionToken(data.token);
        setPassword("");
      } else {
        alert("Access Denied");
      }
    } catch (error) {
      console.error("Error verifying password:", error);
      alert("Server error. Please try again.");
    } finally {
      setIsAuthLoading(false);
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const res = await fetch("/api/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, sessionToken }),
      })
      const data = await res.json()
      if (res.ok) {
        alert("Donation submitted and email sent!")
        setForm({ name: "", email: "", year: "", amount: "" })
      } else {
        if (data.error?.includes("Invalid or expired session")) {
          alert("Session expired. Please login again.");
          setAuth(false);
          setSessionToken("");
        } else {
          alert(data.error || "Error");
        }
      }
    } catch (error) {
      alert("Network error. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // FIXED: Use useEffect instead of React.useEffect
  useEffect(() => {
    if (auth) {
      const timeout = setTimeout(() => {
        alert("Session will expire soon. Please re-authenticate.");
        setAuth(false);
        setSessionToken("");
      }, 25 * 60 * 1000); // 25 minutes

      return () => clearTimeout(timeout);
    }
  }, [auth]);

  if (!auth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-indigo-100">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full mb-4">
                <Lock className="w-8 h-8 text-indigo-600" />
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-2 text-indigo-900">Admin Access</h1>
              <p className="text-muted-foreground text-sm text-indigo-700">Enter your password to continue</p>
            </div>

            <div className="space-y-6">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Admin Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isAuthLoading}
                  className="w-full px-4 py-3 border border-indigo-200 bg-background text-foreground rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200 pr-12 placeholder:text-indigo-400 disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isAuthLoading}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-indigo-400 hover:text-indigo-600 transition-colors disabled:opacity-50"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              <button
                onClick={checkPass}
                disabled={isAuthLoading}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-indigo-400 disabled:to-purple-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl disabled:transform-none disabled:shadow-lg flex items-center justify-center gap-2"
              >
                {isAuthLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                {isAuthLoading ? "Verifying..." : "Access Dashboard"}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 p-4">
      <div className="max-w-lg mx-auto pt-8 pb-12">
        <div className="bg-white rounded-2xl shadow-xl border border-indigo-100 overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 px-6 py-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
              <Crown className="w-8 h-8 text-yellow-300" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Krishna Janmashtami Donation</h1>
            <p className="text-indigo-100 text-sm">Celebrate with devotion and generosity</p>
          </div>

          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400">
                  <User className="w-5 h-5" />
                </div>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  disabled={isLoading}
                  className="w-full pl-12 pr-4 py-3 border border-indigo-200 bg-background text-foreground rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200 placeholder:text-indigo-400 disabled:opacity-50 disabled:cursor-not-allowed"
                  required
                />
              </div>

              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  disabled={isLoading}
                  className="w-full pl-12 pr-4 py-3 border border-indigo-200 bg-background text-foreground rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200 placeholder:text-indigo-400 disabled:opacity-50 disabled:cursor-not-allowed"
                  required
                />
              </div>

              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400">
                  <Calendar className="w-5 h-5" />
                </div>
                <input
                  name="year"
                  value={form.year}
                  onChange={handleChange}
                  placeholder="Year"
                  disabled={isLoading}
                  className="w-full pl-12 pr-4 py-3 border border-indigo-200 bg-background text-foreground rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200 placeholder:text-indigo-400 disabled:opacity-50 disabled:cursor-not-allowed"
                  required
                />
              </div>

              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400">
                  <DollarSign className="w-5 h-5" />
                </div>
                <input
                  name="amount"
                  type="number"
                  value={form.amount}
                  onChange={handleChange}
                  placeholder="Amount (₹)"
                  disabled={isLoading}
                  className="w-full pl-12 pr-4 py-3 border border-indigo-200 bg-background text-foreground rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200 placeholder:text-indigo-400 disabled:opacity-50 disabled:cursor-not-allowed"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 hover:from-indigo-700 hover:via-blue-700 hover:to-purple-700 disabled:from-indigo-400 disabled:via-blue-400 disabled:to-purple-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl disabled:transform-none disabled:shadow-lg mt-6 flex items-center justify-center gap-2"
              >
                {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                {isLoading ? "Submitting..." : "Submit Donation"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
