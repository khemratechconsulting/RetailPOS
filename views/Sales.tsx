
import React, { useState, useRef, useMemo } from 'react';
import { Sale } from '../types';

interface SalesProps {
  sales: Sale[];
}

const Sales: React.FC<SalesProps> = ({ sales }) => {
  const [statusFilter, setStatusFilter] = useState('All');
  const [salesPersonFilter, setSalesPersonFilter] = useState('All');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  
  const [isExportingPDF, setIsExportingPDF] = useState(false);
  const [isExportingExcel, setIsExportingExcel] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);

  // Get unique sales people from the data
  const salesPeople = useMemo(() => {
    const names = sales.map(s => s.salesPersonName);
    return ['All', ...Array.from(new Set(names))];
  }, [sales]);

  const filteredSales = useMemo(() => {
    return sales.filter(s => {
      const matchesStatus = statusFilter === 'All' || s.status === statusFilter;
      const matchesPerson = salesPersonFilter === 'All' || s.salesPersonName === salesPersonFilter;
      
      let matchesDate = true;
      if (startDate || endDate) {
        const saleDate = new Date(s.date.split(' ')[0]); // Parse YYYY-MM-DD
        if (startDate && saleDate < new Date(startDate)) matchesDate = false;
        if (endDate && saleDate > new Date(endDate)) matchesDate = false;
      }

      return matchesStatus && matchesPerson && matchesDate;
    });
  }, [sales, statusFilter, salesPersonFilter, startDate, endDate]);

  const handleExportPDF = async () => {
    if (!logRef.current) return;
    setIsExportingPDF(true);

    const element = logRef.current;
    const opt = {
      margin: 0.5,
      filename: `RetailPOS_Transactions_${new Date().toISOString().split('T')[0]}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'landscape' }
    };

    try {
      // @ts-ignore
      await window.html2pdf().set(opt).from(element).save();
    } catch (err) {
      console.error("PDF Export failed:", err);
    } finally {
      setIsExportingPDF(false);
    }
  };

  const handleExportExcel = () => {
    setIsExportingExcel(true);
    
    try {
      const dataToExport = filteredSales.map(s => ({
        'Order ID': s.id,
        'Date & Time': s.date,
        'Customer': s.customer,
        'Sales Person': s.salesPersonName,
        'Items Count': s.items,
        'Total Amount ($)': s.total.toFixed(2),
        'Payment Method': s.paymentMethod,
        'Status': s.status
      }));

      // @ts-ignore
      const worksheet = XLSX.utils.json_to_sheet(dataToExport);
      // @ts-ignore
      const workbook = XLSX.utils.book_new();
      // @ts-ignore
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sales Report');
      
      const fileName = `RetailPOS_Sales_Report_${new Date().getTime()}.xlsx`;
      // @ts-ignore
      XLSX.writeFile(workbook, fileName);
    } catch (err) {
      console.error("Excel Export failed:", err);
    } finally {
      setIsExportingExcel(false);
    }
  };

  const clearFilters = () => {
    setStatusFilter('All');
    setSalesPersonFilter('All');
    setStartDate('');
    setEndDate('');
  };

  return (
    <div className="flex-1 overflow-y-auto p-10 bg-[#f6f7f8] custom-scrollbar">
      <div className="max-w-[1200px] mx-auto space-y-8">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-black tracking-tight">Transaction History</h1>
            <p className="text-gray-500 mt-1">Review and manage all past sales and refunds with advanced filtering.</p>
          </div>
          <div className="flex gap-3 no-print">
             <button 
               onClick={handleExportExcel}
               disabled={isExportingExcel}
               className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold shadow-sm transition-all bg-emerald-600 text-white hover:bg-emerald-700 active:scale-95 disabled:opacity-50`}
             >
               <span className={`material-symbols-outlined text-lg ${isExportingExcel ? 'animate-spin' : ''}`}>
                 {isExportingExcel ? 'progress_activity' : 'table_view'}
               </span>
               {isExportingExcel ? 'Exporting...' : 'Export Excel'}
             </button>
             <button 
               onClick={handleExportPDF}
               disabled={isExportingPDF}
               className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold shadow-sm transition-all border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 active:scale-95 disabled:opacity-50`}
             >
               <span className={`material-symbols-outlined text-lg ${isExportingPDF ? 'animate-spin' : ''}`}>
                 {isExportingPDF ? 'progress_activity' : 'picture_as_pdf'}
               </span>
               {isExportingPDF ? 'Processing...' : 'Export PDF'}
             </button>
          </div>
        </div>

        {/* Enhanced Filter Section */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6 no-print">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black uppercase tracking-widest text-gray-400">Report Filters</h3>
            <button 
              onClick={clearFilters}
              className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-sm">restart_alt</span> Reset All
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Sales Person</label>
              <select 
                value={salesPersonFilter}
                onChange={(e) => setSalesPersonFilter(e.target.value)}
                className="w-full h-11 bg-[#f0f2f4] border-none rounded-lg text-sm font-bold focus:ring-primary focus:ring-2"
              >
                {salesPeople.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Status</label>
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full h-11 bg-[#f0f2f4] border-none rounded-lg text-sm font-bold focus:ring-primary focus:ring-2"
              >
                {['All', 'Completed', 'Refunded', 'Pending'].map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-1">From Date</label>
              <input 
                type="date" 
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full h-11 bg-[#f0f2f4] border-none rounded-lg text-sm font-bold focus:ring-primary focus:ring-2"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-1">To Date</label>
              <input 
                type="date" 
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full h-11 bg-[#f0f2f4] border-none rounded-lg text-sm font-bold focus:ring-primary focus:ring-2"
              />
            </div>
          </div>
        </div>

        {/* The Exportable Area */}
        <div ref={logRef} className="pdf-content rounded-xl space-y-6">
          {/* Header (visible in PDF) */}
          <div className="border-b-2 border-primary pb-6 mb-8 flex justify-between items-start">
            <div>
              <h2 className="text-xl font-black">RetailPOS Pro</h2>
              <h1 className="text-2xl font-black">Transaction Log</h1>
              <p className="text-sm text-gray-500 uppercase font-bold">
                Filtered: {statusFilter} / {salesPersonFilter} / {startDate || 'Start'} to {endDate || 'Now'}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">Generated On</p>
              <p className="text-lg text-primary font-black">{new Date().toLocaleString()}</p>
            </div>
          </div>

          {/* Stats Summary - Dynamically Calculated */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
             {[
               { 
                 label: 'Total Volume', 
                 value: `$${filteredSales.reduce((acc, s) => acc + s.total, 0).toFixed(2)}`, 
                 icon: 'payments', 
                 color: 'text-primary' 
               },
               { 
                 label: 'Transaction Count', 
                 value: filteredSales.length.toString(), 
                 icon: 'receipt_long', 
                 color: 'text-orange-500' 
               },
               { 
                 label: 'Refund Volume', 
                 value: `$${filteredSales.filter(s => s.status === 'Refunded').reduce((acc, s) => acc + s.total, 0).toFixed(2)}`, 
                 icon: 'assignment_return', 
                 color: 'text-red-500' 
               },
               { 
                 label: 'Avg Sale Value', 
                 value: filteredSales.length > 0 ? `$${(filteredSales.reduce((acc, s) => acc + s.total, 0) / filteredSales.length).toFixed(2)}` : '$0.00', 
                 icon: 'analytics', 
                 color: 'text-green-500' 
               }
             ].map(stat => (
                <div key={stat.label} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                     <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</span>
                     <span className={`material-symbols-outlined text-lg ${stat.color}`}>{stat.icon}</span>
                  </div>
                  <p className="text-2xl font-black">{stat.value}</p>
                </div>
             ))}
          </div>

          {/* Sales Table */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
             <table className="w-full text-left">
                <thead>
                   <tr className="bg-gray-50 border-b border-gray-100">
                      <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Order ID</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Date & Time</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Customer</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Sales Person</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Payment</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Total</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Status</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase text-right no-print">Actions</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                   {filteredSales.length > 0 ? filteredSales.map(sale => (
                      <tr key={sale.id} className="hover:bg-gray-50/50 transition-colors group">
                         <td className="px-6 py-4 font-mono text-xs font-bold text-primary">{sale.id}</td>
                         <td className="px-6 py-4 text-sm text-gray-600">{sale.date}</td>
                         <td className="px-6 py-4">
                            <p className="text-sm font-bold">{sale.customer}</p>
                            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-tighter">{sale.items} items</p>
                         </td>
                         <td className="px-6 py-4 text-sm font-medium text-gray-700">{sale.salesPersonName}</td>
                         <td className="px-6 py-4">
                            <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
                               <span className="material-symbols-outlined text-[14px]">credit_card</span>
                               {sale.paymentMethod}
                            </div>
                         </td>
                         <td className="px-6 py-4 text-sm font-black">${sale.total.toFixed(2)}</td>
                         <td className="px-6 py-4">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              sale.status === 'Completed' ? 'bg-green-100 text-green-700' : 
                              sale.status === 'Refunded' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                            }`}>
                               {sale.status}
                            </span>
                         </td>
                         <td className="px-6 py-4 text-right no-print">
                            <button className="p-1.5 opacity-0 group-hover:opacity-100 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-primary transition-all">
                               <span className="material-symbols-outlined text-[18px]">visibility</span>
                            </button>
                         </td>
                      </tr>
                   )) : (
                     <tr>
                       <td colSpan={8} className="px-6 py-20 text-center">
                          <div className="flex flex-col items-center gap-3 text-gray-300">
                             <span className="material-symbols-outlined text-[48px]">search_off</span>
                             <p className="text-sm font-bold">No transactions match your current filters</p>
                          </div>
                       </td>
                     </tr>
                   )}
                </tbody>
             </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sales;
