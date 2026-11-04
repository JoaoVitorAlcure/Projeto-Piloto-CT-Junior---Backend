import type { UserRepository } from "../repositories/user-repository"

interface EditProfilePictureUseCaseRequest{
    linkPhoto: string
    userId: string
}

interface EditProfilePictureUseCaseResponse{
    linkPhoto: string
}
export class EditProfilePictureUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute({linkPhoto, userId}:EditProfilePictureUseCaseRequest): Promise<EditProfilePictureUseCaseResponse>{
        
        await this.userRepository.changeProfilePicture(linkPhoto, userId)

        return {linkPhoto}
    }
}