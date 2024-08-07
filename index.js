const express=require('express')
const {produceNotification}=require('./kafka/producer.js')
//const {consumer,consumer_noninteractive,consumer_interactive}=require('./kafka/producer.js')
const app=express()
const {interactive_consumer,noninteractive_consumer}=require('./kafka/level1-consumer.js')
const {emailConsume,notificationConsume,whatsappConsume}=require('./kafka/level2-consumer.js')



app.use(express.json())
app.use(express.urlencoded({extended:true}))

//consumer(consumer_interactive)
//consumer(consumer_noninteractive)
interactive_consumer()
noninteractive_consumer()
emailConsume()
notificationConsume()
whatsappConsume()

app.post('/sendNotification',async(req,res)=>{
    try{
        const {title,message,topic}=req.body
        //console.log(title,message)
        if(!title || !message || !topic){
            return res.status(400).json({
                status:"error",
                message:"Please provide title,message and topic"
            })
        }

        await produceNotification(title,message,topic)

        
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

app.listen(3001,()=>{
    console.log("Server started at port 3001")
})
