import React, { useState, useEffect} from 'react';
import axios from 'axios';
import {ReactComponent as More} from '../imgs/more.svg';
import Input from './mini/Input';

export default ()=>{
    const [data, setData] = useState([]);
    const [addField, showAddField] = useState(false);
    const [newItem, setNewItem] = useState('');
    const [err, setErr] = useState(false);
    const [edit, setEdit] = useState([]);
    const fetch = async ()=>{
        try{
            const {data} = await axios.get('/ingtype');
            setData(data);
        }catch(err){
            console.log(err);
        }
    }
    const create = async(args)=>{
        try{
            setErr(false);
            await axios.post('/ingtype', args)
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
            await axios.put('/ingtype', arg);
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
            await axios.delete(`/ingtype?_id=${id}`);
            console.log('Done')
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
            {edit.indexOf('new')>=0?
            <Input item={{_id: 'new', name: ''}}
            mutate={()=>(create({name: document.getElementById('new').value}))}
            close={()=>closeEdit('new')}/>
            :<button className="btn btn-success" onClick={()=>openEdit('new')}>
                Создать
            </button>}
            {/* {addField?
            <div style={{display:'flex'}}>
                <input type="text" className="form-control" 
                    onChange={(e)=>setNewItem(e.currentTarget.value)} value={newItem}/>
                <button className="btn btn-success" 
                    onClick={(e)=>create(e.target.value)}
                    style={{marginLeft: '20px'}}>Создать</button>
                <button className="btn btn-danger" 
                    onClick={()=>showAddField(false)}
                    style={{marginLeft: '20px'}}>Отмена</button>
            </div>
            :<button className="btn btn-success" onClick={()=>showAddField(true)}>
                Создать
            </button>} */}
            {err?<div className="alert alert-danger mt-3">Ошибка! Обратитесь к администратору!</div>:null}
            <table className="table" style={{marginTop:'20px'}}>
                <tbody>
                    {data.map((item)=>(
                        <tr key={item._id}>
                            <td>
                                {edit.indexOf(item._id)>=0?
                                <div style={{display: 'flex'}}>
                                    <input className="form-control" id={item._id}/>
                                    <button className="btn btn-success ml-3"
                                    onClick={()=>{
                                        change({_id:item._id, name: document.getElementById(item._id).value})
                                    }}
                                    >Сохранить</button>
                                    <button className="btn btn-danger ml-3" onClick={()=>{closeEdit(item._id)}}>Отмена</button>
                                </div>
                                :item.name}
                            </td>
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
            </table>
        </>
    )
}