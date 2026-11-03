export class PasswordLessThanSixCharactersError extends Error{
    constructor(){
        super('A senha precisa ter pelo menos 6 caracteres')
    }
}