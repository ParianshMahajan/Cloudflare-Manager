import React, { useEffect, useState } from 'react'
import config from '../config'
import axios from 'axios'

const Home = () => {

    let url=config.dns_url.replace('<zone-id>',config.zone_id);
    let headers = {
        'Authorization': `Bearer ${config.api_token}`,
        'Content-Type': 'application/json'
    }
    
    let [records,setRecords]=useState([]);    

    useEffect(()=>{
        const fetchData=async()=>{
            const response=await axios.get(url,{headers:headers})
            setRecords(response.data.result);
        }
        fetchData();
    })    

  return (
    <div>
        <h1>DNS Records</h1>
        <div>
            {records.map(el=>{
                return (
                    <div key={el.id} className={styles.rows}>
                        <h2>{el.name}</h2>
                        <p>{el.type}</p>
                        <p>{el.content}</p>
                    </div>
                );
            })}
        </div>   
    </div>
  )
}

export default Home
