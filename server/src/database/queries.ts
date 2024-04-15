const logInQuery: string = `SELECT * FROM public."Users" WHERE "email" = $1`
const registerQuery: string = `INSERT INTO public."Users" (email, password) VALUES ($1, $2);`


module.exports = {
    logInQuery,
    registerQuery
}