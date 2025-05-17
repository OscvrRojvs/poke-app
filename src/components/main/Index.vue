<template>
  <div v-if="!loading" class="main">
    <input class="input" type="text" placeholder="Search" />
    <div v-if="pokemonList.length > 0" v-for="(pokemon, index) in pokemonList" :key="index">
      <div class="card">
        <div>{{ pokemon.name }}</div>
        <div>
          <div class="fav-button">
            <img
              v-if="pokemon.isFavorite"
              src="@/assets/img/active-fav.svg"
              alt="active"
              @click="pokemon.isFavorite = false"
            />
            <img
              v-else
              src="@/assets/img/disabled-fav.svg"
              alt="disable"
              @click="pokemon.isFavorite = true"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="main-empty" v-else>
      <h1>Uh-oh!</h1>
      <p>You look lost on your journey!</p>
      <div class="button" @click="router.push('/')">Go back home</div>
    </div>
    <div class="main-footer">
      <div
        class="button"
        :style="favoriteActive ? 'background-color: #5e5e5e' : ''"
        @click="favoriteActive = false"
      >
        <All /> All
      </div>
      <div
        class="button"
        :style="favoriteActive ? '' : 'background-color: #5e5e5e'"
        @click="favoriteActive = true"
      >
        <Star /> Favorites
      </div>
    </div>
  </div>
  <div v-else class="main-loading">
    <div class="pokeball"></div>
  </div>
</template>

<script setup lang="ts">
import { inject, onBeforeMount, ref } from 'vue'
import { useRouter } from 'vue-router'
import Star from '@/components/icons/Star.vue'
import All from '@/components/icons/All.vue'

const router = useRouter()
const axios = inject('axios')
const pokemonList = ref([])
const loading = ref(true)
const favoriteActive = ref(false)

onBeforeMount(async () => {
  const response = await axios.get('/pokemon')
  const { results } = response.data
  results.forEach((poke) => {
    const pokemon = {
      id: poke.id,
      name: poke.name,
      image: 'https://pokeapi.co/media/sprites/pokemon/' + poke.id + '.png',
      isFavorite: false,
    }
    pokemonList.value.push(pokemon)
  })
  setTimeout(() => {
    loading.value = false
  }, 2500)
})
</script>

<style>
.main {
  background: #f9f9f9;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  min-height: 100vh;
  gap: 1rem;
}
.main-empty {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.main-loading {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.main-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 80px;
  background: #f9f9f9;
  color: #fff;
  padding: 15px 20px;
  text-align: center;
  z-index: 1000; /* Para que esté sobre otros elementos */
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
}
</style>
