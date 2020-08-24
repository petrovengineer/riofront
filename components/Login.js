import React, {useState, useRef, useContext, useEffect} from 'react'
import Modal from './Modal';
import User from '../imgs/svg/user4.svg';
import FormLogin from './FormLogin';
import FormReg from './FormReg';
import {AppContext} from '../context';
import Link from 'next/link';
import Title from './Title';


const login = ({activate, toggleModal})=>{
    let loginModalRef = useRef();
    const context = useContext(AppContext);
    const {customer, accessToken, refreshToken} = context;
    useEffect(()=>{
        toggleModal(activate);
    },[activate])
    return(
        <>
            <div className="top-header-item">
                {customer!=null && customer.get!=null && customer.get.name!=null?
                <div className="dropdown">
                    <span className="login" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <User className="top-header-icon mr-1" width="30" height="30"/>
                        <span className="d-none d-md-inline">{customer.get.name}</span>
                    </span>
                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                        <Link href="/orders"><a className="dropdown-item">Заказы</a></Link>
                        <span 
                        onClick={()=>{
                            customer.clear(customer); 
                            // accessToken.clear(); refreshToken.clear()}
                        }}
                        className="dropdown-item" >Выход</span>
                    </div>
                </div>
                    :<span onClick={()=>{toggleModal(true);}}>
                        <User className="top-header-icon mr-1" width="30" height="30"/>Войти</span>
                }
            </div>
        </>

    )
}

export default login;