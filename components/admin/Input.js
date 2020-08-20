import React, {useState} from 'react';
import {ReactComponent as Save} from '../../imgs/save.svg';
import {ReactComponent as Close} from '../../imgs/close.svg';

export default ({item, mutate, close, param})=>{
    const [load, setLoad] = useState(false);
    return (
        <div className="ing-name-input" style={{display: 'flex', position: 'relative'}}>
            <input className="form-control" id={item._id} defaultValue={item[param]}/>
            {load?<img src="/load.gif" alt="" style={loadStyle}></img>:
            <span className="svg-save"><Save height="30" width="30" 
            onClick={async()=>{
                try{
                    setLoad(true);
                    await mutate(); 
                    // setLoad(false);
                    // close();
                }
                catch(err){
                    close();
                }
            }}
            style={{position: 'absolute', right: '40px', top:'4px'}}/></span>}
            <span className="svg-close"><Close height="30" width="30" 
            onClick={close}
            style={{position: 'absolute', right: '5px', top:'4px'}}/></span>
        </div>
    )
}

const loadStyle = {
    height: '30px',
    position: 'absolute', right: '40px', top:'4px'
}