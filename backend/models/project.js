'use strict'
var mongoose=require('mongoose');
var schema=mongoose.Schema;

var projecTSchema=schema({
    dia: String,
    hora:String,
    nMesa: Number,
    nombre:String,
});

module.exports=mongoose.model('project',projecTSchema);