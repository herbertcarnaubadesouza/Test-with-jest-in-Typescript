import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { ICreateUserDTO } from "../createUser/ICreateUserDTO";
import { CreateUserError } from "./CreateUserError";


let usersRepositoryInMemory: InMemoryUsersRepository;
let createUserUseCase: CreateUserUseCase;

describe("Create an User", () => {

    beforeEach(() => {
        usersRepositoryInMemory = new InMemoryUsersRepository();
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    })

    it("should be to create an user", async () => {
        const user: ICreateUserDTO = {
            name: "User Test",
            email: "user@test.com",            
            password: "1234"
        };

        await createUserUseCase.execute(user);

        const returnedUser = await usersRepositoryInMemory.findByEmail(user.email);        

        expect(returnedUser).toHaveProperty("id");
    });


    it("should not be able to create an user that already exists", async () => {        

        await expect(async () => {          
    
            await createUserUseCase.execute({ 
                name: "User Test",
                email: "user@test.com",            
                password: "1234"
            });

            await createUserUseCase.execute({ 
                name: "User Test 2",
                email: "user@test.com",            
                password: "1234"
            });                              
           
        
        }).rejects.toBeInstanceOf(CreateUserError);
    });
});