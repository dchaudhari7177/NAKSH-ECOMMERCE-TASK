import React, { useEffect, useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-700 dark:text-blue-300">Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex flex-col items-center hover:shadow-lg transition-shadow"
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-32 h-32 object-cover mb-4 rounded"
              />
              <h2 className="text-lg font-semibold mb-2 text-center text-gray-900 dark:text-gray-100">{product.name}</h2>
              <p className="text-blue-600 dark:text-blue-300 font-bold text-xl mb-2">₹{product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage; 