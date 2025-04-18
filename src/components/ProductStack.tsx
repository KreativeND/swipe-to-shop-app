
import { Product } from "@/store/productStore";
import { cn } from "@/lib/utils";

interface ProductStackProps {
  products: Product[];
  emptyMessage: string;
  onReset?: () => void;
}

export const ProductStack = ({ products, emptyMessage, onReset }: ProductStackProps) => {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <div className="bg-white rounded-lg p-8 shadow-md text-center max-w-xs">
          <h3 className="text-xl font-semibold mb-4">{emptyMessage}</h3>
          {onReset && (
            <button 
              onClick={onReset}
              className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Start Over
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-xs mx-auto">
      <div className="space-y-4">
        {products.map((product) => (
          <div 
            key={product.id}
            className="bg-white rounded-xl overflow-hidden shadow-lg"
          >
            <div className="relative h-40">
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 bg-black bg-opacity-60 text-white py-1 px-3 uppercase text-xs font-medium">
                {product.brand}
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-sm font-medium capitalize">{product.name}</h3>
              <div className="flex items-center mt-2">
                <span className="text-lg font-bold">₹{product.price.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
