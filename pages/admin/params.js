import React, { useState, useEffect, useContext, Component} from 'react';
import axios from 'axios';
import More from '../../imgs/svg/more.svg';
import Layout from '../../components/admin/Layout';
import {AppContext} from '../../context';
import {fetchREST} from '../../usefull';
import Input from '../../components/admin/Input';
import Dropdown from '../../components/admin/Dropdown';

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
            {/* {addField?
            <div style={{display:'flex'}}>
                <input type="text" className="form-control" 
                    onChange={(e)=>setNewParam(e.currentTarget.value)} value={newParam}/>
                <button className="btn btn-success" 
                    onClick={(e)=>createParam(e.target.value)}
                    style={{marginLeft: '20px'}}>Создать</button>
                <button className="btn btn-danger" 
                    onClick={()=>showAddField(false)}
                    style={{marginLeft: '20px'}}>Отмена</button>
            </div>
            :<button className="btn btn-primary" onClick={()=>showAddField(true)}>
                Новый тип
            </button>} */}
            {err?<div className="alert alert-danger mt-3">Ошибка! Обратитесь к администратору!</div>:null}
            <table className="table" style={{marginTop:'20px'}}>
                <tbody>
                    {params.map((ft, i)=>(
                        <tr key={ft._id}>
                            <td>
                                {edit.indexOf(ft._id)>=0?
                                <Input 
                                    item={ft} 
                                    mutate={()=>(changeParam({_id:ft._id, name: document.getElementById(ft._id).value}))}
                                    close={()=>closeEdit(ft._id)}
                                    param='name'
                                />
                                :<span onClick={()=>openEdit(ft._id)}>{ft.name}</span>}
                            </td>
                            <td>
                                <Dropdown item={ft} btn={<More height="20" width="20" style={{fill:'grey'}}/>}
                                    actions={[()=>(delParam(ft._id))]} 
                                    vars={[{_id:null, name:'Удалить', action: 0}]}
                                />
                                {/* <div className="dropdown">
                                    <button className="btn" type="button" style={{boxShadow:'none', float:'right'}}
                                    id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <More height="20" width="20" style={{fill:'grey'}}/>
                                    </button>
                                    <div className="dropdown-menu dropdown-menu-right">
                                        <span className="dropdown-item" href="/#" onClick={()=>delParam(ft._id)}>Удалить</span>
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

export default Params;
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
//         console.log("AACCESS TOKEN",accessToken);
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
//             (token)=>(<Params token={token}/>)
//             }/>
// }

