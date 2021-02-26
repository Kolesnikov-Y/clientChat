import React from 'react'
import  FromComponent, { UserDataModel } from '../components/FormComponent'
import LoginTestContainer from './LoginTestContainer';


export default function LoginFormContainer (): JSX.Element {
    
    const getStateValue = (value: UserDataModel) => {
        console.log(value);
    }
    
    return (
        <div className="form-container">
            <FromComponent getStateValue={getStateValue}/>    
            
        </div>
    )
} 