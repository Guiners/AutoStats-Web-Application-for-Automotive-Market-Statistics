import { Request, Response } from 'express';
import logIn from "../services/loginService";
import register from "../services/registerService";

const handleRegister = async (req: Request, res: Response) => {
    try {
        await register(req.body);
        res.status(200).json({ "message": `Register completed` });

    } catch (error) {
        return res.status(401).json({ "message": `${error}`});
    }
}

const handleLogin = async (req: Request, res: Response) => {
    try {
        const result = await logIn(req.body);
        res.status(200).json(result);

    } catch (error) {
        return res.status(401).json({ "message": `${error}`});
 
    }
}

module.exports = { handleRegister, handleLogin };