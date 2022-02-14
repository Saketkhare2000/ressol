import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import { CgSpinner } from "react-icons/cg";
import { AnimatePresence, motion } from "framer-motion";

import SamplePropertyImage from "../../assets/images/SamplePropertyImage.jpg";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Select from 'react-select'
import cityData from "../../cities.json";
import stateData from "../../state.json";
import slugify from "slugify";
import { WebContext } from "../../Context/WebContext";
import { uploadImage } from "../../actions/userActions";


// import data from "../../postDetails.json";
const PostProperty = () => {
  const [spinner, setSpinner] = React.useState(false);
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
  const [furnishing_status, setFurnishing_status] = React.useState("");
  const [possession_status, setPossession_Status] = React.useState("");
  //availability state
  const [availability, setAvailability] = React.useState("");

  const [property_type, setProperty_Type] = React.useState("");
  const [image, setImage] = useState([]);
  const [imagePostData, setImagePostData] = useState([]);
  console.log(image)
  console.log(imagePostData)

  const { setAlert } = useContext(WebContext);
  const userDetails = useSelector((state) => state.userData.userData);

  const date = new Date(availability);
  const dispatch = useDispatch();
  const dateString = date.toDateString();
  const navigate = useNavigate();
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
    posted_by: userDetails.id,
    image: imagePostData,
  }

  const loggedIn = useSelector(state => state.auth.loggedIn);
  const key = useSelector(state => state.auth.key);

  const submitProperty = (e) => {
    e.preventDefault();
    setSpinner(true);
    axios("http://127.0.0.1:8000/api/property/", {
      method: "post",
      data: data,
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Token ${key}`,
      }
    }).then(res => {
      setSpinner(false);
      setAlert({
        type: "success",
        message: "Property Posted Successfully",
        show: true
      })
      setTimeout(() => {
        setAlert({
          type: "",
          message: "",
          show: false
        })
      }, 2000)
      navigate("/dashboard")
    }).catch(err => {
      console.log(err);
      setSpinner(false);
      setAlert({
        type: "danger",
        message: err.message,
        show: true
      })
      setTimeout(() => {
        setAlert({
          type: "",
          message: "",
          show: false
        })
      }, 2000)
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

          <Select onChange={handleChangeCity} placeholder="Select City" options={cityOptions} openMenuOnClick={false} required />
        </div>
        <div className="form-group">
          <h2 className="header-mobile">State</h2>
          <Select onChange={handleChangeState} placeholder="Select State" options={stateOptions} openMenuOnClick={false} />
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
              <label htmlFor="furnishing_status">Furnished</label>
            </div>
            <div className="select-option">
              <input type="radio" onChange={(e) => setFurnishing_status(e.target.value)} name="furnishing_status" id="semifurnished" value='semifurnished' />
              <label htmlFor="furnishing_status">Semi-Furnished</label>
            </div>
            <div className="select-option">
              <input type="radio" onChange={(e) => setFurnishing_status(e.target.value)} name="furnishing_status" id="unfurnished" value='unfurnished' />
              <label htmlFor="furnishing_status">Unfurnished</label>
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
              <label htmlFor="possession_status">Under Construction</label>
            </div>
            <div className="select-option">
              <input type="radio" onChange={(e) => setPossession_Status(e.target.value)} name="possession_status" id="ready-to-move" value='Ready To Move' />
              <label htmlFor="possession_status">Ready To Move</label>
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
              <label htmlFor="bathrooms">1</label>
            </div>
            <div className="select-option">
              <input type="radio" onChange={(e) => setBathrooms(e.target.value)} name="bathrooms" id="2" value='2' />
              <label htmlFor="bathrooms">2</label>
            </div>
            <div className="select-option">
              <input type="radio" onChange={(e) => setBathrooms(e.target.value)} name="bathrooms" id="3" value='3' />
              <label htmlFor="bathrooms">3</label>
            </div>
            <div className="select-option">
              <input type="radio" onChange={(e) => setBathrooms(e.target.value)} name="bathrooms" id="4" value='4+' />
              <label htmlFor="bathrooms">4+</label>
            </div>

          </div>
        </div>

        <div className="form-group">
          <h2 className="header-mobile">Property Type</h2>
          <input type="text" onChange={(e) => setProperty_Type(e.target.value)} name="property_type" id="property_type" />
        </div>
        <div className="form-group">
          <h2 className="header-mobile">Photos</h2>
          <div className="upload-image-section">
            {/* 1st Image Upload Container  */}
            <div className="upload-image-container">
              {image.length === 0 ? (
                <img src={SamplePropertyImage} alt="property" />
              ) : (
                <img src={image[0].image.full_size} alt="property" />
              )}
              <input type="file" accept="image/*" onChange={(e) => {
                (dispatch(uploadImage(e.target.files[0]))
                  .then((res) => {

                    setImage(image => [...image, res]);
                    setImagePostData(imagePostData => [...imagePostData, res.pk]);

                  }))
              }} name="photos" id="photo" />
            </div>
            {/* 2nd Image Upload Container  */}

            <div className="upload-image-container">
              {image.length <= 1 ? (
                <img src={SamplePropertyImage} alt="property" />
              ) : (
                <img src={image[1].image.full_size} alt="property" />
              )}
              <input type="file" accept="image/*" onChange={(e) => {
                (dispatch(uploadImage(e.target.files[0]))
                  .then((res) => {
                    setImage(image => [...image, res]);
                    setImagePostData(imagePostData => [...imagePostData, res.pk]);


                  }))
              }} name="photos" id="photo" />
            </div>
            {/* 3rd Image Upload Container  */}

            <div className="upload-image-container">
              {image.length <= 2 ? (
                <img src={SamplePropertyImage} alt="property" />
              ) : (
                <img src={image[2].image.full_size} alt="property" />
              )}
              <input type="file" accept="image/*" onChange={(e) => {
                (dispatch(uploadImage(e.target.files[0]))
                  .then((res) => {

                    setImage(image => [...image, res]);
                    setImagePostData(imagePostData => [...imagePostData, res.pk]);


                  }))
              }} name="photos" id="photo" />
            </div>
            {/* 4th Image Upload Container  */}

            <div className="upload-image-container">
              {image.length <= 3 ? (
                <img src={SamplePropertyImage} alt="property" />
              ) : (
                <img src={image[3].image.full_size} alt="property" />
              )}
              <input type="file" accept="image/*" onChange={(e) => {
                (dispatch(uploadImage(e.target.files[0]))
                  .then((res) => {

                    setImage(image => [...image, res]);
                    setImagePostData(imagePostData => [...imagePostData, res.pk]);


                  }))
              }} name="photos" id="photo" />
            </div>
            {/* 5th Image Upload Container  */}

            <div className="upload-image-container">
              {image.length <= 4 ? (
                <img src={SamplePropertyImage} alt="property" />
              ) : (
                <img src={image[4].image.full_size} alt="property" />
              )}
              <input type="file" accept="image/*" onChange={(e) => {
                (dispatch(uploadImage(e.target.files[0]))
                  .then((res) => {

                    setImage(image => [...image, res]);
                    setImagePostData(imagePostData => [...imagePostData, res.pk]);


                  }))
              }} name="photos" id="photo" />
            </div>
            {/* 6th Image Upload Container  */}

            <div className="upload-image-container">
              {image.length <= 5 ? (
                <img src={SamplePropertyImage} alt="property" />
              ) : (
                <img src={image[5].image.full_size} alt="property" />
              )}
              <input type="file" accept="image/*" onChange={(e) => {
                (dispatch(uploadImage(e.target.files[0]))
                  .then((res) => {
                    setImage(image => [...image, res]);
                    setImagePostData(imagePostData => [...imagePostData, res.pk]);

                  }))
              }} name="photos" id="photo" />
            </div>
          </div>
          {/* <div class="parent upload-image-section">
            <div class="div1 upload-image-container"> <img src={SamplePropertyImage} alt="sample-property" />
              <input type="file" accept="image/*" onChange={(e) => console.log(e.target)} multiple={true} name="photos" id="photo" /></div>
            <div class="div2 upload-image-container"> <img src={SamplePropertyImage} alt="sample-property" />
              <input type="file" accept="image/*" onChange={(e) => console.log(e.target)} multiple={true} name="photos" id="photo" /></div>
            <div class="div3 upload-image-container"> <img src={SamplePropertyImage} alt="sample-property" />
              <input type="file" accept="image/*" onChange={(e) => console.log(e.target)} multiple={true} name="photos" id="photo" /></div>
            <div class="div4 upload-image-container"> <img src={SamplePropertyImage} alt="sample-property" />
              <input type="file" accept="image/*" onChange={(e) => console.log(e.target)} multiple={true} name="photos" id="photo" /></div>
            <div class="div5 upload-image-container"> <img src={SamplePropertyImage} alt="sample-property" />
              <input type="file" accept="image/*" onChange={(e) => console.log(e.target)} multiple={true} name="photos" id="photo" /></div>
            <div class="div6 upload-image-container"> <img src={SamplePropertyImage} alt="sample-property" />
              <input type="file" accept="image/*" onChange={(e) => console.log(e.target)} multiple={true} name="photos" id="photo" /></div>
          </div> */}
        </div>
        {
          spinner ?
            <div className="spinner-container">
              <CgSpinner className="spinner" />
            </div>
            :
            <button
              className="btn"
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.01 }}
              onClick={submitProperty}
            >
              Post Property
            </button>}
      </form>
    </>
    //         ) :
    //         <h2> Please login to post property</h2>
    //     }
    //   </>
  );
};

export default PostProperty;
