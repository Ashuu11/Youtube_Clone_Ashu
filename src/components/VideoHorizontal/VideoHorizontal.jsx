import React, { useEffect, useState } from 'react'
import './VideoHorizontal.css';

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import request from '../../api/api';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

const VideoHorizontal = ({ video ,searchScreen, subScreen }) => {

  const {
    id,
    snippet: {
       channelId,
       channelTitle,
       description,
       title,
       publishedAt,
       thumbnails: { medium },
       resourceId,
    },
 } = video

   const isVideo = id.kind === 'youtube#video'

   const thumbnail = !isVideo && 'videoHorizontal_thumbnail_channel'

   const [views, setViews] = useState(null)
   const [durationn, setDurationn] = useState(null)
   const [channelIcon, setChannelIcon] = useState(null)

   useEffect(() => {
    const get_video_details = async () => {
       const {
          data: { items },
       } = await request('/videos', {
          params: {
             part: 'contentDetails,statistics',
             id: id.videoId,
          },
       })
       setDurationn(items[0].contentDetails.duration)
       setViews(items[0].statistics.viewCount)
    }
    if(isVideo) get_video_details()
  }, [id, isVideo])
  
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

  const seconds = moment.duration(durationn).asSeconds()
  const _duration = moment.utc(seconds * 1000).format('mm:ss')

  const history = useHistory()

  const _channelId = resourceId?.channelId || channelId

  const handleClick = () => {
    isVideo ?
    history.push(`/watch/${id.videoId}`) : history.push(`/channel/${_channelId}`)
  }

  return (
    <div className={searchScreen ? 'videoHorizontal_search' :'videoHorizontal'} style={{ margin: '5px', paddingRight: '6px', alignItems: 'center'}} onClick={handleClick}>

      <div className='videoHorizontal_left'>

      <img src={medium.url} alt='' className={`videoHorizontal_thumbnail ${thumbnail}`} />
      {
        isVideo && (
          <span style={{ position: 'absolute', bottom: '0.5rem', right: '0.5rem', padding: '0.2rem', background: '#080808ec', borderRadius: '3px', fontSize: '14px'}}>{_duration}</span>
        )
      }

      </div>

      <div className='videoHorizontal_right' style={{ padding: '0px'}}>

        <p className='videoHorizontal_title' style={{ marginBottom: '10px'}}>{title}</p>

      {
        isVideo && (
        <div className='videoHorizontal_details'>
          <RemoveRedEyeIcon style={{ color: "white", fontSize: '15px', marginTop: '2px', marginRight: '5px'}}/> {numeral(views).format('0.a')} Views •{' '}
            {moment(publishedAt).fromNow() }
        </div>
        )
      }

      {
        (searchScreen || subScreen) && <p style={{ marginTop: '1rem', marginLeft: '0.4rem', marginBottom: '1rem', width: '60rem'}}>{description}</p>
      }


        <div className='videoHorizontal_channel' style={{ display: 'flex', alignItems: 'center', margin: '10px'}}>
          {
            isVideo &&(
              <img src={channelIcon?.url} alt='channel_logo'/>
            )
          }
          <p>{channelTitle}</p>
        </div>
        { subScreen &&
          <p style={{ marginTop: '2rem'}}>{video.contentDetails.totalItemCount}{' '} Videos</p>
        }
      </div>
    </div>
  )
}

export default VideoHorizontal