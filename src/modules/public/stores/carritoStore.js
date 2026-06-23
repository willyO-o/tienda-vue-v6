import { defineStore } from "pinia";


import { computed, ref } from "vue";


const useCarritoStore = defineStore('carrito-compras', () => {

    const carrito = ref([])

    const agregarItem = (producto, cantidad = 1) => {

        cantidad = Number(cantidad)

        const existeItem = carrito.value.find(item => item.id == producto.id)

        if (existeItem) {

            const cantidadTotal = Number(existeItem.cantidad) + Number(cantidad)

            console.log("cantidadTotal:", cantidadTotal);


            if (cantidadTotal > producto.stock) {
                existeItem.cantidad = Number(producto.stock)
            } else if (cantidadTotal < 1) {
                existeItem.cantidad = 1
            } else {
                existeItem.cantidad = Number(existeItem.cantidad) + cantidad
            }


        } else {
            carrito.value.push({
                ...producto,
                cantidad: cantidad
            })
        }


    }

    const eliminarItem = id => {

        carrito.value = carrito.value.filter(item => item.id != id)
    }

    const total = computed(() => {

        return carrito.value.reduce((total, item) => total + Number(item.precio) * Number(item.cantidad), 0)
    })


    const stockDisponibleProducto = idProducto => {

        const item = carrito.value.find(item => item.id == idProducto)

        if (item) {
            return Number(item.stock) > Number(item.cantidad)
        }

        return true


    }



    return {
        carrito,
        agregarItem,
        eliminarItem,
        total,
        stockDisponibleProducto

    }



},
    {
        persist: true
    })


export default useCarritoStore