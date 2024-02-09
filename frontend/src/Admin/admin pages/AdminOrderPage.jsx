import React, { useState, useEffect } from 'react'
import "../admin css/AdminOrderPage.css"
import product from "../../images/offer2.png"
import AdminOrderCard from '../admin components/AdminOrderCard'

export default function AdminOrderPage() {
    const [data, setData] = useState()
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:8000/api/orders`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json'
                }
            })
            const d = await response.json()
            console.log(d.data)
            setData(d.data)
        }
        fetchData()
    }, [])
    useEffect(() => {
        console.log(data)
    })

    return (
        <div className='admin-order-page'>
            <div className="admin-order-page-header-section">
                <div className="admin-order-page-header-box">
                    <div className="admin-order-page-header-box-left">
                        <h1>Manage Your  <span>Orders</span></h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi error quod accusantium perferendis ea accusamus, minus harum aliquid! Quasi eius excepturi ut distinctio ea fuga, maiores omnis eaque tenetur sequi deserunt laborum unde, perspiciatis deleniti facere voluptatem fugiat iure dolorum?</p>
                    </div>
                    <div className="admin-order-page-header-box-right">
                        <img src={product} alt="" />
                    </div>
                </div>
            </div>
            <div className="admin-order-page-main-section">
                {data && data.map((item, index) => {
                    return (

                        <AdminOrderCard data={item} />
                    )
                })}
            </div>
        </div>
    )
}
