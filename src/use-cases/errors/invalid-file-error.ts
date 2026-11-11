export class InvalidFileError extends Error{
    constructor(){
        super('Arquivo com tipo invalido')
    }
}