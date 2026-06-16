

export const imagenesArray= stringImagen => {
    if(!stringImagen) return [];

    return JSON.parse(stringImagen)|| []
    

}


export const primeraImagen = stringImagen =>{

    if(!stringImagen) return '';

    const arrayImagenes = imagenesArray(stringImagen)

    return arrayImagenes.length > 0 ? arrayImagenes[0] : ''
}

export const truncarTexto = (texto, longitud = 80 ) => {
    if(!texto) return '';

    return texto.substring(0,longitud) + (texto.length > longitud ? '...' : '')

}