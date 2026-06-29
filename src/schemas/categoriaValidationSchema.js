import *  as yup from 'yup'

const categoriaValidationSchema = yup.object({
  categoria: yup.string().required('El nombre de la categoria es requerido').min(5, 'El nombre de la categoria debe tener al menos 5 caracteres').max(50, 'El nombre de la categoria no puede tener más de 50 caracteres'),
  estado: yup.string().required('Por favor seleccione un estado').oneOf(['activo','inactivo'], 'Seleccione una opcion valida')
})


export default categoriaValidationSchema