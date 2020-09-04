import React from 'react';
import noimage from '../imgs/noimage.png';

const FoodOrder = ({item})=>{
    return (
        <div key={item._id} className="col-12 p-3 d-flex align-items-center justify-content-between flex-column flex-md-row"         >
            <div className="d-flex flex-row justify-content-center justify-content-md-start" style={{alignItems:'center'}}>
                {/* <img className="p-2" src={item.food.img.data==null?noimage:`data:image/jpeg;base64,${food.img.data}`}/> */}
            </div>
            <div className="d-flex flex-column flex-md-row flex-grow-1 justify-content-between">
                <span className="p-2 foc-name">{item.food.name}</span>
                <div className="order-info d-flex flex-column align-items-center" style={{maxWidth:'500px'}}>
                    {item.food.composition?
                    <div style={{textAlign:'center'}}><div className="order-info-title">Состав: </div>{item.food.composition}</div>:null}
                    {item.ingredients&& item.ingredients.length>0?
                        <div><div className="order-info-title">Добавки:</div>{item.ingredients.map(i=>(
                        <span className="pr-1">{i.name}</span>
                    ))}</div>:null}
                    <div>
                        {item.selected.map(i=>(
                            <span className="order-info-title">{i.pname+' '+i.name+' '}</span>
                        ))}
                    </div>
                </div>
                <div className="d-flex justify-content-center">
                    <span className="p-2">{item.count} шт</span>
                    <span className="p-2">{item.coast} руб</span>
                </div>
            </div>
        </div>
    )
}

export default FoodOrder;