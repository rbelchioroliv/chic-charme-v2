"use client";

import { useState } from "react";
import { Store, Truck, Lock } from "lucide-react";

export default function AdminSettings() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simula o tempo de salvamento
    setTimeout(() => {
      alert("Configurações atualizadas com sucesso!");
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <div className="max-w-4xl mx-auto py-10">
      <div className="mb-10">
        <h1 className="font-serif text-3xl font-bold text-dark-900">Configurações da Loja</h1>
        <p className="text-dark-700 mt-1">Ajuste os detalhes e regras do seu negócio.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        
        {/* Informações da Loja */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-dark-900 mb-6 flex items-center gap-2">
            <Store className="w-5 h-5 text-brand" /> Informações Gerais
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-dark-800 mb-2">Nome da Butique</label>
              <input type="text" defaultValue="Chic & Charm" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-800 mb-2">E-mail de Contacto</label>
              <input type="email" defaultValue="contato@chiccharm.com" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand outline-none" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-dark-800 mb-2">WhatsApp de Atendimento</label>
              <input type="tel" defaultValue="(11) 99999-9999" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand outline-none" />
            </div>
          </div>
        </div>

        {/* Regras de Frete */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-dark-900 mb-6 flex items-center gap-2">
            <Truck className="w-5 h-5 text-brand" /> Regras de Envio
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-dark-800 mb-2">Custo Fixo de Frete (R$)</label>
              <input type="number" defaultValue="25.00" step="0.01" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-800 mb-2">Frete Grátis Acima de (R$)</label>
              <input type="number" defaultValue="299.00" step="0.01" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand outline-none" />
            </div>
          </div>
        </div>

        {/* Segurança */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-dark-900 mb-6 flex items-center gap-2">
            <Lock className="w-5 h-5 text-brand" /> Segurança de Acesso
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-dark-800 mb-2">Nova Senha do Admin</label>
              <input type="password" placeholder="Deixe em branco para não alterar" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand outline-none" />
            </div>
          </div>
        </div>

        {/* Botão Salvar */}
        <div className="flex justify-end pb-12">
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="bg-brand text-white px-8 py-4 rounded-xl font-medium hover:bg-brand-dark transition-colors disabled:opacity-70 shadow-elegant"
          >
            {isSubmitting ? "A Guardar..." : "Guardar Configurações"}
          </button>
        </div>
      </form>
    </div>
  );
}