import React , {useEffect , useState} from 'react'
import "../css/page css/HomePage.css"
import { Link } from 'react-router-dom'
import t_shirt from "../images/t-shirt 2.png"
import pillow from "../images/offer1.png"
import cup from "../images/offer2.png"
import FavoriteIcon from '@mui/icons-material/Favorite';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ProductCard from '../components/ProductCard'
import mockup from "../images/mockup.png"
import hoodie from "../images/premium-hoodie.png"
import landingImage from "../images/landing image.png"
import TestimonialSection from '../components/TestimonialSection'
import LaunchIcon from '@mui/icons-material/Launch';
import CategorySection from '../components/CategorySection'

export default function HomePage() {
    const [product, setProduct] = useState([])

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
        <>
            <div className="landing-section">
                <div className="landing-section-left">
                    <h4>Welcome To</h4>
                    <h1>Drip Creators</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe eveniet quidem animi a, est sequi nam deserunt iste quae doloribus quis quia accusantium quos asperiores. Aperiam illum eaque voluptate ea.</p>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur modi explicabo quos, tempore molestiae iste ullam obcaecati namx`</p>
                    <a href="#" className='link-a btn-a'>Explore Now</a>
                </div>
                <div className="landing-section-right">
                    <img src={landingImage} alt="" />
                </div>
            </div>
            <div className="trending-section">
                <div className="trending-section-top">
                    <h2><span>Trending </span> Products</h2>
                </div>
                <div className="trending-section-bottom">
                <Link to="">
                        <div className="trending-product-card">
                            <FavoriteIcon className='heart-icon' />
                            <img src={cup} alt="" />
                        </div>
                    </Link>

                    <Link to="">
                        <div className="trending-product-card">
                            <FavoriteIcon className='heart-icon' />
                            <img src={t_shirt} alt="" />
                        </div>
                    </Link>
                   
                    <Link to="">
                        <div className="trending-product-card">
                            <FavoriteIcon className='heart-icon' />
                            <img src={pillow} alt="" />
                        </div>
                    </Link>
                </div>
            </div>

            <CategorySection/>

            <div className="about-section">
                <div className="about-section-left">
                    <h2>Why Us?</h2>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Recusandae est id repellat enim voluptatum necessitatibus quod ullam perferendis tenetur quos omnis ex repudiandae iusto nam nesciunt, amet earum labore doloremque. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Recusandae est id repellat enim voluptatum necessitatibus quod ullam perferendis tenetur quos omnis ex repudiandae iusto nam nesciunt, amet earum labore doloremque.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod quia sint architecto minus atque odio maxime excepturi doloremque unde iusto at cupiditate, est eaque reprehenderit veniam non ducimus! Vel ea in tenetur et fugit odit aperiam eligendi, minima officiis a.</p>
                    <h4>Connect With Us</h4>
                    <div className="social-media-container">
                        <Link to="" className='link-a'><InstagramIcon className='social-media-icons' /></Link>
                        <Link to="" className='link-a'><YouTubeIcon className='social-media-icons' /></Link>
                        <Link to="" className='link-a'><WhatsAppIcon className='social-media-icons' /></Link>
                    </div>
                    <Link to="" className='link-a btn-a'>Know More</Link>
                </div>
                <div className="about-section-right">
                    <img src={hoodie} alt="" />
                </div>
            </div>
            <div className="scroll-product-section">
                <div className="trending-section-top">
                    <h2><span>Explore </span> Products</h2>
                </div>
                <div className="scroll-x-container">
                {product.slice().reverse().slice(0,7).map((elem) => {
                        return(
                            <ProductCard key={elem._id} image={elem.image} name={elem.name} description={elem.summary} price={elem.price} id={elem._id}/>
                        )
                    })}
                    <Link to="/product" className='view-all-product-link-card'>
                        <h3>Liked Our New Product ?</h3>
                        <h4>View All</h4>
                        <LaunchIcon/>
                    </Link>
                </div>
                <h4>SCROLL RIGHT MORE </h4>
            </div>
            <TestimonialSection />
            <div className="custom-design-section">
                <div className="custom-design-left">
                    <h2>Customize Product</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo, itaque minima voluptatibus consectetur ea eaque quos, non autem nam debitis nostrum illum delectus excepturi. Ipsa quibusdam eaque cum tempore reiciendis voluptas commodi nisi veniam odit delectus. Consequuntur commodi vitae eaque rem, vero dignissimos reprehenderit, voluptatem, incidunt nobis qui obcaecati possimus!</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium adipisci distinctio at, cupiditate nobis blanditiis tempore enim placeat ullam labore ducimus cumque beatae ipsa quis doloribus, veritatis fugiat recusandae nihil?</p>
                    <a href="#" className='link-a btn-a flex-btn'>Connect On WhatsApp <WhatsAppIcon/></a>
                </div>
                <div className="custom-design-right">
                    <img src={mockup} alt="" />
                </div>
            </div>
        </>
    )
}
