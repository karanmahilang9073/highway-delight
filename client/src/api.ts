import axios from 'axios';


const api = axios.create({
  baseURL: 'https://highway-delight-2.onrender.com', 
});



export default api;