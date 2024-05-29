<script setup lang="ts">
import UserInput from "@/shared/UserInput/UserInput.vue";
import Form from "@/shared/Form/Form.vue";
import {ref} from "vue";
import axios from "axios";
import Button from "@/shared/UserButton/UserButton.vue";
// import {InputFormProps} from "./InputFormProps";
import {store} from "@/store/store";
import {DatabaseRecord} from "@/store/types";

// const props = defineProps<InputFormProps>()
const err = ref<{message: string, code: string} | null>(null)

function onSubmit(e: FormDataEvent) {
  e.preventDefault();
  // console.log(`username: ${store.input.username}, password: ${store.input.password}, data: ${store.input.data}`)
  axios.post(`http://localhost:3000/data/${store.hashMethod}`, {
    username: store.input.username,
    password: store.input.password,
    data: store.input.data,
    method: store.hashMethod
  })
      .then((response) => {
        const data: DatabaseRecord = (JSON.parse(response.data))
        console.log(store.database)
        store.database.password = data.password;
        store.database.hash = data.hash;
        store.database.method = data.method;
        store.database.username = data.username;
        store.database.data = data.data;
        err.value = null}
      )
      .catch(e => {err.value = {code: e.code, message: e.message}})
}

</script>

<template>
  <Form @submit="onSubmit">
    <UserInput placeholder="Enter username" v-model="store.input.username"/>
    <UserInput placeholder="Enter password" v-model="store.input.password"/>
    <UserInput placeholder="Enter data" v-model="store.input.data"/>

    <Button>
      {{store.hashMethod}}
    </Button>
    <div class="error">{{err && `${err.code}: ${err.message}`}}</div>
  </Form>
</template>

<style scoped>

.error {
  color: #d50101;
}

</style>