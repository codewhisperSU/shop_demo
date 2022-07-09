import 'reflect-metadata'
import express, { Express, NextFunction, Request, Response } from 'express'
import dotenv from 'dotenv'
import bodyParser, { json } from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express'

import Router from './routes'
import { SystemError } from './models/error/error'
import swaggerDocSpecs from './swaggerOptions'

dotenv.config()

const app: Express = express()
const port = process.env.PORT

app.use(morgan('combined'))

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.use(bodyParser.json())

app.use(cors())

app.use(express.json())

app.use('/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocSpecs))

app.use(Router)

app.get('/', (reg: Request, res: Response) => {
    res.send('Shop demo!!!')
})

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    const systemError = { errorMessage: err.message } as SystemError

    res.status(500).send(JSON.stringify(systemError))
})

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`)
})
