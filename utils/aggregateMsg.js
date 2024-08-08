

const aggreagtateMsg = (data) => {
    let result={
        message:""
    }
    let msg = ''
    data.forEach((element) => {
        msg += `${element.message},`
    });
    result.message=msg;
    
    return result;
}

module.exports=aggreagtateMsg;