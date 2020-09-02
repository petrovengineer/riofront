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
                <div className="d-flex flex-column align-items-center">
                    {item.food.composition?<div>Состав: {item.food.composition}</div>:null}
                    {item.ingredients&& item.ingredients.length>0?<div>Добавки: {item.ingredients.map(i=>(
                        <span className="pr-1">{i.name}</span>
                    ))}</div>:null}
                    <div>
                        {item.selected.map(i=>(
                            <span>{i.pname+' '+i.name+' '}</span>
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