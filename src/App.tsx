import React from 'react';
import './pages/style/style.css'
import axios from 'axios'; 
import { GoogleLogin } from 'react-google-login'; 
import ChatContainer from './pages/ChatContainer';


function App() {
  const [state, setState] = React.useState({
    name: "", 
    email: "", 
    password: ""
  }) ; 
  // const [userId, setUserId] = React.useState({
  //   id: "35e24c8b-ec39-4d99-bff9-ab0687a77459",
  // })

  const changeHandler= (e: any) => {
    setState({...state, [e.currentTarget.name]: e.currentTarget.value})
  }

  const submitHandler = (e: any) => {
    e.preventDefault(); 
    const user = {
      name: state.name,
      email: state.email, 
      password: state.password
    }

    // const a = `14413628235-o9h09ul5k9m9715udfnrms3i1b1pb28d.apps.googleusercontent.com`

    axios.post("http://localhost:3001/api/auth/create", user)
    .then((response) => console.log(response.data)
    ).finally(() => {

      setState({...state, name: "", email: "", password: ''})
    })

  }

  const successGoogelRes = (response: any) => {
     
    axios.post('http://localhost:3001/api/auth/logingoogle',{token: response.tokenId})
    .then((response) => console.log(response)
    )
  }

  const  responseErrorGoogle = (respose: any) => {
    console.log("error res", respose);
    
  }

  // const getUserInfoHelper = () => {
  //   axios.get(`http://localhost:3001/api/user/${userId.id}`)
  //   .then( response => console.log(response.data))
  // }

  return (
    <div className="App">
        <header className='header'>
          HEADER
        </header>
      <div className="container">
      
        <div className="form-container">
          <form  className="authForm" onSubmit={submitHandler}>
            <label htmlFor="nameInput" className="label" >Name</label>
            <input type="text" id="nameInput" placeholder="name" onChange={changeHandler} name="name" value={state.name}/>  
            <label htmlFor="emailInput" className="label" >E-mail</label>
            <input type="text" id="emailInput" placeholder="email" onChange={changeHandler} name="email" value={state.email}/>
            <label htmlFor="passwordInput" className="label" >Password</label>
            <input type="text" id="passwordInput" placeholder="password" onChange={changeHandler} name="password" value={state.password}/>
            <button className="submit-btn" type='submit'>submit</button>
          </form>

          <GoogleLogin
            clientId="913355923515-arr3mr1m2qbdi76mr77g70kku7ekvhf6.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={successGoogelRes}
            onFailure={responseErrorGoogle}
            className="google-btn"
          />
          {/* <button className="" onClick={getUserInfoHelper}> get all information</button> */}
        </div>

        <ChatContainer/>
      </div>


        
    </div>
  );
}

export default App;
