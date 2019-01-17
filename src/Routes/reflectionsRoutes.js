import reflectionControllers from './../controllers/Reflection';
import express from 'express';


const router = express.Router();

router.post('/', reflectionControllers.create);
router.get('/', reflectionControllers.getAll);
router.get('/:id', reflectionControllers.getOne);

export default router;