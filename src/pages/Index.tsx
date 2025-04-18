
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { CardStack } from "@/components/CardStack";

// Create a client
const queryClient = new QueryClient();

const Index = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50">
        <header className="py-6 px-4 border-b border-gray-100">
          <div className="container mx-auto flex justify-center">
            <h1 className="text-2xl font-bold text-purple-700">Swipe to Shop</h1>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center">
            <div className="mb-8 text-center">
              <h2 className="text-xl text-gray-700 mb-2">Discover Products</h2>
              <p className="text-gray-500 text-sm">
                Swipe right to like, left to pass, up to add to cart
              </p>
            </div>
            
            <div className="w-full max-w-xs">
              <CardStack />
            </div>

            <div className="mt-10 text-center">
              <p className="text-sm text-gray-500">Swipe through products to find your favorites</p>
            </div>
          </div>
        </main>
        
        <footer className="py-4 px-4 border-t border-gray-100">
          <div className="container mx-auto text-center">
            <p className="text-xs text-gray-500">
              Swipe to Shop Demo App - Built with React, GSAP & Capacitor
            </p>
          </div>
        </footer>
      </div>
    </QueryClientProvider>
  );
};

export default Index;
