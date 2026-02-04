
import { Product, Employee, Sale, Customer } from './types';

export const CATEGORIES = [
  { id: 'all', name: 'All Items', icon: 'grid_view' },
  { id: 'apparel', name: 'Apparel', icon: 'apparel' },
  { id: 'electronics', name: 'Electronics', icon: 'devices' },
  { id: 'home', name: 'Home & Living', icon: 'home' },
  { id: 'accessories', name: 'Accessories', icon: 'diamond' },
  { id: 'sale', name: 'Sale', icon: 'sell', color: 'text-red-500' },
];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    sku: 'TS-20349',
    name: 'Classic T-Shirt',
    category: 'apparel',
    price: 25.00,
    stock: 42,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxwowcSwZA-fADvjnjPRFbomHfRNGNn06psv-OmHwhTxMmvkYCfx75rqc0O7-yrAvQgFZFSMc2_puci0_KXwjDeCFp0hnI-pcneh0fcfdSpBKAzsssKUpihM_-wzMbzgZjWznbEkJHz1NRSt80ny1IC4T5CgU_L5JUt5QaPjhF1Qgy7I_oXxS4ssEVf5rOlPy_BBATePZXT_0nfP9ycNi95LpVbVMeEUSP-UFkS_btNwmRVNQKeNRH6zMA-RPjHFIpATPSzDLp3Tg',
    description: 'High-quality 100% organic cotton classic-cut t-shirt. Breathable fabric perfect for everyday wear. Available in multiple sizes and colors.',
    createdAt: '2023-05-12'
  },
  {
    id: '2',
    sku: 'DJ-11202',
    name: 'Denim Jacket',
    category: 'apparel',
    price: 85.00,
    stock: 12,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCb9ORhJBcdyYS0XeT2PleXO_JqWZH9T91yBUksm2bCx2mn2RrShE2t2YuG2bMIzhedv-hYKWnNCJAxCa2hLosT6bV9BxeREXUw3UNVFPoFcBZ45CmYuJmNnsFs2d_VaCLdIjblY21nTDNfydlkLaDe6ujwNejL4s0qLPuLt8kD-Oz51LPXwkV8rNtN4xlOaw4ZajkMgRHcMZ25ShPxBij18eg8SAS2Da5arfQ3IYLKdoC2iXRnSxPqgGQ-fe8nr0ogxjyuhQobi9Q',
    description: 'Vintage-washed denim jacket featuring heavy-duty copper buttons and reinforced stitching. A timeless addition to any wardrobe.',
    createdAt: '2023-06-20'
  },
  {
    id: '3',
    sku: 'LB-44021',
    name: 'Leather Belt',
    category: 'accessories',
    price: 40.00,
    stock: 0,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7xgBAPosTSOdqt6s7ts2TYmyEMY5tObjA9QklbgogQKRMtFpBNhIZ0sCIzQOzNLdCtb8YU9mOOqXs2efHM8MSG6ZszJnlvI6qYvlT3cdC3ZSU0tdZVsOhpeUzgfc29KT8o0wrLg4Z05IWYqHxvGIX5h3PL5RIfhs11BcZyE4IQW23ZAmsa5ltRmgCXO5KVUGVYMHvGFtUMmtz8I5XjObY-eiakrdxoILiTMwq9hVphd2IoST6Pjd-5UgbEDjeNTafKDJLHHWdkiY',
    description: 'Handcrafted full-grain leather belt with a brushed nickel buckle. Durable construction designed to age beautifully with use.',
    createdAt: '2023-08-15'
  },
  {
    id: '4',
    sku: 'WH-99812',
    name: 'Wireless Headphones',
    category: 'electronics',
    price: 199.00,
    stock: 15,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBVUQK3QQQRssswPS0lObhP3BMqSY4O_6KZL7D4hcIgT7tjX_pS3CngCgHN81W9vVvPM-XMgVPBjCiC5VgE8gY5hYwxIWZEq7HZ_-0mg-vIaetjlMaxIcyPB2JZ3xnFpaFtWUG3CmuPRo8-L1vCwLqrKy-OSaBv6uu6n92Rw3RvF9qvPkbhndxHpfQx70fOqr_GDJp-QIVk7HJF5HUNoSUoaBvHddmNP5txGvrMG3QqsH-MYUMOIBnAQCNqunMQ9CbGn7GuDW98OTA',
    description: 'Premium noise-canceling wireless headphones with 40-hour battery life. Featuring hi-res audio and ergonomic memory foam cushions.',
    createdAt: '2023-10-01'
  },
  {
    id: '5',
    sku: 'SH-22310',
    name: 'Summer Hat',
    category: 'accessories',
    price: 30.00,
    stock: 22,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_nLvD79GHG__2mzfIDDJSPOwulU-oZrxCbWz8BsccKl7AbD_zR7Pp9m_lyWaDywyst_AOrNiQa2QZ9UbiOqQnGAVetCJOcvXwZwjs9WED2kZHe64cFk9d9_z2sTcQxTqm8M-ergXMVMOwBAviTpVovU4ozj6tMmPZqNje0gYI9VfzPqrxp-vpY9pK12gsxrGVBlTak6tmJHhhr5xE5gLHJLx1my_q9jZDrkarI-LTVp4kpjdsh12KWnd8TnM09D0gokCxUX7WswQ',
    description: 'Lightweight straw hat with UPF 50+ sun protection. Perfect for beach days and outdoor summer gatherings.',
    createdAt: '2023-04-10'
  },
  {
    id: '6',
    sku: 'CS-55422',
    name: 'Canvas Shoes',
    category: 'apparel',
    price: 55.00,
    stock: 8,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJOCyeSoSMtjafyDPh4sMyUh0RLMXRUjBNv-nrNRdcxLCZQvxCmhbXfmiUj_Iyt_YuG6eXV8cEaIlYZFJJ_TjsXoHSJSDKyd68xKRQwrj-VAdrp0xxyz3d_gzZE6YEga3f0zUusGD9F0zIHszIfatf3JkwkOhv-xE4ofIEqWwxrWy6my7XGGosXR4ouxjY7e-9__O4-GQG5ywEL0mrudiInAKzokOjY3wRk4xIeKlgTZauMhLU7r9ic5PGNnFwerp1vh-zU8bFGHA',
    description: 'Versatile canvas sneakers with vulcanized rubber soles. Classic low-profile silhouette with moisture-wicking lining.',
    createdAt: '2023-07-22'
  },
  {
    id: '7',
    sku: 'SS-33011',
    name: 'Silk Scarf',
    category: 'accessories',
    price: 45.00,
    stock: 31,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFBYn7QPVi3U-jeRHfOtE7v0PUYXXiq_0KAI2s4xaMdw0DlIaxShYFEbw56w7lU2P6HHJiQo7VvHXsaiIsnZwUV1cXBs_FTuuYQ_MMRDGICjco5fSRdFhzOyfgOvVPbBtTWc7oVzQdLi1FF54iZH4G7J-RzgVPnjZV0sMJ3LNdYJ9_M-dJghVf1SZonugQfoGIOmEuT4bzZorLCvrGW0tlGTuQHZM2MmwxsW_22uv5CNWCvZGQO_ybAsCwKmlTDLmxoTEW9KY8J8k',
    description: '100% pure silk scarf with hand-rolled edges. Features a unique geometric pattern inspired by mid-century modern art.',
    createdAt: '2023-09-05'
  },
  {
    id: '8',
    sku: 'WS-11022',
    name: 'Wool Sweater',
    category: 'apparel',
    price: 120.00,
    stock: 5,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhZJ1E7VWHiuBt3iKIEXe0XYTm97UejidiywfLKz69JM4Vb9mAhFh0Dj0DThvdKvRSlpU_ecCgQQ9tPilsyhzZZIIOnon4TJ5-q8qXu765bmAlckS1sMA5nrvk7qB8NkpatlKg1QhACzB2Krtro4rSwzTrmN-sTpGLJuWqQ3BUUdGjxgsfAdPAKxSkZT4JCMlPpZyF3xRzfz9IR7KKh-NBg1E9GA4lTV9exWnD7giJd7uGqk82yYusUkP5546AjZExiHQ-2zsO4zM',
    description: 'Heavyweight Merino wool sweater. Exceptionally warm yet breathable, naturally odor-resistant and soft to the touch.',
    createdAt: '2023-11-10'
  }
];

