import Top from "./top"
import Footer from './Footer'

const { default: Header } = require("./header");

function Layout({ children, foodtypes }) {
    return <>
                <Top/>
                <Header foodtypes = {foodtypes}/>
                    {children}
                <Footer/>
            </>
  }
  
  export default Layout