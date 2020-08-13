import Head from 'next/head'
import Layout from '../components/layout'
import {fetch} from '../usefull'
import Banner from '../components/Banner'
import List from '../components/List'

export default function Home({foodtypes}) {
  return (
    <>
      <Head>
        <title>Rio Pizza</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout foodtypes={foodtypes}>
        <Banner/>
        {foodtypes.map((type)=>(
          <List type={type} key={type._id}/>
        ))}
      </Layout>
    </>
  )
}

export async function getStaticProps(){
  try{
    const ftdata = await fetch({ query: '{foodtypes{_id name}}', variables: null });
    const foodtypes = ftdata.data.data.foodtypes;
    const ftsWithFood = foodtypes.map(async (ft)=>{
        const fooddata = await fetch({ query: '{food{name _id}}', variables: null});
        return ft.food = fooddata.data.data.food;
    })
    console.log("FTWF", ftsWithFood);
    return {
      props: {foodtypes}
    }
  }
  catch(err){
    console.log(err);
  }

}
