import swaggerJsdoc from 'swagger-jsdoc';


const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Shop demo',
            version: '1.0.0',
        },
    },
    apis: ['./dist/routes/*.router.js'],
} as swaggerJsdoc.Options;

const specs = swaggerJsdoc(options);

export default specs;