import express from 'express';
import reflectionControllers from '../controllers/Reflection';


const router = express.Router();

router.post('/', reflectionControllers.create);
router.get('/', reflectionControllers.getAll);
router.get('/:id', reflectionControllers.getOne);
router.put('/:id', reflectionControllers.update);
router.delete('/:id', reflectionControllers.delete);

export default router;
