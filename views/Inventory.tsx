
import React, { useState } from 'react';
import { Product } from '../types';

interface InventoryProps {
  products: Product[];
}

const Inventory: React.FC<InventoryProps> = ({ products }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="flex-1 overflow-y-auto p-10 bg-[#f6f7f8] custom-scrollbar">
      <div className="max-w-[1200px] mx-auto space-y-8">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-black tracking-tight">Inventory & Products</h1>
            <p className="text-gray-500 mt-1">Monitor and manage your store's stock levels and catalogs.</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-6 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-bold shadow-sm hover:bg-gray-50 transition-all active:scale-95">
              <span className="material-symbols-outlined text-lg">download</span>
              Export CSV
            </button>
            <button className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-lg text-sm font-bold shadow-sm hover:bg-blue-700 transition-all active:scale-95">
              <span className="material-symbols-outlined text-lg">add_circle</span>
              Add New Product
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-bold text-gray-400 uppercase">Total Items</span>
              <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg text-lg">inventory</span>
            </div>
            <p className="text-3xl font-black">1,248</p>
            <p className="text-xs text-green-600 font-bold flex items-center gap-1 mt-1">
              <span className="material-symbols-outlined text-[14px]">arrow_upward</span> 2.4% <span className="text-gray-400 font-normal">from last month</span>
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-bold text-gray-400 uppercase">Out of Stock</span>
              <span className="material-symbols-outlined text-red-500 bg-red-50 p-2 rounded-lg text-lg">error</span>
            </div>
            <p className="text-3xl font-black">12</p>
            <p className="text-xs text-red-500 font-bold uppercase mt-1">Critical Attention</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-bold text-gray-400 uppercase">Low Stock Alerts</span>
              <span className="material-symbols-outlined text-amber-500 bg-amber-50 p-2 rounded-lg text-lg">warning</span>
            </div>
            <p className="text-3xl font-black">45</p>
            <p className="text-xs text-amber-500 font-bold uppercase mt-1">Restock Soon</p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-gray-400 mr-2">Filter by:</span>
            <button className="flex items-center gap-2 bg-[#f0f2f4] px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#e8eaed] transition-colors">
              All Categories <span className="material-symbols-outlined text-lg">expand_more</span>
            </button>
            <button className="flex items-center gap-2 bg-[#f0f2f4] px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#e8eaed] transition-colors">
              Stock Level <span className="material-symbols-outlined text-lg">expand_more</span>
            </button>
          </div>
          <div className="flex items-center gap-2">
             <button className="p-2 text-gray-500 hover:text-primary transition-colors"><span className="material-symbols-outlined">filter_list</span></button>
             <button className="p-2 text-gray-500 hover:text-primary transition-colors"><span className="material-symbols-outlined">view_column</span></button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden overflow-x-auto">
          <table className="w-full text-left min-w-[800px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase w-32">SKU</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Product Name</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Category</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Price</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Stock Level</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map(p => (
                <React.Fragment key={p.id}>
                  <tr 
                    onClick={() => toggleExpand(p.id)}
                    className={`group transition-colors cursor-pointer ${expandedId === p.id ? 'bg-primary/5' : 'hover:bg-gray-50'}`}
                  >
                    <td className="px-6 py-4 font-mono text-xs text-gray-500">{p.sku}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="size-10 rounded bg-gray-100 bg-cover bg-center border border-gray-200 shadow-sm shrink-0" style={{ backgroundImage: `url("${p.image}")` }}></div>
                        <span className="font-bold text-sm text-[#111418]">{p.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 capitalize">{p.category}</td>
                    <td className="px-6 py-4 text-sm font-bold">${p.price.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-sm font-bold">{p.stock} Units</span>
                        {p.stock === 0 ? (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-700 w-fit uppercase tracking-wider">Out of Stock</span>
                        ) : p.stock < 10 ? (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700 w-fit uppercase tracking-wider">Low Stock</span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-100 text-green-700 w-fit uppercase tracking-wider">In Stock</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 text-gray-400 hover:text-primary transition-colors">
                          <span className={`material-symbols-outlined transition-transform duration-200 ${expandedId === p.id ? 'rotate-180 text-primary' : ''}`}>
                            expand_more
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                  
                  {/* Expanded Content */}
                  {expandedId === p.id && (
                    <tr className="bg-primary/[0.02]">
                      <td colSpan={6} className="px-6 py-8 border-b border-gray-200">
                        <div className="flex gap-10 items-start animate-in fade-in slide-in-from-top-2 duration-300">
                          <div className="size-48 rounded-xl bg-cover bg-center border border-gray-200 shadow-md shrink-0" style={{ backgroundImage: `url("${p.image}")` }}></div>
                          <div className="flex-1 space-y-6 max-w-2xl">
                            <div>
                              <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.1em] mb-2">Full Description</h4>
                              <p className="text-sm text-gray-600 leading-relaxed bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                                {p.description || "No description available for this product. Use the Edit tool to add one."}
                              </p>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                              <div>
                                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.1em] mb-1">Created At</h4>
                                <p className="text-sm font-bold text-[#111418]">{p.createdAt || "N/A"}</p>
                              </div>
                              <div>
                                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.1em] mb-1">Internal Reference</h4>
                                <p className="text-sm font-mono text-primary font-bold">{p.sku}</p>
                              </div>
                              <div className="col-span-2 sm:col-span-1 flex items-end justify-end">
                                <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-700 hover:border-primary hover:text-primary transition-all flex items-center gap-2">
                                  <span className="material-symbols-outlined text-[16px]">edit</span>
                                  Edit Details
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
          <div className="px-6 py-4 bg-gray-50 flex items-center justify-between text-sm text-gray-500">
             <span>Showing {products.length} entries</span>
             <div className="flex gap-1">
                <button className="px-3 py-1 bg-white border border-gray-200 rounded-md hover:bg-gray-100 transition-colors shadow-sm text-xs font-bold">Prev</button>
                <button className="px-3 py-1 bg-primary text-white border border-primary rounded-md shadow-sm shadow-primary/20 text-xs font-bold">1</button>
                <button className="px-3 py-1 bg-white border border-gray-200 rounded-md hover:bg-gray-100 transition-colors shadow-sm text-xs font-bold">Next</button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
