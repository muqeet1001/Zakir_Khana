import { useParams } from 'wouter';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useCart } from '@/hooks/useCart';
import { useInView } from '@/hooks/useInView';
import { Product3D } from '@/components/Product3D';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Truck, RotateCcw, Shield, Minus, Plus, ShoppingCart } from 'lucide-react';
import type { Product } from '@shared/schema';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { ref, isInView } = useInView();
  const { addToCart, isAdding } = useCart();
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);

  const { data: product, isLoading } = useQuery<Product>({
    queryKey: ['/api/products', id],
    enabled: !!id,
  });

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        productId: product.id,
        quantity,
        size: selectedSize,
      });
    }
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  if (isLoading) {
    return (
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading product...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Product not found</h1>
          <p className="mt-2 text-gray-600">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* 3D Product Viewer */}
          <div>
            <Product3D />
          </div>
          
          {/* Product Information */}
          <div ref={ref} className={`fade-in ${isInView ? 'visible' : ''}`}>
            <h1 className="font-display font-bold text-4xl mb-4 text-secondary">
              {product.name}
            </h1>
            <p className="text-2xl font-semibold text-primary mb-6">₹{product.price}</p>
            <p className="text-lg text-gray-400 mb-8 leading-relaxed">
              {product.description}
            </p>
            
            {/* Size Selection */}
            {product.sizes && product.sizes.length > 1 && (
              <div className="mb-8">
                <h3 className="font-semibold text-lg mb-4 text-secondary">Size</h3>
                <div className="flex space-x-3">
                  {product.sizes.map((size) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? "default" : "outline"}
                      onClick={() => setSelectedSize(size)}
                      className="px-4 py-2"
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Quantity and Add to Cart */}
            <div className="flex items-center space-x-4 mb-8">
              <div className="flex items-center border-2 border-gray-300 rounded-lg">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={decrementQuantity}
                  className="px-3 py-2"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="px-4 py-2 font-semibold">{quantity}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={incrementQuantity}
                  className="px-3 py-2"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <Button
                onClick={handleAddToCart}
                disabled={isAdding}
                className="bg-primary hover:bg-accent text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 flex-1"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                {isAdding ? 'Adding...' : 'Add to Cart'}
              </Button>
            </div>
            
            {/* Product Features */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Truck className="w-5 h-5 text-primary" />
                <span className="text-gray-400">Free shipping on orders over ₹1000</span>
              </div>
              <div className="flex items-center space-x-3">
                <RotateCcw className="w-5 h-5 text-primary" />
                <span className="text-gray-400">30-day return policy</span>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-primary" />
                <span className="text-gray-400">100% authentic merchandise</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
