import { CartItem, Product } from '../types';
import React, { useMemo, useRef, useState } from 'react';

import { CATEGORIES } from '../constants';

interface TerminalProps {
  products: Product[];
  addToCart: (product: Product) => void;
  cart: CartItem[];
  updateQuantity: (productId: string, delta: number) => void;
  totals: { subtotal: number; tax: number; total: number };
  clearCart: () => void;
}

interface LastOrderDetails {
  orderId: string;
  total: number;
  subtotal: number;
  tax: number;
  items: number;
  cart: CartItem[];
  date: string;
}

const Terminal: React.FC<TerminalProps> = ({ 
  products, 
  addToCart, 
  cart, 
  updateQuantity, 
  totals,
  clearCart
}) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [checkoutState, setCheckoutState] = useState<'idle' | 'processing' | 'success'>('idle');
  const [lastOrderDetails, setLastOrderDetails] = useState<LastOrderDetails | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const receiptRef = useRef<HTMLDivElement>(null);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                          p.sku.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, activeCategory, search]);

  const handlePay = () => {
    if (cart.length === 0) return;
    
    setCheckoutState('processing');
    
    const orderId = `TRX-${Math.floor(1000 + Math.random() * 9000)}`;
    const snapshot: LastOrderDetails = {
      orderId,
      total: totals.total,
      subtotal: totals.subtotal,
      tax: totals.tax,
      items: cart.reduce((acc, item) => acc + item.quantity, 0),
      cart: [...cart],
      date: new Date().toLocaleString()
    };

    setTimeout(() => {
      setLastOrderDetails(snapshot);
      setCheckoutState('success');
      clearCart();
    }, 1500);
  };

  const downloadReceiptPDF = async () => {
    if (!receiptRef.current || !lastOrderDetails) return;
    setIsDownloading(true);
    
    const element = receiptRef.current;
    const opt = {
      margin: 0.2,
      filename: `Receipt-${lastOrderDetails.orderId}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 3, useCORS: true },
      jsPDF: { unit: 'in', format: [4, 8], orientation: 'portrait' } // Custom thermal-paper size
    };

    try {
      // @ts-ignore
      await window.html2pdf().set(opt).from(element).save();
    } catch (err) {
      console.error("PDF Receipt generation failed", err);
    } finally {
      setIsDownloading(false);
    }
  };

  const startNewSale = () => {
    setCheckoutState('idle');
    setLastOrderDetails(null);
  };

  return (
    <div className="flex flex-1 relative overflow-hidden">
      {/* Invisible Receipt Template for PDF Capture */}
      <div className="absolute left-[-9999px] top-0">
        <div ref={receiptRef} className="w-[300px] p-8 bg-white text-[#111418] font-mono text-xs">
          <div className="text-center mb-6">
            <h1 className="text-xl font-black mb-1">RETAILPOS PRO</h1>
            <p className="text-[10px] text-gray-500">STATION #04 - TERMINAL A</p>
            <p className="text-[10px] text-gray-500">123 Commerce St, Tech City</p>
          </div>
          
          <div className="border-y border-dashed border-gray-300 py-3 mb-4 space-y-1">
            <div className="flex justify-between">
              <span>ORDER ID:</span>
              <span className="font-bold">{lastOrderDetails?.orderId}</span>
            </div>
            <div className="flex justify-between">
              <span>DATE:</span>
              <span>{lastOrderDetails?.date}</span>
            </div>
            <div className="flex justify-between">
              <span>CUSTOMER:</span>
              <span>Walk-in Guest</span>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between font-bold border-b border-gray-100 pb-1 mb-2">
              <span className="w-1/2">ITEM</span>
              <span className="w-1/4 text-center">QTY</span>
              <span className="w-1/4 text-right">TOTAL</span>
            </div>
            {lastOrderDetails?.cart.map(item => (
              <div key={item.product.id} className="flex justify-between py-1">
                <span className="w-1/2 truncate">{item.product.name}</span>
                <span className="w-1/4 text-center">{item.quantity}</span>
                <span className="w-1/4 text-right">${(item.product.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 pt-3 space-y-1">
            <div className="flex justify-between">
              <span>SUBTOTAL:</span>
              <span>${lastOrderDetails?.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>TAX (8%):</span>
              <span>${lastOrderDetails?.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-base font-black pt-2 border-t border-gray-100 mt-2">
              <span>TOTAL:</span>
              <span>${lastOrderDetails?.total.toFixed(2)}</span>
            </div>
          </div>

          <div className="mt-8 text-center text-[10px] text-gray-400">
            <p>PAID VIA: CREDIT CARD (VISA ****1234)</p>
            <div className="mt-4 p-2 bg-gray-50 rounded">
              <p className="font-bold">THANK YOU!</p>
              <p>Keep receipt for returns.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Success Overlay */}
      {checkoutState === 'success' && (
        <div className="absolute inset-0 z-50 bg-white flex flex-col items-center justify-center p-6 animate-in fade-in zoom-in duration-300">
          <div className="max-w-md w-full text-center space-y-6">
            <div className="size-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
              <span className="material-symbols-outlined text-[48px]">check_circle</span>
            </div>
            <h2 className="text-3xl font-black text-[#111418]">Payment Successful</h2>
            <p className="text-gray-500 font-medium">Order {lastOrderDetails?.orderId} completed successfully.</p>
            
            <div className="bg-[#f6f7f8] rounded-2xl p-6 border border-dashed border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-400 font-bold uppercase text-xs tracking-widest">Amount Paid</span>
                <span className="text-2xl font-black text-primary">${lastOrderDetails?.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400 font-bold uppercase text-xs tracking-widest">Items Count</span>
                <span className="font-bold">{lastOrderDetails?.items} Products</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={downloadReceiptPDF}
                disabled={isDownloading}
                className="flex items-center justify-center gap-2 h-14 rounded-xl border-2 border-primary text-primary font-bold hover:bg-blue-50 transition-all disabled:opacity-50"
              >
                <span className={`material-symbols-outlined ${isDownloading ? 'animate-spin' : ''}`}>
                  {isDownloading ? 'progress_activity' : 'picture_as_pdf'}
                </span>
                {isDownloading ? 'Saving...' : 'Save Receipt'}
              </button>
              <button 
                className="flex items-center justify-center gap-2 h-14 rounded-xl border-2 border-gray-200 font-bold hover:bg-gray-50 transition-colors"
                onClick={() => alert("Simulating Email: Receipt sent to guest@example.com")}
              >
                <span className="material-symbols-outlined">mail</span>
                Email Receipt
              </button>
            </div>

            <button 
              onClick={startNewSale}
              className="w-full h-16 bg-primary text-white rounded-xl font-black uppercase tracking-widest shadow-lg shadow-primary/30 hover:scale-[1.02] active:scale-100 transition-all"
            >
              Start New Sale
            </button>
          </div>
        </div>
      )}

      {/* Processing Overlay */}
      {checkoutState === 'processing' && (
        <div className="absolute inset-0 z-40 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="size-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xl font-bold text-primary animate-pulse">Processing Payment...</p>
            <p className="text-sm text-gray-500">Contacting bank terminal via encrypted link</p>
          </div>
        </div>
      )}

      {/* Left: Product Selection */}
      <div className="flex-1 flex flex-col min-w-0 bg-white">
        <div className="p-4 flex flex-col gap-4 border-b border-[#e5e7eb]">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <span className="material-symbols-outlined">search</span>
            </div>
            <input 
              className="block w-full h-12 pl-10 pr-12 border-none bg-[#f0f2f4] rounded-lg focus:ring-primary focus:ring-2 font-medium placeholder:text-[#617289]"
              placeholder="Search products, SKU or scan barcode..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
              <span className="material-symbols-outlined text-primary cursor-pointer">barcode_scanner</span>
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {CATEGORIES.map(cat => (
              <button 
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg px-5 transition-all border ${
                  activeCategory === cat.id 
                  ? 'bg-primary text-white border-primary shadow-sm shadow-primary/30' 
                  : 'bg-white text-[#111418] border-gray-200 hover:bg-gray-100'
                }`}
              >
                {cat.icon && <span className={`material-symbols-outlined text-[18px] ${activeCategory === cat.id ? 'text-white' : cat.color || ''}`}>{cat.icon}</span>}
                <span className="text-sm font-bold">{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar bg-[#f6f7f8]">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredProducts.map(product => {
              const inCart = cart.find(item => item.product.id === product.id);
              return (
                <div
                  key={product.id}
                  onClick={() => product.stock === 0 ? null : addToCart(product)}
                  disabled={product.stock === 0}
                  className={`bg-white rounded-xl overflow-hidden border transition-all ${ product.stock === 0 ? 'cursor-not-allowed' : 'cursor-pointer'} group shadow-sm hover:shadow-md ${inCart ? 'border-primary ring-1 ring-primary/20' : 'border-[#e5e7eb] hover:border-primary'}`}
                >
                  <div className="relative w-full aspect-square bg-center bg-no-repeat bg-cover" style={{ backgroundImage: `url("${product.image}")` }}>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors"></div>
                    {product.stock === 0 && (
                      <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
                        <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded">OUT OF STOCK</span>
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <p className="text-[#111418] text-sm font-bold leading-tight truncate">{product.name}</p>
                    <div className="flex justify-between items-center mt-1">
                      <p className="text-primary text-base font-extrabold">${product.price.toFixed(2)}</p>
                      {inCart && <span className="bg-primary/10 text-primary text-[10px] font-bold px-1.5 py-0.5 rounded">IN CART</span>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right: Cart Sidebar */}
      <div className="w-[400px] border-l border-[#e5e7eb] bg-white flex flex-col shadow-xl z-10">
        <div className="p-5 border-b border-[#e5e7eb]">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-[#111418] text-xl font-extrabold tracking-tight">Active Order</h1>
              <p className="text-[#617289] text-xs font-semibold mt-0.5 uppercase tracking-widest">Dine-in Terminal</p>
            </div>
            <button 
              onClick={clearCart}
              className="p-2 text-[#617289] hover:bg-red-50 hover:text-red-500 rounded-lg transition-colors"
            >
              <span className="material-symbols-outlined">delete</span>
            </button>
          </div>

          <div className="flex items-center gap-3 bg-[#f6f7f8] p-3 rounded-xl border border-dashed border-[#e5e7eb]">
            <div className="bg-white p-1.5 rounded-full border border-gray-200 shadow-sm flex items-center">
              <span className="material-symbols-outlined text-gray-500 text-[20px]">person_add</span>
            </div>
            <div className="flex-1">
              <p className="text-xs font-bold text-gray-400 uppercase">Customer</p>
              <p className="text-sm font-semibold text-[#111418]">Walk-in Guest</p>
            </div>
            <button className="text-xs font-bold text-primary hover:underline">Select</button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 custom-scrollbar">
          {cart.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-300 py-20">
              <span className="material-symbols-outlined text-[64px]">shopping_basket</span>
              <p className="text-sm font-bold mt-4">Cart is empty</p>
              <p className="text-xs">Add products to start an order</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.product.id} className="flex gap-3 animate-in fade-in slide-in-from-right-2 duration-200">
                <div className="size-14 rounded-lg bg-center bg-cover border border-[#e5e7eb] shrink-0" style={{ backgroundImage: `url("${item.product.image}")` }}></div>
                <div className="flex-1 flex flex-col justify-between overflow-hidden">
                  <div className="flex justify-between items-start">
                    <h4 className="text-sm font-bold text-[#111418] leading-tight truncate mr-2">{item.product.name}</h4>
                    <p className="text-sm font-extrabold">${(item.product.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center bg-[#f0f2f4] rounded-lg h-7 px-1">
                      <button 
                        onClick={() => updateQuantity(item.product.id, -1)}
                        className="size-5 flex items-center justify-center hover:bg-white rounded-md transition-all"
                      >
                        <span className="material-symbols-outlined text-[14px]">remove</span>
                      </button>
                      <span className="px-3 text-xs font-bold">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.product.id, 1)}
                        className="size-5 flex items-center justify-center hover:bg-white rounded-md transition-all"
                      >
                        <span className="material-symbols-outlined text-[14px]">add</span>
                      </button>
                    </div>
                    <p className="text-xs text-gray-400 font-medium">${item.product.price.toFixed(2)} ea</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-5 bg-[#fcfdfe] border-t border-[#e5e7eb]">
          <div className="grid grid-cols-3 gap-2 mb-6">
            <button className="flex flex-col items-center justify-center gap-1.5 py-3 rounded-xl bg-white border border-[#e5e7eb] hover:border-primary group transition-all">
              <span className="material-symbols-outlined text-[20px] text-gray-500 group-hover:text-primary">sell</span>
              <span className="text-[10px] font-bold uppercase tracking-tight">Discount</span>
            </button>
            <button className="flex flex-col items-center justify-center gap-1.5 py-3 rounded-xl bg-white border border-[#e5e7eb] hover:border-primary group transition-all">
              <span className="material-symbols-outlined text-[20px] text-gray-500 group-hover:text-primary">assignment_return</span>
              <span className="text-[10px] font-bold uppercase tracking-tight">Return</span>
            </button>
            <button className="flex flex-col items-center justify-center gap-1.5 py-3 rounded-xl bg-white border border-[#e5e7eb] hover:border-primary group transition-all">
              <span className="material-symbols-outlined text-[20px] text-gray-500 group-hover:text-primary">settings</span>
              <span className="text-[10px] font-bold uppercase tracking-tight">Settings</span>
            </button>
          </div>

          <div className="flex flex-col gap-2 mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 font-medium">Subtotal</span>
              <span className="font-bold">${totals.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 font-medium">Tax (8%)</span>
              <span className="font-bold">${totals.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center mt-2 pt-2 border-t border-dashed border-[#e5e7eb]">
              <span className="text-[#111418] font-extrabold text-lg">Total</span>
              <span className="text-primary font-black text-2xl">${totals.total.toFixed(2)}</span>
            </div>
          </div>

          <button 
            disabled={cart.length === 0 || checkoutState !== 'idle'}
            onClick={handlePay}
            className="w-full flex items-center justify-center gap-3 bg-primary text-white h-16 rounded-xl shadow-lg shadow-primary/40 hover:scale-[1.01] active:scale-100 transition-all disabled:opacity-50 disabled:scale-100"
          >
            <span className="text-lg font-extrabold uppercase tracking-wider">Pay & Checkout</span>
            <span className="material-symbols-outlined">payments</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Terminal;
