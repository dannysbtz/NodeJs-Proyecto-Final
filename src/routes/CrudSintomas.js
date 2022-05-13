const express=require('express');
const router =express.Router();
const {isAuthenticated}=require('../helpers/auth');
//Declaracion del modelo del Schema
const Sintoma=require('../models/Sintoma');
//Direccion de Sintomas Agregar
router.get ('/sintomas/agregar',isAuthenticated,(req, res)=>{
    res.render('CrudSintomas/agregar');
});

//Agregar al DB
router.post('/CrudSintomas/agregar',isAuthenticated,async (req,res) => {
  const {Nombre}=req.body;
  const errors=[];
  if(!Nombre){
    errors.push({text:'(Escriba un Nombre)'});
  }
  if(errors.length>0){
    req.flash('error_msg', 'No deje Campos en Blanco');
      res.render('CrudSintomas/agregar',{
        errors,  
        Nombre,
      });
  }else{
      const newSintoma=new Sintoma({Nombre});
     await newSintoma.save();
     req.flash('success_msg', 'Sintoma Agregado Correctamente');
      res.redirect('/sintomas/mostrar')
  }
});
//Mostrar Datos
router.get('/sintomas/mostrar',isAuthenticated, async(req,res)=>{
  const sintoma=await Sintoma.find().lean();
  res.render('CrudSintomas/mostrar',{sintoma});
});
//Editar Datos
router.get('/sintomas/editar/:id',isAuthenticated,async (req,res)=>{
  const sintoma =await Sintoma.findById(req.params.id).lean();
  res.render('CrudSintomas/editar', {sintoma});
});
router.put('/CrudSintomas/editar/:id',isAuthenticated, async (req,res)=>{
  const {_id,Nombre}=req.body;
  const errors=[];
  if(!Nombre){
    errors.push({text:'Escriba un Nombre'});
  }
  if(errors.length>0){
    const Sintoma =await Sintoma.findById(req.params.id).lean();
      res.render('CrudSintomas/editar',{Sintoma, errors});
  }else{
    req.flash('success_msg', 'Sintoma Editado Correctamente');
    await Sintoma.findByIdAndUpdate(req.params.id, {Nombre});
    res.redirect('/sintomas/mostrar');
  }
 
});

//Eliminar Datos
router.delete('/sintomas/eliminar/:id',isAuthenticated, async(req,res)=>{
  req.flash('success_msg', 'Sintoma Eliminado Correctamente');
  await Sintoma.findByIdAndDelete(req.params.id);
  res.redirect('/sintomas/mostrar')
});

module.exports=router;