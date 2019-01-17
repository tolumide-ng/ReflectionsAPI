import reflectionControllers from './../controllers/Reflection';
import express from 'express';


const router = express.Router();

router.post('/', reflectionControllers.create);

export default router;