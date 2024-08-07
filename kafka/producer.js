const {Kafka,Partitioners}=require('kafkajs')

const kafka=new Kafka({
    clientId:'myapp',
    brokers:['localhost:9092'],
    createPartitioner: Partitioners.LegacyPartitioner,
})
const producer=kafka.producer()
//create two consumer to handle the notification and email
const consumer_interactive=kafka.consumer({groupId:'interactive'})
const consumer_noninteractive=kafka.consumer({groupId:'non-interactive'})

const email_consumer=kafka.consumer({groupId:'email'})
const notification_consumer=kafka.consumer({groupId:'notification'})
const whatsapp_consumer=kafka.consumer({groupId:'whatsapp'})
 

const produceNotification=async(title,message,topic)=>{
    await producer.connect()
    await producer.send({
        topic:topic,
        messages:[
            {
                value:JSON.stringify({
                    title,
                    message
                })
            }
        ]
    })
    console.log("Notification sent successfully to Main Queue")
    await producer.disconnect()
}
// const consume=async()=>{
//     await consumer_interactive.connect()
//     await consumer_interactive.subscribe({
//         topic:'interactive',
//         fromBeginning:true
//     })
//     await consumer_interactive.run({
//         eachMessage:async({topic,partition,message})=>{
//             console.log(`Interactive Message:${message.value.toString()}`)
//         }
//     })
// }



module.exports={
    produceNotification,
    consumer_interactive,
    consumer_noninteractive,
    email_consumer,
    notification_consumer,
    whatsapp_consumer,
    producer
}