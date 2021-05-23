require('dotenv').config({ path: './.env' })


module.exports  = { 
        client: 'pg',
        connection: {
            host : process.env.DATABASE_HOST,
            user : process.env.DATABASE_USER,
            password : process.env.DATABASE_PASSWORD,
            database : process.env.DATABASE_NAME,
            //port: process.env.DATABASE_PORT,
            charset : 'utf8mb4',
            //ssl: { rejectUnauthorized: false }
    },
        migrations: {
            tableName: 'knex_migrations'
            },
}