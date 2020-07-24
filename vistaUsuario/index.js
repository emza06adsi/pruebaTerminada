$urlGlobal = "http://localhost:3001/api/"

//variables
var Factura
var jwt;


//inputs
let $idUsuario = null
let $key = null
let $idusuario = null

//buttons
const $acces = document.getElementById('acces')
const $cerarModal = document.getElementById('cerarModal')
const $cerarModalUpster = document.getElementById('CerarModalUpster')
const $ingresarData = document.getElementById('ingresarData')
const $btnUsuarioUnidad = document.getElementById('btnUsuarioUnidad')
const $btnListarUsuaarios = document.getElementById('btnListarUsuaarios')
const $crearUsuario = document.getElementById('btnCrearUsuario')
//events

$crearUsuario.addEventListener('click', () => { abrirModalUpsert() })
$acces.addEventListener('click', () => { abrirModal() })
$cerarModal.addEventListener('click', () => { CerarModal() })
$cerarModalUpster.addEventListener('click', () => { CerarModalUpster() })
$ingresarData.addEventListener('click', () => { IgresarDatosUsuario() })
$btnUsuarioUnidad.addEventListener('click', () => { listarDada() })
$btnListarUsuaarios.addEventListener('click', () => { IngresUsuario() })

document.getElementById("idUsuario").addEventListener('change', () => {
    document.getElementById("idUsuario").style.borderColor = "#0c6e84"
})


const abrirModal = () => {
    document.getElementById('modal-overlay').style.animation = 'modalIn .8s forwards'
    document.getElementById("modal").classList.add("active")
}

const CerarModal = () => {
    document.getElementById('modal-overlay').style.animation = 'modalOut .8s forwards'
    document.getElementById("modal").classList.remove("active")

}

const CerarModalUpster = () => {
    document.getElementById('modal-overlayUpsert').style.animation = 'modalOut .8s forwards'
    document.getElementById("modalUpsert").classList.remove("active")

}

const abrirModalUpsert = () => {
    if (jwt == null) {
        document.getElementById('modal-overlay').style.animation = 'modalIn .8s forwards'
        document.getElementById("modal").classList.add("active")
    } else {
        document.getElementById("nombreUsuario").value = ""
        document.getElementById("tipo_identificacion").value = ""
        document.getElementById("numero_identificacion").value = ""
        document.getElementById("fecha_ingreso").value = ""
        document.getElementById("salario").value = ""
        document.getElementById("telefono").value = ""
        document.getElementById("telefono_celular").value = ""
        document.getElementById("telefono_contacto").value = ""
        document.getElementById("contraseña").value = ""
        document.getElementById("correo").value = ""



        document.getElementById('modal-overlayUpsert').style.animation = 'modalIn .8s forwards'
        document.getElementById("modalUpsert").classList.add("active")

        // ------
        $btnActualizarUsuario = document.getElementById("CREAR").addEventListener('click', async () => {

            axios.post('http://localhost:3001/api/user/insert', {

                nombre: document.getElementById("nombreUsuario").value,
                tipo_identificacion: document.getElementById("tipo_identificacion").value,
                numero_identificacion: parseInt(document.getElementById("numero_identificacion").value),
                fecha_ingreso: document.getElementById("fecha_ingreso").value,
                salario: document.getElementById("salario").value,
                telefono: parseInt(document.getElementById("telefono").value),
                telefono_celular: parseInt(document.getElementById("telefono_celular").value),
                telefono_contacto: parseInt(document.getElementById("telefono_contacto").value),
                correo: document.getElementById("correo").value,
                contraseña: document.getElementById("contraseña").value,

            })
                .then(function (response) {
                    // tablas(response.data.body[0])
                    document.getElementById('modal-overlayUpsert').style.animation = 'modalOut .8s forwards'
                    document.getElementById("modalUpsert").classList.remove("active")
                    // IngresUsuario();
                    IngresUsuario();


                })
                .catch(function (error) {
                    console.log(error);
                    document.getElementById('modal-overlayUpsert').style.animation = 'modalOut .8s forwards'
                    document.getElementById("modalUpsert").classList.remove("active")

                    // let message = "<h1>ERROR </h1>"

                    // document.getElementById("btnConfirm").innerHTML = message;

                    IngresUsuario();
                })





        })
        // .....

    }

}

const IgresarDatosUsuario = async () => {
    $key = document.getElementById("key").value
    $idusuario = document.getElementById("idusuario").value
    let datos = { id: $idusuario, contrasena: $key }
    let response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(datos)
    });

    let result = await response.json();
    jwt = await result.body
    document.cookie = await jwt;

    document.getElementById('modal-overlay').style.animation = 'modalOut .8s forwards'
    document.getElementById("modal").classList.remove("active")
}

const listarDada = () => {
    $idUsuario = document.getElementById("idUsuario")
    if ($key == null || $idusuario == null || $key == "" || $idusuario == "") {
        document.getElementById('modal-overlay').style.animation = 'modalIn .8s forwards'
        document.getElementById("modal").classList.add("active")
    }
    else if ($idUsuario.value == "" || $idUsuario == null) {
        $idUsuario.style.borderColor = "#cb161d"
    }
    else {
        axios.interceptors.request.use(
            config => {
                config.headers.authorization = `Bearer ${jwt}`
                return config;
            },
            error => {
                return Promise.reject(error);
            }
        );

        axios.get('http://localhost:3001/api/user/' + $idUsuario.value)
            .then(function (response) {
                tablas(response.data.body[0])

            })
            .catch(function (error) {
                console.log(error);
            })
    }

}

