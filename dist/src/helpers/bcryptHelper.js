"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bcrypGenerateEncript = exports.bcrypCheck = void 0;
//bycripts.js Password encrptation
var bcrypt = require("bcrypt");
/**
 * This function takes a password from a user's login form and compares it to the password stored in
 * the database.
 * @param requestPassword - The password that the user entered in the login form
 * @param passwordDb - The password stored in the database
 * @returns A boolean value.
 */
var bcrypCheck = function (requestPassword, passwordDb) {
    return bcrypt.compareSync(requestPassword, passwordDb);
};
exports.bcrypCheck = bcrypCheck;
/**
 * Bcryptjs.hashSync(requestPassword, 10)
 * @param requestPassword - The password that the user entered in the form.
 * @returns A hash of the password.
 */
var bcrypGenerateEncript = function (requestPassword) {
    return bcrypt.hashSync(requestPassword, 10);
};
exports.bcrypGenerateEncript = bcrypGenerateEncript;
//# sourceMappingURL=bcryptHelper.js.map