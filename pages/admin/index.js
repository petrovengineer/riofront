import React, { useEffect, useContext } from 'react';
import Stat from './Stat';
import Food from './food';
// import Users from './Users';
import Layout from '../../components/admin/Layout';
import axios from 'axios'
import {AppContext} from '../../context';
// import FoodTypes from './FoodTypes'
// import Food from './Food'
// import IngTypes from './IngTypes'
// import Orders from './Orders'
// import Ingredients from './Ingredients'
// import Changes from './Changes'
// import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
// import Customers from './Customers';

export default ()=>{
    // const {accessToken} = useContext(AppContext);
    useEffect(()=>{
        // if(accessToken!=null){
            // console.log(accessToken);
            // axios.defaults.baseURL = process.env.NEXT_PUBLIC_OLD_API;
            // axios.defaults.headers.common['Authorization'] = 'Bearer '+accessToken.get;
            // axios.defaults.headers.post['Content-Type'] = 'application/json';
            // fetchFoodTypes();
        // }
    }, [])
    return(
        // <div className="wrapper" style={wrapper}>
                        <Food/>
        // </div>
    )
}

const wrapper = {
        display: 'inline-flex',
        width: '100%',
        height: '100%',
    }