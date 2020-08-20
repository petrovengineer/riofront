import React, { useState, useEffect} from 'react';
import axios from 'axios';
import {ReactComponent as More} from '../imgs/more.svg';

export default ()=>{
    const [foodTypes, setFoodTypes] = useState([]);
    const [addField, showAddField] = useState(false);
    const [newType, setNewType] = useState('');
    const [err, setErr] = useState(false);
    const [edit, setEdit] = useState([]);
    const fetchFoodTypes = async ()=>{
        try{
            const {data} = await axios.get('/foodtype');
            setFoodTypes(data);
        }catch(err){
            console.log(err);
        }
    }
    const createFoodType = async()=>{
        try{
            setErr(false);
            await axios.post('/foodtype', {name: newType})
            fetchFoodTypes();
        }catch(err){
            console.log(err);
            setErr(true);
        }finally{
            setNewType('');
        }
    }
    const changeFoodType = async(arg)=>{
        try{
            setErr(false);
            await axios.put('/foodtype', arg);
            closeEdit(arg._id);    
            fetchFoodTypes();
        }catch(err){
            console.log(err);
            setErr(true);
        }
    }
    const delFoodType = async(id)=>{
        try{
            setErr(false);
            await axios.delete(`/foodtype?id=${id}`);
            console.log('Done')
            fetchFoodTypes();
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
        fetchFoodTypes();
    }, []);
    return (
        <>
            {addField?
            <div style={{display:'flex'}}>
                <input type="text" className="form-control" 
                    onChange={(e)=>setNewType(e.currentTarget.value)} value={newType}/>
                <button className="btn btn-success" 
                    onClick={(e)=>createFoodType(e.target.value)}
                    style={{marginLeft: '20px'}}>Создать</button>
                <button className="btn btn-danger" 
                    onClick={()=>showAddField(false)}
                    style={{marginLeft: '20px'}}>Отмена</button>
            </div>
            :<button className="btn btn-primary" onClick={()=>showAddField(true)}>
                Новый тип
            </button>}
            {err?<div className="alert alert-danger mt-3">Ошибка! Обратитесь к администратору!</div>:null}
            <table className="table" style={{marginTop:'20px'}}>
                <tbody>
                    {foodTypes.map((ft, i)=>(
                        <tr key={ft._id}>
                            <td>
                                {edit.indexOf(ft._id)>=0?
                                <div style={{display: 'flex'}}>
                                    <input className="form-control" id={ft._id}/>
                                    <button className="btn btn-success ml-3"
                                    onClick={()=>{
                                        changeFoodType({_id:ft._id, name: document.getElementById(ft._id).value})
                                    }}
                                    >Сохранить</button>
                                    <button className="btn btn-danger ml-3" onClick={()=>{closeEdit(ft._id)}}>Отмена</button>
                                </div>
                                :ft.name}
                            </td>
                            <td>
                                <div className="dropdown">
                                    <button className="btn" type="button" style={{boxShadow:'none', float:'right'}}
                                    id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <More height="20" width="20" style={{fill:'grey'}}/>
                                    </button>
                                    <div className="dropdown-menu dropdown-menu-right">
                                        <span className="dropdown-item" onClick={()=>openEdit(ft._id)}>Изменить</span>
                                        <span className="dropdown-item" href="/#" onClick={()=>delFoodType(ft._id)}>Удалить</span>
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