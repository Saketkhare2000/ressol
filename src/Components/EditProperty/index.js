import React, { useState, useContext, useEffect } from 'react'
import cityData from "../../cities.json";
import stateData from "../../state.json";
import floorData from "../../floor.json";
import amenitiesData from "../../amenities.json";
import Select from 'react-select'
import "../../Components/EditProperty/style.css"
import { WebContext } from "../../Context/WebContext";
import { deleteImage, uploadImage } from "../../actions/userActions";
import Loader from "../Loader";
import axios from "axios";
import { CgSpinner } from "react-icons/cg";
import SamplePropertyImage from "../../assets/images/SamplePropertyImage.jpg";
import { useDispatch } from 'react-redux';



const EditProperty = () => {
  const [propertyDetails, setPropertyDetails] = React.useState({});

  // Useeffect
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/property/${editPropertyId}/?expand=posted_by.image,image`)
      .then(res => {
        setLoader(true)
        setPropertyDetails(res.data)
        return res.data
      })
      .then((res) => {
        setLoader(false)
        console.log(res.image)
        if (res.image && res.image.length > 0) {
          const propertyImagesData = [];
          res.image.map((image, index) => {
            return propertyImagesData.push(image)
          }
          )
          console.log(propertyImagesData)
          setImage(propertyImagesData)
          console.log(image)
        }
      })
      .catch(err => {
        console.log(err);
      })
  }, [])
  console.log(propertyDetails)

  const dispatch = useDispatch();

  const [loader, setLoader] = React.useState(true);
  const [spinner, setSpinner] = React.useState(false);

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState(null);
  const [location, setLocation] = React.useState(null);
  const [address, setAddress] = React.useState(null);
  const [pincode, setPincode] = React.useState(null);
  const [city, setCity] = React.useState("");
  const [state, setState] = React.useState("");
  const [price, setPrice] = React.useState(null);
  const [property_size, setProperty_Size] = React.useState(null);
  const [imageData, setImageData] = React.useState([]);

  const [bedrooms, setBedrooms] = React.useState(propertyDetails.bedrooms);
  const [furnishing_status, setFurnishing_status] = React.useState(null);
  const [possession_status, setPossession_Status] = React.useState("");
  //availability state
  const [availability, setAvailability] = React.useState(null);
  const [floor, setFloor] = React.useState(null);
  const [bathrooms, setBathrooms] = React.useState(null);
  const [cornerPlot, setCornerPlot] = useState(null)
  const [gatedCommunity, setGatedCommunity] = useState(null)
  const [amenities, setAmenities] = useState(null)

  const { editPropertyId, setEditPropertyId } = useContext(WebContext);

  const [image, setImage] = useState([]);
  const [imagePostData, setImagePostData] = useState([]);

  const property_type = propertyDetails.property_type

  const furnishing_default = { F: false, SF: false, UF: false }
  if (propertyDetails.furnishing_status === "furnished") {
    furnishing_default.F = true
  } else if (propertyDetails.furnishing_status === "semifurnished") {
    furnishing_default.SF = true
  } else if (propertyDetails.furnishing_status === "unfurnished") {
    furnishing_default.UF = true
  }

  const possession_default = { UC: false, RD: false }
  if (propertyDetails.possession === "ready to move") {
    possession_default.RD = true
  } else {
    possession_default.UC = true
  }

  const bedroom_default = { 1: false, 2: false, 3: false, 4: false, "5+": false }
  bedroom_default[propertyDetails.bedrooms] = true

  const bathroom_default = { 1: false, 2: false, 3: false, '4+': false }
  bathroom_default[propertyDetails.bathrooms] = true




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
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function submitProperty() {
    return
  }
  console.log(image)

  return (
    <div className='page'>
      <h3 className="mobile-title">Edit Property</h3>
      <form action="" className='post-property'>
        <div className="form-section">
          <h2 className="section-title">Property Details</h2>
          {/* Property Name  */}
          <div className="form-group">
            <h2 className="header-mobile">Name of Property/Project</h2>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              placeholder="Name of Property/Project"
              name="name"
              id="name"
              defaultValue={propertyDetails.property_name} />
          </div>
          {/* Property Description  */}
          <div className="form-group">
            <h2 className="header-mobile">Property Description</h2>
            <input
              type="text"
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Property Description"
              name="description"
              id="description"
              defaultValue={propertyDetails.description} />
          </div>

        </div>
        <div className="form-section">
          <h2 className="section-title">Property Location</h2>
          {/* Locality  */}
          <div className="form-group">
            <h2 className="header-mobile">Locality</h2>
            <input
              type="text"
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Locality"
              name="locality"
              id="locality"
              defaultValue={propertyDetails.location}
            />
          </div>

          {/* Address */}
          <div className="form-group">
            <h2 className="header-mobile">Address</h2>
            <input type="text" onChange={(e) => setAddress(e.target.value)} placeholder="Enter Address" name="address" id="address" defaultValue={propertyDetails.address} />
          </div>

          {/* Pincode  */}
          <div className="form-group">
            <h2 className="header-mobile">Pincode</h2>
            <input type="text" onChange={(e) => setPincode(e.target.value)} placeholder="Enter Pincode" name="pincode" id="pincode" defaultValue={propertyDetails.pincode} />
          </div>
          {/* City  */}
          <div className="form-group">
            <h2 className="header-mobile">City</h2>
            <Select onChange={handleChangeCity} placeholder="Select City" options={cityOptions} openMenuOnClick={false} required />
          </div>
          {/* State  */}
          <div className="form-group">
            <h2 className="header-mobile">State</h2>
            <Select
              onChange={handleChangeState}
              placeholder="Select State"
              options={stateOptions}
              openMenuOnClick={false}
            />
          </div>
        </div>
        {/* -------------Feature Starts------------------ */}

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
                      <input type="radio" onChange={(e) => setFurnishing_status(e.target.value)} name="furnishing_status" id="furnished" value='furnished' checked={furnishing_default.F} />
                      <label htmlFor="furnishing_status">Furnished</label>
                    </div>
                    <div className="select-option">
                      <input type="radio" onChange={(e) => setFurnishing_status(e.target.value)} name="furnishing_status" id="semifurnished" value='semifurnished' checked={furnishing_default.SF} />
                      <label htmlFor="furnishing_status">Semi-Furnished</label>
                    </div>
                    <div className="select-option">
                      <input type="radio" onChange={(e) => setFurnishing_status(e.target.value)} name="furnishing_status" id="unfurnished" value='unfurnished' checked={furnishing_default.UF} />
                      <label htmlFor="furnishing_status">Unfurnished</label>
                    </div>

                  </div>
                </div>
                {/* Area  */}
                <div className="form-group">
                  <h2 className="header-mobile">Total Area (in sqft)</h2>
                  <input type="text" onChange={(e) => setProperty_Size(e.target.value)} placeholder="Enter Total Area (Ex - 1500)" name="property_size" id="property_size" defaultValue={propertyDetails.property_size} />
                </div>
                {/* Possession Status  */}
                <div className="form-group">
                  <h2 className="header-mobile">Possession Status</h2>
                  <div className="select-options">
                    <div className="select-option">
                      <input type="radio" onChange={(e) => setPossession_Status(e.target.value)} name="possession_status" id="under-construction" checked={possession_default.UC} value='Under Construction' defaultValue={propertyDetails.possession} />
                      <label htmlFor="possession_status">Under Construction</label>
                    </div>
                    <div className="select-option">
                      <input type="radio" onChange={(e) => setPossession_Status(e.target.value)} name="possession_status" id="ready-to-move" value='Ready To Move' checked={possession_default.RD} />
                      <label htmlFor="possession_status">Ready To Move</label>
                    </div>

                  </div>

                </div>
                {/* Available From  */}
                <div className="form-group">
                  <h2 className="header-mobile">Available From</h2>
                  <input type="date" onChange={(e) => setAvailability(e.target.value)} name="availability" id="availability" defaultValue={propertyDetails.availability} />
                </div>
                {/* Bedrooms  */}
                <div className="form-group">
                  <h2 className="header-mobile">Bedrooms</h2>
                  {/* <input type="number" onChange={(e) => setBedrooms(e.target.value)} name="bedrooms" id="bedrooms" /> */}
                  <div className="select-options">
                    <div className="select-option">
                      <input type="radio" onChange={(e) => setBedrooms((e.target.value))} name="bedrooms" id="1" value='1' checked={bedroom_default[1]} />
                      <label htmlFor="bedrooms">1</label>
                    </div>
                    <div className="select-option">
                      <input type="radio" onChange={(e) => setBedrooms(e.target.value)} name="bedrooms" id="2" value='2' checked={bedroom_default[2]} />
                      <label htmlFor="bedrooms">2</label>
                    </div>
                    <div className="select-option">
                      <input type="radio" onChange={(e) => setBedrooms(e.target.value)} name="bedrooms" id="3" value='3' checked={bedroom_default[3]} />
                      <label htmlFor="bedrooms">3</label>
                    </div>
                    <div className="select-option">
                      <input type="radio" onChange={(e) => setBedrooms(e.target.value)} name="bedrooms" id="4" value='4' checked={bedroom_default[4]} />
                      <label htmlFor="bedrooms">4</label>
                    </div>
                    <div className="select-option">
                      <input type="radio" onChange={(e) => setBedrooms(e.target.value)} name="bedrooms" id="5" value='5+' checked={bedroom_default["5+"]} />
                      <label htmlFor="sale">5+</label>
                    </div>
                  </div>

                </div>
                {/* Bathrooms  */}
                <div className="form-group">
                  <h2 className="header-mobile">Bathrooms</h2>
                  <div className="select-options">
                    <div className="select-option">
                      <input type="radio" onChange={(e) => setBathrooms(e.target.value)} name="bathrooms" id="1" value='1' checked={bathroom_default[1]} />
                      <label htmlFor="bathrooms">1</label>
                    </div>
                    <div className="select-option">
                      <input type="radio" onChange={(e) => setBathrooms(e.target.value)} name="bathrooms" id="2" value='2' checked={bathroom_default[2]} />
                      <label htmlFor="bathrooms">2</label>
                    </div>
                    <div className="select-option">
                      <input type="radio" onChange={(e) => setBathrooms(e.target.value)} name="bathrooms" id="3" value='3' checked={bathroom_default[3]} />
                      <label htmlFor="bathrooms">3</label>
                    </div>
                    <div className="select-option">
                      <input type="radio" onChange={(e) => setBathrooms(e.target.value)} name="bathrooms" id="4" value='4+' checked={bathroom_default["4+"]} />
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
                  <input type="number" onChange={(e) => setProperty_Size(e.target.value)} placeholder="Enter Total Area (Ex - 1500)" name="property_size" id="property_size" defaultValue={propertyDetails.property_size} />
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


        {/* -------------Feature Ends------------------ */}
        <div className="form-section">
          <h2 className="section-title">Price Details</h2>
          {/* Price  */}
          <div className="form-group">
            <h2 className="header-mobile">Total Price (in &#8377;)</h2>
            <input type="text" onChange={(e) => setPrice(e.target.value)} name="price" id="price" placeholder="Enter Total Price (Ex - 1250000)" defaultValue={propertyDetails.price} />
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
                <button onClick={() => deleteImage(image[0]['pk'])}>remove</button>
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
                <button onClick={() => deleteImage(image[1]['pk'])}>remove</button>
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
                <button onClick={() => deleteImage(image[2]['pk'])}>remove</button>
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
                <button onClick={() => deleteImage(image[3]['pk'])}>remove</button>
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
                <button onClick={() => deleteImage(image[4]['pk'])}>remove</button>
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
                <button onClick={() => deleteImage(image[5]['pk'])}>remove</button>
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
              Edit Property
            </button>}

      </form>

    </div >
  )
}

export default EditProperty
