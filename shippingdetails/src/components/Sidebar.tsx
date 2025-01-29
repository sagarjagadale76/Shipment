import * as React from 'react';
import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, FileText, Upload, Package, Layers, ChevronLeft, ChevronRight } from 'lucide-react'
import {useContext, createContext, useState } from "react"


export function Sidebar() {
  const location = useLocation()
  const [expanded, setExpanded] = useState(true)

  
  return (
    <div className={`w-[180px] bg-teal-600 min-h-screen text-white p-4  ${expanded
          ? 'w-[200px]' 
          : 'w-[100px] overflow-hidden'
        }`}>
      <div className="mb-8">
        <img 
          src={require("src/images/starlinks_global_logo.v4.png")}
          alt="Starlinks Logo" 
          className={`overflow-hidden transition-all ${
            expanded ? "w-32" : "w-0"
          }`}
        />
      </div>
      <nav className="space-y-2">
        <NavItem 
          to="/dashboard" 
          icon={<LayoutDashboard size={20} />} 
          label="Dashboard" 
          active={location.pathname === '/dashboard'}
          isExpanded = {expanded}
        />
        <NavItem 
          to="/reports" 
          icon={<FileText size={20} />} 
          label="Reports" 
          active={location.pathname === '/reports'}
          isExpanded = {expanded}
        />
        <NavItem 
          to="/export" 
          icon={<Upload size={20} />} 
          label="Export" 
          active={location.pathname === '/export'}
          isExpanded = {expanded}
        />
        <NavItem 
          to="/parcels" 
          icon={<Package size={20} />} 
          label="Parcels" 
          active={location.pathname === '/parcels'}
          isExpanded = {expanded}
        />
        <NavItem 
          to="/batches" 
          icon={<Layers size={20} />} 
          label="Batches" 
          active={location.pathname === '/batches'}
          isExpanded = {expanded}
        />
      </nav>
      <div className="absolute bottom-4">
        <button
          className="flex h-6 w-6 items-center justify-center rounded-full border bg-white text-[#00838f] shadow-md"
          onClick={() => setExpanded((curr) => !curr)}
        >
          {expanded ? (
            <ChevronLeft className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </button>
      </div>
    </div> 
  )
}

function NavItem({ to, icon, label, active, isExpanded }: { 
  to: string
  icon: React.ReactNode
  label: string
  active?: boolean
  isExpanded: boolean 
}) {
  return (
    
    <Link
      to={to}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors
        ${active
          ? 'bg-orange-400 text-white justify-start' 
          : 'hover:bg-teal-700 justify-center'
        }`}
    >
      {icon}      
      <span  className={`overflow-hidden transition-all ${
          (isExpanded ? "w-52 ml-3" : "w-0") 
        }`}>{label}</span>
      
    </Link>
  )
}

