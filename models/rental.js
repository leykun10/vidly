
const Joi = require('joi')
const mongoose = require('mongoose')



const Rental = mongoose.model('Rental',mongoose.Schema({
 customer:{
     type: new mongoose.Schema(
        {
            name:{type:String,required:true,maxlength:20},
            phone_number:{type:String}
            
        }
     ),
     required:true
      
 },
 movie:{
type: new mongoose.Schema({
    title:{type:String,required:true},
    daily_rental_rate:{type:Number,required:true},
 
 }),
 required:true
 },
 dateOut:{
     type:Date,
     required:true,
     default: Date.now
 }
 ,
 dateReturned: {
      type:Date,
 },
 rentalFee:{
     type:Number,  
     min:0
 }

}))

function validate(rental){
    const schema = Joi.object({
        "customerId":Joi.objectId.required(),
        "movieId":Joi.objectId.required(), 
    })
    const {error,result}= schema.validate(rental);
    if(error){
        throw error;
    }
   
   }
   

   exports.Rental = Rental;
   exports.validate = validate;
