import Footer from './Footer';
import {useState, useRef} from 'react';
import Drawer from './Drawer';
import FormLogin from './FormLogin';
import FormReg from './FormReg';
import Modal from './Modal';
import Title from './Title';

const { default: Header } = require("./header");

function Layout({ children, foodtypes, menu=true, home=false , showParam, refs, param}) {
    const [drawer, setDrawer] = useState(false);
    const [modal, toggleModal] = useState(false);
    let loginModalRef = useRef();

    return <div style={{height:'100%', minHeight:'100%', display:'flex', flexDirection:'column'}} onClick={
                (event)=>{
                    if(refs!=null){
                        var el = refs.current[param];
                        if (el!=null && !el.contains(event.target)) {
                                if(event.target.classList.contains('param-btn')){showParam(event.target.id)}
                                else{showParam(null)};
                        }
                    }
                }
            }>
                <Drawer drawer={drawer} setDrawer={setDrawer} foodtypes={foodtypes}/>
                <Header foodtypes = {foodtypes} drawer={drawer} setDrawer={setDrawer} menu={menu} home={home} toggleModal={toggleModal}/>
                    {children}
                <Footer/>
                <Modal title={<Title/>} show={modal} modalRef={loginModalRef} refName="loginModalRef" close={()=>{toggleModal(false)}}>
                    <div className="tab-content" id="myTabContent">
                        <FormLogin activate={false} close={()=>{toggleModal(false)}}/>
                        <FormReg/>
                    </div>
                </Modal>
            </div>
  }
  
  export default Layout