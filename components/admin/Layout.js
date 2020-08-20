import React, {useState} from 'react'
import Drawer from './Drawer'
import Content from './Content'

export default ({children})=>{
    let [drawer, toggleDrawer] = useState(true)
    return(
    <div className="d-flex">
        <Drawer drawer={drawer} toggleDrawer={toggleDrawer}/>
        <Content drawer={drawer} toggleDrawer={toggleDrawer}>
            {children}
        </Content>
    </div>
    )
}