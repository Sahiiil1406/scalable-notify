const {notification_consumer_1,
    notification_consumer_2,}=require('./producer.js')


const notificationConsume=async()=>{
    await notification_consumer_1.connect()
    await notification_consumer_2.connect()
    await notification_consumer_1.subscribe({
        topic:'notification-high',
        fromBeginning:true
    })
    await notification_consumer_2.subscribe({
        topic:'notification-low',
        fromBeginning:true
    })
    await notification_consumer_1.run({
        eachMessage:async({topic,partition,message})=>{
            console.log(`Notification Message:${message.value.toString()}`)
        }
    })
    await notification_consumer_2.run({
        eachMessage:async({topic,partition,message})=>{
            console.log(`Notification Message:${message.value.toString()}`)
        }
    })
}

module.exports={notificationConsume}