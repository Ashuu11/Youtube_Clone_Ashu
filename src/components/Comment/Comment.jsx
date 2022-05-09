import React from 'react';
import moment from 'moment';
import './Comment.css'

const Comment = ({ comment }) => {


  const { authorDisplayName, authorProfileImageUrl, publishedAt, textDisplay} = comment;

  return (
    <div className='comment' style={{ padding: '12px', display: 'flex'}}>
         <img src={authorProfileImageUrl} alt='' style={{ height: '45px', borderRadius: '50%' , marginRight: '3px', width: '45px'}}/>
         <div className='comment_body'>
            <p className='comment_header'>
                {authorDisplayName} • {moment(publishedAt).fromNow()}
            </p>
            <p style={{ marginLeft: '5px'}}>{textDisplay}</p>
         </div>
    </div>
  )
}

export default Comment