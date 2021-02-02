import axios from 'axios'
import React from 'react'
import GoogleLogin from 'react-google-login'

export default function GoogleLoginComponent () {

    const successGoogelRes = (response: any) => {
     
        axios.post('http://localhost:3001/api/auth/logingoogle',{token: response.tokenId})
        .then((response) => console.log(response)
        )
      }
    
      const  responseErrorGoogle = (respose: any) => {
        console.log("error res", respose);
        
      }


    return (
        <GoogleLogin
        clientId="913355923515-arr3mr1m2qbdi76mr77g70kku7ekvhf6.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={successGoogelRes}
        onFailure={responseErrorGoogle}
        className="google-btn"
      />
    )
}