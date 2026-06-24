import api  from "@/services/api";


export const login = async (credenciales ) => {

    const respuesta = await api.post('/auth/login', credenciales);

    return respuesta.data


}