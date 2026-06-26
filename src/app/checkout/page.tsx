"use client";

import { useState, useEffect } from "react";
import { useCartStore } from "@/store/useCartStore";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle, MapPin, ShieldCheck, ArrowLeft, ShoppingBag } from "lucide-react";

export default function Checkout() {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccessId, setOrderSuccessId] = useState<string | null>(null);

  // Evitar erros de hidratação do Zustand no Next.js
  useEffect(() => {
    setMounted(true);
  }, []);

  // Estado do formulário
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", address: "", city: "", state: "", zipCode: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Cálculos
  const subtotal = getTotalPrice();
  const shipping = subtotal > 299 ? 0 : 25.00; // Frete grátis acima de 299
  const total = subtotal + shipping;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: formData,
          items: items,
          total: total
        }),
      });

      const data = await response.json();

      if (data.success) {
        clearCart(); // Limpa o carrinho
        setOrderSuccessId(data.orderId); // Mostra o ecrã de sucesso
      } else {
        alert("Ocorreu um erro ao processar a encomenda. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro no checkout:", error);
      alert("Falha na ligação. Verifique a sua internet e tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!mounted) return null;

  // ECRÃ DE SUCESSO (Mostrado após a compra)
  if (orderSuccessId) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-24 bg-gray-50/50">
        <div className="bg-white p-10 rounded-3xl shadow-elegant text-center max-w-lg w-full border border-gray-100">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10" />
          </div>
          <h1 className="font-serif text-4xl font-bold text-dark-900 mb-4">Pedido Confirmado!</h1>
          <p className="text-dark-700 mb-2">A sua encomenda foi recebida com sucesso e já está a ser processada com muito carinho.</p>
          <p className="text-sm font-medium text-gray-500 mb-8 bg-gray-50 py-3 rounded-xl border border-gray-100">
            Nº do Pedido: <span className="text-brand font-bold">{orderSuccessId}</span>
          </p>
          <Link href="/" className="inline-block w-full bg-dark-900 text-white font-medium py-4 rounded-xl hover:bg-brand transition-colors">
            Voltar à Loja
          </Link>
        </div>
      </div>
    );
  }

  // ECRÃ DE CARRINHO VAZIO
  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <ShoppingBag className="w-20 h-20 text-gray-200 mb-6" />
        <h2 className="font-serif text-3xl font-bold text-dark-900 mb-4">Sua sacola está vazia</h2>
        <p className="text-dark-700 mb-8">Volte à nossa vitrine e escolha as suas peças favoritas.</p>
        <Link href="/" className="bg-brand text-white px-8 py-4 rounded-xl font-medium hover:bg-brand-dark transition-colors">
          Explorar Coleção
        </Link>
      </div>
    );
  }

  // ECRÃ DE CHECKOUT NORMAL
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
      <Link href="/" className="inline-flex items-center gap-2 text-dark-700 hover:text-brand font-medium mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Continuar a comprar
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        {/* LADO ESQUERDO: Formulário */}
        <div className="lg:col-span-7">
          <div className="mb-10">
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-dark-900 mb-2">Finalizar Compra</h1>
            <p className="text-dark-700">Preencha os dados abaixo para receber a sua joia em casa.</p>
          </div>

          <form id="checkout-form" onSubmit={handleSubmit} className="space-y-10">
            {/* Secção Contacto */}
            <section>
              <h2 className="text-xl font-bold text-dark-900 flex items-center gap-2 mb-6 pb-2 border-b border-gray-100">
                <span className="w-6 h-6 rounded-full bg-brand text-white flex items-center justify-center text-xs font-bold">1</span>
                Dados de Contacto
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-dark-800 mb-1">Nome Completo</label>
                  <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full p-3.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-800 mb-1">E-mail</label>
                  <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full p-3.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-800 mb-1">Telemóvel (WhatsApp)</label>
                  <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} className="w-full p-3.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand outline-none" />
                </div>
              </div>
            </section>

            {/* Secção Entrega */}
            <section>
              <h2 className="text-xl font-bold text-dark-900 flex items-center gap-2 mb-6 pb-2 border-b border-gray-100">
                <span className="w-6 h-6 rounded-full bg-brand text-white flex items-center justify-center text-xs font-bold">2</span>
                Endereço de Entrega
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-dark-800 mb-1">Morada / Rua, Número, Complemento</label>
                  <input type="text" name="address" required value={formData.address} onChange={handleChange} className="w-full p-3.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-800 mb-1">Código Postal (CEP)</label>
                  <input type="text" name="zipCode" required value={formData.zipCode} onChange={handleChange} className="w-full p-3.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-800 mb-1">Cidade</label>
                  <input type="text" name="city" required value={formData.city} onChange={handleChange} className="w-full p-3.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand outline-none" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-dark-800 mb-1">Estado / Distrito</label>
                  <input type="text" name="state" required value={formData.state} onChange={handleChange} className="w-full p-3.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand outline-none" />
                </div>
              </div>
            </section>
          </form>
        </div>

        {/* LADO DIREITO: Resumo da Encomenda */}
        <div className="lg:col-span-5">
          <div className="bg-gray-50 rounded-3xl p-6 md:p-8 border border-gray-100 sticky top-24">
            <h3 className="font-serif text-2xl font-bold text-dark-900 mb-6 border-b border-gray-200 pb-4">Resumo do Pedido</h3>
            
            <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2">
              {items.map((item) => {
                const currentPrice = item.promotionalPrice || item.price;
                return (
                  <div key={item.id} className="flex gap-4 bg-white p-3 rounded-xl shadow-sm border border-gray-50">
                    <div className="relative w-16 h-16 bg-brand-bg rounded-lg overflow-hidden flex-shrink-0">
                      {item.imageUrl ? (
                        <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100">
                          <ShoppingBag className="w-5 h-5 text-gray-300" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-dark-900 line-clamp-1">{item.name}</h4>
                      <p className="text-xs text-dark-700 mt-1">Qtd: {item.quantity}</p>
                      <p className="text-sm font-bold text-brand mt-1">R$ {(currentPrice * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="space-y-3 pt-6 border-t border-gray-200">
              <div className="flex justify-between text-dark-700">
                <span>Subtotal</span>
                <span>R$ {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-dark-700">
                <span>Frete (Envio)</span>
                {shipping === 0 ? (
                  <span className="text-green-600 font-medium">Grátis</span>
                ) : (
                  <span>R$ {shipping.toFixed(2)}</span>
                )}
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-gray-200 mt-4">
                <span className="font-bold text-dark-900 text-lg">Total Final</span>
                <span className="font-serif text-3xl font-bold text-brand">R$ {total.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <button 
                type="submit" 
                form="checkout-form"
                disabled={isSubmitting}
                className="w-full bg-dark-900 text-white font-medium py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-brand transition-colors disabled:opacity-70 shadow-elegant"
              >
                {isSubmitting ? "A processar..." : "Finalizar Compra Segura"}
              </button>

              <div className="flex items-center justify-center gap-2 text-xs text-gray-500 font-medium mt-4">
                <ShieldCheck className="w-4 h-4 text-green-500" />
                Ambiente 100% Seguro e Criptografado
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}