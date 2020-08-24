import React, { useState, useEffect, useContext, Component} from 'react';
import axios from 'axios';
import More from '../../imgs/svg/more.svg';
import Layout from '../../components/admin/Layout';
import Input from '../../components/admin/Input';
import Dropdown from '../../components/admin/Dropdown';
import {AppContext} from '../../context';
import {fetchREST} from '../../usefull';

const FoodTypes = ()=>{
    const {accessToken} = useContext(AppContext);
    const [foodTypes, setFoodTypes] = useState([]);
    const [addField, showAddField] = useState(false);
    const [newType, setNewType] = useState('');
    const [err, setErr] = useState(false);
    const [edit, setEdit] = useState([]);
    const fetchFoodTypes = async ()=>{
        try{
            const {data} = await fetchREST('/foodtype', 'get');
            setFoodTypes(data);
        }catch(err){
            console.log(err);
        }
    }
    const create = async(args)=>{
        try{
            setErr(false);
            await fetchREST('/foodtype', 'post', args);
            fetchFoodTypes();
        }catch(err){
            console.log(err);
            setErr(true);
        }finally{
            setNewType('');
        }
    }
    const change = async(arg)=>{
        try{
            setErr(false);
            await fetchREST('/foodtype', 'put', arg);
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
            await fetchREST('/foodtype', 'delete', id);
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
        // if(accessToken!=null){
            // axios.defaults.baseURL = process.env.NEXT_PUBLIC_OLD_API;
            // axios.defaults.headers.common['Authorization'] = 'Bearer '+accessToken.get;
            // axios.defaults.headers.post['Content-Type'] = 'application/json';
            fetchFoodTypes();
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
                    {foodTypes.map((ft, i)=>(
                        <tr key={ft._id}>
                            <td>
                            {edit.indexOf(ft._id)>=0?
                                <Input 
                                    item={ft} 
                                    mutate={()=>(change({_id:ft._id, name: document.getElementById(ft._id).value}))}
                                    close={()=>closeEdit(ft._id)}
                                    param='name'
                                />
                                :<span onClick={()=>openEdit(ft._id)}>{ft.name}</span>}
                                {/* {edit.indexOf(ft._id)>=0?
                                <div style={{display: 'flex'}}>
                                    <input className="form-control" id={ft._id}/>
                                    <button className="btn btn-success ml-3"
                                    onClick={()=>{
                                        changeFoodType({_id:ft._id, name: document.getElementById(ft._id).value})
                                    }}
                                    >Сохранить</button>
                                    <button className="btn btn-danger ml-3" onClick={()=>{closeEdit(ft._id)}}>Отмена</button>
                                </div>
                                :ft.name} */}
                            </td>
                            <td>
                                <Dropdown item={ft} btn={<More height="20" width="20" style={{fill:'grey'}}/>}
                                    actions={[()=>(delFoodType(ft._id))]} 
                                    vars={[{_id:null, name:'Удалить', action: 0}]}
                                />
                                {/* <div className="dropdown">
                                    <button className="btn" type="button" style={{boxShadow:'none', float:'right'}}
                                    id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <More height="20" width="20" style={{fill:'grey'}}/>
                                    </button>
                                    <div className="dropdown-menu dropdown-menu-right">
                                        <span className="dropdown-item" href="/#" onClick={()=>delFoodType(ft._id)}>Удалить</span>
                                    </div>
                                </div> */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Layout>
    )
}

export default FoodTypes;
// class Token extends Component{
//     constructor(props){
//         super(props);
//     }
//     render(){
//         return this.props.render("123123123123");
//     }
// }

// const Token = (props)=>{
//     const {accessToken} = useContext(AppContext);
//     const [token, setToken] = useState(null);
//     useEffect(()=>{
//         setToken(accessToken);
//     }, [accessToken])
//     return props.render(token);
// }

// const WithToken = (props)=>{    
//     const Component = props.component;
//     return <Token render={
//             (token)=>(<Component token={token}/>)
//             }/>
// }

// export default ()=>{
//     return <Token render={
//             (token)=>(<FoodTypes token={token}/>)
//             }/>
// }

