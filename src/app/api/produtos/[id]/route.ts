// src/app/api/produtos/[id]/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  // Apenas aguarde a promise no Next 15+
  const resolvedParams = await params; 
  
  await prisma.product.delete({ 
    where: { id: resolvedParams.id } 
  });
  
  return NextResponse.json({ success: true });
}