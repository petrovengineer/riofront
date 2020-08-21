import React, {useEffect, useState} from 'react'

export default ({children, drawer})=>{
    let [height, setHeight] = useState(0)
    useEffect(()=>{
        setHeight(window.innerHeight);
    },[])
    return (
        <div className='content'
        style={{height, marginLeft:drawer?'0px':'-250px'}}>
            {children}
            <style jsx="true">
                {`
                    .content{
                        width: 100%;
                        position: relative;
                        padding: 16px;
                        overflow: scroll;
                        background:white;
                        transition: all 0.2s ease-out;
                        display: inline-block;
                    }
                `}
            </style>
        </div>
    )
}