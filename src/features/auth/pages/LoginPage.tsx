import React from 'react'
import AuthLayout from '../../../layout/AuthLayout'
import LoginTestContainer from '../containers/LoginTestContainer'
import LoginFormContainer from '../containers/LoginFromContainer'

export default function LoginPage ( ): JSX.Element {
    return (
        <AuthLayout>
            {/* <LoginFormContainer/> */}
            <LoginTestContainer></LoginTestContainer>
        </AuthLayout>
    )
}