export class UserAlreadyExists extends Error{
    constructor(){
        super('Usuario ja existe')
    }
}