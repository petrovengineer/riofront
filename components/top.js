import React from 'react';
import Phone from '../imgs/phone.svg';
import Clock from '../imgs/clock.svg';
import Search from '../imgs/search.svg';
import Heart from '../imgs/heart.svg';
import Login from './login';

export default ({activate})=>{
    return (
        <div className="container-xl">
            <div className="top-header d-flex justify-content-between">
                <div className="d-flex flex-row">
                    <div className="top-header-item" style={{paddingRight:'30px'}}>
                        <Phone className="top-header-icon" width="20" height="20"/>
                        <span>+7(901)701-55-01</span>
                    </div>
                    <div className="top-header-item" style={{paddingLeft:'30px', borderLeft:'1px solid #E6E6E6'}}>
                        <Clock className="top-header-icon" width="20" height="20"/>
                        <span>пн-вс с 9:00-22:00</span>
                    </div>
                </div>
                <div className="d-flex flex-row">
                    <div className="top-header-item" style={{paddingRight:'30px'}}>
                        <Search className="top-header-icon" width="20" height="20"/>
                        <span>Поиск</span>
                    </div>
                    <div className="top-header-item" style={{padding:'0 30px', borderLeft:'1px solid #E6E6E6'}}>
                        <Heart className="top-header-icon" width="20" height="20"/>
                        <span>Избранное</span>
                    </div>
                    <Login activate={activate}/>
                </div>
            </div>
        </div>
    )
}