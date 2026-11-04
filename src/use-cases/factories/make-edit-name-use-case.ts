import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository";
import { EditNameUseCase } from "../edit-name";

export function makeEditNameUseCase(){
    const userRepository = new PrismaUsersRepository()
    const editNameUseCase = new EditNameUseCase(userRepository)

    return editNameUseCase
}