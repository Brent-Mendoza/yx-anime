import React, { useState } from 'react'
import { FaStar } from "react-icons/fa";
import { FaHashtag } from "react-icons/fa6";
const Animedesc = ({description, setDescription}) => {
  return (
    <div className='anime-modal'>
      <div className="modal">
        <span className="close" onClick={()=>setDescription(null)}>&times;</span>
        <div className="modal-content">
          <div className="img-box">
            <img src={description.images.webp.image_url}/>
            <h2 className="rating">{description.rating.slice(0,1)} |</h2>
          </div>
          <div className="anime-desc">
            <div className="air" style={{ 
              color:
                    description.status === 'Finished Airing' ? 'green' :
                    description.status === 'Currently Airing' ? 'rgba(214, 96, 0)' :
                    description.status === 'Not yet aired' ? 'gray' : 'white'}}>
                      <h4>{description.status}</h4></div>
            <div className="season">
              {description.season && <><h3>{description.season.slice(0,1).toUpperCase()+description.season.slice(1)} {description.year}</h3><span className="circle">&bull;</span></>}
              <h3>{description.episodes} episodes</h3>
            </div>
            <div className="title">
              <h1>{description.title}</h1>
              <div className="studio-type">
                <h3 className='typestudio'>{description.type}</h3>
                {description.studios.map((studio) => (
                  <h3 key={studio.mal_id}>{studio.name}</h3>
                ))}
              </div>
            </div>
            <div className="rank">
              <div className="rank-score">
                <h2><FaStar/>{description.score}</h2>
                <h2><FaHashtag />{description.rank}</h2>
              </div>
              <div className="rank-users">
                <h4>{description.scored_by} voters</h4>
                <h4>Ranking</h4>
              </div>
            </div>
            <div className="synopsis">
              <h6>{description.synopsis}</h6>
            </div>
            <div className="tags">
              {description.genres.map((genre) => (
                <div key={genre.mal_id} className="multiple-tags">{genre.name}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Animedesc
