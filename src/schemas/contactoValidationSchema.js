import * as yup from 'yup'


 const contactoValidationSchema = yup.object({
    nombre_completo: yup.string().required('Por favor ingresa tu nombre completo').min(7, 'Ingresa unnombre valido, almenos 7 caracteres') ,
    correo:  yup.string().email("Por favor ingresa un correo valido").required("el correo es requerido"),
    mensaje: yup.string().required("por favor ingrese su mensaje").min(10, "el mensaje debe tener almenos 10 caracteres"),
})

export default contactoValidationSchema