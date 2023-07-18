const ERROR_HANDLERS= {

    AuthError: (res, { message }) =>
        res.status(401).send({ error: message }),
  
    MongoError: (res) =>
        res.status(409).send({ error: 'bad auth' }),

    defaultError: (res, error) => {
        console.error(error.name)
        res.status(500).send('"Internal error"')
    }
}

module.exports= (err,req,res,next)=>{
    console.error(err)
    const handler= ERROR_HANDLERS[err.name] || ERROR_HANDLERS.defaultError
    handler(res,err)
}