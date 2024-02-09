import React, { useEffect, useState } from 'react'
import "../css/page css/DetailedProductPage.css"
import product from "../images/offer2.png"
import { Link, useParams } from 'react-router-dom'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
export default function DetailedProductPage() {
    const [cloth, checkCloth] = useState(true)
    const[addedToCart , setAddedToCart] = useState(false)
    const params = useParams();
    const id = params.id;
    const[data , setData] = useState({id:"" , name:"" , price:"" , description:"" , category:"" , color:"" , image:""})
    const deviceId = localStorage.getItem('deviceId')

    useEffect(() => {
        const fetchData = async() => {
            const response = await fetch(`http://localhost:8000/api/product/${id}` , {
                method:'GET',
                headers:{
                    'content-type':'application/json'
                }
            })
            const json = await response.json()
            if(json.success){
                setData({id:json.data._id , name:json.data.name , price:json.data.price , description:json.data.description , category:json.data.category , color:json.data.color , image:json.data.image})
            }
        }
        fetchData()

        const isItemPresentInCart = async() => {
            const response = await fetch(`http://localhost:8000/api/cart/item/${id}?q=${deviceId}` , {
                method:'GET',
                headers:{
                    'content-type':'application/json'
                }
            })
            const json = await response.json()
            if(json.success){
                setAddedToCart(true)
            }
        }
        isItemPresentInCart()
    },[])
    
    const addItemToCart = async() => {
        setAddedToCart(true)
        try{
            const response = await fetch("http://localhost:8000/api/cart/add-item" , {
                method:'POST',
                headers:{
                    'content-type' : 'application/json'
                },
                body : JSON.stringify({deviceId:deviceId ,image:data.image , name:data.name , color:data.color , price : data.price , productId : id})
            })
            const json = await response.json()
            console.log(json);
            
        }catch(err){
            console.log(err);
        }
    }
    const goToCart =() =>{
        window.location.href = "/cart"
    }

    return (
        <div className='detail-product-page-total'>
            <div className='back-to-product'>
                <Link to="/product" className='link-a'>
                    <KeyboardBackspaceIcon/> Go Back
                </Link>
            </div>
            <div className="detailed-product-page">
                <div className="detailed-product-page-left">
                    <img src={data.image} alt="" />
                </div>
                <div className="detailed-product-page-right">
                <Link to="" className='link-a btn-a flex-btn'>Customise<WhatsAppIcon /></Link>
                    <h2>{data.name}</h2>
                    <p>{data.description}</p>
                    <h4>Color : {data.color}</h4>
                    {cloth ?  <h4>Available Size : S | M | L</h4> : <h4>Size : 120 X 230</h4>}
                    <form className="buy-form">
                        <div className="detailed-product-page-right-button">
                            <div className="detailed-product-page-right-button-top">
                                {addedToCart ? <Link to="" className='link-a btn-a flex-btn added-to-cart-btn'>Added To Cart <ShoppingBagIcon /></Link> : <button className='link-a btn-a flex-btn' onClick={addItemToCart}>Add To Cart <ShoppingBagIcon /></button>}
                            </div>
                            <div className="detailed-product-page-right-button-bottom">
                                {addedToCart ? <Link to="/cart" className='link-a btn-a flex-btn added-to-cart-btn'>Check Out <ShoppingBagIcon /></Link> : <button onClick={() => {addItemToCart() ; goToCart()}} className="btn-a">{`Buy Now   ₹${data.price}`}</button>}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
