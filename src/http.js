//axios统一拦截
import axios from 'axios'

axios.defaults.timeout = 600000
axios.defaults.withCredentials = true

//请求拦截
// axios.interceptors.request.use(config=>{
//     //1) 放过某些接口:如login,他不需要带token
//     if(config.url.indexOf('login')>-1){
//         return config
//     }
//     //2) 如果没有token 跳转到登录页
//     if(!sessionStorage.getItem('token') || sessionStorage.getItem('token')==='undefined'){
//         console.log('进来了');
//         location.href = 'https://cas.hsmob.com/cas/login/?service='+encodeURIComponent(location.href)
//         return Promise.reject('没有token')
//     }
//     //3)如果有token带上token
//     config.headers.Authorization = 'Token ' +  JSON.parse(sessionStorage.getItem('token'))
//     return config
// }, error=>{
//     return Promise.reject(error)
// })

axios.interceptors.response.use(response=>{
    return response
}, error=>{
    return Promise.reject(error)
})

export default axios;