import React, { useEffect, useContext, useState } from 'react';
import Layout from '../components/layout';
import {fetch} from '../usefull';
import noimage from '../imgs/noimage.png';
import {AppContext} from '../context';
import Link from 'next/link';
import axios from 'axios';
import FoodOrder from '../components/FoodOrder'

export default ({foodtypes})=>{
    const {customer, ingredients, accessToken} = useContext(AppContext);
    const [orders, setOrders] = useState([]);
    const [load, setLoad] = useState(false);
    const fetchData = async ()=>{
        try{
            setLoad(true);
            var orders = await fetch(
                {
                  query: "{orders{_id number cart{food{_id name img{data} coast} count}}}",
                  variables:null,
                });
            setOrders(orders.data.data.orders);
            setLoad(false);
        }catch(err){
            setLoad(false);
            console.log(err);
        }
    }
    useEffect(()=>{
        if(accessToken!=null){
            axios.defaults.baseURL = process.env.API;
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken.get;
            axios.defaults.headers.post['Content-Type'] = 'application/json';
            fetchData();
        }
    }, [accessToken])
    return(
        <>
            <Layout foodtypes={[]} menu={false} home={true}>
            <div className="container-xl">
                {load?<h3>Загрузка...</h3>:<>
                {orders.length==0 && load==false?
                <div className="row mt-4">
                    <h4 className="p-3">У вас пока нет ни одного заказа...</h4>
                    <Link href="/">
                            <span className="btn cart-btn p-2 m-3 float-left" style={{width:'155px', height:'45px'}}>На главную</span>
                    </Link>
                </div>
                :null}</>}
                {orders.map((order)=>{
                    return(
                        <div className="row paper m-2">
                            <h4 className="pl-3 pt-3 w-100">
                                Номер заказа: {order.number}
                            </h4>
                            <h6 className="pl-3 pt-1">
                            Статус: {order.status==0?'ожидает подтверждения'
                                :order.status==1?'готовится':order.status==2?'передан курьеру':'выполнен'}
                            </h6>
                            {order.cart.map((item)=>(
                                    <FoodOrder item={item} key={item.food._id} ingredients={ingredients}/>
                            ))}
                            <div style={{borderTop:'1px solid #e1e1e1'}}
                            className="d-flex w-100 align-items-center justify-content-end p-3">
                                <h4 className="order-amount">Итого: {order.cart.length>0?order.cart.map((g)=>g.food.coast*g.count).reduce((a, v)=>a+v):0} руб
                                </h4>
                            </div>
                        </div>
                    )
                })}
            </div>
            </Layout>
        </>
    )
}

export async function getStaticProps(){
    try{
      const ftdata = await fetch({ query: '{foodtypes{_id name}}', variables: null });
      const foodtypes = ftdata.data.data.foodtypes;
      return {
        props: {foodtypes}
      }
    }
    catch(err){
      console.log(err);
    }
  }