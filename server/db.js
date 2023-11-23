const {Sequelize} = require('sequelize')
import * as pg from 'pg';

module.exports = new Sequelize(
    process.env.POSTGRES_DATABASE,
    process.env.POSTGRES_USER,
    process.env.POSTGRES_PASSWORD,
    {
         dialect: 'postgres',
         host: process.env.POSTGRES_HOST,
         port: process.env.POSTGRES_PORT,
         dialectOptions: {
            ssl: {
                require: true,
            },
        },
    }
)