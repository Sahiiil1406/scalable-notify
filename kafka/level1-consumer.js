const {consumer_interactive,consumer_noninteractive}=require('./producer.js')
const {producer}=require('./producer.js')
const dataStoreInstance = require('../store.js')
//const { json } = require('express')

const interactive_consumer=async()=>{
    await consumer_interactive.connect()
    await consumer_interactive.subscribe({
        topic:'interactive',
        fromBeginning:true
    })
    
    await consumer_interactive.run({
        eachMessage:async({topic,partition,message})=>{
           // await producer.connect()
            console.log(`Interactive Message:${message.value.toString()}`)
            console.log("Message received from interactive queue")
            const info=JSON.parse(message.value)
            const {title,priority,id}=info
            //push this message to email,notification and whatsapp queue
            //get info from database/other source and push to respective queue
            //Randomly push to email,notification and whatsapp queue
            const random=Math.floor(Math.random()*100)%3;
            
            if(random===0){
                dataStoreInstance.addEmailData(id,info)
                
                // await producer.send({
                //     topic:`email-${priority}`,
                //     messages:[
                //         {
                //             value:message.value
                //         }
                //     ]
                // })
                console.log("Email Message stored temporarily in memory ")
            }else if(random===1){
                dataStoreInstance.addNotificationData(id,info)
                // await producer.send({
                //     topic:`notification-${priority}`,
                //     messages:[
                //         {
                //             value:message.value
                //         }
                //     ]
                // })
                console.log("Notification Message stored temporarily in memory ")

        }
        else{
            dataStoreInstance.addWhatsappData(id,info)
            // await producer.send({
            //     topic:`whatsapp-${priority}`,
            //     messages:[
            //         {
            //             value:message.value
            //         }
            //     ]
            // })
            console.log("Whatsapp Message stored temporarily in memory ")
        }
       // await producer.disconnect()
        
    }
    
    })
    
    
}

const noninteractive_consumer=async()=>{
    await consumer_noninteractive.connect()
    await consumer_noninteractive.subscribe({
        topic:'non_interactive',
        fromBeginning:true
    })
    await consumer_noninteractive.run({
        eachMessage:async({topic,partition,message})=>{
            console.log(`Non-Interactive Message:${message.value.toString()}`)
            console.log("Message received from non-interactive queue")
        }
    })
}


module.exports={
    interactive_consumer,
    noninteractive_consumer
}
