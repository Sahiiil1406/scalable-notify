const {email_consumer,notification_consumer,whatsapp_consumer}=require('./producer.js')


const emailConsume=async()=>{
    await email_consumer.connect()
    await email_consumer.subscribe({
        topic:'email',
        fromBeginning:true
    })
    await email_consumer.run({
        eachMessage:async({topic,partition,message})=>{
            console.log(`Email Message:${message.value.toString()}`)
        }
    })
}

const notificationConsume=async()=>{
    await notification_consumer.connect()
    await notification_consumer.subscribe({
        topic:'notification',
        fromBeginning:true
    })
    await notification_consumer.run({
        eachMessage:async({topic,partition,message})=>{
            console.log(`Notification Message:${message.value.toString()}`)
        }
    })
}

const whatsappConsume=async()=>{
    await whatsapp_consumer.connect()
    await whatsapp_consumer.subscribe({
        topic:'whatsapp',
        fromBeginning:true
    })
    await whatsapp_consumer.run({
        eachMessage:async({topic,partition,message})=>{
            console.log(`Whatsapp Message:${message.value.toString()}`)
        }
    })
}

module.exports={
    emailConsume,
    notificationConsume,
    whatsappConsume
}