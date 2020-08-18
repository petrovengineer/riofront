import React, {useEffect, useContext, useState} from 'react'
import Bag from './Bag';
import Login from './Login';
import Phone from '../imgs/svg/phone.svg';
import Clock from '../imgs/svg/clock.svg';
import Menu from '../imgs/svg/menu.svg';
import Link from 'next/link';
import {AppContext} from '../context';

const Header = ({foodtypes, drawer, setDrawer})=>{
    const {cart} = useContext(AppContext);
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
                            <img src='/imgs/logo.png' alt="" className="img-logo d-none d-md-inline"/>
                            <img src='/imgs/logosm.png' alt="" className="img-logo d-inline d-md-none"/>
                        </a>
                    </Link>
                    <div className="d-none d-sm-flex flex-column flex-lg-row ml-3">
                        <div className="top-header-item mb-1 d-flex">
                            <Phone className="top-header-icon mr-2" width="20" height="20"/>
                            <span>+7(901)701-55-01</span>
                        </div>
                        <div className="top-header-item">
                            <Clock className="top-header-icon mr-2 ml-lg-2" width="20" height="20"/>
                            <span>пн-вс с 9:00-22:00</span>
                        </div>
                    </div>
                    {/* <h4 className="pl-4 d-none d-sm-inline mb-0">г. Чехов</h4> */}
                </div>
                <div style={{display:'flex', alignItems:'center'}}>
                    <div className="inline-menu align-items-center d-none d-lg-flex">
                        {foodtypes.map((ft)=>(
                            <a href={`#${ft._id}`} key={ft._id}>{ft.name}</a>
                        ))}
                    </div>
                    <Login/>
                    {cart.get!=null?<Bag/>:null}
                    <Menu width="30" height="30" className="top-header-icon ml-3 d-inline d-lg-none"
                        onClick={()=>setDrawer(!drawer)}
                    />
                </div>
            </div>
        </header>

    )
}


export default Header;