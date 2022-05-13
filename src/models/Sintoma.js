const mongoose = require('mongoose');
const {Schema}=mongoose;
const SintomaSchema=new Schema({
    Nombre: {type: String,required:true},
});
module.exports=mongoose.model('Sintomas',SintomaSchema);