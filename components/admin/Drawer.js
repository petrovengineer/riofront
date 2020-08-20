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
            <div className={styles.drawer} style={{height, left:drawer?'0':-'250'}}>
                <label htmlFor="menu-toggle" className={styles.navtoggle}
                    onClick={()=>toggleDrawer(!drawer)}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </label>
                <Link href='/admin/foodtypes'>
                    <div className="p-3">Типы продуктов</div>
                </Link>
                {/* <div className="dItem"><Link className={location.pathname==='/admin'?'active':''} to='/admin'>Статистика</Link></div>           */}
                {/* <div className="dItem"><Link className={location.pathname==='/admin'?'active':''} to='/admin'>Заказы</Link></div>           */}
                {/* <div className="dItem"><Link className={location.pathname==='/admin/food'?'active':''} to='/admin/food'>Продукты</Link></div>           */}
                {/* <div className="dItem"><Link className={location.pathname==='/admin/ingredients'?'active':''} to='/admin/ingredients'>Ингредиенты</Link></div>           */}
                {/* <div className="dItem"><Link className={location.pathname==='/admin/ingtypes'?'active':''} to='/admin/ingtypes'>Типы ингредиентов</Link></div>           */}
                {/* <div className="dItem"><Link className={location.pathname==='/admin/foodtypes'?'active':''} to='/admin/foodtypes'>Типы продуктов</Link></div>           */}
                {/* <div className="dItem"><Link className={location.pathname==='/admin/users'?'active':''} to='/admin/users'>Пользователи</Link></div>           */}
                {/* <div className="dItem"><Link className={location.pathname==='/admin/customers'?'active':''} to='/admin/customers'>Покупатели</Link></div>           */}
                {children}
            </div>
        </>
   )
}