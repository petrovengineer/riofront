import React from 'react'
import Drawer from './Drawer'
import Content from './Content'

export default ({children})=>{
    return(
    <>
        <Drawer/>
        <Content>
            {children}
        </Content>
    </>
    )
}