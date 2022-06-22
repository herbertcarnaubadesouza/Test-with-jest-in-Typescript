
import request from "supertest";
import {app} from "../../../../app";
import { Connection } from "typeorm";
import { hash } from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

import createConnection from "../../../../shared/infra/typeorm"
import { OperationType } from "@modules/statements/entities/Statement";

let connection: Connection;

describe("Create Statement Controller", () => {


    beforeAll(async () => {
        connection = await createConnection();

        await connection.runMigrations();

    });


    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    })


   
    it("should be able to create a statement with type deposit", async () => {


        const user = await request(app).post("/users")
        .send({
            name: "user",
            email: "user@rentx.com.br",
            password: "admin",
        });

        const responseToken = await request(app).post("/sessions")
        .send({
            email: "user@rentx.com.br",
            password: "admin",
        });

        const {token} = responseToken.body        

        const statementResponse = await request(app).post("/statements/deposit")
        .send({
            user_id: user.body.id,
            type: OperationType.DEPOSIT,
            amount: 200,
            description: "Deposit"
        })
        .set({
            Authorization: `Bearer ${token}`,
        });
        
        expect(statementResponse.status).toBe(201);
    });


    it("should be able to create a statement with type withdraw", async () => {

        const user = await request(app).post("/users")
        .send({
            name: "user",
            email: "Withdraw@rentx.com.br",
            password: "admin",
        });

        const responseToken = await request(app).post("/sessions")
        .send({
            email: "Withdraw@rentx.com.br",
            password: "admin",
        });

        const {token} = responseToken.body;        

        const statementResponse = await request(app).post("/statements/withdraw")
        .send({
            user_id: user.body.id,
            type: OperationType.WITHDRAW,
            amount: 0,
            description: "withdraw"
        })
        .set({
            Authorization: `Bearer ${token}`,
        });
        

        expect(statementResponse.status).toBe(201);
    });


    it("should be able to create a statement with type withdraw, with Insufficient Funds", async () => {

        const user = await request(app).post("/users")
        .send({
            name: "user",
            email: "Withdraw@rentx.com.br",
            password: "admin",
        });

        const responseToken = await request(app).post("/sessions")
        .send({
            email: "Withdraw@rentx.com.br",
            password: "admin",
        });

        const {token} = responseToken.body;        

        const statementResponse = await request(app).post("/statements/withdraw")
        .send({
            user_id: user.body.id,
            type: OperationType.WITHDRAW,
            amount: 20,
            description: "withdraw"
        })
        .set({
            Authorization: `Bearer ${token}`,
        });
        

        expect(statementResponse.status).toBe(400);
    });

})

