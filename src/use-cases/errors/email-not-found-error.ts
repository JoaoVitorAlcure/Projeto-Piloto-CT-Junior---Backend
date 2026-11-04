export class EmailNotFoundError extends Error{
    constructor(){
        super('E-mail não encontrado')
    }
}