import api from '@/services/api'


export const getCategorias = async (params= {}) => {

    const respuesta = await api.get('/categorias', { params  })
    return respuesta.data

}