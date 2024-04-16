import User from '../entities/usersEntity'
import hashPassword from './hashService'
import logIn from "./loginService";
import pool from '../database/dbConfing'

const queries = require('../database/userQueries');
const dotenv = require('dotenv');
dotenv.config();


const register = async(data: User) => {
    const client = await pool.connect();

    try {
        const newUser: User = {
            email: data.email,
            password: await hashPassword(data.password, Number(process.env.SALTROUNDS))
        }
        await client.query(queries.registerQuery, [newUser.email, newUser.password]); 
        await logIn(data);

    } catch (error) {
        console.log(error);
        throw error;
    }
}

export default register;