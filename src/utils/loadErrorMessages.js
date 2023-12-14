const {MongooseError} = require('mongoose')

exports.loadErrorMessages = (err)=>{

    const isInstance = err instanceof MongooseError;

    if(isInstance){
        const errMsgs = Object.values(err.errors).map(x=>x.message);
        return errMsgs 
    }else{
        return [err.message]
    }
}