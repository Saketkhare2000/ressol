import React, { useRef } from "react";
import "./style.css";
import { useSelector } from "react-redux";
import axios from "axios";
import Select from 'react-select'
import cityData from "../../cities.json";
import stateData from "../../state.json";
import slugify from "slugify";
// import data from "../../postDetails.json";
const PostProperty = () => {

  //name state
  const [name, setName] = React.useState("");
  const [for_status, setFor_Status] = React.useState("");
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
  const [possession_status, setPossession_Status] = React.useState("");
  //availability state
  const [availability, setAvailability] = React.useState("");

  const [property_type, setProperty_Type] = React.useState("");

  const date = new Date(availability);
  const dateString = date.toDateString();
  const data = {
    features: [],
    amenities: [],
    name: slugify(name, '_'),
    property_name: name,
    description: description,
    address: address,
    city: city.toLowerCase(),
    for_status: for_status,
    possession: possession_status,
    state: state.toLowerCase(),
    pincode: pincode,
    prime_property: true,
    price: parseInt(price),
    property_size: parseInt(property_size),
    furnishing_status: furnishing_status,
    availability: availability,
    bedrooms: parseInt(bedrooms),
    bathrooms: parseInt(bathrooms),
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

  const handleChangeCity = (selectedOption) => {

    setCity(selectedOption.value);
  }
  const handleChangeState = (selectedOption) => {
    setState(selectedOption.value);
  }




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
              <input type="radio" onChange={(e) => setFor_Status(e.target.value)} value="sale" name="for" id="sale" />
              <label htmlFor="sale">Sale</label>
            </div>
            <div className="select-option">
              <input type="radio" onChange={(e) => setFor_Status(e.target.value)} value="rent" name="for" id="rent" />
              <label htmlFor="rent">Rent</label>
            </div>
          </div>
        </div>
        <div className="form-group">
          <h2 className="header-mobile">Property Name</h2>
          <input type="text" onChange={(e) => setName(e.target.value)} placeholder="Enter Property or Project Name" name="name" id="name" />
        </div>
        <div className="form-group">
          <h2 className="header-mobile">Description</h2>
          <input type="text" onChange={(e) => setDescription(e.target.value)} placeholder="Enter Property Description" name="description" id="description" />
        </div>
        <div className="form-group">
          <h2 className="header-mobile">Locality</h2>
          <input type="text" onChange={(e) => setAddress(e.target.value)} placeholder="Enter Locality" name="address" id="address" />
        </div>
        <div className="form-group">
          <h2 className="header-mobile">City</h2>

          <Select onChange={handleChangeCity} options={cityOptions} openMenuOnClick={false} required />
        </div>
        <div className="form-group">
          <h2 className="header-mobile">State</h2>
          <Select onChange={handleChangeState} options={stateOptions} openMenuOnClick={false} />
          {/* 
          <input type="text" onChange={(e) => setState(e.target.value)} name="state" id="state" /> */}
        </div>
        <div className="form-group">
          <h2 className="header-mobile">Pincode</h2>
          <input type="text" onChange={(e) => setPincode(e.target.value)} placeholder="Enter Pincode" name="pincode" id="pincode" />
        </div>
        <div className="form-group">
          <h2 className="header-mobile">Total Price</h2>
          <input type="number" onChange={(e) => setPrice(e.target.value)} name="price" id="price" placeholder="Enter Total Expected Price" />
        </div>
        <div className="form-group">
          <h2 className="header-mobile">Total Area</h2>
          <input type="number" onChange={(e) => setProperty_Size(e.target.value)} placeholder="Enter Total Area (in sq-ft)" name="property_size" id="property_size" />
        </div>
        <div className="form-group">
          <h2 className="header-mobile">Furnishing Status</h2>
          <div className="select-options">
            <div className="select-option">
              <input type="radio" onChange={(e) => setFurnishing_status(e.target.value)} name="furnishing_status" id="furnished" value='furnished' />
              <label htmlFor="sale">Furnished</label>
            </div>
            <div className="select-option">
              <input type="radio" onChange={(e) => setFurnishing_status(e.target.value)} name="furnishing_status" id="semifurnished" value='semifurnished' />
              <label htmlFor="sale">Semi-Furnished</label>
            </div>
            <div className="select-option">
              <input type="radio" onChange={(e) => setFurnishing_status(e.target.value)} name="furnishing_status" id="unfurnished" value='unfurnished' />
              <label htmlFor="sale">Unfurnished</label>
            </div>

          </div>
        </div>
        <div className="form-group">
          <h2 className="header-mobile">Prime Property</h2>
          <input type="checkbox" onChange={(e) => setPrime_Property(e.target.value)} name="prime_property" id="prime_property" />
        </div>
        {/* <div className="form-group">
          <h2 className="header-mobile">Timestamp</h2>
          <input type="date" onChange={(e) => setTimestamp(e.target.value)} name="timestamp" id="timestamp" />
        </div> */}
        <div className="form-group">
          <h2 className="header-mobile">Possession Status</h2>
          {/* <input type="number" onChange={(e) => setBedrooms(e.target.value)} name="bedrooms" id="bedrooms" /> */}
          <div className="select-options">
            <div className="select-option">
              <input type="radio" onChange={(e) => setPossession_Status(e.target.value)} name="possession_status" id="under-construction" value='Under Construction' />
              <label htmlFor="sale">Under Construction</label>
            </div>
            <div className="select-option">
              <input type="radio" onChange={(e) => setPossession_Status(e.target.value)} name="possession_status" id="ready-to-move" value='Ready To Move' />
              <label htmlFor="sale">Ready To Move</label>
            </div>

          </div>

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
              <input type="radio" onChange={(e) => setBedrooms((e.target.value))} name="bedrooms" id="1" value='1' />
              <label htmlFor="bedrooms">1</label>
            </div>
            <div className="select-option">
              <input type="radio" onChange={(e) => setBedrooms(e.target.value)} name="bedrooms" id="2" value='2' />
              <label htmlFor="bedrooms">2</label>
            </div>
            <div className="select-option">
              <input type="radio" onChange={(e) => setBedrooms(e.target.value)} name="bedrooms" id="3" value='3' />
              <label htmlFor="bedrooms">3</label>
            </div>
            <div className="select-option">
              <input type="radio" onChange={(e) => setBedrooms(e.target.value)} name="bedrooms" id="4" value='4' />
              <label htmlFor="bedrooms">4</label>
            </div>
            <div className="select-option">
              <input type="radio" onChange={(e) => setBedrooms(e.target.value)} name="bedrooms" id="5" value='5+' />
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
              <input type="radio" onChange={(e) => setBathrooms(e.target.value)} name="bathrooms" id="4" value='4+' />
              <label htmlFor="sale">4+</label>
            </div>

          </div>
        </div>
        {/* <div className="form-group">
          <h2 className="header-mobile">Visits</h2>
          <input type="number" onChange={(e) => setVisits(e.target.value)} name="visits" id="visits" />
        </div> */}
        <div className="form-group">
          <h2 className="header-mobile">Property Type</h2>
          <input type="text" onChange={(e) => setProperty_Type(e.target.value)} name="property_type" id="property_type" />
        </div>
        <div className="form-group">
          <h2 className="header-mobile">Photos</h2>
          <input type="file" name="photos" id="photo" />
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
