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
import floorData from "../../floor.json";
import amenitiesData from "../../amenities.json";
import slugify from "slugify";
import { WebContext } from "../../Context/WebContext";
import { uploadImage } from "../../actions/userActions";


// import data from "../../postDetails.json";
const PostProperty = () => {
  const [spinner, setSpinner] = React.useState(false);
  //name state
  const [name, setName] = React.useState("");
  const [for_status, setFor_Status] = React.useState(null);
  //description state
  const [description, setDescription] = React.useState(null);
  //price state
  const [price, setPrice] = React.useState(null);
  //location state
  const [city, setCity] = React.useState("");
  const [state, setState] = React.useState("");
  //size state
  const [property_size, setProperty_Size] = React.useState(null);
  //bedrooms state
  const [bedrooms, setBedrooms] = React.useState(null);
  //bathrooms state
  const [bathrooms, setBathrooms] = React.useState(null);
  const [location, setLocation] = React.useState(null);
  //address state
  const [address, setAddress] = React.useState(null);
  //pinCode state
  const [pincode, setPincode] = React.useState(null);
  //prime state
  const [prime_property, setPrime_Property] = React.useState(false);
  //furnished state
  const [furnishing_status, setFurnishing_status] = React.useState(null);
  const [possession_status, setPossession_Status] = React.useState("");
  //availability state
  const [availability, setAvailability] = React.useState(null);
  const [floor, setFloor] = React.useState(null);
  const [property_type, setProperty_Type] = React.useState(null);
  const [image, setImage] = useState([]);
  const [imagePostData, setImagePostData] = useState([]);
  const [cornerPlot, setCornerPlot] = useState(null)
  const [gatedCommunity, setGatedCommunity] = useState(null)
  const [amenities, setAmenities] = useState(null)
  const { setAlert } = useContext(WebContext);
  const userDetails = useSelector((state) => state.userData.userData);

  const date = new Date(availability);
  const dispatch = useDispatch();
  const dateString = date.toDateString();
  const navigate = useNavigate();
  const data = {
    amenities: [],
    floor: floor,
    name: slugify(name, '_'),
    property_name: name,
    description: description,
    location: location,
    address: address,
    city: city.toLowerCase(),
    for_status: for_status,
    possession: possession_status.toLowerCase(),
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
    corner: cornerPlot,
    gated: gatedCommunity,
    amenities: amenities
  }

  const loggedIn = useSelector(state => state.auth.loggedIn);
  const key = useSelector(state => state.auth.key);

  const submitProperty = (e) => {
    e.preventDefault();
    console.log(data)
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
  const typeOptions = [
    { value: "FL", label: "Flat" },
    { value: "VI", label: "House/Villa" },
    { value: "PL", label: "Plot" },
    { value: "CM", label: "Commercial" },
  ];
  const floorOptions = floorData.map(floor => {
    const { value, label } = floor;
    return {
      value: value,
      label: label,
    }
  });
  const amenitiesOptions = amenitiesData.map(amenities => {
    const { value, label } = amenities;
    return {
      value: value,
      label: label,
    }
  })
  const handleChangeCity = (selectedOption) => {

    setCity(selectedOption.value);
  }
  const handleChangeState = (selectedOption) => {
    setState(selectedOption.value);
  }
  const selectPropertyType = (selectedOption) => {
    setProperty_Type(selectedOption.value);
  }
  const selectFloor = (selectedOption) => {
    setFloor(selectedOption.value);
  }
  const handleAmenities = (e) => {
    const amenitiesValue = []
    e.map(amenities => {
      return amenitiesValue.push(amenities.value)
    })
    setAmenities(amenitiesValue)
  }

  return (
    <>
      {/* {
        loggedIn ? (

          <> */}
      <h3 className="mobile-title">Sell or Rent your Property</h3>
      <form action="" className="post-property">
        <div className="form-section">
          <h2 className="section-title">Property Details</h2>
          {/* Property For  */}
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
              {/* <div className="select-option">
              <input type="radio" onChange={(e) => setFor_Status(e.target.value)} value="pg" name="for" id="rent" />
              <label htmlFor="rent">PG/Hostel</label>
            </div> */}
            </div>
          </div>
          {/* Property Type  */}
          <div className="form-group">
            <h2 className="header-mobile">Property Type</h2>
            <Select onChange={selectPropertyType} placeholder="Select Property Type" options={typeOptions} required />
          </div>
          {/* Property Name  */}
          <div className="form-group">
            <h2 className="header-mobile">Name of Property/Project</h2>
            <input type="text" onChange={(e) => setName(e.target.value)} placeholder="Name of Property/Project" name="name" id="name" />
          </div>
          {/* Property Description  */}
          <div className="form-group">
            <h2 className="header-mobile">Property Description</h2>
            <input type="text" onChange={(e) => setDescription(e.target.value)} placeholder="Property Description" name="description" id="description" />
          </div>

        </div>
        <div className="form-section">
          <h2 className="section-title">Property Location</h2>
          {/* Locality  */}
          <div className="form-group">
            <h2 className="header-mobile">Locality</h2>
            <input type="text" onChange={(e) => setLocation(e.target.value)} placeholder="Locality" name="locality" id="locality" />
          </div>

          {/* Address */}
          <div className="form-group">
            <h2 className="header-mobile">Address</h2>
            <input type="text" onChange={(e) => setAddress(e.target.value)} placeholder="Enter Address" name="address" id="address" />
          </div>

          {/* Pincode  */}
          <div className="form-group">
            <h2 className="header-mobile">Pincode</h2>
            <input type="text" onChange={(e) => setPincode(e.target.value)} placeholder="Enter Pincode" name="pincode" id="pincode" />
          </div>
          {/* City  */}
          <div className="form-group">
            <h2 className="header-mobile">City</h2>
            <Select onChange={handleChangeCity} placeholder="Select City" options={cityOptions} openMenuOnClick={false} required />
          </div>
          {/* State  */}
          <div className="form-group">
            <h2 className="header-mobile">State</h2>
            <Select onChange={handleChangeState} placeholder="Select State" options={stateOptions} openMenuOnClick={false} />
          </div>
        </div>
        {/* ------------- Features Starts ----------------- */}
        {(() => {
          if (property_type === "FL" || property_type === "VI") {
            return (
              <div className="form-section">
                <h2 className="section-title">Property Feature</h2>
                {/* Furnishing Status  */}
                <div className="form-group" >
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
                {/* Area  */}
                <div className="form-group">
                  <h2 className="header-mobile">Total Area (in sqft)</h2>
                  <input type="text" onChange={(e) => setProperty_Size(e.target.value)} placeholder="Enter Total Area (Ex - 1500)" name="property_size" id="property_size" />
                </div>
                {/* Possession Status  */}
                <div className="form-group">
                  <h2 className="header-mobile">Possession Status</h2>
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
                {/* Available From  */}
                <div className="form-group">
                  <h2 className="header-mobile">Available From</h2>
                  <input type="date" onChange={(e) => setAvailability(e.target.value)} name="availability" id="availability" />
                </div>
                {/* Bedrooms  */}
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
                {/* Bathrooms  */}
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

                {/* Floor  */}
                <div className="form-group">
                  <h2 className="header-mobile">Floor</h2>
                  <Select width='280px' onChange={selectFloor} placeholder="Select Floor" options={floorOptions} required />
                </div>
                {/* Amenities */}
                <div className="form-group">
                  <h2 className="header-mobile">Amenities Available</h2>
                  <Select onChange={(e) => handleAmenities(e)} isMulti closeMenuOnSelect={false} options={amenitiesOptions} placeholder="Amenities Available" required />
                </div>
              </div>
            )
          } else if (property_type === "PL") {
            return (
              <div className="form-section">
                <h2 className="section-title">Property Feature</h2>
                {/* Area  */}
                <div className="form-group">
                  <h2 className="header-mobile">Total Area (in sqft)</h2>
                  <input type="number" onChange={(e) => setProperty_Size(e.target.value)} placeholder="Enter Total Area (Ex - 1500)" name="property_size" id="property_size" />
                </div>
                {/* Corner Plot  */}
                <div className="form-group">
                  <h2 className="header-mobile">Corner Plot</h2>
                  <div className="select-options">
                    <div className="select-option">
                      <input type="radio" onChange={(e) => setCornerPlot(e.target.value)} value="True" name="for" id="true" />
                      <label htmlFor="true">Yes</label>
                    </div>
                    <div className="select-option">
                      <input type="radio" onChange={(e) => setCornerPlot(e.target.value)} value="False" name="for" id="false" />
                      <label htmlFor="false">No</label>
                    </div>
                  </div>
                </div>
                {/* Gated Community  */}
                <div className="form-group">
                  <h2 className="header-mobile">Gated Community</h2>
                  <div className="select-options">
                    <div className="select-option">
                      <input type="radio" onChange={(e) => setGatedCommunity(e.target.value)} value="True" name="for" id="true" />
                      <label htmlFor="true">Yes</label>
                    </div>
                    <div className="select-option">
                      <input type="radio" onChange={(e) => setGatedCommunity(e.target.value)} value="False" name="for" id="false" />
                      <label htmlFor="false">No</label>
                    </div>
                  </div>
                </div>
              </div>
            )
          } else if (property_type === "CM") {
            return (
              <div className="form-section">
                <h2 className="section-title">Property Feature</h2>
                {/* Possession Status  */}
                <div className="form-group">
                  <h2 className="header-mobile">Possession Status</h2>
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
                {/* Furnishing Status  */}
                <div className="form-group" >
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
                {/* Bathrooms  */}
                <div className="form-group">
                  <h2 className="header-mobile">Washrooms</h2>
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
                {/* Area  */}
                <div className="form-group">
                  <h2 className="header-mobile">Total Area (in sqft)</h2>
                  <input type="number" onChange={(e) => setProperty_Size(e.target.value)} placeholder="Enter Total Area (Ex - 1500)" name="property_size" id="property_size" />
                </div>
                {/* Floor  */}
                <div className="form-group">
                  <h2 className="header-mobile">Floor</h2>
                  <Select onChange={selectFloor} placeholder="Select Floor" options={floorOptions} required />
                </div>
                <div className="form-group">
                  <h2 className="header-mobile">Amenities Available</h2>
                  <Select onChange={(e) => handleAmenities(e)} isMulti closeMenuOnSelect={false} options={amenitiesOptions} placeholder="Amenities Available" required />
                </div>
              </div>
            )
          }
          else {
            return (
              <></>
            )
          }
        })()}



        {/* ------------- Features Ends ----------------- */}
        <div className="form-section">
          <h2 className="section-title">Price Details</h2>
          {/* Price  */}
          <div className="form-group">
            <h2 className="header-mobile">Total Price (in &#8377;)</h2>
            <input type="text" onChange={(e) => setPrice(e.target.value)} name="price" id="price" placeholder="Enter Total Price (Ex - 1250000)" />
          </div>
        </div>




        {/* Photos  */}
        <div className="form-section">
          <h2 className="section-title">Photos</h2>
          <div className="form-group">
            {/* <h2 className="header-mobile">Maximum upload 6 photos</h2> */}
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
