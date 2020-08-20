import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {AppContext} from '../context';
import {ReactComponent as More} from '../imgs/more.svg';


export default (props)=>{
    const [customers, setCustomers] = useState([]);
    const {customer, modal} = useContext(AppContext);
    const fetchCustomers = async ()=>{
        try{
            const {data} = await axios.get('/customer');
            setCustomers(data);
        }catch(err){
            console.log(err);
        }
    }
    // const fetchEmail = async (id, i)=>{
    //     try{
    //         const {data} = await axios.get(`/user?customer=${id}`);
    //         const user = data[0];
    //         const newCustomers = [...customers];
    //         if(user!=null){
    //             newCustomers[i].email = user.email;
    //         }else newCustomers[i].email = 'Не прекреплён'
    //         setCustomers(newCustomers);
    //     }catch(err){
    //         console.log(err);
    //     }
    // }
    const delCustomer = async(id)=>{
        try{
            await axios.delete(`/customer?_id=${id}`);
            fetchCustomers();
        }
        catch(err){
            console.log(err);
        }finally{modal.close();}
    }
    useEffect(()=>{
        fetchCustomers();
    }, []);
    return (
        <>
        {/* <Modal show={modalDel!=null?true:false} close={()=>setModalDel(null)} title='Удалить?'
        modalRef={delCustModalRef} refName="delCustModalRef"
        >
            <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={()=>setModalDel(null)}>Нет</button>
                <button type="button" className="btn btn-danger" onClick={()=>delCustomer(modalDel)}>Да</button>
            </div>
        </Modal> */}
        {customer.get==null?null:
        <table className="table">
            <tbody>
                {customers.map((c, i)=>(
                    <tr key={c._id}>
                        <td>{c.name}</td>
                        <td>{c.phone}</td>
                        <td>{c.address}</td>
                        <td>{c.cart}</td>
                        {/* <td>
                            {c.email==null?
                            <button className="btn btn-primary"
                                onClick={()=>fetchEmail(c._id, i)}
                            >?</button>:c.email}
                        </td> */}
                        <td>
                            {/* <button className="btn btn-danger"
                            onClick={()=>modal.set([
                                {key:'show', value:true}, 
                                {key:'title', value:'Удалить?'},
                                {key:'ok', value:()=>{delCustomer(c._id)}},
                                {key:'cancel', value:true}

                            ])} 
                            >
                                Удалить</button> */}
                            <div className="dropdown">
                                <button className="btn" type="button" style={{boxShadow:'none', float:'right'}}
                                id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <More height="20" width="20" style={{fill:'grey'}}/>
                                </button>
                                <div className="dropdown-menu dropdown-menu-right">
                                    {/* <a className="dropdown-item" href="#" onClick={()=>openEdit(item._id)}>Изменить</a> */}
                                    <span className="dropdown-item"
                                    onClick={()=>modal.set([
                                        {key:'show', value:true}, 
                                        {key:'title', value:'Удалить?'},
                                        {key:'ok', value:()=>{delCustomer(c._id)}},
                                        {key:'cancel', value:true}
                                    ])}>Удалить</span>
                                </div>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>}
        </>
    )
}