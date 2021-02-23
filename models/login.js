const mongoose= require('mongoose')
const Joi= require('joi')


const Login = mongoose.model(

    'login',mongoose.Schema(
        {
               email:{type:String,required:true},
               password:{type:String,required:true},
        }
    )
)




function validate(user){
    let schema = Joi.object({
        email:Joi.string,
        password:Joi.string
    }
        
    )
    const {error,result}=schema.validate(user)
    if(error){
        throw error;
    }
}
exports.Login = Login
exports.validate = validate

