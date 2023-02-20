"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bcrypGenerateEncript = exports.bcrypCheck = void 0;
//bycripts.js Password encrptation
var bcryptjs = require("bcryptjs");
/**
 * This function takes a password from a user's login form and compares it to the password stored in
 * the database.
 * @param passwordPost - The password that the user entered in the login form
 * @param passwordDb - The password stored in the database
 * @returns A boolean value.
 */
var bcrypCheck = function (passwordPost, passwordDb) {
    return bcryptjs.compareSync(passwordPost, passwordDb);
};
exports.bcrypCheck = bcrypCheck;
/**
 * Bcryptjs.hashSync(passwordPost, 10)
 * @param passwordPost - The password that the user entered in the form.
 * @returns A hash of the password.
 */
var bcrypGenerateEncript = function (passwordPost) {
    return bcryptjs.hashSync(passwordPost, 10);
};
exports.bcrypGenerateEncript = bcrypGenerateEncript;
//# sourceMappingURL=bcryptHelper.js.map