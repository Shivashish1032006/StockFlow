import { useMemo, useState } from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler } from 'chart.js'
import { TrendingUp, CalendarDays, IndianRupee, Info } from 'lucide-react'
import SectionTitle from '../../components/SectionTitle'
import { loadStore } from '../../lib/demoStore'
ChartJS.register(CategoryScale,LinearScale,PointElement,LineElement,Tooltip,Legend,Filler)
export default function SalesForecasting(){
 const [period,setPeriod]=useState(3)
 const sales=loadStore().sales
 const history=sales.filter(x=>x.actual!==null).map(x=>x.actual)
 const average=history.slice(-3).reduce((a,b)=>a+b,0)/Math.min(3,history.length)
 const forecast=Array.from({length:period},(_,i)=>Number((average*(1+0.035*(i+1))).toFixed(2)))
 const futureLabels=['Dec','Jan','Feb','Mar','Apr','May'].slice(0,period)
 const chartData={labels:[...sales.filter(x=>x.actual!==null).map(x=>x.month),...futureLabels],datasets:[{label:'Actual sales',data:[...history,...Array(period).fill(null)],borderColor:'#2f7054',backgroundColor:'rgba(47,112,84,.10)',fill:true,tension:.35,pointRadius:3},{label:'Forecast',data:[...Array(history.length-1).fill(null),history[history.length-1],...forecast],borderColor:'#c49a59',backgroundColor:'transparent',borderDash:[6,5],tension:.35,pointRadius:3}]}
 const options={responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'bottom',labels:{usePointStyle:true,boxWidth:7,color:'#7b877e',padding:18}}},scales:{x:{grid:{display:false},ticks:{color:'#98a198'},border:{display:false}},y:{grid:{color:'#edf0eb'},ticks:{color:'#98a198',callback:v=>`₹${v}L`},border:{display:false}}}}
 return <div className="page-content">
 <SectionTitle eyebrow="DEMAND PLANNING" title="Sales forecasting" description="Estimate upcoming sales using recent historical performance and a transparent baseline model." action={<select className="filter-select" value={period} onChange={e=>setPeriod(Number(e.target.value))}><option value="3">Next 3 months</option><option value="6">Next 6 months</option></select>}/>
 <div className="stats-grid"><div className="stat-card"><div className="stat-top"><span>Last month sales</span><div className="stat-icon green"><IndianRupee size={18}/></div></div><div className="stat-value">₹8.40L</div><div className="stat-foot">Illustrative historical data</div></div><div className="stat-card"><div className="stat-top"><span>3-month moving average</span><div className="stat-icon sage"><TrendingUp size={18}/></div></div><div className="stat-value">₹{average.toFixed(2)}L</div><div className="stat-foot">Based on latest 3 months</div></div><div className="stat-card"><div className="stat-top"><span>Next month forecast</span><div className="stat-icon amber"><CalendarDays size={18}/></div></div><div className="stat-value">₹{forecast[0].toFixed(2)}L</div><div className="stat-foot">Baseline estimate</div></div><div className="stat-card"><div className="stat-top"><span>Forecast horizon</span><div className="stat-icon rose"><TrendingUp size={18}/></div></div><div className="stat-value">{period} months</div><div className="stat-foot">Projection window</div></div></div>
 <div className="panel revenue-panel analytics-chart"><div className="panel-heading"><div><div className="eyebrow">SALES OUTLOOK</div><h2>Historical sales and projected demand</h2><p>Values shown in ₹ lakhs · illustrative sample data</p></div><span className="status-badge green">Forecast view</span></div><div className="chart-wrap"><Line data={chartData} options={options}/></div></div>
 <div className="panel table-panel"><div className="panel-heading"><div><div className="eyebrow">FORECAST DETAILS</div><h2>Upcoming sales estimate</h2><p>Moving average baseline with a modest illustrative growth assumption</p></div></div><div className="table-scroll"><table><thead><tr><th>PERIOD</th><th>FORECAST SALES</th><th>MODEL</th><th>PLANNING NOTE</th></tr></thead><tbody>{forecast.map((v,i)=><tr key={i}><td><strong>{futureLabels[i]}</strong></td><td>₹{v.toFixed(2)}L</td><td>Moving average + 3.5% assumption</td><td>{i===0?'Review replenishment needs':'Reassess after actual sales arrive'}</td></tr>)}</tbody></table></div></div>
 <div className="info-banner"><Info size={18}/><div><strong>Forecasting model note</strong><p>This is a demonstration baseline, not an AI prediction. A production model should use dated sales records, seasonality, promotions, stock-outs and forecast error measurements such as MAE or MAPE.</p></div></div>
 </div>
}
