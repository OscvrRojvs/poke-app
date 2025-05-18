<template>
  <div>
    <div v-if="!loading" class="main">
      <input v-model="search" class="input" type="text" placeholder="Search" />
      <div v-if="displayData.length > 0" v-for="(pokemon, index) in displayData" :key="index">
        <div class="card">
          <div class="card-title" @click="showPokemonDetail(pokemon)">
            {{ capitalizeWord(pokemon.name) }}
          </div>
          <div>
            <div class="fav-button">
              <img
                v-if="pokemon.isFavorite"
                src="@/assets/img/active-fav.svg"
                alt="active"
                @click="setFavorite(pokemon)"
              />
              <img
                v-else
                src="@/assets/img/disabled-fav.svg"
                alt="disable"
                @click="setFavorite(pokemon)"
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
    <dialog ref="dialog">
      <div class="dialog-background">
        <div class="dialog-close-button" @click="closeDialog"></div>
        <div class="dialog-img">
          <img :src="pokemonDetail.image" alt="pokemon-detail" width="200" height="200" />
        </div>
      </div>
      <div class="dialog-body">
        <div class="dialog-body-detail">
          <p class="item-detail">Name: {{ capitalizeWord(pokemonDetail.name) }}</p>
          <p class="item-detail">Weight: {{ pokemonDetail.weight }}</p>
          <p class="item-detail">Height: {{ pokemonDetail.height }}</p>
          <p class="item-detail">Types: {{ pokemonDetail.types.join(', ') }}</p>
        </div>
        <div class="dialog-footer">
          <div class="button" @click="sharePokemon">Share with my friends</div>
          <div>
            <div class="fav-button">
              <img
                @click="setFavorite(pokemonDetail, true)"
                v-if="pokemonDetail.isFavorite"
                src="@/assets/img/active-fav.svg"
                alt="active"
              />
              <img
                @click="setFavorite(pokemonDetail, true)"
                v-else
                src="@/assets/img/disabled-fav.svg"
                alt="disable"
              />
            </div>
          </div>
        </div>
      </div>
    </dialog>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, onBeforeMount, ref } from 'vue'
import { useRouter } from 'vue-router'
import Star from '@/components/icons/Star.vue'
import All from '@/components/icons/All.vue'
import { useFavoritesStore } from '@/stores/favorites.ts'
import formatters from '@/utils/formatters.ts'

const router = useRouter()
const { addToFavorites, removeFromFavorites } = useFavoritesStore()
const { capitalizeWord } = formatters()
const axios = inject('axios')
const search = ref('')
const pokemonList = ref([])
const loading = ref(true)
const favoriteActive = ref(false)
const dialog = ref()
const pokemonDetail = ref({
  id: '',
  name: '',
  image: '',
  weight: 0,
  height: 0,
  types: [],
  isFavorite: false,
})

const displayData = computed(() => {
  const { favoritesList } = useFavoritesStore()
  if (favoriteActive.value) {
    return favoritesList.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(search.value.toLowerCase()),
    )
  } else {
    return pokemonList.value.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(search.value.toLowerCase()),
    )
  }
})

onBeforeMount(async () => {
  const response = await axios.get('/pokemon')
  const { results } = response.data
  results.forEach((poke) => {
    const pokemon = {
      id: poke.name,
      name: poke.name,
      isFavorite: false,
    }
    pokemonList.value.push(pokemon)
  })
  setTimeout(() => {
    loading.value = false
  }, 2500)
})

const setFavorite = (pokemon, fromDialog = false) => {
  pokemonList.value = pokemonList.value.map((poke) => {
    if (poke.id === pokemon.id) {
      poke.isFavorite = !poke.isFavorite
    }
    return poke
  })
  if (fromDialog) {
    pokemon.isFavorite = !pokemon.isFavorite
    pokemonDetail.isFavorite = !pokemon.isFavorite
  }
  pokemon.isFavorite ? addToFavorites(pokemon) : removeFromFavorites(pokemon)
}

const showPokemonDetail = async (pokemon) => {
  const response = await axios.get(`/pokemon/${pokemon.id}`)
  const { data } = await response
  pokemonDetail.value = {
    id: data.name,
    name: data.name,
    image: data.sprites.front_default,
    weight: data.weight,
    height: data.height,
    types: data.types.map(({ type }) => type.name),
    isFavorite: pokemon.isFavorite,
  }
  dialog.value.showModal()
}

const sharePokemon = () => {
  navigator.clipboard.writeText(
    `Check out this Pokémon: ${capitalizeWord(pokemonDetail.value.name)},
    Weight: ${pokemonDetail.value.weight},
    Height: ${pokemonDetail.value.height},
    Types: ${pokemonDetail.value.types.join(', ')}`,
  )
}

const closeDialog = () => {
  pokemonDetail.value = {
    id: '',
    name: '',
    image: '',
    weight: 0,
    height: 0,
    types: [],
    isFavorite: false,
  }
  dialog.value.close()
}
</script>

<style scoped>
.main {
  background: #f9f9f9;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  min-height: 100vh;
  gap: 1rem;
  margin-bottom: 4rem;
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
  z-index: 1000;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
}

.card-title {
  font-size: 22px;
  width: 100%;
  cursor: pointer;
}

.dialog-background {
  background-image: url('@/assets/img/background.svg');
  background-size: cover;
  width: 100%;
  height: 45%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}

.dialog-close-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 30px;
  height: 30px;
  background-image: url('@/assets/img/close.svg');
  background-size: cover;
  cursor: pointer;
}

.dialog-img {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 120%;
  width: 100%;
}
.dialog-body {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  margin-top: 15rem;
}
.dialog-body-detail {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  gap: 1rem;
}

.item-detail {
  width: 100%;
  border-bottom: 1px solid #e8e8e8;
}

.dialog-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1rem 2rem 0 2rem;
}
</style>
