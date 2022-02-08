import React, { useRef } from "react";
import "./style.css";
import { useSelector } from "react-redux";
import axios from "axios";
// import data from "../../postDetails.json";
const PostProperty = () => {

  //name state
  const [name, setName] = React.useState("");
  //description state
  const [description, setDescription] = React.useState("");
  //price state
  const [price, setPrice] = React.useState();
  //location state
  const [location, setLocation] = React.useState("");
  //size state
  const [property_size, setProperty_Size] = React.useState("");
  //bedrooms state
  const [bedrooms, setBedrooms] = React.useState();
  //bathrooms state
  const [bathrooms, setBathrooms] = React.useState();
  //address state
  const [address, setAddress] = React.useState("");
  //pinCode state
  const [pincode, setPincode] = React.useState();
  //prime state
  const [prime_property, setPrime_Property] = React.useState(false);
  //furnished state
  const [furnishing_status, setFurnishing_status] = React.useState(false);
  //availability state
  const [availability, setAvailability] = React.useState("");
  //visit state
  const [visits, setVisits] = React.useState();
  //type state
  const [property_type, setProperty_Type] = React.useState("");
  //time state
  const [timestamp, setTimestamp] = React.useState("");

  const data = {
    features: [],
    amenities: [],
    name: name,
    description: description,
    address: address,
    location: location,
    pincode: pincode,
    prime_property: true,
    price: parseInt(price),
    property_size: parseInt(property_size),
    furnishing_status: true,
    timestamp: timestamp,
    availability: availability,
    bedrooms: parseInt(bedrooms),
    bathrooms: parseInt(bathrooms),
    visits: parseInt(visits),
    property_type: property_type,
    posted_by: 1
  }


  const loggedIn = useSelector(state => state.auth.loggedIn);
  const key = useSelector(state => state.auth.key);
  console.log(loggedIn)
  const submitProperty = (e) => {
    e.preventDefault();
    console.log(data);
    // axios.post("http://127.0.0.1:8000/api/property/", {
    //   data: data,
    //   headers: {
    //     Authorization: `Token ${key}`,
    //   },
    // })
    axios("http://127.0.0.1:8000/api/property/", {
      method: "post",
      data: data,
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Token ${key}`,
      }
    })

  }

  return (
    <>
      {
        loggedIn ? (

          <>
            <h3 className="mobile-title">Sell or Rent your Property</h3>
            <form action="" className="post-property">
              {/* {data.map((item, index) => {
          return (
            <div key={index} className="form-group">
              <h2 className="header-mobile">{item.title}</h2>
              <div className="form-category">
                <label htmlFor="select"> {item.category.name}</label>
                <select name="" id="">
                  {item.category.options.map((option, key) => {
                    return (
                      <option key={key} value={option}>
                        {option}
                      </option>
                    );
                  })}
                </select>
              </div>
              <hr />
            </div>
          );
        })} */}
              <div className="form-group">
                <h2 className="header-mobile">Name</h2>
                <input type="text" onChange={(e) => setName(e.target.value)} name="name" id="name" />
              </div>
              <div className="form-group">
                <h2 className="header-mobile">Description</h2>
                <input type="text" onChange={(e) => setDescription(e.target.value)} name="description" id="description" />
              </div>
              <div className="form-group">
                <h2 className="header-mobile">Address</h2>
                <input type="text" onChange={(e) => setAddress(e.target.value)} name="address" id="address" />
              </div>
              <div className="form-group">
                <h2 className="header-mobile">Location</h2>
                <input type="text" onChange={(e) => setLocation(e.target.value)} name="location" id="location" />
              </div>
              <div className="form-group">
                <h2 className="header-mobile">Pincode</h2>
                <input type="text" onChange={(e) => setPincode(e.target.value)} name="pincode" id="pincode" />
              </div>
              <div className="form-group">
                <h2 className="header-mobile">Price</h2>
                <input type="number" onChange={(e) => setPrice(e.target.value)} name="price" id="price" />
              </div>
              <div className="form-group">
                <h2 className="header-mobile">Size</h2>
                <input type="number" onChange={(e) => setProperty_Size(e.target.value)} name="property_size" id="property_size" />
              </div>
              <div className="form-group">
                <h2 className="header-mobile">Furnishing Status</h2>
                <input type="checkbox" onChange={(e) => setFurnishing_status(e.target.value)} name="furnishing_status" id="furnishing_status" />
              </div>
              <div className="form-group">
                <h2 className="header-mobile">Prime Property</h2>
                <input type="checkbox" onChange={(e) => setPrime_Property(e.target.value)} name="prime_property" id="prime_property" />
              </div>
              <div className="form-group">
                <h2 className="header-mobile">Timestamp</h2>
                <input type="date" onChange={(e) => setTimestamp(e.target.value)} name="timestamp" id="timestamp" />
              </div>
              <div className="form-group">
                <h2 className="header-mobile">Availability</h2>
                <input type="text" onChange={(e) => setAvailability(e.target.value)} name="availability" id="availability" />
              </div>
              <div className="form-group">
                <h2 className="header-mobile">bedrooms</h2>
                <input type="number" onChange={(e) => setBedrooms(e.target.value)} name="bedrooms" id="bedrooms" />
              </div>
              <div className="form-group">
                <h2 className="header-mobile">bathrooms</h2>
                <input type="number" onChange={(e) => setBathrooms(e.target.value)} name="bathrooms" id="bathrooms" />
              </div>
              <div className="form-group">
                <h2 className="header-mobile">visits</h2>
                <input type="number" onChange={(e) => setVisits(e.target.value)} name="visits" id="visits" />
              </div>
              <div className="form-group">
                <h2 className="header-mobile">Property Type</h2>
                <input type="text" onChange={(e) => setProperty_Type(e.target.value)} name="property_type" id="property_type" />
              </div>

              <button onClick={submitProperty} className="btn">Submit</button>
            </form>
          </>) :
          <h2> Please login to post property</h2>
      }
    </>
  );
};

export default PostProperty;


// "id": 6,
// "features": [],
// "amenities": [],
// "name": "bungalow",
// "description": "This is my palace",
// "address": "NAIR",
// "location": "Vadodara",
// "pincode": "390004",
// "prime_property": false,
// "price": 10000000,
// "property_size": 2500,
// "furnishing_status": true,
// "timestamp": "2022-02-08T13:48:00Z",
// "availability": "now",
// "bedrooms": 20,
// "bathrooms": 6,
// "visits": 0,
// "property_type": "VI",
// "posted_by": 6