export const dynamic = "force-dynamic";

import React from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category?: string;
  description?: string;
  isLocal?: boolean;
}

async function getProduct(id: string): Promise<Product | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/products`, { cache: 'no-store' });
    const data = await res.json();
    const found = data.find((p: Product) => String(p.id) === id);
    if (!found) return null;
    // If not local, try to fetch description from fakestoreapi
    if (!found.isLocal) {
      try {
        const fres = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (fres.ok) {
          const fdata = await fres.json();
          found.description = fdata.description;
        }
      } catch {}
    }
    return found;
  } catch {
    return null;
  }
}

const ProductDetailPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) {
    return <div className="text-center mt-10 text-red-500">Product not found.</div>;
  }
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-md w-full flex flex-col items-center animate-fadeIn">
        <img src={product.imageUrl} alt={product.name} className="w-48 h-48 object-cover mb-4 rounded" />
        <h1 className="text-2xl font-bold mb-2 text-center text-blue-700 dark:text-blue-300">{product.name}</h1>
        <p className="text-blue-600 dark:text-blue-300 font-bold text-xl mb-2">₹{product.price}</p>
        {product.category && <div className="mb-2"><span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 px-2 py-1 rounded-full">{product.category}</span></div>}
        {product.description && <p className="text-gray-700 dark:text-gray-200 text-center mb-2">{product.description}</p>}
      </div>
    </div>
  );
};

export default ProductDetailPage; 