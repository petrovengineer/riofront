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
  const [customer, setCustomer] = useState(null);
  const persist = (name, item, set)=>{
    return {
      name: name,
      get: item,
      set:(item, newState)=>{
        console.log(customer);
        if(JSON.stringify(newState)!==localStorage.getItem(name)){
          localStorage.setItem(name, JSON.stringify(newState))
        };
        const persistState = Object.assign({}, item);
        console.log("PERSIST SET", item);
        persistState.get = newState;
        set(persistState);
      },
      clear:(item)=>{
        localStorage.removeItem(name);
        const persistState = Object.assign({}, item);
        persistState.get = null;
        set(persistState);
      }
  }}
  
  const restore = (item)=>{
    console.log("RESTORE", item)
      const local = localStorage.getItem(item.name);
      if((item.get==null || item.get.length==0) && local!=null){
        item.set(item, JSON.parse(local));
      }
      return null;
  }
  useEffect(()=>{
    setCustomer(persist('customer', customer, setCustomer));
  }, [])
  useEffect(()=>{
    console.log("EFFECT", customer);
    if(customer!=null){restore(customer)}
  }, [customer])
  return <AppContext.Provider value={{customer}}>
          <Component {...pageProps} />
        </AppContext.Provider>
}

export default MyApp
