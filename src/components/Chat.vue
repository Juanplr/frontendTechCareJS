<template>
  <div>
    <input
      v-model="username"
      class="txt-username"
      type="text"
      placeholder="username"
      disabled
    />

    <div class="div-chat">
      <p v-for="(message, idx) in listMessages" :key="idx">
        {{ message.user }}: {{ message.body }}
      </p>
    </div>

    <form @submit.prevent="handleSubmit" class="form">
      <span class="title">Chat en Tiempo real</span>
      <p class="description">Escribe tu mensaje.</p>
      <div class="div-type-chat">
        <input
          v-model="message"
          placeholder="Type your message"
          type="text"
          name="text"
          id="chat-message"
          class="input-style"
        />
        <button type="submit">Enviar</button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from "vue";
import io from "socket.io-client";

const socket = io("http://localhost:3000/");

socket.emit('setRole', localStorage.getItem("roll")); 

export default {
  name: 'Chat',
  setup() {
    const message = ref("");
    const username = ref(localStorage.getItem("nombre"));
    const listMessages = ref([
      { body: "Bienvenido al Chat", user: username },
    ]);


    const handleSubmit = () => {
      socket.emit("message", { body: message.value, user: username.value });
      const newMsg = {
        body: message.value,
        user: username.value,
      };
      listMessages.value.push(newMsg);
      message.value = "";
    };

    const receiveMessage = (msg) => {
      listMessages.value.push(msg);
    };

    onMounted(() => {
      socket.on("message", (msg) => {
        if (
          !listMessages.value.some(
            (message) => message.body === msg.body && message.user === msg.user
          )
        ) {
          receiveMessage(msg);
        }
      });
    });

    onBeforeUnmount(() => {
      socket.off("message", receiveMessage);
    });

    return {
      message,
      username,
      listMessages,
      handleSubmit,
    };
  },
};
</script>

<style scoped>
.txt-username {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  
}

.div-chat {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
  height: 200px;
  overflow-y: scroll;
}

.form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  font-size: 24px;
  margin-bottom: 10px;
}

.description {
  margin-bottom: 20px;
}

.div-type-chat {
  display: flex;
  align-items: center;
}


.input-style {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 10px;
}
</style>
