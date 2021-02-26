import React from 'react'; 
import './style/formTestComponent.scss';

export interface StateModel {
    name?: string; 
    password: string; 
    email: string; 
}

interface FormTestComponentModel { }

export default function FormTestComponent ({ }: FormTestComponentModel): JSX.Element {
    const [state, setState] = React.useState<StateModel>({
        name: '', 
        password: '', 
        email: ''
    })

    const submitHelper = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 


    }

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState({...state, [e.currentTarget.name]: e.currentTarget.value} );
    } 
 



    return (
        <form className="form" onSubmit={submitHelper}>
            <div className="email-address">
                <label htmlFor="form-email">
                    Email
                </label>
                <input type="text" name='email' id="form-email" value={state.email} onChange={onChangeHandler}/>
            </div>

            <div className="password">
                <label htmlFor="form-password">
                    Password  
                </label>
                <input type="text" name='password' id="form-password" value={state.password} onChange={onChangeHandler}/>
                <a href="/forgotPassword">Forgot My Password</a>
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

            <a href="/create" className="sign-in" type="button"> Create New Account</a>
        </form>
    )
} 