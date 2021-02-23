const mongoose= require('mongoose')
const Joi= require('joi')

const User = mongoose.model(

    'user',mongoose.Schema(
        {
            name: {type:String,required:true},
            email:{type:String,required:true},
            password:{type:String,required:true},
        }
    )
)




function validate(user){
    let schema = Joi.object({
        name:Joi.string,
        email:Joi.string,
        password:Joi.string
    }
        
    )
    const {error,result}=schema.validate(user)
    if(error){
        throw error;
    }
}

exports.User = User
exports.validate = validate

