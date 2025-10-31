import axios from 'axios';


const api = axios.create({
  baseURL: 'https://highway-delight-wghw.onrender.com', 
});



export default api;