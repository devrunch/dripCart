import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import "../css/page css/CartPage.css"
import CartItem from '../components/CartItem'


export default function CartPage() {
  const[next , setNext] = useState("/address-page")
  const[data , setData] = useState([])
  const [totalAmount, setTotalAmount] = useState(0);

  const calculateTotal = () => {
    return data.reduce((total, elem) => total + elem.price * elem.quantity, 0);
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    setData((prevData) =>
      prevData.map((item) => (item._id === itemId ? { ...item, quantity: newQuantity } : item))
    );
  };
  const deviceId = localStorage.getItem('deviceId')
  useEffect(() => {
    const fetchData = async() => {
        const response = await fetch(`http://localhost:8000/api/cart/items?q=${deviceId}` , {
          method:'GET',
          headers:{
            'content-type' : 'application/json'
          }
        })
        const json = await response.json()  
        if(json.success){
          setData(json.data)
        }
    }
    fetchData()
  } , [])
  useEffect(() => {
    setTotalAmount(calculateTotal());
  }, [data]);
  
  const totalItem = data.length


  return (
    <div className='cart-page'>
      <div className="cart-page-header">
        <h2>Cart</h2>
        <h4>Your Cart have {totalItem} items!!</h4>
        <hr/>
      </div>
      <div className="cart-page-item-container">
        {data.map((elem) => {
          return(
            <CartItem key={elem._id} image={elem.image} name={elem.name} color={elem.color} price={elem.price} id={elem._id} quantity={elem.quantity} onQuantityChange={handleQuantityChange} />
          )
        })}
      </div>
      <div className="cart-page-bottom">
        <h3>Your Total Bill : Rs. {totalAmount}/-</h3>
        {(totalItem>0) ? <Link to={next} className="btn-a link-a">CheckOut</Link> : <h4>Please Add Items To Proceed</h4>}
      </div>
    </div>
  )
}
