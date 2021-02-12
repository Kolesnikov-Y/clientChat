import React from 'react'; 
import FormTestComponent from './FormTest';
import './style/loginTestContainer.scss'

export default function LoginTestContainer (): JSX.Element {
    return (
       <div className="login-form-container">
           <div className="login-form-component">
                <div className="form-logo">
                    <span>
                        <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="35" cy="35" r="35" fill="#4424A7"/>
                            <rect x="17" y="35" width="8" height="15" rx="3" stroke="white" strokeWidth="2"/>
                            <rect x="31" y="27" width="8" height="23" rx="3" stroke="white" strokeWidth="2"/>
                            <rect x="45" y="19" width="8" height="31" rx="3" stroke="white" strokeWidth="2"/>
                        </svg>
                    </span>
                </div>
                <div className="form-title">    
                    <h2>
                        Log In and Learn The Report
                    </h2>
                    <p>We provide variant data that you can use it in order
                        to get the better perfomance at sales
                    </p>
                </div>

                <FormTestComponent/>
           </div>
           <div className="right">
                <div className="illustration">
                    <img src="../img/illustration.svg" alt="svg"/>
                </div>
                <div className="group">
                    <h2>Simple is Key</h2>
                    <p>Generate business model with no hustle and headache</p>
                </div>
                <div className="indicator">
                    pagination
                </div>
           </div>
       </div>

    )
}