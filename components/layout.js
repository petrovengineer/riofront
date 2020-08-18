import Footer from './Footer';
import {useState} from 'react';
import Drawer from './Drawer';

const { default: Header } = require("./header");

function Layout({ children, foodtypes }) {
    const [drawer, setDrawer] = useState(false);
    return <>
                <Drawer drawer={drawer} setDrawer={setDrawer} foodtypes={foodtypes}/>
                <Header foodtypes = {foodtypes} drawer={drawer} setDrawer={setDrawer}/>
                    {children}
                <Footer/>
            </>
  }
  
  export default Layout