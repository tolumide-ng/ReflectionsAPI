import express from 'express';
/* import dotenv from 'dotenv'; */
import '@babel/polyfill';

/* import ReflectionWithJsObject from './../usingJSObject/controllers/Reflection'; */
import ReflectionWithDB from './../usingDB/controllers/Reflection';


/* dotenv.config(); */
/* const reflectionControllers = process.env.TYPE === 'db' ? ReflectionWithDB : ReflectionWithJsObject; */
const reflectionControllers = ReflectionWithDB;
const router = express.Router();

router.post('/', reflectionControllers.create);
router.get('/', reflectionControllers.getAll);
router.get('/:id', reflectionControllers.getOne);
router.put('/:id', reflectionControllers.update);
router.delete('/:id', reflectionControllers.delete);
/* router.delete('/deleteall', reflectionControllers.deleteAllRoutes); */

export default router;
