module.exports = {
    'development': {
        client: 'pg',
        connection: process.env.POSTGRES_TEST_URL
    },
    'deployment': {
        client: 'pg',
        connection: process.env.POSTGRES_URL
    }
}