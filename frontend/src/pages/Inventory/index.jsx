import { useMemo, useState } from 'react'
import { Plus, Search, Download, Package, AlertTriangle, Boxes, IndianRupee, Pencil, Trash2, X } from 'lucide-react'
import SectionTitle from '../../components/SectionTitle'
import StatusBadge from '../../components/StatusBadge'
import { loadStore, saveStore } from '../../lib/demoStore'

const blank = { name:'', sku:'', category:'Beverages', supplier:'', price:'', cost:'', quantity:'', reorderLevel:'' }
export default function Inventory() {
  const [store,setStore] = useState(loadStore)
  const [query,setQuery] = useState('')
  const [filter,setFilter] = useState('All products')
  const [show,setShow] = useState(false)
  const [editing,setEditing] = useState(null)
  const [form,setForm] = useState(blank)
  const products = store.products
  const rows = useMemo(()=>products.filter(p => (filter==='All products' || (filter==='Low stock' ? p.quantity>0 && p.quantity<=p.reorderLevel : filter==='Out of stock' ? p.quantity===0 : p.status==='Active')) && `${p.name} ${p.sku} ${p.category}`.toLowerCase().includes(query.toLowerCase())),[products,filter,query])
  const update = next => { setStore(next); saveStore(next) }
  const openAdd = () => { setEditing(null); setForm(blank); setShow(true) }
  const openEdit = p => { setEditing(p.id); setForm({...p}); setShow(true) }
  const submit = e => {
    e.preventDefault()
    const qty = Number(form.quantity), reorder = Number(form.reorderLevel)
    const item = {...form, price:Number(form.price), cost:Number(form.cost), quantity:qty, reorderLevel:reorder, status:qty===0?'Out of stock':qty<=reorder?'Low stock':'Active'}
    const next = {...store, products: editing ? products.map(p=>p.id===editing?{...item,id:editing}:p) : [{...item,id:`PRD-${Date.now()}`},...products]}
    update(next); setShow(false)
  }
  const remove = id => { if(confirm('Delete this product?')) update({...store,products:products.filter(p=>p.id!==id)}) }
  const low = products.filter(p=>p.quantity>0&&p.quantity<=p.reorderLevel).length
  const value = products.reduce((s,p)=>s+p.quantity*p.cost,0)
  return <div className="page-content">
    <SectionTitle eyebrow="INVENTORY CONTROL" title="Inventory management" description="Manage your product catalogue, stock levels, reorder points and inventory value." action={<><button className="btn btn-outline" onClick={()=>alert('Inventory export can be connected to CSV export in the next integration phase.')}><Download size={15}/> Export</button><button className="btn btn-primary" onClick={openAdd}><Plus size={16}/> Add product</button></>}/>
    <div className="stats-grid">
      <div className="stat-card"><div className="stat-top"><span>Total products</span><div className="stat-icon green"><Package size={18}/></div></div><div className="stat-value">{products.length}</div><div className="stat-foot">Registered product SKUs</div></div>
      <div className="stat-card"><div className="stat-top"><span>Total units in stock</span><div className="stat-icon sage"><Boxes size={18}/></div></div><div className="stat-value">{products.reduce((s,p)=>s+p.quantity,0).toLocaleString('en-IN')}</div><div className="stat-foot">Across all products</div></div>
      <div className="stat-card"><div className="stat-top"><span>Low stock items</span><div className="stat-icon amber"><AlertTriangle size={18}/></div></div><div className="stat-value">{low}</div><div className="stat-foot">At or below reorder level</div></div>
      <div className="stat-card"><div className="stat-top"><span>Inventory cost value</span><div className="stat-icon rose"><IndianRupee size={18}/></div></div><div className="stat-value">₹{value.toLocaleString('en-IN')}</div><div className="stat-foot">Quantity × unit cost</div></div>
    </div>
    <div className="panel table-panel">
      <div className="table-toolbar"><div><h2>Product catalogue</h2><p>Search, filter and maintain stock records</p></div><div className="toolbar-actions"><div className="search-box table-search"><Search size={15}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search product or SKU"/></div><select className="filter-select" value={filter} onChange={e=>setFilter(e.target.value)}><option>All products</option><option>Active</option><option>Low stock</option><option>Out of stock</option></select></div></div>
      <div className="table-scroll"><table><thead><tr><th>PRODUCT</th><th>SKU</th><th>CATEGORY</th><th>SUPPLIER</th><th>SELL PRICE</th><th>QUANTITY</th><th>REORDER AT</th><th>STATUS</th><th>ACTIONS</th></tr></thead><tbody>{rows.map(p=><tr key={p.id}><td><strong>{p.name}</strong><small>{p.id}</small></td><td className="mono">{p.sku}</td><td>{p.category}</td><td>{p.supplier||'—'}</td><td>₹{p.price.toLocaleString('en-IN')}</td><td><strong>{p.quantity}</strong></td><td>{p.reorderLevel}</td><td><StatusBadge>{p.status}</StatusBadge></td><td><button className="row-action" title="Edit" onClick={()=>openEdit(p)}><Pencil size={15}/></button><button className="row-action" title="Delete" onClick={()=>remove(p.id)}><Trash2 size={15}/></button></td></tr>)}</tbody></table>{rows.length===0&&<p style={{padding:24,color:'#89948b'}}>No products match your search.</p>}</div>
      <div className="table-bottom"><span>Showing {rows.length} of {products.length} products</span><span>Demo data is saved in this browser</span></div>
    </div>
    {show&&<div className="modal-backdrop" onMouseDown={e=>e.target===e.currentTarget&&setShow(false)}><form className="modal-card" onSubmit={submit}><div className="modal-head"><div><div className="eyebrow">PRODUCT CATALOGUE</div><h2>{editing?'Edit product':'Add new product'}</h2></div><button type="button" className="row-action" onClick={()=>setShow(false)}><X/></button></div><div className="form-grid"><label>Product name<input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></label><label>SKU<input required value={form.sku} onChange={e=>setForm({...form,sku:e.target.value})}/></label><label>Category<select value={form.category} onChange={e=>setForm({...form,category:e.target.value})}>{['Beverages','Grocery','Beauty','Home','Electronics','Other'].map(x=><option>{x}</option>)}</select></label><label>Supplier<input value={form.supplier} onChange={e=>setForm({...form,supplier:e.target.value})}/></label><label>Selling price (₹)<input type="number" min="0" required value={form.price} onChange={e=>setForm({...form,price:e.target.value})}/></label><label>Unit cost (₹)<input type="number" min="0" required value={form.cost} onChange={e=>setForm({...form,cost:e.target.value})}/></label><label>Quantity<input type="number" min="0" required value={form.quantity} onChange={e=>setForm({...form,quantity:e.target.value})}/></label><label>Reorder level<input type="number" min="0" required value={form.reorderLevel} onChange={e=>setForm({...form,reorderLevel:e.target.value})}/></label></div><div className="modal-actions"><button type="button" className="btn btn-outline" onClick={()=>setShow(false)}>Cancel</button><button className="btn btn-primary">{editing?'Save changes':'Add product'}</button></div></form></div>}
  </div>
}
