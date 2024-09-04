
const {
    PROD_PORT,
    PROD_NAME,
    PROD_USERNAME,
    PROD_HOST,
    PROD_PASSWORD,
    PROD_DB_PORT 
} = process.env

console.log('Running in prod mode')

export default {
    PORT: PROD_PORT,
    DB_PORT: PROD_DB_PORT,
    DB_NAME: PROD_NAME,
    DB_USERNAME: PROD_USERNAME,
    DB_HOST: PROD_HOST,
    DB_PASSWORD: PROD_PASSWORD
}