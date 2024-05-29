import express from 'express'
import bodyParser from "body-parser";
// @ts-ignore
import cors from 'cors'
import * as fs from "fs";
import {AddRecord, DB, GetRecord, HashMethods} from "./types";
import {sha256} from "js-sha256";
import * as path from "path";
import {deCrypt} from "./scrapper";
import md5 from 'md5'

const app = express();

const PORT = 3000;

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post(`/data/${HashMethods.SHA_256}`, (req: AddRecord, res, next) => {
    // const data: DB = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db.json'), 'utf-8'));
    const payload = req.body;
    const hash = sha256(payload.password);
    const data = {...payload, hash, method: HashMethods.SHA_256}
    // data.push({...payload, hash, method: HashMethods.SHA_256});
    fs.writeFileSync(path.resolve(__dirname, 'db.json'), JSON.stringify(data, undefined, 2));
    res.status(200).json(JSON.stringify(data, undefined, 2))
})

app.post(`/getData/${HashMethods.SHA_256}`, (req: GetRecord, res, next) => {
    const data: DB = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db.json'), 'utf-8'));
    const payload = req.body;
    const hash = sha256(payload.password);
    if (data.hash !== hash || data.username !== payload.username) {
        res.status(403).json('Forbidden');
        return
    }
    // data.push({...payload, hash, method: HashMethods.SHA_256});
    // fs.writeFileSync(path.resolve(__dirname, 'db.json'), JSON.stringify(data, undefined, 2));
    res.status(200).json(JSON.stringify(data, undefined, 2))
})

app.post(`/data/${HashMethods.MD5}`, (req: AddRecord, res, next) => {
    // const data: DB = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db.json'), 'utf-8'));
    const payload = req.body;
    const hash = md5(payload.password);
    const data = {...payload, hash, method: HashMethods.MD5}
    // data.push({...payload, hash, method: HashMethods.SHA_256});
    fs.writeFileSync(path.resolve(__dirname, 'db.json'), JSON.stringify(data, undefined, 2));
    res.status(200).json(JSON.stringify(data, undefined, 2))
})

app.post(`/getData/${HashMethods.MD5}`, (req: GetRecord, res, next) => {
    const data: DB = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db.json'), 'utf-8'));
    const payload = req.body;
    const hash = md5(payload.password);
    if (data.hash !== hash || data.username !== payload.username) {
        res.status(403).json('Forbidden');
        return
    }
    // data.push({...payload, hash, method: HashMethods.SHA_256});
    // fs.writeFileSync(path.resolve(__dirname, 'db.json'), JSON.stringify(data, undefined, 2));
    res.status(200).json(JSON.stringify(data, undefined, 2))
})

app.get('/decrypt', async (req: AddRecord, res, next) => {
    const data: DB = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db.json'), 'utf-8'));
    // data.push({...payload, hash, method: HashMethods.SHA_256});
    const collision = await deCrypt(data.hash);
    // fs.writeFileSync(path.resolve(__dirname, 'db.json'), JSON.stringify(data, undefined, 2));
    res.status(200).send(collision)
})

app.listen(PORT, 'localhost', () => {
    console.log(`Server works on ${PORT} port`)
})