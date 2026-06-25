"use client";

import { use } from "react";
import { useCartStore } from "@/store/useCartStore";
import { ShoppingBag, ShieldCheck, Gem, Sparkles } from "lucide-react";

// Simulando o banco de dados temporariamente
const getProduct = (id: string) => ({
  id,
  name: "Colar Banhado a Ouro 18k com Pingente",
  price: 189.90,
  category: "Colares",
  image: "✨",
  description: "Colar delicado banhado a ouro 18k, verniz antialérgico e camada de proteção dupla. Perfeito para compor mix de colares ou uso solo trazendo uma sofisticação discreta ao seu dia a dia.",
});

export default function ProductDetails({ params }: { params: Promise<{ id: string }> }) {
  // No Next 15, params é uma Promise
  const resolvedParams = use(params);
  const product = getProduct(resolvedParams.id);
  const addItem = useCartStore((state) => state.addItem);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Área de Imagens */}
        <div className="relative aspect-square bg-brand-bg rounded-3xl flex items-center justify-center text-6xl">
           {/* Aqui no futuro entrará a foto em alta resolução da joia */}
          {product.image}
        </div>

        {/* Informações da Joia */}
        <div className="flex flex-col justify-center">
          <p className="text-sm font-bold text-brand tracking-widest uppercase mb-3">
            {product.category}
          </p>
          <h1 className="font-serif text-4xl lg:text-5xl text-dark-900 font-bold mb-6">
            {product.name}
          </h1>
          <p className="font-sans text-3xl text-dark-800 font-medium mb-8">
            R$ {product.price.toFixed(2)}
          </p>

          <p className="text-dark-700 leading-relaxed mb-10">
            {product.description}
          </p>

          {/* Features da Semijoia */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 border-y border-gray-200 py-6">
            <div className="flex flex-col items-center text-center gap-2">
              <ShieldCheck className="w-6 h-6 text-brand" />
              <span className="text-xs font-medium text-dark-700">1 Ano de Garantia</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <Sparkles className="w-6 h-6 text-brand" />
              <span className="text-xs font-medium text-dark-700">Banho Premium</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <Gem className="w-6 h-6 text-brand" />
              <span className="text-xs font-medium text-dark-700">Hipoalergênico</span>
            </div>
          </div>

          <button 
            onClick={() => addItem(product)}
            className="w-full bg-dark-900 text-white py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-brand transition-colors duration-300 font-medium text-lg shadow-elegant"
          >
            <ShoppingBag className="w-5 h-5" />
            Adicionar à Sacola
          </button>
        </div>
      </div>
    </div>
  );
}