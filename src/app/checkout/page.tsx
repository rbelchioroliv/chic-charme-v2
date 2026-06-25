"use client";

import { useCartStore } from "@/store/useCartStore";
import { CreditCard, Truck, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Checkout() {
  const { items, getTotalPrice } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="font-serif text-3xl font-bold text-dark-900 mb-4">Sua sacola está vazia</h2>
        <p className="text-dark-700 mb-8">Volte para a loja e escolha suas semijoias favoritas.</p>
        <Link href="/" className="bg-brand text-white px-8 py-3 rounded-full font-medium hover:bg-brand-dark transition-colors">
          Continuar Comprando
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-serif text-3xl font-bold text-dark-900 mb-10">Finalizar Compra</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Formulário de Entrega e Pagamento */}
        <div className="lg:col-span-7 space-y-8">
          <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-dark-900 flex items-center gap-2 mb-6">
              <Truck className="w-5 h-5 text-brand" /> Dados de Entrega
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="CEP" className="col-span-1 w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand outline-none" />
              <input type="text" placeholder="Rua / Avenida" className="md:col-span-2 w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand outline-none" />
              <input type="text" placeholder="Número" className="col-span-1 w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand outline-none" />
              <input type="text" placeholder="Complemento" className="col-span-1 w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand outline-none" />
            </div>
          </section>

          <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-dark-900 flex items-center gap-2 mb-6">
              <CreditCard className="w-5 h-5 text-brand" /> Pagamento
            </h2>
            <div className="space-y-4">
              <input type="text" placeholder="Número do Cartão" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand outline-none" />
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Validade (MM/AA)" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand outline-none" />
                <input type="text" placeholder="CVC" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand outline-none" />
              </div>
            </div>
          </section>
        </div>

        {/* Resumo do Pedido */}
        <div className="lg:col-span-5">
          <div className="bg-dark-900 text-white p-8 rounded-3xl sticky top-24">
            <h2 className="font-serif text-2xl font-bold mb-6">Resumo do Pedido</h2>
            
            <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center text-sm border-b border-dark-800 pb-4">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 bg-dark-800 rounded flex items-center justify-center text-xs">
                      {item.quantity}x
                    </span>
                    <span className="text-gray-300 truncate max-w-[150px]">{item.name}</span>
                  </div>
                  <span className="font-medium">R$ {(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-dark-800 pt-6 space-y-3 mb-8 text-sm">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal</span>
                <span>R$ {getTotalPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Frete Seguro</span>
                <span className="text-brand-light">Grátis</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-white pt-2 border-t border-dark-800 mt-2">
                <span>Total</span>
                <span className="text-brand-light">R$ {getTotalPrice().toFixed(2)}</span>
              </div>
            </div>

            <button className="w-full bg-brand hover:bg-brand-light text-white py-4 rounded-xl font-bold text-lg transition-colors flex items-center justify-center gap-2">
              <ShieldCheck className="w-5 h-5" />
              Finalizar Pagamento Seguro
            </button>
            <p className="text-center text-xs text-gray-500 mt-4 flex items-center justify-center gap-1">
              Ambiente 100% seguro e criptografado.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}