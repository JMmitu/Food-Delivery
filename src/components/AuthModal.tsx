import { useState } from "react";
import { X, Eye, EyeOff, Mail, Lock, User, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "./AuthContext";

export function AuthModal() {
  const { isModalOpen, closeModal, login, register, defaultTab } = useAuth();
  const [tab, setTab] = useState<"login" | "register">(defaultTab);
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Login form
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPw, setLoginPw] = useState("");

  // Register form
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPw, setRegPw] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPw) { setError("Please fill in all fields."); return; }
    setError(""); setLoading(true);
    await login(loginEmail, loginPw);
    setLoading(false);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName || !regEmail || !regPw) { setError("Please fill in all fields."); return; }
    if (regPw.length < 6) { setError("Password must be at least 6 characters."); return; }
    setError(""); setLoading(true);
    await register(regName, regEmail, regPw);
    setLoading(false);
  };

  return (
    <AnimatePresence>
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
          >
            {/* Top accent bar */}
            <div className="h-1.5 bg-gradient-to-r from-[#FF6B35] via-[#ff8c5a] to-[#2F4858]" />

            <div className="p-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-[#FF6B35] font-black text-xl">Food</span>
                    <span className="text-gray-900 font-black text-xl">Express</span>
                  </div>
                  <p className="text-gray-500 text-sm">
                    {tab === "login" ? "Welcome back! Sign in to continue." : "Create your free account."}
                  </p>
                </div>
                <button onClick={closeModal} className="w-9 h-9 bg-gray-100 hover:bg-gray-200 transition rounded-full flex items-center justify-center text-gray-500">
                  <X size={18} />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex bg-gray-100 rounded-2xl p-1 mb-6">
                {(["login", "register"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => { setTab(t); setError(""); }}
                    className={`flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all ${
                      tab === t ? "bg-white shadow text-gray-900" : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {t === "login" ? "Sign In" : "Register"}
                  </button>
                ))}
              </div>

              {/* Error */}
              {error && (
                <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl px-4 py-2.5 mb-4">
                  {error}
                </div>
              )}

              {/* Login form */}
              {tab === "login" && (
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="relative">
                    <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      placeholder="Email address"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 outline-none focus:border-[#FF6B35] focus:ring-2 focus:ring-[#FF6B35]/20 transition"
                    />
                  </div>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type={showPw ? "text" : "password"}
                      placeholder="Password"
                      value={loginPw}
                      onChange={(e) => setLoginPw(e.target.value)}
                      className="w-full pl-10 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 outline-none focus:border-[#FF6B35] focus:ring-2 focus:ring-[#FF6B35]/20 transition"
                    />
                    <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  <div className="flex justify-end">
                    <button type="button" className="text-[#FF6B35] text-xs font-semibold hover:underline">Forgot password?</button>
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#FF6B35] hover:bg-[#e85a24] disabled:opacity-60 transition text-white font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-[#FF6B35]/25"
                  >
                    {loading ? <Loader2 size={18} className="animate-spin" /> : null}
                    {loading ? "Signing in..." : "Sign In"}
                  </button>
                  <p className="text-center text-sm text-gray-500">
                    Don't have an account?{" "}
                    <button type="button" onClick={() => setTab("register")} className="text-[#FF6B35] font-semibold hover:underline">
                      Register
                    </button>
                  </p>
                </form>
              )}

              {/* Register form */}
              {tab === "register" && (
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="relative">
                    <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Full name"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 outline-none focus:border-[#FF6B35] focus:ring-2 focus:ring-[#FF6B35]/20 transition"
                    />
                  </div>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      placeholder="Email address"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 outline-none focus:border-[#FF6B35] focus:ring-2 focus:ring-[#FF6B35]/20 transition"
                    />
                  </div>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type={showPw ? "text" : "password"}
                      placeholder="Password (min 6 chars)"
                      value={regPw}
                      onChange={(e) => setRegPw(e.target.value)}
                      className="w-full pl-10 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 outline-none focus:border-[#FF6B35] focus:ring-2 focus:ring-[#FF6B35]/20 transition"
                    />
                    <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#FF6B35] hover:bg-[#e85a24] disabled:opacity-60 transition text-white font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-[#FF6B35]/25"
                  >
                    {loading ? <Loader2 size={18} className="animate-spin" /> : null}
                    {loading ? "Creating account..." : "Create Account"}
                  </button>
                  <p className="text-center text-sm text-gray-500">
                    Already have an account?{" "}
                    <button type="button" onClick={() => setTab("login")} className="text-[#FF6B35] font-semibold hover:underline">
                      Sign In
                    </button>
                  </p>
                </form>
              )}

              {/* Social divider */}
              <div className="flex items-center gap-3 my-5">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-gray-400 text-xs">or continue with</span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition">
                  <span className="text-lg">🌐</span> Google
                </button>
                <button className="flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition">
                  <span className="text-lg">📘</span> Facebook
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
