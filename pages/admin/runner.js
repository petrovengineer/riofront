import React, {useRef, useEffect, useState} from 'react'

const Runner = ()=>{
    const status = useRef();
    const mapLink = useRef();
    const findme = useRef();
    const [pos, setPos] = useState([]);
    let i = 0;

    function geoFindMe() {
        mapLink.current.href = '';
        mapLink.current.textContent = '';      
        function success(position) {
          const latitude  = position.coords.latitude;
          const longitude = position.coords.longitude;
          document.write(i);
          i++;
          status.current.textContent = '';
          mapLink.current.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
          mapLink.current.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
        }
      
        function error(err) {
          console.log(err);
          status.current.textContent = 'Unable to retrieve your location';
        }
      
        if(!navigator.geolocation) {
          status.current.textContent = 'Geolocation is not supported by your browser';
        } else {
          status.current.textContent = 'Locating…';
          navigator.geolocation.getCurrentPosition(success, error);
        }
      
      }
    
    useEffect(()=>{
      
    }, [])

    return (
        <>
            <button id = "find-me" ref={findme} onClick={()=>setInterval(()=>{geoFindMe()},4000)}>Show my location</button><br/>
            <p id = "status" ref={status}></p>
            <a id = "map-link" target="_blank" ref={mapLink}></a>
            {pos.map((p)=>(
              <>
                <div>Широта {p.latitude}, Долгота {p.longitude}</div><br/>
              </>
            ))}
        </>
    )
}

export default Runner;