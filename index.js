const express=require('express')
const {produceNotification}=require('./kafka/producer.js')
//const {consumer,consumer_noninteractive,consumer_interactive}=require('./kafka/producer.js')
const app=express()
const {interactive_consumer,noninteractive_consumer}=require('./kafka/level1-consumer.js')
const {emailConsume}=require('./kafka/email_consumer.js')
const {whatsappConsume}=require('./kafka/whatsapp_consumer.js')
const {notificationConsume}=require('./kafka/notification_consumer.js')
// const {cronJobEmail,
//     cronJobWhatsapp,
//     cronJobNotification}=require('./cron.js')
const {cron}=require('./cron')



app.use(express.json())
app.use(express.urlencoded({extended:true}))

//consumer(consumer_interactive)
//consumer(consumer_noninteractive)
 


app.post('/sendNotification',async(req,res)=>{
    try{
        const {title,message,topic,priority,id}=req.body
        //console.log(title,message)
        if(!title || !message || !topic){
            return res.status(400).json({
                status:"error",
                message:"Please provide title,message and topic"
            })
        }

        await produceNotification(title,message,priority,topic,id)

        
        res.status(200).json({
            status:"success",
            message:"Notification sent successfully"
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            status:"error",
            message:"Internal server error"
        })
    }
})


app.get('/',(req,res)=>{
    res.send("Hello World")
})



app.listen(3001,async()=>{
   await interactive_consumer()
   await  noninteractive_consumer()
   await emailConsume()
   await whatsappConsume()
   await notificationConsume()
   await cron()
//    await cronJobEmail(),
//    await cronJobWhatsapp(),
  // await cronJobNotification()
   
   console.log("Server started at port 3001")
})
