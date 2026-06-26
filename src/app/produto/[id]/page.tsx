import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import { ShieldCheck, Gem, Sparkles, ImageIcon, Info } from "lucide-react";
import AddToCartButton from "@/components/ui/AddToCartButton";

export default async function ProductDetails({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  const product = await prisma.product.findUnique({
    where: { id: resolvedParams.id }
  });

  if (!product) notFound();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        <div className="relative aspect-square bg-brand-bg rounded-3xl flex items-center justify-center overflow-hidden border border-gray-100 shadow-sm">
          {/* Etiqueta na foto principal também */}
          {product.promotionalPrice && (
            <div className="absolute top-6 left-6 z-20 bg-brand text-white text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest shadow-md">
              Oferta Especial
            </div>
          )}

          {product.imageUrl ? (
            <Image 
              src={product.imageUrl} 
              alt={product.name} 
              fill 
              className="object-cover"
              priority 
            />
          ) : (
            <ImageIcon className="w-24 h-24 text-gray-300 opacity-50" />
          )}
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-sm font-bold text-brand tracking-widest uppercase mb-3">
            {product.category}
          </p>
          <h1 className="font-serif text-4xl lg:text-5xl text-dark-900 font-bold mb-6">
            {product.name}
          </h1>
          
          {/* Lógica de Preço Grande */}
          {product.promotionalPrice ? (
            <div className="flex items-end gap-4 mb-8">
              <span className="font-sans text-4xl text-brand font-bold">
                R$ {product.promotionalPrice.toFixed(2)}
              </span>
              <span className="font-sans text-2xl text-gray-400 line-through pb-1">
                R$ {product.price.toFixed(2)}
              </span>
            </div>
          ) : (
            <p className="font-sans text-3xl text-dark-800 font-medium mb-8">
              R$ {product.price.toFixed(2)}
            </p>
          )}

          <p className="text-dark-700 leading-relaxed mb-10">
            {product.description || "Semijoia com curadoria exclusiva Chic & Charm. Selecionada a dedo e banhada com materiais de altíssima qualidade para garantir o seu brilho em qualquer ocasião."}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10 border-y border-gray-100 py-6">
            <div className="flex flex-col items-center text-center gap-2">
              <ShieldCheck className="w-6 h-6 text-brand" />
              <span className="text-xs font-medium text-dark-700">{product.warranty || "Sem Garantia"}</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <Sparkles className="w-6 h-6 text-brand" />
              <span className="text-xs font-medium text-dark-700">{product.plating || "Acabamento Premium"}</span>
            </div>
            {product.isHypoallergenic && (
              <div className="flex flex-col items-center text-center gap-2">
                <Gem className="w-6 h-6 text-brand" />
                <span className="text-xs font-medium text-dark-700">Hipoalergênico</span>
              </div>
            )}
            <div className="flex flex-col items-center text-center gap-2">
              <Info className="w-6 h-6 text-brand" />
              <span className="text-xs font-medium text-dark-700">{product.material || "Liga Metálica"}</span>
            </div>
          </div>

          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}