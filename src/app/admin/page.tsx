export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-dark-900 mb-8">Visão Geral</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-dark-700 font-medium mb-2">Vendas Hoje</p>
          <p className="text-3xl font-bold text-dark-900">R$ 1.250,00</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-dark-700 font-medium mb-2">Pedidos Pendentes</p>
          <p className="text-3xl font-bold text-dark-900">4</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-dark-700 font-medium mb-2">Produtos em Baixa</p>
          <p className="text-3xl font-bold text-red-500">2 peças</p>
        </div>
      </div>
    </div>
  );
}