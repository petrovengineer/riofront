import '../styles/main.scss'
import {AppContext} from '../context'
import { useState, useEffect } from 'react'
import axios from 'axios'
if (typeof window !== "undefined") {
  const $ = require("jquery");
  require("popper.js");
  require("bootstrap");
  window.$ = $; 
}

function MyApp({ Component, pageProps }) {
  const [state, setStateSimple] = useState({
    customer: null,
    accessToken: null,
    refreshToken: null,
    cart: [],
  });
  const persist = (name)=>{
    return {
      get: state[name],
      set:(value)=>{
        if(JSON.stringify(value)!==localStorage.getItem(name)){
          localStorage.setItem(name, JSON.stringify(value))
        };
        const newState = Object.assign({}, state);
        newState[name].get = value;
        setStateSimple(newState);
      },
      clear:()=>{
        localStorage.removeItem(name);
        const newState = Object.assign({}, state);
        newState[name].get = null;
        setStateSimple(newState);
      }
  }}
  
  const restore = (name)=>{
      const local = localStorage.getItem(name);      
      if((state[name].get==null || state[name].get.length==0) && local!=null){
        state[name].set(JSON.parse(local));
      }
  }
  useEffect(()=>{
    for(var key in state){
      state[key] = persist(key);
      restore(key);
    }
    axios.defaults.baseURL = process.env.API;
    axios.defaults.headers.common['Authorization'] = 'Bearer '+state.accessToken.get;
    axios.defaults.headers.post['Content-Type'] = 'application/json';
  }, [])
  useEffect(()=>{
    console.log("CHANGE", state);
  }, [state])

  return <AppContext.Provider value={state}>
          <Component {...pageProps} />
        </AppContext.Provider>
}

export default MyApp
