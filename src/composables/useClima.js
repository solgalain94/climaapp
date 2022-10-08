import { useStore } from "vuex"
import { ref } from "vue";

const useClima = () => {

    const loading = ref(false)
    const store = useStore()

    const coordenadas = async(ciudad) => {
        const data = await store.dispatch('coordenadas', ciudad)
        return data
    }

    const clima = async(ciudad) => {
        loading.value = true

        const resp = await store.dispatch('clima', ciudad)

        setTimeout(() => (loading.value = false), 2000);

        return resp
    }
    const cincoDias = async(datos) => {
        const resp = await store.dispatch('cincoDias', datos)
        return resp
    }

    // const cambiarDia = async (dt, lat, lon) => {
    //     const datos = {
    //         dt,
    //         lat,
    //         lon
    //     }
    //     const resp = await store.dispatch('cambiarDia', datos)
    //     return resp
    // }

    return {
        cincoDias,
        clima,
        coordenadas,
        loading
    }
}
export default useClima