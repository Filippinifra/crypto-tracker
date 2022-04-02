export const homePath = "/";
export const waitingRegistration = "/waiting-registration";
export const loginPath = "/login";
export const registrationPath = "/registration";
export const recoverPasswordPath = "/recover-password";
export const changePasswordPath = "/change-password";
export const infoPath = "/info";
export const registrationConfirmingPath = "/registration-confirming";
export const authActionPath = "/auth-action";

export const unloggedPaths = [loginPath, registrationPath, recoverPasswordPath];
export const logAndUnlogPaths = [infoPath, registrationConfirmingPath, changePasswordPath, authActionPath];
export const loggedPaths = [homePath, waitingRegistration];
