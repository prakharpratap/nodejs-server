const express=require('express');
const bodyParser=require('body-parser');

const dishRouter =express.Router();
dishRouter.use(bodyParser.json());
const mongoose=require('mongoose');
const Dishes=require('../models/dishes');



dishRouter.route('/')                    //on this endpoint this express app will work
.get(function(req,res,next){
    Dishes.find({})
        .then(function(dishes){
            res.statusCode=200;
            res.setHeader('Content-Type','application/json');
            res.json(dishes);
        },function(err){next(err)})
})

.post(function(req,res,next){
    Dishes.create(req.body)
        .then(function(dish){
            console.log('dish created',dish);
            res.statusCode=200;
            res.setHeader('Content-Type','application/json');
            res.json(dish);
        },function(err){next(err)})
})
.put(function(req,res,next){
    res.statusCode=403;
    res.end('put operation is not supported on /dishes');
})
    .delete(function(req,res,next){
   Dishes.remove({})
       .then(function(resp){
           res.statusCode=200;
           res.setHeader('Content-Type','application/json');
           res.json(resp);
       },function(err){console.log(err)})
});


dishRouter.route('/:dishId')
    .get(function(req,res,next) {
        Dishes.findById(req.params.dishId)
            .then(function(dish){
                res.statusCode=200;
                res.setHeader('Content-Type','application/json');
                res.json(dish);
            },function(err){console.log(err)})

    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /dishes/'+ req.params.dishId);
    })
    .put((req, res, next) => {
        Dishes.findByIdAndUpdate(req.params.dishId, {
            $set: req.body
        }, { new: true })
            .then(function(dish){
                res.statusCode=200;
                res.setHeader('Content-Type','application/json');
                res.json(dish);
            },function(err){console.log(err)});
    })
    .delete((req, res, next) => {
        Dishes.findByIdAndRemove(req.params.dishId)
            .then(function(dish){
                res.statusCode=200;
                res.setHeader('Content-Type','application/json');
                res.json(dish);
            },function(err){console.log(err)});
    });


module.exports=dishRouter;