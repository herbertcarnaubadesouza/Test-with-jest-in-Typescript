import { OperationType } from "@modules/statements/entities/Statement";
import { InMemoryStatementsRepository } from "@modules/statements/repositories/in-memory/InMemoryStatementsRepository";
import { InMemoryUsersRepository } from "@modules/users/repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "@modules/users/useCases/createUser/CreateUserUseCase";
import { ICreateUserDTO } from "@modules/users/useCases/createUser/ICreateUserDTO";
import { CreateStatementUseCase } from "../createStatement/CreateStatementUseCase";
import { ICreateStatementDTO } from "../createStatement/ICreateStatementDTO";
import { GetBalanceUseCase } from "../getBalance/GetBalanceUseCase";
import { GetStatementOperationError } from "./GetStatementOperationError";
import { GetStatementOperationUseCase } from "./GetStatementOperationUseCase";


let getStatementOperationUseCase: GetStatementOperationUseCase;
let statementsRepository: InMemoryStatementsRepository;
let createStatementUseCase : CreateStatementUseCase; 
let usersRepositoryInMemory: InMemoryUsersRepository;
let createUserUseCase: CreateUserUseCase;

describe("Get Statement Operation", () => {

    beforeEach(() => {
        usersRepositoryInMemory = new InMemoryUsersRepository();
        statementsRepository = new InMemoryStatementsRepository();
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
        createStatementUseCase = new CreateStatementUseCase(usersRepositoryInMemory, statementsRepository);
        getStatementOperationUseCase = new GetStatementOperationUseCase(usersRepositoryInMemory,statementsRepository)
    })

    it("should be able to get statement operation", async () => {
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

        const operation = await getStatementOperationUseCase.execute({
            user_id: returnedUser.id,
            statement_id: returnedStatement.id
        })

        expect(operation).toHaveProperty("id");
    });


    it("should not be able to get balance, if the user does not exist", async () => {                

        expect( async () => {
            
            await getStatementOperationUseCase.execute({
                user_id: "fake user",
                statement_id: "fake statement"
            })            

        }).rejects.toBeInstanceOf(GetStatementOperationError.UserNotFound)
    });


    it("should not be able to get balance, if the statement does not exist", async () => {                

        expect( async () => {

            const user: ICreateUserDTO = {
                name: "User Test",
                email: "user@test.com",            
                password: "1234"
            };
    
            await createUserUseCase.execute(user);
    
            const returnedUser = await usersRepositoryInMemory.findByEmail(user.email);
            
            await getStatementOperationUseCase.execute({
                user_id: returnedUser.id,
                statement_id: "fake statement"
            })            

        }).rejects.toBeInstanceOf(GetStatementOperationError.StatementNotFound)
    });

});