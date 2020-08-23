import React, { useState, useEffect} from 'react';
import axios from 'axios';
import More from '../../imgs/svg/more.svg';
import Input from '../../components/admin/Input';
import { fetchREST } from '../../usefull';
import Layout from '../../components/admin/Layout';
import Dropdown from '../../components/admin/Dropdown';

export default ()=>{
    const [data, setData] = useState([]);
    const [addField, showAddField] = useState(false);
    const [newItem, setNewItem] = useState('');
    const [err, setErr] = useState(false);
    const [edit, setEdit] = useState([]);
    const fetch = async ()=>{
        try{
            const {data} = await fetchREST('/ingtype', 'get');
            setData(data);
        }catch(err){
            console.log(err);
        }
    }
    const create = async(args)=>{
        try{
            setErr(false);
            await fetchREST('/ingtype','post', args)
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
            await fetchREST('/ingtype','put', arg);
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
            await fetchREST(`/ingtype`, 'delete', id);
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
        <Layout>
            {edit.indexOf('new')>=0?
            <Input item={{_id: 'new', name: ''}}
            mutate={()=>(create({name: document.getElementById('new').value}))}
            close={()=>closeEdit('new')}/>
            :<button className="btn btn-success" onClick={()=>openEdit('new')}>
                Создать
            </button>}
            {err?<div className="alert alert-danger mt-3">Ошибка! Обратитесь к администратору!</div>:null}
            <table className="table" style={{marginTop:'20px'}}>
                <tbody>
                    {data.map((item)=>(
                        <tr key={item._id}>
                            <td>
                                {edit.indexOf(item._id)>=0?
                                <Input 
                                    item={item} 
                                    mutate={()=>(change({_id:item._id, name: document.getElementById(item._id).value}))}
                                    close={()=>closeEdit(item._id)}
                                    param='name'
                                />
                                :<span onClick={()=>openEdit(item._id)}>{item.name}</span>}
                            </td>
                            <td>
                                <Dropdown item={item} btn={<More height="20" width="20" style={{fill:'grey'}}/>}
                                    actions={[()=>(remove(item._id))]} 
                                    vars={[{_id:null, name:'Удалить', action: 0}]}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Layout>
    )
}