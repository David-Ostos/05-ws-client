import { defineStore } from 'pinia'
import { Manager, Socket } from 'socket.io-client'
import { Ref, ref } from 'vue';



export const useSocketStore = defineStore('socket', () => {

  let line = ref('Offline')
  let color = ref('red')

  let clientsHtml:Ref<string[]> = ref([]) ;


  const connectToServer = () => {

    const manager = new Manager('http://localhost:3000/socket.io/socket.io.js');

    const socket = manager.socket('/');

    addListeners( socket )
    return socket
  }

  const addListeners = ( socket: Socket) => {
    
    socket.on('connect', () => {
      line.value = 'Online'
      color.value = 'green'
    }) 
    
    socket.on('disconnect', () => {
      line.value = 'Offline'
      color.value ='red'
    })

    socket.on('clients-updated', (clients: string[]) => {
      clientsHtml.value = []
      clients.forEach( clientId => {
        clientsHtml.value.push(clientId)
      });
    })
  }

  return { connectToServer, line , color , clientsHtml}

})
