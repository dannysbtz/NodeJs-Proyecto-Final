const mongoose = require('mongoose');
const {Schema}=mongoose;
const ConsultaSchema=new Schema({
    Paciente:{type:mongoose.Types.ObjectId,required:true},
    Sintomas:{type:Array,required:true},
    Signos:{type:Array,required:true},
    PruebaLab:{type:Array,required:false},
    PruebaMuerte:{type:Array,required:false},
    Enfermedades:{type:Array,required:false}
});
module.exports=mongoose.model('consultas',ConsultaSchema);