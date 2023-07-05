import './NotificationsFeedPage.css';
import React from "react";

import DesktopNavigation  from '../components/DesktopNavigation';
import DesktopSidebar     from '../components/DesktopSidebar';
import ActivityFeed from '../components/ActivityFeed';
import ActivityForm from '../components/ActivityForm';
import ReplyForm from '../components/ReplyForm';

// [TODO] Authenication
//import Cookies from 'js-cookie'
import {checkAuth, getAccessToken}  from '../lib/CheckAuth'


export default function NotificationsFeedPage() {
  const [activities, setActivities] = React.useState([]);
  const [popped, setPopped] = React.useState(false);
  const [poppedReply, setPoppedReply] = React.useState(false);
  const [replyActivity, setReplyActivity] = React.useState({});
  const [user, setUser] = React.useState(null);
  const dataFetchedRef = React.useRef(false);

  const loadData = async () => {
    try {
      const backend_url = `${process.env.REACT_APP_BACKEND_URL}/api/activities/notification`
      await getAccessToken()
      const access_token = localStorage.getItem("access_token")      
      const res = await fetch(backend_url, {
        headers: {
          Authorization: `Bearer ${access_token}`
        },          
        method: "GET"
      });
      let resJson = await res.json();
      if (res.status === 200) {
        setActivities(resJson)
      } else {
        console.log(res)
      }
    } catch (err) {
      console.log(err);
    }
  };

  // check if we are authenicated
  // const checkAuth = async () => {
  //   Auth.currentAuthenticatedUser({
  //     // Optional, By default is false. 
  //     // If set to true, this call will send a 
  //     // request to Cognito to get the latest user data
  //     bypassCache: false 
  //   })
  //   .then((user) => {
  //     console.log('user',user);
  //     return Auth.currentAuthenticatedUser()
  //   }).then((cognito_user) => {
  //       setUser({
  //         display_name: cognito_user.attributes.name,
  //         handle: cognito_user.attributes.preferred_username
  //       })
  //   })
  //   .catch((err) => console.log(err));
  // };

  React.useEffect(()=>{
    //prevents double call
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;

    loadData();
    checkAuth(setUser);
  }, [])

  return (
    <article>
    <DesktopNavigation user={user} active={'notifications'} setPopped={setPopped} />
    <div className='content'>
      <ActivityForm  
        popped={popped}
        setPopped={setPopped} 
        setActivities={setActivities} 
      />
      <ReplyForm 
        activity={replyActivity} 
        popped={poppedReply} 
        setPopped={setPoppedReply} 
        setActivities={setActivities} 
        activities={activities} 
      />
      <div className='activity_feed'>
        <div className='activity_feed_heading'>
          <div className='title'>Notifications</div>
        </div>
        <ActivityFeed 
          setReplyActivity={setReplyActivity} 
          setPopped={setPoppedReply} 
          activities={activities} 
        />
      </div>
    </div>
    <DesktopSidebar user={user} />
  </article>
  );
}