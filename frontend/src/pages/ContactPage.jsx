import React, { useState } from 'react'
import "../css/page css/ContactPage.css"
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import mockup from "../images/mockup.png"
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import PermPhoneMsgIcon from '@mui/icons-material/PermPhoneMsg';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';

export default function ContactPage() {

    const[data,setData] = useState({name:"",email:"",contact:"",query:""})

    const handleChange = (e) => {
        setData({...data , [e.target.name] : e.target.value})
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        const response = await fetch("http://localhost:8000/api/add-query" , {
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body : JSON.stringify(data)
        })
        const json = await response.json()
        if(json.success){
            alert("Message Sent Successfully!!")
            setData({name:"",email:"",contact:"",query:""})
        }
    }

  return (
    <div className='contact-page'>
        <div className="contact-page-top-section">
            <form className="contact-form" onSubmit={handleSubmit}>
                <h2>Get In Touch With Us</h2>
                <div className="input-box">
                    <p>Enter Name</p>
                    <input type="text" className="input-field" name='name' required value={data.name} onChange={handleChange} />
                </div>
                <div className="input-box">
                    <p>Enter Email Address</p>
                    <input type="email" className="input-field" name='email' required value={data.email} onChange={handleChange} />
                </div>
                <div className="input-box">
                    <p>Enter Contact Number</p>
                    <input type="number" className="input-field" name='contact' required value={data.contact} onChange={handleChange}/>
                </div>
                <div className="input-box">
                    <p>Enter Your Query</p>
                    <textarea className='input-field' name='query' required value={data.query} onChange={handleChange}></textarea>
                </div>
                <input type="submit" value="Send Message" className="link-a btn-a" />
            </form>
            <div className="contact-details-section">
                <div className="contact-detail-card">
                    <div className="contact-detail-card-left"><MarkEmailReadIcon/></div>
                    <div className="contact-detail-card-right">
                        <h4>Official Mail</h4>
                        <p>Officaialmailaddress@gmail.com</p>
                    </div>
                </div>
                <div className="contact-detail-card">
                    <div className="contact-detail-card-left"><PermPhoneMsgIcon/></div>
                    <div className="contact-detail-card-right">
                        <h4>Contact Number</h4>
                        <p>+91 123 456 7890</p>
                    </div>
                </div>
                <div className="contact-detail-card">
                    <div className="contact-detail-card-left"><AddLocationAltIcon/></div>
                    <div className="contact-detail-card-right">
                        <h4>Office Address</h4>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati voluptatum quia excepturi! Deserunt sit impedit magni</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="custom-design-section">
                <div className="custom-design-left">
                    <h2>Customize Product</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo, itaque minima voluptatibus consectetur ea eaque quos, non autem nam debitis nostrum illum delectus excepturi. Ipsa quibusdam eaque cum tempore reiciendis voluptas commodi nisi veniam odit delectus. Consequuntur commodi vitae eaque rem, vero dignissimos reprehenderit, voluptatem, incidunt nobis qui obcaecati possimus!</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium adipisci distinctio at, cupiditate nobis blanditiis tempore enim placeat ullam labore ducimus cumque beatae ipsa quis doloribus, veritatis fugiat recusandae nihil?</p>
                    <a href="#" className='link-a btn-a flex-btn'>Connect On WhatsApp <WhatsAppIcon/></a>
                </div>
                <div className="custom-design-right">
                    <img src={mockup} alt="" />
                </div>
            </div>
    </div>
  )
}
