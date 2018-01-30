var crypto = require('crypto');
var rs = require('jsrsasign');

const nsdlGST = {
    decrypt(plainText,key){
      var decipher = crypto.createDecipheriv("aes-256-ecb",key,'')
      var dec = decipher.update(plainText,'buffer','buffer')
      return dec;
    },
    encrypt(plainText,key){
      var encrypt = crypto.createCipheriv("aes-256-ecb",key,'')
      var enc = encrypt.update(plainText,'buffer','base64')
      enc += encrypt.final('base64');
      return enc;
    },
    generateSigned(privateKey,publicKey,appKey,timeStamp){
      let sd = rs.KJUR.asn1.cms.CMSUtil.newSignedData({
      content: {str: appKey+timeStamp+"000000"},
      certs: [publicKey],
      signerInfos: [{
        hashAlg: 'sha256',
        sAttr: {
          SigningTime: {},
          SigningCertificateV2: {array: [publicKey]}
        },
        signerCert: publicKey,
        sigAlg: 'SHA256withRSA',
        signerPrvKey: privateKey
      }],
    
    });
    return rs.hextob64nl(sd.getContentInfoEncodedHex()).replace(/(\r\n|\n|\r)/gm,""); 
    },
    generateAspSecret(encKey,appSecretKey){
      var enc_key = decrypt(new Buffer(encKey,'base64'),new Buffer(appSecretKey));
      return encrypt(new Buffer(appSecretKey),enc_key);
    },
    encryptOTP(otp,appSecretKey) {
      return encrypt(new Buffer(otp),new Buffer(appSecretKey));
    }
  }
  
/*   export default nsdlGST; */