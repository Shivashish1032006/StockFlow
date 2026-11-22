export default function StatusBadge({ children }) {
  const value = String(children).toLowerCase()
  const tone = value.includes('critical') || value.includes('expired') || value.includes('investigat') ? 'red' : value.includes('expiring') || value.includes('pending') || value.includes('high') ? 'amber' : value.includes('healthy') || value.includes('verified') || value.includes('resolved') ? 'green' : 'neutral'
  return <span className={`status-badge ${tone}`}><i/>{children}</span>
}
