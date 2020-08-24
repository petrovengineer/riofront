import React, {useState} from 'react';
import axios from 'axios';

const FormReg = ()=>{
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
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
            let re = /\+(\b7\d{10}\b)/;
            var valid = re.test(phone);
            if(!valid){
                setErr('Неверный формат телефона!');
                return;
            }
            if(password1!==password2){
                setErr('Пароли не совпадают!');
                return;
            }
            if(name==''){
                setErr('Имя не должно быть пустым!');
                return;
            }
            setLoad(true);
            await axios.post(process.env.NEXT_PUBLIC_API+'/auth/reg',{password: password1, name, phone});
            setLoad(false);
            setEmail(''); setPassword1(''); setPassword2(''); setName(''); setPhone(''); setAddress('');
            setInfo('Вы успешно зарегистрировались!');
        }catch(err){
            setLoad(false);
            setErr('Ошибка регистрации! Возможно номер уже зарегистрирован...');
        }
    }
    return(
        <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
            <div className="modal-body">
                <table className="table table-borderless">
                    <tbody>
                        {/* <tr>
                            <td><span className="input-group-text" id="basic-addon1">Email</span></td>
                            <td><input type="text" className="form-control" placeholder="example@mail.ru" 
                                onChange={handleEmail} value={email}/></td>
                        </tr> */}
                        <tr>
                            <td><span className="input-group-text" id="basic-addon1">Имя</span></td>
                            <td><input type="text" className="form-control" 
                                onChange={handleName} value={name}/></td>
                        </tr>
                        <tr>
                            <td><span className="input-group-text" id="basic-addon1">Телефон</span></td>
                            <td> <input type="text" className="form-control" placeholder="+79991112233"
                                onChange={handlePhone} value={phone}/></td>
                        </tr>
                        <tr>
                            <td><span className="input-group-text" id="basic-addon1">Пароль</span></td>
                            <td><input type="password" className="form-control" 
                                onChange={handlePassword1} value={password1}/></td>
                        </tr>
                        <tr>
                            <td><span className="input-group-text" id="basic-addon1">Повторите пароль</span></td>
                            <td><input type="password" className="form-control" 
                                onChange={handlePassword2} value={password2}/></td>
                        </tr>
                        {/* <tr>
                            <td><span className="input-group-text" id="basic-addon1">Адрес доставки</span></td>
                            <td><input type="text" className="form-control" placeholder="г. Чехов, пр. Победы, д. 20"
                                onChange={handleAddress} value={address}/></td>
                        </tr> */}
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