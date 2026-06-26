"use client";

import { useState, useEffect } from "react";
import { useCartStore } from "@/store/useCartStore";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle, ShieldCheck, ArrowLeft, ShoppingBag, QrCode, Copy, Check } from "lucide-react";
import { gerarPixCopiaECola } from "@/lib/pix";

export default function Checkout() {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccessId, setOrderSuccessId] = useState<string | null>(null);
  const [orderTotal, setOrderTotal] = useState(0);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", address: "", city: "", state: "", zipCode: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const subtotal = getTotalPrice();
  const shipping = subtotal > 299 ? 0 : 25.00;
  const total = subtotal + shipping;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customer: formData, items: items, total: total }),
      });
      const data = await response.json();
      if (data.success) {
        setOrderTotal(total);
        setOrderSuccessId(data.orderId);
        clearCart();
      } else {
        alert("Erro ao processar.");
      }
    } catch (error) {
      alert("Falha na ligação.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!mounted) return null;

  if (orderSuccessId) {
    const payloadPix = gerarPixCopiaECola(
      orderTotal,
      "14997561981", 
      "GABRIELA NASCIMENTO LEME",
      "BOTUCATU"
    );
    const qrCodeImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(payloadPix)}`;

    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-16 bg-gray-50">
        <div className="bg-white p-8 rounded-3xl shadow-lg text-center max-w-xl w-full border border-gray-100">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Pedido Registrado!</h1>
          <p className="text-gray-600 mb-6">Nº: <strong className="text-brand">{orderSuccessId}</strong></p>
          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 mb-8">
            <h2 className="font-bold text-gray-900 mb-4">Pague R$ {orderTotal.toFixed(2)} via Pix</h2>
            <div className="flex justify-center mb-4">
              <img src={qrCodeImageUrl} alt="QR Code Pix" className="w-40 h-40" />
            </div>
            <button onClick={() => navigator.clipboard.writeText(payloadPix)} className="w-full bg-brand text-white py-3 rounded-xl hover:bg-brand-dark transition-all">
              Copiar Código Pix
            </button>
          </div>
          <a href={`https://wa.me/5514997561981?text=Olá!%20Pedido%20${orderSuccessId}%20pago.%20Segue%20comprovante.`} className="w-full bg-[#25D366] text-white py-4 rounded-xl font-medium block">
            Enviar Comprovante no WhatsApp
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Finalizar Compra</h1>
      <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 gap-12">
        <div className="space-y-4">
          <input name="name" placeholder="Nome Completo" required onChange={handleChange} className="w-full p-3 border rounded-lg" />
          <input name="email" placeholder="E-mail" required onChange={handleChange} className="w-full p-3 border rounded-lg" />
          <input name="phone" placeholder="WhatsApp" required onChange={handleChange} className="w-full p-3 border rounded-lg" />
          <input name="address" placeholder="Endereço" required onChange={handleChange} className="w-full p-3 border rounded-lg" />
          <button type="submit" disabled={isSubmitting} className="w-full bg-black text-white py-4 rounded-lg">
            {isSubmitting ? "Processando..." : `Pagar R$ ${total.toFixed(2)}`}
          </button>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg">
          <h2 className="font-bold mb-4">Itens ({items.length})</h2>
          {items.map((item) => <div key={item.id} className="mb-2">{item.name} - R$ {item.price}</div>)}
          <div className="border-t mt-4 pt-4 font-bold">Total: R$ {total.toFixed(2)}</div>
        </div>
      </form>
    </div>
  );
}