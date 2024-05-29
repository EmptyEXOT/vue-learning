<script setup lang="ts">
import InputForm from "@/components/InputForm/InputForm.vue";
import {HashMethods} from "@/types";
import Box from "@/shared/Box/Box.vue";
import {store} from "@/store/store";
import OutputForm from "@/components/OutputForm/OutputForm.vue";
import UserButton from '@/shared/UserButton/UserButton.vue'
import axios from "axios";

// const hashMethod = ref<HashMethods>(HashMethods.SHA_256)
// const hash = defineModel<HashMethods>({default: HashMethods.SHA_256})
const onChange = (e) => {
  store.hashMethod = e.target.value
}

const onClick = (e) => {
  axios.get('http://localhost:3000/decrypt')
      .then(response => {
        alert(response.data)
      })
}
</script>

<template>
  <div class="select-wrapper">
    <div class="form_radio_btn">
      <input checked id="SHA_256" type="radio" name="Hash_Method" :value="HashMethods.SHA_256"
             @input="onChange">
      <label for="SHA_256">SHA-256</label>
    </div>
    <div class="form_radio_btn">
      <input class="form_radio_btn" id="Custom" type="radio" name="Hash_Method" :value="HashMethods.Custom"
             @input="onChange">
      <label for="Custom">Custom</label>
    </div>
    <div class="form_radio_btn">
      <input class="form_radio_btn" id="MD5" type="radio" name="Hash_Method" :value="HashMethods.MD5"
             @input="onChange">
      <label for="MD5">MD5</label>
    </div>
  </div>
  <div class="form-wrapper">

    <div class="group-wrapper">
      <!--    <InputForm v-model:hash-method="hash"/>-->
      <InputForm/>
      <Box title="Payload">
        <h3 class="data-wrapper">username: {{store.database.username}}</h3>
        <h3 class="data-wrapper">password: {{store.database.password}}</h3>
        <h3 class="data-wrapper">data: {{store.database.data}}</h3>
        <h3 class="data-wrapper">method: {{store.database.method}}</h3>
      </Box>
      <Box title="Database">
        <h3 class="data-wrapper">username: {{store.database.username}}</h3>
        <div class="data-wrapper-flex">
          <h3 class="data-wrapper">hash: {{store.database.hash}}</h3>
          <UserButton @click="onClick" v-if="store.hashMethod === HashMethods.MD5">
            test
          </UserButton>
        </div>
        <h3 class="data-wrapper">data: {{store.database.data}}</h3>
        <h3 class="data-wrapper">method: {{store.database.method}}</h3>
      </Box>
    </div>
    <div class="group-wrapper">
      <OutputForm />
      <Box title="Database">
        <h3 class="data-wrapper">username: {{store.record.username || 'err'}}</h3>
        <h3 class="data-wrapper">hash: {{store.record.hash || 'err'}}</h3>
        <h3 class="data-wrapper">data: {{store.record.data || 'err'}}</h3>
        <h3 class="data-wrapper">method: {{store.record.method || 'err'}}</h3>
      </Box>
    </div>
  </div>

</template>

<style scoped>
.data-wrapper {
  word-wrap: anywhere;
  width: 99%;
}
.data-wrapper-flex {
  display: flex;
  justify-content: space-between;
}

.form-wrapper {
  display: flex;
  justify-content: space-around;
  width: 100%;
  gap: 48px;
}
.group-wrapper {
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 16px;
}
.select-wrapper {
  display: flex;
}

.form_radio_btn {
  display: inline-block;
  margin-right: 10px;
}
.form_radio_btn input[type=radio] {
  display: none;
}

.form_radio_btn label {
  display: inline-block;
  cursor: pointer;
  padding: 0px 15px;
  line-height: 34px;
  border: 1px solid #999;
  border-radius: 6px;
  user-select: none;
}

/* Checked */
.form_radio_btn input[type=radio]:checked + label {
  background: #ffe0a6;
}

/* Hover */
.form_radio_btn label:hover {
  color: #666;
}

/* Disabled */
.form_radio_btn input[type=radio]:disabled + label {
  background: #efefef;
  color: #666;
}
</style>
