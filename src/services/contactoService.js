import api from '@/services/api.js';


export const sendContactForm = async (datos) => {

    const respuesta = await api.post('/contactos')

    return respuesta.data;

    
}
