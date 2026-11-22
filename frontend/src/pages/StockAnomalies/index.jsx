import { useState } from 'react'
import { Search, Filter, Download, Eye, ShieldAlert, ArrowDownRight, ArrowUpRight } from 'lucide-react'
import SectionTitle from '../../components/SectionTitle'
import StatusBadge from '../../components/StatusBadge'
import { stockMovements } from '../../data'

export default function StockAnomalies() {
  const [filter, setFilter] = useState('All movements')
  const rows = stockMovements.filter(x => filter === 'All movements' || x.status === filter)
  return <div className="page-content">
    <SectionTitle eyebrow="INVENTORY CONTROL" title="Stock movement detection" description="Review unexpected inventory changes and investigate suspicious activity." action={<button className="btn btn-outline"><Download size={15}/> Export log</button>}/>
    <div className="stats-grid compact-stats">
      <div className="mini-stat"><span>Flagged movements</span><strong>12</strong><small className="text-red">3 require immediate review</small></div>
      <div className="mini-stat"><span>Under investigation</span><strong>04</strong><small>Across 3 product categories</small></div>
      <div className="mini-stat"><span>Resolved this month</span><strong>28</strong><small className="text-green">87% resolution rate</small></div>
    </div>
    <div className="panel table-panel">
      <div className="table-toolbar"><div><h2>Movement activity</h2><p>Review and verify stock changes</p></div><div className="toolbar-actions"><div className="search-box table-search"><Search size={15}/><input placeholder="Search product or ID"/></div><select className="filter-select" value={filter} onChange={e=>setFilter(e.target.value)}><option>All movements</option><option>Investigating</option><option>Pending review</option><option>Verified</option></select><button className="btn btn-outline btn-icon"><Filter size={15}/></button></div></div>
      <div className="table-scroll"><table><thead><tr><th>PRODUCT</th><th>MOVEMENT</th><th>ACTUAL CHANGE</th><th>EXPECTED</th><th>DATE</th><th>SEVERITY</th><th>STATUS</th><th></th></tr></thead><tbody>{rows.map(m=><tr key={m.id}><td><strong>{m.product}</strong><small>{m.sku}</small></td><td className="mono">{m.id}</td><td className="negative">{m.change}</td><td>{m.expected}</td><td>{m.date}</td><td><StatusBadge>{m.severity}</StatusBadge></td><td><StatusBadge>{m.status}</StatusBadge></td><td><button className="row-action" title="View details"><Eye size={16}/></button></td></tr>)}</tbody></table></div>
      <div className="table-bottom"><span>Showing {rows.length} of 12 movements</span><div><button disabled>Previous</button><button>Next</button></div></div>
    </div>
    <div className="info-banner"><ShieldAlert size={18}/><div><strong>How anomaly detection works</strong><p>StockFlow compares every inventory adjustment with linked orders, receipts, returns and approved corrections. Unmatched changes are flagged for administrator review.</p></div></div>
  </div>
}
