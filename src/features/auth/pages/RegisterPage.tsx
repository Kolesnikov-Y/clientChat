import React from 'react'; 
import AuthLayout from '../../../layout/AuthLayout';
import RegisterFormContainer from '../containers/RegistrFromContainer';

export default function RegisterPage ( ): JSX.Element {
    return (
        <AuthLayout>
           <RegisterFormContainer/>
        </AuthLayout>
    )
}