"use client";

import { useState, useEffect } from "react";
import { Package, Search, Eye, Clock, Truck, CheckCircle, X } from "lucide-react";
import Image from "next/image";

export default function AdminPedidos() {
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);

  // Busca os pedidos na API
  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/pedidos');
      const data = await res.json();
      setOrders(data);
    } catch (error) {
      console.error("Erro ao buscar pedidos", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Atualiza o Status do pedido
  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/pedidos/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      
      if (res.ok) {
        // Atualiza a lista localmente para não precisar recarregar a página
        setOrders(orders.map(order => 
          order.id === id ? { ...order, status: newStatus } : order
        ));
        if (selectedOrder && selectedOrder.id === id) {
          setSelectedOrder({ ...selectedOrder, status: newStatus });
        }
      }
    } catch (error) {
      alert("Erro ao atualizar o status.");
    }
  };

  const filteredOrders = orders.filter((o) =>
    o.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    o.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Função para definir as cores do Status
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "PENDENTE": return "bg-orange-100 text-orange-700 border-orange-200";
      case "PAGO": return "bg-blue-100 text-blue-700 border-blue-200";
      case "ENVIADO": return "bg-green-100 text-green-700 border-green-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  if (isLoading) return <div className="p-10 text-center text-gray-500">A carregar pedidos...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
        <div>
          <h1 className="font-serif text-3xl font-bold text-dark-900">Gestão de Encomendas</h1>
          <p className="text-dark-700 mt-1">Acompanhe as vendas e atualize os envios.</p>
        </div>
      </div>

      {/* Barra de Busca */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-8 flex items-center gap-3">
        <Search className="w-5 h-5 text-gray-400" />
        <input 
          type="text" 
          placeholder="Buscar por nome do cliente ou ID do pedido..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-transparent outline-none text-dark-900 placeholder-gray-400"
        />
      </div>

      {/* Tabela de Pedidos */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="p-4 font-medium text-dark-700 text-sm">ID do Pedido</th>
                <th className="p-4 font-medium text-dark-700 text-sm">Cliente</th>
                <th className="p-4 font-medium text-dark-700 text-sm">Data</th>
                <th className="p-4 font-medium text-dark-700 text-sm">Total</th>
                <th className="p-4 font-medium text-dark-700 text-sm">Status</th>
                <th className="p-4 font-medium text-dark-700 text-sm text-right">Detalhes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-4 font-mono text-xs text-gray-500">{order.id}</td>
                    <td className="p-4 font-medium text-dark-900">{order.customerName}</td>
                    <td className="p-4 text-sm text-dark-700">
                      {new Date(order.createdAt).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="p-4 font-semibold text-brand">R$ {order.total.toFixed(2)}</td>
                    <td className="p-4">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full border ${getStatusStyle(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button 
                        onClick={() => setSelectedOrder(order)}
                        className="p-2 text-dark-700 hover:text-brand hover:bg-brand-bg rounded-lg transition-colors inline-flex"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500">
                    Nenhum pedido encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de Detalhes do Pedido */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-dark-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-3xl shadow-2xl max-h-[90vh] overflow-y-auto flex flex-col">
            
            <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50/50 sticky top-0 z-10">
              <div>
                <h2 className="font-serif text-2xl font-bold text-dark-900">Detalhes do Pedido</h2>
                <p className="text-xs font-mono text-gray-500 mt-1">{selectedOrder.id}</p>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                <X className="w-5 h-5 text-dark-800" />
              </button>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Info Cliente */}
              <div className="space-y-4">
                <h3 className="font-bold text-dark-900 border-b pb-2">Dados do Cliente</h3>
                <div className="text-sm text-dark-700 space-y-2">
                  <p><strong className="text-dark-900">Nome:</strong> {selectedOrder.customerName}</p>
                  <p><strong className="text-dark-900">Email:</strong> {selectedOrder.email}</p>
                  <p><strong className="text-dark-900">WhatsApp:</strong> {selectedOrder.phone}</p>
                </div>
                
                <h3 className="font-bold text-dark-900 border-b pb-2 pt-4">Endereço de Entrega</h3>
                <div className="text-sm text-dark-700 space-y-2">
                  <p>{selectedOrder.address}</p>
                  <p>{selectedOrder.city} - {selectedOrder.state}</p>
                  <p>CEP: {selectedOrder.zipCode}</p>
                </div>
              </div>

              {/* Ações e Status */}
              <div className="space-y-4 bg-gray-50 p-5 rounded-xl border border-gray-100 h-fit">
                <h3 className="font-bold text-dark-900 mb-2">Atualizar Status</h3>
                <div className="flex flex-col gap-2">
                  <button 
                    onClick={() => updateStatus(selectedOrder.id, "PENDENTE")}
                    className={`p-3 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors ${selectedOrder.status === 'PENDENTE' ? 'bg-orange-100 text-orange-700 border border-orange-200' : 'bg-white border border-gray-200 hover:bg-gray-50'}`}
                  >
                    <Clock className="w-4 h-4" /> Aguardando Pagamento
                  </button>
                  <button 
                    onClick={() => updateStatus(selectedOrder.id, "PAGO")}
                    className={`p-3 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors ${selectedOrder.status === 'PAGO' ? 'bg-blue-100 text-blue-700 border border-blue-200' : 'bg-white border border-gray-200 hover:bg-gray-50'}`}
                  >
                    <CheckCircle className="w-4 h-4" /> Pagamento Confirmado
                  </button>
                  <button 
                    onClick={() => updateStatus(selectedOrder.id, "ENVIADO")}
                    className={`p-3 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors ${selectedOrder.status === 'ENVIADO' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-white border border-gray-200 hover:bg-gray-50'}`}
                  >
                    <Truck className="w-4 h-4" /> Pedido Enviado
                  </button>
                </div>
              </div>
            </div>

            {/* Lista de Itens Comprados */}
            <div className="p-6 border-t border-gray-100">
              <h3 className="font-bold text-dark-900 mb-4 border-b pb-2">Joias Compradas</h3>
              <div className="space-y-4">
                {selectedOrder.items.map((item: any) => (
                  <div key={item.id} className="flex items-center gap-4 bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <div className="relative w-16 h-16 bg-white rounded-lg overflow-hidden border border-gray-200">
                      {item.product?.imageUrl ? (
                        <Image src={item.product.imageUrl} alt="Joia" fill className="object-cover" />
                      ) : (
                        <Package className="w-6 h-6 m-auto mt-5 text-gray-300" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-dark-900">{item.product?.name || "Produto Removido"}</p>
                      <p className="text-sm text-dark-700">Quantidade: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-brand">R$ {(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex justify-between items-center text-xl p-4 bg-dark-900 text-white rounded-xl shadow-elegant">
                <span className="font-medium">Total Recebido:</span>
                <span className="font-serif font-bold text-brand-light">R$ {selectedOrder.total.toFixed(2)}</span>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}