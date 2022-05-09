import React, { useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import HomeMainbar from './components/HomeMainbar/HomeMainbar';
import { Redirect, Route, Switch, useHistory} from 'react-router-dom';
import Login from './pages/Login';
import { useSelector } from 'react-redux';
import WatchVideos from './pages/WatchVideos/WatchVideos';
import Search from './pages/Search';
import Subscriptions from './pages/Subscriptions/Subscriptions';
import Channel from './pages/Channel/Channel';

const Layout = ({ children }) => {
  return (
    <>
       <div className="app">
      {/* <h1>Hello and welcome to my Tutorial</h1> */}

      {/* Navbar */}
      <Navbar/>
      <div className='app_page'>
        {/* Sidebar */}
        <Sidebar/>
      {/* Video */}
        {children}
      </div>
    </div>
    </>
  )
}


const App = () => {

  const {accessToken, loading} = useSelector(state => state.auth)

  const history = useHistory()

  useEffect(() => {
    if(!loading && !accessToken){
      history.push('/auth')
    }
  }, [accessToken, loading, history])

  return (
      <Switch>
        <Route path='/' exact>
          <Layout>
            <HomeMainbar/>
          </Layout>
        </Route>

        <Route path='/auth'>
            <Login/>
        </Route>

        <Route path='/search/:query'>
          <Layout>
            <Search/>
          </Layout>
        </Route>

        <Route path='/watch/:id'>
          <Layout>
            <WatchVideos/>
          </Layout>
        </Route>

        <Route path='/feed/subscriptions'>
          <Layout>
            <Subscriptions/>
          </Layout>
        </Route>

        <Route path='/channel/:channelId'>
          <Layout>
            <Channel/>
          </Layout>
        </Route>

        <Route>
          <Redirect to='/'/>
        </Route>
      </Switch>
  )
}

export default App;
