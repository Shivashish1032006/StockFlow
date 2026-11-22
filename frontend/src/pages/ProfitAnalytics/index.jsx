import { ArrowDownRight, ArrowUpRight, Download, IndianRupee, Wallet, TrendingUp, Percent } from 'lucide-react'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js'
import SectionTitle from '../../components/SectionTitle'
import { products } from '../../data'
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)
const data = { labels: ['Jun','Jul','Aug','Sep','Oct','Nov'], datasets: [{ label: 'Revenue', data: [5.2,6.1,5.8,7.4,7.8,8.4], backgroundColor: '#2f7054', borderRadius: 5, barThickness: 16 }, { label: 'COGS', data: [3.4,3.8,3.7,4.7,5.0,5.3], backgroundColor: '#d9c7a6', borderRadius: 5, barThickness: 16 }] }
const options = { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { usePointStyle: true, boxWidth: 7, color: '#7b877e', padding: 18, font: { family: 'DM Sans', size: 11 } } } }, scales: { x: { grid: { display: false }, ticks: { color: '#98a198' }, border: { display: false } }, y: { grid: { color: '#edf0eb' }, ticks: { color: '#98a198', callback: v => `₹${v}L` }, border: { display: false } } } }
export default function ProfitAnalytics() {
  return <div className="page-content">
    <SectionTitle eyebrow="BUSINESS PERFORMANCE" title="Profit & loss analytics" description="Understand revenue, cost of goods sold and the products driving your profitability." action={<button className="btn btn-outline"><Download size={15}/> Export report</button>}/>
    <div className="stats-grid">
      <div className="stat-card"><div className="stat-top"><span>Total revenue</span><div className="stat-icon green"><IndianRupee size={18}/></div></div><div className="stat-value">₹8.42L</div><div className="stat-foot"><span className="trend">↗ 12.8%</span><span>vs. previous month</span></div></div>
      <div className="stat-card"><div className="stat-top"><span>Cost of goods sold</span><div className="stat-icon amber"><Wallet size={18}/></div></div><div className="stat-value">₹5.26L</div><div className="stat-foot"><span>62.5% of revenue</span></div></div>
      <div className="stat-card"><div className="stat-top"><span>Gross profit</span><div className="stat-icon sage"><TrendingUp size={18}/></div></div><div className="stat-value">₹3.16L</div><div className="stat-foot"><span className="trend">↗ 9.4%</span><span>vs. previous month</span></div></div>
      <div className="stat-card"><div className="stat-top"><span>Gross margin</span><div className="stat-icon rose"><Percent size={18}/></div></div><div className="stat-value">37.5%</div><div className="stat-foot"><span className="trend">↗ 2.1%</span><span>vs. previous month</span></div></div>
    </div>
    <div className="panel revenue-panel analytics-chart"><div className="panel-heading"><div><div className="eyebrow">FINANCIAL PERFORMANCE</div><h2>Revenue vs. cost of goods sold</h2><p>Monthly comparison · values in lakhs</p></div><select className="filter-select"><option>Last 6 months</option><option>Last 12 months</option></select></div><div className="chart-wrap"><Bar data={data} options={options}/></div></div>
    <div className="panel table-panel"><div className="panel-heading"><div><div className="eyebrow">PRODUCT PERFORMANCE</div><h2>Most profitable products</h2><p>Ranked by gross profit contribution</p></div><button className="text-action">View all products <ArrowUpRight size={14}/></button></div><div className="table-scroll"><table><thead><tr><th>PRODUCT</th><th>CATEGORY</th><th>REVENUE</th><th>COGS</th><th>GROSS PROFIT</th><th>MARGIN</th></tr></thead><tbody>{products.map(p=><tr key={p.name}><td><strong>{p.name}</strong></td><td>{p.category}</td><td>{p.revenue}</td><td>{p.cost}</td><td className="positive-text">{p.profit}</td><td><span className="margin-pill">{p.margin}</span></td></tr>)}</tbody></table></div></div>
    <div className="info-banner"><IndianRupee size={18}/><div><strong>About these calculations</strong><p>Gross profit = net sales revenue − cost of goods sold. Net profit requires operating expenses such as rent, salaries and logistics to be recorded separately.</p></div></div>
  </div>
}
