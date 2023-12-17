﻿//if logged in

const UserProfile = ({props}) => {




   let username = props.display_name
   let profile_pic = ""
   let uri = props.uri
   
   if (props.images != null) {
     profile_pic = props.images[1].url
   }

    return (
        <section id="profile">
        <h2>Logged in as <span id="displayName">{username}</span></h2>
        <ul>
        <img src={profile_pic} alt="userimage"></img>
            <li>User ID: {username}</li>
            <li><a href={uri}>Spotify URI: {uri}</a></li>
        
        </ul>
        </section>
    )
  }
  
  export default UserProfile