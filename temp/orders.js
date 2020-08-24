import React, { useState, useEffect} from 'react';
import axios from 'axios';
import More from '../../imgs/svg/more.svg';

export default ()=>{
    const [data, setData] = useState([]);
    const [addField, showAddField] = useState(false);
    const [newItem, setNewItem] = useState('');
    const [err, setErr] = useState(false);
    const [edit, setEdit] = useState([]);
    const fetch = async ()=>{
        try{
            const {data} = await axios.get('/order');
            setData(data);
        }catch(err){
            console.log(err);
        }
    }
    const create = async()=>{
        try{
            setErr(false);
            await axios.post('/order', {name: newItem})
            fetch();
        }catch(err){
            console.log(err);
            setErr(true);
        }finally{
            setNewItem('');
        }
    }
    const change = async(arg)=>{
        try{
            setErr(false);
            await axios.put('/order', arg);
            closeEdit(arg._id);    
            fetch();
        }catch(err){
            console.log(err);
            setErr(true);
        }
    }
    const remove = async(id)=>{
        try{
            setErr(false);
            await axios.delete(`/order?_id=${id}`);
            fetch();
        }
        catch(err){
            console.log(err);
            setErr(true);
        }
    }
    const openEdit = (id)=>{
        const newEdit = [...edit];
        newEdit.push(id);
        setEdit(newEdit);
    }
    const closeEdit = (id)=>{
        const newEdit = [...edit];
        newEdit.splice(newEdit.indexOf(id), 1);
        setEdit(newEdit); 
    }
    useEffect(()=>{
        fetch();
    }, []);
    return (
        <>
            {err?<div className="alert alert-danger mt-3">Ошибка! Обратитесь к администратору!</div>:null}
            {data.map(order=>(
                <div className="d-flex w-100 mt-2 p-2" style={{background:'white', border: '1px solid blue'}}>
                    <div className="d-flex flex-column p-2">
                        <div>{order.customer.name}</div>
                        <div>{order.customer.phone}</div>
                        <div>{order.customer.email}</div>
                        <div>{order.customer.address}</div>
                        <div>кв/офис {order.customer.apnumber} этаж: {order.customer.floor}</div>
                    </div>
                    <div className="d-flex flex-column p-2">
                        {order.cart.map(c=>(
                            <div>{c.food.name} {c.count}шт</div>
                        ))}
                    </div>
                    <div className="d-flex flex-column p-2">
                        <div>Создан: {order.created?new Date(order.created).toDateString():''}</div>
                        <div>Статус: {order.status==0?'Ожидает подтверждения':order.status==1?'Готовится':'В пути'}</div>
                    </div>
                </div>
            ))}
            {/* <table className="table" style={{marginTop:'20px'}}>
                <tbody>
                    {data.map((item)=>(
                        <tr key={item._id}>
                            <td>
                                <div className="dropdown">
                                    <button className="btn" type="button" style={{boxShadow:'none', float:'right'}}
                                    id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <More height="20" width="20" style={{fill:'grey'}}/>
                                    </button>
                                    <div className="dropdown-menu dropdown-menu-right">
                                        <a className="dropdown-item" href="/#" onClick={()=>openEdit(item._id)}>Изменить</a>
                                        <a className="dropdown-item" href="/#" onClick={()=>remove(item._id)}>Удалить</a>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table> */}
        </>
    )
}