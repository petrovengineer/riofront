import React, {useState, useEffect, useContext} from 'react';
import Food from './Food';
import {fetch} from '../usefull'

const List = ({type})=>{
    const [food, setFood] = useState([]);
    const [ings, setIngs] = useState([]);
    useEffect(()=>{
        // fetch('/ingredient', {}, setIngs);
        // fetch('/food', {foodTypes:type._id}, setFood);
    }, [type._id])
    return(
        <div className="container-xl">
            <a className="anchor" id={type._id} href="#"></a>
            <h4 className="list-title mt-2 mb-2 pt-2 pb-2 pl-2 pr-2">{type.name}</h4>
            <div className="row no-gutters">
                {/* {food.map((f)=>(
                    <Food food={f} key={f._id} ings={ings}/>
                ))} */}
            </div>
        </div>
    )
}

export default List;