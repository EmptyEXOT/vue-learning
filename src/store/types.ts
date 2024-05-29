import {HashMethods} from "../types";
import {WebSocket} from "vite";
import Data = WebSocket.Data;

export interface InputState {
    username: string,
    password: string,
    data: string
}

export interface OutputState {
    username: string,
    password: string,
}

export interface DatabaseRecord {
    username: string,
    password: string,
    data: string,
    hash: string,
    method: HashMethods,
}

export interface RootState {
    input: InputState,
    output: OutputState,
    hashMethod: HashMethods,
    database: DatabaseRecord,
    record: DatabaseRecord | string
}