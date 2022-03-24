export const validateMail = (email: string) => /\S+@\S+\.\S+/.test(email);
export const validatePassword = (password: string) => atLeast6Chars(password) && existsNumber(password) && existsUppercaseAndLowercase(password) && existsSpecialChar(password);

export const atLeast6Chars = (value: string) => value.length >= 6;
export const existsNumber = (value: string) => /\d/.test(value);
export const existsUppercaseAndLowercase = (value: string) => /[A-Z]/.test(value) && /[a-z]/.test(value);
export const existsSpecialChar = (value: string) => /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(value);

export const getCorrectErrorLabel = (password: string): string | undefined => {
  if (!atLeast6Chars(password)) {
    return "La password deve contenere almeno 6 caratteri";
  } else if (!existsNumber(password)) {
    return "La password deve contenere almeno un numero";
  } else if (!existsUppercaseAndLowercase(password)) {
    return "La password deve contenere almeno una lettera maiuscola e una minuscola";
  } else if (!existsSpecialChar(password)) {
    return "La password deve contenere almeno un carattere speciale";
  }
};
