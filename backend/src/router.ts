import express, { Request, Response } from 'express';
const router = express.Router();

router.all('/api/chat', (req: Request, res: Response) => {
    res.send({ connected: true });
});


export { router };