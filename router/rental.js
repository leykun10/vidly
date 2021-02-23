
const express= require('express')
const Joi = require('joi')
const mongoose = require('mongoose')
const Fawn= require('fawn') 
const {Rental,validate} = require('../models/rental')
const {Customer} = require('../models/customer')
const { Movie } = require('../models/movie')
const { exception } = require('console')
const router = express.Router()



Fawn.init('mongodb://localhost/vidly')

router.get('/',async (req,res)=>{

    const {error,result} =await getRentals()
    if(error!=null) return res.status(404).send('Sorry, cant find that');
    
    res.send(result)
})

router.post('/', async (req,res)=>{
    const {error,result} = await createRental(req.body)
    if(error){
     return res.status(404).send("error");
    }
    res.send(result)
   

})

router.put('/:id',async (req,res)=>{
    const {error,result} =await  updateRental(req.params.id,req.body)
    if(error){
        return res.status(404).send(error);
    }
    res.send(result)

    

})

router.delete('/id', async (req,res)=>{
    console.log('delete')
    const {error,result} =await deleteRental(req.params.id)
    if(error){
      return res.status(404).send(error);
    }
    res.send(result)

})
router.get('/:id', async(req,res)=>{
    const {error,result} = await getRental(req.params.id)
    if(error){
     return res.status(404).send(error);
    }
    res.send(result)
})

async function getRental(id){
    try{

        const rental = await Rental.findById(id)

        return {
            "error":null,
            "result":rental
        }
    }
    catch(error){
        return {
            "error":error,
            "result":null
        }
    }


}

async function updateRental(id,updateRental){
    
    try{
        validate(updateRental);
        const rental = await Rental.findByIdAndUpdate(id,{title:updateRental.title,
            customerId:updateRental.customerId,
            movieId:updateRental.movieId
           
        },{new:true}); 
        return {
            "error":null,
            "result":rental
        }
    }
    catch(error){
        return {
            "error":error,
            "result":null
        }
    }
 

}

async function createRental(newRental){
  
    try{
        validate(newRental)
       const customer = await Customer.findById(newRental.customerId)
       const movie = await Movie.findById(newRental.movieId)
       if(movie.number_in_stock===0){
           throw exception;
       }
        const rental = new Rental({
           customer:{
               _id:customer._id,
               name:customer.name,
               phone:customer.phone_number
           },
           movie:{
               _id:movie._id,
               title:movie.title,
               daily_rental_rate:movie.daily_rental_rate,
           },


        }); 
       var task =  new Fawn.Task()
       
       var result = await task.save(
            'rentals',rental
        ).update('movies',{_id:movie._id},
        {$inc:{number_in_stock:-1}}).run()
        
        return {
            "error":null,
            "result":rental
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
async function getRentals(){

    try{
        const rentals= await Rental.find().sort('-dateOut')
        
        return {
            "error":null,
            "result":rentals
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
async function deleteRental(id){


    try{
       const result = Rental.findByIdAndDelete(id)
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
