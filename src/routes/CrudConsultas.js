const express=require('express');
const router =express.Router();
const {isAuthenticated}=require('../helpers/auth');
//Declaracion del modelo del Schema
const ConsultaDB=require('../models/Consulta');
const PacienteDB=require('../models/Paciente');
const SintomasDB=require('../models/Sintoma');
const SignosDB=require('../models/Signo');
const PruebaLabDB=require('../models/pruebalab');

router.get('/consultas/agregar/:id',isAuthenticated,async (req,res)=>{
    const paciente =await PacienteDB.findById(req.params.id).lean();
    const sintomas=await SintomasDB.find().lean();
    const signos=await SignosDB.find().lean();
    const pruebalab=await PruebaLabDB.find().lean();
    res.render('CrudConsultas/agregar.hbs', {paciente,signos,sintomas,pruebalab});
  });
  //Agregar al DB
router.post('/CrudConsultas/agregar',isAuthenticated,async (req,res) => {
  const {Paciente,Sintomas,Signos,PruebaLab,PruebaMuerte,Enfermedades}=req.body;
  const errors=[];
  if(!Sintomas){
    errors.push({text:'Escriba sus Apellidos'});
  }
  if(!Signos){
    errors.push({text:'Escriba el NSS'});
  }
  if(errors.length>0){
    req.flash('error_msg', 'No deje Campos en Blanco');
      res.render('CrudConsultas/agregar',{
        errors,
        Signos,
        Sintomas
      });
  }else{
      const newConsulta=new ConsultaDB({Paciente,Sintomas,Signos,PruebaLab,PruebaMuerte,Enfermedades});
     await newConsulta.save();
     req.flash('success_msg', 'Enfermedad Agregado Correctamente');
      res.redirect('/')
  }
});
  module.exports=router;