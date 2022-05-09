import React, { useState} from 'react';
import { useDispatch } from 'react-redux'
import { getpopularVideos, getVideosByCategory } from '../../redux/actions/videos.action';
import './Categories.css';

const values = [
  'All',
  'React js',
  'Angular js',
  'React Native',
  'API',
  'Redux',
  'Music',
  'KR$NA',
  'Hip Hop Songs',
  'Coding',
  'Cricket',
  'Live',
  'BGMI',
  'Love Babbar',
  'Computer Programming',
]

const Categories = () => {

  const [activeElement, setActiveElement] = useState('All')

  const dispatch = useDispatch()

  const handleClick = (value) =>{
    setActiveElement(value)
    dispatch(getVideosByCategory(value))
    if (value === 'All') {
      dispatch(getpopularVideos())
   } else {
      dispatch(getVideosByCategory(value))
   }
  }

  return (
    <div className='categories'>
      {
        values.map((value, i) => <span 
        onClick={() => handleClick(value)} 
        className={activeElement === value ? "active" : ""}
        key={i}>
          {value}
        </span>)
      }
    </div>
  )
}

export default Categories