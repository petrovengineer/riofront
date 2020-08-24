import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import {AppContext} from '../context';

const FormLogin = ({close, activate})=>{
    const [phone, changePhone] = useState('');
    const [password, changePassword] = useState('');
    const [load, changeLoad] = useState(false);
    const [info, setInfo] = useState(null);
    const [err, chErr] = useState(null);
    const context = useContext(AppContext);
    useEffect(()=>{
        if(activate){setInfo('Активация прошла успешно!')}
    }, [activate])
    const handlePhone = (e)=>{
        changePhone(e.currentTarget.value);
    }
    const handlePassword = (e)=>{
        changePassword(e.currentTarget.value);
    }
    const login = async ()=>{
        try{
            chErr(null);
            setInfo(null);
            let re = /\+(\b7\d{10}\b)/;
            var valid = re.test(phone);
            if(!valid){
                chErr('Неверный формат телефона!');
                return;
            }
            changeLoad(true);
            const res = await axios.post(process.env.NEXT_PUBLIC_API+'/auth/login', {phone, password});
            if(res.data.accessToken!=null && res.data.refreshToken!=null){
                context.accessToken.set(res.data.accessToken);
                context.refreshToken.set(res.data.refreshToken);
                context.customer.set(res.data.customer);
            }
            changeLoad(false);
            close();
        } catch(err){
            console.log(err)
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
                            <td><span className="input-group-text">Номер телефона</span></td>
                            <td>
                                <input type="text" className="form-control" placeholder="+79991112233" 
                                // aria-label="Username" aria-describedby="basic-addon1"
                                onChange={handlePhone}
                                value={phone}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><span className="input-group-text">Пароль</span></td>
                            <td>
                                <input type="password" className="form-control"
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