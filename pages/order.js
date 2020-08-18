import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import noimage from '../imgs/noimage.png';
import {AppContext} from '../context';
import { useContext } from 'react';
import Close from '../imgs/svg/close.svg';
import Layout from '../components/layout';

const Order = ()=>{
    const {cart, customer} = useContext(AppContext);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [apnumber, setApnumber] = useState('');
    const [floor, setFloor] = useState('');
    const [pay, setPay] = useState('cash');
    const [comment, setComment] = useState('');
    const [load, setLoad] = useState(false);
    const [complite, setComplite] = useState(false);
    const [order, setOrder] = useState(null);
    const handleName = (e)=>{
        setName(e.currentTarget.value);
    }
    const handlePhone = (e)=>{
        setPhone(e.currentTarget.value);
    }
    const handleAddress = (e)=>{
        setAddress(e.currentTarget.value);
    }
    const handleApnumber = (e)=>{
        setApnumber(e.currentTarget.value);
    }
    const handleFloor = (e)=>{
        setFloor(e.currentTarget.value);
    }
    const handlePay = (e)=>{
        setPay(e.currentTarget.value);
    }
    const handleComment = (e)=>{
        setComment(e.currentTarget.value);
    }
    useEffect(()=>{
        if(customer!=null){
            setName(customer.get.name);
            setPhone(customer.get.phone);
            if(customer.get.address!=null)setAddress(customer.get.address);
            if(customer.get.apnumber!=null)setApnumber(customer.get.apnumber);
            if(customer.get.floor!=null)setFloor(customer.get.floor);
        }
    }, [customer])
    const makeOrder = async ()=>{
        try{
            setLoad(true);
            const newCart = cart.get.map(item=>(
                {food: item.food._id, count: item.count}
            ))
            const payload = {cart: newCart, name, phone, 
                email, address, apnumber, floor, comment}
            const {data} = await axios.post('/order', payload)
            setLoad(false);
            console.log(data);
            if(customer.get==null)customer.set({_id:data.customer});
            cart.set([]);
            setOrder(data);
            setComplite(true);
        }catch(err){
            setLoad(false);

            console.log(err);
        }
    }
    return (
        <>
            <Head>
                <title>Rio Pizza</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout foodtypes={[]}>
            <div className="container-xl">
                {complite?
                <div className="row paper m-2">
                    <h4 className="pl-3 pt-3" style={{color: 'green'}}>Заказ успешно оформлен! Номер заказа: {order.number}</h4>
                    {cart.get!=null?order.cart.map((item)=>(
                        <div key={item._id} className="col-12 pt-3 pb-3 d-flex align-items-center">
                            <FoodOrder item={item} key={item.food._id} ingredients={ingredients}/>
                        </div>
                    )):null}
                    <div style={{borderTop:'1px solid #e1e1e1'}}
                    className="d-flex w-100 align-items-center justify-content-end p-3">
                        <h4 className="order-amount">Итого: {order.cart.length>0?order.cart.map((g)=>g.food.coast*g.count).reduce((a, v)=>a+v):0} руб
                        </h4>
                    </div>
                </div>
                :<><div className="row paper m-2">
                    <h4 className="pl-3 pt-3">Корзина</h4>
                    {cart.get!=null?cart.get.map((item)=>(
                        <div key={item._id} className="col-12 pt-3 pb-3 d-flex align-items-center">
                            <Food item={item} key={item.food._id}/>
                        </div>
                    )):null}
                    <div style={{borderTop:'1px solid #e1e1e1'}}
                    className="d-flex w-100 align-items-center justify-content-end p-3">
                        <h4 className="order-amount">Итого: 
                        {cart.get!=null?cart.get.length>0?cart.get.map((g)=>g.food.coast*g.count).reduce((a, v)=>a+v):0:null} руб
                        </h4>
                    </div>
                </div>
                <div className="row paper m-2 row">
                    <h4 className="pl-3 pt-3 w-100">Контактная информация</h4>
                    <div class="form-group col-6">
                        <label >Имя*</label>
                        <input type="text"
                        // defaultValue={customer?customer.name:''}
                        onChange={handleName} 
                        value={name}
                        className="form-control" aria-describedby="emailHelp"/>
                    </div>
                    <div class="form-group col-6">
                        <label >Номер телефона*</label>
                        <input type="text" 
                        onChange={handlePhone} 
                        value={phone}
                        className="form-control" aria-describedby="emailHelp"/>
                    </div>
                </div>
                <div className="row paper m-2 row">
                    <h4 className="pl-3 pt-3 w-100">Доставка</h4>
                    <div class="form-group col-12">
                        <label >Адрес*</label>
                        <input type="text" 
                        onChange={handleAddress} 
                        value={address}
                        className="form-control" aria-describedby="emailHelp"/>
                    </div>
                    <div class="form-group col-6">
                        <label >Квартира / Офис*</label>
                        <input type="text" 
                        onChange={handleApnumber} value={apnumber}
                        className="form-control" aria-describedby="emailHelp"/>
                    </div>
                    <div class="form-group col-6">
                        <label >Этаж*</label>
                        <input type="text" 
                        onChange={handleFloor} value={floor}
                        className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                    </div>
                </div>
                <div className="row paper m-2 row">
                    <h4 className="pl-3 pt-3 w-100">Оплата</h4>
                    <input 
                    onChange={handlePay}
                    checked={pay=='cash'?true:false}
                    className="custom-radio" name="color" type="radio" id="cash" value="cash"/>
                    <label className="p-3" for="cash">Наличными</label>
                    <input 
                    onChange={handlePay}
                    checked={pay=='card'?true:false}
                    className="custom-radio" name="color" type="radio" id="card" value="card"/>
                    <label for="card">Картой</label>
                    <div class="form-group col-12">
                        <label for="exampleInputEmail1">Комментарий*</label>
                        <input type="email" 
                        onChange={handleComment} value={comment}
                        className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                    </div>
                    <div className="d-flex justify-content-end w-100 mb-3 mr-3">
                        <span 
                        style={{width:'125px', height:'45px'}}
                        onClick={makeOrder}
                        className="btn cart-btn p-2 float-right">
                        {load?<img src="./load.gif" alt="" style={{height:'30px'}}></img>:'Заказать'}    
                        </span>
                    </div>
                </div>
                </>}</div>
            </Layout>
        </>
    )
}

