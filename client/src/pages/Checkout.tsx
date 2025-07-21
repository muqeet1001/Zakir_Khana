import { useState } from 'react';
import { useLocation } from 'wouter';
import { useMutation } from '@tanstack/react-query';
import { useCart } from '@/hooks/useCart';
import { useInView } from '@/hooks/useInView';
import { apiRequest } from '@/lib/queryClient';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CreditCard } from 'lucide-react';
import { useRef } from 'react';

function SuccessModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  const confettiElements = Array.from({ length: 20 }, (_, index) => (
    <div
      key={index}
      className="absolute w-3 h-3 animate-confetti"
      style={{
        left: `${Math.random() * 100}%`,
        backgroundColor: Math.random() > 0.5 ? "#FF6B35" : "#F7931E",
        animationDelay: `${Math.random() * 2}s`,
        animationDuration: `${3 + Math.random() * 2}s`,
      }}
    />
  ));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {/* CSS Confetti Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {confettiElements}
        
        {/* Additional celebratory elements */}
        <div className="absolute top-1/4 left-1/4 text-4xl animate-bounce">🎊</div>
        <div className="absolute top-1/3 right-1/4 text-3xl animate-pulse">✨</div>
        <div className="absolute bottom-1/3 left-1/3 text-2xl animate-spin">🎈</div>
        <div className="absolute top-2/3 right-1/3 text-3xl animate-bounce" style={{ animationDelay: '0.5s' }}>🎉</div>
      </div>
      
      <Card className="glass-effect w-full max-w-md mx-4 relative z-10">
        <CardContent className="p-8 text-center text-white">
          <div className="text-6xl mb-6 animate-bounce">🎉</div>
          <h3 className="font-display font-bold text-3xl mb-4">Order Successful!</h3>
          <p className="mb-6">Thank you for your purchase! Your order has been confirmed and will be shipped soon.</p>
          <Button 
            onClick={onClose}
            className="bg-primary hover:bg-accent text-white font-semibold px-8 py-3 rounded-full transition-all duration-300"
          >
            Continue Shopping
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default function Checkout() {
  const { ref, isInView } = useInView();
  const { cartItems, cartTotal, clearCart } = useCart();
  const [, setLocation] = useLocation();
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const shipping = cartTotal > 1000 ? 0 : 99;
  const discount = cartTotal * 0.1;
  const finalTotal = cartTotal + shipping - discount;

  const createOrderMutation = useMutation({
    mutationFn: async (orderData: any) => {
      const response = await apiRequest('POST', '/api/orders', orderData);
      return response.json();
    },
    onSuccess: () => {
      setShowSuccess(true);
      clearCart();
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const orderData = {
      total: finalTotal.toString(),
      shippingAddress: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
      },
      items: cartItems.map(item => ({
        productId: item.productId!,
        name: item.product.name,
        price: parseFloat(item.product.price),
        quantity: item.quantity,
        size: item.size,
      })),
    };

    createOrderMutation.mutate(orderData);
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    setLocation('/');
  };

  return (
    <>
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={ref} className={`text-center mb-12 fade-in ${isInView ? 'visible' : ''}`}>
            <h2 className="font-display font-bold text-4xl mb-4 text-secondary">Checkout</h2>
            <p className="text-gray-400">Complete your purchase securely</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Checkout Form */}
            <div className={`fade-in ${isInView ? 'visible' : ''}`}>
              <form onSubmit={handleSubmit}>
                {/* Shipping Information */}
                <Card className="bg-gray-100 mb-8">
                  <CardContent className="p-6">
                    <h3 className="font-display font-semibold text-xl mb-6 text-secondary">Shipping Information</h3>
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <Input
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                      <Input
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <Input
                      name="email"
                      type="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="mb-4"
                      required
                    />
                    <Input
                      name="phone"
                      type="tel"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="mb-4"
                      required
                    />
                    <Textarea
                      name="address"
                      placeholder="Address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="mb-4"
                      required
                    />
                    <div className="grid md:grid-cols-3 gap-4">
                      <Input
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                      />
                      <Input
                        name="state"
                        placeholder="State"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                      />
                      <Input
                        name="zipCode"
                        placeholder="ZIP Code"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </CardContent>
                </Card>
                
                {/* Payment Information */}
                <Card className="bg-gray-100 mb-8">
                  <CardContent className="p-6">
                    <h3 className="font-display font-semibold text-xl mb-6 text-secondary">Payment Information</h3>
                    <Input
                      name="cardNumber"
                      placeholder="Card Number"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      className="mb-4"
                      required
                    />
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input
                        name="expiryDate"
                        placeholder="MM/YY"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        required
                      />
                      <Input
                        name="cvv"
                        placeholder="CVV"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </CardContent>
                </Card>

                <Button
                  type="submit"
                  disabled={createOrderMutation.isPending}
                  className="w-full bg-primary hover:bg-accent text-white font-bold py-4 rounded-full transition-all duration-300 hover:scale-105"
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  {createOrderMutation.isPending ? 'Processing...' : 'Complete Payment'}
                </Button>
              </form>
            </div>
            
            {/* Order Summary */}
            <div className={`fade-in ${isInView ? 'visible' : ''}`} style={{ animationDelay: '0.2s' }}>
              <Card className="bg-gray-100 p-6 sticky top-24">
                <CardContent className="p-0">
                  <h3 className="font-display font-semibold text-xl mb-6 text-secondary">Order Summary</h3>
                  
                  {/* Order Items */}
                  <div className="space-y-4 mb-6">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                          <img 
                            src={item.product.image} 
                            alt={item.product.name} 
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div>
                            <p className="font-medium text-secondary">{item.product.name}</p>
                            <p className="text-sm text-gray-400">Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <span className="font-semibold">₹{(parseFloat(item.product.price) * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t pt-4 space-y-2 mb-6">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>₹{cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
                    </div>
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-₹{discount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg pt-2 border-t">
                      <span>Total</span>
                      <span className="text-primary">₹{finalTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <SuccessModal isOpen={showSuccess} onClose={handleSuccessClose} />
    </>
  );
}
