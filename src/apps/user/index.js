import express from 'express';
import bookingRoute from './routes/booking.routes.js'
import userRoute from './routes/user.routes.js'
import userDetailsRoute from './routes/userDetails.routes.js'
import groundRoute from './routes/ground.routes.js'
import ownerDetailsRoute from './routes/ownerDetails.routes.js'
import likeRoute from './routes/like.routes.js'
import notificationsRoute from './routes/notification.routes.js'
import reviewRoute from './routes/reviews.routes.js'
import gameTypeRoute from './routes/gameType.routes.js'
import contactUsRoute from './routes/contactUs.routes.js'

const router = express.Router();

router.use('/booking',bookingRoute)
router.use('/',userRoute)
router.use('/profile', userDetailsRoute)
router.use('/ground', groundRoute)
router.use('/owner', ownerDetailsRoute)
router.use('/like', likeRoute)
router.use('/notification', notificationsRoute)
router.use('/reviews', reviewRoute)
router.use('/game-type', gameTypeRoute)
router.use('/contact-us', contactUsRoute)

export default router;
