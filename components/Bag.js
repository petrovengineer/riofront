import React, { useContext, useEffect } from 'react';
import BagIcon from '../imgs/svg/bag2.svg';
import {AppContext} from '../context';
import noimage from '../imgs/noimage.png';
import Close from '../imgs/svg/close.svg';
import Link from "next/link";

const Bag = ()=>{
    const {cart =[]} = useContext(AppContext);
    useEffect(()=>{
        if(window!=null){window.$(document).on('click', '.dropdown-menu', function (e) {
            e.stopPropagation();
          });}
    }, [])
    useEffect(()=>{
    }, [cart])
    return (
        <div className="btn-group"  style={{zIndex:'900'}}>
            <div className="bag btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <BagIcon className="bag-icon" width="30" height="30"/>
                <div className="bag-count">
                    {cart.get.length>0?cart.get.map((g)=>g.count).reduce((a, v)=>a+v):0}
                </div>
                <div className="txt d-none d-md-inline">Корзина<br/><span>
                    {cart.get.length>0?cart.get.map((g)=>g.food.coast*g.count).reduce((a, v)=>a+v):0} руб
                </span></div>
            </div>
            <div className="dropdown-menu dropdown-menu-right p-3" style={{minWidth:'300px'}}>
                {
                    cart.get.map((good, i)=>{
                    return (
                        <div key={good.food._id+i} className="pb-2">
                            <div  className="cart-item">
                                <img alt="" 
                                    src={good.food.img==null?noimage:`data:image/jpeg;base64,${good.food.img.data}`} 
                                    width="50" height="50"/>
                                <div className="pl-2 pr-2" style={{width:'200px'}}>
                                    <div>{good.food.name}</div>
                                    <span>
                                        <div className="plus-minus mr-1"
                                            onClick={()=>{
                                                const updated = [...cart.get];
                                                if(cart.get[i].count==1){
                                                    updated.splice(i, 1);
                                                }else{
                                                    updated[i].count = cart.get[i].count-1;
                                                }
                                                cart.set([...updated]);
                                            }}
                                        >-</div> 
                                            {good.count} шт
                                        <div className="plus-minus ml-1 mr-1"
                                            onClick={()=>{
                                                const updated = [...cart.get];
                                                updated[i].count = cart.get[i].count+1;
                                                cart.set([...updated]);
                                            }}
                                        >+</div> 
                                    </span>
                                    <span className="pl-2">{good.food.coast*good.count} руб</span>
                                </div>
                                <span style={{cursor:"pointer"}}
                                onClick={
                                    ()=>{
                                        const updated = [...cart.get];
                                        cart.set(updated.filter((f,i2)=>(i2!=i)));
                                    }
                                }
                                >
                                    <Close height="10" width="10" className="svg-img-del"/>
                                </span>
                            </div>
                            <div style={styles.detail}>
                                    {good.ings.map(i=>(
                                        <span>{i.name+' '}</span>
                                    ))}
                                    {good.selected.map(i=>(
                                        <span>{i.pname+' '+i.name+' '}</span>
                                    ))}
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

const styles = {
    detail:{
        fontSize:'12px',
        marginLeft: '58px',
        color: 'DarkGray',
        textTransform: 'lowercase'
    }
}

export default Bag;