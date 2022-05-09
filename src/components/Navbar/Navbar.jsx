import React, { useState } from 'react'
import './Navbar.css';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../../assets/logo.png';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import MicIcon from '@mui/icons-material/Mic';
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined';
import AppsRoundedIcon from '@mui/icons-material/AppsRounded';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import { Avatar } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {

  const history = useHistory();

  const [input, setInput] = useState('')
  const user = useSelector(state => state.auth?.user)

  const handleSubmit = (e) =>{
    e.preventDefault();
    history.push(`/search/${input}`)
  }

  return (
    <nav className='main-nav'>
      <div className='navbar'>
        {/* Navbar_Left */}
        <div className='navbar_left'>
          <MenuIcon style={{ color: "white", fontSize: "25px", position: 'relative', bottom: '2px', right: '2rem'}}/>
          <img src={logo} alt='youtube-logo' className='navbar_logo'/>
        </div>

         {/* Navbar_Search */}
          <form onSubmit={handleSubmit}>
          <div className='navbar_search'>
            <input type='text' placeholder='Search' value={input} onChange={e=> setInput(e.target.value)}/>
            <button type='submit' className='search-btn'> 
            <SearchOutlinedIcon style={{ color: "white" }} className='search_icon'/>
            </button>
            <MicIcon style={{ color: "white", fontSize: "22px" }} className='search_mic'/>
          </div>
          </form>
         

        {/* Navbar_Right */}
        <div className='navbar_right'>
          <VideoCallOutlinedIcon style={{ color: "white", fontSize: "28px" }} className="navbar_right_icons" />
          <AppsRoundedIcon style={{ color: "white", fontSize: "28px" }}  className="navbar_right_icons"/>
          <NotificationsNoneRoundedIcon style={{ color: "white", fontSize: "28px" }} className="navbar_right_icons" />
          <Avatar alt='Ashish Mohanty' src={user?.photoURL}></Avatar>
        </div>
      </div>
    </nav>
  )
}

export default Navbar