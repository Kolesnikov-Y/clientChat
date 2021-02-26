import React from 'react';
import FromComponent, { UserDataModel } from '../components/FormComponent';


export default function RegisterFormContainer (): JSX.Element {
    
    const getStateValue = (value: UserDataModel) => {
        console.log(value);
    }
    
    return (
        <div className="form-container">
            <FromComponent getStateValue={getStateValue}/>    
        </div>
    )
} 