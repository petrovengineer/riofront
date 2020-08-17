import React, {useContext, useState}  from 'react';
import noimage from '../imgs/noimage.png';
import {AppContext} from '../context';

const Food = ({food, ings})=>{
    const [info, showInfo] = useState([]);
    const {cart} = useContext(AppContext);
    const addToCart = (id)=>{
        const index = cart.get.map((g)=>g.food._id).indexOf(food._id);
        if(index>-1){
            const updated = [...cart.get];
            updated[index] = {food, count: cart.get[index].count+1}
            cart.set([...updated]);
        }else{
            cart.set([...cart.get, {food, count: 1}]);
        }
        showInfo([...info, id]);
        setTimeout(()=>{
            const el = document.getElementById(id);
            if(el!=null){document.getElementById(id).classList.add("animate__fadeOut")}else {return}
            const newInfo = [...info];
            newInfo.splice(newInfo.indexOf(id), 2);
            setTimeout(()=>showInfo(newInfo), 1000);
        }, 1500);
    }
    return(
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 p-2">
        <div className=" food p-3">
            <img alt=""
            style={{borderRadius:'5px'}} 
            src={food.img==null?noimage:`data:image/jpeg;base64,${food.img.data}`}/>
            <div className="detail">
                <p></p>
                <span className="stars">
                </span>
                <p className="name">{food.name}</p>
                <p className="eng">Состав: 
                    {food.ingredients.map((i)=>' '+i.name)} </p>
                <hr/>
                {info.indexOf(food._id)>=0?<div className="alert alert-success mt-2 animate__animated animate__bounceIn" 
                id={food._id}
                style={{position:'absolute', bottom:'152px', left:'8px', width:'calc(100% - 16px)'}}
                role="alert">
                    Товар добавлен
                </div>:''} 
                <div className="d-flex justify-content-between">
                    <span className="price">{food.coast} руб</span>
                    <span className="btn"
                        onClick={()=>addToCart(food._id)}
                    > Добавить</span>
                </div>              

            </div>
        </div>
        </div>
    )
}

export default Food;