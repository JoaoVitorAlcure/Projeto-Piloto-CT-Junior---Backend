import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository";
import { EditProfilePictureUseCase } from "../edit-profile-picture";

export function makeEditProfilePictureUseCase(){
    const userRepository = new PrismaUsersRepository()
    const editProfilePictureUseCase = new EditProfilePictureUseCase(userRepository)

    return editProfilePictureUseCase
}