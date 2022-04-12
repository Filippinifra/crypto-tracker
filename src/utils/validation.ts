export const validateMail = (email: string) => /\S+@\S+\.\S+/.test(email);
export const validatePassword = (password: string) => atLeast6Chars(password) && existsNumber(password) && existsUppercaseAndLowercase(password) && existsSpecialChar(password);
export const validateConfirmPassword = (password: string, passwordConfirm: string) => password === passwordConfirm;

export const atLeast6Chars = (value: string) => value.length >= 6;
export const existsNumber = (value: string) => /\d/.test(value);
export const existsUppercaseAndLowercase = (value: string) => /(?=.*?[A-Z])/.test(value) && /(?=.*?[a-z])/.test(value);
export const existsSpecialChar = (value: string) => /(?=.*?[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/.test(value);

export const getCorrectPasswordErrorKey = (password: string): string | undefined => {
  if (!atLeast6Chars(password)) {
    return "atLeast6chars";
  } else if (!existsNumber(password)) {
    return "atLeast1Number";
  } else if (!existsUppercaseAndLowercase(password)) {
    return "atLeastUpperAndLowerCase";
  } else if (!existsSpecialChar(password)) {
    return "atLeastSpecialChar";
  }
};
