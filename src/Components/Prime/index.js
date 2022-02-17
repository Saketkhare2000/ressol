import React from 'react'
import "../Prime/style.css"
const Prime = () => {
    return (
        <div className='prime-page page'>
            <h2>9Roof Prime Membership</h2>
            <div className="prime-plans-container">
                {/* Basic Plan  */}
                <div className="prime-plan">
                    <h3>Basic</h3>
                    <div className="prime-plan-price">
                        <h2>&#8377;49</h2>
                        <span>/month</span>
                    </div>
                    <div className="prime-plan-features">
                        <ul>
                            <li>
                                <p>Number of Owners you can contact</p>
                                <span>15</span>
                            </li>
                            <li>
                                <p>Plan Validity (days)</p>
                                <span>30</span>
                            </li>
                        </ul>
                    </div>
                    <div className="prime-plan-button">
                        <button className="btn btn-secondary">Continue</button>
                    </div>
                </div>
                {/* Pro Plan  */}
                <div className="prime-plan">
                    <h3>Pro</h3>
                    <div className="prime-plan-price">
                        <h2>&#8377;249</h2>
                        <span>/month</span>
                    </div>
                    <div className="prime-plan-features">
                        <ul>
                            <li>
                                <p>Number of Owners you can contact</p>
                                <span>35</span>
                            </li>
                            <li>
                                <p>Plan Validity (days)</p>
                                <span>60</span>
                            </li>
                        </ul>
                    </div>
                    <div className="prime-plan-button">
                        <button className="btn btn-primary">Continue</button>
                    </div>
                </div>
                {/* Premium Plan  */}
                <div className="prime-plan">
                    <h3>Premium</h3>
                    <div className="prime-plan-price">
                        <h2>&#8377;499</h2>
                        <span>/month</span>
                    </div>
                    <div className="prime-plan-features">
                        <ul>
                            <li>
                                <p>Number of Owners you can contact</p>
                                <span>99</span>
                            </li>
                            <li>
                                <p>Plan Validity (days)</p>
                                <span>90</span>
                            </li>
                        </ul>
                    </div>
                    <div className="prime-plan-button">
                        <button className="btn btn-secondary">Continue</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Prime