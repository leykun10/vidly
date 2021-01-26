
const express= require('express')
const Joi = require('joi')
const mongoose = require('mongoose')
const { getgid } = require('process')
const router = express.Router()


const Genre = mongoose.model('genre',mongoose.Schema({
    name:{type:String,required:true,maxlength:20}
}))
 



router.get('/',async (req,res)=>{
    const {error,result} =await getGenres()
    if(error!=null) return res.status(404).send('Sorry, cant find that');
    
    res.send(result)
})

router.post('/', async (req,res)=>{

    const {error,result} = await createGenre(req.body)
    if(error){
     return res.status(404).send("error");
    }
    res.send(result)
   

})

router.put('/:id',async (req,res)=>{
    const {error,result} =await  updateGenre(req.params.id,req.body)
    if(error){
        return res.status(404).send(error);
    }
    res.send(result)
    

})

router.delete('/id', async (req,res)=>{
    const {error,result} =await deleteGenre(req.params.id)
    if(error){
      return res.status(404).send(error);
    }
    res.send(result)
    

})
router.get('/:id', async(req,res)=>{
    const {error,result} = await getGenre(req.params.id)
    if(error){
     return res.status(404).send(error);
    }
    res.send(result)
})

async function getGenre(id){
    try{

        const genre = await Genre.findById(id)

        return {
            "error":null,
            "result":genre
        }
    }
    catch(error){
        return {
            "error":error,
            "result":null
        }
    }


}

async function updateGenre(id,updateGenre){
    try{
        validate(updateGenre);
        const genre = await Genre.findByIdAndUpdate(id,{name:updateGenre.name},{new:true})
        return {
            "error":null,
            "result":genre
        }
    }
    catch(error){
        return {
            "error":error,
            "result":null
        }
    }
 

}

async function createGenre(newGenre){
  
    try{
        validate(newGenre)
        const genre = new Genre({
            name:newGenre.name
        })
        const result =await  genre.save()
        return {
            "error":null,
            "result":result
        }
    }
    catch(error){
    
        return {
            "error":error,
            "result":null
        }
    }
  
}
async function getGenres(){

    try{
        const genres= await Genre.find()
        
        return {
            "error":null,
            "result":genres
        }
    }
    catch(error){
        console.log(error)
        return {
            "error":error,
            "result":null
        }
    }

}
async function deleteGenre(id){
    try{
       const result = Genre.findByIdAndDelete(id)
       return {
        "error":null,
        "result":result
    }

    }
    catch(error){
        return {
            "error":error,
            "result":null
        }
    }

}

function validate(genre){
 let schema = Joi.object({
     "name":Joi.string().min(3).required()
 })
 const {error,result}= schema.validate(genre);
 if(error){
     throw error;
 }
}

module.exports=router
