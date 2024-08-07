const {Kafka,Partitioners}=require('kafkajs')

const kafka=new Kafka({
    clientId:'myapp',
    brokers:['localhost:9092'],
   // createPartitioner: Partitioners.LegacyPartitioner,
})
const producer=kafka.producer()
//create two consumer to handle the notification and email
const consumer_interactive=kafka.consumer({groupId:'interactive'})
const consumer_noninteractive=kafka.consumer({groupId:'non-interactive'})

const email_consumer_1=kafka.consumer({groupId:'email-high'})
const email_consumer_2=kafka.consumer({groupId:'email-low'})
const notification_consumer_1=kafka.consumer({groupId:'notification-high'})
const notification_consumer_2=kafka.consumer({groupId:'notification-low'})
const whatsapp_consumer_1=kafka.consumer({groupId:'whatsapp-high'})
const whatsapp_consumer_2=kafka.consumer({groupId:'whatsapp-low'})
 

const produceNotification=async(title,message,priority,topic)=>{
    await producer.connect()
    await producer.send({
        topic:topic,
        messages:[
            {
                value:JSON.stringify({
                    title,
                    message,
                    priority
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
    kafka,
    producer,
    email_consumer_1,
    email_consumer_2,
    notification_consumer_1,
    notification_consumer_2,
    whatsapp_consumer_1,
    whatsapp_consumer_2

}