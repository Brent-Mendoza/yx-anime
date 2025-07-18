import React, { useState } from 'react'
import { FaStar } from "react-icons/fa";
import Animedesc from "./Animedesc"

const Animelist = ({animeList}) => {
  const [description, setDescription] = useState()
  return (
    <>
    <div className='anime-list'>
        {animeList && animeList.map(anime => (
          <div className="card-anime" onClick={()=>setDescription(anime)} key={anime.mal_id}>
            <img src={anime.images.webp.image_url} className="anime-img" />

            <h4>{anime.title}</h4>
          <div className="card-footer">
             <h6 style={{
                  color:
                    anime.status === 'Finished Airing' ? 'green' :
                    anime.status === 'Currently Airing' ? 'rgba(214, 96, 0)' :
                    anime.status === 'Not yet aired' ? 'gray' : 'white',
                  background:'rgb(30,30,30)',
                  border: '1px solid',
                  borderRadius:'10px',
                  padding:'0 0.5rem'
                }}>{anime.status}</h6>
             <h6 style={{display:'flex', alignItems:'center'}}><FaStar style={{color:'yellow'}}/>{anime.score}</h6>
          </div>
        </div>
        ))}
    </div>
    {description && <Animedesc description={description} setDescription={setDescription}/>}
    </>
  )
}

export default Animelist
