const store = require('../../../store/mysql');
// const nanoId = require('nanoid');
const AUTH = require(`../auth`)

module.exports = function (injectedStore) {

    // let store=injectedStore;

    if (!store) {
        store = require('../../../sotore/gadolDbMysql')
    }




 function listUsers() {
        return store.listUsers();
    }
    
    function getUser(id) {
        return store.getUser(id);
    }
async  function insert(data)
    {
       data.contraseña = await AUTH.upsert(data.contraseña)
       return store.createUser(data)
    }

    
async    function updateUser(data)
    {
        
       return  store.updateUser(data) 
    }
    
    
    function deleteUser(id) {
        return store.deleteUser(id);
    }
    

    return {
        insert,
        listUsers,
        getUser,
        updateUser,
        deleteUser,
    };
}