const Food = ({item, ingredients})=>{
    return (
        <>
            <img src={item.food.img==null?noimage:`data:image/jpeg;base64,${item.food.img.data}`}/>
            <div className="flex-grow-1 p-3 d-flex flex-column">
                <h5>{item.food.name}</h5>
                <div className="d-flex">
                Состав: {item.food.ingredients.map((i)=>{
                    return (
                        <>{i.name }</>
                    )
                })}
                </div>
            </div>
            <span className="p-3">
                <div className="plus-minus mr-1"
                    // onClick={()=>{
                    //     const updated = [...cart.get];
                    //     if(cart.get[i].count==1){
                    //         updated.splice(i, 1);
                    //     }else{
                    //         updated[i] = {food: good.food, count: cart.get[i].count-1}
                    //     }
                    //     cart.set([...updated]);
                    // }}
                >-</div> 
                    {item.count} шт
                <div className="plus-minus ml-1 mr-1"
                    // onClick={()=>{
                    //     const updated = [...cart.get];
                    //     updated[i] = {food: good.food, count: cart.get[i].count+1}
                    //     cart.set([...updated]);
                    // }}
                >+</div>
            </span>
            <div className="p-3">{item.food.coast} руб</div>
            <span style={{cursor:"pointer"}} className="p-3"
            // onClick={
            //     ()=>{
            //         const cartIds = cart.get.map((item)=>(item._id));
            //         const index = cartIds.indexOf(good.food._id);
            //         const newCart = [...cart.get];
            //         newCart.splice(index, 1);
            //         cart.set(newCart);
            //     }
            // }
            >
                <Close height="10" width="10" className="svg-img-del"/>
            </span>
        </>
    )
}

const FoodOrder = ({item, ingredients})=>{
    return (
        <>
            <img src={item.food.img==null?noimage:`data:image/jpeg;base64,${item.food.img.data.data}`}/>
            <div className="flex-grow-1 p-3 d-flex flex-column">
                <h5>{item.food.name}</h5>
            </div>
            <span className="p-3">
                    {item.count} шт
            </span>
            <div className="p-3">{item.food.coast} руб</div>
        </>
    )
}

export default Order;
