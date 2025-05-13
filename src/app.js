import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

import adminRoute from './apps/admin/index.js'
import ownerRoute from './apps/owner/index.js'
import userRoute from './apps/user/index.js'

const app = express()

const corsOpts = {
    origin : '*',
    methods:[
        'GET',
        'POST',
        'DELETE',
        'PUT'
    ],
    allowedHeaders:[
        'Content-Type',
        'x-auth-token'
    ]
}

app.use(cors(corsOpts))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

app.use("/api/v1/user", userRoute)
app.use('/api/v1/owner',ownerRoute);
app.use('/api/v1/admin', adminRoute);


export { app }