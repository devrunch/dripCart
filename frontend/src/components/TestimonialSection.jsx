import React from 'react'
import "../css/component css/TestimonialSection.css"
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import user1 from "../images/user1.jpg"
import user2 from "../images/user2.jpg"
import user3 from "../images/user3.jpg"
export default function TestimonialSection() {
  return (
    <div className='testimonial-section'>
            <div className="trending-section-top">
                <h2>Our <span> Testimonials. </span> </h2>
            </div>
            <div className="testimonial-section-bottom">
                <div className="testimonial-card">
                    <FormatQuoteIcon className='quote-icon'/>
                    <img src={user1} alt="" />
                    <h4>Sachin Jha</h4>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt vitae odio fuga. Harum facilis corrupti saepe culpa similique eveniet, fugiat aspernatur esse repudiandae, voluptatibus quae cum officia laudantium est at?</p>
                    <div className="star-section">
                        <StarIcon className='star-icon'/>
                        <StarIcon className='star-icon'/>
                        <StarIcon className='star-icon'/>
                        <StarIcon className='star-icon'/>
                        <StarIcon className='star-icon'/>
                    </div>
                    <div className="testimonial-card-overlay">
                    </div>
                </div>
                <div className="testimonial-card">
                    <FormatQuoteIcon className='quote-icon'/>
                    <img src={user2} alt="" />
                    <h4>Vikas</h4>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt vitae odio fuga. Harum facilis corrupti saepe culpa similique eveniet, fugiat aspernatur esse repudiandae, voluptatibus quae cum officia laudantium est at?</p>
                    <div className="star-section">
                        <StarIcon className='star-icon'/>
                        <StarIcon className='star-icon'/>
                        <StarIcon className='star-icon'/>
                        <StarIcon className='star-icon'/>
                        <StarIcon className='star-icon'/>
                    </div>
                </div>
                <div className="testimonial-card">
                    <FormatQuoteIcon className='quote-icon'/>
                    <img src={user3} alt="" />
                    <h4>Manisha</h4>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt vitae odio fuga. Harum facilis corrupti saepe culpa similique eveniet, fugiat aspernatur esse repudiandae, voluptatibus quae cum officia laudantium est at?</p>
                    <div className="star-section">
                        <StarIcon className='star-icon'/>
                        <StarIcon className='star-icon'/>
                        <StarIcon className='star-icon'/>
                        <StarIcon className='star-icon'/>
                        <StarHalfIcon className='star-icon'/>
                    </div>
                    <div className="testimonial-card-overlay"></div>
                </div>
            </div>
            <div className="testimonial-section-description">
                <h6>Lorem ipsum dolor sit, amet consectetur adipisicing elit. A obcaecati provident iusto commodi voluptatem. Quo voluptate nisi, exercitationem rem quia tenetur labore veritatis quos nihil!</h6>
            </div>
            <div className="pink-circle"></div>
            <div className="blue-circle"></div>
    </div>
  )
}
