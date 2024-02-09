import React, { useState } from 'react'
import "../css/component css/CartItem.css"
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
export default function CartItem(props) {
    const deviceId = localStorage.getItem('deviceId')
    const[deleteScreen , setDeleteScreen] = useState(false)
    const[quantity , setQuantity] = useState(props.quantity)
    const handleDelete = async(id) => {
        try{
            const response = await fetch(`http://localhost:8000/api/cart/delete-item/${id}` , {
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
    const handleDeleteScreen = () => {
        setDeleteScreen(true)
    }
    const handleClosingOfDeleteScreen = () => {
        setDeleteScreen(false)
    }
    const handleQuantityIncrement = async() => {
        setQuantity(quantity+1)
        props.onQuantityChange(props.id, quantity + 1);
        try{
            const response = await fetch(`http://localhost:8000/api/update-cart-item/${props.id}?q=${deviceId}` , {
                method:'PUT',
                headers:{
                    'content-type':'application/json'
                },
                body:JSON.stringify({quantity:quantity+1})
            })
            const json = await response.json()
            console.log(json);
            console.log(quantity);
        }catch(err){
            console.log(err);
        }
    }
    const handleQuantityDecrement = async() => {
        if(quantity>1){
            setQuantity(quantity-1)
            try{
                const response = await fetch(`http://localhost:8000/api/update-cart-item/${props.id}?q=${deviceId}` , {
                    method:'PUT',
                    headers:{
                        'content-type':'application/json'
                    },
                    body:JSON.stringify({quantity:quantity-1})
                })
                const json = await response.json()
                console.log(json);
            }catch(err){
                console.log(err);
            }
        }
        props.onQuantityChange(props.id, quantity - 1);
    }

  return (
    <div className='cart-item'>
        <div className="cart-item-image">
            <img src={props.image} alt="" />
        </div>
        <div className="cart-item-product-detail">
            <p>{props.name}</p>
            <h6>color : {props.color}</h6>
        </div>
        <div className="cart-item-quantity">
            <RemoveIcon onClick={handleQuantityDecrement}/>
            <input type="number" className="quantity-input" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value, 10))} />
            <AddIcon onClick={handleQuantityIncrement}/>
        </div>
        <div className="cart-item-total-price">
            <p>Rs. {quantity*(props.price)}/-</p>
        </div>
        <div className="cart-item-close-icon">
            <CloseIcon onClick={handleDeleteScreen} />
        </div>
        {deleteScreen && <div className="cart-item-delete-screen">
            <div className="dialog-box">
                <h3>Want To Remove Item From Cart ?</h3>
                <div className="row">
                    <button className="btn-a" onClick={() => handleDelete(props.id)}>Yes</button>
                    <button className="btn-a logout-btn" onClick={handleClosingOfDeleteScreen}>No</button>
                </div>
            </div>
        </div>}
    </div>
  )
}
