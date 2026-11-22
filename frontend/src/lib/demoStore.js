const KEY = 'stockflow-demo-data-v1'

const initial = {
  products: [
    { id: 'PRD-1001', name: 'Organic Almond Milk', sku: 'DRK-204', category: 'Beverages', supplier: 'Green Valley Foods', price: 145, cost: 92, quantity: 84, reorderLevel: 25, status: 'Active' },
    { id: 'PRD-1002', name: 'Ceramic Coffee Mug', sku: 'KIT-118', category: 'Home', supplier: 'Urban Housewares', price: 320, cost: 160, quantity: 240, reorderLevel: 40, status: 'Active' },
    { id: 'PRD-1003', name: 'Daily Face Moisturizer', sku: 'BEA-032', category: 'Beauty', supplier: 'Glow Essentials', price: 399, cost: 240, quantity: 18, reorderLevel: 30, status: 'Low stock' },
    { id: 'PRD-1004', name: 'Arabica Coffee Beans', sku: 'GRC-091', category: 'Grocery', supplier: 'Green Valley Foods', price: 520, cost: 315, quantity: 126, reorderLevel: 35, status: 'Active' },
    { id: 'PRD-1005', name: 'Vitamin C Serum', sku: 'BEA-056', category: 'Beauty', supplier: 'Glow Essentials', price: 650, cost: 390, quantity: 0, reorderLevel: 15, status: 'Out of stock' },
  ],
  suppliers: [
    { id: 'SUP-201', name: 'Green Valley Foods', contact: 'Aarav Mehta', email: 'orders@greenvalley.example', phone: '+91 98765 43210', city: 'Pune', leadTime: 3, rating: 4.8, status: 'Active' },
    { id: 'SUP-202', name: 'Urban Housewares', contact: 'Riya Shah', email: 'sales@urbanhouse.example', phone: '+91 98765 12340', city: 'Mumbai', leadTime: 5, rating: 4.5, status: 'Active' },
    { id: 'SUP-203', name: 'Glow Essentials', contact: 'Kabir Joshi', email: 'supply@glow.example', phone: '+91 98765 99887', city: 'Pune', leadTime: 4, rating: 4.2, status: 'Active' },
  ],
  orders: [
    { id: 'ORD-8831', type: 'Customer', party: 'Aarohi Retail', date: '2026-11-21', items: 2, amount: 12900, status: 'Processing' },
    { id: 'ORD-8830', type: 'Customer', party: 'City Mart', date: '2026-11-21', items: 4, amount: 8420, status: 'Pending' },
    { id: 'PO-2102', type: 'Purchase', party: 'Green Valley Foods', date: '2026-11-20', items: 3, amount: 48000, status: 'Awaiting approval' },
    { id: 'PO-2094', type: 'Purchase', party: 'Urban Housewares', date: '2026-11-17', items: 2, amount: 22500, status: 'Delayed' },
    { id: 'ORD-8828', type: 'Customer', party: 'Metro Stores', date: '2026-11-19', items: 1, amount: 5200, status: 'Completed' },
  ],
  sales: [
    { month: 'Jun', actual: 5.2, forecast: null }, { month: 'Jul', actual: 6.1, forecast: null },
    { month: 'Aug', actual: 5.8, forecast: null }, { month: 'Sep', actual: 7.4, forecast: null },
    { month: 'Oct', actual: 7.8, forecast: null }, { month: 'Nov', actual: 8.4, forecast: null },
    { month: 'Dec', actual: null, forecast: 8.9 }, { month: 'Jan', actual: null, forecast: 9.2 },
    { month: 'Feb', actual: null, forecast: 9.5 },
  ]
}

export function loadStore() {
  try {
    const saved = localStorage.getItem(KEY)
    return saved ? { ...initial, ...JSON.parse(saved) } : initial
  } catch { return initial }
}
export function saveStore(data) {
  localStorage.setItem(KEY, JSON.stringify(data))
}
export function resetStore() {
  localStorage.removeItem(KEY)
  return initial
}
