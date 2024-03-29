import express, { NextFunction, Request, Response } from "express"
import "express-async-errors"
import swaggerUi from 'swagger-ui-express'

import "reflect-metadata"
import "@shared/container"
import { AppError } from "@errors/AppError"
import createConnection from "@shared/infra/typeorm"


import { router } from "@shared/infra/http/routes"
import swaggerFile from "../../../swagger.json" 


createConnection()
const app = express()

app.use(express.json())

app.use("/api-docs",  swaggerUi.serve,  swaggerUi.setup(swaggerFile))
app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            message: err.message
        })
    }
    return res.status(500).json({
        status: "error",
        message: `Internal server error ${err.message}`
    })
})

app.listen(3333, () => console.log("Server is now online!"))