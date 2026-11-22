import { useMemo } from 'react'
import { ArrowUpRight, ArrowRight, Package, IndianRupee, AlertTriangle, CalendarClock, Download, Plus, TrendingUp, Clock3, CircleAlert } from 'lucide-react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js'
import StatCard from '../../components/StatCard'
import SectionTitle from '../../components/SectionTitle'
import StatusBadge from '../../components/StatusBadge'
import { stockMovements, notifications } from '../../data'
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

const chartData = {
  labels: ['Oct 22', 'Oct 27', 'Nov 01', 'Nov 06', 'Nov 11', 'Nov 16', 'Nov 21'],
  datasets: [
    { label: 'Revenue', data: [42, 48, 45, 62, 57, 73, 81], borderColor: '#2f7054', backgroundColor: 'rgba(47,112,84,.10)', fill: true, tension: .38, pointRadius: 3, pointBackgroundColor: '#2f7054', borderWidth: 2.5 },
    { label: 'Cost', data: [27, 31, 29, 39, 36, 45, 49], borderColor: '#c6a36b', backgroundColor: 'transparent', tension: .38, pointRadius: 0, borderWidth: 2, borderDash: [5, 5] }
  ]
}
const options = { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom', align: 'start', labels: { usePointStyle: true, boxWidth: 7, padding: 18, color: '#7b877e', font: { family: 'DM Sans', size: 11 } } }, tooltip: { backgroundColor: '#203b2e', padding: 11, cornerRadius: 9 } }, scales: { x: { grid: { display: false }, ticks: { color: '#98a198', font: { size: 10 } }, border: { display: false } }, y: { grid: { color: '#edf0eb' }, ticks: { color: '#98a198', font: { size: 10 }, callback: v => `₹${v}k` }, border: { display: false } } } }

export default function Dashboard() {
  const recent = useMemo(() => stockMovements.slice(0, 3), [])
  return <div className="page-content">
    <SectionTitle eyebrow="SATURDAY, 21 NOVEMBER 2026" title="Good morning, Admin" description="Here's what's happening across your inventory today." action={<div className="title-actions"><button className="btn btn-outline"><Download size={15}/> Export report</button><button className="btn btn-primary"><Plus size={16}/> Add product</button></div>}/>
    <div className="stats-grid">
      <StatCard label="Total inventory value" value="₹24.8L" change="+8.2%" note="vs. last month" icon={IndianRupee}/>
      <StatCard label="Active products" value="1,284" change="+4.6%" note="vs. last month" icon={Package} tone="sage"/>
      <StatCard label="Stock alerts" value="12" change="3 critical" note="needs attention" icon={AlertTriangle} tone="amber"/>
      <StatCard label="Expiring batches" value="08" change="Next 30 days" note="across 5 products" icon={CalendarClock} tone="rose"/>
    </div>
    <div className="dashboard-grid">
      <section className="panel revenue-panel">
        <div className="panel-heading"><div><div className="eyebrow">FINANCIAL OVERVIEW</div><h2>Revenue & cost trend</h2><p>Sales performance over the last 30 days</p></div><button className="small-select">Last 30 days <span>⌄</span></button></div>
        <div className="chart-summary"><div><span className="muted-label">Total revenue</span><strong>₹8,42,650</strong><span className="positive"><TrendingUp size={13}/> 12.8%</span></div><div><span className="muted-label">Gross profit</span><strong>₹2,16,400</strong><span className="positive"><TrendingUp size={13}/> 9.4%</span></div></div>
        <div className="chart-wrap"><Line data={chartData} options={options}/></div>
      </section>
      <section className="panel attention-panel">
        <div className="panel-heading"><div><div className="eyebrow">NEEDS YOUR ATTENTION</div><h2>Priority alerts</h2><p>Items that may need action</p></div><span className="alert-count">4</span></div>
        <div className="attention-list">
          <div className="attention-item"><div className="attention-icon red"><CircleAlert size={17}/></div><div><strong>Unusual stock movement</strong><p>50 units · Organic Almond Milk</p><small>10 min ago</small></div><ArrowRight size={15}/></div>
          <div className="attention-item"><div className="attention-icon amber"><CalendarClock size={17}/></div><div><strong>Batch nearing expiry</strong><p>84 units · 7 days left</p><small>32 min ago</small></div><ArrowRight size={15}/></div>
          <div className="attention-item"><div className="attention-icon amber"><Clock3 size={17}/></div><div><strong>Supplier delivery delayed</strong><p>PO-2094 · 2 days overdue</p><small>1 hour ago</small></div><ArrowRight size={15}/></div>
          <div className="attention-footer">View all notifications <ArrowUpRight size={14}/></div>
        </div>
      </section>
    </div>
    <section className="panel table-panel">
      <div className="panel-heading"><div><div className="eyebrow">INVENTORY MONITOR</div><h2>Recent stock movements</h2><p>Latest activity recorded in your inventory</p></div><button className="text-action">View all movements <ArrowUpRight size={14}/></button></div>
      <div className="table-scroll"><table><thead><tr><th>PRODUCT</th><th>MOVEMENT ID</th><th>CHANGE</th><th>REASON</th><th>STATUS</th></tr></thead><tbody>{recent.map(m=><tr key={m.id}><td><strong>{m.product}</strong><small>{m.sku}</small></td><td className="mono">{m.id}</td><td className={m.change.startsWith('-')?'negative':'positive-text'}>{m.change}</td><td>{m.reason}</td><td><StatusBadge>{m.status}</StatusBadge></td></tr>)}</tbody></table></div>
    </section>
  </div>
}
