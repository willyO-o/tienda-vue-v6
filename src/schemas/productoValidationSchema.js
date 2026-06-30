import * as yup from 'yup';

const productoValidationSchema = yup.object({

    titulo: yup.string().required("El titulo es requerido").min(3, "El titulo debe tener al menos 3 caracteres"),
    descripcion: yup.string().required("La descripcion es requerida").min(10, "La descripcion debe tener al menos 10 caracteres"),
    // imagen: "",
    precio: yup.number().required("El precio es requerido").min(0, "Ingrese un precio valido").typeError("Ingrese un precio valido"),
    stock: yup.number().required("El Stock es requerido").min(0, "Ingrese un stock valido").typeError("Ingrese un valor valido"),
    categoria_id: yup.number().required("Seleccione una categoria").min(1, "Seleccione una categoria").typeError("Seleccione una categoria valida")

})

export default productoValidationSchema