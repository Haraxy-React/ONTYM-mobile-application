import { apiUrl } from "../../env/index.js";
console.log("API URL : ", apiUrl);
// ********* auth api ********* //
export const signup = `${apiUrl}/users/signup`;
export const login = `${apiUrl}/users/login`;
export const refresh = `${apiUrl}/users/refresh-login`;
export const logout = `${apiUrl}/users/logout`;
export const updateUser = `${apiUrl}/users/update`;
export const getUser = `${apiUrl}/users`;
export const session = `${apiUrl}/users/refresh`;
// ********* tenant api ********* //
export const tenant = `${apiUrl}/tenants`;

// ********* tenantTemplate api ********* //
export const tenantTemplate = `${apiUrl}/tenant-templates`;
// ********* user Credentials api ********* //
export const userCredentilas = `${apiUrl}/users`;

export const ping = `${apiUrl}/ping`;
// ********* update psw api ********* //
export const updatePsw = `${apiUrl}/updatepassword`;

