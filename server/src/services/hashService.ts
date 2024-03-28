import bcrypt from 'bcrypt';

const hashPassword = (password: string, saltRounds: number | string) => {
    return bcrypt.hash(password, saltRounds);
};

export default hashPassword;
