import { OperationType } from "@modules/statements/entities/Statement";
import { InMemoryStatementsRepository } from "@modules/statements/repositories/in-memory/InMemoryStatementsRepository";
import { InMemoryUsersRepository } from "@modules/users/repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "@modules/users/useCases/createUser/CreateUserUseCase";
import { ICreateUserDTO } from "@modules/users/useCases/createUser/ICreateUserDTO";
import { CreateStatementUseCase } from "../createStatement/CreateStatementUseCase";
import { GetBalanceUseCase } from "../getBalance/GetBalanceUseCase";
import { GetBalanceError } from "./GetBalanceError";


let getBalanceUseCase: GetBalanceUseCase;
let statementsRepository: InMemoryStatementsRepository;
let createStatementUseCase : CreateStatementUseCase; 
let usersRepositoryInMemory: InMemoryUsersRepository;
let createUserUseCase: CreateUserUseCase;

describe("Get Balance", () => {

    beforeEach(() => {
        usersRepositoryInMemory = new InMemoryUsersRepository();
        statementsRepository = new InMemoryStatementsRepository();
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
        getBalanceUseCase = new GetBalanceUseCase(statementsRepository, usersRepositoryInMemory)
    })

    it("should be able to get balance", async () => {
        const user: ICreateUserDTO = {
            name: "User Test",
            email: "user@test.com",            
            password: "1234"
        };

        await createUserUseCase.execute(user);

        const returnedUser = await usersRepositoryInMemory.findByEmail(user.email);
        
        const userBalance = await getBalanceUseCase.execute({ 
            user_id : returnedUser.id
        })

        expect(userBalance).toHaveProperty("balance");
    });


    it("should not be able to get balance, if the user does not exist", async () => {                

        expect( async () => {
            
            await getBalanceUseCase.execute({ 
                user_id : "fake id"
            })              
        }).rejects.toBeInstanceOf(GetBalanceError)
    });

});