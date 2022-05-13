const express=require('express');
const router =express.Router();
const {isAuthenticated}=require('../helpers/auth');
//Paginas de Navegacion
router.get ('/',(req, res)=>{
    res.render('Navigation/index', {title: 'Proyecto Final'});
});
router.get ('/pacientes',isAuthenticated,(req, res)=>{
    res.render('Navigation/pacientes');
});
router.get ('/signos',isAuthenticated,(req, res)=>{
    res.render('Navigation/signos');
});
router.get ('/prueba-laboratorio',isAuthenticated,(req, res)=>{
    res.render('Navigation/pruebaslaboratorios');
});
router.get ('/sintomas',isAuthenticated,(req, res)=>{
    res.render('Navigation/sintomas');
});
router.get ('/prueba-muerte',isAuthenticated,(req, res)=>{
    res.render('Navigation/pruebamuerte');
});
router.get ('/enfermedad',isAuthenticated,(req, res)=>{
    res.render('Navigation/enfermedades');
});
router.get ('/consultas',isAuthenticated,(req, res)=>{
    res.render('Navigation/consultas');
});
router.get ('/historial',isAuthenticated,(req, res)=>{
    res.render('Navigation/historial');
});

module.exports=router;