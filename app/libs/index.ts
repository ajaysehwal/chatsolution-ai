import CryptoJS from 'crypto-js';
export const generateCode=(length:number)=>{
    const randomString = CryptoJS.lib.WordArray.random(length);
    const token = CryptoJS.enc.Hex.stringify(randomString);
    return token;
}


