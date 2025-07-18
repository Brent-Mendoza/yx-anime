import React, { useEffect, useState } from 'react'
import { FaSearch } from "react-icons/fa";
import axios from 'axios'

const Animefilters = ({params, setParams, genre, selectedGenre, setSelectedGenre, stats, types, ratings, order, sorts, setstats, settypes, setratings, setorder, setsort}) => {

  const [search , setSearch] = useState('');
  const handleSearch = () => {
    setParams(prev => ({...prev, q:search.toLowerCase(), page:1}))
    setSearch('')
  }

  const handleCateg = (e) => {
    setSelectedGenre(e.target.value)

    if(e.target.value !== ''){
    setParams(prev => ({...prev, genres: e.target.value, page:1}))
    } else {
    const {genres, ...rest} = params;
    setParams(({...rest, page:1}));
    }
  }

  const handleStats = (e) => {
    setstats(e.target.value)
    if(e.target.value !== ''){
    setParams(prev => ({...prev, status: e.target.value, page:1}))
    } else {
    const {status, ...rest} = params;
    setParams(({...rest, page:1}));
    }
  }

  const handleType =(e) => {
    settypes(e.target.value)
    setParams(prev => ({...prev, type: e.target.value, page:1}))
  }

  const handleRate = (e) => {
    setratings(e.target.value)
    setParams(prev => ({...prev, rating: e.target.value, page:1}))
  }

  const handleOrder = (e) => {
    setorder(e.target.value)
    setParams(prev => ({...prev, order_by: e.target.value, sort:sorts, page:1}))
  }

  const handleSort = (e) => {
    setsort(e.target.value)
    setParams(prev => ({...prev, sort: e.target.value, page:1}))
  }

  return (
    <div className='filters'>
      <div className="dropdowns">
        <div className="categ">
          <h6>Genre:</h6>
          <select value={selectedGenre} onChange={handleCateg}>
            <option value="">Genre</option>
            {genre && genre.map(gen => (
              <option key={gen.mal_id} value={gen.mal_id}>{gen.name}</option>
            ))}
          </select>
        </div>
        <div className="status">
          <h6>Status:</h6>
          <select value={stats} onChange={handleStats}>
            <option value="">Status</option>
            <option value="airing">Airing</option>
            <option value="complete">Complete</option>
            <option value="upcoming">Upcoming</option>
          </select>
        </div>
        <div className="type">
          <h6>Type:</h6>
          <select value={types} onChange={handleType}>
            <option value="">Type</option>
            <option value="tv">TV</option>
            <option value="movie">Movie</option>
            <option value="ova">OVA</option>
          </select>
        </div>
        <div className="rating">
          <h6>Rating:</h6>
          <select value={ratings} onChange={handleRate}>
            <option value="">Rating</option>
            <option value="g">G</option>
            <option value="pg">PG</option>
            <option value="r">R</option>
            <option value="rx">RX</option>
          </select>
        </div>
        <div className="order_by">
          <h6>Order:</h6>
          <select value={order} onChange={handleOrder}>
            <option value="">Order By</option>
            <option value="score">Score</option>
            <option value="popularity">Popularity</option>
            <option value="favorites">Favorites</option>
          </select>
        </div>
        {order && <div className="sort">
          <h6>Sort:</h6>
          <select value={sorts} onChange={handleSort}>
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </select>
        </div>}
      </div>
      <div className="search">
        <form onSubmit={e=>{e.preventDefault(); handleSearch();}}>
          <input 
            type="text"
            placeholder='Search...'
            value={search}
            onChange={e=>setSearch(e.target.value)}
          />
         </form>
        <FaSearch />
      </div>
    </div>
  )
}

export default Animefilters
