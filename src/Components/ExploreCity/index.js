import React from 'react'
import DisplayCard from '../DisplayCard';
import data from "../../explore-city.json";

const ExploreCity = () => {
    return (
        <div className="row">
            <div className="card-row">
                <h2 className="mobile-title">Explore Real Estate in your City</h2>
                <div className="propertycard-row">
                    {data.map((item, index) => {
                        return (
                            <DisplayCard
                                key={index}
                                // title={item.title}
                                data={item}
                            />
                        );
                    })}
                    {/* <DisplayCard title={item.title} data={item.cardDetails} /> */}
                </div>
            </div>

        </div>
    )
}


export default ExploreCity