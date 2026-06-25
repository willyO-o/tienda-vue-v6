import axios from 'axios'


const api = axios.create({
    baseURL: 'https://shop.preparateaqui.com/api/v1',
    headers: {
        'Content-Type': 'application/json',
    }
})

// creamos un interceptor para agregar el token de autenticación a cada solicitud

api.interceptors.request.use(configuracion => {
    const token = localStorage.getItem('accessToken')

    if (token) {
        configuracion.headers['Authorization'] = 'Bearer ' + token
    }

    return configuracion
})





export default api

