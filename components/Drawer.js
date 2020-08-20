import React from 'react'
import Close from '../imgs/svg/close.svg'
import Phone from '../imgs/svg/phone.svg';
import Clock from '../imgs/svg/clock.svg';

const Drawer = ({drawer, setDrawer, foodtypes})=>{
    return (
        <>
        <input type="checkbox" id="menu-toggle" 
        className="is-hidden" 
        checked={drawer}
        style={{display:'none'}}
        onChange={()=>{setDrawer(!drawer)}}
        ></input>
        <div className='drawer d-fixed d-lg-none'>
            <Close height="20" width="20" className="nav-toggle m-3"  onClick={()=>{setDrawer(false)}}/>
            <div className="d-flex flex-column justify-content-end" style={{marginTop: '60px'}}>
                {foodtypes.map((ft)=>(
                    <a className="dItem" href={`#${ft._id}`} key={ft._id} onClick={()=>{setDrawer(false)}}>{ft.name}</a>
                ))}
            </div>
            <div className="d-flex flex-column p-3" style={{}}>
                <div className="top-header-item mb-1 d-flex">
                    <Phone className="top-header-icon mr-2" width="20" height="20"/>
                    <span>+7(901)701-55-01</span>
                </div>
                <div className="top-header-item mt-2 d-flex">
                    <Clock className="top-header-icon mr-2 ml-lg-2" width="20" height="20"/>
                    <span>9:00-22:00</span>
                </div>
            </div>
        </div>
    </>
    )
}

export default Drawer;