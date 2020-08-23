import React, {useContext, useEffect, useState}  from 'react';
import noimage from '../imgs/noimage.png';
import {AppContext} from '../context';
import DropCheck from '../components/DropCheck';

const Food = ({food, param, showParam, ingredients})=>{
    const [info, showInfo] = useState([]);
    const [drop, setDrop] = useState(true);
    const {cart} = useContext(AppContext);
    const [amount, setAmount] = useState(0);
    const [ings, setIngs] = useState(food.ingredients);
    const [selected, setSelected] = useState(food.params.map(p=>({_id:p._id, name: p.list[0].name, coast: p.list[0].coast})));
    // useEffect(()=>{
    //     console.log("SELECTED", selected);
    // }, [selected])
    useEffect(()=>{
        const ingamount = ings.reduce(
            (prev, i)=>{
                return prev+i.coast;
            },0)
        const pamount = selected.reduce(
            (prev, p)=>{
                return prev+p.coast;
            },0)
        setAmount(food.coast+ingamount + pamount);
    }, [ings, selected])
    const addToCart = (id)=>{
        showParam(null);
        const index = cart.get.map((g)=>g.food._id).indexOf(food._id);
        if(index>-1){
            const updated = [...cart.get];
            updated[index] = {food, count: cart.get[index].count+1}
            cart.set([...updated]);
        }else{
            cart.set([...cart.get, {food, count: 1}]);
        }
        showInfo([...info, id]);
        setTimeout(()=>{
            const el = document.getElementById(id);
            if(el!=null){document.getElementById(id).classList.add("animate__fadeOut")}else {return}
            const newInfo = [...info];
            newInfo.splice(newInfo.indexOf(id), 2);
            setTimeout(()=>showInfo(newInfo), 1000);
        }, 1500);
    }
    return(
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 p-2">
            <div className=" food p-3" id={food._id}>
                <img alt=""
                style={{borderRadius:'5px'}} 
                src={food.img.data==null?noimage:`data:image/jpeg;base64,${food.img.data}`}/>
                <div className="detail">
                    <p className="name mt-4">{food.name}</p>
                    {(!drop&&param)||!param?<p className="eng" 
                    style={{minHeight:'35px'}}
                    >
                        {food.ingredients.map((i)=>' '+i.name)} 
                    </p>:null}
                    {/* {param&&food.ingredients!=null&&food.ingredients.length>0?<div onClick={()=>setDrop(!drop)} className="mb-3"
                    style={{cursor:'pointer'}}
                    >Изменить ингредиенты</div>:null} */}
                    {param&&drop?<DropCheck
                            ings={ings}
                            setIngs={setIngs}
                            item={food.ingredients.map(i=>i._id)}
                            filter={food.avIngTypes.map(a=>a._id)} 
                            actions={
                                ({ingredients})=>{
                                change({_id:food._id, ingredients})}
                            } 
                            vars={ingredients} 
                            k1='ingredients'
                            close={()=>setDrop(false)}
                        />:null}
                    <div>
                        {food.params&&param?food.params.map((p)=>{
                            return (
                                <Param param={p} selected={selected} setSelected={setSelected}/>
                            )
                        }):null}
                    </div>
                    <hr/>
                    {info.indexOf(food._id)>=0?<div className="alert alert-success mt-2 animate__animated animate__bounceIn" 
                    id={food._id}
                    style={{position:'absolute', bottom:'152px', left:'8px', width:'calc(100% - 16px)'}}
                    role="alert">
                        Товар добавлен
                    </div>:''}
                    <div className="d-flex justify-content-between">
                        <span className="price">{amount} руб</span>
                        {/* <span className="price">{food.coast} руб</span> */}
                        {param?null:<div className="d-flex justify-content-between">
                            <span className="btn"
                                id={food._id}
                                onClick={()=>{showParam(food._id)}}
                            >Выбрать</span>
                        </div>} 
                        {param?<div className="d-flex justify-content-between">
                            <span className="btn"
                                onClick={()=>addToCart(food._id)}
                            >Заказать</span>
                        </div>:null}
                    </div>              
                </div>
            </div>
        </div>
    )
}

const Param = ({param, selected, setSelected})=>{
    const [select, setSelect] = useState(param.list[0].name);
    return (
        <div className="d-flex mb-1">
            <div className="w-50 d-flex ">
                {param.name}
            </div>
            <div className="d-flex flex-column">
                {param.list.map((l)=>(
                    <div
                    className={'p-1 rounded'} 
                    onClick={()=>{
                        setSelected(selected.map((s)=>{
                            if(s._id==param._id){
                                s.name = l.name;
                                s.coast = l.coast;
                                setSelect(l.name);
                            }
                            return s;
                        }))}
                    }
                    // onClick={()=>{setSelect(l.name)}}
                    style={l.name==select?{background:'blue', color: 'white'}:{cursor:'pointer'}}
                    >{l.name}</div>
                ))}
            </div>
        </div>
    )
}

export default Food;