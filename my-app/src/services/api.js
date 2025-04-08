import axios from 'axios';

const API = axios.create({
  baseURL: 'http://e-learning-web-api.test/api/v1', 
});


export default API;