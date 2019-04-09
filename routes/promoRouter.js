const express=require('express');
const bodyParser=require('body-parser');

const promoRouter =express.Router();
promoRouter.use(bodyParser.json());

promoRouter.route('/')                    //on this endpoint this express app will work
    .get(function(req,res,next){
        res.end('will send all the proms to you');
    })

    .post(function(req,res,next){
        res.end(' will add the prom '+req.body.name+' with details '+req.body.description);
    })
    .put(function(req,res,next){
        res.statusCode=403;
        res.end('put operation is not supported on /promos');
    })
    .delete(function(req,res,next){
        res.end('deleting all the promos!');
    });

module.exports=promoRouter;