import React, { useState, useEffect} from 'react';
import axios from 'axios';
import More from '../../imgs/more.svg';
import Input from './mini/Input';
import DropCheck from './mini/DropCheck';
import Dropdown from './mini/Dropdown';
import Load from './mini/Load';
import noimage from '../imgs/noimage.png';

export default ()=>{
    const [data, setData] = useState([]);
    const [ingTypes, setIngTypes] = useState([]);
    const [foodTypes, setFoodTypes] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [err, setErr] = useState(false);
    const [edit, setEdit] = useState([]);
    const [load, setLoad] = useState(false);
    const arrayBufferToBase64 = (buffer)=>{
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };
    const handleFile = (e, _id)=>{
        let file = e.target.files[0];
        let formData = new FormData();
        formData.append('file', file);
        axios.post( `/food/upload?_id=${_id}`, formData,
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
                const {data} = await axios.get('/food');
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
    const fetchIngTypes = async ()=>{
        return new Promise(async (done, fail)=>{
            try{
                const {data} = await axios.get('/ingtype');
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
                const {data} = await axios.get('/foodtype');
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
                const {data} = await axios.get('/ingredient');
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
                await axios.post('/food', args)
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
                await axios.put('/food', arg);
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
                await axios.delete(`/food?_id=${id}`);
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
            await fetchIngTypes();
            await fetchFoodTypes();
            await fetchIngredients();
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
                        <th>Цена</th>
                        <th>Тип продукта</th>
                        <th>Ингредиенты</th>
                        <th>Типы ингредиентов</th>
                        <th>Изображение</th>
                        <th></th>
                    </tr>
                    {data.map((item, i)=>{
                        return(
                        <tr key={item._id}>
                            <td>
                                {edit.indexOf(item._id)>=0?
                                <Input item={item} 
                                mutate={()=>(change({_id:item._id, name: document.getElementById(item._id).value}))}
                                close={()=>closeEdit(item._id)}/>
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
                            <td>
                                <form >
                                    <label htmlFor={item._id} style={{cursor:'pointer'}}>
                                        <img alt="" height="100" width="100" src={item.img==null?noimage:`data:image/jpeg;base64,${arrayBufferToBase64(item.img.data.data)}`}/>
                                    </label>
                                    <input type="file" id={item._id} name="file" 
                                    onChange={(e)=>{handleFile(e, item._id)}} style={{display:'none'}}></input>
                                </form>
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