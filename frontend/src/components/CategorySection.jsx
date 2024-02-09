import React , {useState , useEffect} from 'react'
import "../css/component css/CategorySection.css"
import men from "../images/men.jpg"
import boy from "../images/boy.jpg"
import girl from "../images/girl.jpg"
import princess from "../images/princess.jpg"
import ProductCard from './ProductCard'
export default function CategorySection() {
    const [product, setProduct] = useState([])
    const[query,setQuery] = useState('none')

    const setQueryToMen = () => {
        setQuery('men')
        window.scrollBy(0,300)
    }
    const setQueryToBoy = () => {
        setQuery('boy')
        window.scrollBy(0,300)
    }
    const setQueryToWomen = () => {
        setQuery('women')
        window.scrollBy(0,300)
    }
    const setQueryToGirl = () => {
        setQuery('girl')
        window.scrollBy(0,300)
    }

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
    return (
        <div className='category-section'>
            <div className="category-section-header">
                <h2>Explore  <span>Popular Categories</span></h2>
            </div>
            <div className="category-section-option-section">
                <div className="category-section-option-card" onClick={setQueryToMen}>
                    <img src={men} alt="" />
                    <div className="category-section-option-card-overlay">
                        <h2>View Men Items</h2>
                    </div>
                </div>
                <div className="category-section-option-card" onClick={setQueryToBoy}>
                    <img src={boy} alt="" />
                    <div className="category-section-option-card-overlay">
                        <h2>View Boys Items</h2>
                    </div>
                </div>
                <div className="category-section-option-card" onClick={setQueryToWomen}>
                    <img src={girl} alt="" />
                    <div className="category-section-option-card-overlay">
                        <h2>View Women Items</h2>
                    </div>
                </div>
                <div className="category-section-option-card" onClick={setQueryToGirl}>
                    <img src={princess} alt="" />
                    <div className="category-section-option-card-overlay">
                        <h2>View Girl Items</h2>
                    </div>
                </div>
            </div>
            <div className="category-section-result-section">
                {product.filter(elem => elem.name.toLowerCase().includes(`${query}`) || elem.description.toLowerCase().includes(`${query}`)).slice().reverse().map((elem) => {
                    return (
                        <ProductCard key={elem._id} image={elem.image} name={elem.name} description={elem.summary} price={elem.price} id={elem._id} />
                    )
                })}
            </div>
        </div>
    )
}
