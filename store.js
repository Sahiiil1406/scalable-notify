//contain 3 array to store data

class dataStore{
    constructor(){
        this.email_data = {};
        this.whatsapp_data = {};
        this.notification_data = {}
    }

    addEmailData(id,data){
        if(this.email_data[id]){
            this.email_data[id].push(data);
        }else{
            this.email_data[id] = [data];
        }
    }
    addWhatsappData(id,data){
        if(this.whatsapp_data[id]){
            this.whatsapp_data[id].push(data);
        }else{
            this.whatsapp_data[id] = [data];
        }
    }
    addNotificationData(id,data){
        if(this.notification_data[id]){
            this.notification_data[id].push(data);
        }else{
            this.notification_data[id] = [data];
        }
    }
    removeEmailData(){
        this.email_data={}
    }
    removeWhatsappData(){
        this.whatsapp_data={}
    }
    removeNotificationData(){
        this.notification_data={}
    }
}
const dataStoreInstance = new dataStore();
module.exports = dataStoreInstance;