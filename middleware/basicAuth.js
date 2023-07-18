const auth= require('basic-auth')
const User = require('../models/user')
const {AuthError} = require('../utils/errors')

const authentication = async (req,res,next)=>{
    try{
        const userAuth= auth(req)

        const user= await User.findOne({username: userAuth.name})

        if(!user){
            throw new AuthError('Auth Error')
        }

        const passwordCorrect= user == null
            ? false 
            : await user.verifyPassword(userAuth.pass)

        if(!(passwordCorrect && user)){
            res.status(401).send('Invalid user or password')
        }else{
            console.log('User authenticated')
            next()
        }
    }catch(err){ next(err)}
    
    
}

module.exports= authentication