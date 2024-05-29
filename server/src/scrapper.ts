const axios = require("axios");
const md5 = require("md5")

console.log(md5('message'));
export const deCrypt = async (hash: string) => {
    try{
        const response = await axios.get(`https://www.md5online.it/index.lm?key_decript=${hash}`)
        const regex = /(?:<font style="font-size: 20px; color:#004030;">)([^<]+)(?=<br><\/font><\/center>)/;
        const match = response.data.match(regex);
        return match[1]; // HTML

    }
    catch(e)
    {
        console.log(e);
    }
}

export const getData = async() => {
    try{
        const response = await axios.get("https://www.md5online.it/index.lm?key_cript=else")
        const code = response.data.match(/\b[\w-]{32}\b/)[0]
        return code;

    }
    catch(e)
    {
        console.log(e);
    }
}
getData()
deCrypt('78e731027d8fd50ed642340b7c9a63b3')
