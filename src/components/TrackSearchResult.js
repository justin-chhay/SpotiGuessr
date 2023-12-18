import React from 'react'

const TrackSearchResult = ({track, onChooseTrack}) => {

    function chooseTrack() {
        const id = track.id; // Unique id for track
        onChooseTrack(id);
      }
    

    return (
      <div className="d-flex m-2 align-items-center"
      style={{ cursor: "pointer" }}
      onClick={chooseTrack}>
        <img src={track.albumUrl} 
        style={{height:"64px", width:"64px"}} alt="" />
        <div className='ml-5'>
            <div>{track.title}</div>
            <div className="text-grey">{track.artist}</div>
        </div>

      </div>
    )
}
  
  export default TrackSearchResult;