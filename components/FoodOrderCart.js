import React, {useContext} from 'react'
import {AppContext} from '../context';
import Close from '../imgs/svg/close.svg';
import noimage from '../imgs/noimage.png';

const FoodOrderCart = ({item, i})=>{
    const {cart} = useContext(AppContext);
    return (
        <div key={item._id} className="col-12 p-3 d-flex align-items-center justify-content-between flex-column flex-md-row"         >
            <div className="d-flex flex-row justify-content-center justify-content-md-start" style={{alignItems:'center'}}>
                <img className="p-2" src={item.food.img.data==null?noimage:`data:image/jpeg;base64,${item.food.img.data}`}/>
            </div>
            <div className="d-flex flex-column flex-md-row flex-grow-1 justify-content-center justify-content-md-between">
                <span className="foc-name p-2 d-flex justify-content-center">{item.food.name}</span>
                <div className="d-flex flex-column align-items-center align-items-md-start">
                    {item.food.composition?<div>Состав: {item.food.composition}</div>:null}
                    {item.ings&& item.ings.length>0?<div>Добавки: {item.ings.map(i=>(
                        <span className="pr-1">{i.name}</span>
                    ))}</div>:null}
                    <div>
                        {item.selected.map(i=>(
                            <span>{i.pname+' '+i.name+' '}</span>
                        ))}
                    </div>
                </div>
                <div className="d-flex">
                    <span className="p-2">
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
                            {item.count} шт
                        <div className="plus-minus ml-1 mr-1"
                            onClick={()=>{
                                const updated = [...cart.get];
                                updated[i].count = cart.get[i].count+1;
                                cart.set([...updated]);
                            }}
                        >+</div>
                    </span>
                    <span className="p-2">{item.coast*item.count} руб</span>
                    <span style={{cursor:"pointer"}} className="p-2"
                    onClick={
                        ()=>{
                            const cartIds = cart.get.map((item)=>(item._id));
                            const index = cartIds.indexOf(item.food._id);
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
        </div>
    )
}

export default FoodOrderCart