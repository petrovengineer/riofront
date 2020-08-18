import React, { useContext, useEffect } from 'react';
import Bag from '../imgs/svg/bag2.svg';
import {AppContext} from '../context';
import noimage from '../imgs/noimage.png';
import Close from '../imgs/svg/close.svg';
import Link from "next/link";

export default ()=>{
    const {cart} = useContext(AppContext);
    useEffect(()=>{
        if(window!=null){window.$(document).on('click', '.dropdown-menu', function (e) {
            e.stopPropagation();
          });}
    }, [])
    useEffect(()=>{
        console.log("CART", cart)
    }, [cart])
    return (
        <div className="btn-group animate__animated animate__backInRight"  style={{zIndex:'900'}}>
            <div className="bag btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <Bag className="bag-icon" width="30" height="30"/>
                <div className="bag-count">
                    {cart.get.length>0?cart.get.map((g)=>g.count).reduce((a, v)=>a+v):0}
                </div>
                <div className="txt">Корзина<br/><span>
                    {cart.get.length>0?cart.get.map((g)=>g.food.coast*g.count).reduce((a, v)=>a+v):0} руб
                </span></div>
            </div>
            <div className="dropdown-menu dropdown-menu-right p-3" style={{minWidth:'300px'}}>
                {
                    cart.get.map((good, i)=>{
                    return (
                        <div key={good.food._id}>
                        <div  className="cart-item pb-2">
                            {/* <img alt="" src={good.food.img==null?noimage:`data:image/jpeg;base64,${arrayBufferToBase64(good.food.img.data.data)}`} width="50"/> */}
                            <div className="pl-2 pr-2" style={{width:'170px'}}>
                                <div>{good.food.name}</div>
                                <span>
                                    <div className="plus-minus mr-1"
                                        onClick={()=>{
                                            const updated = [...cart.get];
                                            if(cart.get[i].count==1){
                                                updated.splice(i, 1);
                                            }else{
                                                updated[i] = {food: good.food, count: cart.get[i].count-1}
                                            }
                                            cart.set([...updated]);
                                        }}
                                    >-</div> 
                                        {good.count} шт
                                    <div className="plus-minus ml-1 mr-1"
                                        onClick={()=>{
                                            const updated = [...cart.get];
                                            updated[i] = {food: good.food, count: cart.get[i].count+1}
                                            cart.set([...updated]);
                                        }}
                                    >+</div> 
                                </span>
                                <span className="pl-2">{good.food.coast*good.count} руб</span>
                            </div>
                            <span style={{cursor:"pointer"}}
                            onClick={
                                ()=>{
                                    const cartIds = cart.get.map((item)=>(item._id));
                                    const index = cartIds.indexOf(good.food._id);
                                    const newCart = [...cart.get];
                                    newCart.splice(index, 1);
                                    cart.set(newCart);
                                }
                            }
                            >
                                <Close height="10" width="10" className="svg-img-del"/>
                            </span>
                        </div>
                        </div>
                    )
                    })
                }
                {cart.get.length==0?<h6>В корзине пока пусто</h6>:null}
                <div className="dropdown-divider"></div>
                <span className="pb-2">
                    Сумма: {cart.get.length>0?cart.get.map((g)=>g.food.coast*g.count).reduce((a, v)=>a+v):0} руб
                </span>
                <Link href='/order'>
                {cart.get.length==0?'':<span className="btn cart-btn p-2">
                                        Оформить
                                    </span>}
                </Link>
            </div>
        </div>
    )
}