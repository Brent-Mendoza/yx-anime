import { useEffect, useRef, useState } from 'react'
import Header from './components/Header'
import axios from 'axios'
import Animelist from './components/Animelist'
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import Animefilters from './components/Animefilters';


function App() {
  const [animeList, setAnimeList] = useState()
  const [jumpTo, setJumpTo] = useState()
  const [genre, setGenre] = useState()
  const [selectedGenre, setSelectedGenre] = useState('');
  const [stats, setStats] = useState('')
  const [types, setTypes] = useState('');
  const [ratings, setRatings] = useState('');
  const [order, setOrder] = useState('')
  const [sort, setSort] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [params, setParams] = useState({
    q: '',
    type: '',
    order_by: '',
    sort: '',
    page: 1
  });
  const lastpage = useRef();
  
  useEffect(()=> {
    setIsLoading(true)
    const queryString = new URLSearchParams(params).toString();
    const fullURL = `https://api.jikan.moe/v4/anime?${queryString}`;
    const fetchData = async () => {
      try{
        setAnimeList(undefined)
        const res = await axios.get(fullURL)
        const data = await res.data.data
        lastpage.current = await res.data.pagination.last_visible_page
        setAnimeList(data)
      } catch(err){
        console.log(err.message);
      }finally{
        setIsLoading(false)
      }
    }

    fetchData();
  },[params])

  useEffect(()=> {
    const fetchGenre = async () => {
      try{
        const res = await axios.get('https://api.jikan.moe/v4/genres/anime')
        const data = await res.data.data
        setGenre(data)
      }catch(err){
        console.log(err.message);
      }
    }

    fetchGenre()
  }, [])

  const nextPage = () => {
    setParams(prev => ({ ...prev, page: prev.page + 1 }));
  };

  const prevPage = () => {
    setParams(prev => ({ ...prev, page: prev.page - 1 }));
  };

  const jumpPage = () => {
    const target = parseInt(jumpTo);
    if (!isNaN(target) && target >= 1 && target <= lastpage.current) {
      setParams(prev => ({ ...prev, page: target }));
    }

    setJumpTo();
  };


  return (
    <div className="container">
      <Header/>
      {isLoading && 
        <div className="content">
          <div className="loading">
            <img src="/loading4.gif" alt="" />
            <h1>LOADING...</h1>
          </div>
        </div>
      }
      {!isLoading && 
      <div className="content">
        <Animefilters 
        params={params} 
        setParams={setParams} 
        genre={genre} 
        selectedGenre={selectedGenre} 
        setSelectedGenre={setSelectedGenre}
        stats={stats}
        types={types}
        ratings={ratings}
        order={order}
        sorts={sort}
        setsort={setSort}
        setorder={setOrder}
        setstats={setStats}
        settypes={setTypes}
        setratings={setRatings}
        />
        <Animelist animeList={animeList}/>
        <div className="pagination">
          <button onClick={prevPage} disabled={params.page == 1}><IoIosArrowBack /></button>
          <form onSubmit={e=>{e.preventDefault(); jumpPage();}}>
            <input type="text" 
            placeholder={`1-${lastpage.current}`} 
            value={jumpTo} min={1} max={lastpage.current}
            onChange={(e) => {
                const val = e.target.value;
                if (/^(?!0)\d*$/.test(val)) {
                  const num = parseInt(val, 10);
                  if (isNaN(num) || num <= lastpage.current) {
                    setJumpTo(val);
                  }
                }
              }}
            />
          </form>
          <button onClick={nextPage}><IoIosArrowForward /></button>
        </div> 
      </div> }
      
    </div>
  )
}

export default App
