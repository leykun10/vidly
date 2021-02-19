
const Joi = require('joi')
const mongoose = require('mongoose')



const Movie = mongoose.model('movie',mongoose.Schema({
   title:{type:String,required:true},
   genre:{
          type:mongoose.Schema({
            name:{type:String,required:true,maxlength:20}
        }),
   },
   number_in_stock:{type:Number,required:true},
   daily_rental_rate:{type:Number,required:true},

}))

function validate(movie){
    let schema = Joi.object({
        "title":Joi.string().required(),
        "genreId":Joi.string().required(),
         "number_in_stock":Joi.number().required(),
        "daily_rental_rate":Joi.number().required()
    })
    const {error,result}= schema.validate(movie);
    if(error){
        throw error;
    }
   
   }
   

   exports.Movie = Movie;
   exports.validate = validate;
