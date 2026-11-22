export default function StatCard({ label, value, change, note, icon: Icon, tone = 'green' }) {
  return <div className="stat-card">
    <div className="stat-top"><span>{label}</span><div className={`stat-icon ${tone}`}><Icon size={18}/></div></div>
    <div className="stat-value">{value}</div>
    <div className="stat-foot"><span className="trend">{change}</span><span>{note}</span></div>
  </div>
}
