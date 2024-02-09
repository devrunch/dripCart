import React, { useEffect, useState } from 'react'
import "../admin css/AdminProduct.css"
import hoodie from "../../images/admin-hoodie.png"
import produc1 from "../../images/product1.jpg"

import AdminProductCard from '../admin components/AdminProductCard'
export default function AdminProduct() {
    // const[data,setData] = useState({image:"",name:"",color:"",price:0,summary:"",description:"" , category:""})
    const [photo, setPhoto] = useState(null);
    const [name, setName] = useState('');
    const [color, setColor] = useState('');
    const [price, setPrice] = useState(0);
    const [summary, setSummary] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');

    const handlePhotoChange = (e) => {
        setPhoto(e.target.files[0]);
    };
    const handleNameChange = (e) => {
        setName(e.target.value);
    };
    const handleColorChange = (e) => {
        setColor(e.target.value);
    };
    const handlePriceChange = (e) => {
        setPrice(e.target.value);
    };
    const handleSummaryChange = (e) => {
        setSummary(e.target.value);
    };
    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };
    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };


    const[product , setProduct] = useState([])

    const handleSubmit = async(e) => {
        e.preventDefault()

        const formData = new FormData();
        formData.append('photo', photo);
        formData.append('name', name);
        formData.append('color', color);
        formData.append('price', price);
        formData.append('summary', summary);
        formData.append('description', description);
        formData.append('category', category);


        try{
            const response = await fetch("http://localhost:8000/api/create-product" , {
                method:'POST',
                body : formData
            })
            const json = await response.json()
            if(json.success){
                alert("Product Added Successfulyy!!!")
                window.location.reload()
            }
        }catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        const fetchProduct = async() => {
            try{
                const response = await fetch("http://localhost:8000/api/read-product" , {
                    method:'GET',
                    headers:{
                        'content-type':'application/json'
                    },
                })
                const json = await response.json()
                if(json.success){
                    setProduct(json.data)
                }
            }catch(err){
                console.log(err);
            }
        }
        fetchProduct()
    } , [])


    return (
        <>
            <div className="admin-product-form-section">
                <form className="admin-product-form" onSubmit={handleSubmit}>
                    <h2>Add Product</h2>
                    <div className="input-box">
                        <p>Upload Image</p>
                        <input type="file" name="photo" className='input-field' onChange={handlePhotoChange} accept=".jpg, .jpeg, .png"/>
                        {/*<input type="text" className="input-field" name='image' value={photo} onChange={handleChange} required /> */}
                    </div>
                    <div className="input-box">
                        <p>Name Of The Product</p>
                        <input type="text" className="input-field" name='name' value={name} onChange={handleNameChange} required />
                    </div>
                    <div className="row">
                        <div className="input-box">
                            <p>Color</p>
                            <input type="text" className="input-field" name='color' value={color} onChange={handleColorChange}  required/>
                        </div>
                        <div className="input-box">
                            <p>Price(INR)</p>
                            <input type="number" className="input-field" name='price' value={price} onChange={handlePriceChange} required />
                        </div>
                    </div>
                    <div className="input-box">
                        <p>Enter Summary (15-20 words)</p>
                        <textarea className='summary-field input-field' name='summary' value={summary} onChange={handleSummaryChange} required></textarea>
                    </div>
                    <div className="input-box">
                        <p>Enter Description</p>
                        <textarea className='input-field' name='description' value={description} onChange={handleDescriptionChange} required></textarea>
                    </div>
                    <div className="row">
                        <div className="input-box">
                            <p>Enter Category</p>
                            <input type="text" className="input-field" placeholder='T-shirt/Cup/Pillow...etc' name='category' value={category} onChange={handleCategoryChange} required/>
                        </div>
                        <input type="submit" value="Add Product" className="btn-a" />
                    </div>
                </form>
                <img src={hoodie} alt="" />
            </div>
            <div className="product-management-section">
                <h2>Product Management</h2>
                <div className="product-section-bottom">
                    {/* <AdminProductCard name="Name of the product" image={produc1} color="white" price="199"/> */}
                    {product.slice().reverse().map((elem) => {
                        return(
                            <AdminProductCard key={elem._id} name={elem.name} image={elem.image} color={elem.color} price={elem.price} id={elem._id}/>
                        )
                    })}
                </div>
            </div>
        </>
    )
}