const IngresUsuario = async () => {

    if (jwt == null) {
        document.getElementById('modal-overlay').style.animation = 'modalIn .8s forwards'
        document.getElementById("modal").classList.add("active")
    }
    else {

        axios.interceptors.request.use(
            config => {
                config.headers.authorization = `Bearer ${jwt}`
                return config;
            },
            error => {
                return Promise.reject(error);
            }
        );

        axios.get('http://localhost:3001/api/user/')
            .then(function (response) {
                tablas(response.data.body[0])

            })
            .catch(function (error) {
                console.log(error);

                let message = "<h1> expiro la sesion ingresa denuevo </h1>"

                document.getElementById("btnConfirm").innerHTML = message;

            })
    }
}

function tablas(data) {
    let tabla = ""

    if (data == null || data == "") {
        tabla += "<h1> el dato no existe o fue mal creado </h1>"
        document.getElementById("btnConfirm").innerHTML = tabla;

    }

    else {

        tabla += ` <table id="productos" class="table table-bordered display " style="width:100%">
    <thead>
        <tr>
            <th>Nombre</th>
            <th>Número identificación</th>
            <th>correo</th>
            <th>teléfono celular</th>
            <th>Modificar</th>
            <th>Eliminar</th>
            
    </tr>
    </thead>
    <tbody id="productosT">`

        data.map(datos => {

            let dato = JSON.stringify(datos)
            tabla += `<tr>
      <td>${datos.nombre}</td>
      <td>${datos.numero_identificacion}</td>
      <td>${datos.correo}</td>
      <td>${datos.telefono_celular}</td>
      <td>
        <input  onclick="actualizarUsuario(${datos.numero_identificacion})" class="listUsuarios" type="button" value="Editar" />
      </td>
      <td>
        <input  onclick="eliminarUsuario(${datos.numero_identificacion})" class="listUsuario" type="button" value="Eliminar" />
      </td>
      
      <tr>`
        })


        tabla += `
  </tbody>

</table>
`


        document.getElementById("btnConfirm").innerHTML = tabla;

    }
}

function actualizarUsuario(dato) {
    axios.interceptors.request.use(
        config => {
            config.headers.authorization = `Bearer ${jwt}`
            return config;
        },
        error => {
            return Promise.reject(error);
        }
    );

    axios.get('http://localhost:3001/api/user/' + dato)
        .then(function (response) {

            document.getElementById("nombreUsuario").value = response.data.body[0][0].nombre
            document.getElementById("tipo_identificacion").value = response.data.body[0][0].tipo_identificacion
            document.getElementById("numero_identificacion").value = response.data.body[0][0].numero_identificacion
            document.getElementById("fecha_ingreso").value = response.data.body[0][0].fecha_ingreso
            document.getElementById("salario").value = response.data.body[0][0].salario
            document.getElementById("telefono").value = response.data.body[0][0].telefono
            document.getElementById("telefono_celular").value = response.data.body[0][0].telefono_celular
            document.getElementById("correo").value = response.data.body[0][0].correo
            document.getElementById("telefono_contacto").value = response.data.body[0][0].telefono_contacto
            document.getElementById("contraseña").value = response.data.body[0][0].contrasena


            document.getElementById('modal-overlayUpsert').style.animation = 'modalIn .8s forwards'
            document.getElementById("modalUpsert").classList.add("active")
            $btnActualizarUsuario = document.getElementById("ACTUALIZAR").addEventListener('click', () => { ActualizarUsuarios() })
            // tablas(response.data.body[0])

        })
        .catch(function (error) {
            console.log(error);
        })
}

s
function ActualizarUsuarios() {

    axios.post('http://localhost:3001/api/user/update', {

        nombre: document.getElementById("nombreUsuario").value,
        tipo_identificacion: document.getElementById("tipo_identificacion").value,
        numero_identificacion: parseInt(document.getElementById("numero_identificacion").value),
        fecha_ingreso: document.getElementById("fecha_ingreso").value,
        salario: document.getElementById("salario").value,
        telefono: parseInt(document.getElementById("telefono").value),
        telefono_celular: parseInt(document.getElementById("telefono_celular").value),
        telefono_contacto: parseInt(document.getElementById("telefono_contacto").value),
        correo: document.getElementById("correo").value,
        contraseña: document.getElementById("contraseña").value,

    })

        .then(function (response) {
            // tablas(response.data.body[0])
            document.getElementById('modal-overlayUpsert').style.animation = 'modalOut .8s forwards'
            document.getElementById("modalUpsert").classList.remove("active")

            IngresUsuario();

        })
        .catch(function (error) {
            console.log(error);
            document.getElementById('modal-overlayUpsert').style.animation = 'modalOut .8s forwards'
            document.getElementById("modalUpsert").classList.remove("active")
            // let message = "<h1> ERROR </h1>"

            // document.getElementById("btnConfirm").innerHTML = message;

            IngresUsuario();
        })





}


function eliminarUsuario(dato) {
    axios.interceptors.request.use(
        config => {
            config.headers.authorization = `Bearer ${jwt}`
            return config;
        },
        error => {
            return Promise.reject(error);
        }
    );

    axios.post('http://localhost:3001/api/user/delete', {
        numero_identificacion: dato
    })
        .then(function (response) {
            // tablas(response.data.body[0])
            IngresUsuario();
        })
        .catch(function (error) {
            console.log(error);

            let message = "<h1> error al borrar </h1>"

            document.getElementById("btnConfirm").innerHTML = message;
            IngresUsuario();

        })
}

