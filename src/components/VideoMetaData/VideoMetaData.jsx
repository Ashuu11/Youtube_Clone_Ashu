import moment from 'moment'
import numeral from 'numeral'
import React, { useEffect } from 'react'
import'./VideoMetaData.css'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ShowMoreText from 'react-show-more-text';
import { useDispatch, useSelector } from 'react-redux';
import { checkSubscriptionStatus, getChannelDetails } from '../../redux/actions/channel.action';
import  HelmetCustom  from '../HelmetCustom';

const VideoMetaData = ({video:{snippet,statistics}, videoId}) => {


  const { channelId, channelTitle, description, title, publishedAt } = snippet;
  const { viewCount, likeCount, dislikeCount } = statistics;

  const {snippet: channelSnippet, statistics: channelStatistics} = useSelector(state => state.channelDetails.channel)

  const subscriptionStatus = useSelector(state => state.channelDetails.subscriptionStatus)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getChannelDetails(channelId))
    dispatch(checkSubscriptionStatus(channelId))
  }, [dispatch, channelId])

  return (
    <div className='videoMetaData' style={{ padding: "2px"}}>

      <HelmetCustom title={title} description={description} />
        <div className='videoMetaData_top'>
          <h5>{title}</h5>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1'}}>
            <span>
                {numeral(viewCount).format('0.a')} Views •{' '}
                <span style={{ marginLeft: "7px"}}>{moment(publishedAt).fromNow() }</span>  
            </span>  
          <div style={{ marginRight: '4.5rem', marginBottom: '5px'}}>
              <span style={{ marginRight: "10px"}}>
                <ThumbUpIcon color='#fff' style={{ fontSize: '26'}}/>{numeral(likeCount).format('0.a')}
              </span> 
              <span style={{ marginRight: "10px"}}>
                <ThumbDownIcon color='#fff' style={{ fontSize: '26'}}/>{numeral(dislikeCount).format('0.a')}
              </span>
          </div>
        </div>
        </div>

        <div className='videoMetaData_channel' style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', margin: '3px', padding: '2px'}}>
          <div style={{ display: 'flex'}}>
            <img src={channelSnippet?.thumbnails?.default?.url} alt='' style={{ borderRadius: '50%', marginRight: '3px', width: '45px'}}/>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', marginLeft:'10px', marginRight: '10px'}}>
            <span style={{ fontSize: '14px', width: '130px'}}>{channelTitle}</span>
            <span style={{ fontSize: '14px'}}>{numeral(channelStatistics?.subscriberCount).format('0.a')} Subscribers{' '}</span>
          </div>
          <button className={`${subscriptionStatus && 'btn-gray'}`} style={{ border: 'none', padding: '10px 16px', margin: '1.5rem', marginLeft: '590px'}}>{subscriptionStatus ? 'Subscribed' : 'Subscribe'}</button>
        </div>
        <div className='videoMetaData_description'>
          <ShowMoreText
          lines={3}
          more="SHOW MORE"
          less="SHOW LESS"
          anchorClass='showMoreText'
          expanded={false}
          >
          {description}
          </ShowMoreText>
        </div>
    </div>
  )
}

export default VideoMetaData