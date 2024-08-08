//check datastore instance and push to queue after aggregating msg for 30s
const {producer}=require('./kafka/producer')
const dataStoreInstance = require("./store")

const cronJobEmail=async()=>{
  setInterval(()=>{
    console.log('---------------------------------------------------------')
    console.log(dataStoreInstance.email_data)
    console.log('---------------------------------------------------------')
  },30000)

}
const cronJobWhatsapp=async()=>{
  setInterval(()=>{
    console.log('---------------------------------------------------------')
    console.log(dataStoreInstance.whatsapp_data)
    console.log('---------------------------------------------------------')
  },30000)

}
const cronJobNotification=async()=>{
  setInterval(()=>{
    console.log('---------------------------------------------------------')
    console.log(dataStoreInstance.notification_data)
    console.log('---------------------------------------------------------')
  },30000)

}

module.exports={
cronJobEmail,
cronJobWhatsapp,
cronJobNotification
}