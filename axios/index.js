import axios from 'axios';

const clienteAxios = axios.create({
    baseURL: 'https://app-menora.herokuapp.com',
})

export default clienteAxios;