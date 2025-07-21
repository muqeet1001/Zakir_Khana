import { Link } from 'wouter';
import { useCart } from '@/hooks/useCart';
import { useInView } from '@/hooks/useInView';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Minus, Plus, Trash2 } from 'lucide-react';

export default function Cart() {
  const { ref, isInView } = useInView();
  const { cartItems, cartTotal, updateCart, removeFromCart, isLoading } = useCart();

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(id);
    } else {
      updateCart({ id, quantity: newQuantity });
    }
  };

  const shipping = cartTotal > 1000 ? 0 : 99;
  const discount = cartTotal * 0.1; // 10% discount
  const finalTotal = cartTotal + shipping - discount;

  if (isLoading) {
    return (
      <div className="py-20 bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading cart...</p>
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="py-20 bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display font-bold text-4xl mb-4 text-secondary">Your Cart is Empty</h2>
          <p className="text-gray-400 mb-8">Looks like you haven't added any items to your cart yet.</p>
          <Link href="/shop">
            <Button className="bg-primary hover:bg-accent text-white px-8 py-3 rounded-full">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className="py-20 bg-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`text-center mb-12 fade-in ${isInView ? 'visible' : ''}`}>
          <h2 className="font-display font-bold text-4xl mb-4 text-secondary">Shopping Cart</h2>
          <p className="text-gray-400">Review your items before checkout</p>
        </div>
        
        {/* Cart Items */}
        <Card className={`shadow-lg overflow-hidden mb-8 fade-in ${isInView ? 'visible' : ''}`}>
          <CardContent className="p-0">
            {cartItems.map((item, index) => (
              <div key={item.id} className={`flex items-center p-6 ${index !== cartItems.length - 1 ? 'border-b border-gray-200' : ''}`}>
                <img 
                  src={item.product.image} 
                  alt={item.product.name} 
                  className="w-20 h-20 object-cover rounded-lg mr-6"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-secondary">{item.product.name}</h3>
                  {item.size && (
                    <p className="text-gray-400 mb-2">Size: {item.size}</p>
                  )}
                  <p className="text-primary font-semibold">₹{item.product.price}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center border rounded-lg">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      className="px-3 py-2"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="px-4 py-2 font-semibold">{item.quantity}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      className="px-3 py-2"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 p-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        
        {/* Order Summary */}
        <Card className={`shadow-lg p-8 fade-in ${isInView ? 'visible' : ''}`} style={{ animationDelay: '0.2s' }}>
          <CardContent className="p-0">
            <h3 className="font-display font-semibold text-2xl mb-6 text-secondary">Order Summary</h3>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>Discount (10%)</span>
                <span>-₹{discount.toFixed(2)}</span>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between font-bold text-xl">
                  <span>Total</span>
                  <span className="text-primary">₹{finalTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <Link href="/checkout">
              <Button className="w-full bg-primary hover:bg-accent text-white font-bold py-4 rounded-full transition-all duration-300 hover:scale-105">
                Proceed to Checkout
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
