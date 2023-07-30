import React, { useEffect, useState } from 'react'
// import { BrowserRouter } from 'react-router-dom';
import Coin from '../components/Coins/Coin';
import Pagination from '../components/Pagination/Pagination';
import axios from 'axios';
import './Home.css'
import Loading from '../components/Loading/Loading';
import { AllCoins } from '../Info/api';

const Home = () => {
    const [coins, setCoins] = useState([]);
    //const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
  
    const [currentPage, setCurrentPage] = useState(1);
  
    const [coinsPerPage] =  useState(10);
  
    // const getAllCoins = async () => {
    //   // setLoading(true);
    //   const { data } = await axios.get(AllCoins());
    //   console.log(data);
  
    //   setCoins(data);
    //   // setLoading(false);
    // };
    // useEffect(()=>{
    //   getAllCoins();
    // });

  

    useEffect(() =>{
      axios.get(AllCoins())
      .then(res => {
        setCoins(res.data)
        console.log(res.data);
      })
      .catch(err => console.log(err))
    })


    const handleChange = (event) => {
      setSearch(event.target.value);
    }
  
    const specificCoins = coins.filter(coin => 
      coin.name.toLowerCase().includes(search.toLowerCase())
    )
  
    //Trimming out only coins for current page : 
    const LastCoinIdx = currentPage * coinsPerPage;
    const FirstCoinIdx = LastCoinIdx - coinsPerPage;
    const currentCoins = specificCoins.slice(FirstCoinIdx, LastCoinIdx);
  
    //change pages : 
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    
  return (
    <div className='app'>
        <div className='search'>
            <h1 className='title-text'>
              Search crypto currency
            </h1>

          <form>
            <input type="text" placeholder='Search a coin' className='searchField' onChange={handleChange}/>
          </form>
        </div>
        
        <div className='container'>
          <div className='data-head'>
            <div className='name'>Coin</div>
            <div className='symbol'>Symbol</div>
            <div className='price'>Price</div>
            <div className='volume'>Volume</div>
            <div className='price'>Price Change</div>
            <div className='marketShare'>Market Cap</div>
          </div>
          {
            !currentCoins ? (<Loading/>) : (
            currentCoins.map((coin) =>{
              return(
                //<BrowserRouter>
                <Coin 
                  key={coin?.id} 
                  id={coin?.id}
                  name={coin?.name}
                  image = {coin?.image}
                  symbol = {coin?.symbol}
                  price = {coin?.current_price}
                  marketShare = {coin?.market_cap}
                  priceChange={coin?.price_change_percentage_24h}
                  volume={coin?.total_volume}
                />
                //</BrowserRouter>
              )
            })
            )
          }
        </div>
        <Pagination 
          postsPerPage={coinsPerPage} 
          totalPosts={coins.length} 
          paginate={paginate}
        />
    
      </div>
 
  )
}

export default Home