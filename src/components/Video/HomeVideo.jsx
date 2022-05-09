import React, { useEffect, useState } from 'react';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import './HomeVideo.css'
import request from '../../api/api';
import { useHistory } from 'react-router-dom';

import moment from 'moment';
import numeral from 'numeral';

const HomeVideo = ({ video, channelScreen }) => {

  const {
    id,
    snippet: {
       channelId,
       channelTitle,
       title,
       publishedAt,
       thumbnails: { medium },
    },
    contentDetails,
 } = video

 const [views, setViews] = useState(null)
 const [durationn, setDurationn] = useState(null)
 const [channelIcon, setChannelIcon] = useState(null)

 const seconds = moment.duration(durationn).asSeconds()
 const _duration = moment.utc(seconds * 1000).format('mm:ss')

 const _videoId = id?.videoId || contentDetails?.videoId || id

 const history = useHistory()

 useEffect(() => {
  const get_video_details = async () => {
     const {
        data: { items },
     } = await request('/videos', {
        params: {
           part: 'contentDetails,statistics',
           id: _videoId,
        },
     })
     setDurationn(items[0].contentDetails.duration)
     setViews(items[0].statistics.viewCount)
  }
  get_video_details()
}, [_videoId])

useEffect(() => {
  const get_channel_icon = async () => {
     const {
        data: { items },
     } = await request('/channels', {
        params: {
           part: 'snippet',
           id: channelId,
        },
     })
     setChannelIcon(items[0].snippet.thumbnails.default)
  }
  get_channel_icon()
}, [channelId])

const handleVideoClick = () =>{
    history.push(`/watch/${_videoId}`)
}

  return (
    <div className='video' onClick={handleVideoClick}>
      <div className='video_thumb'>
        <img src={medium.url} alt=''/>
        <span>{_duration}</span>
      </div>
      <div className='video_title'>
        {title}
      </div>
      <div className='video_details'>
        <span>
          <RemoveRedEyeIcon style={{ color: "white", fontSize: '15px', marginTop: '2px'}}/> {numeral(views).format('0.a')} Views •{' '}
        </span>
        <span style={{ marginLeft: "7px"}}>{moment(publishedAt).fromNow() }</span>
      </div>
      {!channelScreen && (
      <div className='video_channel'>
        <img src={channelIcon?.url} alt=''/>
        <p>{channelTitle}</p>
      </div>
      )}
      </div>
  )
}

export default HomeVideo