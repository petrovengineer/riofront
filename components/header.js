import React, {useEffect, useContext, useState} from 'react'
import Bag from './Bag';
import Login from './Login';
import Phone from '../imgs/svg/phone.svg';
import Clock from '../imgs/svg/clock.svg';
import Menu from '../imgs/svg/menu.svg';
import Home from '../imgs/svg/home.svg';
import Link from 'next/link';
import {AppContext} from '../context';
import logo from '../imgs/logo.png';
import logosm from '../imgs/logosm.png';

const Header = ({foodtypes, drawer, setDrawer, menu, home})=>{
    const {cart = []} = useContext(AppContext);
    useEffect(()=>{
        window.onscroll = function() {myFunction()};
        var header = document.getElementById("header");
        var sticky = header.offsetTop;
        var height = header.offsetHeight;
        function myFunction() {
            if (window.pageYOffset > sticky+height) {
                header.classList.add("sticky");
                header.classList.add("animate__animated");
                header.classList.add("animate__slideInDown");
            } else {
                header.classList.remove("sticky");
                header.classList.remove("animate__slideInDown");
            }
        }
    },[]);
    return (
        <header id="header">
            <div className="container-xl d-flex align-items-center header"
            style={{justifyContent:'space-between'}}>
                <div style={{display:'flex', alignItems:'flex-end', alignItems:'center'}}>
                    <Link href='/'>
                        <a>
                            <img src={logo} alt="" className="img-logo d-none d-sm-inline"/>
                            <img src={logosm} alt="" className="img-logo d-inline d-sm-none"/>
                        </a>
                    </Link>
                </div>
                <div className="d-none d-sm-flex flex-column flex-md-row ml-3">
                    <div className="top-header-item d-flex align-items-center justify-content-center">
                        <Phone className="top-header-icon mr-1" width="20" height="20"/>
                        <span>+7(901)701-55-01</span>
                    </div>
                    <div className="top-header-item ml-2 d-flex align-items-center justify-content-center">
                        <Clock className="top-header-icon mr-1" width="20" height="20"/>
                        <span>9:00-22:00</span>
                    </div>
                </div>
                <div style={{display:'flex', alignItems:'center'}}>
                    <div className="inline-menu align-items-center d-none d-lg-flex">
                        {foodtypes.map((ft)=>(
                            <a href={`#${ft._id}`} key={ft._id}>{ft.name}</a>
                        ))}
                    </div>
                    {home?
                        <Link href="/">
                            <Home width="32" height="32" className="top-header-icon menu mr-3 d-inline"/>
                        </Link>                    
                    :null}
                    <Login/>
                    {cart.get!=null?<Bag/>:null}
                    {menu?<Menu width="30" height="30" className="top-header-icon menu ml-3 d-inline d-lg-none"
                        onClick={()=>setDrawer(!drawer)}
                    />:null}
                </div>
            </div>
        </header>

    )
}


export default Header;