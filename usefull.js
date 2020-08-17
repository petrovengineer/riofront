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

const arrayBufferToBase64 = (buffer)=>{
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    // return window.btoa(binary);
    return new Buffer.from(binary, 'base64').toString();
};

export {fetch, arrayBufferToBase64};