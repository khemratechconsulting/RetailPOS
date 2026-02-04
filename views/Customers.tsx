
import React, { useState } from 'react';
import { Customer } from '../types';

interface CustomersProps {
  customers: Customer[];
}

const Customers: React.FC<CustomersProps> = ({ customers }) => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const filteredCustomers = customers.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || 
                          c.email.toLowerCase().includes(search.toLowerCase()) ||
                          c.phone.includes(search);
    const matchesFilter = filter === 'All' || c.tier === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex-1 overflow-y-auto p-10 bg-[#f6f7f8] custom-scrollbar">
      <div className="max-w-[1200px] mx-auto space-y-8">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-black tracking-tight">Customer Management</h1>
            <p className="text-gray-500 mt-1">Track loyalty, purchase history, and engagement metrics.</p>
          </div>
          <div className="flex gap-3">
             <button className="flex items-center gap-2 px-6 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-bold shadow-sm hover:bg-gray-50">
               <span className="material-symbols-outlined text-lg">download</span> Export
             </button>
             <button className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-lg text-sm font-bold shadow-sm hover:bg-blue-700">
               <span className="material-symbols-outlined text-lg">person_add</span> Add Customer
             </button>
          </div>
        </div>

        {/* High-level Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex justify-between items-center text-gray-400 mb-2">
                 <span className="text-[10px] font-black uppercase tracking-widest">Total Clients</span>
                 <span className="material-symbols-outlined text-primary">groups</span>
              </div>
              <p className="text-3xl font-black">1,842</p>
              <div className="flex items-center gap-1.5 mt-2">
                 <span className="text-green-600 text-xs font-bold">+24</span>
                 <span className="text-gray-400 text-xs">new this week</span>
              </div>
           </div>
           <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex justify-between items-center text-gray-400 mb-2">
                 <span className="text-[10px] font-black uppercase tracking-widest">Loyalty Points</span>
                 <span className="material-symbols-outlined text-orange-500">star</span>
              </div>
              <p className="text-3xl font-black">48.2k</p>
              <div className="flex items-center gap-1.5 mt-2">
                 <span className="text-orange-600 text-xs font-bold">12.4k</span>
                 <span className="text-gray-400 text-xs">redeemable now</span>
              </div>
           </div>
           <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex justify-between items-center text-gray-400 mb-2">
                 <span className="text-[10px] font-black uppercase tracking-widest">Avg. Lifetime Value</span>
                 <span className="material-symbols-outlined text-emerald-500">trending_up</span>
              </div>
              <p className="text-3xl font-black">$412.50</p>
              <div className="flex items-center gap-1.5 mt-2">
                 <span className="text-green-600 text-xs font-bold">5.2%</span>
                 <span className="text-gray-400 text-xs">growth YoY</span>
              </div>
           </div>
        </div>

        {/* Table Controls */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
           <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full md:w-auto">
              {['All', 'VIP', 'Regular', 'New'].map(t => (
                <button 
                  key={t}
                  onClick={() => setFilter(t)}
                  className={`px-5 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${filter === t ? 'bg-primary text-white' : 'text-gray-500 hover:bg-gray-100'}`}
                >
                  {t} Clients
                </button>
              ))}
           </div>
           <div className="relative w-full md:w-80">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[18px]">search</span>
              <input 
                type="text" 
                placeholder="Search by name, email, phone..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#f0f2f4] border-none rounded-lg text-sm focus:ring-primary focus:ring-2 font-medium"
              />
           </div>
        </div>

        {/* Customer Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden overflow-x-auto">
           <table className="w-full text-left min-w-[800px]">
              <thead>
                 <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Customer</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Contact</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Tier</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Total Spent</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Loyalty</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Last Visit</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase text-right">Actions</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                 {filteredCustomers.length > 0 ? filteredCustomers.map(customer => (
                    <tr key={customer.id} className="hover:bg-gray-50/50 group transition-colors">
                       <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                             <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                                {customer.initials}
                             </div>
                             <div>
                                <p className="font-bold text-sm text-[#111418]">{customer.name}</p>
                                <p className="text-[10px] text-gray-400 font-mono tracking-tighter">{customer.id}</p>
                             </div>
                          </div>
                       </td>
                       <td className="px-6 py-4">
                          <div className="space-y-0.5">
                             <p className="text-xs font-medium text-gray-600">{customer.email}</p>
                             <p className="text-[11px] text-gray-400">{customer.phone}</p>
                          </div>
                       </td>
                       <td className="px-6 py-4">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            customer.tier === 'VIP' ? 'bg-amber-100 text-amber-700' : 
                            customer.tier === 'Regular' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'
                          }`}>
                             {customer.tier}
                          </span>
                       </td>
                       <td className="px-6 py-4 text-sm font-black text-[#111418] tracking-tight">
                          ${customer.totalSpent.toFixed(2)}
                       </td>
                       <td className="px-6 py-4">
                          <div className="flex items-center gap-1.5">
                             <span className="material-symbols-outlined text-orange-500 text-[16px] fill-current">star</span>
                             <span className="text-sm font-bold">{customer.points}</span>
                          </div>
                       </td>
                       <td className="px-6 py-4 text-sm text-gray-500">
                          {customer.lastVisit}
                       </td>
                       <td className="px-6 py-4 text-right">
                          <button className="p-1.5 opacity-0 group-hover:opacity-100 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-primary transition-all">
                             <span className="material-symbols-outlined text-[18px]">more_vert</span>
                          </button>
                       </td>
                    </tr>
                 )) : (
                   <tr>
                     <td colSpan={7} className="px-6 py-20 text-center">
                        <div className="flex flex-col items-center gap-3 text-gray-300">
                           <span className="material-symbols-outlined text-[48px]">person_search</span>
                           <p className="text-sm font-bold">No customers found matching your criteria</p>
                        </div>
                     </td>
                   </tr>
                 )}
              </tbody>
           </table>
        </div>
      </div>
    </div>
  );
};

export default Customers;
