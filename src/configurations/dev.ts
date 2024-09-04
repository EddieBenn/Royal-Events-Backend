

const { DEV_PORT,
    DB_NAME,
    DB_USERNAME,
    DB_HOST,
    DB_PASSWORD,
    DEV_DB_PORT
} = process.env

    console.log('Running in dev mode')
    export default {
        PORT: DEV_PORT,
        DB_PORT: DEV_DB_PORT,
        DB_NAME,
        DB_USERNAME,
        DB_HOST,
        DB_PASSWORD
    }
