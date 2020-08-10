const { default: Header } = require("./header");

function Layout({ children, foodtypes }) {
    return <div>
                <Header foodtypes = {foodtypes}/>
                {children}
            </div>
  }
  
  export default Layout