import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burgerbuilder-e2b01.firebaseio.com/'
});

export default instance;