import React, { useState, useContext, useEffect } from 'react'
import cityData from "../../cities.json";
import stateData from "../../state.json";
import floorData from "../../floor.json";
import amenitiesData from "../../amenities.json";
import Select from 'react-select'
import "../../Components/EditProperty/style.css"
import { WebContext } from "../../Context/WebContext";
import Loader from "../Loader";
import axios from "axios";
import SamplePropertyImage from "../../assets/images/SamplePropertyImage.jpg";



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
                        return propertyImagesData.push(image.image.full_size)
                    }
                    )
                    console.log(propertyImagesData)
                    setImageData(propertyImagesData)
                }
                else {
                    setImageData([SamplePropertyImage])
                }
            })
            .catch(err => {
                console.log(err);
            })
    }, [])
    console.log(propertyDetails)


    const [loader, setLoader] = React.useState(true);

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
                            defaultValue={propertyDetails.property_name}/>
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
                            defaultValue={propertyDetails.description}/>
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
                        <input type="text" onChange={(e) => setPincode(e.target.value)} placeholder="Enter Pincode" name="pincode" id="pincode" defaultValue={propertyDetails.pincode}/>
                    </div>
                    {/* City  */}
                    <div className="form-group">
                        <h2 className="header-mobile">City</h2>
                        <Select onChange={handleChangeCity} placeholder="Select City" options={cityOptions} openMenuOnClick={false} required/>
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

                {/* -------------Feature Ends------------------ */}
                <div className="form-section">
                    <h2 className="section-title">Price Details</h2>
                    {/* Price  */}
                    <div className="form-group">
                        <h2 className="header-mobile">Total Price (in &#8377;)</h2>
                        <input type="text" onChange={(e) => setPrice(e.target.value)} name="price" id="price" placeholder="Enter Total Price (Ex - 1250000)" defaultValue={propertyDetails.price} />
                    </div>
                </div>

            </form>
        </div >
    )
}

export default EditProperty
