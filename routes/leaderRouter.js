const express=require('express');
const bodyParser=require('body-parser');

const leaderRouter =express.Router();
leaderRouter.use(bodyParser.json());

leaderRouter.route('/')                    //on this endpoint this express app will work
    .get(function(req,res,next){
        res.end('will send all the leaders to you');
    })

    .post(function(req,res,next){
        res.end(' will add the leaders '+req.body.name+' with details '+req.body.description);
    })
    .put(function(req,res,next){
        res.statusCode=403;
        res.end('put operation is not supported on /leaders');
    })
    .delete(function(req,res,next){
        res.end('deleting all the leaders!');
    });

module.exports=leaderRouter;