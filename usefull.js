import axios from 'axios';

// module.exports.withToken = (wrapperComponent) => {
//     let token = window.localStorage.getItem("accessToken");
//     if(!token){
//         this.props.history.push('/login');
//     }else{
//         <wrapperComponent token={token}/>
//     }
//  }
const fetch =  async (query)=>{
    return new Promise(async (done, fail)=>{
        try{
            const data = await axios.post(process.env.NEXT_PUBLIC_API+'/graphql', query);
            done(data);
        }catch(err){
            console.log(err);
            fail();
        }
    })
}

const fetchREST =  async (url, type, query)=>{
    console.log("REST")
    return new Promise(async (done, fail)=>{
        try{
            let data = null;
            if(type=='get'){
                data = await axios.get(process.env.NEXT_PUBLIC_API+url);
            }else if(type=='post'){
                data = await axios.post(process.env.NEXT_PUBLIC_API+url, query);
            }else if(type=='put'){
                data = await axios.put(process.env.NEXT_PUBLIC_API+url, query);
            }else if(type=='put'){
                data = await axios.put(process.env.NEXT_PUBLIC_API+url, query);
            }else if(type=='delete'){
                data = await axios.delete(process.env.NEXT_PUBLIC_API+url+'?id='+query);
            }
            done(data);
        }catch(err){
            console.log(err);
            fail();
        }
    })
}

const equalArrObj = (arr1, arr2, param)=>{
    let arr1Ids = arr1.map(i=>i[param]);
    let arr2Ids = arr2.map(i=>i[param]);
    let less = arr1Ids.filter(ci=>arr2Ids.indexOf(ci)>-1).length==arr1Ids.length;
    let more = arr2Ids.filter(ci=>arr1Ids.indexOf(ci)>-1).length==arr2Ids.length;
    return less && more;
}

export {fetch, fetchREST, equalArrObj};