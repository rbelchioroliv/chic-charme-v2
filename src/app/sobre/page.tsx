import Image from "next/image";

export default function About() {
  return (
    <div className="pb-20">
      {/* Hero Institucional */}
      <section className="bg-dark-900 text-white py-24 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-brand-light">
            O Brilho da sua Essência
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed">
            Nascemos do desejo de entregar mais que acessórios. Criamos semijoias de alto padrão que acompanham mulheres em todos os seus momentos, refletindo sua luz única com elegância e durabilidade.
          </p>
        </div>
      </section>

      {/* Seção de Valores / Diferenciais */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-brand-bg rounded-full flex items-center justify-center mb-6">
              <span className="text-2xl">✨</span>
            </div>
            <h3 className="font-serif text-xl font-bold text-dark-900 mb-3">Banho Premium</h3>
            <p className="text-dark-700 leading-relaxed text-sm">
              Nossas peças recebem camadas espessas de ouro 18k ou ródio branco, garantindo um brilho duradouro idêntico ao de uma joia maciça.
            </p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-brand-bg rounded-full flex items-center justify-center mb-6">
              <span className="text-2xl">🛡️</span>
            </div>
            <h3 className="font-serif text-xl font-bold text-dark-900 mb-3">Hipoalergênicas</h3>
            <p className="text-dark-700 leading-relaxed text-sm">
              Totalmente livres de níquel e com acabamento em verniz antialérgico, desenvolvidas para cuidar até das peles mais sensíveis.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-brand-bg rounded-full flex items-center justify-center mb-6">
              <span className="text-2xl">💎</span>
            </div>
            <h3 className="font-serif text-xl font-bold text-dark-900 mb-3">Garantia de 1 Ano</h3>
            <p className="text-dark-700 leading-relaxed text-sm">
              Confiamos tanto em nossa qualidade que todas as semijoias possuem garantia integral cobrindo o banho e cravação.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}