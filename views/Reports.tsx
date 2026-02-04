
import React, { useState, useRef } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const data = [
  { name: 'Mon', revenue: 12000 },
  { name: 'Tue', revenue: 15000 },
  { name: 'Wed', revenue: 13500 },
  { name: 'Thu', revenue: 18000 },
  { name: 'Fri', revenue: 24000 },
  { name: 'Sat', revenue: 21000 },
  { name: 'Sun', revenue: 19500 },
];

const pieData = [
  { name: 'Credit Card', value: 50, color: '#136dec' },
  { name: 'Cash', value: 30, color: '#fb923c' },
  { name: 'Mobile Pay', value: 20, color: '#10b981' },
];

const Reports: React.FC = () => {
  const [startDate, setStartDate] = useState<string>('2023-11-01');
  const [endDate, setEndDate] = useState<string>('2023-11-07');
  const [isExporting, setIsExporting] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  const handleExportPDF = async () => {
    if (!reportRef.current) return;
    setIsExporting(true);

    const element = reportRef.current;
    const opt = {
      margin: 0.5,
      filename: `RetailPOS_Sales_Report_${startDate}_to_${endDate}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, logging: false },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    try {
      // @ts-ignore - html2pdf is globally available from the CDN
      await window.html2pdf().set(opt).from(element).save();
    } catch (err) {
      console.error("PDF Export failed:", err);
    } finally {
      setIsExporting(false);
    }
  };

  const handleClearFilters = () => {
    setStartDate('');
    setEndDate('');
  };

  return (
    <div className="flex-1 overflow-y-auto p-10 bg-[#f6f7f8] custom-scrollbar">
      <div className="max-w-[1200px] mx-auto space-y-8">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-black tracking-tight">Sales Reports & Analytics</h1>
            <p className="text-gray-500 mt-1">Monitor business performance and growth trends.</p>
          </div>
          <button 
            disabled={isExporting}
            onClick={handleExportPDF}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold shadow-sm transition-all no-print ${
              isExporting ? 'bg-gray-400 text-white cursor-wait' : 'bg-primary text-white hover:bg-blue-700 active:scale-95'
            }`}
          >
            <span className={`material-symbols-outlined text-lg ${isExporting ? 'animate-spin' : ''}`}>
              {isExporting ? 'progress_activity' : 'picture_as_pdf'}
            </span>
            {isExporting ? 'Generating PDF...' : 'Download PDF'}
          </button>
        </div>

        {/* Date Filters - Hidden in PDF automatically if needed, or by class */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4 no-print">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-primary">filter_alt</span>
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400">Filter Report Range</h3>
          </div>
          <div className="flex flex-wrap items-end gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-gray-500 ml-1">Start Date</label>
              <input 
                type="date" 
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="h-11 px-4 bg-[#f0f2f4] border-none rounded-lg text-sm font-semibold focus:ring-primary focus:ring-2 min-w-[180px]"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-gray-500 ml-1">End Date</label>
              <input 
                type="date" 
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="h-11 px-4 bg-[#f0f2f4] border-none rounded-lg text-sm font-semibold focus:ring-primary focus:ring-2 min-w-[180px]"
              />
            </div>
            <div className="flex items-center gap-2 h-11">
              <button 
                className="px-6 h-full bg-primary/10 text-primary rounded-lg text-sm font-bold hover:bg-primary/20 transition-all"
                onClick={() => alert(`Report data updated for ${startDate} to ${endDate}`)}
              >
                Apply Range
              </button>
              <button 
                onClick={handleClearFilters}
                className="px-4 h-full text-gray-400 hover:text-red-500 transition-colors"
                title="Clear Filters"
              >
                <span className="material-symbols-outlined">restart_alt</span>
              </button>
            </div>
          </div>
        </div>

        {/* The Exportable Area */}
        <div ref={reportRef} className="space-y-8 pdf-content rounded-xl">
          {/* Branded Header (Hidden in app, shown in PDF via logic if needed, or always visible) */}
          <div className="border-b-2 border-primary pb-6 flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="size-6 text-primary">
                  <svg fill="currentColor" viewBox="0 0 48 48">
                    <path d="M24 18.4228L42 11.475V34.3663C42 34.7796 41.7457 35.1504 41.3601 35.2992L24 42V18.4228Z"></path>
                  </svg>
                </div>
                <h2 className="text-xl font-black">RetailPOS Pro</h2>
              </div>
              <h1 className="text-2xl font-black">Sales Performance Report</h1>
              <p className="text-sm text-gray-500">Store Station #04 | Generated on {new Date().toLocaleDateString()}</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Reporting Period</p>
              <p className="text-lg text-primary font-black">{startDate || 'N/A'} — {endDate || 'Present'}</p>
            </div>
          </div>

          {/* Key Metrics Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
                  <span className="material-symbols-outlined">payments</span>
                </div>
                <span className="text-[#07883b] bg-emerald-50 px-2 py-1 rounded text-xs font-bold">+12.5%</span>
              </div>
              <p className="text-gray-500 text-sm font-medium">Gross Profit</p>
              <p className="text-2xl font-black mt-1">$12,450.00</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 rounded-lg bg-orange-50 text-orange-600">
                  <span className="material-symbols-outlined">receipt_long</span>
                </div>
                <span className="text-red-500 bg-red-50 px-2 py-1 rounded text-xs font-bold">-2.1%</span>
              </div>
              <p className="text-gray-500 text-sm font-medium">Transactions</p>
              <p className="text-2xl font-black mt-1">1,240</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                  <span className="material-symbols-outlined">shopping_bag</span>
                </div>
                <span className="text-[#07883b] bg-emerald-50 px-2 py-1 rounded text-xs font-bold">+5.4%</span>
              </div>
              <p className="text-gray-500 text-sm font-medium">Avg. Order Value</p>
              <p className="text-2xl font-black mt-1">$45.20</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Revenue Chart */}
            <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
               <div className="flex justify-between items-center mb-6">
                  <div>
                     <h3 className="text-lg font-bold">Daily Revenue Trends</h3>
                     <p className="text-xs text-gray-400">Performance for selected period</p>
                  </div>
                  <div className="text-right">
                     <p className="text-primary text-xl font-black">$84,200.00</p>
                     <p className="text-green-600 text-xs font-bold">+8.2% total growth</p>
                  </div>
               </div>
               <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                     <AreaChart data={data}>
                        <defs>
                          <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#136dec" stopOpacity={0.1}/>
                            <stop offset="95%" stopColor="#136dec" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f2f4" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                        <YAxis hide />
                        <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                        <Area type="monotone" dataKey="revenue" stroke="#136dec" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                     </AreaChart>
                  </ResponsiveContainer>
               </div>
            </div>

            {/* Payment Methods */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col">
               <h3 className="text-lg font-bold mb-6">Payment Methods</h3>
               <div className="flex-1 flex flex-col items-center justify-center">
                  <div className="h-[180px] w-full">
                     <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                           <Pie
                              data={pieData}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={80}
                              paddingAngle={5}
                              dataKey="value"
                           >
                              {pieData.map((entry, index) => (
                                 <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                           </Pie>
                        </PieChart>
                     </ResponsiveContainer>
                  </div>
                  <div className="mt-6 w-full space-y-3">
                     {pieData.map(item => (
                        <div key={item.name} className="flex items-center justify-between text-sm">
                           <div className="flex items-center gap-2">
                              <div className="size-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                              <span className="text-gray-500 font-medium">{item.name}</span>
                           </div>
                           <span className="font-bold">{item.value}%</span>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
