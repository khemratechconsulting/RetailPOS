import { CUSTOMERS, EMPLOYEES, PRODUCTS, SALES } from './constants';
import { CartItem, Product, View } from './types';
import React, { useCallback, useMemo, useState } from 'react';

import Customers from './views/Customers';
import Employees from './views/Employees';
import Inventory from './views/Inventory';
import Reports from './views/Reports';
import Sales from './views/Sales';
import Terminal from './views/Terminal';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('Terminal');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

  // Update clock
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const addToCart = useCallback((product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => item.product.id === product.id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  }, []);

  const updateQuantity = useCallback((productId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.product.id === productId) {
        const newQty = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(item => item.quantity > 0));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const totals = useMemo(() => {
    const subtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
    const tax = subtotal * 0.08;
    return { subtotal, tax, total: subtotal + tax };
  }, [cart]);

  const renderView = () => {
    switch (currentView) {
      case 'Terminal':
        return <Terminal 
          products={PRODUCTS} 
          addToCart={addToCart} 
          cart={cart}
          updateQuantity={updateQuantity}
          totals={totals}
          clearCart={clearCart}
        />;
      case 'Inventory':
        return <Inventory products={PRODUCTS} />;
      case 'Sales':
        return <Sales sales={SALES} />;
      case 'Reports':
        return <Reports />;
      case 'Customers':
        return <Customers customers={CUSTOMERS} />;
      case 'Employees':
        return <Employees employees={EMPLOYEES} />;
      default:
        return <div className="p-10 text-center">View "{currentView}" is coming soon.</div>;
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <header className="flex items-center justify-between border-b border-[#e5e7eb] bg-white px-6 py-3 shrink-0">
        <div className="flex items-center gap-4 text-[#111418]">
          <div className="size-8 text-primary">
            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path clipRule="evenodd" d="M24 18.4228L42 11.475V34.3663C42 34.7796 41.7457 35.1504 41.3601 35.2992L24 42V18.4228Z" fill="currentColor" fillRule="evenodd"></path>
              <path clipRule="evenodd" d="M24 8.18819L33.4123 11.574L24 15.2071L14.5877 11.574L24 8.18819ZM9 15.8487L21 20.4805V37.6263L9 32.9945V15.8487ZM27 37.6263V20.4805L39 15.8487V32.9945L27 37.6263ZM25.354 2.29885C24.4788 1.98402 23.5212 1.98402 22.646 2.29885L4.98454 8.65208C3.7939 9.08038 3 10.2097 3 11.475V34.3663C3 36.0196 4.01719 37.5026 5.55962 38.098L22.9197 44.7987C23.6149 45.0671 24.3851 45.0671 25.0803 44.7987L42.4404 38.098C43.9828 37.5026 45 36.0196 45 34.3663V11.475C45 10.2097 44.2061 9.08038 43.0155 8.65208L25.354 2.29885Z" fill="currentColor" fillRule="evenodd"></path>
            </svg>
          </div>
          <h2 className="text-lg font-bold leading-tight tracking-tight">RetailPOS <span className="text-primary">Pro</span></h2>
        </div>

        <nav className="flex items-center gap-6">
          <div className="hidden lg:flex items-center gap-6 no-print">
            {(['Terminal', 'Inventory', 'Sales', 'Reports', 'Customers', 'Employees'] as View[]).map(view => (
              <button 
                key={view}
                onClick={() => setCurrentView(view)}
                className={`text-sm font-semibold transition-colors ${currentView === view ? 'text-primary' : 'text-gray-500 hover:text-primary'}`}
              >
                {view}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-2 border-l border-[#e5e7eb] pl-6 no-print">
            <div className="flex items-center gap-2 bg-[#f0f2f4] px-3 py-1.5 rounded-lg">
              <span className="material-symbols-outlined text-green-500 text-[18px]">wifi</span>
              <span className="text-xs font-bold uppercase tracking-wider">Online</span>
            </div>
            <div className="flex items-center gap-2 bg-[#f0f2f4] px-3 py-1.5 rounded-lg">
              <span className="material-symbols-outlined text-[18px]">schedule</span>
              <span className="text-xs font-bold">{currentTime}</span>
            </div>
            <div className="flex items-center gap-3 ml-2">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold leading-none">Bong Thom</p>
                <p className="text-[10px] text-gray-500 font-medium">Station #04</p>
              </div>
              <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-9 border-2 border-primary/20" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDdR41TnNGS_iGW93hg6Mc2JzkDYbXCObJVntLLEdjpHBfWDhnX9hFqglxQe5nG7_Ei-qnDwuZHItn1IOTcU5LJl-gybDEOSGf1lSHr56arINvzUdHDl0ufee4rZ_5PzEwZikJj3B7EgISVVx5LFuEOzelXYiULLrBrEzC4CvC91AaUUyzxp1D0h2oE5ziL2rOKy4L1B2KBG4EzXH2SORXYM9JomejGiEXOLvGti6adJhqqsDCf7BRmzGKBCoifVETMs80v0DpmO-Q")' }}></div>
            </div>
          </div>
        </nav>
      </header>

      <main className="flex-1 flex overflow-hidden">
        {renderView()}
      </main>

      <footer className="h-10 bg-[#f0f2f4] border-t border-[#e5e7eb] flex items-center justify-between px-6 shrink-0 text-gray-500 no-print">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1.5">
            <kbd className="px-1.5 py-0.5 rounded bg-white text-[10px] font-bold border border-gray-200 shadow-sm">F1</kbd>
            <span className="text-[11px] font-medium">Search</span>
          </div>
          <div className="flex items-center gap-1.5">
            <kbd className="px-1.5 py-0.5 rounded bg-white text-[10px] font-bold border border-gray-200 shadow-sm">F5</kbd>
            <span className="text-[11px] font-medium">New Sale</span>
          </div>
          <div className="flex items-center gap-1.5">
            <kbd className="px-1.5 py-0.5 rounded bg-white text-[10px] font-bold border border-gray-200 shadow-sm">Space</kbd>
            <span className="text-[11px] font-medium">Checkout</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="size-2 bg-green-500 rounded-full"></span>
            <span className="text-[11px] font-bold uppercase tracking-widest">Printer Ready</span>
          </div>
          <p className="text-[11px] font-medium">v4.2.1-stable</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
