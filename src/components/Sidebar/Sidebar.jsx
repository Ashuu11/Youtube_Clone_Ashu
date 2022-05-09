import React from 'react';
import LeftSidebarRows from '../LeftSidebarRows/LeftSidebarRows';
import HomeIcon from '@mui/icons-material/Home';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import SubscriptionsOutlinedIcon from '@mui/icons-material/SubscriptionsOutlined';

import VideoLibraryOutlinedIcon from '@mui/icons-material/VideoLibraryOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import OndemandVideoOutlinedIcon from '@mui/icons-material/OndemandVideoOutlined';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import {useDispatch} from 'react-redux'; 

import './Sidebar.css';
import { log_out } from '../../redux/actions/auth.action';
import { Link } from 'react-router-dom';

const Sidebar = () => {

  const dispatch = useDispatch()

  const handleLogout = () =>{
    dispatch(log_out())
    window.location.reload();
  }

  return (
    <div className='sidebar'>
        <Link to='/'>
          <LeftSidebarRows Icon={HomeIcon} title='Home'/>
        </Link>
        <LeftSidebarRows Icon={ExploreOutlinedIcon} title='Explore'/>
        <Link to='/feed/subscriptions'>
          <LeftSidebarRows Icon={SubscriptionsOutlinedIcon} title='Subscriptions'/>
        </Link>
        <hr/>
        <LeftSidebarRows Icon={VideoLibraryOutlinedIcon} title="Library"/>
        <LeftSidebarRows Icon={HistoryOutlinedIcon} title="History"/>
        <LeftSidebarRows Icon={OndemandVideoOutlinedIcon} title="Your videos"/>
        <LeftSidebarRows Icon={WatchLaterOutlinedIcon} title="Watch Later"/>
        <LeftSidebarRows Icon={ThumbUpAltOutlinedIcon} title="Liked videos"/>
        <LeftSidebarRows Icon={ExpandMoreOutlinedIcon} title="Show more"/>
        <hr/>
        <div onClick={handleLogout}>  
        <LeftSidebarRows Icon={LogoutOutlinedIcon} title="Log out"/> 
        </div>
        {/* <span style={{ marginLeft: "20px", display: 'flex', cursor: 'pointer'}} onClick={handleLogout}>
          <LogoutOutlinedIcon/>
          <span style={{ marginLeft: '16px' }}>Log out</span>  
        </span> */}
    </div>
  )
}

export default Sidebar