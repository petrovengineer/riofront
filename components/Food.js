import React, {useContext, useEffect, useState, useRef}  from 'react';
import noimage from '../imgs/noimage.png';
import {AppContext} from '../context';
import DropCheck from '../components/DropCheck';
import {equalArrObj} from '../usefull';
import Select from './Select';

const Food = ({food, param, showParam, ingredients, handleParam})=>{
    const [info, showInfo] = useState([]);
    const [drop, setDrop] = useState(true);
    const {cart} = useContext(AppContext);
    const [amount, setAmount] = useState(0);
    const [ings, setIngs] = useState([]);
    const [selected, setSelected] = useState(food.params.map(p=>({_id:p._id, name: p.list[0].name, coast: p.list[0].coast, pname: p.name})));
    useEffect(()=>{
        // console.log(food);
    }, [])
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
    useEffect(()=>{
        if(param==false || param==null){
            setIngs([]);
            setSelected(food.params.map(p=>({_id:p._id, name: p.list[0].name, coast: p.list[0].coast, pname: p.name})));
        }
    }, [param])

    const addToCart = (id)=>{
        setTimeout(()=>{ showParam(null);}, 1000);
        let index = -1;
        const test = cart.get.find((c, i)=>{
            if (c.food._id == food._id){
            if(equalArrObj(c.ings, ings, '_id') && equalArrObj(c.selected, selected, 'name')){
                    index = i
                    return true;
                }
            }
            return false;
        });
        if(index>-1){
            const updated = [...cart.get];
            updated[index] = {food, count: cart.get[index].count+1, ings, selected, coast: amount}
            cart.set([...updated]);
        }else{
            cart.set([...cart.get, {food, count: 1, ings, selected:[...selected], coast: amount}]);
        }
        showInfo([...info, id]);
        setTimeout(()=>{
            const newInfo = [...info];
            newInfo.splice(newInfo.indexOf(id), 2);
            showInfo(newInfo);
        }, 1000);
    }
    
    return(
            <div className="food p-2 d-flex flex-column justify-content-between" style={{position:'relative'}}>
                <div className="d-flex flex-row justify-content-center" style={{alignItems:'center'}}>
                    {!param?
                    <>
                        <div className="w-25"></div>
                        <img alt="" className={!param?'animate__animated animate__fadeIn':''}
                            src={food.img.data==null?noimage:`data:image/jpeg;base64,${food.img.data}`}
                        />
                        <div className="w-25"></div>
                    </>
                    :null}
                </div>
                <div id={'detail'+food._id}>
                    <p className="name mt-4 mb-2" style={{fontSize: '18px', fontFamily: 'Rounds'}}>{food.name}</p>
                    {(!drop&&param)||!param?
                    <>
                        <p className="eng mb-0" >
                            {food.composition} 
                        </p>
                        <p className="food-weight mb-0" >
                        {food.weight!=0?
                            <>Вес: {food.weight} гр.</>
                        :null}</p>
                    </>
                    :null}
                    {param&&drop?
                    <div className="d-flex flex-column mb-3">
                        {food.avIngTypes.map(type=>(
                            <div class="btn-group dropright">
                            <div class="p-2 dropdown-toggle" 
                            style={{cursor:'pointer'}}
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {type.name}
                            </div>
                            <div class="dropdown-menu">
                                <DropCheck
                                    // ings={ings}
                                    setIngs={setIngs}
                                    item={[]}
                                    // filter={[type._id]} 
                                    actions={
                                        ({ingredients})=>{
                                        change({_id:food._id, ingredients})}
                                    } 
                                    vars={food.ingredients.filter(i=>i.type?i.type._id==type._id:false)} 
                                    k1='ingredients'
                                    close={()=>setDrop(false)}
                                />
                                {/* <a class="dropdown-item" href="#">Action</a> */}
                            </div>
                            </div>
                        ))
                    }</div>:null}
                    <div>
                        {food.params&&param?food.params.map((p)=>{
                            return (
                                <div 
                                key={p._id}>
                                <Param param={p} selected={selected} setSelected={setSelected}/>
                                </div>
                            )
                        }):null}
                    </div>
                </div>
                <div className="d-flex justify-content-between flex-column">
                    {info.indexOf(food._id)>=0?<div 
                    className="alert alert-success mt-2 animate__animated animate__bounceIn" 
                    id={food._id}
                    role="alert">
                        Товар добавлен
                    </div>:''}
                    <hr style={{width:'100%'}}/>
                    <div className="d-flex justify-content-between w-100 pl-2 pr-2 pb-1">
                        <div className="price">{amount} руб</div>
                        {param?
                            <span className="btn"
                                onClick={()=>{addToCart(food._id);}}
                            >Заказать</span>
                        :
                            <span className="btn param-btn"
                                id={food._id}
                                onClick={()=>{
                                    showParam(food._id)
                                }}
                            >Выбрать</span>
                        } 
                    </div>
                </div>  
            </div>
    )
}

const Param = ({param, selected, setSelected})=>{
    // const [select, setSelect] = useState(param.list[0].name);
    const [select, setSelect] = useState(selected.find(s=>s._id==param._id).name);
    return (
        <div className="d-flex mb-1">
            <div className="w-50 d-flex ">
                {param.name}
            </div>
            <div className="d-flex flex-column">
                {param.list.map((l)=>(
                    <div key={l._id}
                    className={'p-1 rounded'} 
                    onClick={()=>{
                            const newSelected = [...selected];
                            setSelected(newSelected.map((s)=>{
                                const newS = Object.assign({}, s);
                                if(s._id==param._id){
                                    newS.pname = param.name;
                                    newS.name = l.name;
                                    newS.coast = l.coast;
                                    setSelect(l.name);
                                }
                                return newS;
                            }))
                        }
                    }
                    // onClick={()=>{setSelect(l.name)}}
                    style={l.name==select?{background:'#1964B0', color: 'white'}:{cursor:'pointer'}}
                    >{l.name}</div>
                ))}
            </div>
        </div>
    )
}

export default Food;