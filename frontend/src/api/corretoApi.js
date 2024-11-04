import axios from 'axios';

const api = axios.create({
    baseURL: 'http://4.172.207.208:5005'
});


export async function loginCorretor(email, senha) {
    
    const response = await api.post('/loginCorretor', {
        email: email,
        senha: senha
        
    });

    return response.data;

}