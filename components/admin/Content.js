import '../css/content.scss'
import React, {useEffect, useState} from 'react'

export default ({children})=>{
    let [height, setHeight] = useState(0)
    useEffect(()=>{
        setHeight(window.innerHeight);
    },[])
    return (
        <div className="content p-3" style={{height, overflow:'scroll', background:'white'}}>
            {children}
            <style jsx="true">
                {`
                    .content{
                        width: 100%;
                        position: relative;
                    }
                `}
            </style>
        </div>
    )
}