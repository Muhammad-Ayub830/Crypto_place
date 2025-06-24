import React, { useContext, useEffect, useState } from 'react'
import './Coin.css'
import { useParams } from 'react-router-dom'
import { coinContext } from '../../Context/CoinContext'
import LineChart from '../../Components/Linechart/LineChart'
const Coin = () => {
  const { currency } = useContext(coinContext)
  const { coinId } = useParams()
  const [coindata, setCoindata] = useState(null)
  const [historicaldata, sethistoricaldata] = useState(null)
  const fetchCoindata = async () => {
    const options = {
      method: 'GET',
      headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-rAc7fYd59wSTvMH6yijsUHaV' }
    };

    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
      .then(res => res.json())
      .then(res => setCoindata(res))
      .catch(err => console.error(err));
  }

  const fetchHistoricalData = async () => {
    const options = {
      method: 'GET',
      headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-rAc7fYd59wSTvMH6yijsUHaV' }
    };

    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`, options)
      .then(res => res.json())
      .then(res => sethistoricaldata(res))
      .catch(err => console.error(err));
  }

  useEffect(() => {
    fetchCoindata()
    fetchHistoricalData()
  }, [currency,coinId])
  if (coindata && historicaldata) {
    return (
      <div className="coin">
        <div className="coin-name">
          <img src={coindata.image.large} />

          <p><b>{coindata.name} ({coindata.symbol.toUpperCase()})</b></p>

        </div>
        <div className="coin-chart">
          <LineChart historicaldata={historicaldata}   currency={currency} key={`${coinId}-${currency.name}`}  />
        </div>
        <div className="coin-info">
          <ul>
            <li>Crypto Market Rank</li>
            <li>{coindata.market_cap_rank}</li>
          </ul>

          <ul>
            <li>Current Price</li>
            <li>{currency.symbol} {coindata.market_data.current_price[currency.name.toLowerCase()].toLocaleString()}{console.log()}</li>
          </ul>

          <ul>
            <li>Market cap</li>
            <li>{currency.symbol} {coindata.market_data.market_cap[currency.name.toLowerCase()].toLocaleString()}{console.log()}</li>
          </ul>

          <ul>
            <li>24 Hour High</li>
            <li>{currency.symbol} {coindata.market_data.high_24h[currency.name.toLowerCase()].toLocaleString()}{console.log()}</li>
          </ul>

          <ul>
            <li>24 Hour Low</li>
            <li>{currency.symbol} {coindata.market_data.low_24h[currency.name.toLowerCase()].toLocaleString()}{console.log()}</li>
          </ul>
        </div>
      </div>
    )
  } else {
    return (
      <div className="spinner">
        <div className="spin">

        </div>
      </div>
    )
  }

}

export default Coin
