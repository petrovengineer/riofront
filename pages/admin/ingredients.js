import React, { useState, useEffect} from 'react';
import axios from 'axios';
import More from '../../imgs/svg/more.svg';
import Input from '../../components/admin/Input';
import Dropdown from '../../components/admin/Dropdown';
import Load from '../../components/admin/Load';
import {fetchREST} from '../../usefull';
import Layout from '../../components/admin/Layout';

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
                const {data} = await fetchREST('/ingredient', 'get');
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
                const {data} = await fetchREST('/ingtype', 'get');
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
                await fetchREST('/ingredient','post', args)
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
                console.log("CHANGE", arg);
                setErr(false);
                await fetchREST('/ingredient','put', arg);
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
                await fetchREST(`/ingredient`, 'delete', id);
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
        <Layout>
        {err?<div className="alert alert-danger mt-3">Ошибка! Обратитесь к администратору!</div>:null}
        <Load load={load}>
            {edit.indexOf('new')>=0?
                <Input item={{_id: 'new', name: ''}}
                mutate={()=>(create({name: document.getElementById('new').value}))}
                close={()=>closeEdit('new')}
                />
                :<button className="btn btn-success" onClick={()=>openEdit('new')}>
                    Создать
                </button>}
            <table className="table" style={{marginTop:'20px'}}>
                <tbody>
                    <tr>
                        <th>Название</th>
                        <th>Наценка</th>
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
                                close={()=>closeEdit(item._id)}
                                param='name'
                                />
                                :<span onClick={()=>openEdit(item._id)}>{item.name}</span>}
                            </td>
                            <td>
                                {edit.indexOf(item._id+4)>=0?
                                <Input item={item} 
                                mutate={()=>(change({_id:item._id, coast: document.getElementById(item._id).value}))}
                                param='coast'
                                close={()=>closeEdit(item._id+4)}/>
                                :<span onClick={()=>openEdit(item._id+4)}>{item.coast?item.coast:'Не указана'}</span>}
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
        </Layout>
    )
}