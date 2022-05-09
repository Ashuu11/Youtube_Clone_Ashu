import React, { useEffect } from 'react'
import './WatchVideos.css'
import VideoMetaData from '../../components/VideoMetaData/VideoMetaData';
import VideoHorizontal from '../../components/VideoHorizontal/VideoHorizontal';
import Comments from '../../components/Comments/Comments'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getRelatedVideos, getVideoById } from '../../redux/actions/videos.action';
import {Helmet} from 'react-helmet';
 
const WatchVideos = () => {

  const {id} = useParams()

  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(getVideoById(id))
      dispatch(getRelatedVideos(id))
  }, [dispatch,id])

  const {videos, loading: relatedVideoLoading} = useSelector(state => state.relatedVideos)

  const {video, loading} = useSelector(state => state.selectedVideo);

  return (
    <div className='Watch_Videos'>
        <Helmet><title>{video?.snippet?.title}</title></Helmet>
        <div className='left_section'>
            <div className='watchvideos_player'>
                <iframe src={`https://www.youtube.com/embed/${id}`} 
                frameBorder="0" 
                title={video?.snippet?.title} 
                allowFullScreen 
                width='886px' 
                height='487px'></iframe>
            </div>
            {
                !loading ? <VideoMetaData video={video} videoId={id}/> : <h6>Loading...</h6>
            }
            <Comments videoId={id} totalComments={video?.statistics?.commentCount}/>
        </div>

        
        <div className='right_section'>
            {
                !loading && videos?.filter(video=> video.snippet)
                
                .map((video) => <VideoHorizontal video={video} key={video.id.videoId}/>)
            }
        </div>
    </div>
  )
}

export default WatchVideos