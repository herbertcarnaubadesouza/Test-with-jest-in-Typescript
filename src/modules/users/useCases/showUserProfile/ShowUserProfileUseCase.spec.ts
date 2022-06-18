import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { ICreateUserDTO } from "../createUser/ICreateUserDTO";
import { ShowUserProfileError } from "./ShowUserProfileError";
import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";


let usersRepositoryInMemory: InMemoryUsersRepository;
let createUserUseCase: CreateUserUseCase;
let showUserProfileUseCase : ShowUserProfileUseCase;

describe("Show User Profile", () => {

    beforeEach(() => {
        usersRepositoryInMemory = new InMemoryUsersRepository();
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
        showUserProfileUseCase = new ShowUserProfileUseCase(usersRepositoryInMemory);
    })

    it("should be to show user profile", async () => {
        const user: ICreateUserDTO = {
            name: "User Test",
            email: "user@test.com",            
            password: "1234"
        };

        await createUserUseCase.execute(user);

        const returnedUser = await usersRepositoryInMemory.findByEmail(user.email);
    
        const profileUser = await showUserProfileUseCase.execute(returnedUser.id);

        expect(profileUser).toHaveProperty("id");
    });


    it("should not be to show user profile if the user not exists", () => {
        expect(async () => {

            const user: ICreateUserDTO = {
                name: "User Test",
                email: "user@test.com",            
                password: "1234"
            };
    
            await createUserUseCase.execute(user);        
            
            const returnedUser = await usersRepositoryInMemory.findByEmail(user.email);
    
            const test = await showUserProfileUseCase.execute(returnedUser.id);
        
        }).rejects.toBeInstanceOf(ShowUserProfileError);
    });
});