
import { useProductStore } from "@/store/productStore";
import { SwipeableCard } from "./SwipeableCard";
import { ArrowLeftIcon, ArrowRightIcon, ArrowUpIcon } from "lucide-react";
import { useEffect } from "react";

export const CardStack = () => {
  const { products, currentIndex } = useProductStore();
  
  // Show at most 3 cards in the stack
  const visibleProducts = products.slice(
    currentIndex, 
    Math.min(currentIndex + 3, products.length)
  );
  
  // Add keyboard event listeners for arrow keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (visibleProducts.length === 0) return;
      
      const currentProduct = visibleProducts[0];
      
      switch (e.key) {
        case "ArrowLeft":
          useProductStore.getState().dislikeProduct(currentProduct.id);
          useProductStore.getState().nextProduct();
          break;
        case "ArrowRight":
          useProductStore.getState().likeProduct(currentProduct.id);
          useProductStore.getState().nextProduct();
          break;
        case "ArrowUp":
          useProductStore.getState().addToCart(currentProduct.id);
          useProductStore.getState().nextProduct();
          break;
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [visibleProducts]);
  
  // Display empty state if no products
  if (visibleProducts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <div className="bg-white rounded-lg p-8 shadow-md text-center max-w-xs">
          <h3 className="text-xl font-semibold mb-4">No more products!</h3>
          <p className="text-gray-600 mb-6">You've viewed all our products.</p>
          <button 
            onClick={() => useProductStore.getState().resetState()}
            className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Start Over
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="relative w-full max-w-xs h-[600px] mx-auto">
      {/* Cards stack */}
      {visibleProducts.map((product, index) => (
        <SwipeableCard
          key={product.id}
          product={product}
          isActive={index === 0}
        />
      ))}
      
      {/* Enhanced swipe instruction buttons with improved z-index */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-10 py-6 z-20">
        <button 
          className="bg-red-500 p-4 rounded-full text-white shadow-lg hover:bg-red-600 transition-all duration-300 transform hover:scale-110"
          aria-label="Dislike"
          onClick={() => {
            const currentProduct = visibleProducts[0];
            useProductStore.getState().dislikeProduct(currentProduct.id);
            useProductStore.getState().nextProduct();
          }}
        >
          <ArrowLeftIcon size={24} />
        </button>
        
        <button 
          className="bg-blue-500 p-4 rounded-full text-white shadow-lg hover:bg-blue-600 transition-all duration-300 transform hover:scale-110"
          aria-label="Add to cart"
          onClick={() => {
            const currentProduct = visibleProducts[0];
            useProductStore.getState().addToCart(currentProduct.id);
            useProductStore.getState().nextProduct();
          }}
        >
          <ArrowUpIcon size={24} />
        </button>
        
        <button 
          className="bg-green-500 p-4 rounded-full text-white shadow-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-110"
          aria-label="Like"
          onClick={() => {
            const currentProduct = visibleProducts[0];
            useProductStore.getState().likeProduct(currentProduct.id);
            useProductStore.getState().nextProduct();
          }}
        >
          <ArrowRightIcon size={24} />
        </button>
      </div>
    </div>
  );
};
