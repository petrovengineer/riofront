import React from 'react';
import styles from '../../styles/admin/Drawer.module.scss';
import {useEffect, useState} from 'react'
import Link from 'next/link';
// import {
//     useLocation,
//     Link
//   } from "react-router-dom";

export default ({children, drawer, toggleDrawer})=>{
    let [height, setHeight] = useState(0)
    useEffect(()=>{
        setHeight(window.innerHeight);
    },[])
    return (
        <>
            <div className={styles.drawer + ' d-flex flex-column'} style={{height, left:drawer?'0':-'250'}}>
                <label htmlFor="menu-toggle" className={styles.navtoggle}
                    onClick={()=>toggleDrawer(!drawer)}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </label>
                <Link href='/admin/food'>
                    <a className="p-3">Продукты</a>
                </Link>
                <Link href='/admin/foodtypes'>
                    <a className="p-3">Типы продуктов</a>
                </Link>
                <Link href='/admin/ingredients'>
                    <a className="p-3">Ингредиенты</a>
                </Link>
                <Link href='/admin/ingtypes'>
                    <a className="p-3">Типы ингредиентов</a>
                </Link>
                <Link href='/admin/params'>
                    <a className="p-3">Параметры</a>
                </Link>
                {children}
            </div>
        </>
   )
}