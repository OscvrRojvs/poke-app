<template>
  <div class="home">
    <img src="@/assets/img/pikachu.svg" alt="pikachu" />
    <h1 class="home-title">Welcome to Pokédex</h1>
    <p>
      The digital encyclopedia created by Professor Oak is an invaluable tool to Trainers in the
      Pokémon world.
    </p>
    <div class="button" @click="router.push('/main')">Get started</div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<style>
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  height: 100vh;
  gap: 2rem;
  text-align: center;
  padding: 2rem;
}
</style>
