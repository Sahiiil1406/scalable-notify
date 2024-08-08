// //check datastore instance and push to queue after aggregating msg for 30s
 const {producer}=require('./kafka/producer')
//const dataStoreInstance = require("./store")
const aggregateMsg = require('./utils/aggregateMsg')

const dataStoreInstance = require("./store");


let cron=async()=>{

  setInterval(async()=>{
        await producer.connect()
        let p=dataStoreInstance.email_data;
        let q=dataStoreInstance.notification_data;
        let r=dataStoreInstance.whatsapp_data;
        dataStoreInstance.removeEmailData()
        dataStoreInstance.removeNotificationData()
        dataStoreInstance.removeWhatsappData()
       
        for (let key in p) {
          let msg=''
          if (p.hasOwnProperty(key)) {
              value = p[key];
              msg = aggregateMsg(value)
          }
          await producer.send({
            topic:`email-low`,
            messages:[
              {
                  value:JSON.stringify({
                     msg
                  })
              }
          ]
          })
          console.log("Message sent to email-low Queue")
          
      }
        for (let key in q) {
          let msg=''
          if (q.hasOwnProperty(key)) {
              value = q[key];
              msg = aggregateMsg(value)
          }
          await producer.send({
            topic:`notification-low`,
            messages:[
              {
                  value:JSON.stringify({
                     msg
                  })
              }
          ]
          })
          console.log("Message sent to notification-low Queue")
          
      }
        for (let key in r) {
          let msg=''
          if (r.hasOwnProperty(key)) {
              value = r[key];
              msg = aggregateMsg(value)
          }
          await producer.send({
            topic:`whatasapp-low`,
            messages:[
              {
                  value:JSON.stringify({
                     msg
                  })
              }
          ]
          })
          console.log("Message sent to whatasapp-low Queue")
          
      }


        await producer.disconnect()
      },30000)
    

}

module.exports={cron}




// const cronJobEmail=async()=>{
//   setInterval(async()=>{
//     let p=dataStoreInstance.email_data;
//     dataStoreInstance.removeEmailData()
//     await producer.connect()
//     for (let key in p) {
//       let msg=''
//       if (p.hasOwnProperty(key)) {
//           value = p[key];
//           msg = aggregateMsg(value)
//       }
//       await producer.send({
//         topic:`email-low`,
//         messages:[
//           {
//               value:JSON.stringify({
//                  msg
//               })
//           }
//       ]
//       })
//       console.log("Message sent to email-low Queue")
      
//   }
//     await producer.disconnect()
//   },30000)


// }
// const cronJobWhatsapp=async()=>{
//   setInterval(async()=>{
//     let p=dataStoreInstance.whatsapp_data;
//     dataStoreInstance.removeWhatsappData()
//     await producer.connect()
//     for (let key in p) {
//       let msg=''
//       if (p.hasOwnProperty(key)) {
//           value = p[key];
//           msg = aggregateMsg(value)
//       }
//       await producer.send({
//         topic:`whatsapp-low`,
//         messages:[
//           {
//               value:JSON.stringify({
//                  msg
//               })
//           }
//       ]
//       })
//       console.log("Message sent to whatapp-low queue")
//     }
//     await producer.disconnect()

   
//   },30000)

// }
// const cronJobNotification=async()=>{
//   setInterval(async()=>{
//     let p=dataStoreInstance.notification_data;
//     dataStoreInstance.removeEmailData()
//     await producer.connect()
//     for (let key in p) {
//       let msg=''
//       if (p.hasOwnProperty(key)) {
//           value = p[key];
//           msg = aggregateMsg(value)
//       }
//       await producer.send({
//         topic:`notification-low`,
//         messages:[
//           {
//               value:JSON.stringify({
//                  msg
//               })
//           }
//       ]
//       })
//       console.log("Message sent to whatapp-low queue")
//     }
//     await producer.disconnect()

    
//   },30000)

// }

// module.exports={
// cronJobEmail,
// cronJobWhatsapp,
// cronJobNotification
// }