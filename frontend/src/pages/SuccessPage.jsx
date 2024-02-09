import React from 'react'
import "../css/page css/SuccessPage.css"
import congratulation from "../images/Congratulations.jpg"
import{useState,useEffect} from "react"
export default function SuccessPage() {
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
    <div className='success-page'>
        <div className="success-page-box">
            <h3>Your Order Placed</h3>
            <h2>Successfully!</h2>
            <img src={congratulation} alt="" />
            <p>Your Order is placed successfully and we will process your order very soon!!
            Tie up your seat belt and wait for the product to be delivered</p>
            <h4>You Can Contact Us To Checkout Your Order Status</h4>
            <div className="row">
                <a href="tel:8742920558" className='link-a btn-a flex-btn call-btn'>Call Us</a>
                <a href={`https://wa.me/${whatsappNumber}`} className='link-a btn-a flex-btn call-btn'>Connect on WhatsApp</a>
            </div>
        </div>
    </div>
  )
}
