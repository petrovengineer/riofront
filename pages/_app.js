import '../styles/main.scss'
import {AppContext} from '../context';
import { useState, useEffect } from 'react';
if (typeof window !== "undefined") {
  const $ = require("jquery");
  require("popper.js");
  require("bootstrap");
  window.$ = $; 
}

function MyApp({ Component, pageProps }) {
  const [state, setStateSimple] = useState({
    customer: null
  });



  const persist = (name)=>{
    return {
      get: state[name],
      set:(value)=>{
        console.log("SET", state);
        if(JSON.stringify(value)!==localStorage.getItem(name)){
          console.log("LOCAL", value)
          localStorage.setItem(name, JSON.stringify(value))
        };
        const newState = Object.assign({}, state);
        console.log("NEW State", newState);
        newState[name].get = value;
        setStateSimple(newState);
      },
      clear:()=>{
        localStorage.removeItem(name);
        const persistState = Object.assign({}, customer);
        persistState.get = null;
        set(persistState);
      }
  }}
  
  const restore = (name)=>{
      console.log("RESTORE", state);
      const local = localStorage.getItem(name);      
      if((state[name].get==null || state[name].get.length==0) && local!=null){
        console.log("RESTORE2 local", local);
        state[name].set(JSON.parse(local));
      }
  }
  useEffect(()=>{
    console.log("USEEFFECT")
    state.customer = persist('customer');
    restore('customer');
  }, [])
  useEffect(()=>{
    console.log("CHANGE", state);
  }, [state])

  return <AppContext.Provider value={state}>
          <Component {...pageProps} />
        </AppContext.Provider>
}

export default MyApp
