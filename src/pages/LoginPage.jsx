import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setIsLoggingIn(true);

    // Simulate a tiny delay for a better UX
    setTimeout(() => {
      const success = login(email, password);
      if (success) {
        navigate("/");
      } else {
        setError("Invalid credentials. Please use the details below.");
      }
      setIsLoggingIn(false);
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-slate-200">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#0B1B36]">ShopDesk</h2>
          <p className="text-slate-500 text-sm mt-2">
            Sign in to manage your inventory
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-200 font-medium text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@shop.com"
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B1B36] transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B1B36] transition-all"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoggingIn}
            className="w-full mt-2 bg-[#0B1B36] text-white py-2.5 rounded-lg hover:bg-[#1A365D] transition-colors font-semibold shadow-sm disabled:opacity-70 flex justify-center items-center"
          >
            {isLoggingIn ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Signing in...
              </span>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
          <p className="text-sm text-slate-500 font-medium mb-1">
            Demo Credentials
          </p>
          <p className="text-xs text-slate-400">
            Email:{" "}
            <span className="font-mono text-slate-600">admin@shop.com</span>
          </p>
          <p className="text-xs text-slate-400">
            Password: <span className="font-mono text-slate-600">admin123</span>
          </p>
        </div>
      </div>
    </div>
  );
}
