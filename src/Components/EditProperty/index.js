import React, { useState, useContext, useEffect } from "react";
import cityData from "../../cities.json";
import stateData from "../../state.json";
import floorData from "../../floor.json";
import amenitiesData from "../../amenities.json";
import Select from "react-select";
import "../../Components/EditProperty/style.css";
import { WebContext } from "../../Context/WebContext";
import { uploadImage } from "../../actions/userActions";
import axios from "axios";
import { CgSpinner } from "react-icons/cg";
import SamplePropertyImage from "../../assets/images/SamplePropertyImage.jpg";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import slugify from "slugify";

const EditProperty = () => {
  const [propertyDetails, setPropertyDetails] = React.useState({});
  const navigate = useNavigate();
  const { base_url } = useContext(WebContext);
  // Useeffect
  useEffect(() => {
    axios
      .get(
        `${base_url}api/property/${editPropertyId}/?expand=posted_by.image,image`
      )
      .then((res) => {
        setLoader(true);
        setPropertyDetails(res.data);
        setDescription(res.data.description);
        setName(res.data.property_name);
        setLocation(res.data.location);
        setAddress(res.data.address);
        setPincode(res.data.pincode);
        setCity(res.data.city);
        setState(res.data.state);
        setPrice(res.data.price);
        setProperty_Size(res.data.property_size);

        setBedrooms(res.data.bedrooms);
        setBathrooms(res.data.bathrooms);
        setFurnishing_status(res.data.furnishing_status);

        setPossession_Status(res.data.possession);
        setAvailability(res.data.availability);
        setFloor(res.data.floor);
        setCornerPlot(res.data.corner);
        setGatedCommunity(res.data.gated);
        setAmenities(res.data.amenities);
        setFor_status(res.data.for_status);
        setPostedBy(res.data.posted_by.id);
        setImagePostData(res.data.image);
        return res.data;
      })
      .then((res) => {
        setLoader(false);
        if (res.image && res.image.length > 0) {
          const propertyImagesData = [];
          res.image.map((image, index) => {
            return propertyImagesData.push(image);
          });
          setImage(propertyImagesData);
        }
      })
      .catch((err) => {});
  }, []);

  const dispatch = useDispatch();

  const [loader, setLoader] = React.useState(true);
  const [spinner, setSpinner] = React.useState(false);

  const default_name = propertyDetails.property_name;
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState(
    propertyDetails.description
  );
  const [location, setLocation] = React.useState(null);
  const [address, setAddress] = React.useState(null);
  const [pincode, setPincode] = React.useState(null);
  const [city, setCity] = React.useState("");
  const [state, setState] = React.useState("");
  const [price, setPrice] = React.useState(null);
  const [for_status, setFor_status] = React.useState(null);
  const [posted_by, setPostedBy] = React.useState(null);
  const [property_size, setProperty_Size] = React.useState(null);
  const [imageData, setImageData] = React.useState([]);

  const [bedrooms, setBedrooms] = React.useState(propertyDetails.bedrooms);
  const [furnishing_status, setFurnishing_status] = React.useState(null);
  const [possession_status, setPossession_Status] = React.useState("");
  //availability state
  const [availability, setAvailability] = React.useState(null);
  const [floor, setFloor] = React.useState(null);
  const [bathrooms, setBathrooms] = React.useState(null);
  const [cornerPlot, setCornerPlot] = useState(null);
  const [gatedCommunity, setGatedCommunity] = useState(null);
  const [amenities, setAmenities] = useState(null);
  const { setAlert } = useContext(WebContext);

  const { editPropertyId, setEditPropertyId } = useContext(WebContext);

  const [image, setImage] = useState([]);
  const [imagePostData, setImagePostData] = useState([]);

  const property_type = propertyDetails.property_type;

  const data = {
    amenities: [],
    floor: floor,
    for_status: for_status,
    posted_by: posted_by,
    name: slugify(name, "_"),
    property_name: name,
    description: description,
    location: location,
    address: address,
    city: city.toLowerCase(),
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
    image: imagePostData,
    corner: cornerPlot,
    gated: gatedCommunity,
    amenities: amenities,
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
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

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
            return value.pk !== id;
          })
        );
        setImagePostData((prevState) =>
          prevState.filter((value) => {
            return value !== id;
          })
        );
      });
  };

  const submitProperty = (e) => {
    e.preventDefault();
    setSpinner(true);
    axios(`${base_url}api/property/${propertyDetails.id}/`, {
      method: "patch",
      data: data,
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => {
        setSpinner(false);
        setAlert({
          type: "success",
          message: "Property Posted Successfully",
          show: true,
        });
        setTimeout(() => {
          setAlert({
            type: "",
            message: "",
            show: false,
          });
        }, 2000);
        navigate("/dashboard");
      })
      .catch((err) => {
        setSpinner(false);
        setAlert({
          type: "danger",
          message: err.message,
          show: true,
        });
        setTimeout(() => {
          setAlert({
            type: "",
            message: "",
            show: false,
          });
        }, 2000);
      });
  };

  return (
    <div className="edit-property-page page">
      <h3 className="mobile-title">Edit Property</h3>
      <form action="" className="post-property">
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
              defaultValue={propertyDetails.property_name}
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
              defaultValue={propertyDetails.description}
            />
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
            <input
              type="text"
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter Address"
              name="address"
              id="address"
              defaultValue={propertyDetails.address}
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
              defaultValue={propertyDetails.pincode}
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
                        checked={furnishing_status == "furnished"}
                      />
                      <label htmlFor="furnishing_status">Furnished</label>
                    </div>
                    <div className="select-option">
                      <input
                        type="radio"
                        onChange={(e) => setFurnishing_status(e.target.value)}
                        name="furnishing_status"
                        id="semifurnished"
                        value="semifurnished"
                        checked={furnishing_status == "semifurnished"}
                      />
                      <label htmlFor="furnishing_status">Semi-Furnished</label>
                    </div>
                    <div className="select-option">
                      <input
                        type="radio"
                        onChange={(e) => setFurnishing_status(e.target.value)}
                        name="furnishing_status"
                        id="unfurnished"
                        value="unfurnished"
                        checked={furnishing_status == "unfurnished"}
                      />
                      <label htmlFor="furnishing_status">Unfurnished</label>
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
                    defaultValue={propertyDetails.property_size}
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
                        checked={possession_status == "Under Construction"}
                        value="Under Construction"
                      />
                      <label htmlFor="possession_status">
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
                        checked={possession_status == "Ready To Move"}
                      />
                      <label htmlFor="possession_status">Ready To Move</label>
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
                    defaultValue={propertyDetails.availability}
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
                        id="1"
                        value="1"
                        checked={bedrooms == "1"}
                      />
                      <label htmlFor="bedrooms">1</label>
                    </div>
                    <div className="select-option">
                      <input
                        type="radio"
                        onChange={(e) => setBedrooms(e.target.value)}
                        name="bedrooms"
                        id="2"
                        value="2"
                        checked={bedrooms == "2"}
                      />
                      <label htmlFor="bedrooms">2</label>
                    </div>
                    <div className="select-option">
                      <input
                        type="radio"
                        onChange={(e) => setBedrooms(e.target.value)}
                        name="bedrooms"
                        id="3"
                        value="3"
                        checked={bedrooms == "3"}
                      />
                      <label htmlFor="bedrooms">3</label>
                    </div>
                    <div className="select-option">
                      <input
                        type="radio"
                        onChange={(e) => setBedrooms(e.target.value)}
                        name="bedrooms"
                        id="4"
                        value="4"
                        checked={bedrooms == "4"}
                      />
                      <label htmlFor="bedrooms">4</label>
                    </div>
                    <div className="select-option">
                      <input
                        type="radio"
                        onChange={(e) => setBedrooms(e.target.value)}
                        name="bedrooms"
                        id="5"
                        value="5+"
                        checked={bedrooms == "5+"}
                      />
                      <label htmlFor="sale">5+</label>
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
                        id="1"
                        value="1"
                        checked={bathrooms == "1"}
                      />
                      <label htmlFor="bathrooms">1</label>
                    </div>
                    <div className="select-option">
                      <input
                        type="radio"
                        onChange={(e) => setBathrooms(e.target.value)}
                        name="bathrooms"
                        id="2"
                        value="2"
                        checked={bathrooms == "2"}
                      />
                      <label htmlFor="bathrooms">2</label>
                    </div>
                    <div className="select-option">
                      <input
                        type="radio"
                        onChange={(e) => setBathrooms(e.target.value)}
                        name="bathrooms"
                        id="3"
                        value="3"
                        checked={bathrooms == "3"}
                      />
                      <label htmlFor="bathrooms">3</label>
                    </div>
                    <div className="select-option">
                      <input
                        type="radio"
                        onChange={(e) => setBathrooms(e.target.value)}
                        name="bathrooms"
                        id="4"
                        value="4+"
                        checked={bathrooms == "4+"}
                      />
                      <label htmlFor="bathrooms">4+</label>
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
                    required
                  />
                </div>
              </div>
            );
          } else if (property_type === "PL") {
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
                    defaultValue={propertyDetails.property_size}
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
                        name="for"
                        id="true"
                        checked={cornerPlot == "True"}
                      />
                      <label htmlFor="true">Yes</label>
                    </div>
                    <div className="select-option">
                      <input
                        type="radio"
                        onChange={(e) => setCornerPlot(e.target.value)}
                        value="False"
                        name="for"
                        id="false"
                        checked={cornerPlot == "False"}
                      />
                      <label htmlFor="false">No</label>
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
                        name="for"
                        id="true"
                        checked={gatedCommunity == "True"}
                      />
                      <label htmlFor="true">Yes</label>
                    </div>
                    <div className="select-option">
                      <input
                        type="radio"
                        onChange={(e) => setGatedCommunity(e.target.value)}
                        value="False"
                        name="for"
                        id="false"
                        checked={gatedCommunity == "False"}
                      />
                      <label htmlFor="false">No</label>
                    </div>
                  </div>
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
                        checked={possession_status == "Under Construction"}
                      />
                      <label htmlFor="possession_status">
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
                        checked={possession_status == "Ready To Move"}
                      />
                      <label htmlFor="possession_status">Ready To Move</label>
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
                        checked={furnishing_status == "furnished"}
                      />
                      <label htmlFor="furnishing_status">Furnished</label>
                    </div>
                    <div className="select-option">
                      <input
                        type="radio"
                        onChange={(e) => setFurnishing_status(e.target.value)}
                        name="furnishing_status"
                        id="semifurnished"
                        value="semifurnished"
                        checked={furnishing_status == "semifurnished"}
                      />
                      <label htmlFor="furnishing_status">Semi-Furnished</label>
                    </div>
                    <div className="select-option">
                      <input
                        type="radio"
                        onChange={(e) => setFurnishing_status(e.target.value)}
                        name="furnishing_status"
                        id="unfurnished"
                        value="unfurnished"
                        checked={furnishing_status == "unfurnished"}
                      />
                      <label htmlFor="furnishing_status">Unfurnished</label>
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
                        id="1"
                        value="1"
                        checked={bathrooms == "1"}
                      />
                      <label htmlFor="bathrooms">1</label>
                    </div>
                    <div className="select-option">
                      <input
                        type="radio"
                        onChange={(e) => setBathrooms(e.target.value)}
                        name="bathrooms"
                        id="2"
                        value="2"
                        checked={bathrooms == "2"}
                      />
                      <label htmlFor="bathrooms">2</label>
                    </div>
                    <div className="select-option">
                      <input
                        type="radio"
                        onChange={(e) => setBathrooms(e.target.value)}
                        name="bathrooms"
                        id="3"
                        value="3"
                        checked={bathrooms == "3"}
                      />
                      <label htmlFor="bathrooms">3</label>
                    </div>
                    <div className="select-option">
                      <input
                        type="radio"
                        onChange={(e) => setBathrooms(e.target.value)}
                        name="bathrooms"
                        id="4"
                        value="4+"
                        checked={bathrooms == "4+"}
                      />
                      <label htmlFor="bathrooms">4+</label>
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
                    defaultValue={propertyDetails.property_size}
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
              </div>
            );
          } else {
            return <></>;
          }
        })()}

        {/* -------------Feature Ends------------------ */}
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
              defaultValue={propertyDetails.price}
            />
          </div>
        </div>

        {/* Photos  */}
        <div className="form-section photos-mobile-section">
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
                    dispatch(uploadImage(e.target.files[0])).then((res) => {
                      setImage((image) => [...image, res]);
                      setImagePostData((imagePostData) => [
                        ...imagePostData,
                        res.pk,
                      ]);
                    });
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
                    dispatch(uploadImage(e.target.files[0])).then((res) => {
                      setImage((image) => [...image, res]);
                      setImagePostData((imagePostData) => [
                        ...imagePostData,
                        res.pk,
                      ]);
                    });
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
                    dispatch(uploadImage(e.target.files[0])).then((res) => {
                      setImage((image) => [...image, res]);
                      setImagePostData((imagePostData) => [
                        ...imagePostData,
                        res.pk,
                      ]);
                    });
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
                    dispatch(uploadImage(e.target.files[0])).then((res) => {
                      setImage((image) => [...image, res]);
                      setImagePostData((imagePostData) => [
                        ...imagePostData,
                        res.pk,
                      ]);
                    });
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
                    dispatch(uploadImage(e.target.files[0])).then((res) => {
                      setImage((image) => [...image, res]);
                      setImagePostData((imagePostData) => [
                        ...imagePostData,
                        res.pk,
                      ]);
                    });
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
                    dispatch(uploadImage(e.target.files[0])).then((res) => {
                      setImage((image) => [...image, res]);
                      setImagePostData((imagePostData) => [
                        ...imagePostData,
                        res.pk,
                      ]);
                    });
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
            onClick={submitProperty}
          >
            Save Changes
          </button>
        )}
      </form>
    </div>
  );
};

export default EditProperty;
