import api from '@/services/api'


export const getProductos = async (params= {}) => {

    const respuesta = await api.get('/productos', {params})

    return respuesta.data

}