import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

// PUT: Atualiza um produto existente
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const formData = await request.formData();
    
    const name = formData.get('name') as string;
    const price = parseFloat(formData.get('price') as string);
    const promoPriceString = formData.get('promotionalPrice') as string;
    const promotionalPrice = promoPriceString ? parseFloat(promoPriceString) : null;
    const category = formData.get('category') as string;
    const description = formData.get('description') as string;
    const material = formData.get('material') as string;
    const plating = formData.get('plating') as string;
    const warranty = formData.get('warranty') as string;
    const isHypoallergenic = formData.get('isHypoallergenic') === 'on';

    const file = formData.get('image') as File | null;
    
    // Objeto com os dados para atualizar (sem a imagem por enquanto)
    const updateData: any = {
      name, price, promotionalPrice, category, description,
      material, plating, warranty, isHypoallergenic
    };

    // Se o usuário enviou uma imagem nova, fazemos o upload e substituímos
    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const uploadDir = path.join(process.cwd(), 'public/uploads');
      await mkdir(uploadDir, { recursive: true });
      const filename = `${Date.now()}-${file.name.replaceAll(" ", "_")}`;
      const filepath = path.join(uploadDir, filename);
      await writeFile(filepath, buffer);
      updateData.imageUrl = `/uploads/${filename}`;
    }

    const product = await prisma.product.update({
      where: { id: resolvedParams.id },
      data: updateData
    });

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao atualizar produto" }, { status: 500 });
  }
}