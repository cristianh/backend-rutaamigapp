//bycripts.js Password encrptation
import * as bcrypt from 'bcrypt';

/**
 * This function takes a password from a user's login form and compares it to the password stored in
 * the database.
 * @param requestPassword - The password that the user entered in the login form
 * @param passwordDb - The password stored in the database
 * @returns A boolean value.
 */
export const bcrypCheck = (requestPassword, passwordDb) =>{
    return bcrypt.compareSync(requestPassword, passwordDb)
}

/**
 * Bcryptjs.hashSync(requestPassword, 10)
 * @param requestPassword - The password that the user entered in the form.
 * @returns A hash of the password.
 */
export const bcrypGenerateEncript = (requestPassword) =>{
    return bcrypt.hashSync(requestPassword, 10)
}