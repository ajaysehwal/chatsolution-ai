import * as CryptoJS from 'crypto-js';
export * from "./manageCookies";

export const generateCode=(length:number)=>{
    const randomString = CryptoJS.lib.WordArray.random(length);
    const token = CryptoJS.enc.Hex.stringify(randomString);

    return token;
}


