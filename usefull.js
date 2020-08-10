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
            const data = await axios.post(process.env.API, query);
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
    return window.btoa(binary);
};

export {fetch, arrayBufferToBase64};