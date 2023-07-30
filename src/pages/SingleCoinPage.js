import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useParams } from 'react-router-dom'
import './SingleCoin.css'
import { SingleCoin } from '../Info/api';
import Coingraph from '../components/Graph/Coingraph';
import { GiTwoCoins } from "react-icons/gi";
// import { commaValues } from '../components/Coins/Coin';
// import { marketCap, price } from '../components/Coins/Coin';
const SingleCoinPage = () => {
    //identify id from page URL : 
    const {id} = useParams();
    //console.log(id);

    const [coin, setCoin] = useState();


    const fetchCoin = async () => {
        const { data } = await axios.get(SingleCoin(id));

        setCoin(data);
    };

    useEffect(() => {
        fetchCoin();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    
    return (
        <div className='singlecoin-details'>
            <div className='home-button'>
                <Link to={'/'}><GiTwoCoins className='home-logo'/></Link>
            </div>
            <div className='singlecoin'>
                <img src={coin?.image.large} alt="coin" className='singlecoin-img'/>
                <h1 className='singlecoin-name'>{coin?.name}</h1>
                <p className='singlecoin-desc'>{coin?.description.en.split(".")[0]}</p>
                <div className='market-data'>
                    <span style={{display:"flex", alignItems:"center"}}>
                        <h5 className='singlecoin-statsName'>Rank: </h5>
                        <h1 className='singlescoin-stats' style={{fontWeight:"lighter", marginTop:"10"}}>{coin?.market_cap_rank}</h1>
                    </span>
                    {/* <span style={{display:"flex"}}>
                        <h5>Price: </h5>
                        <p>{coin?.market_data.}</p>
                    </span>
                    <span style={{display:"flex"}}>
                        <h5>Market Cap: </h5>
                        <p></p>
                    </span> */}
                </div>
            </div>
            <Coingraph coinid={id}/>
        </div>
    )
}

export default SingleCoinPage