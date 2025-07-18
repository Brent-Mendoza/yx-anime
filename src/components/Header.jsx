import React from 'react'

const Header = () => {
  return (
    <div className='header'>
      <img src={`${import.meta.env.BASE_URL}logo.png`}/>
      <h1>Anime</h1>
    </div>
  )
}

export default Header
