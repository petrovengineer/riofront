import React, {useContext, useEffect, useState, useRef}  from 'react';
import noimage from '../imgs/noimage.png';
import {AppContext} from '../context';
import DropCheck from '../components/DropCheck';
import {equalArrObj} from '../usefull';

const Food = ({food, param, showParam, ingredients, handleParam})=>{
    const [info, showInfo] = useState([]);
    const [drop, setDrop] = useState(true);
    const {cart} = useContext(AppContext);
    const [amount, setAmount] = useState(0);
    const [ings, setIngs] = useState([]);
    const [selected, setSelected] = useState(food.params.map(p=>({_id:p._id, name: p.list[0].name, coast: p.list[0].coast, pname: p.name})));
    useEffect(()=>{
        console.log(selected);
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
            <div className="food p-2" style={{position:'relative'}}>
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
                    <p className="name mt-4" style={{fontSize: '18px', fontFamily: 'Rounds'}}>{food.name}</p>
                    {(!drop&&param)||!param?
                    <>
                        <p className="eng" >
                            {/* {ings.map((i)=>' '+i.name)}  */}
                            {food.composition} 
                        </p>
                        {food.weight!=0?<p className="food-weight" >
                            {/* {ings.map((i)=>' '+i.name)}  */}
                            Вес: {food.weight} гр.
                        </p>:null}
                    </>
                    :null}
                    {param&&drop?
                        <div>
                            <DropCheck
                                ings={ings}
                                setIngs={setIngs}
                                item={[]}
                                // filter={} 
                                actions={
                                    ({ingredients})=>{
                                    change({_id:food._id, ingredients})}
                                } 
                                vars={food.ingredients} 
                                k1='ingredients'
                                close={()=>setDrop(false)}
                            />
                        </div>:null}
                    <div>
                        {food.params&&param?food.params.map((p)=>{
                            return (
                                <div 
                                // className={param?'animate__animated animate__fadeIn animate__faster':''} 
                                key={p._id}>
                                <Param param={p} selected={selected} setSelected={setSelected}/>
                                </div>
                            )
                        }):null}
                    </div>
                    <div style={{height:'66px', width:'100%'}}></div>
                </div>
                <div className="d-flex justify-content-between flex-column" style={{position:'absolute', bottom:'24px', width:'calc(100% - 48px)'}}>
                    {info.indexOf(food._id)>=0?<div 
                    className="alert alert-success mt-2 animate__animated animate__bounceIn" 
                    id={food._id}
                    style={{position:'absolute', bottom:'60px', left:'0px', width:'calc(100% - 0px)', background:'#1964B0', color:'white'}}
                    role="alert">
                        Товар добавлен
                    </div>:''}
                    <hr style={{width:'100%'}}/>
                    <div className="d-flex justify-content-between w-100">
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