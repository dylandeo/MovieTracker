import React, {useState} from "react";

const NavBar = ({cart, cartCount, toggleCart, addToCart, updateCartCount, handleMenuClick}) => {

  return (~
    <div id='nav-bar'>
      <div id='page-nav'>
        <div onClick={handleMenuClick}>Menu</div>
        <div onClick={toggleCart}>Cart ({cartCount})</div>
      </div>
    </div>
  )
}

export default NavBar;