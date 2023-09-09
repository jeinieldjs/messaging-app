import React, {useState} from 'react';
import './App.css';
import LoginRegister from './components/LoginRegister'
import Main from './components/Main'
import axios from 'axios';
import SessionContext, { useSession } from './contexts/SessionContext'

function Logo() {
  return(
  <div className='logo'>
    <h1>💬APP<span style={{color:'#d8323c'}}>NAME</span></h1>
  </div>
  )
}

function Header(){
  return(
  <div className='header'>
    <Logo />
  </div>

  )
}

function BottomNav(){
  return(
    <div className='bottom-nav'>
        <button className='bottom-btn'><i className='fas fa-home' style={{color: '#eaebea'}}></i>Home</button>
        <button className='bottom-btn'><i className='fas regular fa-envelope' style={{color: '#eaebea'}}></i>DMs</button>
        <button className='bottom-btn'><i className='fas regular fa-user' style={{color: '#eaebea'}}></i>Profile</button>
    </div>
  )
}

function MainPage() {
  return(
    <div className='main'>
      <Header />
      <BottomNav />
      
    </div>
  )
}

function App() {
  const [session, setSession] = useSession(null);
  const [isLoginVisible, setIsLoginVisible] = useState(true);
 
  const handleSignUpClick = () => {
    setIsLoginVisible(false);
  };

  const handleLoginClick = () => {
    setIsLoginVisible(true);
  };

  return (
    <>
    {/*<MainPage />*/}
      <Header />
      <SessionContext.Provider value={ {session, setSession} }>
        {session ? <Main/> : <LoginRegister/>}
      </SessionContext.Provider>
    </>
  );
}

export default App;
