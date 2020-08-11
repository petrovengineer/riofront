import Head from 'next/head'
import Layout from '../components/layout'
import {fetch} from '../usefull'
import axios from 'axios'

// require('dotenv').config();

export default function Home({foodtypes}) {
  axios.defaults.baseURL = process.env.API;
  // axios.defaults.headers.common['Authorization'] = 'Bearer '+this.state.accessToken.get;
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  return (
    <>
      <Head>
        <title>Rio Pizza</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout foodtypes={foodtypes}>
        <div></div>
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
