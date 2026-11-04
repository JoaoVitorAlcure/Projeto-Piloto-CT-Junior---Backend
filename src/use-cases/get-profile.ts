import type { Email, User } from "@prisma/client"
import type { EmailRepository } from "../repositories/email-repository"
import type { UserRepository } from "../repositories/user-repository"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"
import { UserNotFoundError } from "./errors/user-not-found-error"

interface GetProfileRequest{
    userId: string
}

interface GetProfileResponse{
    user: User
}

export class GetProfileUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute({userId}:GetProfileRequest): Promise<GetProfileResponse>{
        
        const user = await this.userRepository.findById(userId)

        if (!user){
            throw new UserNotFoundError()
        }

        return {user}
    }
}