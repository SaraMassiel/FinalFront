import axios from 'axios';

const URL_BASE = 'http://localhost:8080/paseoapi/v1'

const clienteApi = axios.create({
    baseURL: URL_BASE,
    headers: {
        'content-type': 'application/json'
    }
})