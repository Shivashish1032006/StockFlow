import { useState } from 'react'
import { Search, Plus, CalendarClock, Package, AlertTriangle, Download } from 'lucide-react'
import SectionTitle from '../../components/SectionTitle'
import StatusBadge from '../../components/StatusBadge'
import { batches } from '../../data'

export default function BatchExpiry() {
  const [filter, setFilter] = useState('All batches')
  const rows = batches.filter(b => filter === 'All batches' || b.status === filter)
  return <div className="page-content">
    <SectionTitle eyebrow="INVENTORY LIFECYCLE" title="Batch & expiry management" description="Track batch-level quantities, shelf life and expiry risk across your products." action={<><button className="btn btn-outline"><Download size={15}/> Export</button><button className="btn btn-primary"><Plus size={16}/> Add batch</button></>}/>
    <div className="stats-grid compact-stats">
      <div className="mini-stat"><span>Total active batches</span><strong>146</strong><small>Across 82 products</small></div>
      <div className="mini-stat"><span>Expiring in 30 days</span><strong className="text-amber">08</strong><small>Review recommended</small></div>
      <div className="mini-stat"><span>Expired batches</span><strong className="text-red">02</strong><small>Blocked from sale</small></div>
    </div>
    <div className="panel table-panel">
      <div className="table-toolbar"><div><h2>Batch register</h2><p>Batch-level inventory and shelf-life overview</p></div><div className="toolbar-actions"><div className="search-box table-search"><Search size={15}/><input placeholder="Search batch or product"/></div><select className="filter-select" value={filter} onChange={e=>setFilter(e.target.value)}><option>All batches</option><option>Expiring soon</option><option>Healthy</option><option>Expired</option></select></div></div>
      <div className="table-scroll"><table><thead><tr><th>BATCH / PRODUCT</th><th>QUANTITY</th><th>MANUFACTURED</th><th>EXPIRY DATE</th><th>SHELF LIFE</th><th>STATUS</th></tr></thead><tbody>{rows.map(b=><tr key={b.batch}><td><strong>{b.product}</strong><small className="mono">{b.batch} · {b.sku}</small></td><td>{b.quantity} units</td><td>{b.manufactured}</td><td>{b.expiry}</td><td>{b.days < 0 ? `${Math.abs(b.days)} days overdue` : `${b.days} days left`}</td><td><StatusBadge>{b.status}</StatusBadge></td></tr>)}</tbody></table></div>
      <div className="table-bottom"><span>Showing {rows.length} batches</span><div><button disabled>Previous</button><button>Next</button></div></div>
    </div>
    <div className="info-banner"><CalendarClock size={18}/><div><strong>FEFO stock allocation</strong><p>First Expired, First Out: allocate stock from the valid batch with the nearest expiry date first. Expired batches should be blocked from fulfilment.</p></div></div>
  </div>
}
