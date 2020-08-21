import React, {useState} from 'react';
import Save from '../../imgs/svg/save.svg';
import Close from '../../imgs/svg/close.svg';

export default ({item, actions, vars, k1, k2, close, filter})=>{
    const [load, setLoad] = useState(false);
    const varsId = vars.map((v)=>(v._id));
    const [glob, setGlob] = useState(item);
    if(filter!=null){vars = vars.filter((v)=>(filter.indexOf(v.type)>-1));}
    return (
        <>
        <div className="list-group" style={{maxWidth:'200px', position:'relative'}}>
            {vars.map((v)=>{
                const active = glob.indexOf(v._id)>-1;
                return (
                    <div style={{cursor:'pointer'}} 
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
                        className={active?
                            "list-group-item list-group-item-action active"
                            :"list-group-item list-group-item-action"}>
                            {v.name}
                    </div>
            )})}
            {item.filter((id)=>varsId.indexOf(id)<0).map((d)=>{
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
            )})}
            <div style={{display:'flex', justifyContent:'flex-end', padding:'10px'}} 
            className="list-group-item list-group-item-action">
                {load?<img src="/load.gif" alt="" style={loadStyle}></img>:
                <span className="svg-save" style={{marginRight:'10px'}}><Save height="30" width="30" 
                onClick={async()=>{
                    try{
                        setLoad(true);
                        await actions({[k1]: glob})
                    }
                    catch(err){
                        close();
                    }
                }}
                style={{}}/></span>}
                <span className="svg-close"><Close height="30" width="30" 
                onClick={close}
                style={{position: 'relative'}}/></span>
            </div>
        </div>
        </>
    )
}

const loadStyle = {
    height: '30px',
}