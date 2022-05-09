import React from 'react';
import './LeftSidebarRows.css'

const LeftSidebarRows = ({ Icon, title }) => {
  return (
    <div className='sidebar_row'>
      <Icon className="leftsidebarows_icons"/>
      <h2 style={{ color: "white"}} className='leftsidebarows_title'>{title}</h2>
    </div>
  )
}

export default LeftSidebarRows