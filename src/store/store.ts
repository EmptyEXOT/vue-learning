import {reactive} from 'vue'
import {RootState} from "./types";
import {HashMethods} from "../types";
import axios from "axios";

export const store: RootState = reactive({
    input: {
        username: '',
        password: '',
        data: ''
    },
    output: {
      username: '',
      password: '',
    },
    hashMethod: HashMethods.SHA_256,
    database: {
        username: '',
        password: '',
        data: '',
        hash: '',
        method: HashMethods.SHA_256,
    },
    record: 'forbidden',
})