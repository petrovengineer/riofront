import React from 'react';

const FoodOrder = ({item})=>{
    return (
        <div key={item._id} className="col-12 p-3 d-flex align-items-center justify-content-between flex-column flex-md-row"         >
            <div className="d-flex flex-row justify-content-center justify-content-md-start" style={{alignItems:'center'}}>
                <img className="p-2" src={item.food.img==null?noimage:`data:image/jpeg;base64,${item.food.img.data}`}/>
            </div>
            <div className="d-flex flex-column flex-md-row flex-grow-1 justify-content-between">
                <span className="p-2 foc-name">{item.food.name}</span>
                <div className="d-flex justify-content-center">
                    <span className="p-2">{item.count} шт</span>
                    <span className="p-2">{item.food.coast} руб</span>
                </div>
            </div>
        </div>
    )
}

export default FoodOrder;