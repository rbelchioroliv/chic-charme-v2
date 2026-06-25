"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { Lock, Mail } from "lucide-react";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = useAuthStore((state) => state.login);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulação de login: Se for admin@chic.com entra como admin, senão como cliente.
    const role = email === "admin@chic.com" ? "admin" : "customer";
    
    login({
      id: "1",
      name: "Usuário Teste",
      email,
      role,
    });

    if (role === "admin") {
      router.push("/admin");
    } else {
      router.push("/");
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-brand-bg px-4 py-12">
      <div className="max-w-md w-full bg-white p-8 md:p-10 rounded-3xl shadow-elegant border border-gray-100">
        <div className="text-center mb-10">
          <h1 className="font-serif text-3xl font-bold text-dark-900 mb-2">Bem-vinda de volta</h1>
          <p className="text-dark-700">Acesse sua conta para ver seus pedidos de semijoias.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-dark-800 mb-2">E-mail</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand focus:border-transparent transition-all outline-none text-dark-900"
                placeholder="seu@email.com"
                required
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-dark-800">Senha</label>
              <Link href="#" className="text-sm font-medium text-brand hover:text-brand-dark">
                Esqueceu a senha?
              </Link>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand focus:border-transparent transition-all outline-none text-dark-900"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-dark-900 text-white py-4 rounded-xl font-medium hover:bg-brand transition-colors duration-300 shadow-elegant"
          >
            Entrar
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-dark-700">
          Ainda não tem conta?{' '}
          <Link href="#" className="font-medium text-brand hover:text-brand-dark">
            Criar conta
          </Link>
        </p>
      </div>
    </div>
  );
}