var knex = require('knex')({
    client: 'mysql',
    connection: {
        host : 'localhost',      
        user : 'root',     
        password : '',  
        database : 'iago_db'
     }
});
module.exports = knex