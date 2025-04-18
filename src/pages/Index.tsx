
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { CardStack } from "@/components/CardStack";
import { ProductStack } from "@/components/ProductStack";
import { useProductStore } from "@/store/productStore";

// Create a client
const queryClient = new QueryClient();

const Index = () => {
  const { products, likedProducts, cartProducts, resetState } = useProductStore();

  // Get liked and cart products
  const likedItems = products.filter(p => likedProducts.includes(p.id));
  const cartItems = products.filter(p => cartProducts.includes(p.id));

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50">
        <header className="py-6 px-4 border-b border-gray-100">
          <div className="container mx-auto flex justify-center">
            <h1 className="text-2xl font-bold text-purple-700">Swipe to Shop</h1>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Liked Products */}
            <div>
              <h2 className="text-xl font-semibold mb-4 text-center text-gray-700">Liked Items</h2>
              <ProductStack 
                products={likedItems} 
                emptyMessage="No liked items yet!"
              />
            </div>

            {/* Main Card Stack */}
            <div>
              <h2 className="text-xl text-gray-700 mb-2 text-center">Discover Products</h2>
              <p className="text-gray-500 text-sm text-center mb-4">
                Swipe right to like, left to pass, up to add to cart
              </p>
              <CardStack />
            </div>

            {/* Cart Products */}
            <div>
              <h2 className="text-xl font-semibold mb-4 text-center text-gray-700">Cart Items</h2>
              <ProductStack 
                products={cartItems} 
                emptyMessage="Your cart is empty!"
              />
            </div>
          </div>
        </main>
      </div>
    </QueryClientProvider>
  );
};

export default Index;
