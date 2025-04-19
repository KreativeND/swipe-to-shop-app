
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { CardStack } from "@/components/CardStack";
import { ProductStack } from "@/components/ProductStack";
import { useProductStore } from "@/store/productStore";
import { Heart, ShoppingCart } from "lucide-react";
import { useState } from "react";

// Create a client
const queryClient = new QueryClient();

const Index = () => {
  const { products, likedProducts, cartProducts, resetState } = useProductStore();
  const [activeView, setActiveView] = useState<'discover' | 'liked' | 'cart'>('discover');

  // Get liked and cart products
  const likedItems = products.filter(p => likedProducts.includes(p.id));
  const cartItems = products.filter(p => cartProducts.includes(p.id));

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50">
        <header className="py-6 px-4 border-b border-gray-100">
          <div className="container mx-auto">
            <div className="flex justify-between items-center max-w-xs mx-auto">
              <button
                onClick={() => setActiveView('liked')}
                className={`relative p-2 rounded-full transition-colors ${
                  activeView === 'liked' ? 'bg-purple-100' : 'hover:bg-purple-50'
                }`}
              >
                <Heart 
                  className={activeView === 'liked' ? 'text-purple-600' : 'text-gray-600'} 
                  size={24} 
                />
                {likedItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {likedItems.length}
                  </span>
                )}
              </button>
              
              <h1 className="text-2xl font-bold text-purple-700">Swipe to Shop</h1>
              
              <button
                onClick={() => setActiveView('cart')}
                className={`relative p-2 rounded-full transition-colors ${
                  activeView === 'cart' ? 'bg-purple-100' : 'hover:bg-purple-50'
                }`}
              >
                <ShoppingCart 
                  className={activeView === 'cart' ? 'text-purple-600' : 'text-gray-600'} 
                  size={24} 
                />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="max-w-xs mx-auto">
            {activeView === 'discover' && (
              <div>
                <h2 className="text-xl text-gray-700 mb-2 text-center">Discover Products</h2>
                <p className="text-gray-500 text-sm text-center mb-4">
                  Swipe right to like, left to pass, up to add to cart
                </p>
                <CardStack />
              </div>
            )}

            {activeView === 'liked' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-700">Liked Items</h2>
                  <button
                    onClick={() => setActiveView('discover')}
                    className="text-sm text-purple-600 hover:text-purple-700"
                  >
                    Back to Discover
                  </button>
                </div>
                <ProductStack 
                  products={likedItems} 
                  emptyMessage="No liked items yet!"
                  onReset={() => setActiveView('discover')}
                />
              </div>
            )}

            {activeView === 'cart' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-700">Cart Items</h2>
                  <button
                    onClick={() => setActiveView('discover')}
                    className="text-sm text-purple-600 hover:text-purple-700"
                  >
                    Back to Discover
                  </button>
                </div>
                <ProductStack 
                  products={cartItems} 
                  emptyMessage="Your cart is empty!"
                  onReset={() => setActiveView('discover')}
                />
              </div>
            )}
          </div>
        </main>
      </div>
    </QueryClientProvider>
  );
};

export default Index;
