import {useEffect, useRef, useState} from 'react';
import Head from 'next/head'
import Layout from '../components/layout'
import {fetch} from '../usefull'
import Banner from '../components/Banner'
import List from '../components/List'

export default function Home({foodtypes, ingredients}) {
    var refs = useRef({});
    const [param, showParam] = useState(null);
  return (
    <>
      <Head>
        <title>Rio Pizza</title>
        <link rel="icon" href={require('../imgs/favicon.ico')} />
      </Head>
      <Layout foodtypes={foodtypes} param={param} showParam={showParam} refs={refs}>
        <Banner/>
        {foodtypes.map((type)=>{
          return type.food!=null?
          <List type={type} key={type._id} ingredients={ingredients} refs={refs} param={param} showParam={showParam}/>:null
        })}
      </Layout>
    </>
  )
}

export async function getStaticProps(){
  try{
    const idata = await fetch({ query: '{ingredients{_id name coast type{_id name}}}', variables: null });
    const ingredients = idata.data.data.ingredients;
    const ftdata = await fetch({ query: '{foodtypes{_id name}}', variables: null });
    const foodtypes = ftdata.data.data.foodtypes;
    for(let i=0; i < foodtypes.length; i++){
      var fooddata = await fetch(
        {
          query: "query fetchFood($_id:String!){food(_id:$_id){name _id ingredients{name _id coast} avIngTypes{_id name} img{data contentType} coast params{_id list{name coast} name}}}",
          variables:{_id: foodtypes[i]._id},
        });
      foodtypes[i].food = fooddata.data.data.food;
    }
    return {
      props: {foodtypes, ingredients}
    }
  }
  catch(err){
    console.log(err);
  }
}
