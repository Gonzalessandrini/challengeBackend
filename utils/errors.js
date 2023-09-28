class AuthError extends Error {
    constructor(message) {
        super(message) // (1)
        this.name = 'AuthError' 
    }
}

module.exports= {AuthError}