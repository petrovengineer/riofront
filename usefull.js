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
            console.log("PROCESS ENV PUBLIC", process.env.NEXT_PUBLIC_API);
            const data = await axios.post(process.env.NEXT_PUBLIC_API+'/graphql', query);
            done(data);
        }catch(err){
            console.log(err);
            fail();
        }
    })
}

const fetchREST =  async (url, type, query)=>{
    return new Promise(async (done, fail)=>{
        try{
            let data = null;
            if(type=='get'){
                data = await axios.get(process.env.NEXT_PUBLIC_OLD_API+url);
            }else if(type=='post'){
                data = await axios.post(process.env.NEXT_PUBLIC_OLD_API+url, query);
            }else if(type=='put'){
                data = await axios.put(process.env.NEXT_PUBLIC_OLD_API+url, query);
            }else if(type=='put'){
                data = await axios.put(process.env.NEXT_PUBLIC_OLD_API+url, query);
            }else if(type=='delete'){
                data = await axios.delete(process.env.NEXT_PUBLIC_OLD_API+url+'?id='+query);
            }
            done(data);
        }catch(err){
            console.log(err);
            fail();
        }
    })
}

export {fetch, fetchREST};