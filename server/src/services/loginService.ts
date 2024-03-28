import User from '../entities/usersEntity'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
const dotenv = require('dotenv');
dotenv.config();

const dbTest: User[] = []

const logIn = async(data: User) => {
    // if (dbTest.includes(data.email)) {

    // }
    //tu bedzie szukanie z bazy danych
    const foundUser: User | undefined = dbTest.find((e) => e.email === data.email);

    if (!foundUser) {
        throw new Error('User not found');
    };
    
    const passwordsMatches: boolean = await bcrypt.compareSync(data.password, foundUser.password);

    if (passwordsMatches) {
        const token: string = jwt.sign({ id: foundUser.id?.toString(), name: foundUser.email }, dotenv.JWTKEY, {expiresIn: '1 days'});

        console.log('Password is matching');
        return { user: { id: foundUser.id, email: data.email }, token: token };

    } else {
        throw new Error('Password not matching');
    }
    
    

}

export default logIn