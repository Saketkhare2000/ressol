import axios from 'axios'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import "../FeaturedProperties/style.css"
import SamplePropertyImage from "../../assets/images/SamplePropertyImage.jpg";

// import { Link } from 'react-router-dom'
// import PropertyCard from '../PropertyCard'

const FeaturedProperties = () => {
    const [featuredPropertyList, setFeaturedPropertyList] = React.useState([])
    useEffect(() => {
        axios.get(`http://localhost:8000/api/filter?prime=True&popular=True&expand=image`)
            .then(res => {
                setFeaturedPropertyList(res.data)
            })
            .catch(err => {
                console.log(err);
            })
    }, [])
    console.log(featuredPropertyList)
    function numDifferentiation(value) {
        var val = Math.abs(value)
        if (val >= 10000000) {
            val = Math.floor((val / 10000000).toFixed(2)) + ' Cr';
        } else if (val >= 100000) {
            val = Math.floor((val / 100000).toFixed(2)) + ' Lac';
        }
        return val;
    }
    return (
        <div className="card-row">
            <h2 className="mobile-title">Featured Properties</h2>
            <div className="featured-card-row">
                {
                    featuredPropertyList.slice(0, 5).map((item, index) => (
                        <Link to={`/property/${item.id}`} className="card-details" key={index}>
                            <div className="img-container">
                                {/* <img src="https://images.unsplash.com/photo-1572120360610-d971b9d7767c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt="" /> */}
                                {
                                    item.image.length > 0 ?
                                        <img src={item.image[0].image.full_size} alt="" />
                                        :
                                        <img src={SamplePropertyImage} alt="" />
                                }
                            </div>
                            <p className="property-name">
                                {item.property_name}
                            </p>
                            <p className='property-prime'>Prime Property</p>
                            <p className="property-price">₹ {numDifferentiation(item.price)}</p>
                            <p className="property-location">
                                {item.location} | {item.city}
                            </p>

                        </Link>
                    ))

                }
            </div>
        </div>
    )
}

export default FeaturedProperties