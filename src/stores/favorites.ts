import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useFavoritesStore = defineStore('favorites', () => {
  const favoritesList = ref([])

  const addToFavorites = (pokemon) => {
    favoritesList.value = favoritesList.value.filter((p) => p.id !== pokemon.id)
    favoritesList.value.push(pokemon)
  }

  const removeFromFavorites = (pokemon) => {
    favoritesList.value = favoritesList.value.filter((p) => p.id !== pokemon.id)
  }

  return { favoritesList, addToFavorites, removeFromFavorites }
})
