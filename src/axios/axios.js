import axios from 'axios';

export default axios.create({
  baseURL: 'https://packpredictor-default-rtdb.firebaseio.com/'
});

