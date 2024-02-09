import React, { useState } from 'react'
import "../admin css/AdminProductCard.css"
import { Link } from 'react-router-dom'
export default function AdminProductCard(props) {
  const[deleteScreen , setDeleteScreen] = useState(false)

  const showDeleteScreen = () => {
    setDeleteScreen(true)
  }
  const hideDeleteScreen = () => {
    setDeleteScreen(false)
  }
  const handleDelete = async(id) => {
      try{
        const response = await fetch(`http://localhost:8000/api/delete-product/${id}` , {
          method:'DELETE',
          headers:{
            'content-type':'application/json'
          }
        })
        const json = await response.json()
        if(json.success){
          window.location.reload()
        }
      }catch(err){
        console.log(err);
      }
  }
  return (
    <div className='admin-product-card'>
        <img src={props.image} alt="" />
        <h4>{props.name}</h4>
        <div className="row">
            <h5>Color : {props.color}</h5>
            <h5>Price : ₹ {props.price}/-</h5>
        </div>
        <h6>Category : {props.category}</h6>
        <div className="row">
            <Link to={`/edit-product/${props.id}`} className="btn-a edit-btn link-a">Edit</Link>
            <button className="btn-a logout-btn" onClick={showDeleteScreen}>Delete</button>
        </div>

        {deleteScreen && <div className="admin-product-card-delete-screen">
            <div className="admin-product-card-delete-dialog-box">
                <h3>Do You Want To Delete This Product?</h3>
                <div className="row">
                  <button className="btn-a logout-btn" onClick={() => {handleDelete(props.id)}}>Yes</button>
                  <button className="btn-a" onClick={hideDeleteScreen}>No</button>
                </div>
            </div>
        </div>}
    </div>
  )
}
