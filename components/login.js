import React, {useState, useRef, useContext, useEffect} from 'react'
import Modal from './Modal';
import User from '../imgs/user.svg';
import FormLogin from './FormLogin';
import FormReg from './FormReg';
import {AppContext} from '../context';
import Link from 'next/link';

function Title(){
    return(
        <div style={{display:'flex', flexDirection:'column'}}>
            <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                    <a className="nav-link active" id="home-tab" data-toggle="tab"
                     href="#home" role="tab" aria-controls="home" aria-selected="true">Вход</a>
                </li>
                <li className="nav-item" role="presentation">
                    <a className="nav-link" id="profile-tab" data-toggle="tab" 
                    href="#profile" role="tab" aria-controls="profile" aria-selected="false">Регистрация</a>
                </li>
            </ul>
        </div>
    )
}
export default ({activate})=>{
    const [modal, toggleModal] = useState(false);
    let loginModalRef = useRef();
    const context = useContext(AppContext);
    const {customer, accessToken, refreshToken} = context;
    useEffect(()=>{
        toggleModal(activate);
    },[activate])
    return(
        <>
            <div className="top-header-item"
                style={{paddingLeft:'30px', borderLeft:'1px solid #E6E6E6'}}>
                {customer!=null && customer.get!=null && customer.get.name!=null?
                <div className="dropdown">
                    <User className="top-header-icon" width="20" height="20"/>
                    <span type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {customer.get.name}
                    </span>
                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                        <Link className="dropdown-item" href="/orders">Заказы</Link>
                        <span 
                        onClick={()=>{
                            customer.clear(customer); 
                            // accessToken.clear(); refreshToken.clear()}
                        }}
                        className="dropdown-item" >Выход</span>
                    </div>
                </div>
                    :<span onClick={()=>{toggleModal(true); console.log(modal)}}><User className="top-header-icon mr-1" width="20" height="20"/>Войти</span>
                }
            </div>
            <Modal title={<Title/>} show={modal} modalRef={loginModalRef} refName="loginModalRef" close={()=>{toggleModal(false)}}>
                    <div className="tab-content" id="myTabContent">
                        <FormLogin activate={activate} close={()=>{toggleModal(false)}}/>
                        <FormReg/>
                    </div>
            </Modal>
        </>

    )
}