import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository";
import { LoginUseCase } from "../login";

export function makeLoginUseCase(){
    const usersRepository = new PrismaUsersRepository()
    const loginUseCase = new LoginUseCase(usersRepository)

    return loginUseCase
}