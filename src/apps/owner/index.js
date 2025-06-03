import express from 'express';
import userRoute from '../user/routes/user.routes.js'
import groundRoute from '../owner/routes/ground.routes.js'
import gameTypeRoute from '../owner/routes/gameType.routes.js'
import gameFeaturesRoute from '../owner/routes/gameFeatures.routes.js'

const router = express.Router();

router.use('/',userRoute)
router.use('/ground',groundRoute)
router.use('/game-type',gameTypeRoute)
router.use('/game-features',gameFeaturesRoute)


export default router;
