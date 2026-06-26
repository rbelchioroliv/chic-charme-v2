import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    // Recebe os dados enviados pelo Front-end
    const body = await request.json();
    const { customer, items, total } = body;

    // Cria o Pedido principal e os Itens em uma única operação segura (Transação)
    const order = await prisma.order.create({
      data: {
        customerName: customer.name,
        email: customer.email,
        phone: customer.phone,
        address: customer.address,
        city: customer.city,
        state: customer.state,
        zipCode: customer.zipCode,
        total: total,
        // O Prisma é inteligente: já cria os itens associados ao pedido automaticamente
        items: {
          create: items.map((item: any) => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.promotionalPrice || item.price // Garante que pega o preço da oferta, se existir
          }))
        }
      }
    });

    // Devolve uma resposta de sucesso com o ID do pedido
    return NextResponse.json({ success: true, orderId: order.id }, { status: 201 });

  } catch (error) {
    console.error("Erro ao finalizar pedido:", error);
    return NextResponse.json({ error: "Erro ao processar o pedido." }, { status: 500 });
  }
}