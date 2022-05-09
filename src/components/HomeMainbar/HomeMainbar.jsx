import React, { useEffect } from 'react'
import Categories from '../Categories/Categories';
import HomeVideo from '../Video/HomeVideo';
import { useDispatch, useSelector } from 'react-redux'

import './HomeMainbar.css'
import { getpopularVideos, getVideosByCategory } from '../../redux/actions/videos.action';
import { SpinnerDotted } from 'spinners-react';

import InfiniteScroll from 'react-infinite-scroll-component';

const HomeMainbar = () => {


  const dispatch = useDispatch()

   useEffect(() => {
      dispatch(getpopularVideos())
   }, [dispatch])


   const { videos, activeCategory } = useSelector(state=>state.homeVideos)

   const fetchData = () => {
    if (activeCategory === 'All') dispatch(getpopularVideos())
    else {
       dispatch(getVideosByCategory(activeCategory))
    }
 }

  return (
    <div className='home-main-bar'>
      <div>
      <Categories/>
      </div> 
      <InfiniteScroll
        dataLength={videos.length}
        next={fetchData}
        hasMore={true}
        loader={
          <div>
            <SpinnerDotted size={50} thickness={100} speed={100} color="#fff" style={{ marginLeft: '30rem' }} />
          </div>
        }
      > 
        <div className='video_layout'>
            {
              videos.map((video) => (
                    <HomeVideo video={video} key={video.id} />
              ))
            }
        </div>
      </InfiniteScroll> 
    </div>
  )
}

export default HomeMainbar