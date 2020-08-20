import React, { useState, useEffect} from 'react';
import axios from 'axios';
import More from '../../imgs/more.svg';
import Input from './mini/Input';
import Dropdown from './mini/Dropdown';
import Load from './mini/Load';

export default ()=>{
    const [data, setData] = useState([]);
    const [ingTypes, setIngTypes] = useState([]);
    const [err, setErr] = useState(false);
    const [edit, setEdit] = useState([]);
    const [load, setLoad] = useState(false);
    const fetch = async ()=>{
        return new Promise(async (done, fail)=>{
            try{
                setErr(false);
                setLoad(true);
                const {data} = await axios.get('/ingredient');
                setLoad(false);
                setData(data);
            }catch(err){
                console.log(err);
                setLoad(false);
                setErr(true);
            }
        })
    }
    const fetchTypes = async ()=>{
        return new Promise(async (done, fail)=>{
            try{
                const {data} = await axios.get('/ingtype');
                setIngTypes(data);
                done()
            }catch(err){
                console.log(err);
                fail()
            }
        })
    }
    const create = (args)=>{
        return new Promise(async(done, fail)=>{
            try{
                setErr(false);
                console.log(args);
                await axios.post('/ingredient', args)
                fetch();
                done();
            }catch(err){
                console.log(err);
                setErr(true);
                fail();
            }
        })
    }
    const change = async(arg)=>{
        return new Promise(async(done, fail)=>{
            try{
                setErr(false);
                await axios.put('/ingredient', arg);
                closeEdit(arg._id);    
                fetch();
                done();
            }catch(err){
                console.log(err);
                setErr(true);
                fail();
            }
        })
    }
    const remove = async(id)=>{
        return new Promise(async (done, fail)=>{
            try{
                setErr(false);
                await axios.delete(`/ingredient?_id=${id}`);
                fetch();
                done();
            }
            catch(err){
                console.log(err);
                setErr(true);
                fail();
            }
        })
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
        async function fetchData(){
            await fetchTypes();
            await fetch();
        }
        fetchData();
    }, []);
    return (
        <>
        {err?<div className="alert alert-danger mt-3">Ошибка! Обратитесь к администратору!</div>:null}
        <Load load={load}>
            {edit.indexOf('new')>=0?
                <Input item={{_id: 'new', name: ''}}
                mutate={()=>(create({name: document.getElementById('new').value}))}
                close={()=>closeEdit('new')}/>
                :<button className="btn btn-success" onClick={()=>openEdit('new')}>
                    Создать
                </button>}
            <table className="table" style={{marginTop:'20px'}}>
                <tbody>
                    <tr>
                        <th>Название</th>
                        <th>Наличие</th>
                        <th>Тип</th>
                        <th></th>
                    </tr>
                    {data.map((item)=>{
                        const indexType = ingTypes.map((it)=>(it._id)).indexOf(item.type);
                        return(
                        <tr key={item._id}>
                            <td>
                                {edit.indexOf(item._id)>=0?
                                <Input item={item} 
                                mutate={()=>(change({_id:item._id, name: document.getElementById(item._id).value}))}
                                close={()=>closeEdit(item._id)}/>
                                :<span onClick={()=>openEdit(item._id)}>{item.name}</span>}
                            </td>
                            <td>
                                <Dropdown item={item} 
                                actions={change}
                                btn={item.exist?'В наличии':'Нет в наличии'}
                                vars={[{_id:true, name: 'В наличии'}, {_id:false, name: 'Нет в наличии'}]} k1='exist'/>
                            </td>
                            <td>
                                <Dropdown item={item} btn={indexType>-1?ingTypes[indexType].name:'Не установлен'} 
                                actions={change} vars={ingTypes} k1='type' k2='name'/>
                            </td>
                            <td>
                                <Dropdown item={item} btn={<More height="20" width="20" style={{fill:'grey'}}/>}
                                actions={[()=>(remove(item._id))]} 
                                    vars={[{_id:null, name:'Удалить', action: 0}]}
                                />
                            </td>
                        </tr>
                    )})}
                </tbody>
            </table>
        </Load>
        </>
    )
}