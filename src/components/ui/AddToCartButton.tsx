"use client";

import { ShoppingBag } from "lucide-react";
import { useCartStore, Product } from "@/store/useCartStore";

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <button 
      onClick={() => addItem(product)}
      className="w-full bg-dark-900 text-white py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-brand transition-colors duration-300 font-medium text-lg shadow-elegant"
    >
      <ShoppingBag className="w-5 h-5" />
      Adicionar à Sacola
    </button>
  );
}