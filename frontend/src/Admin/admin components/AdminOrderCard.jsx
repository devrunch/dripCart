import React, { useState } from 'react'
import "../admin css/AdminOrderCard.css"
import AdminOrderedProductCard from './AdminOrderedProductCard'
export default function AdminOrderCard({
    data
}) {
    const [cardColor, setCardColor] = useState('white')
    const [wantToReverseOrderStatus, setWantToReverseOrderStatus] = useState(false)
    const orderDeliverd = () => {
        setCardColor('#4dff4d')
        setWantToReverseOrderStatus(true)
    }
    const undoStatus = () => {
        setCardColor('white')
        setWantToReverseOrderStatus(false)
    }
    return (
        <div className='admin-order-card' style={{ backgroundColor: `${cardColor}` }}>
            <div className="admin-order-card-address-detail-section">
                <h4>Address Detail</h4>
                <div>
                    <h3>{data.name}</h3>
                    <h5>Contact : {data.mob}</h5>
                </div>
                <h5>Email : {data.email}</h5>
                <h5>Address : {data.address}</h5>
            </div>
            <div className="admin-order-card-payment-detail-section">
                <h4>Payment Mode</h4>
                <h6>{data.paymentMode}</h6>
            </div>
            <div className="admin-order-card-payment-detail-section">
                <h4>Payment Status</h4>
                <h6>{data.paymentStatus ? "Paid" : "Pending"}</h6>
            </div>
            <div className="admin-order-card-product-detail-section">
                <h4>Product Details</h4>
                <div className="admin-order-card-product-detail-section-box">
                    {data.products.map((item, index) => {
                        return (
                            <AdminOrderedProductCard data={item} />
                        )
                    })}
                </div>
            </div>
            <div className="admin-order-card-product-total-price-section">
                <div className="row">
                    <h4>Total Price</h4>
                    <h5>Rs.{data.totalPrice}</h5>
                </div>
            </div>
            <div className="admin-order-card-progress-management-section">
                <div className="row">
                    {wantToReverseOrderStatus ? <button className="btn-a flex-btn" onClick={undoStatus}>Undo Status</button> : <button className="btn-a order-btn" onClick={orderDeliverd}>Order Delivered</button>}
                    <button className="btn-a logout-btn">Delete</button>
                </div>
            </div>
        </div>
    )
}
