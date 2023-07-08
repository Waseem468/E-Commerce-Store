const express=require("express");
require('dotenv').config();
const SECRET_KEY="sk_test_51NG19iSEj6XytKGLRDnYZZhz7b5mmwRpCdqLPrn992jQioFMuakfa4uxP1ZzQHSGBqT4Zcz1uKyuZXwQZ79YWa5u00chsaGyJw";
// console.log(SECRET_KEY)
const app=express();

const stripe=require('stripe')(SECRET_KEY)
app.use(express.json())

app.use((req,res,next)=>{
    res.header("Access-control-Allow-Origin","*")
    res.header("Access-control-Allow-Headers","*")
    res.header("Access-control-Request-Method","*")
next()
})

app.get("/secret/:amt",async(req,res)=>{
    const paymentIntent=await stripe.paymentIntents.create({
        currency:'inr',
        amount:req.params.amt*100,
        automatic_payment_methods:{enabled:true}
    })

    const intent=paymentIntent
    res.status(200).send({client_secret:intent.client_secret})
})

app.listen(8080,()=>{
    console.log("running")
})