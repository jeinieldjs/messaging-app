import React, {useState} from 'react';
import '../App.css';

const Logo = () => {
    return(
    <div className='logo'>
      <h1>💬APP<span style={{color:'#d8323c'}}>NAME</span></h1>
    </div>
    )
  }
  
 const Header = () => {
    return(
    <div className='header'>
      <Logo />
    </div>
  
    )
  }

  export default Header;