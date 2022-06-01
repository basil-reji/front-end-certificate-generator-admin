const mongoClient = require('mongodb').MongoClient

module.exports.variables={
    DATABASE:'testdb',
    ADMIN_COLLECTION:'admin',
    USER_COLLECTION:'users',
    CONTACT_COLLECTION:'contact',
}

const state = {
    db: null
}

module.exports.connect=function(done){
    const url = 'mongodb://127.0.0.1:27017'
    const dbname = this.variables.DATABASE

    mongoClient.connect(url, (err, data)=>{
        if(err) return done(err)
        state.db = data.db(dbname)
        done()
    })
}

module.exports.get=function(){
    return state.db
}