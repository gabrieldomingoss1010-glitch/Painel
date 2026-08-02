"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Sparkles, Lock, Mail, ArrowRight, Shield } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    await new Promise((r) => setTimeout(r, 1200));

    if (email === "teste@gmail.com" && password === "123456") {
      router.push("/dashboard");
    } else {
      setError("E-mail ou senha incorretos.");
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center relative overflow-hidden"
      style={{ background: "#07070b" }}
    >
      {/* Animated background blobs */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full opacity-20 animate-pulse-slow"
        style={{
          background: "radial-gradient(circle, #543c3c 0%, transparent 70%)",
          top: "-20%",
          left: "-15%",
        }}
      />
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-15 animate-pulse-slow"
        style={{
          background: "radial-gradient(circle, #cab2a1 0%, transparent 70%)",
          bottom: "-15%",
          right: "-10%",
          animationDelay: "1.5s",
        }}
      />
      <div
        className="absolute w-[300px] h-[300px] rounded-full opacity-10"
        style={{
          background: "radial-gradient(circle, #8b6b5a 0%, transparent 70%)",
          top: "40%",
          right: "20%",
        }}
      />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(202,178,161,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(202,178,161,1) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Login Card */}
      <div
        className="relative z-10 w-full max-w-md mx-4"
        style={{
          background: "rgba(14,14,20,0.85)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(202,178,161,0.12)",
          borderRadius: "1.75rem",
          boxShadow: "0 25px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(202,178,161,0.05)",
        }}
      >
        {/* Top accent */}
        <div
          className="h-1 w-full rounded-t-[1.75rem]"
          style={{ background: "linear-gradient(90deg, #543c3c, #cab2a1, #543c3c)" }}
        />

        <div className="p-8">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
              style={{
                background: "linear-gradient(135deg, #cab2a1 0%, #543c3c 100%)",
                boxShadow: "0 8px 32px rgba(84,60,60,0.5)",
              }}
            >
              <Sparkles size={28} className="text-white" />
            </div>
            <h1
              className="text-2xl font-bold font-display"
              style={{ color: "#f0ece8" }}
            >
              Palomares Beauty
            </h1>
            <p className="text-sm text-gray-500 mt-1">Plataforma de Gestão Clínica</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wider">
                E-mail
              </label>
              <div className="relative">
                <Mail
                  size={15}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500"
                />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@palomares.com"
                  className="input-brand w-full pl-10 pr-4 py-3 text-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wider">
                Senha
              </label>
              <div className="relative">
                <Lock
                  size={15}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500"
                />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-brand w-full pl-10 pr-12 py-3 text-sm"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {error && (
              <div
                className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm"
                style={{ background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.2)", color: "#f87171" }}
              >
                <Shield size={14} />
                {error}
              </div>
            )}

            <div
              className="px-4 py-3 rounded-xl text-xs"
              style={{ background: "rgba(202,178,161,0.06)", border: "1px solid rgba(202,178,161,0.1)", color: "#cab2a1" }}
            >
              <strong>Demo:</strong> admin@palomares.com / admin123
            </div>

            <button
              id="login-btn"
              type="submit"
              disabled={loading}
              className="btn-brand w-full py-3.5 text-sm flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Entrando...
                </>
              ) : (
                <>
                  Entrar na Plataforma
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 pt-6 border-t text-center" style={{ borderColor: "rgba(202,178,161,0.08)" }}>
            <p className="text-xs text-gray-600">
              © 2025 Palomares Beauty · Todos os direitos reservados
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
