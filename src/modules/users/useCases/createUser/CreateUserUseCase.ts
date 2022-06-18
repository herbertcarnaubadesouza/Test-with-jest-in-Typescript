import { inject, injectable } from "tsyringe";
import { hash } from 'bcryptjs';

import { CreateUserError } from "./CreateUserError";

import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ICreateUserDTO } from "./ICreateUserDTO";
import { User } from "@modules/users/entities/User";

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ name, email, password }: ICreateUserDTO) : Promise<void>{

    try{
      const userAlreadyExists = await this.usersRepository.findByEmail(email);

      if (userAlreadyExists ) {
        console.log("entrei aqui")
        throw new CreateUserError();
      }

      const passwordHash = await hash(password, 8);

      await this.usersRepository.create({
        email,
        name,
        password: passwordHash,
      });
    }
    catch{
      throw new CreateUserError();
    }
    
  }
}
