import api from "@/services/api";

export const getProductos = async (params = {}) => {
  const respuesta = await api.get("/productos", { params });

  return respuesta.data;
};

export const getProductoId = async (idProducto) => {
  const respuesta = await api.get("/productos/" + idProducto);
  return respuesta.data;
};

export const createProducto = async (datos) => {
  const respuesta = await api.post("/productos", datos);
  return respuesta.data;
};


export const updateProducto = async (idProducto, datos) => {
  const respuesta = await api.put("/productos/"+ idProducto, datos);
  return respuesta.data;


}


export const deleteProducto = async idProducto => {

  const respuesta = await api.delete('/productos/' + idProducto)
  return respuesta.data;

}
