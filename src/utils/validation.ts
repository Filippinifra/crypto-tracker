export const validateMail = (email: string) => /\S+@\S+\.\S+/.test(email);
export const validatePassword = (password: string) => password.length >= 6;
/* 

/\d/.test(password) -> numero
/^[A-Z]*$/.test(password) && /^[a-z]*$/.test(string) ->maiuscole e minuscole
/^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/.test(password) -> carattere speciale

*/
