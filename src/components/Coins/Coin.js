import React from 'react'
import './coin.css'
import { useNavigate } from 'react-router-dom'

export function commaValues(x){
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Coin = ({id, image, name, symbol, price, marketShare, priceChange, volume}) => {
  console.log(id);
  const navigate = useNavigate();

  return (
    <div className='coin-details'>
        <div className='coin-row'>
            <div className='coin'
             onClick={() => navigate(`/coins/${id}`)}
             >
                <img src={image} alt="coin"/>
                <h1>{name}</h1>
                <p className='coin-symbol'>{symbol}</p>
                
                <div className='coin-data'>
                    <p className='coin-price'>₹{commaValues(price.toFixed(2))}</p>
                    <p className='coin-volume'>₹{volume.toLocaleString()}</p>
                
                    {/* change percentage */}                
                    {priceChange < 0 
                    ? (<p className='coin-percent red'>{priceChange.toFixed(2)}%</p>)
                    : (<p className='coin-percent green'>{priceChange.toFixed(2)}%</p>)
                    }

                    {/* format number into currency locale */}
                    <p className='coin-marketShare'>₹{commaValues(marketShare.toString().slice(0,-6))}M</p>

                </div>
            </div>
        </div>
    </div>
  )
}

export default Coin;