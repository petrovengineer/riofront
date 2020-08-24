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
  const persist = (name, value)=>{
    return {
      get: value,
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
      }else{
        state[name].set(state[name].get);
      }
    }
  useEffect(()=>{
    for(var key in state){
      if(state[key]==null || state[key].length==0){state[key] = persist(key, state[key]);}
      restore(key);
    }
  }, [])
  useEffect(()=>{
    if(state.accessToken!=null){
      axios.defaults.baseURL = process.env.API;
      axios.interceptors.request.use(
        config => {
          if (!config.headers.Authorization) {
            const token = JSON.parse(localStorage.getItem("accessToken"));
            if (token) {
              config.headers.Authorization = `Bearer ${token}`;
            }
          }
          return config;
        },
        error => Promise.reject(error)
      );
      // axios.defaults.headers.common['Authorization'] = 'Bearer '+state.accessToken.get;
      axios.defaults.headers.post['Content-Type'] = 'application/json';
    }
  }, [state.accessToken])

  return <AppContext.Provider value={state}>
          <Component {...pageProps} />
        </AppContext.Provider>
}

export default MyApp
