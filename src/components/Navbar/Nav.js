import React from 'react'
import './Nav.css'
import { GiTwoCoins } from "react-icons/gi";
import { Link } from 'react-router-dom';

const Nav = () => {

  return (
    <>
      <div className='home-button'>
        <Link to={'/'}><GiTwoCoins className='home-logo'/></Link>
      </div>
      <div className='navbar'>
          <h1 className='brand'>Coin <span className='purple'>Tracer</span></h1>
          {/* <div className='theme-change'>
            <GoMoon 
              className='theme-icon'
              onClick={switchTheme}
            />
          </div> */}
      </div>
    </>
  )
}

export default Nav