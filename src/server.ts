import express, { Request, Response } from "express"


const app = express()

app.get('/', (req: Request, res: Response) => {
    return res.status(200).json({message: "Hello world!"})
})

app.listen(3333, () => console.log("Server is now online!"))