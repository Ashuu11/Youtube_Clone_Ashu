import React, { useEffect } from 'react';
import  logo  from '../assets/logo.png';
import './Login.css'
import GoogleIcon from '@mui/icons-material/Google';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { login } from '../redux/actions/auth.action';



const Login = () => {

  const dispatch = useDispatch()

  const accessToken = useSelector(state => state.auth.accessToken);

  const handleLogin = () => {
    dispatch(login())
    
  }
  
  const history = useHistory()
  
  useEffect(() => {
    if(accessToken){
      history.push('/')
      window.location.reload();
    }
  }, [accessToken, history])


  return (
    <div className='login'>
        <div className='login_container'>
            <img src={logo} alt=''/> 
            <button onClick={handleLogin}> <GoogleIcon style={{ marginRight: '6px'}}/>Login with Google</button>
            <p></p>
        </div>
    </div>
  )
}

export default Login