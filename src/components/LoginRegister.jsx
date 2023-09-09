import React, { useState, useContext } from 'react';
import SessionContext from "../contexts/SessionContext";

const LoginRegister = () => {
    const baseURL = 'http://206.189.91.54/api/v1/';
    
    const { session, setSession } = useContext(SessionContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [isLoginVisible, setIsLoginVisible] = useState(true);
    const handleSignUpClick = () => {
        setIsLoginVisible(false);
    };
    const handleLoginClick = () => {
        setIsLoginVisible(true);
    };

    const login = (e) => {
        e.preventDefault();
        
        const endpoint = `${baseURL}auth/sign_in`
        const method = 'POST'
        const headers = { 'Content-Type': 'application/json' }
        const body = JSON.stringify({ email, password })

        fetch(endpoint, { method, headers, body })
            .then(response => {
                if(response.status == 200){
                    setSession({
                        accessToken: response.headers.get('access-token'),
                        client: response.headers.get('client'),
                        uid: response.headers.get('uid'),
                        expiry: response.headers.get('expiry')
                    })
                }
            })
            .catch(error => {
                console.log(error);
            })

    }

    const signup = (e) => {
        e.preventDefault();
        
        const endpoint = `${baseURL}auth`
        const method = 'POST'
        const headers = { 'Content-Type': 'application/json' }
        const body = JSON.stringify({ email, password, password_confirmation: passwordConfirmation})

        fetch(endpoint, { method, headers, body })
            .then(response => {
                if(response.status == 200){
                    alert('signup succesful');
                    setIsLoginVisible(true);
                    setEmail('');
                    setPassword('');
                } else{
                    console.log(response)
                }
            })
            .catch(error => {
                console.log(error);
            })

    }
 

    return (
        <>
        {isLoginVisible ? (
            <div id='log-form'>
                <label className='input-label'>E-mail:</label>
                <input type='email' name='log-email' id='log-emailInput' value={email} className='log-input' onChange={event => setEmail(event.target.value)} />
                <label for="log-password" className='input-label'>Password:</label>
                <input type='password' name='log-password' id='log-passwordInput' value={password} className='log-input' onChange={e => setPassword(e.target.value)} /><br />
                <p id='log-note'>
                Not yet registered? <button onClick={handleSignUpClick  } className='form-link'>SIGN-UP</button>.
                </p>
                <button id='log-button' onClick={login}>LOGIN</button>
            </div>
          ) : (
            <div id='reg-form'>
                <label for="reg-email" className='input-label'>E-mail:</label>
                <input type='text' name='reg-email' id='reg-emailInput' className='log-input' onChange={event => setEmail(event.target.value)} />
                <label for="reg-password" className='input-label'>Password:</label>
                <input type='password' name='reg-password' id='reg-passwordInput' className='log-input' onChange={e => setPassword(e.target.value)} />
                <label for="reg-confirmpassword" className='input-label'>Confirm password:</label>
                <input type='password' name='reg-confirmpassword' id='reg-confirmpasswordInput' className='log-input' onChange={e => setPasswordConfirmation(e.target.value)} /><br />
                <p id='log-note'>
                    Already registered? <button onClick={handleLoginClick} className='form-link'>LOGIN</button>.
                </p>
                <button id='log-button' onClick={signup}>REGISTER</button>
        
            </div>
          )}
        </>
    )
}

export default LoginRegister;