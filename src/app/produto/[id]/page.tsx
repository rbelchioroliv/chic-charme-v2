import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import { ShieldCheck, Gem, Sparkles, ImageIcon } from "lucide-react";
import AddToCartButton from "@/components/ui/AddToCartButton";

// A página agora é Server Component para ir buscar dados ao Prisma
export default async function ProductDetails({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  // Procura o produto na base de dados através do ID
  const product = await prisma.product.findUnique({
    where: { id: resolvedParams.id }
  });

  // Se o produto não existir (ID inválido), mostra a página 404 nativa do Next.js
  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Área de Imagens (Agora com a foto real) */}
        <div className="relative aspect-square bg-brand-bg rounded-3xl flex items-center justify-center overflow-hidden border border-gray-100 shadow-sm">
          {product.imageUrl ? (
            <Image 
              src={product.imageUrl} 
              alt={product.name} 
              fill 
              className="object-cover"
              priority // Carrega a imagem principal mais rápido
            />
          ) : (
            <ImageIcon className="w-24 h-24 text-gray-300 opacity-50" />
          )}
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
            Semijoia exclusiva da coleção Chic & Charm. Banhada com materiais de altíssima qualidade, 
            desenvolvida para garantir um brilho duradouro e realçar a sua elegância em qualquer ocasião.
          </p>

          {/* Features da Semijoia */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 border-y border-gray-100 py-6">
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
              <span className="text-xs font-medium text-dark-700">Hipoalergénico</span>
            </div>
          </div>

          {/* O nosso novo Client Component trata de adicionar ao carrinho */}
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}