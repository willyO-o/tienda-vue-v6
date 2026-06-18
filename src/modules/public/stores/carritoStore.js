import { defineStore } from "pinia";


import { computed, ref } from "vue";


const useCarritoStore = defineStore('carrito-compras', () =>{

    const carrito = ref([])

    const agregarItem = (producto, cantidad = 1) => {

        const existeItem =  carrito.value.find(item=> item.id == producto.id)

        if(existeItem){

            existeItem.cantidad+=cantidad
        
        }else{
            carrito.value.push({
                ...producto,
                cantidad: cantidad
            })
        }


    }

    const eliminarItem = id => {

        carrito.value = carrito.value.filter(item => item.id != id)
    }

    const total = computed( () =>{

        return carrito.value.reduce((total, item) => total + Number(item.precio)*Number(item.cantidad), 0)
    })



    return {
        carrito,
        agregarItem,
        eliminarItem,
        total,

    }



},
{
    persist: true
})


export default useCarritoStore