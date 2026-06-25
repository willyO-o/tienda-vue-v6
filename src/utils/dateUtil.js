


export const formatDate = txtFecha => {

    if(!txtFecha ) return ''
    
    const fecha = new Date(txtFecha)
    return fecha.toLocaleString('es-ES')

}