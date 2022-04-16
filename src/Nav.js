import React, { useState, useEffect } from 'react';
import './Nav.css';


const Nav = () => {

  const[show,setShow] = useState(false);

  const scrollToggle = () => {

        if(window.scrollY > 100) {
            setShow(true);
        } 
        else{
            setShow(false);
        }
    };

  useEffect(()=>{
    window.addEventListener("scroll",scrollToggle);
    return () => {
        window.removeEventListener("scroll",scrollToggle);
    };
  },[scrollToggle]);

  return (

    <div className={`nav ${show && "nav_black"}`}>
        <img 
            src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png" 
            alt="Netflix Logo" 
            className="nav_logo" 
        />

        <img 
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" 
            alt="Netflix Avatar" 
            className="nav_avatar" 
        />

    </div>

  )
}

export default Nav