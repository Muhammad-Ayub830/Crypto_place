import React, { useContext } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import Arrow_icon from '../../assets/arrow_icon.png'
import { coinContext } from '../../Context/CoinContext'
import { Link } from 'react-router-dom'
const Navbar = () => {
  const {setCurrency} = useContext(coinContext)
  const currency_handler = (event)=>{
    switch(event.target.value){
      case "usd":{
        setCurrency({name:"usd",symbol:"$"})
      }
    break;
      case "eur":{setCurrency({name:"eur",symbol:"€"})}
    break;
      case "inr":{setCurrency({name:"inr",symbol:"₹"})}
    break;
    default:{
      setCurrency({name:"usd",symbol:"$"});
      break
    }
    
    }
  }
  return (
    <div className='navbar'>
  <Link to={`/`}>   <img src={logo} className='logo'/></Link> 
      <ul>
    <Link to={'/'}><li>Home</li></Link>    
        <li>Feature</li>
        <li>Pricing</li>
        <li>Blog</li>
      </ul>
      <div className="nav-right">
        <select onChange={currency_handler} name="" id="">
            <option value="usd">USD</option>
            <option value="eur">EURO</option>
            <option value="inr">INR</option>
        </select>
        <button>Sign Up <img src={Arrow_icon} /></button>
      </div>
    </div>
  )
}

export default Navbar
