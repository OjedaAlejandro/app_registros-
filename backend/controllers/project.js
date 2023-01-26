' use strict'
const { findByIdAndUpdate } = require('../models/project');
const project = require('../models/project');
var Project=require('../models/project')
var controller={
    home: function(){

    },
    test: function(req,res){
        return res.status(200).send({
            message:"Soy el metodo o accion test"
        })
    },
    saveProject:function(req,res){
        var project= new Project();
        var params=req.body;
        
        project.fecha=params.fecha,
        project.hora=params.hora,
        project.nombre=params.nombre,
        project.estado=params.estado;
        
		project.save((err, projectStored) => {
			if(err) return res.status(500).send({message: 'Error al guardar el documento.'});

			if(!projectStored) return res.status(404).send({message: 'No se ha podido guardar el proyecto.'});

			return res.status(200).send({project: projectStored});
		});
    },
    getProjects: function(req,res){
        project.find({}).exec((err,project)=>{
            if(err) return res.status(500).send({message:'error al devolver los datos'});
            if(!project) return res.status(404).send({message:'No hay projectos que mostrar'});

            return res.status(200).send({project});
        });
    },
    getProject: function(req,res){
        var projectId=req.params.id;
        project.findById(projectId,(err,project)=>{
            if(err) return res.status(500).send({message:'error al devolver los datos'});
            if(!project) return res.status(404).send({message:'No hay projectos que mostrar'});

            return res.status(200).send({project});
        });
    },
    delateProject:function(req,res){
        var projectId=req.params.id;

        project.findByIdAndRemove(projectId,(err,projectRemove)=>{
            if(err) return res.status(200).send({messege:'No se ha podido borrar el proyecto'});
            
            if(!projectRemove) return res.status(404).send({message:'No se pudo eliminar ese documento'})

            return res.status(200).send({
                project:projectRemove
            })
        })
    },
    editProject: function(req,res){
        var projectId=req.params.id;
        var update=req.body;
        project.findByIdAndUpdate(projectId,update,{new:true},(err,projectUpdate)=>{
            if(err) return res.status(200).send({messege:'Error al actualizar'});
            
            if(!projectUpdate) return res.status(404).send({message:'El archivo no existe'})

            return res.status(200).send({
                project:projectUpdate
            })
        })
    }
};

module.exports=controller;