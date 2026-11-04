import { expect, describe, it, beforeEach } from "vitest";
import { hash } from "bcryptjs";
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users-repository";
import { EditProfilePictureUseCase } from "./edit-profile-picture";

let userRepository = new InMemoryUsersRepository();
let editProfilePictureUseCase = new EditProfilePictureUseCase(userRepository);

describe("Edit Profile Picture Use Case", () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository();
    editProfilePictureUseCase = new EditProfilePictureUseCase(userRepository);
  });

  it("should be able to change profile picture", async () => {
    const user = await userRepository.create({
      nome: "John Doe",
      email: "johndoe@example.com",
      senha: await hash("123456", 6),
    });

    const response = await editProfilePictureUseCase.execute({
      linkPhoto: "https://linkteste.com.br",
      userId: user.id,
    });
    expect(response.linkPhoto).toEqual(expect.any(String));
  });
});
