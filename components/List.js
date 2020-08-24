import React, {useState, useEffect, useRef, createRef} from 'react';
import Food from './Food';
import {fetch} from '../usefull'

const List = ({type, ingredients, refs, param, showParam, handleParam})=>{
    const [max, setMax] = useState(800);
    return(
        <div className="container-xl">
            <a className="anchor" id={type._id} href="#"></a>
            <h4 className="list-title mt-2 mb-2 pt-2 pb-2 pl-2 pr-2">{type.name}</h4>
            <div className="row no-gutters">
                {type.food.map((f)=>(
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3 p-2" 
                        ref={(e)=>{if(e!=null)refs.current[f._id]=e}} 
                        style={{transition: 'max-height 1s ease-in', maxHeight:max}}
                        id={f._id}
                    >
                        <Food ingredients={ingredients} handleParam={handleParam}
                            food={f} key={f._id} param={param==f._id?true:false} showParam={showParam}/>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default List;