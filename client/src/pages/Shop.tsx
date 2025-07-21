import { Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { useCart } from '@/hooks/useCart';
import { useInView } from '@/hooks/useInView';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ShoppingCartIcon } from 'lucide-react';
import type { Product } from '@shared/schema';

export default function Shop() {
  const { ref, isInView } = useInView();
  const { addToCart, isAdding } = useCart();

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  const handleAddToCart = (productId: number) => {
    addToCart({ productId, quantity: 1 });
  };

  if (isLoading) {
    return (
      <div className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading products...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`text-center mb-16 fade-in ${isInView ? 'visible' : ''}`}>
          <h2 className="font-display font-bold text-4xl md:text-5xl mb-6 text-secondary">
            Official <span className="gradient-text">Merch Store</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Wear your comedy pride with our premium collection of Sakht Launda merchandise.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <Card 
              key={product.id}
              className={`overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover-tilt fade-in ${isInView ? 'visible' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Link href={`/product/${product.id}`}>
                <a className="block">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-64 object-cover"
                  />
                </a>
              </Link>
              <CardContent className="p-6">
                <Link href={`/product/${product.id}`}>
                  <a>
                    <h3 className="font-display font-semibold text-xl mb-2 text-secondary hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                  </a>
                </Link>
                <p className="text-gray-400 mb-4">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-2xl text-primary">₹{product.price}</span>
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button 
                  onClick={() => handleAddToCart(product.id)}
                  disabled={isAdding}
                  className="w-full bg-primary hover:bg-accent text-white transition-all duration-300 hover:scale-105"
                >
                  <ShoppingCartIcon className="w-4 h-4 mr-2" />
                  {isAdding ? 'Adding...' : 'Add to Cart'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
