import React, {useState} from 'react';
import axios from 'axios';

const FormReg = ()=>{
    const [email, setEmail] = useState('0424342@mail.ru');
    const [password1, setPassword1] = useState('1212');
    const [password2, setPassword2] = useState('1212');
    const [name, setName] = useState('Igor');
    const [phone, setPhone] = useState('+79111231212');
    const [address, setAddress] = useState('Moscow');
    const [load, setLoad] = useState(false);
    const [err, setErr] = useState(null);
    const [info, setInfo] = useState(null);
    const handleEmail = (e)=>{
        setEmail(e.currentTarget.value);
    }
    const handlePassword1 = (e)=>{
        setPassword1(e.currentTarget.value);
    }
    const handlePassword2 = (e)=>{
        setPassword2(e.currentTarget.value);
    }
    const handleName = (e)=>{
        setName(e.currentTarget.value);
    }
    const handlePhone = (e)=>{
        setPhone(e.currentTarget.value);
    }
    const handleAddress = (e)=>{
        setAddress(e.currentTarget.value);
    }
    const reg = async ()=>{
        try{
            setErr(null);
            setInfo(null);
            setLoad(true);
            if(password1!==password2){
                setErr('Пароли не совпадают!');
                return;
            }
            await axios.post(process.env.NEXT_PUBLIC_API+'/auth/reg',{email, password: password1, name, phone, address});
            setLoad(false);
            setEmail(''); setPassword1(''); setPassword2(''); setName(''); setPhone(''); setAddress('');
            setInfo('Вы успешно зарегистрировались! Проверьте почту, что бы подтвердить аккаунт.');
        }catch(err){
            setLoad(false);
            setErr('Ошибка регистрации!');
        }
    }
    return(
        <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
            <div className="modal-body">
                <table className="table table-borderless">
                    <tbody>
                        <tr>
                            <td><span className="input-group-text" id="basic-addon1">Email</span></td>
                            <td><input type="text" className="form-control" placeholder="example@mail.ru" 
                                onChange={handleEmail} value={email}/></td>
                        </tr>
                        <tr>
                            <td><span className="input-group-text" id="basic-addon1">Пароль</span></td>
                            <td><input type="password" className="form-control" placeholder="*******"
                                onChange={handlePassword1} value={password1}/></td>
                        </tr>
                        <tr>
                            <td><span className="input-group-text" id="basic-addon1">Повторите пароль</span></td>
                            <td><input type="password" className="form-control" placeholder="*******"
                                onChange={handlePassword2} value={password2}/></td>
                        </tr>
                        <tr>
                            <td><span className="input-group-text" id="basic-addon1">Имя</span></td>
                            <td><input type="text" className="form-control" placeholder="Иван"
                                onChange={handleName} value={name}/></td>
                        </tr>
                        <tr>
                            <td><span className="input-group-text" id="basic-addon1">Телефон для связи</span></td>
                            <td> <input type="text" className="form-control" placeholder="+79011231212"
                                onChange={handlePhone} value={phone}/></td>
                        </tr>
                        <tr>
                            <td><span className="input-group-text" id="basic-addon1">Адрес доставки</span></td>
                            <td><input type="text" className="form-control" placeholder="г. Чехов, пр. Победы, д. 20"
                                onChange={handleAddress} value={address}/></td>
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
                <button type="button" 
                onClick={reg}
                style={{
                    position:'relative',
                    width:'180px',
                    height:'40px'
                    }}
                className="btn btn-primary">
                    {load?<img src="/load.gif" alt="" style={loadStyle}></img>:'Зарегистрироваться'}
                </button>
            </div>
        </div>
    )
}

const loadStyle = {
    height: '20px',
}

export default FormReg;