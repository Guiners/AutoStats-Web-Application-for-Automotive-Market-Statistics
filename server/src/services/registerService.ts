import User from '../entities/usersEntity'
import hashPassword from './hashService'
const dotenv = require('dotenv');
dotenv.config();


const dbTest: User[] = []

const register = async(data: User) => {
    try {

        const newUser: User = {
            email: data.email,
            password: await hashPassword(data.password, dotenv.SALTROUNDS)
        }
        await dbTest.push(data); //change to adding to database

    } catch (error) {
        console.log(error);
        throw error;
    }
}

export default register;