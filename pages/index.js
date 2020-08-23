import Head from 'next/head'
import Layout from '../components/layout'
import {fetch} from '../usefull'
import Banner from '../components/Banner'
import List from '../components/List'
import { urlObjectKeys } from 'next/dist/next-server/lib/utils'

export default function Home({foodtypes, ingredients}) {
  return (
    <>
      <Head>
        <title>Rio Pizza</title>
        <link rel="icon" href={require('../imgs/favicon.ico')} />
      </Head>
      <Layout foodtypes={foodtypes}>
        <Banner/>
        {foodtypes.map((type)=>{
          return type.food!=null?<List type={type} key={type._id} ingredients={ingredients}/>:null
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
