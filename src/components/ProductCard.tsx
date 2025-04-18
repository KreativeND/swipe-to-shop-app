
import { useRef } from 'react';
import { Product } from '@/store/productStore';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  isActive: boolean;
  swipeDirection: string | null;
  cardRef: React.RefObject<HTMLDivElement>;
}

export const ProductCard = ({ product, isActive, swipeDirection, cardRef }: ProductCardProps) => {
  // Function to format price (e.g. 2986 -> ₹2,986)
  const formatPrice = (price: number) => `₹${price.toLocaleString('en-IN')}`;
  
  // Calculate discount badge background color based on discount percentage
  const discountBadgeColor = () => {
    if (product.discountPercentage >= 40) return 'bg-red-500';
    if (product.discountPercentage >= 25) return 'bg-orange-500';
    if (product.discountPercentage > 0) return 'bg-green-500';
    return 'hidden';
  };

  // Determine action badge text and color based on swipe direction
  const getActionBadge = () => {
    if (!swipeDirection) return null;
    
    switch (swipeDirection) {
      case 'right':
        return (
          <div className="absolute top-10 right-5 rotate-12 border-4 border-green-500 px-4 py-2 rounded-lg bg-white bg-opacity-80">
            <p className="text-green-500 font-bold text-2xl">LIKED</p>
          </div>
        );
      case 'left':
        return (
          <div className="absolute top-10 left-5 -rotate-12 border-4 border-red-500 px-4 py-2 rounded-lg bg-white bg-opacity-80">
            <p className="text-red-500 font-bold text-2xl">PASS</p>
          </div>
        );
      case 'up':
        return (
          <div className="absolute top-10 left-1/2 transform -translate-x-1/2 border-4 border-blue-500 px-4 py-2 rounded-lg bg-white bg-opacity-80">
            <p className="text-blue-500 font-bold text-2xl">CART</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div 
      ref={cardRef}
      className={cn(
        "absolute w-full max-w-xs bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 transform",
        isActive ? "z-10" : "scale-95 opacity-90",
      )}
      style={{ 
        touchAction: isActive ? 'none' : 'auto',
        userSelect: 'none'
      }}
    >
      {/* Product image */}
      <div className="relative h-80 bg-gray-200 overflow-hidden">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback for broken images
            e.currentTarget.src = "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9";
          }}
        />
        
        {/* Discount badge */}
        {product.discountPercentage > 0 && (
          <div className={`absolute top-0 right-0 ${discountBadgeColor()} text-white py-1 px-3 rounded-bl-lg text-sm font-medium`}>
            {product.discountPercentage}% OFF
          </div>
        )}
        
        {/* Action badge (like/dislike/cart) */}
        {getActionBadge()}
        
        {/* Brand badge */}
        <div className="absolute bottom-0 left-0 bg-black bg-opacity-60 text-white py-1 px-3 uppercase text-xs font-medium">
          {product.brand}
        </div>
      </div>
      
      {/* Product details */}
      <div className="p-4">
        <h3 className="text-lg font-medium capitalize">{product.name}</h3>
        
        <div className="flex items-center mt-2 space-x-2">
          <span className="text-xl font-bold">{formatPrice(product.price)}</span>
          
          {product.discountPercentage > 0 && (
            <span className="text-gray-500 line-through text-sm">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
      
      {/* Swipe instructions only shown on active card */}
      {isActive && (
        <div className="bg-gray-100 py-3 px-4 text-center text-sm text-gray-500">
          Swipe left to pass, right to like, up to add to cart
        </div>
      )}
    </div>
  );
};
