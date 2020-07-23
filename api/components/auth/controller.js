const bcrypt = require(`bcrypt`);
const auth = require('../../../auth/index')
const TABLA = 'auth'


module.exports = function (injectedStore) {

    let store = injectedStore;

    if (!store) {
        store = require('../../../store/mysql')
    }
    async function login(username, password) {
        const data = await store.login(username)
        let retorna = bcrypt.compareSync(password, data[0].contrasena)

        console.log(retorna)
        if (retorna == true) {
            //  return auth.sign(data)
            return auth.sign(JSON.parse(JSON.stringify(data)));
        }
        else {
            throw new Error('info invalida')
        }
        bcrypt.compareSync(password, data.password) 
        .then(igual=>{
                if(igual===true){
                    console.log(bcrypt.compareSync(password, data.password))
                    // generar token 
                return auth.sign(data)
                } else{
                    throw new Error ('info invalida')
                };
            });

        return data
    }

    async function upsert(data) {
        // const authData={
        //     id:"data.id",
        // }
        // if(data.username){
        //     authData.username= data.username;
        // }
        // if(data.contrasena){
        let pass;
        pass= await bcrypt.hash(data, 2);

        // }
        // console.log(data.us_contrasena)
        // return store.upsert(TABLA,authData)
        return pass
    }
    return {
        login,
        upsert,

    }
}
