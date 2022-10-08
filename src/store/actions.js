import climaApi from "../api/climaApi"

export const clima = async({commit}, ciudad) =>{

    try {

        const { data } = await climaApi.get(`/data/2.5/weather?q=${ciudad}`)
        
        return data

    } catch(error){
        return error
    }
}
export const cincoDias = async ({ commit }, datos) => {
    try {

        const { data } = await climaApi.get(`/data/2.5/onecall?lat=${datos.lat}&lon=${datos.lon}&exclude=current,minutely,hourly`)
        commit('dias', data.daily)
        commit('clima', data.daily[0])

        return data

    } catch (error) {
        return error
    }
}
// export const cambiarDia = async ({ commit }, datos) => {
//     try {
//         const resp = await climaApi.get(`/data/2.5/onecall/timemachine?&dt=${datos.dt}&lat=${datos.lat}&lon=${datos.lon}`)
//         return data

//     } catch (error) {
//         return error
//     }
// }

export const coordenadas = async ({ commit },ciudad) => {
    try {

        const { data } = await climaApi.get(`/geo/1.0/direct?q=${ciudad}&limit=1`)
        commit('coordenadas', data[0])
        return data[0]

    } catch (error) {
        return error
    }
}

