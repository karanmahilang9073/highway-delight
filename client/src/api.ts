import axios from 'axios';

// 1. We create a new 'instance' of axios
const api = axios.create({
  // 2. We set the base URL for ALL API requests
  baseURL: 'https://highway-delight-2.onrender.com', 
});

// 3. When you deploy your site, you will change this one line to:
// baseURL: 'https://your-live-server-url.onrender.com' 
// ...and your entire React app will work.

export default api;