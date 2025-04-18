
import { useProductStore } from "@/store/productStore";
import { SwipeableCard } from "./SwipeableCard";
import { ArrowLeftIcon, ArrowRightIcon, ArrowUpIcon } from "lucide-react";

export const CardStack = () => {
  const { products, currentIndex } = useProductStore();
  
  // Show at most 3 cards in the stack
  const visibleProducts = products.slice(
    currentIndex, 
    Math.min(currentIndex + 3, products.length)
  );
  
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
      
      {/* Swipe instruction buttons at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-8 py-6">
        <button 
          className="bg-red-100 p-3 rounded-full text-red-500"
          aria-label="Dislike"
          onClick={() => {
            const currentProduct = visibleProducts[0];
            useProductStore.getState().dislikeProduct(currentProduct.id);
            useProductStore.getState().nextProduct();
          }}
        >
          <ArrowLeftIcon />
        </button>
        
        <button 
          className="bg-blue-100 p-3 rounded-full text-blue-500"
          aria-label="Add to cart"
          onClick={() => {
            const currentProduct = visibleProducts[0];
            useProductStore.getState().addToCart(currentProduct.id);
            useProductStore.getState().nextProduct();
          }}
        >
          <ArrowUpIcon />
        </button>
        
        <button 
          className="bg-green-100 p-3 rounded-full text-green-500"
          aria-label="Like"
          onClick={() => {
            const currentProduct = visibleProducts[0];
            useProductStore.getState().likeProduct(currentProduct.id);
            useProductStore.getState().nextProduct();
          }}
        >
          <ArrowRightIcon />
        </button>
      </div>
    </div>
  );
};
