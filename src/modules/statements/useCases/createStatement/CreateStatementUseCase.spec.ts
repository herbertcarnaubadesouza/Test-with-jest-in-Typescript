import { OperationType } from "@modules/statements/entities/Statement";
import { InMemoryStatementsRepository } from "@modules/statements/repositories/in-memory/InMemoryStatementsRepository";
import { InMemoryUsersRepository } from "@modules/users/repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "@modules/users/useCases/createUser/CreateUserUseCase";
import { ICreateUserDTO } from "@modules/users/useCases/createUser/ICreateUserDTO";
import { GetBalanceUseCase } from "../getBalance/GetBalanceUseCase";
import { CreateStatementError } from "./CreateStatementError";
import { CreateStatementUseCase } from "./CreateStatementUseCase";
import { ICreateStatementDTO } from "./ICreateStatementDTO";


let getBalanceUseCase: GetBalanceUseCase;
let statementsRepository: InMemoryStatementsRepository;
let createStatementUseCase : CreateStatementUseCase; 
let usersRepositoryInMemory: InMemoryUsersRepository;
let createUserUseCase: CreateUserUseCase;


describe("Create Statment", () => {

    beforeEach(() => {
        usersRepositoryInMemory = new InMemoryUsersRepository();
        statementsRepository = new InMemoryStatementsRepository();
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
        createStatementUseCase = new CreateStatementUseCase(usersRepositoryInMemory, statementsRepository);
        getBalanceUseCase = new GetBalanceUseCase(statementsRepository, usersRepositoryInMemory)
    })

    it("should be able to create a statment", async () => {
        const user: ICreateUserDTO = {
            name: "User Test",
            email: "user@test.com",            
            password: "1234"
        };

        await createUserUseCase.execute(user);

        const returnedUser = await usersRepositoryInMemory.findByEmail(user.email);  
        
        const statement: ICreateStatementDTO = {
            user_id: returnedUser.id,
            type : OperationType.DEPOSIT,
            amount: 200,
            description: "Description statement"
        }

        const returnedStatement = await createStatementUseCase.execute(statement);       

        expect(returnedStatement).toHaveProperty("id");
    });


    it("should not be able to create a statment, if the user does not exist", async () => {                

        expect( async () => {
            
            const statement: ICreateStatementDTO = {
                user_id: "returnedUser.id",
                type : OperationType.DEPOSIT,
                amount: 200,
                description: "Description statement"
            }
    
            await createStatementUseCase.execute(statement);               
        }).rejects.toBeInstanceOf(CreateStatementError.UserNotFound)
    });

});