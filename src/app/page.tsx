import ProductCard from "@/components/ui/ProductCard";
import prisma from "@/lib/prisma";

export default async function Home() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
    take: 8
  });

  return (
    <div className="pb-24">
      <section className="relative bg-dark-900 px-4 py-20 lg:py-32 overflow-hidden mb-20 text-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="z-10">
            <span className="inline-block py-1 px-3 rounded-full border border-brand/50 text-brand-light text-xs font-semibold tracking-widest uppercase mb-6">
              Curadoria Exclusiva
            </span>
            <h1 className="font-serif text-5xl lg:text-7xl font-bold leading-tight mb-6">
              Elegância em <br /> <span className="text-brand-light">cada detalhe.</span>
            </h1>
            <p className="text-lg text-gray-400 mb-10 max-w-md leading-relaxed font-light">
              Descubra semijoias de luxo com banho de alta qualidade e garantia. Selecionadas a dedo para destacar a sua luz própria.
            </p>
            <button className="bg-brand text-white px-8 py-4 rounded-full font-medium hover:bg-brand-light transition-colors duration-300">
              Ver Coleção Completa
            </button>
          </div>
          <div className="relative h-[400px] lg:h-[600px] bg-dark-800 rounded-[40px] rotate-3 overflow-hidden border border-dark-700">
            <div className="absolute inset-0 flex items-center justify-center text-brand-light font-serif text-2xl rotate-[-3deg]">
              [Foto de Modelo com Joias]
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-dark-900 mb-2">
              Lançamentos
            </h2>
            <p className="text-dark-700">As peças mais desejadas do nosso garimpo.</p>
          </div>
          <button className="hidden md:block text-brand-dark font-semibold hover:text-brand transition-colors">
            Ver tudo &rarr;
          </button>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-dark-700">
            <p>Nenhuma joia cadastrada ainda. Adicione no painel administrativo.</p>
          </div>
        )}
      </section>
    </div>
  );
}