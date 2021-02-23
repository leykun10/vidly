
const express= require('express')
const Joi = require('joi')
const mongoose = require('mongoose')
const {Customer,validate} = require('../models/customer')
const router = express.Router()




router.get('/',async (req,res)=>{
    const {error,result} =await getCustomers()
    if(error!=null) return res.status(404).send('Sorry, cant find that');
    
    res.send(result)
})

router.post('/', async (req,res)=>{
      
    const {error,result} = await createCustomer(req.body)
    if(error){
        console.log(error)
     return res.status(404).send("error");
    }
    res.send(result)
   

})

router.put('/:id',async (req,res)=>{
    const {error,result} =await  updateCustomer(req.params.id,req.body)
    if(error){
        return res.status(404).send(error);
    }

    res.send(result)
    

})

router.delete('/:id', async (req,res)=>{
    const {error,result} =await deleteCustomer(req.params.id)
    if(error){
      return res.status(404).send(error);
    }
    res.send(result)
    

})
router.get('/:id', async(req,res)=>{
    const {error,result} = await getCustomer(req.params.id)
    if(error){
     return res.status(404).send("no such file");
    }
    res.send(result)
})

async function getCustomer(id){
    try{

        const customer = await Customer.findById(id)

        return {
            "error":null,
            "result":customer
        }
    }
    catch(error){
        return {
            "error":error,
            "result":null
        }
    }


}

async function updateCustomer(id,updateCustomer){

    try{
        validate(updateCustomer);
        const customer = await Customer.findByIdAndUpdate(id,{
            isGold:updateCustomer.isGold,
            name:updateCustomer.name,
            phone_number:updateCustomer.phone_number
        },{new:true})
        return {
            "error":null,
            "result":customer
        }
    }
    catch(error){
        return {
            "error":error,
            "result":null
        }
    }
 

}

async function createCustomer(newCustomer){

    try{
        validate(newCustomer)
        const customer = new Customer({
            isGold:newCustomer.isGold,
            name:newCustomer.name,
            phone_number:newCustomer.phone_number
        })
        
        await  customer.save()
    
        return {
            "error":null,
            "result":customer
        }
    }
    catch(error){
    
        return {
            "error":error,
            "result":null
        }
    }
  
}
async function getCustomers(){

    try{
        const customers= await Customer.find()
        
        return {
            "error":null,
            "result":customers
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
async function deleteCustomer(id){
    try{
       const result =await Customer.findByIdAndDelete(id)
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
