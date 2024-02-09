import React, { useEffect, useState } from 'react'
import "../admin css/AdminDashboard.css"
import { Link } from 'react-router-dom'
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import product from "../../images/admin-dashboard-hoodie.png"
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
export default function AdminDashboard() {

    const[whatsappNumber , setWhatsappNumber] = useState(0)

    useEffect(() => {
        const fetchWhatsappNumber = async() => {
            const response = await fetch("http://localhost:8000/api/read-whatsapp-number" , {
                method:'GET',
                headers:{
                    'content-type':'application/json'
                }
            })
            const json = await response.json()
            if(json.success){
                setWhatsappNumber(json.data[0].number)
            }
        }
        fetchWhatsappNumber()
    } , [])

    const handleChange = (e) => {
        setWhatsappNumber(e.target.value)
    }

    const handleSubmit = async(e) => {
        e.preventDefault()

        try{
            const response = await fetch("http://localhost:8000/api/change-whatsapp-number" , {
                method:'PUT',
                headers:{
                    'content-type':'application/json'
                },
                body : JSON.stringify({'number':whatsappNumber})
            })
            const json = await response.json()
            if(json.success){
                alert('Number Changed Successfully!!')
                window.location.reload()
            }
        }catch(err){
            console.log(err);
        }
    }

    return (
        <div className='admin-dashboard'>
            <div className="admin-dashboard-header">
                <div className="admin-dashboard-neon-card">
                    <h4>Total Number of Products</h4>
                    <h2>120</h2>
                </div>
                <div className="admin-dashboard-neon-card">
                    <h4>Total listed Queries</h4>
                    <h2>69</h2>
                </div>
                <div className="admin-dashboard-neon-card">
                    <h4>Total Number Of Orders</h4>
                    <h2>500</h2>
                </div>
            </div>
            <div className="admin-dashboard-middle-section">
                <div className="admin-dashboard-middle-section-left">
                    <h1>Admin <span> Dashboard</span></h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde praesentium quia delectus autem reprehenderit in laudantium officia dolorem deleniti ducimus sed perferendis repellendus odio ea eum quibusdam facere, sit explicabo veniam dicta est molestias aperiam! Excepturi, corrupti. Quidem, odio perferendis.</p>
                    <h4>Let's Have A Look At The Features You Have...</h4>
                    <div className="admin-dashboard-middle-section-left-bottom">
                        <Link to="/product-management" className='link-a'>
                            <div className="admin-ability-card">
                                <PrecisionManufacturingIcon className='admin-ability-icon' />
                                <h4>Product Management</h4>
                            </div>
                        </Link>
                        <Link to="/query-management" className='link-a'>
                            <div className="admin-ability-card">
                                <QuestionAnswerIcon className='admin-ability-icon' />
                                <h4>Query Management</h4>
                            </div>
                        </Link>
                        <Link to="" className='link-a'>
                            <div className="admin-ability-card">
                                <LocalShippingIcon className='admin-ability-icon' />
                                <h4>Order Management</h4>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="admin-dashboard-middle-section-right">
                    <img src={product} alt="" />
                </div>
            </div>
            <div className="admin-dashboard-manage-whatsapp">
                <h2>Manage  <span> WhatsApp</span></h2>
                <h4>Change Your WhatsApp Number</h4>
                <form className="whatsapp-form" onSubmit={handleSubmit}>
                    <input type="number" name="number" className="input-field" value={whatsappNumber} minLength={10} maxLength={12} onChange={handleChange}/>
                    <input type="submit" value="Save Changes" className="btn-a link-a" />
                </form>
            </div>
        </div>
    )
}
