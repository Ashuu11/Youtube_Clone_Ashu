import React, { useEffect } from 'react'
import './Channel.css'
import { useDispatch, useSelector } from 'react-redux';
import { getVideosByChannel } from '../../redux/actions/videos.action';
import { useParams } from 'react-router-dom'
import HomeVideo from '../../components/Video/HomeVideo'
import { getChannelDetails } from '../../redux/actions/channel.action';
import numeral from 'numeral';

const Channel = () => {

  const dispatch = useDispatch() 
  const { channelId } = useParams() 

  useEffect(() => {
      dispatch(getVideosByChannel(channelId))
      dispatch(getChannelDetails(channelId))
  }, [dispatch, channelId])

  const { videos, loading } = useSelector(state => state.channelVideos)
  const { snippet, statistics } = useSelector(
    state => state.channelDetails.channel
 )

  return (
   <div className='channel_ch'>
    <div style={{ paddingTop: '2px', paddingBottom: '5px', marginTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}} className='channelHeader'>
        <div style={{ display: 'flex', alignItems: 'center'}}>
            <img src={snippet?.thumbnails?.default?.url} alt='' />

            <div style={{ marginLeft: '3px'}} className='channelHeader_details'>
              <h3>{snippet?.title}</h3>
              <span>
                  {numeral(statistics?.subscriberCount).format('0.a')}{' '}
                  subscribers
              </span>
            </div>
        </div>

        <button>Subscribe</button>
    </div>

    <div style={{ marginTop: '1rem', marginLeft: '1rem', width: '78rem'}} className='channel_video_layout'>
      {
        !loading ? videos?.map(video=> <div>
          <HomeVideo video={video} channelScreen/>
        </div>) : (
          <h1>Loading...</h1>
        )
      }
    </div>
    </div>
  )
}

export default Channel