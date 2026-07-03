import * as yup from 'yup';



const usuarioValidationSchema =  yup.object({
  email: yup.string().email("Ingrese un correo válido").required("El correo es obligatorio"),
  password: yup.string().nullable().required("La contraseña es obligatoria").min(6, "La contraseña debe tener al menos 6 caracteres"),
  confirmPassword: yup.string().nullable().oneOf([yup.ref('password'),null] , "Las contraseñas deben coincidir").required("La confirmación de la contraseña es obligatoria"),
  estado: yup.string().required('Seleccione un estado').oneOf(['activo','inactivo'], 'Estado inválido'),
//   avatar: yup.string().required('El avatar es obligatorio')
})

export default usuarioValidationSchema