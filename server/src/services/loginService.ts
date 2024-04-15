import User from '../entities/usersEntity'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import pool from '../database/dbConfing'
import { QueryResult } from 'pg';
const queries = require('../database/queries');
const dotenv = require('dotenv');
dotenv.config();



const logIn = async(data: User) => {
    const client = await pool.connect();
    const queryResponse: QueryResult = await client.query(queries.logInQuery, [data.email]);

    if (queryResponse.rows.length === 0) {
        throw new Error('User not found');
    };

    const foundUser: User = queryResponse.rows[0];
    
    const passwordsMatches: boolean = await bcrypt.compareSync(data.password, foundUser.password);

    if (passwordsMatches) {
        const token: string = jwt.sign({name: foundUser.email }, String(process.env.JWTKEY), {expiresIn: '1 days'});

        console.log('Password is matching');
        return { user: {email: data.email }, token: token };

    } else {
        throw new Error('Password not matching');
    }
    
    

}

export default logIn