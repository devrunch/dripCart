import React, { useEffect, useState } from 'react'
import "../admin css/AdminEditProductPage.css"
import product from "../../images/admin-hoodie.png"
import { useParams } from 'react-router-dom'
export default function AdminEditProductPage() {
    const params = useParams()
    const id = params.id
    const[data , setData] = useState({image:"",name:"",color:"",price:0,summary:"",description:"",category:""})
    const [photo, setPhoto] = useState(null);
    const [name, setName] = useState("");
    const [color, setColor] = useState(data.color);
    const [price, setPrice] = useState(data.price);
    const [summary, setSummary] = useState(data.summary);
    const [description, setDescription] = useState(data.description);
    const [category, setCategory] = useState(data.category);
   
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
                setData({image:json.data.image,name:json.data.name,color:json.data.color,price:json.data.price,summary:json.data.summary,description:json.data.description,category:json.data.category})
                setName(json.data.name)
                setColor(json.data.color)
                setPrice(json.data.price)
                setSummary(json.data.summary)
                setDescription(json.data.description)
                setCategory(json.data.category)
            }
        }
        fetchData()
    } , [])


   

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

  
    const handleSubmit = async(id , e) => {
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
            const response = await fetch(`http://localhost:8000/api/edit-product/product/${id}` , {
                method:'PUT',
                body : formData
            })
            const json = await response.json()
            if(json.success){
                alert("SAVE CHANGESS SUCCESSFULLYY!!!!")
                window.location.href = "/product-management"
            }
        }catch(Err){
            console.log(Err);
        }
    }
    return (
        <div className='admin-edit-product-page'>
            <form className="admin-product-form" onSubmit={(e) => {handleSubmit(id , e)}}>
                <h2>Edit Product Details</h2>
                <div className="input-box">
                    <p>Change Image</p>
                    <input type="file" className="input-field" name='photo' onChange={handlePhotoChange} />
                </div>
                <div className="input-box">
                    <p>Name Of The Product</p>
                    <input type="text" className="input-field" name='name' value={name} onChange={handleNameChange} required />
                </div>
                <div className="row">
                    <div className="input-box">
                        <p>Color</p>
                        <input type="text" className="input-field" name='color' value={color} onChange={handleColorChange} required />
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
                        <input type="text" className="input-field" placeholder='T-shirt/Cup/Pillow...etc' name='category' value={category} onChange={handleCategoryChange} required />
                    </div>
                    <input type="submit" value="Save Changes" className="btn-a" />
                </div>
            </form>
            <img src={data.image} alt="" />
        </div>
    )
}
