import React from 'react';
import whatsup from '../imgs/whatsup.png';
import youtube from '../imgs/youtube.png';
import instagram from '../imgs/instagram.png';
import Phone from '../imgs/svg/phone.svg';
import Clock from '../imgs/svg/clock.svg';

const Footer = ()=>{
    return (
        <div className="container-fluid footer-wrap">
            <div className="container-xl footer pt-4 pb-4">
                <div className="left d-none d-sm-flex flex-column align-items-start justify-content-around">
                    <div className="footer-item">
                        <Phone className="footer-icon mr-2" width="20" height="20"/>
                        <span>+7(901)701-55-01</span>
                    </div>
                    <div className="footer-item">
                        <Clock className="footer-icon mr-2" width="20" height="20"/>
                        <span>пн-вс с 9:00-22:00</span>
                    </div>
                    <div className="footer-item">
                        г. Чехов
                    </div>
                </div>
                <div className="right d-flex align-items-center">
                    <h5 className="mb-0 mr-4 d-none d-sm-block">Мы в соцсетях</h5>
                    <img src={instagram} alt=""></img>
                    <img src={whatsup} alt=""></img>
                    <img src={youtube} alt=""></img>
                </div>
            </div>
        </div>
    )
}

export default Footer;