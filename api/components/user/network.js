const express =require('express');
const secure=require('./secure');
const response=require(`../../../network/response`)
const Controller =require(`./index`);


const router=express.Router();

// // router.put('/', secure('update'),upsert)


router.post('/insert',secure('update'),insert)
router.get('/',secure('update'),listUsers)
router.get('/:id',secure('update'),getUser)
router.put('/update',secure('update'),updateUser)
router.delete('/delete',secure('update'),deleteUser)


 function insert (req,res,next) {
    Controller.insert(req.body)
    .then((user)=>{
         response.success(req,res,user,200)
    })
    .catch(next);
 
 }

 function listUsers(req,res,next) {
    
    Controller.listUsers()
   .then((lista)=> {
    response.success(req,res,lista,200 )
   })
   .catch(next);
}

function getUser(req,res,next) {
    Controller.getUser(req.params.id)
        .then((user)=>{
            response.success(req,res,user,200)
        })
        .catch(next);
    }

function updateUser(req,res,next) {
        Controller.updateUser(req.body)
   .then((user)=>{
        response.success(req,res,user,200)
   })
   .catch(next);
}

function deleteUser(req,res,next) {
    Controller.deleteUser(req.body)
.then((user)=>{
    response.success(req,res,user,200)
})
.catch(next);
   }


module.exports=router;