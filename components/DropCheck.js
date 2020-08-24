import React, {useEffect, useState} from 'react';
import Check from '../imgs/svg/tick.svg';

export default ({item=[], actions, vars, k1, k2, close, filter, ings, setIngs})=>{
    const varsId = vars.map((v)=>(v._id));
    const [glob, setGlob] = useState(item);
    useEffect(()=>{
        setIngs(vars.filter(v=>glob.indexOf(v._id)>-1))
    }, [glob])
    useEffect(()=>{
    }, [])
    if(filter!=null){vars = vars.filter((v)=>(filter.indexOf(v.type._id)>-1));}
    return (
        <>
        <div className="list-group w-100 mb-3" style={{position:'relative'}}>
            {vars.map((v)=>{
                const active = glob.indexOf(v._id)>-1;
                return (
                    <div style={{cursor:'pointer'}} className="border-bottom d-flex justify-content-between align-items-center"
                    key={v._id}
                        onClick={()=>{
                                if(active){
                                    const del = [...glob];
                                    del.splice(glob.indexOf(v._id),1);
                                    setGlob(del);     
                                }
                                else {
                                    setGlob([...glob, v._id])
                                }
                        }}
                        >
                            <div className="d-flex">
                                <div className="check mr-1" style={{minWidth:'16px'}}>
                                    {active?<Check width="16" height="16"/>:''}
                                </div>
                                <span
                                >{v.name}</span>
                            </div>
                            <span style={{color:'#BABCBF'}}>+{v.coast}руб</span>
                    </div>
            )})}
            {/* {item.filter((id)=>varsId.indexOf(id)<0).map((d)=>{
                return (
                    <div
                        onClick={async ()=>{
                            try{
                                const del = [...item];
                                del.splice(item.indexOf(d),1)
                                await actions({[k1]: del})
                            }
                            catch(err){
                            }
                    }}
                        className="list-group-item list-group-item-action" style={{color:'red', cursor:'pointer'}}>
                            Удалено
                    </div>
            )})} */}
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