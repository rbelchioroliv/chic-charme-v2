import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic'; // Garante que o painel mostre sempre dados atualizados

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' }, // Mais recentes primeiro
      include: {
        items: {
          include: {
            product: true, // Traz a foto e o nome da joia
          }
        }
      }
    });
    
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar pedidos" }, { status: 500 });
  }
}