import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

// GET: Puxa todos os produtos do banco
export async function GET() {
  // O erro estava aqui. A sintaxe correta do Prisma é findMany()
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' }
  });
  
  return NextResponse.json(products);
}

// POST: Recebe os dados e a imagem, salva na pasta e no banco
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const price = parseFloat(formData.get('price') as string);
    const category = formData.get('category') as string;
    const file = formData.get('image') as File | null;

    let imageUrl = "";

    if (file) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      // Cria a pasta public/uploads se ela não existir
      const uploadDir = path.join(process.cwd(), 'public/uploads');
      await mkdir(uploadDir, { recursive: true });
      
      // Salva o arquivo fisicamente
      const filename = `${Date.now()}-${file.name.replaceAll(" ", "_")}`;
      const filepath = path.join(uploadDir, filename);
      await writeFile(filepath, buffer);
      
      // Caminho que será salvo no banco de dados e lido no front
      imageUrl = `/uploads/${filename}`;
    }

    // Salva no banco de dados usando Prisma
    const product = await prisma.product.create({
      data: { name, price, category, imageUrl }
    });

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao criar produto" }, { status: 500 });
  }
}