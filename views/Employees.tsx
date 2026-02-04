
import React from 'react';
import { Employee } from '../types';

interface EmployeesProps {
  employees: Employee[];
}

const Employees: React.FC<EmployeesProps> = ({ employees }) => {
  return (
    <div className="flex-1 overflow-y-auto p-10 bg-[#f6f7f8] custom-scrollbar">
      <div className="max-w-[1200px] mx-auto space-y-8">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-black tracking-tight">User & Role Management</h1>
            <p className="text-gray-500 mt-1">Configure store access, permissions, and security protocols.</p>
          </div>
          <div className="flex gap-3">
             <button className="flex items-center gap-2 px-6 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-bold shadow-sm hover:bg-gray-50">
               <span className="material-symbols-outlined text-lg">history</span> Audit Logs
             </button>
             <button className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-lg text-sm font-bold shadow-sm hover:bg-blue-700">
               <span className="material-symbols-outlined text-lg">person_add</span> New User
             </button>
          </div>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex justify-between items-center text-gray-400 mb-2">
                 <span className="text-xs font-bold uppercase">Total Employees</span>
                 <span className="material-symbols-outlined">groups</span>
              </div>
              <p className="text-3xl font-black">42</p>
              <p className="text-xs text-green-600 font-bold mt-1">+3 this month</p>
           </div>
           <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex justify-between items-center text-gray-400 mb-2">
                 <span className="text-xs font-bold uppercase">Active Now</span>
                 <span className="material-symbols-outlined text-green-500">circle</span>
              </div>
              <p className="text-3xl font-black">12</p>
              <p className="text-xs text-gray-400 font-medium mt-1">Across 3 locations</p>
           </div>
           <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex justify-between items-center text-gray-400 mb-2">
                 <span className="text-xs font-bold uppercase">Security Status</span>
                 <span className="material-symbols-outlined text-primary">verified_user</span>
              </div>
              <p className="text-3xl font-black">100%</p>
              <p className="text-xs text-gray-400 font-medium mt-1">2FA Enabled for Admins</p>
           </div>
        </div>

        {/* Employee Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
           <div className="flex border-b border-gray-100">
              {['All Users', 'Admins', 'Managers', 'Cashiers'].map((tab, idx) => (
                <button key={tab} className={`px-6 py-4 text-sm font-bold border-b-2 transition-colors ${idx === 0 ? 'border-primary text-primary' : 'border-transparent text-gray-400 hover:text-gray-600'}`}>
                   {tab}
                </button>
              ))}
           </div>
           <table className="w-full text-left">
              <thead>
                 <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Employee</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Role</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Status</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Last Login</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase text-right">Actions</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                 {employees.map(emp => (
                    <tr key={emp.id} className="hover:bg-gray-50/50">
                       <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                             <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                                {emp.initials}
                             </div>
                             <div>
                                <p className="font-bold text-sm">{emp.name}</p>
                                <p className="text-xs text-gray-400">{emp.email}</p>
                             </div>
                          </div>
                       </td>
                       <td className="px-6 py-4">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${emp.role === 'Admin' ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-600'}`}>
                             {emp.role}
                          </span>
                       </td>
                       <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                             <span className={`size-2 rounded-full ${emp.status === 'Active' ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                             <span className="text-sm font-medium">{emp.status}</span>
                          </div>
                       </td>
                       <td className="px-6 py-4 text-sm text-gray-400">{emp.lastLogin}</td>
                       <td className="px-6 py-4 text-right">
                          <button className="text-primary text-sm font-bold hover:underline">Edit Permissions</button>
                       </td>
                    </tr>
                 ))}
              </tbody>
           </table>
           <div className="px-6 py-4 bg-gray-50 flex items-center justify-between border-t border-gray-100">
              <p className="text-sm text-gray-500">Showing 1-4 of 42 employees</p>
              <div className="flex gap-2">
                <button className="px-4 py-1 bg-white border border-gray-200 rounded text-sm font-bold hover:bg-gray-50">Previous</button>
                <button className="px-4 py-1 bg-white border border-gray-200 rounded text-sm font-bold hover:bg-gray-50">Next</button>
              </div>
           </div>
        </div>

        {/* Sub-section: Permissions Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 space-y-6">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">gavel</span>
                Permissions Preview: Store Manager
              </h3>
              <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
                 <div className="space-y-8">
                    <div>
                       <h4 className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-4">Sales Operations</h4>
                       <div className="grid grid-cols-2 gap-4">
                          {[
                            { label: 'Process Sales', checked: true },
                            { label: 'Apply Discounts', checked: true },
                            { label: 'Authorize Refunds', checked: true },
                            { label: 'Void Transactions', checked: false }
                          ].map(p => (
                            <label key={p.label} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                               <span className="text-sm font-bold">{p.label}</span>
                               <input type="checkbox" checked={p.checked} readOnly className="rounded border-gray-300 text-primary focus:ring-primary size-5" />
                            </label>
                          ))}
                       </div>
                    </div>
                    <div>
                       <h4 className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-4">Inventory & Stock</h4>
                       <div className="grid grid-cols-2 gap-4">
                          {[
                            { label: 'View Stock Levels', checked: true },
                            { label: 'Edit Product Info', checked: true },
                          ].map(p => (
                            <label key={p.label} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                               <span className="text-sm font-bold">{p.label}</span>
                               <input type="checkbox" checked={p.checked} readOnly className="rounded border-gray-300 text-primary focus:ring-primary size-5" />
                            </label>
                          ))}
                       </div>
                    </div>
                 </div>
                 <div className="mt-10 pt-8 border-t border-gray-100 flex justify-end gap-3">
                    <button className="px-6 py-2.5 rounded-lg bg-gray-100 text-sm font-bold">Reset to Template</button>
                    <button className="px-6 py-2.5 rounded-lg bg-primary text-white text-sm font-bold shadow-md shadow-primary/20">Save Permissions</button>
                 </div>
              </div>
           </div>

           <div className="space-y-6">
              <h3 className="text-xl font-bold flex items-center gap-2">
                 <span className="material-symbols-outlined text-primary">security</span> Security Guard
              </h3>
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
                 <div className="flex items-start gap-3 mb-4">
                    <span className="material-symbols-outlined text-primary">info</span>
                    <div>
                       <p className="text-sm font-bold text-primary leading-tight">Role Optimization Suggestion</p>
                       <p className="text-xs text-gray-500 mt-1 leading-relaxed">3 Cashiers have 'Admin' level refund permissions. We recommend limiting this to Managers for better audit control.</p>
                    </div>
                 </div>
                 <button className="w-full py-2.5 bg-primary text-white rounded-lg text-sm font-bold shadow-md shadow-primary/20 hover:bg-blue-700 transition-colors">Apply Policy Update</button>
              </div>
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
                 <p className="text-sm font-black uppercase text-gray-400 tracking-widest">Quick Security Actions</p>
                 <div className="space-y-2">
                    <button className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:border-red-500 hover:text-red-500 transition-colors text-sm font-bold">
                       Force Password Reset (All) <span className="material-symbols-outlined text-[18px]">lock_reset</span>
                    </button>
                    <button className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:border-primary transition-colors text-sm font-bold">
                       Download User Access Report <span className="material-symbols-outlined text-[18px]">download</span>
                    </button>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Employees;
