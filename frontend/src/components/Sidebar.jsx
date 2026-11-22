import { NavLink } from 'react-router-dom'
import { LayoutDashboard, ScanSearch, PackageSearch, BellRing, ChartNoAxesCombined, Boxes, ChevronLeft, Leaf, LogOut } from 'lucide-react'

const links = [
  { to: '/', label: 'Overview', icon: LayoutDashboard },
  { to: '/anomalies', label: 'Stock anomalies', icon: ScanSearch, badge: '3' },
  { to: '/batches', label: 'Batch & expiry', icon: PackageSearch, badge: '2' },
  { to: '/notifications', label: 'Notifications', icon: BellRing, badge: '3' },
  { to: '/analytics', label: 'Profit & loss', icon: ChartNoAxesCombined },
]

export default function Sidebar({ open, onClose, user, onLogout }) {
  const initials = (user?.name || 'Admin').split(' ').map(x=>x[0]).slice(0,2).join('').toUpperCase()
  return <>
    {open && <button className="mobile-scrim" onClick={onClose} aria-label="Close menu" />}
    <aside className={`sidebar ${open ? 'sidebar-open' : ''}`}>
      <div className="brand">
        <div className="brand-mark"><Boxes size={21} strokeWidth={2.2}/></div>
        <div><div className="brand-name">stockflow<span>.</span></div><div className="brand-caption">INVENTORY INTELLIGENCE</div></div>
        <button className="collapse-btn" aria-label="Collapse sidebar"><ChevronLeft size={17}/></button>
      </div>
      <div className="workspace-label">WORKSPACE</div>
      <nav className="nav-list">
        {links.map(({ to, label, icon: Icon, badge }) => (
          <NavLink key={to} to={to} end={to === '/'} onClick={onClose} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <Icon size={18} strokeWidth={1.8}/><span>{label}</span>{badge && <span className="nav-badge">{badge}</span>}
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-bottom">
        <div className="sidebar-tip"><div className="tip-icon"><Leaf size={17}/></div><strong>Good afternoon!</strong><p>Your inventory health is looking steady. Keep it that way.</p><span className="tip-link">View inventory health →</span></div>
        <div className="profile">
          <div className="avatar">{initials}</div>
          <div className="profile-copy"><strong>{user?.name || 'Workspace admin'}</strong><span>{user?.email || 'Admin account'}</span></div>
          <button className="logout-button" onClick={onLogout} title="Sign out" aria-label="Sign out"><LogOut size={16}/></button>
        </div>
      </div>
    </aside>
  </>
}
