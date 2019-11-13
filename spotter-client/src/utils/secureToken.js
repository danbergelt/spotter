import * as Crypto from "crypto-js";
import SecureStorage from "secure-web-storage";

const secureStorage = new SecureStorage(localStorage, {
  hash: function hash(key) {
    key = Crypto.SHA256(key, `${process.env.REACT_APP_HASH}`);

    return key.toString();
  },
  encrypt: function encrypt(data) {
    data = Crypto.AES.encrypt(data, `${process.env.REACT_APP_SECRET}`);

    data = data.toString();

    return data;
  },
  decrypt: function decrypt(data) {
    data = Crypto.AES.decrypt(data, `${process.env.REACT_APP_SECRET}`);

    data = data.toString(Crypto.enc.Utf8);

    return data;
  }
});

export default secureStorage;
