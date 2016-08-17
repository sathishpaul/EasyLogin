var CryptoUtils = function() {

  var key = "@vsj7ZofNXw8";
  var encrypt = function(stringToEncrypt) {
    return sjcl.encrypt(key, stringToEncrypt);
  };

  var decrypt = function(encryptedObj) {
    return sjcl.decrypt(key, encryptedObj);
  };

  return {
    encrypt,
    decrypt
  }
};

export default CryptoUtils();
