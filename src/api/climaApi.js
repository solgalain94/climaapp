import axios from 'axios'

const climaApi = axios.create({
    baseURL: "https://api.openweathermap.org",
})

climaApi.interceptors.request.use((config)  => {
    config.params = {
        'appid': import.meta.env.VITE_APIKEY,
        'units': 'metric',
        'lang': 'es'
    }
    return config;
});

export default climaApi