import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import logo from './img/logo512.png'
const Navbar = () => {
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const logout =()=>{
      // window.confirm('logout?');
      if(window.confirm('logout?') === true){
        
        localStorage.clear();
      }
      else{
    navigate('/product')
      }
      
    }
      return(
        <div>
          <img className='logo' src={logo} alt="logo" />
        {auth?
          <ul className='nav-ul'>
          <li><Link to='/product'>Product</Link></li>
          <li><Link to='/add'> Add Product</Link></li>
          <li><Link >Update Product</Link></li>
          <li><Link to='/email'>Mail</Link></li>
         
          <li><Link to='/profile'>Profile</Link></li>
          <li><Link onClick={logout} to='/signup'>Logout({JSON.parse(auth).name})</Link></li>
         
          
         
        </ul>:
        <ul className='nav-ul right-side'>
        <li><Link to='/signup'>Signup</Link></li>
        <li><Link to='/login'>login</Link></li>
        </ul>
        }
      </div>
  )
}

export default Navbar
