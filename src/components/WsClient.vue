<script setup lang="ts">
import { useSocketStore } from '../store/socket';
import { ref } from 'vue';

const useSocket = useSocketStore();
useSocket.connectToServer()

const clientsUl = ref()
clientsUl.value = useSocket.clientsHtml 
// useSocket.clientsHtml 
console.log(clientsUl.value)

</script>

<template>
  
  <div>
    <h1>Websocket - Client</h1>
    <span :style="{ color: useSocket.color }">{{ useSocket.line }}</span>
  </div>

  <ul v-for="(item) in useSocket.clientsHtml" :key="item">
    <li>{{ item }}</li>
  </ul>

</template>

<style >

span{
  font-weight: 600;
  font-size: x-large;
}
</style>