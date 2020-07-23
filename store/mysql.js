const mysql = require("mysql")
const config = require("../config");

const dbconf = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
};

var connection;

const handleCon =()=> {
    connection = mysql.createConnection(dbconf);
    connection.connect((err) => {
        if (err) {
            console.error('[db err]', err);
            setTimeout(handleCon, 2000);
        } else {
            console.log('DB Connected!');
        }
    });


    connection.on('error', err => {
        console.error('[db err]', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleCon();
        } else {
            throw err;
        }
    })
}

handleCon()

 
 function listUsers () {
    return new Promise((resolve, reject) => {
        connection.query(`call listar_usuarios() `, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        })
    })
}

function getUser (id) {
    return new Promise((resolve, reject) => {
        connection.query(`call listar_usuario(?) `,[id], (err, data) => {
            if (err) return reject(err);
            resolve(data);
        })
    })
}

const createUser =(data) => {
    return new Promise((resolve, reject) => {
        connection.query(`call ingresar_usuario(?,?,?,?,?,?)`,
         [
             data.nombre,
             data.tipo_identificacion,
             data.numero_identificacion,
             data.fecha_ingreso,
             data.salario,
             data.contraseña,

          ], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        })

    })
}

const createInfo = (data) => {
    return new Promise((resolve, reject) => {
        connection.query(`call insertar_contacto(?,?,?,?,?)`,
         [
             data.telefono,
             data.telefono_celular,
             data.telefono_contacto,
             data.correo,
             data.numero_identificacion,
          ], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        })

    })
}

const updateUser=(data) => {
    return new Promise((resolve, reject) => {
        connection.query(`call modificar_usuario(?,?,?,?,?)`,
         [
             data.nombre,
             data.tipo_identificacion,
             data.numero_identificacion,
             data.fecha_ingreso,
             data.salario,

          ], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        })

    })
}

const updateInfo = (data) => {
    return new Promise((resolve, reject) => {
        connection.query(`call modificar_contacto(?,?,?,?,?)`,
         [
             data.telefono,
             data.telefono_celular,
             data.telefono_contacto,
             data.correo,
             data.numero_identificacion,
          ], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        })

    })
}

function deleteUser (id) {
  
    return new Promise((resolve, reject) => {
        connection.query(`call eliminar_usuario(?) `,[id.numero_identificacion], (err, data) => {
            if (err) return reject(err);
            resolve(data);
        })
    })
}

function login (id) {
    
    return new Promise((resolve, reject) => {
        connection.query(`call ingresar_usuario_sistema(?)`, id, (err, res) => {
            if (err) {
    
                return reject(err);
            }
            else {
                resolve(res[0] || null);
            }
        })
    })
    
    
}


module.exports = {
    createUser,
    createInfo,
    listUsers,
    getUser,
    updateUser,
    updateInfo,
    deleteUser,
    login
};
