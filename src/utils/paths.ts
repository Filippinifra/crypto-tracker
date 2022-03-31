export const homePath = "/";
export const confirmationPath = "/confirmation";
export const loginPath = "/login";
export const registrationPath = "/registration";
export const recoverPasswordPath = "/recover-password";
export const changePasswordPath = "/change-password";
export const infoPath = "/info";
export const registrationConfirmedPath = "/registration-confirmed";

export const unloggedPaths = [loginPath, registrationPath, recoverPasswordPath, changePasswordPath];
export const loggedPaths = [homePath, confirmationPath];
export const logAndUnlogPaths = [infoPath, registrationConfirmedPath];