export const EMPLOYEES: Employee[] = [
  { id: '1', name: 'Sarah Jenkins', email: 'sarah.j@retailpos.com', role: 'Admin', status: 'Active', lastLogin: '2 hours ago', initials: 'SJ' },
  { id: '2', name: 'Marcus Thorne', email: 'm.thorne@retailpos.com', role: 'Manager', status: 'Active', lastLogin: '5 mins ago', initials: 'MT' },
  { id: '3', name: 'Elena Rodriguez', email: 'e.rodriguez@retailpos.com', role: 'Cashier', status: 'Inactive', lastLogin: '3 days ago', initials: 'ER' },
  { id: '4', name: 'David Chen', email: 'd.chen@retailpos.com', role: 'Cashier', status: 'Active', lastLogin: '1 hour ago', initials: 'DC' },
];

export const SALES: Sale[] = [
  { id: 'TRX-8291', date: '2023-11-20 14:32', customer: 'Walk-in Guest', salesPersonName: 'Sarah Jenkins', items: 3, total: 145.00, status: 'Completed', paymentMethod: 'Credit Card' },
  { id: 'TRX-8292', date: '2023-11-20 15:05', customer: 'John Smith', salesPersonName: 'David Chen', items: 1, total: 25.00, status: 'Completed', paymentMethod: 'Cash' },
  { id: 'TRX-8293', date: '2023-11-20 15:12', customer: 'Walk-in Guest', salesPersonName: 'Marcus Thorne', items: 5, total: 450.00, status: 'Refunded', paymentMethod: 'Credit Card' },
  { id: 'TRX-8294', date: '2023-11-20 16:45', customer: 'Maria Garcia', salesPersonName: 'Sarah Jenkins', items: 2, total: 85.50, status: 'Completed', paymentMethod: 'Mobile Pay' },
  { id: 'TRX-8295', date: '2023-11-21 09:10', customer: 'Walk-in Guest', salesPersonName: 'David Chen', items: 1, total: 199.00, status: 'Completed', paymentMethod: 'Credit Card' },
];

