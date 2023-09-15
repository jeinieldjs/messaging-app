import React, { useState, useContext } from 'react';
import SessionContext from '../contexts/SessionContext';
import Header from './HeaderLogo';

const LoginRegister = () => {
    const baseURL = 'http://206.189.91.54/api/v1/';
    const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;//@symbol, 1 char before @, 1 char after @, 1 ., 1 char after .
    const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/; //<=8 chars, at least 1: uppercase,lowercase,number 
    const { session, setSession } = useContext(SessionContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
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
                if(response.status === 200){
                    setSession({
                        accessToken: response.headers.get('access-token'),
                        client: response.headers.get('client'),
                        uid: response.headers.get('uid'),
                        expiry: response.headers.get('expiry'),
                        email: email
                    })
                } else if (response.status === 404) {
                    alert('Email is not registered.');
                } else if (response.status === 401) {
                    alert('Incorrect email or password.');
                } else {
                    alert('An error occurred while logging in.');
                    console.log(response);
                }
            })
            .catch(error => {
                console.log(error);
            })

    }

    const signup = (e) => {
        e.preventDefault();

        if (!emailRegEx.test(email)) {
            alert('Please enter a valid email address.');
            return;
        };
        if (!passwordRegEx.test(password)) {
            alert('Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, and one digit.');
            return;
        };
        if (password !== passwordConfirmation){
            alert('Passwords entered do not match.');
            return;
        }
        
        const endpoint = `${baseURL}auth`
        const method = 'POST'
        const headers = { 'Content-Type': 'application/json' }
        const body = JSON.stringify({ email, password, password_confirmation: passwordConfirmation})

        fetch(endpoint, { method, headers, body })
            .then(response => {
                if(response.status === 200){
                    alert('Congratulations! You may now login with your registered email.');
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
        <div className='landing-page'>
        <Header />
        {isLoginVisible ? (
            <div id='log-form'>
                <div id='form-title'>
                    <h1>LOGIN</h1>
                </div>
              
                <label className='input-label'>E-mail:</label>
                <input type='email' 
                    name='log-email' 
                    id='log-emailInput' 
                    placeholder='✉ Type your email' 
                    value={email} 
                    className='log-input' 
                    onChange={event => setEmail(event.target.value)} />
                <label for="log-password" className='input-label'>Password:</label>
                <input type='password' 
                    name='log-password' 
                    id='log-passwordInput' 
                    placeholder='🗝 Type your password'
                    value={password} 
                    className='log-input'
                    onChange={e => setPassword(e.target.value)} />
                    <br />
                <p id='log-note'>
                Not yet registered? <button onClick={handleSignUpClick  } className='form-link'>SIGN-UP</button>.
                </p>
                <button id='log-button' onClick={login}>LOGIN</button>
            </div>
          ) : (
            <div id='reg-form'>
                <div id='form-title'>
                    <h1>SIGN UP</h1>
                </div>
                <label for="reg-email" className='input-label'>E-mail:</label>
                <input type='text' 
                    name='reg-email' 
                    id='reg-emailInput' 
                    className='log-input' 
                    placeholder='✉ Type your email'
                    onChange={event => setEmail(event.target.value)} />
                <label for="reg-password" className='input-label'>Password:</label>
                <input type='password' 
                    name='reg-password' 
                    id='reg-passwordInput' 
                    className='log-input' 
                    placeholder="🗝 Type your password"
                    onChange={e => setPassword(e.target.value)} />
                <label for="reg-confirmpassword" className='input-label'>Confirm password:</label>
                <input type='password' 
                    name='reg-confirmpassword' 
                    id='reg-confirmpasswordInput' 
                    className='log-input' 
                    placeholder='🗝Type your password again'
                    onChange={e => setPasswordConfirmation(e.target.value)} /><br />
                <p id='log-note'>
                    Already registered? <button onClick={handleLoginClick} className='form-link'>LOGIN</button>.
                </p>
                <button id='log-button' onClick={signup}>REGISTER</button>
        
            </div>
          )}
        </div>
    )
}

export default LoginRegister;