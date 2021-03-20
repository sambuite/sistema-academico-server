import { response, Router } from 'express';

const router = Router();

router.post('/users', (req, res) => {
  return response.status(201).send();
});

export { router };
