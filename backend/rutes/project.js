'use strict'
const express=require('express');
const projectController=require('../controllers/project');

const router=express.Router();

//rutas
router.get('/test',projectController.test); 
router.post('/project',projectController.saveProject);
router.get('/projects',projectController.getProjects);
router.get('/project/:id',projectController.getProject);
router.delete('/project/:id',projectController.delateProject);
router.put('/project/:id',projectController.editProject);

module.exports=router