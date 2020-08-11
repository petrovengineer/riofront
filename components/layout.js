import Top from "./top";

const { default: Header } = require("./header");

function Layout({ children, foodtypes }) {
    return <>
                <Top/>
                <Header foodtypes = {foodtypes}/>
                {children}
            </>
  }
  
  export default Layout