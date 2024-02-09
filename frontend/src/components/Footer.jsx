import React from 'react'
import "../css/component css/Footer.css"
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import logo from "../images/logo.png"
import {Link} from 'react-router-dom'
export default function Footer() {
  return (
    <div className='footer'>
        <div className="footer-top-section">
            <div className="footer-column" id="footer-column-1">
                <img src={logo} alt="" className='footer-logo' />
                <h2>Drip <span> Creators</span></h2>
                <p>YOUR DRIP , YOUR CHOICE</p>
            </div>
            <div className="footer-column" id="footer-column-2">
                <h4>Important Links</h4>
                <Link to="/" className='link-a'>Home</Link>
                <Link to="/product" className='link-a'>Products</Link>
                <Link to="/contact" className='link-a'>Contact Us</Link>
            </div>
            <div className="footer-column" id="footer-column-3">
                <h4>Contact Details</h4>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. In dolor ratione, magni explicabo eligendi temporibus ullam et atque optio, similique tenetur perspiciatis nobis eaque illo ad hic enim velit illum!</p>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse iste, itaque ipsum corporis aperiam dicta sunt quis veritatis.</p>
                <div className="social-media-container">
                        <Link to="" className='link-a'><InstagramIcon className='social-media-icons' /></Link>
                        <Link to="" className='link-a'><YouTubeIcon className='social-media-icons' /></Link>
                        <Link to="" className='link-a'><WhatsAppIcon className='social-media-icons' /></Link>
                    </div>
            </div>
        </div>
        <div className="footer-bottom-section">
            <h5>Website Designed & Developed By <span>Sachin Jha</span> | © 2024</h5>
        </div>
    </div>
  )
}
