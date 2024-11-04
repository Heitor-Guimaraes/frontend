import axios from 'axios';

const api = axios.create({
    baseURL: 'http://4.172.207.208:5005'
});

export async function cadastroCliente(nome, email, telefone) {
    
    const response = await api.post('/cliente', {
        nome: nome,
        email: email,
        telefone: telefone
    }) 

    return response.data;

}

export async function loginCliente(email, telefone) {
    
    const response = await api.post('/login', {
        email: email,
        telefone: telefone
    }) 

    return response.data;

}


