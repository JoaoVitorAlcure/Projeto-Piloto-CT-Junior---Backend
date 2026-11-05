import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository";
import { GetProfileUseCase } from "../get-profile";

export function makeGetProfileUseCase(){
    const userRepository = new PrismaUsersRepository()
    const getProfileUseCase = new GetProfileUseCase(userRepository)

    return getProfileUseCase
}