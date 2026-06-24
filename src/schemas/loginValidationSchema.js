import *  as yup from 'yup';

const loginValidationSchema = yup.object({
    email: yup.string().email('ingrese un correo valido').required('el correo es requerido'), 
    password: yup.string().required('La contraseña es requerida'),
})

export default loginValidationSchema