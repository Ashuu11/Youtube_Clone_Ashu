import React, { useEffect, useState } from 'react'
import Comment from '../Comment/Comment'
import numeral from 'numeral';
import './Comments.css'
import { useDispatch, useSelector } from 'react-redux';
import { addComment, getComments } from '../../redux/actions/comments.action';

const Comments = ({ videoId, totalComments }) => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getComments(videoId))
  }, [videoId, dispatch])

  const comments = useSelector(state => state.commentList.comments);
  const { photoURL } = useSelector(state => state.auth?.user)
  const [text, setText] = useState('')

  const TopComments = comments?.map(comment => comment.snippet.topLevelComment.snippet)

  const handleComment = (e) =>{
    e.preventDefault()
    if (text.length === 0) return

    dispatch(addComment(videoId, text))

    setText('')
  }

  return (
    <div className='comments'>
      <p>{numeral(totalComments).format('0.a')} Comments</p>
      <div className='comments_box' style={{ display: 'flex', width: '100%', margin: '20px'}}>
        <img src={photoURL} alt='' style={{ borderRadius: '50%', marginRight: '5px', width: '45px', objectFit: 'contain'}}/>
        <form onSubmit={handleComment} style={{ display: 'flex', flexGrow: '1'}}>
          <input type='text' style={{ flexGrow: '1' }} placeholder="Write a Comment" value={text} onChange={e=> setText(e.target.value)}/>
          <button style={{ border: '0', padding: '5px'}}>Comment</button>
        </form>
      </div>
      <div className='comment_list'>
        {
          TopComments?.map((comment, i) => <Comment comment={comment} key={i}/>)
        }
      </div>
    </div>
  )
}

export default Comments