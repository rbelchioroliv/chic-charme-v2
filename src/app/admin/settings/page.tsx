"use client";

import { useState } from "react";
import { Store, Bell, Truck, Save, Shield } from "lucide-react";

export default function AdminSettings() {
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaved(false);
    
    // Simula uma chamada à API para guardar as configurações
    setTimeout(() => {
      setIsSaving(false);
      setSaved(true);
      
      // Remove a mensagem de sucesso após 3 segundos
      setTimeout(() => setSaved(false), 3000);
    }, 1500);
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-dark-900 mb-2">Configurações</h1>
        <p className="text-dark-700">Gira as informações globais da sua loja de semijoias.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Secção: Informações Gerais */}
        <section className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          <h2 className="text-xl font-bold text-dark-900 flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
            <Store className="w-5 h-5 text-brand" /> 
            Informações da Loja
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-dark-800 mb-2">Nome da Loja</label>
              <input 
                type="text" 
                defaultValue="Chic & Charm Semijoias"
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand outline-none" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-800 mb-2">E-mail de Suporte</label>
              <input 
                type="email" 
                defaultValue="contato@chiccharm.com"
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand outline-none" 
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-dark-800 mb-2">Descrição SEO (Para o Google)</label>
              <textarea 
                rows={3}
                defaultValue="Semijoias exclusivas com banho de alta qualidade e garantia. Feitas para destacar a sua luz própria."
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand outline-none resize-none" 
              />
            </div>
          </div>
        </section>

        {/* Secção: Configurações de Envio */}
        <section className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          <h2 className="text-xl font-bold text-dark-900 flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
            <Truck className="w-5 h-5 text-brand" /> 
            Regras de Envio
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-dark-800 mb-2">Valor Base do Frete (R$)</label>
              <input 
                type="number" 
                step="0.01"
                defaultValue="25.00"
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand outline-none" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-800 mb-2">Frete Grátis a partir de (R$)</label>
              <input 
                type="number" 
                step="0.01"
                defaultValue="299.90"
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand outline-none" 
              />
            </div>
          </div>
        </section>

        {/* Secção: Notificações e Segurança */}
        <section className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-bold text-dark-900 flex items-center gap-2 mb-6">
                <Bell className="w-5 h-5 text-brand" /> Notificações
              </h2>
              <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-5 h-5 rounded text-brand focus:ring-brand border-gray-300" />
                  <span className="text-dark-800">Alertas de novas vendas por e-mail</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-5 h-5 rounded text-brand focus:ring-brand border-gray-300" />
                  <span className="text-dark-800">Aviso de stock baixo</span>
                </label>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-dark-900 flex items-center gap-2 mb-6">
                <Shield className="w-5 h-5 text-brand" /> Segurança
              </h2>
              <div className="space-y-4">
                <button type="button" className="text-brand font-medium hover:text-brand-dark transition-colors">
                  Alterar palavra-passe de Administrador
                </button>
                <br />
                <button type="button" className="text-brand font-medium hover:text-brand-dark transition-colors">
                  Configurar Autenticação de 2 Fatores
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Rodapé do Formulário / Botão de Guardar */}
        <div className="flex items-center justify-end gap-4 pt-4">
          {saved && (
            <span className="text-brand font-medium animate-pulse">
              Configurações guardadas com sucesso!
            </span>
          )}
          <button 
            type="submit" 
            disabled={isSaving}
            className="bg-dark-900 text-white px-8 py-4 rounded-xl font-medium hover:bg-brand transition-colors duration-300 flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSaving ? (
              <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></span>
            ) : (
              <Save className="w-5 h-5" />
            )}
            {isSaving ? "A guardar..." : "Guardar Alterações"}
          </button>
        </div>
      </form>
    </div>
  );
}