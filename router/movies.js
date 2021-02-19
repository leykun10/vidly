
const express= require('express')
const Joi = require('joi')
const mongoose = require('mongoose')
const {Movie,validate} = require('../models/movie')
const {Genre} = require('../models/genre')
const router = express.Router()


console.log('delete')
 



router.get('/',async (req,res)=>{
    const {error,result} =await getMovies()
    if(error!=null) return res.status(404).send('Sorry, cant find that');
    
    res.send(result)
})

router.post('/', async (req,res)=>{
    const {error,result} = await createMovie(req.body)
    if(error){
     return res.status(404).send("error");
    }
    res.send(result)
   

})

router.put('/:id',async (req,res)=>{
    const {error,result} =await  updateMovie(req.params.id,req.body)
    if(error){
        return res.status(404).send(error);
    }
    res.send(result)
    

})

router.delete('/id', async (req,res)=>{
    console.log('delete')
    const {error,result} =await deleteMovie(req.params.id)
    if(error){
      return res.status(404).send(error);
    }
    res.send(result)

})
router.get('/:id', async(req,res)=>{
    const {error,result} = await getMovie(req.params.id)
    if(error){
     return res.status(404).send(error);
    }
    res.send(result)
})

async function getMovie(id){
    try{

        const movie = await Movie.findById(id)

        return {
            "error":null,
            "result":movie
        }
    }
    catch(error){
        return {
            "error":error,
            "result":null
        }
    }


}

async function updateMovie(id,updateMovie){
    try{
        validate(updateMovie);
        const movie = await Movie.findByIdAndUpdate(id,{title:updateMovie.title,
            genre:updateMovie.genre,
            number_in_stock:updateMovie.number_in_stock,
            daily_rental_rate:updateMovie.daily_rental_rate
        },{new:true});
        return {
            "error":null,
            "result":movie
        }
    }
    catch(error){
        return {
            "error":error,
            "result":null
        }
    }
 

}

async function createMovie(newMovie){
  
    try{
        validate(newMovie)
       const genre = await Genre.findById(newMovie.genreId)
       console.log(genre)
       console.log(newMovie)
        const movie = new Movie({
            title:newMovie.title,
            genre:{name:genre.name},
            number_in_stock:newMovie.number_in_stock,
            daily_rental_rate:newMovie.daily_rental_rate

        })
        const result =await  movie.save()
        return {
            "error":null,
            "result":result
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
async function getMovies(){

    try{
        const movies= await Movie.find()
        
        return {
            "error":null,
            "result":movies
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
async function deleteMovie(id){
    try{
       const result = Movie.findByIdAndDelete(id)
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



module.exports=router
