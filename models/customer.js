
const Joi = require('joi')
const mongoose = require('mongoose')

const Customer = mongoose.model('customer',mongoose.Schema({
    isGold:{type:Boolean},
    name:{type:String,required:true,maxlength:20},
    phone_number:{type:String}
    
}))

function validate(customer){
   
    let schema = Joi.object({
        "isGold":Joi.boolean(),
        "name":Joi.string().min(3).required(),
        "phone_number":Joi.string().min(9)
    })
    const {error,result}= schema.validate(customer);
   
    if(error){
     
        throw error;
    }
   
   }

   exports.Customer = Customer;
   exports.validate = validate;
