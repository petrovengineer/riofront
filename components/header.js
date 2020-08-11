import React, {useEffect} from 'react'
// import Bag from './Bag';
import Link from 'next/link';

export default ({foodtypes})=>{
    useEffect(()=>{
        console.log("FOODTYPES",foodtypes);
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
                        <img src='/imgs/logo.png' alt="" className="img-logo"/>
                    </Link>
                    <h4 className="pl-4 d-none d-sm-inline mb-0">г. Чехов</h4>
                </div>
                <div style={{display:'flex', alignItems:'center'}}>
                    <div className="inline-menu align-items-center d-none d-md-flex">
                        {foodtypes.map((ft)=>(
                            <a href={`#${ft._id}`} key={ft._id}>{ft.name}</a>
                        ))}
                    </div>
                    {/* <Bag/> */}
                </div>
            </div>
        </header>

    )
}