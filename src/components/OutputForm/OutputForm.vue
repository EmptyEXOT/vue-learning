<script setup lang="ts">
import UserInput from "@/shared/UserInput/UserInput.vue";
import Form from "@/shared/Form/Form.vue";
import {ref} from "vue";
import axios from "axios";
import Button from "@/shared/UserButton/UserButton.vue";
// import {InputFormProps} from "./InputFormProps";
import {store} from "@/store/store";
import {DatabaseRecord} from "@/store/types";


const err = ref<{ message: string, code: string } | null>(null)

function onSubmit(e: FormDataEvent) {
  e.preventDefault();
  // console.log(`username: ${store.input.username}, password: ${store.input.password}, data: ${store.input.data}`)
  axios.post(`http://localhost:3000/getData/${store.hashMethod}`, {
    username: store.output.username,
    password: store.output.password,
  })
      .then((response) => {
            const data: DatabaseRecord | string = (JSON.parse(response.data))
            store.record = data
            console.log(store.record)
            err.value = null
          }
      )
      .catch(e => {
        store.record = ''
        err.value = {code: e.code, message: e.message}
      })
}
</script>

<template>
  <Form @submit="onSubmit">
    <UserInput placeholder="Enter username" v-model="store.output.username"/>
    <UserInput placeholder="Enter password" v-model="store.output.password"/>

    <Button>
      {{ store.hashMethod }}
    </Button>
    <div class="error">{{ err && `${err.code}: ${err.message}` }}</div>
  </Form>
</template>

<style scoped>

.error {
  color: #d50101;
}

</style>