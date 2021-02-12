import React from 'react'
import './style/formTestComponent.scss'

export default function FormTestComponent (): JSX.Element {
    return (
        <form className="form">
            <div className="email-address">
                <label htmlFor="form-email">
                    Email
                </label>
                <input type="text" name='email' id="form-email"/>
            </div>

            <div className="password">
                <label htmlFor="form-password">
                    Password  
                </label>
                <input type="text" name='password' id="form-password"/>
                <a href="/">Forgot My Password</a>
            </div>

            <div className="account-type">
                <label htmlFor="type"></label>
                <select name="type" id="type">
                    <option className="default" value="">chose your ans</option>
                    <option className="optional"  value="">1</option>
                    <option className="optional" value="">2</option>
                    <option className="optional" value="">3</option>
                    <option className="optional" value="">4</option>
                </select>
            </div>
            <button className="btn btn-signIn">
                Sign In
            </button>

            <a href="/create" className="sign-in" type="button">Create New Account</a>
        </form>
    )
} 