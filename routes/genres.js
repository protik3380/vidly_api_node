const auth = require('../middleware/auth');
const {Genre,validate} = require('../models/genre');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/',async (req,res)=>{
    const genres =  await Genre.find().sort('name');
    res.send(genres);
});

router.post('/',auth,async (req,res)=>{
    const {error} = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    let genre = new Genre({name:req.body.name});
    genre = await genre.save()
    res.send(genre);
});

router.put('/:id',async(req,res)=>{
    const{error}= validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    if(mongoose.Types.ObjectId.isValid(req.params.id)) {
        const genre = await Genre.findByIdAndUpdate(req.params.id,{name:req.body.name},{
            new:true
        });
        res.send(genre);
      } 
    else{
        return res.status(404).send('The genre with the given ID was not found . ');
    }  
});

router.delete('/:id',async(req,res)=>{
    if(mongoose.Types.ObjectId.isValid(req.params.id)) {
        const genre = await Genre.findByIdAndRemove(req.params.id);
        res.send(genre);
    }
    else {
        return res.status(404).send('The genre with the given ID was not found .');
    }  
});

router.get('/:id',async(req,res)=>{
    if(mongoose.Types.ObjectId.isValid(req.params.id)) {
        const genre = await Genre.findById(req.params.id);
        res.send(genre);
    }   
    else {
        return res.status(404).send('The genre with the given ID was not found .');
    }   
});

module.exports = router;