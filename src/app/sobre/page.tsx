"use client";

import { motion, Variants } from 'framer-motion';
import { Heart, ShieldCheck, Gem, Search } from 'lucide-react';

export default function About() {
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const values = [
    { 
      icon: Gem, 
      title: "Curadoria Exclusiva", 
      desc: "Navegamos pelas maiores tendências e selecionamos a dedo as peças mais sofisticadas junto aos melhores fornecedores do mercado." 
    },
    { 
      icon: ShieldCheck, 
      title: "Controle de Qualidade", 
      desc: "Nossa exigência é altíssima. Só compramos e revendemos peças que possuam banho premium, garantia e acabamento hipoalergênico." 
    },
    { 
      icon: Search, 
      title: "O Garimpo Perfeito", 
      desc: "Fazemos o trabalho duro de buscar incansavelmente pelas melhores peças, para que você tenha acesso a um catálogo impecável e luxuoso." 
    },
    { 
      icon: Heart, 
      title: "Experiência Inesquecível", 
      desc: "O nosso cuidado vai da escolha da joia até a embalagem final. Preparamos cada envio para proporcionar um unboxing emocionante." 
    },
  ];

  return (
    <div className="bg-white">
      
      {/* 1. Header Hero Animado */}
      <div className="relative py-24 md:py-32 bg-brand-bg overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-brand-light/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-brand/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.span 
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            className="text-brand font-bold tracking-widest uppercase text-sm"
          >
            A Nossa Essência
          </motion.span>
          <motion.h1 
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            className="text-4xl md:text-6xl font-serif font-bold text-dark-900 mt-4 mb-6"
          >
            O nosso olhar. O seu brilho.
          </motion.h1>
          <motion.p 
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            className="text-lg text-dark-700 max-w-2xl mx-auto leading-relaxed"
          >
            Nascemos do desejo de encontrar e oferecer as melhores semijoias do mercado. Peças escolhidas a dedo para serem extensões da sua personalidade.
          </motion.p>
        </div>
      </div>

      {/* 2. Seção História (Texto + Imagem) */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-elegant border border-gray-100">
              <img 
                src="https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?q=80&w=2070&auto=format&fit=crop" 
                alt="Semijoias Elegantes" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-10 -right-6 lg:-right-10 bg-white p-8 shadow-elegant rounded-2xl max-w-xs hidden md:block border border-gray-50">
              <p className="font-serif italic text-xl text-dark-900">"A simplicidade é o último grau de sofisticação."</p>
              <p className="text-right text-xs text-brand font-bold mt-4 uppercase tracking-widest">— Leonardo da Vinci</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6 lg:pl-10"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-dark-900">A Arte da Curadoria</h2>
            <div className="w-20 h-1 bg-brand rounded-full"></div>
            <p className="text-dark-700 leading-relaxed text-lg">
              Tudo começou em 2024, quando nossa fundadora decidiu transformar o seu olhar apurado para a moda em um negócio. A ideia era clara: garimpar e trazer para as nossas clientes semijoias de alta qualidade, que entregassem a mesma elegância da alta joalheria de forma acessível.
            </p>
            <p className="text-dark-700 leading-relaxed text-lg">
              Nossa missão se tornou buscar os melhores fornecedores de excelência do mercado. Selecionamos rigorosamente apenas peças versáteis e luxuosas — aquelas que você pode usar com confiança tanto em uma reunião de negócios quanto em um jantar especial.
            </p>
            <p className="text-dark-700 leading-relaxed text-lg">
              Hoje, a Chic & Charm atende e envia para todo o Brasil. Nosso maior patrimônio é o nosso critério de escolha: cada caixa que sai da nossa loja leva uma joia que nós mesmas aprovamos, usaríamos e amamos.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 3. Nossos Valores (Grid) */}
      <section className="bg-dark-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="text-brand-light font-bold tracking-widest uppercase text-xs border border-brand-light/30 px-3 py-1 rounded-full">
              Nossos Pilares
            </span>
            <h2 className="text-3xl md:text-5xl font-serif mt-6">Por que escolher a Chic & Charm?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((val, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-dark-800/50 p-8 rounded-2xl border border-dark-700 hover:bg-dark-800 transition-colors text-center group"
              >
                <div className="inline-flex p-4 bg-brand/10 text-brand-light rounded-2xl mb-6 group-hover:bg-brand group-hover:text-white transition-colors duration-300">
                  <val.icon size={32} />
                </div>
                <h3 className="text-xl font-serif font-bold mb-4">{val.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Imagem Full Width */}
      <div 
        className="h-[500px] relative bg-fixed bg-center bg-cover" 
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=2075&auto=format&fit=crop")' }}
      >
        <div className="absolute inset-0 bg-dark-900/60 flex items-center justify-center">
          <div className="text-center text-white p-6 max-w-3xl">
            <h2 className="text-3xl md:text-5xl font-serif italic mb-8 leading-tight">
              "Joias têm o poder de ser aquela pequena coisa que faz você se sentir única."
            </h2>
            <p className="uppercase tracking-widest text-sm text-brand-light font-bold">
              — Jennie Kwon
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}