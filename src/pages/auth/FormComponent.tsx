import React from 'react'

interface FormComponentProps {
    getStateValue: (value: UserDataModel) => void
}

export interface UserDataModel {
    name?: string; 
    email: string; 
    password: string; 
}

export default function FromComponent ({getStateValue}: FormComponentProps): JSX.Element {
    const [state, setState] = React.useState<UserDataModel>({
        name: "", 
        email: "", 
        password: ""
      }) ; 


    const changeHandler= (e: any) => {
        setState({...state, [e.currentTarget.name]: e.currentTarget.value})
      }
    
      const submitHandler = (e: any) => {
        e.preventDefault(); 
        const user: UserDataModel = {
          name: state.name,
          email: state.email, 
          password: state.password  
        }

        getStateValue(user);
    }
    return (
        <form  className="authForm" onSubmit={submitHandler}>
            <label htmlFor="nameInput" className="label" >Name</label>
            <input type="text" id="nameInput" placeholder="name" onChange={changeHandler} name="name" value={state.name}/>  
            <label htmlFor="emailInput" className="label" >E-mail</label>
            <input type="text" id="emailInput" placeholder="email" onChange={changeHandler} name="email" value={state.email}/>
            <label htmlFor="passwordInput" className="label" >Password</label>
            <input type="text" id="passwordInput" placeholder="password" onChange={changeHandler} name="password" value={state.password}/>

            <button className="submit-btn" type='submit'>submit</button>
        </form>
    )
}