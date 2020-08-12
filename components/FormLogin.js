import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import {AppContext} from '../context';

const FormLogin = ({close, activate})=>{
    const [email, changeEmail] = useState('petrovengineer@gmail.com');
    const [password, changePassword] = useState('1212');
    const [load, changeLoad] = useState(false);
    const [info, setInfo] = useState(null);
    const [err, chErr] = useState(null);
    const context = useContext(AppContext);
    useEffect(()=>{
        // console.log("CONTEXT", context);
    }, [])
    useEffect(()=>{
        if(activate){setInfo('Активация прошла успешно!')}
    }, [activate])
    const handleEmail = (e)=>{
        changeEmail(e.currentTarget.value);
    }
    const handlePassword = (e)=>{
        changePassword(e.currentTarget.value);
    }
    const login = async ()=>{
        try{
            chErr(null);
            setInfo(null);
            changeLoad(true);
            const res = await axios.post(process.env.NEXT_PUBLIC_API+'/auth/login', {email, password});
            if(res.data.accessToken!=null && res.data.refreshToken!=null){
                context.accessToken.set(res.data.accessToken);
                context.refreshToken.set(res.data.refreshToken);
                context.customer.set(res.data.customer);
            }
            changeLoad(false);
            close();
        } catch(err){
            setInfo(null);
            chErr('Ошибка авторизации!');
            changeLoad(false);
        }
    }
    return(
        <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
            <div className="modal-body">
                <table className="table table-borderless">
                    <tbody>
                        <tr>
                            <td><span className="input-group-text">Email</span></td>
                            <td>
                                <input type="text" className="form-control" placeholder="example@mail.ru" 
                                // aria-label="Username" aria-describedby="basic-addon1"
                                onChange={handleEmail}
                                value={email}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><span className="input-group-text">Пароль</span></td>
                            <td>
                                <input type="password" className="form-control" placeholder="*****" 
                                // aria-label="Password" aria-describedby="basic-addon1"
                                onChange={handlePassword}
                                value={password}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="modal-footer">
                {err?<div className="alert alert-danger" role="alert">
                    {err}
                </div>:null}
                {info?<div className="alert alert-success" role="alert">
                    {info}
                </div>:null}
                <button type="button" className="btn btn-primary" onClick={login} 
                style={{
                    position:'relative',
                    width:'62px',
                    height:'40px'
                    }}>
                    {load?<img src="/load.gif" alt="" style={loadStyle}></img>:'Вход'}
                </button>
            </div>
        </div>
    )
}

const loadStyle = {
    height: '20px',
}

export default FormLogin;