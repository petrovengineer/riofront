import React, {useState} from 'react';

export default ({item, actions, vars, k1, k2, btn})=>{
    const [load, setLoad] = useState(false);
    return (
        <div className="dropdown">
            {load?<img src="/load.gif" alt="" style={loadStyle}></img>:<button className="btn" type="button" style={{boxShadow:'none', padding:0}}
            id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {btn}
            </button>}
            <div className="dropdown-menu dropdown-menu-right">
                {
                    vars.map((v)=>(
                        <div style={{cursor:'pointer'}} className="dropdown-item" key={v._id}
                        onClick={async()=>{
                            setLoad(true);
                            try{
                                typeof(actions)=='object'?
                                await actions[v.action]({_id: item._id, [k1]: v._id})
                                : await actions({_id: item._id, [k1]: v._id})
                                // setLoad(false);
                            }catch{
                                setLoad(false); 
                            }

                        }}
                        >{v.name}</div>
                    ))
                }
            </div>
        </div>
    )
}

const loadStyle = {
    height: '30px',
}