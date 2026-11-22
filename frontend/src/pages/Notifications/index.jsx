import { useState } from 'react'
import { BellRing, CheckCheck, AlertTriangle, CalendarClock, Truck, ShoppingBag, ClipboardCheck, CircleCheck } from 'lucide-react'
import SectionTitle from '../../components/SectionTitle'
import { notifications as initial } from '../../data'

const icons = { anomaly: AlertTriangle, expiry: CalendarClock, delivery: Truck, order: ShoppingBag, approval: ClipboardCheck }
export default function Notifications() {
  const [items, setItems] = useState(initial)
  const [filter, setFilter] = useState('All')
  const unread = items.filter(n => n.unread).length
  const visible = items.filter(n => filter === 'All' || (filter === 'Unread' ? n.unread : !n.unread))
  const markAll = () => setItems(old => old.map(n => ({ ...n, unread: false })))
  return <div className="page-content">
    <SectionTitle eyebrow="STAY IN THE LOOP" title="Notifications" description="Important updates and actions from across your StockFlow workspace." action={<button className="btn btn-outline" onClick={markAll}><CheckCheck size={15}/> Mark all as read</button>}/>
    <div className="notification-summary"><div className="notification-summary-icon"><BellRing size={21}/></div><div><strong>{unread} unread notifications</strong><p>You're up to date with the latest activity.</p></div><div className="notification-filters">{['All','Unread','Read'].map(f=><button className={filter===f?'selected':''} onClick={()=>setFilter(f)} key={f}>{f}</button>)}</div></div>
    <div className="notification-list panel">{visible.map((n,i)=>{const Icon=icons[n.type] || BellRing; return <div className={`notification-row ${n.unread?'unread':''}`} key={i}><div className={`notification-icon ${n.type}`}><Icon size={18}/></div><div className="notification-copy"><div className="notification-title">{n.title}{n.unread && <i/>}</div><p>{n.message}</p><time>{n.time}</time></div><button className="row-action" title="Mark as read" onClick={()=>setItems(old=>old.map((x,j)=>j===i?{...x,unread:false}:x))}>{n.unread?<CircleCheck size={17}/>:<CheckCheck size={17}/>}</button></div>})}{visible.length===0 && <div className="empty-state">No notifications in this view.</div>}</div>
  </div>
}
