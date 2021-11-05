const bcrypt = require('bcryptjs');

const helpers = {};

helpers.encryptPass = async (passworld)=>{
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(passworld, salt);

    return hash;
};
helpers.comparePass = async (password, savePass)=>{
    try{
        return await bcrypt.compare(password, savePass);
    }catch(err){
        console.log(`Soy el error: ${err}.`);
    }
};


module.exports = helpers;