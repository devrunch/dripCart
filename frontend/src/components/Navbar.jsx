import React, { useEffect, useState } from 'react'
import "../css/component css/Navbar.css"
import { Link } from 'react-router-dom'
import whatsapp from "../images/whatsapp.png"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
export default function Navbar() {
  
  const[whatsappNumber , setWhatsappNumber] = useState(0)

  useEffect(() => {
      const fetchWhatsAppNumber = async() => {
        const response = await fetch("http://localhost:8000/api/read-whatsapp-number" , {
          'method':'GET',
          headers:{
            'content-type':'application/json'
          }
        })
        const json = await response.json()
        if(json.success){
          setWhatsappNumber(json.data[0].number)
        }
      }
      fetchWhatsAppNumber()
  } , [])

  return (
    <div className='navbar'>
        <div className="navbar-left">
            {/* <img src={logo} alt="" /> */}
            <h3>Drip Creators</h3>
        </div>
        <div className="navbar-right">
            <Link to="/" className='link-a'>Home</Link>
            <Link to="/product" className='link-a'>Products</Link>
            <Link to="/contact" className='link-a'>Contact Us</Link>
            <Link to="/cart" className='link-a btn-a flex-btn outline-btn'>Cart <ShoppingCartIcon/></Link>
            <Link to="/login" className='link-a btn-a' >Login</Link>
        </div>
        <div className="contact-through-whatsapp">
          <a href={`https://wa.me/${whatsappNumber}`} target='_blank'><img src={whatsapp} alt="" /></a>
        </div>
    </div>
  )
}
