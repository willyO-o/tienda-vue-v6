import api from "@/services/api";

export const getCategorias = async (params = {}) => {
  const respuesta = await api.get("/categorias", { params });
  return respuesta.data;
};

export const getCategoriaId = async (id) => {
  const respuesta = await api.get("/categorias/" + id);
  return respuesta.data;
};

export const createCategorias = async (datos) => {
  const respuesta = await api.post("/categorias", datos);
  return respuesta.data;
};

export const updateCategoria = async (id, datos) => {
  const respuesta = await api.put("/categorias/" + id, datos);
  return respuesta.data;
};

export const deleteCategoria = async (id) => {
  const respuesta = await api.delete("/categorias/" + id);

  return respuesta.data;
};
