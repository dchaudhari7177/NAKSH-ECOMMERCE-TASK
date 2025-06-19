import { NextRequest, NextResponse } from 'next/server';

// In-memory store for added products (not persisted)
let addedProducts: any[] = [];
let nextId = 10000;

export async function GET(req: NextRequest) {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();
    // Transform to your frontend's expected format
    const products = data.map((item: any) => ({
      id: item.id,
      name: item.title,
      price: item.price,
      imageUrl: item.image,
      category: item.category,
      isLocal: false,
    }));
    // Add local products
    const allProducts = [...products, ...addedProducts];
    return NextResponse.json(allProducts);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, price, imageUrl, category } = await req.json();
    if (!name || !price || !imageUrl) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    const newProduct = {
      id: nextId++,
      name,
      price,
      imageUrl,
      category: category || '',
      isLocal: true,
    };
    addedProducts.push(newProduct);
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to add product' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  // Expecting /api/products/:id, but Next.js route handler only supports /api/products
  // So, get id from query string: /api/products?id=123
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  }
  const idx = addedProducts.findIndex((p) => String(p.id) === String(id));
  if (idx === -1) {
    return NextResponse.json({ error: 'Product not found or cannot delete remote product' }, { status: 404 });
  }
  const deleted = addedProducts.splice(idx, 1);
  return NextResponse.json(deleted[0]);
} 