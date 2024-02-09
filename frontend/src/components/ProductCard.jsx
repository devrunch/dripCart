import React from 'react'
import "../css/component css/ProductCard.css"
import { Link } from 'react-router-dom'
export default function ProductCard(props) {
  return (
    <div className='product-card'>
        <img src={props.image} alt="" />
        <div className="product-card-bottom">
            <h3>{props.name}</h3>
            <p>{props.description}</p>
            <div className="product-card-bottom-button-section">
                <h5>₹ {props.price}/-</h5>
                <Link to={`/product/${props.id}`} className="link-a btn-a">View</Link>
            </div>
        </div>
    </div>
  )
}
