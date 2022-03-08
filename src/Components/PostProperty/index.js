import React, { useContext, useState, useEffect } from "react";
import "./style.css";
import { CgSpinner } from "react-icons/cg";
import SamplePropertyImage from "../../assets/images/SamplePropertyImage.jpg";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Select from "react-select";
import cityData from "../../cities.json";
import stateData from "../../state.json";
import floorData from "../../floor.json";
import amenitiesData from "../../amenities.json";
import slugify from "slugify";
import { WebContext } from "../../Context/WebContext";
import { uploadImage } from "../../actions/userActions";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { getUserData } from "../../actions/userActions";

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
  const [bedrooms, setBedrooms] = React.useState("");
  //bathrooms state
  const [bathrooms, setBathrooms] = React.useState("");
  const [location, setLocation] = React.useState(null);
  const [sublocality, setSublocality] = React.useState(null);
  //address state
  const [address, setAddress] = React.useState(null);
  //pinCode state
  const [pincode, setPincode] = React.useState(null);
  //prime state
  //furnished state
  const [furnishing_status, setFurnishing_status] = React.useState("");
  const [possession_status, setPossession_Status] = React.useState("");
  //availability state
  const [availability, setAvailability] = React.useState([]);
  const [floor, setFloor] = React.useState(null);
  const [property_type, setProperty_Type] = React.useState(null);
  const [image, setImage] = useState([]);
  const [imagePostData, setImagePostData] = useState([]);
  const [cornerPlot, setCornerPlot] = useState(null);
  const [gatedCommunity, setGatedCommunity] = useState(null);
  const [amenities, setAmenities] = useState([]);
  const [prime_property, setPrime_Property] = useState(false);
  const { setAlert, base_url, loggedIn, phoneNumber } = useContext(WebContext);

  useEffect(() => {
    dispatch(getUserData(phoneNumber, base_url));
  }, []);

  const userDetails = useSelector((state) => state.userData.userData);

  const date = new Date(availability);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = {
    amenities: [],
    floor: floor,
    name: slugify(name, "_"),
    property_name: name,
    description: description,
    location: location,
    sublocality: sublocality,
    address: address,
    city: city.toLowerCase(),
    for_status: for_status,
    possession: possession_status.toLowerCase(),
    state: state.toLowerCase(),
    pincode: pincode,
    prime_property: prime_property,
    price: parseInt(price),
    property_size: parseInt(property_size),
    furnishing_status: furnishing_status,
    availability: availability,
    bedrooms: bedrooms,
    bathrooms: bathrooms,
    property_type: property_type,
    posted_by: userDetails.id,
    image: imagePostData,
    corner: cornerPlot,
    gated: gatedCommunity,
    amenities: amenities,
  };
  useEffect(() => {
    if (loggedIn) {
      if (userDetails.prime_status.is_prime) {
        setPrime_Property(true);
      } else {
        setPrime_Property(false);
      }
    } else {
      setPrime_Property(false);
    }
  }, []);
  const deleteImage = (e, id) => {
    e.preventDefault();
    axios
      .delete(`${base_url}api/image/${id}/`, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        setImage((prevState) =>
          prevState.filter((value) => {
            return value.pk != id;
          })
        );
        setImagePostData((prevState) =>
          prevState.filter((value) => {
            return value != id;
          })
        );
      });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const submitProperty = () => {
    setSpinner(true);
    axios(`${base_url}api/property/`, {
      method: "post",
      data: data,
    })
      .then((res) => {
        setSpinner(false);
        toast.success("Property Posted Successfully");

        navigate("/dashboard");
      })
      .catch((err) => {
        const errMsg = Object.keys(
          JSON.parse(err.response.request.response)
        ).map((key) => {
          return toast.error(`Fill the field with valid ${key}`);
        });

        setSpinner(false);
      });
  };
  const cityOptions = cityData.map((city) => {
    const { name } = city;
    return {
      value: name,
      label: name,
    };
  });
  const stateOptions = stateData.map((state) => {
    const { name } = state;
    return {
      value: name,
      label: name,
    };
  });
  const typeOptions = [
    { value: "FL", label: "Flat" },
    { value: "VI", label: "House/Villa" },
    { value: "PT", label: "Plot" },
    { value: "CM", label: "Commercial" },
  ];
  const floorOptions = floorData.map((floor) => {
    const { value, label } = floor;
    return {
      value: value,
      label: label,
    };
  });
  const amenitiesOptions = amenitiesData.map((amenities) => {
    const { value, label } = amenities;
    return {
      value: value,
      label: label,
    };
  });
  const handleChangeCity = (selectedOption) => {
    setCity(selectedOption.value);
  };
  const handleChangeState = (selectedOption) => {
    setState(selectedOption.value);
  };
  const selectPropertyType = (selectedOption) => {
    setProperty_Type(selectedOption.value);
  };
  const selectFloor = (selectedOption) => {
    setFloor(selectedOption.value);
  };
  const handleAmenities = (e) => {
    const amenitiesValue = [];
    e.map((amenities) => {
      return amenitiesValue.push(amenities.value);
    });
    setAmenities(amenitiesValue);
  };

  return (
    <div className="post-page">
      {/* {
        loggedIn ? (

          <> */}
      <h3 className="mobile-title">Sell or Rent your Property</h3>
      <div className="post-form">
        <form onSubmit={handleSubmit(submitProperty)} className="post-property">
          <div className="form-section">
            <h2 className="section-title">Property Details</h2>
            {/* Property For  */}
            <div className="form-group">
              <h2 className="header-mobile">For</h2>
              <div className="select-options">
                <div className="select-option">
                  <input
                    required
                    type="radio"
                    onChange={(e) => setFor_Status(e.target.value)}
                    value="sale"
                    name="for"
                    id="sale"
                  />
                  <label htmlFor="sale">Sale</label>
                </div>
                <div className="select-option">
                  <input
                    required
                    type="radio"
                    onChange={(e) => setFor_Status(e.target.value)}
                    value="rent"
                    name="for"
                    id="rent"
                  />
                  <label htmlFor="rent">Rent</label>
                </div>
              </div>
            </div>
            {/* Property Type  */}
            <div className="form-group">
              <h2 className="header-mobile">Property Type</h2>
              <Select
                onChange={selectPropertyType}
                placeholder="Select Property Type"
                options={typeOptions}
                required
              />
            </div>
            {/* Property Name  */}
            <div className="form-group">
              <h2 className="header-mobile">Township/Colony Name</h2>
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                placeholder="Township/Colony Name"
                name="name"
                id="name"
              />
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
              />
            </div>
          </div>
          <div className="form-section">
            <h2 className="section-title">Property Location</h2>
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
            {/* City  */}
            <div className="form-group">
              <h2 className="header-mobile">City</h2>
              <Select
                onChange={handleChangeCity}
                placeholder="Select City"
                options={cityOptions}
                openMenuOnClick={false}
                required
              />
            </div>
            {/* Locality  */}
            <div className="form-group">
              <h2 className="header-mobile">Locality</h2>
              <input
                type="text"
                onChange={(e) => setLocation(e.target.value.toLowerCase())}
                placeholder="Ex - Vijay Nagar"
                name="locality"
                id="locality"
              />
            </div>
            {/* Sub Locality  */}
            <div className="form-group">
              <h2 className="header-mobile">Sub Locality</h2>
              <input
                type="text"
                onChange={(e) => setSublocality(e.target.value.toLowerCase())}
                placeholder="Enter Sublocality"
                name="sublocality"
                id="sublocality"
              />
            </div>
            {/* Address */}
            <div className="form-group">
              <h2 className="header-mobile">Address</h2>
              <input
                type="text"
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter Address"
                name="address"
                id="address"
              />
            </div>
            {/* Pincode  */}
            <div className="form-group">
              <h2 className="header-mobile">Pincode</h2>
              <input
                type="text"
                onChange={(e) => setPincode(e.target.value)}
                placeholder="Enter Pincode"
                name="pincode"
                id="pincode"
              />
            </div>
          </div>
          {/* ------------- Features Starts ----------------- */}
          {(() => {
            if (property_type === "FL" || property_type === "VI") {
              return (
                <div className="form-section">
                  <h2 className="section-title">Property Feature</h2>
                  {/* Furnishing Status  */}
                  <div className="form-group">
                    <h2 className="header-mobile">Furnishing Status</h2>
                    <div className="select-options">
                      <div className="select-option">
                        <input
                          type="radio"
                          onChange={(e) => setFurnishing_status(e.target.value)}
                          name="furnishing_status"
                          id="furnished"
                          value="furnished"
                        />
                        <label htmlFor="furnished">Furnished</label>
                      </div>
                      <div className="select-option">
                        <input
                          type="radio"
                          onChange={(e) => setFurnishing_status(e.target.value)}
                          name="furnishing_status"
                          id="semifurnished"
                          value="semifurnished"
                        />
                        <label htmlFor="semifurnished">Semi-Furnished</label>
                      </div>
                      <div className="select-option">
                        <input
                          type="radio"
                          onChange={(e) => setFurnishing_status(e.target.value)}
                          name="furnishing_status"
                          id="unfurnished"
                          value="unfurnished"
                        />
                        <label htmlFor="unfurnished">Unfurnished</label>
                      </div>
                    </div>
                  </div>
                  {/* Area  */}
                  <div className="form-group">
                    <h2 className="header-mobile">Total Area (in sqft)</h2>
                    <input
                      type="text"
                      onChange={(e) => setProperty_Size(e.target.value)}
                      placeholder="Enter Total Area (Ex - 1500)"
                      name="property_size"
                      id="property_size"
                    />
                  </div>
                  {/* Possession Status  */}
                  <div className="form-group">
                    <h2 className="header-mobile">Possession Status</h2>
                    <div className="select-options">
                      <div className="select-option">
                        <input
                          type="radio"
                          onChange={(e) => setPossession_Status(e.target.value)}
                          name="possession_status"
                          id="under-construction"
                          value="Under Construction"
                        />
                        <label htmlFor="under-construction">
                          Under Construction
                        </label>
                      </div>
                      <div className="select-option">
                        <input
                          type="radio"
                          onChange={(e) => setPossession_Status(e.target.value)}
                          name="possession_status"
                          id="ready-to-move"
                          value="Ready To Move"
                        />
                        <label htmlFor="ready-to-move">Ready To Move</label>
                      </div>
                    </div>
                  </div>
                  {/* Available From  */}
                  <div className="form-group">
                    <h2 className="header-mobile">Available From</h2>
                    <input
                      type="date"
                      onChange={(e) => setAvailability(e.target.value)}
                      name="availability"
                      id="availability"
                    />
                  </div>
                  {/* Bedrooms  */}
                  <div className="form-group">
                    <h2 className="header-mobile">Bedrooms</h2>
                    {/* <input type="number" onChange={(e) => setBedrooms(e.target.value)} name="bedrooms" id="bedrooms" /> */}
                    <div className="select-options">
                      <div className="select-option">
                        <input
                          type="radio"
                          onChange={(e) => setBedrooms(e.target.value)}
                          name="bedrooms"
                          id="bed-1"
                          value="1"
                        />
                        <label htmlFor="bed-1">1</label>
                      </div>
                      <div className="select-option">
                        <input
                          type="radio"
                          onChange={(e) => setBedrooms(e.target.value)}
                          name="bedrooms"
                          id="bed-2"
                          value="2"
                        />
                        <label htmlFor="bed-2">2</label>
                      </div>
                      <div className="select-option">
                        <input
                          type="radio"
                          onChange={(e) => setBedrooms(e.target.value)}
                          name="bedrooms"
                          id="bed-3"
                          value="3"
                        />
                        <label htmlFor="bed-3">3</label>
                      </div>
                      <div className="select-option">
                        <input
                          type="radio"
                          onChange={(e) => setBedrooms(e.target.value)}
                          name="bedrooms"
                          id="bed-4"
                          value="4"
                        />
                        <label htmlFor="bed-4">4</label>
                      </div>
                      <div className="select-option">
                        <input
                          type="radio"
                          onChange={(e) => setBedrooms(e.target.value)}
                          name="bedrooms"
                          id="bed-5"
                          value="5+"
                        />
                        <label htmlFor="bed-5">5+</label>
                      </div>
                    </div>
                  </div>
                  {/* Bathrooms  */}
                  <div className="form-group">
                    <h2 className="header-mobile">Bathrooms</h2>
                    <div className="select-options">
                      <div className="select-option">
                        <input
                          type="radio"
                          onChange={(e) => setBathrooms(e.target.value)}
                          name="bathrooms"
                          id="bath-1"
                          value="1"
                        />
                        <label htmlFor="bath-1">1</label>
                      </div>
                      <div className="select-option">
                        <input
                          type="radio"
                          onChange={(e) => setBathrooms(e.target.value)}
                          name="bathrooms"
                          id="bath-2"
                          value="2"
                        />
                        <label htmlFor="bath-2">2</label>
                      </div>
                      <div className="select-option">
                        <input
                          type="radio"
                          onChange={(e) => setBathrooms(e.target.value)}
                          name="bathrooms"
                          id="bath-3"
                          value="3"
                        />
                        <label htmlFor="bath-3">3</label>
                      </div>
                      <div className="select-option">
                        <input
                          type="radio"
                          onChange={(e) => setBathrooms(e.target.value)}
                          name="bathrooms"
                          id="bath-4"
                          value="4+"
                        />
                        <label htmlFor="bath-4">4+</label>
                      </div>
                    </div>
                  </div>

                  {/* Floor  */}
                  <div className="form-group">
                    <h2 className="header-mobile">Floor</h2>
                    <Select
                      width="280px"
                      onChange={selectFloor}
                      placeholder="Select Floor"
                      options={floorOptions}
                      required
                    />
                  </div>
                  {/* Amenities */}
                  <div className="form-group">
                    <h2 className="header-mobile">Amenities Available</h2>
                    <Select
                      onChange={(e) => handleAmenities(e)}
                      isMulti
                      closeMenuOnSelect={false}
                      options={amenitiesOptions}
                      placeholder="Amenities Available"
                    />
                  </div>
                </div>
              );
            } else if (property_type === "PT") {
              return (
                <div className="form-section">
                  <h2 className="section-title">Property Feature</h2>
                  {/* Area  */}
                  <div className="form-group">
                    <h2 className="header-mobile">Total Area (in sqft)</h2>
                    <input
                      type="number"
                      onChange={(e) => setProperty_Size(e.target.value)}
                      placeholder="Enter Total Area (Ex - 1500)"
                      name="property_size"
                      id="property_size"
                    />
                  </div>
                  {/* Corner Plot  */}
                  <div className="form-group">
                    <h2 className="header-mobile">Corner Plot</h2>
                    <div className="select-options">
                      <div className="select-option">
                        <input
                          type="radio"
                          onChange={(e) => setCornerPlot(e.target.value)}
                          value="True"
                          name="corner"
                          id="corner-yes"
                        />
                        <label htmlFor="corner-yes">Yes</label>
                      </div>
                      <div className="select-option">
                        <input
                          type="radio"
                          onChange={(e) => setCornerPlot(e.target.value)}
                          value="False"
                          name="corner"
                          id="corner-no"
                        />
                        <label htmlFor="corner-no">No</label>
                      </div>
                    </div>
                  </div>
                  {/* Gated Community  */}
                  <div className="form-group">
                    <h2 className="header-mobile">Gated Community</h2>
                    <div className="select-options">
                      <div className="select-option">
                        <input
                          type="radio"
                          onChange={(e) => setGatedCommunity(e.target.value)}
                          value="True"
                          name="gated"
                          id="gated-yes"
                        />
                        <label htmlFor="gated-yes">Yes</label>
                      </div>
                      <div className="select-option">
                        <input
                          type="radio"
                          onChange={(e) => setGatedCommunity(e.target.value)}
                          value="False"
                          name="gated"
                          id="gated-no"
                        />
                        <label htmlFor="gated-no">No</label>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <h2 className="header-mobile">Available From</h2>
                    <input
                      type="date"
                      onChange={(e) => setAvailability(e.target.value)}
                      name="availability"
                      id="availability"
                    />
                  </div>
                </div>
              );
            } else if (property_type === "CM") {
              return (
                <div className="form-section">
                  <h2 className="section-title">Property Feature</h2>
                  {/* Possession Status  */}
                  <div className="form-group">
                    <h2 className="header-mobile">Possession Status</h2>
                    <div className="select-options">
                      <div className="select-option">
                        <input
                          type="radio"
                          onChange={(e) => setPossession_Status(e.target.value)}
                          name="possession_status"
                          id="under-construction"
                          value="Under Construction"
                        />
                        <label htmlFor="under-construction">
                          Under Construction
                        </label>
                      </div>
                      <div className="select-option">
                        <input
                          type="radio"
                          onChange={(e) => setPossession_Status(e.target.value)}
                          name="possession_status"
                          id="ready-to-move"
                          value="Ready To Move"
                        />
                        <label htmlFor="ready-to-move">Ready To Move</label>
                      </div>
                    </div>
                  </div>
                  {/* Furnishing Status  */}
                  <div className="form-group">
                    <h2 className="header-mobile">Furnishing Status</h2>
                    <div className="select-options">
                      <div className="select-option">
                        <input
                          type="radio"
                          onChange={(e) => setFurnishing_status(e.target.value)}
                          name="furnishing_status"
                          id="furnished"
                          value="furnished"
                        />
                        <label htmlFor="furnished">Furnished</label>
                      </div>
                      <div className="select-option">
                        <input
                          type="radio"
                          onChange={(e) => setFurnishing_status(e.target.value)}
                          name="furnishing_status"
                          id="semifurnished"
                          value="semifurnished"
                        />
                        <label htmlFor="semifurnished">Semi-Furnished</label>
                      </div>
                      <div className="select-option">
                        <input
                          type="radio"
                          onChange={(e) => setFurnishing_status(e.target.value)}
                          name="furnishing_status"
                          id="unfurnished"
                          value="unfurnished"
                        />
                        <label htmlFor="unfurnished">Unfurnished</label>
                      </div>
                    </div>
                  </div>
                  {/* Bathrooms  */}
                  <div className="form-group">
                    <h2 className="header-mobile">Washrooms</h2>
                    <div className="select-options">
                      <div className="select-option">
                        <input
                          type="radio"
                          onChange={(e) => setBathrooms(e.target.value)}
                          name="bathrooms"
                          id="wash-1"
                          value="1"
                        />
                        <label htmlFor="wash-1">1</label>
                      </div>
                      <div className="select-option">
                        <input
                          type="radio"
                          onChange={(e) => setBathrooms(e.target.value)}
                          name="bathrooms"
                          id="wash-2"
                          value="2"
                        />
                        <label htmlFor="wash-2">2</label>
                      </div>
                      <div className="select-option">
                        <input
                          type="radio"
                          onChange={(e) => setBathrooms(e.target.value)}
                          name="bathrooms"
                          id="wash-3"
                          value="3"
                        />
                        <label htmlFor="wash-3">3</label>
                      </div>
                      <div className="select-option">
                        <input
                          type="radio"
                          onChange={(e) => setBathrooms(e.target.value)}
                          name="bathrooms"
                          id="wash-4"
                          value="4+"
                        />
                        <label htmlFor="wash-4">4+</label>
                      </div>
                    </div>
                  </div>
                  {/* Area  */}
                  <div className="form-group">
                    <h2 className="header-mobile">Total Area (in sqft)</h2>
                    <input
                      type="number"
                      onChange={(e) => setProperty_Size(e.target.value)}
                      placeholder="Enter Total Area (Ex - 1500)"
                      name="property_size"
                      id="property_size"
                    />
                  </div>
                  {/* Floor  */}
                  <div className="form-group">
                    <h2 className="header-mobile">Floor</h2>
                    <Select
                      onChange={selectFloor}
                      placeholder="Select Floor"
                      options={floorOptions}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <h2 className="header-mobile">Amenities Available</h2>
                    <Select
                      onChange={(e) => handleAmenities(e)}
                      isMulti
                      closeMenuOnSelect={false}
                      options={amenitiesOptions}
                      placeholder="Amenities Available"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <h2 className="header-mobile">Available From</h2>
                    <input
                      type="date"
                      onChange={(e) => setAvailability(e.target.value)}
                      name="availability"
                      id="availability"
                    />
                  </div>
                </div>
              );
            } else {
              return <></>;
            }
          })()}

          {/* ------------- Features Ends ----------------- */}
          <div className="form-section">
            <h2 className="section-title">Price Details</h2>
            {/* Price  */}
            <div className="form-group">
              <h2 className="header-mobile">Total Price (in &#8377;)</h2>
              <input
                type="text"
                onChange={(e) => setPrice(e.target.value)}
                name="price"
                id="price"
                placeholder="Enter Total Price (Ex - 1250000)"
              />
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
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      dispatch(uploadImage(e.target.files[0], base_url)).then(
                        (res) => {
                          setImage((image) => [...image, res]);
                          setImagePostData((imagePostData) => [
                            ...imagePostData,
                            res.pk,
                          ]);
                        }
                      );
                    }}
                    name="photos"
                    id="photo"
                  />
                  {image.length === 0 ? null : (
                    <button onClick={(e) => deleteImage(e, image[0]["pk"])}>
                      Remove
                    </button>
                  )}
                </div>
                {/* 2nd Image Upload Container  */}

                <div className="upload-image-container">
                  {image.length <= 1 ? (
                    <img src={SamplePropertyImage} alt="property" />
                  ) : (
                    <img src={image[1].image.full_size} alt="property" />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      dispatch(uploadImage(e.target.files[0], base_url)).then(
                        (res) => {
                          setImage((image) => [...image, res]);
                          setImagePostData((imagePostData) => [
                            ...imagePostData,
                            res.pk,
                          ]);
                        }
                      );
                    }}
                    name="photos"
                    id="photo"
                  />
                  {image.length <= 1 ? null : (
                    <button onClick={(e) => deleteImage(e, image[1]["pk"])}>
                      Remove
                    </button>
                  )}
                </div>
                {/* 3rd Image Upload Container  */}

                <div className="upload-image-container">
                  {image.length <= 2 ? (
                    <img src={SamplePropertyImage} alt="property" />
                  ) : (
                    <img src={image[2].image.full_size} alt="property" />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      dispatch(uploadImage(e.target.files[0], base_url)).then(
                        (res) => {
                          setImage((image) => [...image, res]);
                          setImagePostData((imagePostData) => [
                            ...imagePostData,
                            res.pk,
                          ]);
                        }
                      );
                    }}
                    name="photos"
                    id="photo"
                  />
                  {image.length <= 2 ? null : (
                    <button onClick={(e) => deleteImage(e, image[2]["pk"])}>
                      Remove
                    </button>
                  )}
                </div>
                {/* 4th Image Upload Container  */}

                <div className="upload-image-container">
                  {image.length <= 3 ? (
                    <img src={SamplePropertyImage} alt="property" />
                  ) : (
                    <img src={image[3].image.full_size} alt="property" />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      dispatch(uploadImage(e.target.files[0], base_url)).then(
                        (res) => {
                          setImage((image) => [...image, res]);
                          setImagePostData((imagePostData) => [
                            ...imagePostData,
                            res.pk,
                          ]);
                        }
                      );
                    }}
                    name="photos"
                    id="photo"
                  />
                  {image.length <= 3 ? null : (
                    <button onClick={(e) => deleteImage(e, image[3]["pk"])}>
                      Remove
                    </button>
                  )}
                </div>
                {/* 5th Image Upload Container  */}

                <div className="upload-image-container">
                  {image.length <= 4 ? (
                    <img src={SamplePropertyImage} alt="property" />
                  ) : (
                    <img src={image[4].image.full_size} alt="property" />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      dispatch(uploadImage(e.target.files[0], base_url)).then(
                        (res) => {
                          setImage((image) => [...image, res]);
                          setImagePostData((imagePostData) => [
                            ...imagePostData,
                            res.pk,
                          ]);
                        }
                      );
                    }}
                    name="photos"
                    id="photo"
                  />
                  {image.length <= 4 ? null : (
                    <button onClick={(e) => deleteImage(e, image[4]["pk"])}>
                      Remove
                    </button>
                  )}
                </div>

                {/* 6th Image Upload Container  */}

                <div className="upload-image-container">
                  {image.length <= 5 ? (
                    <img src={SamplePropertyImage} alt="property" />
                  ) : (
                    <img src={image[5].image.full_size} alt="property" />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      dispatch(uploadImage(e.target.files[0], base_url)).then(
                        (res) => {
                          setImage((image) => [...image, res]);
                          setImagePostData((imagePostData) => [
                            ...imagePostData,
                            res.pk,
                          ]);
                        }
                      );
                    }}
                    name="photos"
                    id="photo"
                  />
                  {image.length <= 5 ? null : (
                    <button onClick={(e) => deleteImage(e, image[5]["pk"])}>
                      Remove
                    </button>
                  )}
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
          {spinner ? (
            <div className="spinner-container">
              <CgSpinner className="spinner" />
            </div>
          ) : (
            <button
              className="btn"
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.01 }}
            >
              Post Property
            </button>
          )}
        </form>
        <div className="banner-image">
          {" "}
          <img
            src="https://i.insider.com/5cbf3c8fb14bf426443fd865?width=700"
            alt=""
          />
          {/* <div className="overlay"></div> */}
        </div>
      </div>
    </div>
    //         ) :
    //         <h2> Please login to post property</h2>
    //     }
    //   </div>
  );
};

export default PostProperty;
