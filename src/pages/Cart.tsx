import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [tableNumber, setTableNumber] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  
  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;
  
  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, you would send the order to your backend
    console.log('Order placed:', {
      items: cart,
      tableNumber,
      specialInstructions,
      subtotal,
      tax,
      total
    });
    
    setOrderPlaced(true);
    clearCart();
  };
  
  if (orderPlaced) {
    return (
      <div className="bg-amber-50 min-h-screen py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-amber-800 mb-4">Order Placed Successfully!</h2>
            <p className="text-lg text-gray-700 mb-6">
              Your order has been sent to the kitchen and will be prepared for table #{tableNumber}.
            </p>
            <p className="text-gray-600 mb-8">
              A server will bring your food to your table shortly. Thank you for dining with us!
            </p>
            <Link 
              to="/menu" 
              className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-6 rounded-lg transition inline-flex items-center"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Menu
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-amber-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-amber-800 mb-4">Your Order</h1>
          <div className="w-24 h-1 bg-amber-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Review your selections and place your order for dine-in service.
          </p>
        </div>
        
        {cart.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="h-8 w-8 text-amber-600" />
            </div>
            <h2 className="text-2xl font-semibold text-amber-800 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">
              Looks like you haven't added any items to your order yet.
            </p>
            <Link 
              to="/menu" 
              className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-6 rounded-lg transition"
            >
              Browse Menu
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-2xl font-semibold text-amber-800">Order Items</h2>
                </div>
                
                <ul className="divide-y divide-gray-200">
                  {cart.map(item => (
                    <li key={item.id} className="p-6 flex flex-col sm:flex-row sm:items-center">
                      <div className="sm:flex-shrink-0 mb-4 sm:mb-0">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-24 h-24 object-cover rounded-md"
                        />
                      </div>
                      <div className="sm:ml-6 sm:flex-1">
                        <div className="flex justify-between">
                          <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                          <p className="text-lg font-medium text-amber-600">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                        <div className="mt-4 flex justify-between items-center">
                          <div className="flex items-center border border-gray-300 rounded-md">
                            <button
                              onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                              className="p-2 text-gray-600 hover:text-amber-600"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="px-4">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-2 text-gray-600 hover:text-amber-600"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-700 flex items-center"
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                
                <div className="p-6 border-t border-gray-200">
                  <Link 
                    to="/menu" 
                    className="text-amber-600 hover:text-amber-800 font-medium flex items-center"
                  >
                    <ArrowLeft className="mr-2 h-5 w-5" />
                    Continue Ordering
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
                <h2 className="text-2xl font-semibold text-amber-800 mb-6">Order Summary</h2>
                
                <form onSubmit={handlePlaceOrder}>
                  <div className="mb-6">
                    <label htmlFor="tableNumber" className="block text-gray-700 font-medium mb-2">Table Number</label>
                    <input
                      type="text"
                      id="tableNumber"
                      value={tableNumber}
                      onChange={(e) => setTableNumber(e.target.value)}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                      placeholder="Enter your table number"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="specialInstructions" className="block text-gray-700 font-medium mb-2">Special Instructions (Optional)</label>
                    <textarea
                      id="specialInstructions"
                      value={specialInstructions}
                      onChange={(e) => setSpecialInstructions(e.target.value)}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                      placeholder="Any special requests or dietary restrictions..."
                    ></textarea>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Tax (8%)</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-xl font-bold text-amber-800 pt-3 border-t border-gray-200">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-6 rounded-lg transition"
                  >
                    Place Order
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;