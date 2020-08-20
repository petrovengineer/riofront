import Footer from './Footer';
import {useState} from 'react';
import Drawer from './Drawer';

const { default: Header } = require("./header");

function Layout({ children, foodtypes, menu=true, home=false }) {
    const [drawer, setDrawer] = useState(false);
    return <>
                <Drawer drawer={drawer} setDrawer={setDrawer} foodtypes={foodtypes}/>
                <Header foodtypes = {foodtypes} drawer={drawer} setDrawer={setDrawer} menu={menu} home={home}/>
                    {children}
                <Footer/>
            </>
  }
  
  export default Layout