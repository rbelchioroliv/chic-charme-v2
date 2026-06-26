"use client";

import { useState, useEffect } from "react";
import ProductCard from "@/components/ui/ProductCard";
import { Sparkles, Diamond, Loader2 } from "lucide-react";

export default function Collection() {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("Todas");

  // As categorias exatas que temos no nosso banco de dados
  const categories = ["Todas", "Colares", "Anéis", "Brincos", "Pulseiras"];

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = await fetch('/api/produtos');
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Erro ao carregar coleção", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllProducts();
  }, []);

  // Lógica para filtrar as joias com base na categoria clicada
  const filteredProducts = activeCategory === "Todas" 
    ? products 
    : products.filter(product => product.category === activeCategory);

  return (
    <div className="bg-white min-h-screen pb-24">
      
      {/* Cabeçalho da Coleção */}
      <div className="bg-brand-bg py-16 md:py-24 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="flex items-center justify-center gap-2 text-brand font-bold tracking-widest uppercase text-sm mb-4">
            <Sparkles className="w-4 h-4" />
            Catálogo Exclusivo
          </span>
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-dark-900 mb-6">
            Coleção Chic & Charm
          </h1>
          <p className="text-dark-700 max-w-2xl mx-auto text-lg">
            Explore a nossa curadoria completa de semijoias. Peças selecionadas a dedo para refletir a sua elegância em todos os momentos.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Filtros de Categoria */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-dark-900 text-white shadow-md"
                  : "bg-gray-50 text-dark-700 hover:bg-gray-100 hover:text-dark-900 border border-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Área de Produtos */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-brand">
            <Loader2 className="w-10 h-10 animate-spin mb-4" />
            <p className="font-medium text-dark-700">A preparar a vitrine...</p>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-gray-50 rounded-3xl border border-gray-100">
            <Diamond className="w-12 h-12 text-gray-300 mb-4" />
            <h3 className="font-serif text-2xl font-bold text-dark-900 mb-2">Nenhuma peça encontrada</h3>
            <p className="text-dark-700">Ainda não temos peças nesta categoria. A nossa curadoria está a trabalhar em novidades!</p>
            <button 
              onClick={() => setActiveCategory("Todas")}
              className="mt-6 text-brand font-medium hover:text-brand-dark underline underline-offset-4"
            >
              Ver todas as joias
            </button>
          </div>
        )}

      </div>
    </div>
  );
}