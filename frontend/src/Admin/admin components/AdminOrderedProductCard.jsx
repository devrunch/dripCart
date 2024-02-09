import React from 'react'
import "../admin css/AdminOrderedProductCard.css"
import product from "../../images/offer2.png"
export default function AdminOrderedProductCard({data}) {
  return (
    <div className='admin-ordered-product-card'>
        <img src={data.image} alt="" />
        <div className="admin-ordered-product-card-product-detail">
            <h6>{data.name}</h6>
            <h6>Qty : {data.quantity}</h6>
        </div>
        <div className="admin-ordered-product-card-price-detail">
            <h6>Total Price</h6>
            <h6>Rs. {data.quantity * Number(data.price)} </h6>
        </div>
    </div>
  )
}
