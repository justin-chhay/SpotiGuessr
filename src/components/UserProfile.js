const UserProfile = ({props}) => {

   let username = props.display_name
   let profile_pic = ""
   let uri = props.uri
   
   if (props.images != null) {
     profile_pic = props.images[1].url
   }

    return (
        <div>
          <h2 className="mb-3">Logged in as <a className='text-white' href={uri}>
            {username}
            </a>
          </h2>
          <img className='rounded-full border-4 border-green-500' src={profile_pic} alt="userimage"></img>
        </div>
    )
  }
  
  export default UserProfile;