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


// //routes import
// import userRouter from './routes/user.routes.js'
// import gameTypeRouter from './routes/gameType.routes.js'
// import groundRouter from './routes/ground.routes.js'
// import gameFeaturesRouter from './routes/gameFeatures.routes.js'
// import userDetailsRouter from './routes/userDetails.routes.js'
// import groundOwnerRouter from './routes/groundOwnerDetails.routes.js'
// import authRouter from './routes/auth.routes.js'
// import notificationRouter from './routes/notification.routes.js'
// import contactUsRouter from './routes/contactUs.routes.js'
// import reviewsRoute from './routes/reviews.routes.js'
// import bookingRoute from './routes/booking.routes.js'
// import likedRoute from './routes/like.routes.js'

// //routes declaration
// app.use("/api/v1/user", userRouter)
// app.use("/api/v1/game-type", gameTypeRouter)
// app.use("/api/v1/game-fetures", gameFeaturesRouter)
// app.use("/api/v1/ground", groundRouter)
// app.use("/api/v1/user-details", userDetailsRouter)
// app.use("/api/v1/ground-owner", groundOwnerRouter)
// app.use("/api/v1/auth", authRouter)

// app.use("/api/v1/notification", notificationRouter)
// app.use("/api/v1/contact-us", contactUsRouter)
// app.use("/api/v1/reviews", reviewsRoute)
// app.use("/api/v1/booking", bookingRoute)
// app.use("/api/v1/like", likedRoute)


export { app }