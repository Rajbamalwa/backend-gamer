import express from 'express';
import bookingRoute from './routes/booking.routes.js'
import userRoute from './routes/user.routes.js'
import userDetailsRoute from './routes/userDetails.routes.js'
import groundRoute from './routes/ground.routes.js'

const router = express.Router();

router.use('/booking',bookingRoute)
router.use('/',userRoute)
router.use('/profile', userDetailsRoute)
router.use('/ground', groundRoute)

export default router;
