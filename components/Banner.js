import React from 'react';
import {useEffect} from 'react';
import banner1 from '../imgs/banner1.jpg';
import banner2 from '../imgs/banner2.jpg';

const Banner = ()=>{
    useEffect(()=>{
        if(window!=null){window.$('.carousel').carousel({
            interval: 5000
          })}
    }, [])
    return (
        <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
        <div className="carousel-inner">
            <div className="carousel-item active">
                <img className="d-block w-100" src={banner1} alt="First slide"/>
                <div className="carousel-caption d-none d-md-block">
                    {/* <h3>Пицца "Охотник"</h3>
                    <p>Скидка по средам 30%</p>
                    <div className="btn">ЗАКАЗАТЬ</div> */}
                </div>
            </div>
            <div className="carousel-item">
                <img className="d-block w-100" src={banner2} alt="First slide"/>
                <div className="carousel-caption d-none d-md-block">
                    {/* <h3>Пицца "3 сыра"</h3> */}
                    {/* <p>Скидка по выходным 30%</p> */}
                    {/* <div className="btn">ЗАКАЗАТЬ</div> */}
                </div>
            </div>
        </div>
        <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
        </a>
        </div>
    )
}

export default Banner;