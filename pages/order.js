import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import {AppContext} from '../context';
import { useContext } from 'react';
import Layout from '../components/layout';
import {fetch} from '../usefull';
import FoodOrder from '../components/FoodOrder';
import FoodOrderCart from '../components/FoodOrderCart';
const loadGif = require('../imgs/load.gif');

const Order = ()=>{
    const {cart = {get:[]}, customer} = useContext(AppContext);
    const [err, setErr] = useState(false);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('test');
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
        if(customer!=null && customer.get!=null){
            setName(customer.get.name);
            setPhone(customer.get.phone);
            if(customer.get.address!=null)setAddress(customer.get.address);
            if(customer.get.apnumber!=null)setApnumber(customer.get.apnumber);
            if(customer.get.floor!=null)setFloor(customer.get.floor);
        }
    }, [customer])
    const makeOrder = async ()=>{
        try{
            let re = /^\+(7\d{10})$/;
            var valid = re.test(phone);
            if(!valid){
                setErr('Неверный формат телефона! ');
                return;
            }
            if(name==''){
                setErr('Имя не должно быть пустым!');
                return;
            }
            if(address==''){
                setErr('Адрес не должен быть пустым!');
                return;
            }
            if(cart.get.length==0){
                setErr('Корзина не должна быть пустой!');
                return;
            }
            setLoad(true);
            const newCart = cart.get.map(item=>(
                {
                    food: item.food._id, 
                    count: item.count,
                    coast: item.coast,
                    ingredients: item.ings.map(i=>(i._id)),
                    selected: item.selected.map(s=>({_id:s._id, name: s.name, pname: s.pname}))
                }
            ))
            const payload = {
                cart: newCart, 
                name, 
                phone, 
                address, 
                apnumber, 
                floor, 
                comment
            }
            var newOrder = await fetch(
                {
                    query: 'mutation MakeOrder($input:OrderInputType){makeOrder(input:$input){_id number cart{food{name composition coast} ingredients{name coast} selected{name pname coast} coast count}}}',
                    variables:{input: payload},
                });
            setLoad(false);
            cart.set([]);
            setOrder(newOrder.data.data.makeOrder);
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
            <Layout foodtypes={[]} menu={false} home={true}>
            <div className="container-xl">
                {complite?
                <div className="row paper m-2">
                    <h4 className="pl-4 pt-4" style={{color: 'green'}}>Заказ успешно оформлен! Номер заказа: {order.number}
                    </h4>
                    {cart.get!=null?order.cart.map((item)=>(
                            <FoodOrder item={item} key={item._id}/>
                    )):null}
                    <div style={{borderTop:'1px solid #e1e1e1'}}
                    className="d-flex w-100 align-items-center justify-content-end p-3">
                        <h4 className="order-amount">Итого: {order.cart.length>0?order.cart.map((g)=>g.coast*g.count).reduce((a, v)=>a+v):0} руб
                        </h4>
                    </div>
                </div>
                :<><div className="row paper m-2">
                    <h4 className="pl-3 pt-3">Корзина</h4>
                    {cart.get!=null?cart.get.map((item, i)=>(
                            <FoodOrderCart item={item} key={item.food._id} i={i}/>
                    )):null}
                    <div style={{borderTop:'1px solid #e1e1e1'}}
                    className="d-flex w-100 align-items-center justify-content-end p-3">
                        <h4 className="order-amount">Итого: 
                        {cart.get!=null?cart.get.length>0?cart.get.map((g)=>g.coast*g.count).reduce((a, v)=>a+v):0:null} руб
                        </h4>
                    </div>
                </div>
                <div className="row paper m-2 row">
                    <h4 className="pl-3 pt-3 w-100">Контактная информация</h4>
                    <div className="form-group col-12 col-sm-6">
                        <label >Имя*</label>
                        <input type="text"
                        onChange={handleName} 
                        value={name}
                        className="form-control" aria-describedby="emailHelp"/>
                    </div>
                    <div className="form-group col-12 col-sm-6">
                        <label >Номер телефона*</label>
                        <input type="text" 
                        onChange={handlePhone} 
                        value={phone}
                        placeholder="+79991112233"
                        className="form-control" aria-describedby="emailHelp"/>
                    </div>
                </div>
                <div className="row paper m-2 row">
                    <h4 className="pl-3 pt-3 w-100">Доставка</h4>
                    <div className="form-group col-12">
                        <label >Адрес*</label>
                        <input type="text" 
                        onChange={handleAddress} 
                        value={address}
                        className="form-control" aria-describedby="emailHelp"/>
                    </div>
                    <div className="form-group col-12 col-sm-6">
                        <label >Квартира / Офис*</label>
                        <input type="text" 
                        onChange={handleApnumber} value={apnumber}
                        className="form-control" aria-describedby="emailHelp"/>
                    </div>
                    <div className="form-group col-12 col-sm-6">
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
                    <label className="p-3" htmlFor="cash">Наличными</label>
                    <input 
                    onChange={handlePay}
                    checked={pay=='card'?true:false}
                    className="custom-radio" name="color" type="radio" id="card" value="card"/>
                    <label htmlFor="card">Картой</label>
                    <div className="form-group col-12">
                        <label htmlFor="exampleInputEmail1">Комментарий*</label>
                        <input type="email" 
                        onChange={handleComment} value={comment}
                        className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                    </div>
                    {err?<div className="alert alert-danger w-100 m-2" role="alert">
                        {err}
                    </div>:null}
                    <div className="d-flex justify-content-end w-100 mb-3 mr-3">
                        <span 
                        style={{width:'125px', height:'45px'}}
                        onClick={makeOrder}
                        className="btn cart-btn p-2 float-right">
                        {load?<img src={loadGif} alt="" style={{height:'30px', width:'30px'}}></img>:'Заказать'}    
                        </span>
                    </div>
                </div>
                </>}</div>
            </Layout>
        </>
    )
}

export default Order;
