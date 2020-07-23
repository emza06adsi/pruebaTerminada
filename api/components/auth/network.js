const express = require('express');
const response = require('../../../network/response');
const Controller = require('./index');
const router = express.Router();


router.get('/prueba', (req,res)=>{
    res.send("<h1>PAPA LUCAS</h1>")
    console.log("aca toy")
})

router.post('/login', function(req, res, next) {
//    console.log(req.body)
    Controller.login(req.body.id, req.body.contrasena)
        .then(token => {
            response.success(req, res, token, 200);
        })
        .catch(next);
})


module.exports = router;