import './MessageGroupsPage.css';
import React from "react";

import DesktopNavigation  from '../components/DesktopNavigation';
import MessageGroupFeed from '../components/MessageGroupFeed';

// [TODO] Authenication
//import Cookies from 'js-cookie'
import {checkAuth, getAccessToken}  from '../lib/CheckAuth'

export default function MessageGroupsPage() {
  const [messageGroups, setMessageGroups] = React.useState([]);
  const [popped, setPopped] = React.useState([]);
  const [user, setUser] = React.useState(null);
  const dataFetchedRef = React.useRef(false);

  const loadData = async () => {
    try {
      const backend_url = `${process.env.REACT_APP_BACKEND_URL}/api/message_groups`
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
        setMessageGroups(resJson)
      } else {
        console.log(res)
      }
    } catch (err) {
      console.log(err);
    }
  };  

  // const checkAuth = async () => {
  //   console.log('checkAuth')
  //   // [TODO] Authenication
  //   if (Cookies.get('user.logged_in')) {
  //     setUser({
  //       display_name: Cookies.get('user.name'),
  //       handle: Cookies.get('user.username')
  //     })
  //   }
  // };
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
      <DesktopNavigation user={user} active={'messages'} setPopped={setPopped} />
      <section className='message_groups'>
        <MessageGroupFeed message_groups={messageGroups} />
      </section>
      <div className='content'>
      </div>
    </article>
  );
}