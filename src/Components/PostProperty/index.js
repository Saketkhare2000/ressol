import React, { useRef } from "react";
import "./style.css";
import { useSelector } from "react-redux";
import axios from "axios";
import Select from 'react-select'
import cityData from "../../cities.json";
import stateData from "../../state.json";
// import data from "../../postDetails.json";
const PostProperty = () => {

  //name state
  const [name, setName] = React.useState("");
  const [property_for, setProperty_For] = React.useState("");
  //description state
  const [description, setDescription] = React.useState("");
  //price state
  const [price, setPrice] = React.useState();
  //location state
  const [city, setCity] = React.useState("");
  const [state, setState] = React.useState("");
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
    city,
    state,
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

  const submitProperty = (e) => {
    e.preventDefault();

    axios("http://127.0.0.1:8000/api/property/", {
      method: "post",
      data: data,
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Token ${key}`,
      }
    })

  }
  const cityOptions = cityData.map(city => {
    const { name } = city;
    return {
      value: name,
      label: name,
    }
  });
  const stateOptions = stateData.map(state => {
    const { name } = state;
    return {
      value: name,
      label: name,
    }
  });

  console.log(cityOptions)
  const options = [
    { value: 'Surat', label: 'Surat' },
    { value: 'Ahmedabad', label: 'Ahmedabad' },
    { value: 'Gandhinagar', label: 'Gandhinagar' },
    { value: 'Rajkot', label: 'Rajkot' },
    { value: 'Bhavnagar', label: 'Bhavnagar' },
    { value: 'Jamnagar', label: 'Jamnagar' },
    { value: 'Junagadh', label: 'Junagadh' },
    { value: 'Nadiad', label: 'Nadiad' },
  ]

  console.log(options)

  const filterOption = (option, inputValue) => {
    const { label, value } = option;
    const otherKey = options.filter(
      opt => opt.label === label && opt.value.includes(inputValue)
    );
    return value.includes(inputValue) || otherKey.length > 0;
  };


  return (
    <>
      {/* {
        loggedIn ? (

          <> */}
      <h3 className="mobile-title">Sell or Rent your Property</h3>
      <form action="" className="post-property">
        <div className="form-group">
          <h2 className="header-mobile">For</h2>
          <div className="select-options">
            <div className="select-option">
              <input type="radio" onChange={(e) => setProperty_For(e.target.value)} value="sale" name="for" id="sale" />
              <label htmlFor="sale">Sale</label>
            </div>
            <div className="select-option">
              <input type="radio" onChange={(e) => setProperty_For(e.target.value)} value="rent" name="for" id="rent" />
              <label htmlFor="rent">Rent</label>
            </div>
          </div>
        </div>
        <div className="form-group">
          <h2 className="header-mobile">Property Name</h2>
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
          <h2 className="header-mobile">City</h2>

          <Select options={cityOptions} openMenuOnClick={false} required />
        </div>
        <div className="form-group">
          <h2 className="header-mobile">State</h2>
          <Select options={stateOptions} openMenuOnClick={false} />
          {/* 
          <input type="text" onChange={(e) => setState(e.target.value)} name="state" id="state" /> */}
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
          <h2 className="header-mobile">Available From</h2>
          <input type="date" onChange={(e) => setAvailability(e.target.value)} name="availability" id="availability" />
        </div>
        <div className="form-group">
          <h2 className="header-mobile">Bedrooms</h2>
          {/* <input type="number" onChange={(e) => setBedrooms(e.target.value)} name="bedrooms" id="bedrooms" /> */}
          <div className="select-options">
            <div className="select-option">
              <input type="radio" onChange={(e) => setBedrooms(e.target.value)} name="bedrooms" id="1" value='1' />
              <label htmlFor="sale">1</label>
            </div>
            <div className="select-option">
              <input type="radio" onChange={(e) => setBedrooms(e.target.value)} name="bedrooms" id="2" value='2' />
              <label htmlFor="sale">2</label>
            </div>
            <div className="select-option">
              <input type="radio" onChange={(e) => setBedrooms(e.target.value)} name="bedrooms" id="3" value='3' />
              <label htmlFor="sale">3</label>
            </div>
            <div className="select-option">
              <input type="radio" onChange={(e) => setBedrooms(e.target.value)} name="bedrooms" id="4" value='4' />
              <label htmlFor="sale">4</label>
            </div>
            <div className="select-option">
              <input type="radio" onChange={(e) => setBedrooms(e.target.value)} name="bedrooms" id="5" value='5' />
              <label htmlFor="sale">5+</label>
            </div>
          </div>

        </div>
        <div className="form-group">
          <h2 className="header-mobile">Bathrooms</h2>
          <div className="select-options">
            <div className="select-option">
              <input type="radio" onChange={(e) => setBathrooms(e.target.value)} name="bathrooms" id="1" value='1' />
              <label htmlFor="sale">1</label>
            </div>
            <div className="select-option">
              <input type="radio" onChange={(e) => setBathrooms(e.target.value)} name="bathrooms" id="2" value='2' />
              <label htmlFor="sale">2</label>
            </div>
            <div className="select-option">
              <input type="radio" onChange={(e) => setBathrooms(e.target.value)} name="bathrooms" id="3" value='3' />
              <label htmlFor="sale">3</label>
            </div>
            <div className="select-option">
              <input type="radio" onChange={(e) => setBathrooms(e.target.value)} name="bathrooms" id="4" value='4' />
              <label htmlFor="sale">3+</label>
            </div>

          </div>
        </div>
        <div className="form-group">
          <h2 className="header-mobile">Visits</h2>
          <input type="number" onChange={(e) => setVisits(e.target.value)} name="visits" id="visits" />
        </div>
        <div className="form-group">
          <h2 className="header-mobile">Property Type</h2>
          <input type="text" onChange={(e) => setProperty_Type(e.target.value)} name="property_type" id="property_type" />
        </div>

        <button onClick={submitProperty} className="btn">Post Property</button>
      </form>
    </>
    //         ) :
    //         <h2> Please login to post property</h2>
    //     }
    //   </>
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