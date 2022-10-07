export const clima = (state, data) => {
    state.temp_max = Math.round(data.temp.max)
    state.temp_min = Math.round(data.temp.min)
    state.humedad = data.humidity
    state.descripcion = data.weather[0].description
    state.icon = data.weather[0].icon 
    state.ciudad = data.name
    state.dia = data.dt
}

export const dias = (state, data) => {
    state.pronostico = data.slice(1, 6)
}