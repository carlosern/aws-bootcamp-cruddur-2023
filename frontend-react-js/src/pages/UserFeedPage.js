import './UserFeedPage.css';
import React from "react";
import { useParams } from 'react-router-dom';

import DesktopNavigation  from '../components/DesktopNavigation';
import DesktopSidebar     from '../components/DesktopSidebar';
import ActivityFeed from '../components/ActivityFeed';
import ActivityForm from '../components/ActivityForm';
import EditProfileButton from '../components/EditProfileButton';
import ProfileHeading from '../components/ProfileHeading';

// [TODO] Authenication
//import Cookies from 'js-cookie'
import {checkAuth, getAccessToken}  from '../lib/CheckAuth'

export default function UserFeedPage() {
  const [activities, setActivities] = React.useState([]);
  const [profile, setProfile] = React.useState({a:1});
  const [popped, setPopped] = React.useState([]);
  const [poppedProfile, setPoppedProfile] = React.useState([]);
  const [user, setUser] = React.useState(null);
  const dataFetchedRef = React.useRef(false);

  const params = useParams();
  const title = `@${params.handle}`;

  const loadData = async () => {
    try {
      const backend_url = `${process.env.REACT_APP_BACKEND_URL}/api/activities/${title}`
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
        console.log('resJson BEFORE',resJson)
        console.log('resJson.profile',resJson.profile)
        setProfile(resJson.profile)
        setActivities(resJson.activities)
        console.log('setProfile',profile)
        console.log('setActivities',activities)
        console.log('resJson',resJson)
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
      <DesktopNavigation user={user} active={'profile'} setPopped={setPopped} />
      <div className='content'>
        <ActivityForm popped={popped} setActivities={setActivities} />
        {/* <ProfileForm 
          profile={profile}
          popped={poppedProfile} 
          setPopped={setPoppedProfile} 
        /> */}
          <div className='activity_feed_heading'>
          <div className='title'>{profile.display_name}</div>
          <div className='title'>{profile.cruds_count} Cruds</div>
        </div>
        <div className='activity_feed'>
          <ProfileHeading setPopped={setPoppedProfile} profile={profile} />
          <ActivityFeed activities={activities} />
        </div>
      </div>
      <DesktopSidebar user={user} />
    </article>
  );
}