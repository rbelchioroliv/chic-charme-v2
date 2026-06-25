import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-dark-900 text-white pt-16 pb-8 border-t border-dark-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-12 mb-12">
          
          <div className="lg:col-span-2">
            <Link href="/" className="font-serif text-3xl font-bold tracking-tight mb-4 inline-block">
              Chic <span className="text-brand">&</span> Charm
            </Link>
            <p className="text-dark-700/80 max-w-sm mt-4">
              Redefinindo a elegância feminina com peças exclusivas, feitas para destacar o que há de melhor em você.
            </p>
          </div>

          <div>
            <h4 className="font-medium text-lg mb-6">Links Úteis</h4>
            <ul className="space-y-4 text-dark-700/80">
              <li><Link href="/sobre" className="hover:text-brand transition-colors">Sobre Nós</Link></li>
              <li><Link href="/colecoes" className="hover:text-brand transition-colors">Nova Coleção</Link></li>
              <li><Link href="/contato" className="hover:text-brand transition-colors">Contato</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-lg mb-6">Legal</h4>
            <ul className="space-y-4 text-dark-700/80">
              <li><Link href="#" className="hover:text-brand transition-colors">Trocas e Devoluções</Link></li>
              <li><Link href="#" className="hover:text-brand transition-colors">Termos de Serviço</Link></li>
              <li><Link href="#" className="hover:text-brand transition-colors">Privacidade</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-dark-800 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-dark-700/60">
          <p>© 2026 Chic & Charm. Todos os direitos reservados.</p>
          <div className="mt-4 md:mt-0">
            Desenvolvido com sofisticação.
          </div>
        </div>
      </div>
    </footer>
  );
}