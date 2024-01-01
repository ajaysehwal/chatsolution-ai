import * as CryptoJS from 'crypto-js';
export * from "./manageCookies";
export const generateCode=(length:number)=>{
    const randomString = CryptoJS.lib.WordArray.random(length);

  // Convert the random string to a hexadecimal representation
  const token = CryptoJS.enc.Hex.stringify(randomString);

  return token;
}


