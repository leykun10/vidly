const Joi = require('joi')
const mongoose = require('mongoose')

const Genre = mongoose.model('genre',mongoose.Schema({
    name:{type:String,required:true,maxlength:20}
}))

function validate(genre){
    let schema = Joi.object({
        "name":Joi.string().min(3).required()
    })
    const {error,result}= schema.validate(genre);
    if(error){
        throw error;
    }
   }

   exports.Genre = Genre;
   exports.validate = validate;