export const CUSTOMERS: Customer[] = [
  { id: 'CUST-001', name: 'James Wilson', email: 'j.wilson@email.com', phone: '+1 (555) 123-4567', points: 450, totalSpent: 1240.50, lastVisit: '2 days ago', tier: 'VIP', initials: 'JW' },
  { id: 'CUST-002', name: 'Sophia Miller', email: 'sophia.m@gmail.com', phone: '+1 (555) 987-6543', points: 120, totalSpent: 340.00, lastVisit: '1 week ago', tier: 'Regular', initials: 'SM' },
  { id: 'CUST-003', name: 'Robert Brown', email: 'robert.b@yahoo.com', phone: '+1 (555) 444-5555', points: 15, totalSpent: 45.00, lastVisit: 'Today', tier: 'New', initials: 'RB' },
  { id: 'CUST-004', name: 'Emily Davis', email: 'emily.d@outlook.com', phone: '+1 (555) 333-2222', points: 890, totalSpent: 2890.75, lastVisit: '5 days ago', tier: 'VIP', initials: 'ED' },
  { id: 'CUST-005', name: 'Michael Thompson', email: 'm.thompson@company.com', phone: '+1 (555) 111-0000', points: 210, totalSpent: 620.10, lastVisit: '3 weeks ago', tier: 'Regular', initials: 'MT' },
];
