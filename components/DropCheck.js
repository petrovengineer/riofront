import React, {useEffect, useState} from 'react';
import Check from '../imgs/svg/tick.svg';
// import Select from './Select';

export default ({item=[], actions, vars, k1, k2, close, filter, ings, setIngs})=>{
    if(filter!=null){vars = vars.filter((v)=>(filter.indexOf(v.type._id)>-1));}
    return (
        <>
        <div className="list-group w-100" style={{position:'relative'}}>
            {vars.map((v)=>{
                // const active = glob.indexOf(v._id)>-1;
                const active = ings.map(i=>(i._id)).indexOf(v._id)>-1;
                return (
                    <div style={{cursor:'pointer'}} 
                    className="dropdown-item d-flex justify-content-between align-items-center"
                    key={v._id}
                        onClick={()=>{
                                if(active){
                                    const deleted = [...ings];
                                    deleted.splice(ings.map(i=>(i._id)).indexOf(v._id),1);
                                    setIngs(deleted);
                                }
                                else {
                                    const selected = vars.find(f=>(f._id==v._id))
                                    setIngs([...ings, selected])
                                }
                        }}
                        >
                            <div className="d-flex mr-2">
                                {active?
                                    <div className="check mr-2" style={{minWidth:'16px'}}>    
                                        <Check width="16" height="16"/>
                                    </div>
                                :''}
                                <span>{v.name}</span>
                            </div>
                            <span style={{color:'#BABCBF'}}>+{v.coast}руб</span>
                    </div>
            )})}
        </div>
        <style jsx>
        {
            `
            .check{
                fill:green;
            }
            
            `
        }  
        </style>
        </>
    )
}

const loadStyle = {
    height: '30px',
}