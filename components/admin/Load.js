
export default ({children, load})=>{
    return (load?'LOADING...':children)
}