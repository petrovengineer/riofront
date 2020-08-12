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
  const {data} = await fetch({ query: '{foodtypes{_id name}}',
  variables: null });
  return {
      props: {foodtypes: data.data.foodtypes}
  }
}
