<template>
<section class="text-gray-800 body-font mt-6">
  <div class="container mx-auto mt-6 p-1">
    <!-- buscador -->
    <section class="max-w-lg mx-auto mt-8 rounded-3xl bg-gray-300 text-gray-900">
        <div class="rounded flex flex-col md:flex-row items-center w-3/6 p-2 space-y-1 md:space-y-0">
          <div class="hidden md:block p-1 outline-none focus:outline-none">
            <svg class="w-5 h-5"
              fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor"
              viewBox="0 0 24 24">
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
          <input type="text" name="ciudad" v-model="ciudad" id="ciudad" @keyup.enter="onSearch" placeholder="Ciudad"
            class="w-full pl-4 text-gray-900 py-2 bg-gray-300 outline-none focus:outline-none border-gray-900">
        </div>
    </section>
    <!-- loading -->
    <div  v-if="loading" class="max-w-lg p-8 mx-auto mt-4 flex justify-center items-center">
        <svg class="inline mr-2 w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600" viewBox="0 0 100 101"
          fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"></path>
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"></path>
        </svg>
        <span class="sr-only">Buscando...</span>
    </div>
    <!-- resultado -->
    <section v-if="resultado && !loading">
      <div class="max-w-lg p-8 mx-auto rounded-2xl mt-8 text-gray-900  shadow-[0px_22px_70px_4px_rgba(0,0,0,0.56)]">
        <div class="text-center items-center content-center">
          <h2 class="text-4xl font-semibold capitalize">{{ciudad_aux}}</h2>
          <div class="font-bold capitalize">{{ formatDate(dia) }}</div>
          <img :src="'http://openweathermap.org/img/wn/' + icon + '@2x.png'" class="mx-auto">
          <div class="mb-2 text-4xl font-semibold"> {{temp_max}}°
            <span class="mx-1 text-4xl">/</span> {{temp_min}}°
          </div>
          <p class="text-gray-900 capitalize text-lg">{{descripcion}}</p>
          <p class="text-gray-900 capitalize text-lg italic">{{humedad}}% humedad</p>
        </div>
      </div>
      <div class="max-w-lg mx-auto rounded-lg mt-2 text-gray-900">
        <div class="container grid grid-cols-5 gap-1 mx-auto sm:grid-cols-2 xl:grid-cols-5 capitalize">
          <div v-for="dia in pronostico" :key="dia.dt" @click="onSelect(dia)" class="cursor-pointer flex p-4 shadow-[0px_22px_70px_4px_rgba(0,0,0,0.56)] space-x-4 rounded-xl md:space-x-6  text-gray-900">
            <div class="grid grid-rows-2 text-center">
              <div class="font-bold">{{ formatDate(dia.dt) }}</div>
              <img :src="'http://openweathermap.org/img/w/' + dia.weather[0].icon + '.png'" class="mx-auto mt-0">
            </div>
          </div>
        </div>
      </div>
      
    </section>

    <!-- no hay datos -->
    <div v-if="!resultado && !loading" class="max-w-lg p-8 mx-auto rounded-2xl mt-8  text-gray-900 shadow-[0px_22px_70px_4px_rgba(0,0,0,0.56)] justify-center">
      <div class="flex md:justify-end -mt-16">
        <img class="w-15 h-16 object-fit rounded-md" src="../assets/clima.png" />
      </div>
      <div>
        <h2 class="text-slate-800 text-3xl font-semibold">No hay datos</h2>
        <p class="mt-2 text-slate-600">Búsqueda por ciudad</p>
      </div>
    </div>  
  </div>
</section>
 
</template>

<script>
import { ref, computed } from "vue";
import useClima from '../composables/useClima'
import { useStore } from 'vuex';
export default {

  setup(){

    const resultado = ref(false)
    const ciudad = ref("")
    let ciudad_aux = ref("")
    
    const store = useStore()
    const { coordenadas, clima, cincoDias, loading } = useClima()
    
    return{
      ciudad,
      ciudad_aux,
      coordenadas,
      loading,
      resultado,
      formatDate: (dt) => {
        const day = new Date(dt * 1000)
        return day.toLocaleString("es", { weekday: "short" }); 
      },
      onSearch: async() => {
        ciudad_aux.value = ciudad.value
        const code = await clima(ciudad.value);
        const datos = await coordenadas(ciudad.value);
        const resp = await cincoDias(datos)

        if(code == 200){
          resultado.value = true
        }
      },
      onSelect: (dia) => {
        store.commit("clima", dia);
      },
      pronostico: computed(() => store.getters["pronostico"]),
      dia: computed(() => store.getters["dia"]), 
      descripcion: computed(() => store.getters["descripcion"]),
      humedad: computed(() => store.getters["humedad"]),
      icon: computed(() => store.getters["icon"]),
      temp_max: computed(() => store.getters["temp_max"]),
      temp_min: computed(() => store.getters["temp_min"]), 
    }
  }

}
</script>

