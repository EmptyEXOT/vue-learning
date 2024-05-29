import express from "express";

export enum HashMethods {
    SHA_256 = 'sha-256',
    Custom = 'custom',
    MD5 = 'md5'
}

export interface Record {
    username: string,
    password: string,
    hash: string,
    data: string,
    method: HashMethods
}

export interface AddRecord extends express.Request {
    body: {
        username: string,
        password: string,
        data: string,
        method: HashMethods,
    }
}

export interface GetRecord extends express.Request {
    body: {
        username: string,
        password: string,
    }
}

export type DB = Record
