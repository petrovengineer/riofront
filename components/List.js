import React, {useState, useEffect, useRef} from 'react';
import Food from './Food';
import {fetch} from '../usefull'

const List = ({type, ingredients})=>{
    const [param, showParam] = useState(null);
    // const ref = useRef();
    useEffect(()=>{
        if(typeof window!='undefined'){
            window.onclick = function(event) {
                console.log("PARAM", param)
                var e=document.getElementById(param);
                if (param!=null && !e.contains(event.target)) {
                    if(event.target.id){
                        showParam(event.target.id);    
                    }
                    else{
                        showParam(null);
                    }
                }
            }
        }
        // if(param!=null){ref.current = param}
    }, [param])
    return(
        <div className="container-xl">
            <a className="anchor" id={type._id} href="#"></a>
            <h4 className="list-title mt-2 mb-2 pt-2 pb-2 pl-2 pr-2">{type.name}</h4>
            <div className="row no-gutters">
                {type.food.map((f)=>(
                    <Food ingredients={ingredients}
                    food={f} key={f._id} param={param==f._id?true:false} showParam={showParam}/>
                ))}
            </div>
        </div>
    )
}

export default List;