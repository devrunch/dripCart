import React, { useState, useEffect } from 'react'
import "../css/page css/ProductPage.css"
import offer1 from "../images/offer1.png"
import offer2 from "../images/offer2.png"
import offer3 from "../images/offer3.png"
import offer4 from "../images/offer4.png"
import offer5 from "../images/offer5.png"
import ProductCard from '../components/ProductCard'
export default function ProductPage() {
    const [product, setProduct] = useState([])
    const[search , setSearch] = useState("")
    const slides = [
        { id: 1, title: 'Premium Quality', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', imageUrl: `${offer1}` },
        { id: 2, title: 'Customer Support 24/7', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', imageUrl: `${offer2}` },
        { id: 3, title: 'Happy Buyers', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', imageUrl: `${offer3}` },
        { id: 4, title: 'No Sign up Required', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', imageUrl: `${offer5}` },
        { id: 5, title: 'Customisation Available', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', imageUrl: `${offer4}` },
    ];

    const [currentSlide, setCurrentSlide] = useState(1);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentSlide((prev) => (prev === slides.length ? 1 : prev + 1));
        }, 3500);
        return () => clearInterval(intervalId);
    }, [slides]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/read-product", {
                    method: 'GET',
                    headers: {
                        'content-type': 'application/json'
                    }
                })
                const json = await response.json()
                if (json.success) {
                    setProduct(json.data)
                }
            } catch (err) {
                console.log(err);
            }
        }
        fetchData()
    }, [])

    const handleChange = async(e) => {
        setSearch(e.target.value)
    }

    const handleSearch = async(e) => {
        e.preventDefault()
        try{
            const response = await fetch(`http://localhost:8000/api/search-product?q=${search}`, {
                method:'GET',
                headers:{
                    'content-type':'application/json'
                }
            })
            const json = await response.json()
            if(json.success){
                setProduct(json.data)
                window.scrollBy(0,400)
            }
        }catch(err){
            console.log(err);
        }
    }

    return (
        <div className='product-page'>
            <div className="offer-section">
                <div className="carousel-container">
                    {slides.map((slide) => (
                        <div
                            key={slide.id}
                            className={`carousel-slide ${slide.id === currentSlide ? 'active' : ''}`}
                        >
                            <div className="content">
                                <h2>{slide.title}</h2>
                                <p>{slide.description}</p>
                                <form className="search-box" onSubmit={handleSearch}>
                                    <input type="text" className='input-field' placeholder='Enter Product Name' value={search} onChange={handleChange} />
                                    <input type="submit" value="Search" className="link-a btn-a" />
                                </form>
                            </div>
                            <div className="image">
                                <img src={slide.imageUrl} alt={`Slide ${slide.id}`} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="product-section">
                <div className="product-section-top">
                    <h2>Explore <span>Products</span></h2>
                </div>
                <div className="product-section-bottom">
                    {product.slice().reverse().map((elem) => {
                        return(
                            <ProductCard key={elem._id} image={elem.image} name={elem.name} description={elem.summary} price={elem.price} id={elem._id} />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
