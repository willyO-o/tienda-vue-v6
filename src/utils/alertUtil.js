import Swal from "sweetalert2";

export const confimarAccion = async (titulo, texto, txtBtn = "Si, Eliminar!", tipo="warning") => {
  const resultado = await Swal.fire({
    title: titulo,
    text: texto,
    icon: tipo,
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: txtBtn,
  })


  return resultado.isConfirmed;
};
