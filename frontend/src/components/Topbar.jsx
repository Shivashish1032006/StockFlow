import { Search, Menu, Bell, ChevronDown, CalendarDays } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Topbar({ onMenu }) {
  return <header className="topbar">
    <button className="mobile-menu" onClick={onMenu} aria-label="Open menu"><Menu size={21}/></button>
    <div className="breadcrumb"><span>Workspace</span><b>/</b><strong>Overview</strong></div>
    <div className="topbar-actions">
      <div className="search-box"><Search size={16}/><input placeholder="Search anything..." aria-label="Search"/><kbd>⌘ K</kbd></div>
      <button className="icon-button notification-top" aria-label="Notifications"><Bell size={18}/><i/></button>
      <div className="topbar-divider"/>
      <button className="date-pill"><CalendarDays size={15}/> Last 30 days <ChevronDown size={14}/></button>
    </div>
  </header>
}
