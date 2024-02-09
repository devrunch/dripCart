import React from 'react'
import "../admin css/AdminNavbar.css"
import { Link } from 'react-router-dom'
export default function AdminNavbar() {
  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.reload()
  }
  return (
    <div className='admin-navbar'>
        <div className="admin-navbar-left">
            <h3>Drip Creators</h3>
        </div>
        <div className="admin-navbar-right">
            <Link to="" className='link-a'>Dashboard</Link>
            <Link to="/product-management" className='link-a'>Products</Link>
            <Link to="/query-management" className='link-a'>Query</Link>
            <Link to="/order-management" className='link-a'>Orders</Link>
            <button className='link-a btn-a logout-btn' onClick={handleLogout}>Logout</button>
        </div>
    </div>
  )
}
