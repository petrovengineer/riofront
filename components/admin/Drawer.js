import React from 'react';
import '../css/drawer.scss'
import {useEffect, useState} from 'react'
import {
    useLocation,
    Link
  } from "react-router-dom";

export default ({children})=>{
    let [height, setHeight] = useState(0)
    let [drawer, toggleDrawer] = useState(true)
    let location = useLocation();
    useEffect(()=>{
        setHeight(window.innerHeight);
    },[])
    return (
        <>
            <input type="checkbox" id="menu-toggle" 
            className="is-hidden" 
            checked={drawer}
            style={{display:'none'}}
            onChange={()=>{toggleDrawer(!drawer)}}
            ></input>
            <div className={'drawer'} style={{height}}>
                <label htmlFor="menu-toggle" className="nav-toggle">
                    <span></span>
                    <span></span>
                    <span></span>
                </label>
                {/* <div className="dItem"><Link className={location.pathname==='/admin'?'active':''} to='/admin'>Статистика</Link></div>           */}
                {/* <div className="dItem"><Link className={location.pathname==='/admin'?'active':''} to='/admin'>Заказы</Link></div>           */}
                <div className="dItem"><Link className={location.pathname==='/admin/food'?'active':''} to='/admin/food'>Продукты</Link></div>          
                <div className="dItem"><Link className={location.pathname==='/admin/ingredients'?'active':''} to='/admin/ingredients'>Ингредиенты</Link></div>          
                <div className="dItem"><Link className={location.pathname==='/admin/ingtypes'?'active':''} to='/admin/ingtypes'>Типы ингредиентов</Link></div>          
                <div className="dItem"><Link className={location.pathname==='/admin/foodtypes'?'active':''} to='/admin/foodtypes'>Типы продуктов</Link></div>          
                {/* <div className="dItem"><Link className={location.pathname==='/admin/users'?'active':''} to='/admin/users'>Пользователи</Link></div>           */}
                {/* <div className="dItem"><Link className={location.pathname==='/admin/customers'?'active':''} to='/admin/customers'>Покупатели</Link></div>           */}
                {children}
            </div>
        </>
   )
}