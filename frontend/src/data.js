export const stockMovements = [
  { id: 'MOV-1048', product: 'Organic Almond Milk', sku: 'DRK-204', movement: 'Stock decrease', change: '-50 units', expected: '-8 units', reason: 'No matching order', date: 'Today, 10:42 AM', severity: 'Critical', status: 'Investigating' },
  { id: 'MOV-1047', product: 'Ceramic Coffee Mug', sku: 'KIT-118', movement: 'Stock increase', change: '+24 units', expected: '+24 units', reason: 'Purchase receipt', date: 'Today, 09:18 AM', severity: 'Normal', status: 'Verified' },
  { id: 'MOV-1046', product: 'Daily Face Moisturizer', sku: 'BEA-032', movement: 'Stock decrease', change: '-18 units', expected: '-18 units', reason: 'Order #ORD-8821', date: 'Yesterday, 04:32 PM', severity: 'Normal', status: 'Verified' },
  { id: 'MOV-1045', product: 'Arabica Coffee Beans', sku: 'GRC-091', movement: 'Stock decrease', change: '-32 units', expected: '-12 units', reason: 'Quantity mismatch', date: 'Yesterday, 02:06 PM', severity: 'High', status: 'Pending review' },
]
export const batches = [
  { batch: 'BTH-2026-041', product: 'Organic Almond Milk', sku: 'DRK-204', quantity: 84, manufactured: '12 Aug 2026', expiry: '28 Nov 2026', days: 7, status: 'Expiring soon' },
  { batch: 'BTH-2026-038', product: 'Daily Face Moisturizer', sku: 'BEA-032', quantity: 126, manufactured: '20 Jul 2026', expiry: '05 Dec 2026', days: 14, status: 'Expiring soon' },
  { batch: 'BTH-2026-029', product: 'Arabica Coffee Beans', sku: 'GRC-091', quantity: 210, manufactured: '10 Sep 2026', expiry: '18 Feb 2027', days: 89, status: 'Healthy' },
  { batch: 'BTH-2026-022', product: 'Vitamin C Serum', sku: 'BEA-056', quantity: 0, manufactured: '01 Jan 2026', expiry: '15 Nov 2026', days: -6, status: 'Expired' },
]
export const notifications = [
  { type: 'anomaly', title: 'Unusual stock movement detected', message: '50 units of Organic Almond Milk changed without a matching order.', time: '10 minutes ago', unread: true },
  { type: 'expiry', title: 'Batch nearing expiry', message: 'Batch BTH-2026-041 expires in 7 days. 84 units remaining.', time: '32 minutes ago', unread: true },
  { type: 'delivery', title: 'Supplier delivery delayed', message: 'Green Valley Foods · PO-2094 is 2 days overdue.', time: '1 hour ago', unread: true },
  { type: 'order', title: 'Customer order awaiting processing', message: 'Order ORD-8830 has been pending for 18 hours.', time: '3 hours ago', unread: false },
  { type: 'approval', title: 'Purchase order awaiting approval', message: 'PO-2102 · 120 units · ₹48,000 estimated value.', time: 'Yesterday', unread: false },
]
export const products = [
  { name: 'Organic Almond Milk', category: 'Beverages', revenue: '₹1,24,500', cost: '₹78,400', profit: '₹46,100', margin: '37.0%' },
  { name: 'Arabica Coffee Beans', category: 'Grocery', revenue: '₹98,200', cost: '₹59,900', profit: '₹38,300', margin: '39.0%' },
  { name: 'Daily Face Moisturizer', category: 'Beauty', revenue: '₹86,000', cost: '₹57,600', profit: '₹28,400', margin: '33.0%' },
  { name: 'Ceramic Coffee Mug', category: 'Home', revenue: '₹42,800', cost: '₹21,400', profit: '₹21,400', margin: '50.0%' },
]
