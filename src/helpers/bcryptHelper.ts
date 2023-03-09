//bycripts.js Password encrptation
import * as bcryptjs from 'bcryptjs'

/**
 * This function takes a password from a user's login form and compares it to the password stored in
 * the database.
 * @param passwordPost - The password that the user entered in the login form
 * @param passwordDb - The password stored in the database
 * @returns A boolean value.
 */
export const bcrypCheck = (passwordPost, passwordDb) =>{
    return bcryptjs.compareSync(passwordPost, passwordDb)
}

/**
 * Bcryptjs.hashSync(passwordPost, 10)
 * @param passwordPost - The password that the user entered in the form.
 * @returns A hash of the password.
 */
export const bcrypGenerateEncript = (passwordPost) =>{
    return bcryptjs.hashSync(passwordPost, 10)
}