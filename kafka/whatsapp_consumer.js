const {whatsapp_consumer_2,whatsapp_consumer_1}=require('./producer.js')

const whatsappConsume=async()=>{
    await whatsapp_consumer_1.connect()
    await whatsapp_consumer_2.connect()
    await whatsapp_consumer_1.subscribe({
        topic:'whatsapp-high',
        fromBeginning:true
    })
    await whatsapp_consumer_2.subscribe({
        topic:'whatsapp-low',
        fromBeginning:true
    })
    await whatsapp_consumer_1.run({
        eachMessage:async({topic,partition,message})=>{
            console.log(`Whatsapp Message:${message.value.toString()}`)
        }
    })
    await whatsapp_consumer_2.run({
        eachMessage:async({topic,partition,message})=>{
            console.log(`Whatsapp Message:${message.value.toString()}`)
        }
    })

}

module.exports={whatsappConsume}