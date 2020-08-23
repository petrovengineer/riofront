import React, { useState, useEffect, useContext, Component} from 'react';
import axios from 'axios';
import More from '../../imgs/svg/more.svg';
import Layout from '../../components/admin/Layout';
import {AppContext} from '../../context';
import {fetchREST} from '../../usefull';
import Input from '../../components/admin/Input';
import Dropdown from '../../components/admin/Dropdown';
import Close from '../../imgs/svg/close.svg';

const Params = ()=>{
    const {accessToken} = useContext(AppContext);
    const [params, setParams] = useState([]);
    const [addField, showAddField] = useState(false);
    const [newParam, setNewParam] = useState('');
    const [err, setErr] = useState(false);
    const [edit, setEdit] = useState([]);
    const fetchParams = async ()=>{
        try{
            const {data} = await fetchREST('/param', 'get');
            setParams(data);
        }catch(err){
            console.log(err);
        }
    }
    const create = async(args)=>{
        try{
            setErr(false);
            await fetchREST('/param', 'post', args);
            fetchParams();
        }catch(err){
            console.log(err);
            setErr(true);
        }finally{
            setNewParam('');
        }
    }
    const changeParam = async(arg)=>{
        try{
            console.log("PARAM", arg)
            setErr(false);
            await fetchREST('/param', 'put', arg);
            closeEdit(arg._id);    
            fetchParams();
        }catch(err){
            console.log(err);
            setErr(true);
        }
    }
    const delParam = async(id)=>{
        try{
            setErr(false);
            await fetchREST('/param', 'delete', id);
            fetchParams();
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
        // if(accessToken!=null){
            // console.log(accessToken);
            // axios.defaults.baseURL = process.env.NEXT_PUBLIC_OLD_API;
            // axios.defaults.headers.common['Authorization'] = 'Bearer '+accessToken.get;
            // axios.defaults.headers.post['Content-Type'] = 'application/json';
            fetchParams();
        // }
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
                    {params.map((param, i)=>(
                        <tr key={param._id}>
                            <td>
                                {edit.indexOf(param._id)>=0?
                                <Input 
                                    item={param} 
                                    mutate={()=>(changeParam({_id:param._id, name: document.getElementById(param._id).value}))}
                                    close={()=>closeEdit(param._id)}
                                    param='name'
                                />
                                :<span onClick={()=>openEdit(param._id)}>{param.name}</span>}
                            </td>
                            <td>
                                <div className="d-flex flex-column justify-content-center align-items-center p-2">
                                {edit.indexOf(param._id+'new')>=0?
                                    <Input item={{_id: param._id+'new', name: ''}}
                                    mutate={()=>(changeParam({_id: param._id, list: [...param.list, {name: document.getElementById(param._id+'new').value}]}))}
                                    close={()=>closeEdit(param._id+'new')}/>
                                    :<button className="btn btn-success" onClick={()=>openEdit(param._id+'new')} style={{width:'100px'}}>
                                        Добавить
                                    </button>
                                }
                                {param.list.map((l)=>{
                                    console.log("PARAM LIST", l);
                                    return <div className="d-flex justify-content-center align-items-center m-2">
                                                <span className="mr-2">{l.name}</span>
                                                {edit.indexOf(l._id)>=0?
                                                <Input 
                                                    item={l} 
                                                    mutate={()=>(changeParam({_id:param._id, list: param.list.map((pl)=>{
                                                        if(pl._id==l._id){
                                                            pl.coast = document.getElementById(l._id).value;
                                                        }
                                                        return pl;
                                                    })}))}
                                                    // mutate={()=>(change({_id:param._id, coast: document.getElementById(l._id).value}))}
                                                    close={()=>closeEdit(l._id)}
                                                    param='coast'
                                                />
                                                :<span onClick={()=>openEdit(l._id)}>{l.coast}руб</span>}
                                                {/* <span className="ml-2"
                                                >{l.coast}руб</span> */}
                                                <span className="svg-close ml-2"><Close height="10" width="10" 
                                                onClick={
                                                    ()=>{
                                                        let index = param.list.indexOf(l);
                                                        param.list.splice(index,1);
                                                        changeParam({_id: param._id, list: param.list})
                                                    }
                                                }
                                                // style={{position: 'absolute', right: '5px', top:'4px'}}
                                                /></span>
                                                {/* <button className="btn btn-danger ml-2"
                                                    onClick={
                                                        ()=>{
                                                        let index = param.list.indexOf(l);
                                                        param.list.splice(index,1);
                                                        console.log(index);
                                                        changeParam({_id: param._id, list: param.list})
                                                    }
                                                }
                                                >Удалить</button> */}
                                            </div>
                                })}
                                </div>
                            </td>
                            <td>
                                <Dropdown item={param} btn={<More height="20" width="20" style={{fill:'grey'}}/>}
                                    actions={[
                                        ()=>(delParam(param._id)),
                                    ]} 
                                    vars={[
                                        {_id:null, name:'Удалить', action: 0}
                                    ]}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Layout>
    )
}

export default Params;

