<script setup>
import { ref, onMounted } from 'vue'
import EventService from '@/services/EventService'
import router from '@/router'

const event = ref(null)
const props = defineProps({
  id: {
    type: String,
    required: true
  }
})
onMounted(() => {
  EventService.getEvent(props.id)
    .then((res) => {
      event.value = res.data
    })
    .catch((err) => {
      if (err.response && err.response.status === 404) {
        router.push({
          name: '404Resource',
          params: { resource: 'event' }
        })
      } else {
        router.push({ name: 'NetworkError' })
      }
    })
})
</script>

<template>
  <div v-if='event'>
    <h1>{{ event.title }}</h1>
    <div id='nav'>
      <router-link :to="{ name: 'EventDetails' }">Details</router-link>
      |
      <router-link :to="{ name: 'EventRegister' }">Register</router-link>
      |
      <router-link :to="{ name: 'EventEdit' }">Edit</router-link>
    </div>
    <router-view :event='event' />
  </div>
</template>

<style scoped></style>
