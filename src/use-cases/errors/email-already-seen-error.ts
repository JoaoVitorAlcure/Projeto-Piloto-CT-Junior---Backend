export class EmailAlreadySeenError extends Error{
    constructor(){
        super('Não autorizado, o email ja foi visualizado')
    }
}