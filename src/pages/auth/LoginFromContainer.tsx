import React from 'react'
import  FromComponent, { UserDataModel } from './FormComponent'


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