import React, { useEffect, useState } from 'react'
import './Linechart.css'
import Chart from 'react-google-charts'
const LineChart = ({historicaldata}) => {
    const [data,setdata] = useState([["Date","prices"]])
    useEffect(()=>{
        let datacopy = [["Date","prices"]];
        if(historicaldata.prices){
            historicaldata.prices.map((item)=>{
                datacopy.push([`${new Date(item[0]).toLocaleDateString().slice(0,-5)}`,item[1]])
            })
            setdata(datacopy)
            console.log(data)
        }
    },[])
  return (
    
   <Chart chartType='LineChart' data={data} height="100%" width="100%" legendToggle/>

  
  )
  
}

export default LineChart
