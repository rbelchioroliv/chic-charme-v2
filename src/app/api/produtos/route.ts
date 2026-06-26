import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function GET() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' }
  });
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const price = parseFloat(formData.get('price') as string);
    const category = formData.get('category') as string;
    
    // Capturando os novos campos
    const description = formData.get('description') as string;
    const material = formData.get('material') as string;
    const plating = formData.get('plating') as string;
    const warranty = formData.get('warranty') as string;
    const isHypoallergenic = formData.get('isHypoallergenic') === 'on'; // Checkbox retorna 'on' se marcado

    const file = formData.get('image') as File | null;
    let imageUrl = "";

    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const uploadDir = path.join(process.cwd(), 'public/uploads');
      await mkdir(uploadDir, { recursive: true });
      const filename = `${Date.now()}-${file.name.replaceAll(" ", "_")}`;
      const filepath = path.join(uploadDir, filename);
      await writeFile(filepath, buffer);
      imageUrl = `/uploads/${filename}`;
    }

    const product = await prisma.product.create({
      data: { 
        name, 
        price, 
        category, 
        imageUrl,
        description,
        material,
        plating,
        warranty,
        isHypoallergenic
      }
    });

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao criar produto" }, { status: 500 });
  }
}