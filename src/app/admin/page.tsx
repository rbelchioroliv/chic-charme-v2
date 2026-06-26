import prisma from "@/lib/prisma";
import { DollarSign, ShoppingBag, Package, TrendingUp } from "lucide-react";

export const dynamic = 'force-dynamic'; // Garante que a página carrega dados frescos sempre

export default async function AdminDashboard() {
  // Puxar os dados reais da base de dados
  const orders = await prisma.order.findMany();
  const productsCount = await prisma.product.count();

  // Calcular a Receita Total (Apenas pedidos pagos ou enviados)
  const totalRevenue = orders
    .filter(o => o.status === 'PAGO' || o.status === 'ENVIADO')
    .reduce((acc, order) => acc + order.total, 0);

  // Calcular pedidos pendentes
  const pendingOrdersCount = orders.filter(o => o.status === 'PENDENTE').length;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-10">
        <h1 className="font-serif text-3xl font-bold text-dark-900">Dashboard Financeiro</h1>
        <p className="text-dark-700 mt-1">Resumo das vendas e desempenho geral da loja.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {/* Card: Receita */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-green-100 text-green-600 rounded-xl">
              <DollarSign className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md">+12%</span>
          </div>
          <p className="text-sm font-medium text-gray-500 mb-1">Receita Confirmada</p>
          <h3 className="font-serif text-3xl font-bold text-dark-900">R$ {totalRevenue.toFixed(2)}</h3>
        </div>

        {/* Card: Pedidos Totais */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-brand/10 text-brand rounded-xl">
              <Package className="w-6 h-6" />
            </div>
          </div>
          <p className="text-sm font-medium text-gray-500 mb-1">Total de Pedidos</p>
          <h3 className="font-serif text-3xl font-bold text-dark-900">{orders.length}</h3>
        </div>

        {/* Card: Pedidos Pendentes */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-orange-100 text-orange-600 rounded-xl">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
          <p className="text-sm font-medium text-gray-500 mb-1">Aguardando Pagamento</p>
          <h3 className="font-serif text-3xl font-bold text-dark-900">{pendingOrdersCount}</h3>
        </div>

        {/* Card: Joias cadastradas */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-purple-100 text-purple-600 rounded-xl">
              <ShoppingBag className="w-6 h-6" />
            </div>
          </div>
          <p className="text-sm font-medium text-gray-500 mb-1">Joias no Catálogo</p>
          <h3 className="font-serif text-3xl font-bold text-dark-900">{productsCount}</h3>
        </div>
      </div>

      {/* Área Principal de Relatórios */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 min-h-[350px] flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
          <TrendingUp className="w-8 h-8 text-gray-300" />
        </div>
        <h3 className="font-serif text-2xl font-bold text-dark-900 mb-2">Histórico de Receita</h3>
        <p className="text-dark-700 max-w-md">
          Conforme a sua loja realizar mais vendas e aprovar pagamentos, os gráficos detalhados de evolução financeira aparecerão automaticamente aqui.
        </p>
      </div>
    </div>
  );
}