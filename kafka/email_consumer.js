const {email_consumer_1,email_consumer_2}=require('./producer.js')
const dataStoreInstance = require('../store.js')


//email_consumer_1 has higher priority than email_consumer_2
//email_consumer_2 has lower priority than email_consumer_1

const emailConsume=async()=>{
    await email_consumer_1.connect()
    await email_consumer_2.connect()
    await email_consumer_1.subscribe({
        topic:'email-high',
        fromBeginning:true
    })
    await email_consumer_2.subscribe({
        topic:'email-low',
        fromBeginning:true
    })
    await email_consumer_1.run({
        eachMessage:async({topic,partition,message})=>{
            console.log(`Email Message:${message.value.toString()}`)
        }
    })
    await email_consumer_2.run({
        eachMessage:async({topic,partition,message})=>{
            console.log(`Email Message:${message.value.toString()}`)
        }
    })


}
module.exports={emailConsume}