import api from "@/services/api"




export const getUsuarios = async params  => {

    const resultado =  await api.get("/usuarios", { params})

    return resultado.data


}

export const getUsuarioId = async id  => {

    const resultado =  await api.get("/usuarios/" + id)

    return resultado.data


}


export const createUsuario = async datos => {

    const resultado =  await api.post("/usuarios", datos)

    return resultado.data

}

export const updateUsuario = async (id, datos) => {

    const resultado =  await api.put("/usuarios/"+id, datos)

    return resultado.data

}



export const deleteUsuario = async id => {

    const resultado =  await api.delete("/usuarios/"+id)

    return resultado.data

}
