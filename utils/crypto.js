var CryptoJS = require('/crypto-js.js');
// key 和 iv 可以一致
// key = CryptoJS.enc.Utf8.parse(key); // 密钥 
// iv = CryptoJS.enc.Utf8.parse(iv);
// param {string} mode 加密模式 BCB ECB CBC
//加密 AES
function encrypted(param,mode,vKey) {
  let key = CryptoJS.enc.Utf8.parse(vKey);
  let iv = CryptoJS.enc.Utf8.parse(vKey);
  var encrypted = CryptoJS.AES.encrypt(param, key, {
    iv: iv,
    mode: CryptoJS.mode[mode],
    padding: CryptoJS.pad.Pkcs7
  });
  encrypted = encrypted.toString();
  return encrypted;
}
//解密 AES
function decrypted(param,mode,vKey) {
  let key = CryptoJS.enc.Utf8.parse(vKey);
  let iv = CryptoJS.enc.Utf8.parse(vKey);
  var decrypted = CryptoJS.AES.decrypt(param, key, {
    iv: iv,
    mode: CryptoJS.mode[mode],
    padding: CryptoJS.pad.Pkcs7
  });
  decrypted = CryptoJS.enc.Utf8.stringify(decrypted);
  return decrypted;
}
module.exports = {
  encrypted: encrypted,
  decrypted: decrypted,
}
