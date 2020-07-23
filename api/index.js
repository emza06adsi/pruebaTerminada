const express = require("express")
const bodyParser = require("body-parser").json()
const config = require("../config")
const errors = require(`../network/errors`);

const auth = require('./components/auth/network')
const user=require('./components/user/network')

const app = express();

app.use((req, res, next) => {   
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');

    next();

    app.options('*', (req, res) => {
        // allowed XHR methods  
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
        res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

        res.send();
    });
});

app.use(bodyParser);

app.use("/api/auth",auth);
app.use("/api/user",user)

app.use(errors);
app.listen(config.api.port,()=>{
    console.log('primer pinito: '+config.api.port)
})