import express from 'express';
import userRoute from '../user/routes/user.routes.js'

const router = express.Router();

router.use('/',userRoute)


export default router;
