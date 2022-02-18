import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { WebContext } from "../../Context/WebContext";
import axios from 'axios';


const ViewResponse = () => {
    const navigate = useNavigate();
    const loggedIn = useSelector((state) => state.auth.loggedIn);
    const key = useSelector((state) => state.auth.key);
    const [responseDetails, setResponseDetails] = React.useState()
    const { userName } = useContext(WebContext);
    useEffect(() => {
        axios({
            method: "get",
            url: `http://localhost:8000/api/profile/${userName}/?expand=image,contacted_by.user,contacted_by.property,contacted_to.user,contacted_to.property`,
            headers: {
                Authorization: `Bearer ${key}`,
            },
        })
            .then((res) => {
                console.log(res)
            }
            )
            .catch((err) => {
                console.log(err);
            }
            );
    }, []);
    return (
        <div className='page'>
            <div className="back" onClick={() => navigate('/dashboard')}>
                <FontAwesomeIcon className="back-icon" icon={faArrowLeft} />
                <h1 className="mobile-title">View Responses</h1>
            </div>
        </div>
    )
}

export default ViewResponse