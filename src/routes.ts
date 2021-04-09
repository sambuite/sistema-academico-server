import SessionController from '@controllers/SessionController';
import { UsersController } from '@controllers/UserController';
import { ProfessorController } from '@controllers/ProfessorController';
import { Router } from 'express';
import auth from './middlewares/auth';

const userController = new UsersController();
const sessionController = new SessionController();
const professorController = new ProfessorController();

const router = Router();

router.post('/login', sessionController.create);

router.post('/register-user', userController.create);

router.post('/register-professor', professorController.create);

router.use(auth);

router.get('/users', userController.index);
router.put('/edit-user/:id', userController.edit);
router.delete('/delete-user/:id', userController.delete);

router.get('/professors', professorController.index);
router.put('/edit-professor/:id', professorController.edit);
router.delete('/delete-professor/:id', professorController.delete);

export { router };
