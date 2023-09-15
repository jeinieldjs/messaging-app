import React from 'react';
import '../App.css';

export const AppName = () => {
    return(
    <div className='greeting'>
      <h1>CLUCK<span style={{color:'#d8323c'}}>APP</span></h1>
    </div>
    )
  }
  
 const Icon = () => {
  return (
    <div id='icon-container'>
      <img
        id='icon-logo' 
        src='https://icons.veryicon.com/png/o/food--drinks/fresh-3/fresh-chicken.png'></img>
    </div>
  )
 }
 const Header = () => {
    return(
    <div className='header'>
      <Icon />
      <h1>Welcome to <AppName /></h1>
    </div>
  
    )
  }

  export default Header;