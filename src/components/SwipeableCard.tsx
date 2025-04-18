
import { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ProductCard } from './ProductCard';
import { Product, useProductStore } from '@/store/productStore';

interface SwipeableCardProps {
  product: Product;
  isActive: boolean;
}

export const SwipeableCard = ({ product, isActive }: SwipeableCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [swipeDirection, setSwipeDirection] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const startY = useRef(0);
  const offsetX = useRef(0);
  const offsetY = useRef(0);
  
  // Get store actions
  const { likeProduct, dislikeProduct, addToCart, nextProduct } = useProductStore();

  // Reset card position when active status changes
  useEffect(() => {
    if (isActive) {
      gsap.set(cardRef.current, { 
        x: 0, 
        y: 0, 
        rotation: 0,
        clearProps: "all" 
      });
      setSwipeDirection(null);
    }
  }, [isActive]);

  // Handle touch start / mouse down
  const handleStart = (clientX: number, clientY: number) => {
    if (!isActive || !cardRef.current) return;
    
    setIsDragging(true);
    startX.current = clientX;
    startY.current = clientY;
    
    // Create and save the initial GSAP instance
    gsap.set(cardRef.current, { 
      z: 50 // Bring to front during drag
    });
  };

  // Handle touch move / mouse move
  const handleMove = (clientX: number, clientY: number) => {
    if (!isDragging || !isActive || !cardRef.current) return;
    
    // Calculate the distance moved
    offsetX.current = clientX - startX.current;
    offsetY.current = clientY - startY.current;
    
    // Apply rotation based on horizontal movement (smoother rotation)
    const rotation = offsetX.current * 0.08;
    
    // Update the position of the card with improved smoothness
    gsap.to(cardRef.current, {
      x: offsetX.current,
      y: offsetY.current,
      rotation: rotation,
      duration: 0.2, // Slightly longer duration for smoother feel
      ease: "power2.out", // Changed to power2 for smoother easing
      overwrite: "auto" // Ensures smooth transitions between rapid movements
    });
    
    // Determine swipe direction for visual feedback
    if (Math.abs(offsetX.current) > Math.abs(offsetY.current)) {
      // Horizontal swipe is dominant
      setSwipeDirection(offsetX.current > 50 ? 'right' : (offsetX.current < -50 ? 'left' : null));
    } else if (offsetY.current < -50) {
      // Upward swipe
      setSwipeDirection('up');
    } else {
      setSwipeDirection(null);
    }
  };

  // Handle touch end / mouse up
  const handleEnd = () => {
    if (!isDragging || !isActive || !cardRef.current) return;
    
    setIsDragging(false);
    
    // Threshold for considering a swipe action
    const swipeThreshold = 100;
    
    // Check if swiped far enough
    if (offsetX.current > swipeThreshold) {
      // Swiped right (like)
      completeSwipe('right');
    } else if (offsetX.current < -swipeThreshold) {
      // Swiped left (dislike)
      completeSwipe('left');
    } else if (offsetY.current < -swipeThreshold) {
      // Swiped up (add to cart)
      completeSwipe('up');
    } else {
      // Not swiped far enough, return to center
      resetCard();
    }
  };
  
  // Complete the swipe animation and trigger the appropriate action
  const completeSwipe = (direction: string) => {
    if (!cardRef.current) return;
    
    let x = 0;
    let y = 0;
    let rotation = 0;
    let scale = 1;
    
    switch (direction) {
      case 'right':
        x = window.innerWidth + 200;
        rotation = 30;
        likeProduct(product.id);
        break;
      case 'left':
        x = -window.innerWidth - 200;
        rotation = -30;
        dislikeProduct(product.id);
        break;
      case 'up':
        y = -window.innerHeight - 200;
        scale = 0.8;
        addToCart(product.id);
        break;
    }
    
    // Animate the card off screen with improved animation
    gsap.to(cardRef.current, {
      x,
      y,
      rotation,
      scale,
      opacity: 0,
      duration: 0.6, // Slightly longer for smoother exit
      ease: "power3.inOut", // More sophisticated easing
      onComplete: () => {
        nextProduct();
        setSwipeDirection(null);
      }
    });
  };
  
  // Reset card to center with improved animation
  const resetCard = () => {
    if (!cardRef.current) return;
    
    gsap.to(cardRef.current, {
      x: 0,
      y: 0,
      rotation: 0,
      duration: 0.5,
      ease: "elastic.out(0.9, 0.4)", // Smoother elastic effect
      onComplete: () => {
        setSwipeDirection(null);
      }
    });
  };
  
  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    handleStart(e.touches[0].clientX, e.touches[0].clientY);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX, e.touches[0].clientY);
  };
  
  const handleTouchEnd = () => {
    handleEnd();
  };
  
  // Mouse event handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    handleStart(e.clientX, e.clientY);
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    handleMove(e.clientX, e.clientY);
  };
  
  const handleMouseUp = () => {
    handleEnd();
  };
  
  const handleMouseLeave = () => {
    if (isDragging) {
      handleEnd();
    }
  };
  
  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      className="absolute inset-0 flex items-center justify-center"
      style={{ touchAction: isActive ? 'none' : 'auto' }}
    >
      <ProductCard 
        product={product} 
        isActive={isActive}
        swipeDirection={swipeDirection}
        cardRef={cardRef}
      />
    </div>
  );
};
