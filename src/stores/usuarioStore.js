import { defineStore } from 'pinia'

import { useStorage } from '@vueuse/core'


const useUsuarioStore = defineStore('user', () => {

    const usuario = useStorage('usuario', null)

    const accessToken = useStorage('accessToken', null)

    const refreshToken = useStorage('refreshToken', null)


    const setSesion = (token, refresh) => {


        accessToken.value = token
        refreshToken.value = refresh
    }

    const setUser = user => {

        usuario.value = user
    }

    const clearSesion = () => {
        accessToken.value = null
        refreshToken.value = null
        usuario.value = null
    }

    const isAuthenticated = () => {

        return refreshToken.value != null && usuario.value != null
    }


    return {
        usuario,
        setUser,
        setSesion,
        accessToken,
        refreshToken,
        clearSesion,
        isAuthenticated
    }


})


export default useUsuarioStore