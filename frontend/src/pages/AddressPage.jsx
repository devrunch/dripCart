import React, { useState } from 'react'
import "../css/page css/AddressPage.css"
import abstractVideo from "../videos/abstract background.mp4"
import { useNavigate } from "react-router-dom";
export default function AddressPage() {
    const Navigate = useNavigate()
    const deviceId = localStorage.getItem('deviceId')
    const [submitting, setSubmintting] = useState(false)
    const [address, setAdress] = useState({
        deviceId: deviceId,
        name: "",
        email: "",
        mob: "",
        address: "",
        paymentMode: ""
    })
    let temp = address;
    const onSubmitt = async () => {
        setSubmintting(!submitting)
        try {
            const response = await fetch("http://localhost:8000/api/address/add", {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(address)
            })
            const json = await response.json()
            const ord = json.data;
            if (json.success && address.paymentMode === "Cash On Delivery") {
                Navigate("/order-placed-successfully")
            }
            else if (json.success && address.paymentMode === "UPI / Debit / Credit / Netbanking") {

                let options = {
                    key: "rzp_test_1BxCzOYQni5Ax1",
                    amount: (ord.amount) * 100,
                    currency: ord.currency,
                    name: "Drip Cart",
                    description: "Complete Your order",
                    image: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fd6xcmfyh68wv8.cloudfront.net%2Fnewsroom-content%2Fuploads%2F2022%2F07%2FRazorpay_payments.png&tbnid=2KGUi-ZXTpvl5M&vet=12ahUKEwisktrYh5uEAxWYZmwGHR9pBqkQMygAegQIARB0..i&imgrefurl=https%3A%2F%2Frazorpay.com%2Fnewsroom%2Frazorpay-launches-indias-first-moneysaver-export-account-set-to-save-indian-exporters-more-than-50-in-bank-transfers%2F&docid=zWjdWkPFqmr4nM&w=2000&h=2000&q=razorpay&ved=2ahUKEwisktrYh5uEAxWYZmwGHR9pBqkQMygAegQIARB0",
                    order_id: ord.id,
                    callback_url: "http://127.0.0.1:8000/api/payment/payment-verification",

                    prefill: {
                        name: "DripCart",
                        email: "contact@dripcart.com",
                        contact: "9000090000"
                    },
                    notes: {
                        address: "Razorpay Corporate Office"
                    },
                    theme: {
                        color: "#3399cc"
                    }
                };
                var rzp1 = new window.Razorpay(options);
                rzp1.open();
                // console.log({ order });

            }
            else
                setSubmintting(false)
        } catch (err) {
            console.log(err);
            setSubmintting(!submitting)
        }
    }
    return (
        <div className='address-page'>
            <video src={abstractVideo} autoPlay muted loop></video>
            <div className="address-detail-form">
                <h2>Address Detail</h2>
                <div className="input-box">
                    <p>Enter Name</p>
                    <input onChange={(e) => {
                        temp.name = e.target.value;
                        setAdress(temp);
                    }} type="text" className="input-field" />
                </div>
                <div className="input-box">
                    <p>Enter Email</p>
                    <input
                        onChange={(e) => {
                            temp.email = e.target.value;
                            setAdress(temp);
                        }}
                        type="email" className="input-field" />
                </div>
                <div className="input-box">
                    <p>Contact Number</p>
                    <input onChange={(e) => {
                        temp.mob = e.target.value;
                        setAdress(temp);
                    }} type="number" className="input-field" />
                </div>
                <div className="input-box">
                    <p>Your Address</p>
                    <textarea onChange={(e) => {
                        temp.address = e.target.value;
                        setAdress(temp);
                        console.log(address)
                    }} className="input-field"></textarea>
                </div>
                <div className="input-box">
                    <p>Payment Mode</p>
                    <div style={{
                        display: "flex",
                    }}>
                        <input type="radio" id='cod' name="payMode" value="Cash On Delivery"
                            onChange={(e) => {
                                temp.paymentMode = e.target.value;
                                setAdress(temp);
                                console.log(address)
                            }} />
                        <label htmlFor="cod" style={{
                            marginLeft: "10px"
                        }}>Cash on Delivery</label>
                    </div>
                    <div style={{
                        display: "flex",
                    }}>
                        <input type="radio" id='online' name="payMode" value="UPI / Debit / Credit / Netbanking"
                            onChange={(e) => {
                                temp.paymentMode = e.target.value;
                                setAdress(temp);
                                console.log(address)
                            }} />
                        <label htmlFor="online" style={{
                            marginLeft: "10px"
                        }}>UPI / Debit / Credit / Netbanking</label>
                    </div>

                </div>
                {submitting ? <button value="Confirm Detail" className="btn-a" style={{ background: "gray" }} disabled >
                    Submiting
                </button> : <button onClick={() => onSubmitt()} className="btn-a" >
                    Confirm Address
                </button>}
            </div>
        </div>
    )
}
