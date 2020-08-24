import React, { useState, useEffect} from 'react';
import axios from 'axios';
import More from '../../imgs/svg/more.svg';
import Input from '../../components/admin/Input';
import DropCheck from '../../components/admin/DropCheck';
import Dropdown from '../../components/admin/Dropdown';
import Load from '../../components/admin/Load';
import noimage from '../../imgs/noimage.png';
import Layout from '../../components/admin/Layout';
import {fetchREST} from '../../usefull';

export default ()=>{
    const [data, setData] = useState([]);
    const [params, setParams] = useState([]);
    const [ingTypes, setIngTypes] = useState([]);
    const [foodTypes, setFoodTypes] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [err, setErr] = useState(false);
    const [edit, setEdit] = useState([]);
    const [load, setLoad] = useState(false);

    const handleFile = (e, _id)=>{
        let file = e.target.files[0];
        let formData = new FormData();
        formData.append('file', file);
        axios.post(process.env.NEXT_PUBLIC_OLD_API + `/food/upload?_id=${_id}`, formData,
            { headers: {'Content-Type': 'multipart/form-data'}}
        ).then(function(){
            setErr(null)
            fetch();
        })
        .catch(function(err){
            setErr('Ошибка сервера!')
            console.log(err);
        });
    }
    const fetch = async ()=>{
        return new Promise(async (done, fail)=>{
            try{
                setErr(false);
                setLoad(true);
                const {data} = await fetchREST('/food', 'get');
                setData(data);
                setLoad(false);
                done(data)
            }catch(err){
                console.log(err);
                setLoad(false);
                setErr(true);
                fail();
            }
        })
    }
    const fetchParams = async ()=>{
        return new Promise(async (done, fail)=>{
            try{
                const {data} = await fetchREST('/param', 'get');
                setParams(data);
                done(data);
            }catch(err){
                console.log(err);
                fail();
            }
        })
    }
    const fetchIngTypes = async ()=>{
        return new Promise(async (done, fail)=>{
            try{
                const {data} = await fetchREST('/ingtype', 'get');
                setIngTypes(data);
                done(data);
            }catch(err){
                console.log(err);
                fail();
            }
        })
    }
    const fetchFoodTypes = async ()=>{
        return new Promise(async (done, fail)=>{
            try{
                const {data} = await fetchREST('/foodtype', 'get');
                setFoodTypes(data);
                done();
            }catch(err){
                console.log(err);
                fail();
            }
        })
    }
    const fetchIngredients = async ()=>{
        return new Promise(async (done, fail)=>{
            try{
                const {data} = await fetchREST('/ingredient', 'get');
                setIngredients(data);
                done();
            }catch(err){
                console.log(err);
                fail();
            }
        })
    }
    const create = (args)=>{
        return new Promise(async(done, fail)=>{
            try{
                setErr(false);
                await fetchREST('/food','post', args)
                setData(await fetch());
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
                await fetchREST('/food','put', arg);
                closeEdit(arg._id);    
                await fetch();
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
                await fetchREST(`/food`, 'delete', id);
                await fetch();
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
            await fetchParams();
            await fetchIngTypes();
            await fetchFoodTypes();
            await fetchIngredients();
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
                close={()=>closeEdit('new')}/>
                :<button className="btn btn-success" onClick={()=>openEdit('new')}>
                    Создать
                </button>}
            <table className="table" style={{marginTop:'20px'}}>
                <tbody>
                    <tr>
                        <th>Название</th>
                        <th>Цена</th>
                        <th>Тип продукта</th>
                        <th>Типы ингредиентов</th>
                        <th>Ингредиенты</th>
                        <th>Параметры</th>
                        <th>Изображение</th>
                        <th></th>
                    </tr>
                    {data.map((item, i)=>{
                        return(
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
                            {/* COAST */}
                            <td>
                                {edit.indexOf(item._id+4)>=0?
                                <Input item={item} 
                                mutate={()=>(change({_id:item._id, coast: document.getElementById(item._id).value}))}
                                param='coast'
                                close={()=>closeEdit(item._id+4)}/>
                                :<span onClick={()=>openEdit(item._id+4)}>{item.coast?item.coast:'Не указана'}</span>}
                            </td>
                            {/* FOOD TYPES */}
                            <td>
                                {edit.indexOf(item._id+2)>=0?
                                <DropCheck item={item.foodTypes} 
                                actions={({foodTypes})=>change({_id:item._id, foodTypes})} vars={foodTypes} k1='foodTypes'
                                close={()=>closeEdit(item._id+2)}/>
                                :<span onClick={()=>openEdit(item._id+2)}>
                                    {item.foodTypes.map(
                                        (type)=>{
                                            const index = foodTypes.map(i=>i._id).indexOf(type);
                                            return (
                                                    <span key={type}>
                                                        {
                                                            foodTypes[index]==null?
                                                            <span style={{color:'red'}}>Удалено</span>
                                                            :foodTypes[index].name+' '
                                                        }
                                                    </span>
                                                )
                                            })}
                                    {item.foodTypes.length===0?'Нет выбранных':null}
                                </span>}
                            </td>
                            {/* ING TYPES */}
                            <td>
                                {edit.indexOf(item._id+1)>=0?
                                <DropCheck item={item.avIngTypes} 
                                actions={({avIngTypes})=>change({_id: item._id, avIngTypes})} vars={ingTypes} k1='avIngTypes' k2='name'
                                close={()=>closeEdit(item._id+1)}/>
                                :<span onClick={()=>openEdit(item._id+1)}>
                                    {item.avIngTypes.map(
                                        (type)=>{
                                            const index = ingTypes.map(i=>i._id).indexOf(type);
                                            return (
                                                    <span key={type}>{
                                                        ingTypes[index]==null?
                                                        <span style={{color:'red'}}>Удалено</span>
                                                        :ingTypes[index].name+' '}
                                                    </span>
                                                )
                                            })}
                                    {item.avIngTypes.length===0?'Нет выбранных':null}
                                </span>}
                            </td>
                            {/* INGREDIENTS */}
                            <td>
                                {edit.indexOf(item._id+3)>=0?
                                <DropCheck item={item.ingredients}
                                filter={item.avIngTypes}
                                actions={
                                    ({ingredients})=>{
                                    change({_id:item._id, ingredients})}
                                } vars={ingredients} k1='ingredients'
                                close={()=>closeEdit(item._id+3)}/>
                                :<List item={item.ingredients} param='ingredients'
                                list={ingredients} openEdit={()=>openEdit(item._id+3)}/>}
                            </td>
                            {/*  =====PARAMS==========*/}
                            <td>
                                {edit.indexOf(item._id+6)>=0?
                                <DropCheck item={item.params} 
                                actions={({params})=>change({_id: item._id, params})} 
                                vars={params} k1='params'
                                close={()=>closeEdit(item._id+6)}/>
                                :<span onClick={()=>openEdit(item._id+6)}>
                                    {item.params!=null?item.params.map(
                                        (p)=>{
                                            const index = params.map(i=>i._id).indexOf(p);
                                            return (
                                                    <span key={p}>{
                                                        params[index]==null?
                                                        <span style={{color:'red'}}>Удалено</span>
                                                        :params[index].name+' '}
                                                    </span>
                                                )
                                            }):null}
                                    {item.params!=null?item.params.length===0?'Нет выбранных':null:'Нет выбранных'}
                                </span>}
                            </td>
                            {/* ======UPLOAD IMAGE=============== */}
                            <td>
                                <form >
                                    <label htmlFor={item._id} style={{cursor:'pointer'}}>
                                        <img alt="" height="100" width="100" src={item.img==null?noimage:`data:image/jpeg;base64,${item.img.data}`}/>
                                    </label>
                                    <input type="file" id={item._id} name="file" 
                                    onChange={(e)=>{handleFile(e, item._id)}} style={{display:'none'}}></input>
                                </form>
                            </td>
                            {/* ====MENU=========== */}
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

const List = ({item, param, list, openEdit})=>{
    const listIds = list.map(l=>l._id);
    return (
        <span onClick={openEdit}>
            {item.map(
                (type)=>{
                    const index = listIds.indexOf(type);
                    return (
                            <span key={type}>
                                {
                                    index<0?
                                    <span style={{color:'red'}}>Удалено</span>
                                    :<span style={{color:list[index].exist?'green':'red'}}>{list[index].name+' '}</span>
                                }
                            </span>
                        )
                    })}
            {item.length===0?'Нет выбранных':null}
        </span>
    )
}