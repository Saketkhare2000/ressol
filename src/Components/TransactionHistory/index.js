import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useNavigate } from "react-router-dom";

const TransactionHistory = () => {
    const navigate = useNavigate();
    return (
        <div className='page'>

            <div className="back" onClick={() => navigate('/dashboard')}>
                <FontAwesomeIcon className="back-icon" icon={faArrowLeft} />
                <h1 className="mobile-title">Wishlist</h1>
            </div>
        </div>
    )
}

export default TransactionHistory