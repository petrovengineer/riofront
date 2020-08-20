import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {AppContext} from '../context';

export default (props)=>{
    const [users, setUsers] = useState([]);
    const {customer} = useContext(AppContext);
    const fetchUsers = async ()=>{
        try{
            const {data} = await axios.get('/user');
            setUsers(data);
        }catch(err){
            console.log(err);
        }
    }
    useEffect(()=>{
        fetchUsers();
    }, []);
    return (
        <>
        {customer.get==null?null:
        <table className="table">
            <tbody>
                {users.map((user)=>(
                    <tr key={user._id}>
                        <td>{user.email}</td>
                        <td>{user.customer.name}</td>
                        <td>{user.admin?'Администратор':'Покупатель'}</td>
                        <td>{user.active?'Активирован':'Нет'}</td>
                        <td>{user.created?new Date(user.created).toDateString():'Неизвестно'}</td>
                    </tr>
                ))}
            </tbody>
        </table>}
        </>
    )
}