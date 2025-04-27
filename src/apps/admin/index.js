import express from 'express';
import ownerRoutes from './routes/ownerDetails.routes.js';

const router = express.Router();

router.use('/owner', ownerRoutes);

export default router;
