"use client";

import { ShoppingBag, ImageIcon } from "lucide-react";
import { Product, useCartStore } from "@/store/useCartStore";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore(state => state.addItem);

  return (
    <div className="group cursor-pointer">
      <div className="relative aspect-[4/5] bg-brand-bg rounded-2xl overflow-hidden mb-4 border border-gray-100 shadow-sm">
        
        {/* Renderiza a imagem real do banco de dados */}
        {product.imageUrl ? (
          <Image 
            src={product.imageUrl} 
            alt={product.name} 
            fill 
            className="object-cover group-hover:scale-105 transition-transform duration-700" 
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            <ImageIcon className="w-10 h-10 opacity-30" />
          </div>
        )}
        
        <div className="absolute bottom-4 left-0 right-0 px-4 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <button 
            onClick={(e) => {
              e.preventDefault();
              addItem(product);
            }}
            className="w-full bg-white/90 backdrop-blur text-dark-900 font-medium py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-brand hover:text-white transition-colors shadow-elegant"
          >
            <ShoppingBag className="w-4 h-4" />
            Adicionar à Sacola
          </button>
        </div>
      </div>

      <Link href={`/produto/${product.id}`} className="block">
        <p className="text-xs font-semibold text-brand tracking-wider uppercase mb-1">
          {product.category}
        </p>
        <h3 className="font-serif text-lg text-dark-900 font-medium leading-tight mb-2 hover:text-brand transition-colors">
          {product.name}
        </h3>
        <p className="font-sans font-semibold text-dark-800">
          R$ {product.price.toFixed(2)}
        </p>
      </Link>
    </div>
  );
}