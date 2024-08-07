const {consumer_interactive,consumer_noninteractive}=require('./producer.js')
const {producer}=require('./producer.js')

const interactive_consumer=async()=>{
    await consumer_interactive.connect()
    await consumer_interactive.subscribe({
        topic:'interactive',
        fromBeginning:true
    })
    await consumer_interactive.run({
        eachMessage:async({topic,partition,message})=>{
            console.log(`Interactive Message:${message.value.toString()}`)
            console.log("Message received from interactive queue")
            //push this message to email,notification and whatsapp queue
            //get info from database/other source and push to respective queue
            //Randomly push to email,notification and whatsapp queue
            const random=Math.floor(Math.random()*10)
            await producer.connect()
            if(random===0){
                await producer.send({
                    topic:'email',
                    messages:[
                        {
                            value:message.value
                        }
                    ]
                })
                console.log("Message pushed to email queue")
            }else if(random===1){
                await producer.send({
                    topic:'notification',
                    messages:[
                        {
                            value:message.value
                        }
                    ]
                })
                console.log("Message pushed to notification queue")

        }
        else{
            await producer.send({
                topic:'whatsapp',
                messages:[
                    {
                        value:message.value
                    }
                ]
            })
            console.log("Message pushed to whatsapp queue")
        }
        await producer.disconnect()
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
