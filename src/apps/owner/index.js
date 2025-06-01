import express from 'express';
import userRoute from '../user/routes/user.routes.js'
import groundRoute from '../owner/routes/ground.routes.js'

const router = express.Router();

router.use('/',userRoute)
router.use('/ground',groundRoute)


export default router;
