import express from 'express';

let router = express.Router();

router.post('/api/auth', (req, res) => {
    const { login, password } = req.body;
    console.log(req.body);
    res.sendStatus(200);
})

export default router;